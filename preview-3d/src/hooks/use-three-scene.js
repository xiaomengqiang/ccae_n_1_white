import { useEffect, useRef, useState } from "react";
import THREE from "three";
import { PODS, RACKS_PER_POD, statusOf } from "../mock/racks.js";

// three.js 由 build-3d.mjs 以 UMD 形式在构建期注入产物 HTML,
// 源码 import THREE from "three" 在构建期映射为 window.THREE 全局。

// —— 尺寸常量(第8轮:高×1.23;深度按「正面高90/顶面深27+底边不动」精确解得 1.762) ——
const CAB = { w: 1, h: 5.166, d: 1.762 };
const PITCH_X = CAB.w;                // 相邻机柜中心距等于柜宽，柜体紧密相接
const POD_WIDTH = RACKS_PER_POD * PITCH_X - (PITCH_X - CAB.w);

// —— 1:1 对齐参数(第8轮:16 底边目标 + A 排正面高 90px/顶面深 27px,全部精确命中) ——
// 画布 1920×1080,3D 视口在画布内 (548,259,1356×647);FOV 26.9°,俯角 34°,水平正对
const CAM = { radius: 77.931, targetY: -1.413 };

// 各排(row0=G/H … row3=A/B):中心 z、过道宽、整体 x 偏移、左右列柜距缩放
const PER_ROW = [
  { z: -14.65, aisle: 7.62, offX: 0.016, sL: 1, sR: 1 },  // G/H(底边目标画布 y≈455)
  { z: -1.719, aisle: 6.026, offX: -0.101, sL: 1, sR: 1 }, // E/F
  { z: 9.421, aisle: 6.702, offX: -0.038, sL: 1, sR: 1 }, // C/D
  { z: 20.622, aisle: 7.369, offX: 0.186, sL: 1, sR: 1 },  // A/B
];

// 排内某列的机柜中心 x:col 0=左列(-1) / 1=右列(+1)
function podCenterX(row, col) {
  const p = PER_ROW[row];
  return p.offX + (col === 0 ? -1 : 1) * (POD_WIDTH / 2 + p.aisle / 2);
}

function rackX(row, col, index) {
  const s = col === 0 ? PER_ROW[row].sL : PER_ROW[row].sR;
  return podCenterX(row, col) + (index - (RACKS_PER_POD + 1) / 2) * PITCH_X * s;
}

// 主页面画布中 3D 视口偏移(仅调试输出用)
const VP_OFF = { x: 548, y: 259 };

// —— 程序化纹理(全部 Canvas 绘制,无外部图片) ——

// 正面纹理(128×512) · 柔和磨砂百叶(第9轮收敛):
// 左右 10% 深边;亮条 #949EAA→#7A8490(条:缝 = 10:2 = 5:1),缝 rgba(10,12,15,0.30);
// 条数 3/6/2 均分面板;面板间横向分隔 #111417(3%);顶带 + 绿灯保留。
// 暗机柜:亮条 #3A4048→#2C3138,缝 rgba(0,0,0,0.35)。
function makeFrontTexture(dim) {
  const W = 128;
  const H = 512;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const g = c.getContext("2d");
  const px = (f) => Math.round(H * f);

  // 顶带 + 绿色指示灯
  g.fillStyle = "#16191D";
  g.fillRect(0, 0, W, px(0.08));
  g.fillStyle = dim ? "#23262B" : "#3BD16F";
  g.beginPath();
  g.arc(W - 10, Math.round(H * 0.04), 1, 0, Math.PI * 2);
  g.fill();

  // 横向分隔条(3%)+ 底座
  g.fillStyle = "#111417";
  g.fillRect(0, px(0.08), W, px(0.03));
  g.fillRect(0, px(0.30), W, px(0.03));
  g.fillRect(0, px(0.78), W, px(0.03));
  g.fillRect(0, px(0.96), W, px(0.04));

  // 面板左右深边(细黑竖缝)
  const x0 = Math.round(W * 0.10);
  const x1 = W - x0;
  g.fillStyle = "#121418";
  g.fillRect(0, px(0.11), x0, px(0.85));
  g.fillRect(x1, px(0.11), W - x1, px(0.85));

  // 百叶条纹:上面板 3 条 / 中面板 6 条 / 下面板 2 条,均分面板(上下留 4px 边距),
  // 亮条:缝 = 10:2 = 5:1
  const panels = [
    [px(0.11), px(0.30), 3],
    [px(0.33), px(0.78), 6],
    [px(0.81), px(0.96), 2],
  ];
  for (const [top, bottom, count] of panels) {
    const innerTop = top + 4;
    const innerH = bottom - top - 8;
    const pitch = innerH / count;
    const barH = Math.max(2, Math.round(pitch * (5 / 6)));
    for (let i = 0; i < count; i++) {
      const y = Math.round(innerTop + i * pitch);
      const grad = g.createLinearGradient(0, y, 0, y + barH);
      if (dim) {
        grad.addColorStop(0, "#3A4048");
        grad.addColorStop(1, "#282D33");
      } else {
        grad.addColorStop(0, "#8E98A4");
        grad.addColorStop(1, "#78828E");
      }
      g.fillStyle = grad;
      g.fillRect(x0, y, x1 - x0, barH);
      // 条下细缝
      g.fillStyle = dim ? "rgba(0,0,0,0.35)" : "rgba(10,12,15,0.22)";
      g.fillRect(x0, y + barH, x1 - x0, Math.max(1, Math.round(pitch) - barH));
    }
  }

  const tex = new THREE.CanvasTexture(c);
  tex.anisotropy = 4;
  return tex;
}

// 竖向渐变(A-08 发光覆盖):顶橙 → 中粉紫 → 底蓝
function makeGlowGradientTexture() {
  const c = document.createElement("canvas");
  c.width = 8;
  c.height = 128;
  const g = c.getContext("2d");
  const grad = g.createLinearGradient(0, 0, 0, 128);
  grad.addColorStop(0, "#F89E21");
  grad.addColorStop(0.612483412, "rgba(210,112,225,0.9)");
  grad.addColorStop(1, "#77C1EE");
  g.fillStyle = grad;
  g.fillRect(0, 0, 8, 128);
  return new THREE.CanvasTexture(c);
}

// S01 95294: 故障红从底部实色向顶部透明渐变，保留柜体细节。
function makeFaultGradientTexture() {
  const c = document.createElement("canvas");
  c.width = 8; c.height = 128;
  const g = c.getContext("2d");
  const gradient = g.createLinearGradient(0, 0, 0, 128);
  gradient.addColorStop(0, "rgba(129,37,41,0)");
  gradient.addColorStop(1, "rgba(246,88,95,1)");
  g.fillStyle = gradient;
  g.fillRect(0, 0, 8, 128);
  return new THREE.CanvasTexture(c);
}

// Superpod A 底边发光线:横向 青→紫,带轻微模糊与上下柔边
function makeGroundGlowTexture() {
  const W = 512;
  const H = 48;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const g = c.getContext("2d");
  try { g.filter = "blur(3px)"; } catch (e) { /* 不支持则锐利,可接受 */ }
  const grad = g.createLinearGradient(0, 0, W, 0);
  grad.addColorStop(0, "#5ED6E8");
  grad.addColorStop(1, "#A774FF");
  g.fillStyle = grad;
  g.fillRect(0, H * 0.3, W, H * 0.4);
  const fade = g.getImageData(0, 0, W, H);
  for (let y = 0; y < H; y++) {
    const t = Math.abs(y - H / 2) / (H / 2);
    const a = Math.max(0, 1 - t * 1.6);
    for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 4 + 3;
      fade.data[i] = Math.round(fade.data[i] * a);
    }
  }
  g.putImageData(fade, 0, 0);
  return new THREE.CanvasTexture(c);
}

// 每排右端外侧的地面投影:从排右端向 +X/−Z 延伸的浅灰斜向平行四边形,
// 长 ≈ 机柜高 × 0.8,近端 alpha ~0.12(地面 224 → 阴影 ≈210),边缘柔化
function makeRowShadowTexture() {
  const W = 256;
  const H = 128;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const g = c.getContext("2d");
  try { g.filter = "blur(6px)"; } catch (e) { /* 可接受 */ }
  const skew = 18;
  g.beginPath();
  g.moveTo(10, 18);
  g.lineTo(W - 10 + skew * 0.4, 8);
  g.lineTo(W - 10, H - 8);
  g.lineTo(10, H - 24);
  g.closePath();
  // 渐变:前 45% 保持 ~0.12 再衰减到透明(比旧版更实、更深)
  const grad = g.createLinearGradient(0, 0, W, 0);
  grad.addColorStop(0, "rgba(0,0,0,0.12)");
  grad.addColorStop(0.45, "rgba(0,0,0,0.10)");
  grad.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = grad;
  g.fill();
  return new THREE.CanvasTexture(c);
}

function createScene(THREE, container, overlayApi) {
  const scene = new THREE.Scene();

  // 相机:固定参数(画布/视口恒定,由离线 LM 拟合所得,无需运行时 fit)
  const camera = new THREE.PerspectiveCamera(26.9, 1356 / 647, 0.1, 800);
  let theta = 0;
  let phi = Math.PI / 2 - (34 * Math.PI) / 180;
  const target = new THREE.Vector3(0, CAM.targetY, 0);
  const radius = CAM.radius;
  const updateCamera = () => {
    camera.position.set(
      target.x + radius * Math.sin(phi) * Math.sin(theta),
      target.y + radius * Math.cos(phi),
      target.z + radius * Math.sin(phi) * Math.cos(theta)
    );
    camera.lookAt(target);
    camera.updateMatrixWorld();
  };
  updateCamera();

  // 双显卡 Mac 优先低功耗设备；MSAA 不可用时仍保留实时 WebGL。
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
  } catch (initialError) {
    console.warn("3D 标准上下文创建失败，尝试无抗锯齿 WebGL", initialError);
    renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "low-power" });
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  container.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0xffffff, 0.8));
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.65);
  dirLight.position.set(-18, 36, 22);
  scene.add(dirLight);

  // —— 机柜阵列(材质面序:[+x右端, -x左端, 顶, 底, +z正, -z背]) ——
  const disposables = { geo: [], mat: [], tex: [] };
  const std = { roughness: 0.6, metalness: 0.3 };
  const sideMat = new THREE.MeshStandardMaterial({ color: 0x121417, ...std });
  const rightMat = new THREE.MeshStandardMaterial({ color: 0x2a2e34, ...std });
  const topMat = new THREE.MeshStandardMaterial({ color: 0x3e4a52, ...std });  // 顶面青灰
  const frontTex = makeFrontTexture(false);
  const dimTex = makeFrontTexture(true);
  const frontMat = new THREE.MeshStandardMaterial({ map: frontTex, ...std });
  const dimFrontMat = new THREE.MeshStandardMaterial({ map: dimTex, ...std });
  disposables.mat.push(sideMat, rightMat, topMat, frontMat, dimFrontMat);
  disposables.tex.push(frontTex, dimTex);

  const gradFrom = new THREE.Color(0x3e5f63);
  const gradTo = new THREE.Color(0x5b4a78);

  const bodyGeometry = new THREE.BoxGeometry(CAB.w, CAB.h, CAB.d);
  disposables.geo.push(bodyGeometry);
  const cabinets = [];
  for (const pod of PODS) {
    for (let i = 0; i < RACKS_PER_POD; i++) {
      const status = statusOf(pod.id, i + 1);
      let cabTop = topMat;
      if (pod.id === "A") {
        cabTop = new THREE.MeshStandardMaterial({
          color: gradFrom.clone().lerp(gradTo, i / (RACKS_PER_POD - 1)),
          ...std,
        });
        disposables.mat.push(cabTop);
      }
      const front = status === "dimmed" ? dimFrontMat : frontMat;
      const mesh = new THREE.Mesh(bodyGeometry, [
        rightMat, sideMat, cabTop, sideMat, front, sideMat,
      ]);
      mesh.position.set(
        rackX(pod.row, pod.col, i + 1),
        CAB.h / 2,
        PER_ROW[pod.row].z
      );
      mesh.userData = { pod: pod.id, index: i + 1, status };
      scene.add(mesh);
      cabinets.push(mesh);
    }
  }

  // 顶面分缝衬板 + 状态高亮 + 地面装饰(阴影/发光线)
  // 衬板与柜顶同尺寸(无外沿),竖缝处形成 1px 更暗分缝 #2A3036
  const seamGeo = new THREE.PlaneGeometry(POD_WIDTH, CAB.d);
  disposables.geo.push(seamGeo);
  const seamMat = new THREE.MeshBasicMaterial({ color: 0x2a3036, depthWrite: false });
  disposables.mat.push(seamMat);
  for (const pod of PODS) {
    const seam = new THREE.Mesh(seamGeo, seamMat);
    seam.rotation.x = -Math.PI / 2;
    seam.position.set(podCenterX(pod.row, pod.col), CAB.h - 0.02, PER_ROW[pod.row].z);
    scene.add(seam);
  }

  const glowTex = makeGlowGradientTexture();
  const faultTex = makeFaultGradientTexture();
  disposables.tex.push(glowTex, faultTex);
  const overlayGeo = new THREE.BoxGeometry(CAB.w + 0.002, CAB.h + 0.002, CAB.d + 0.002);
  disposables.geo.push(overlayGeo);
  const glowMat = new THREE.MeshBasicMaterial({
    map: glowTex, transparent: true, opacity: 0.85, depthWrite: false,
  });
  const faultMat = new THREE.MeshBasicMaterial({
    map: faultTex, transparent: true, opacity: 1, depthWrite: false,
  });
  disposables.mat.push(glowMat, faultMat);
  for (const cab of cabinets) {
    if (cab.userData.status === "auto" || cab.userData.status === "fault") {
      const overlay = new THREE.Mesh(overlayGeo, cab.userData.status === "auto" ? glowMat : faultMat);
      overlay.position.copy(cab.position);
      scene.add(overlay);
    }
  }

  const rowShadowTex = makeRowShadowTexture();
  disposables.tex.push(rowShadowTex);
  const shadowMat = new THREE.MeshBasicMaterial({
    map: rowShadowTex, transparent: true, depthWrite: false,
  });
  disposables.mat.push(shadowMat);
  // 长 ≈ 机柜高 × 0.8(5.166 × 0.8 ≈ 4.1),向 +X/−Z 斜向延伸
  const shadowGeo = new THREE.PlaneGeometry(4.1, 1.6);
  disposables.geo.push(shadowGeo);
  for (const pod of PODS) {
    const shadow = new THREE.Mesh(shadowGeo, shadowMat);
    shadow.rotation.x = -Math.PI / 2;
    shadow.rotation.z = -0.35;
    shadow.renderOrder = -1;
    shadow.position.set(
      podCenterX(pod.row, pod.col) + POD_WIDTH / 2 + 1.4,
      0.002,
      PER_ROW[pod.row].z - 0.4
    );
    scene.add(shadow);
  }

  const groundTex = makeGroundGlowTexture();
  disposables.tex.push(groundTex);
  const groundGeo = new THREE.PlaneGeometry(POD_WIDTH * 0.98, 0.7);
  disposables.geo.push(groundGeo);
  const groundMat = new THREE.MeshBasicMaterial({
    map: groundTex, transparent: true, opacity: 0.95, depthWrite: false,
  });
  disposables.mat.push(groundMat);
  const groundGlow = new THREE.Mesh(groundGeo, groundMat);
  groundGlow.rotation.x = -Math.PI / 2;
  const podA = PODS.find((p) => p.id === "A");
  groundGlow.position.set(
    podCenterX(podA.row, podA.col),
    0.028,
    PER_ROW[podA.row].z + CAB.d / 2 + 0.1 // 编号贴图后方(更靠机柜),不遮编号
  );
  scene.add(groundGlow);

  // —— HTML 标签叠加层定位服务 ——
  const tmpV = new THREE.Vector3();
  const tmpA = new THREE.Vector3();
  const tmpB = new THREE.Vector3();
  let viewW = 1;
  let viewH = 1;

  function rackXZ(podId, index) {
    const pod = PODS.find((p) => p.id === podId);
    if (!pod) return null;
    return {
      x: rackX(pod.row, pod.col, index),
      z: PER_ROW[pod.row].z,
    };
  }

  overlayApi.attach = () => {};
  overlayApi.detach = () => {};


  // —— 第13轮:3D 文字(贴地编号 / 竖立铭牌 / Sprite 气泡;深度遮挡,随透视) ——
  const FONT = '"HarmonyOS Sans SC", sans-serif';
  const PX_PER_UNIT = 24.6; // 前排每世界单位的近似屏幕像素(字号标定基准)

  // 2a. 每排一张贴地编号纹理(第13轮修正:贴图前移 z-4,字按 1/sin34° 拉高,
  //     前排屏高 10/9/8/7px,颜色 #A7ABB2)
  const STRETCH = 1 / Math.sin(34 * Math.PI / 180); // ≈1.78:地面透视压扁补偿
  function makeRowNumbers(podLetter, scale, pxTarget, skipFault) {
    const spanW = 19 * PITCH_X * scale + 1;
    const worldW = spanW;
    const worldH = 2.2;                              // 拉高后的地面贴图深度
    const cw = Math.round(worldW * 32);
    const ch = Math.round(worldH * 32);
    const c = document.createElement("canvas");
    c.width = cw; c.height = ch;
    const g = c.getContext("2d");
    const unit = cw / worldW;
    // 00:21 版基准字号(投影 ≈10px 高级);E/F ×1.4、G/H ×1.6 提升远排可读性
    const PXPU = 23.2;
    const FAR_SCALE = { A: 1, B: 1, C: 1, D: 1, E: 1.4, F: 1.4, G: 1.6, H: 1.6 };
    const numSize = (pxTarget / PXPU) * FAR_SCALE[podLetter] * unit;
    g.textAlign = "center";
    g.textBaseline = "middle";
    for (let i = 1; i <= 20; i++) {
      const cx = (i - 10.5) * PITCH_X * scale * unit + cw / 2;
      const cy = ch / 2;
      const text = String(i).padStart(2, "0");
      let st = statusOf(podLetter, i);
      if (skipFault && st === "fault") st = null; // 已恢复:红底标签 → 普通编号
      // 纵向拉伸补偿:ctx.scale(1, STRETCH) 使贴地后字高恢复目标,字宽保持
      g.save();
      g.translate(cx, cy);
      g.scale(1, STRETCH);
      if (st === "fault" || st === "auto") {
        // 柜位标签 ≈20×12px(画布内):宽 numSize*2.6,高 numSize*1.5(拉伸前)
        const w = numSize * 2.6, h = numSize * 1.5;
        const label = `${podLetter}-${text}`;
        const fontSize = numSize * 0.78; // 字 9px 级
        if (st === "fault") {
          g.fillStyle = "#E02128";
          roundRect(g, -w / 2, -h / 2, w, h, h * 0.18);
          g.fill();
          g.fillStyle = "#FFFFFF";
        } else {
          g.fillStyle = "rgba(255,255,255,0.85)";
          roundRect(g, -w / 2, -h / 2, w, h, h * 0.15);
          g.fill();
          g.strokeStyle = "#D9C2F5";
          g.lineWidth = unit * 0.025;
          g.stroke();
          g.fillStyle = "#9B6BDF";
        }
        g.font = `500 ${fontSize}px ${FONT}`;
        g.fillText(label, 0, 1);
      } else {
        // 远排加深保证对比(A/B #A7ABB2 → G/H #959BA3)
        const NUM_COLOR = { A: "#A7ABB2", B: "#A7ABB2", C: "#A7ABB2", D: "#A7ABB2", E: "#959BA3", F: "#959BA3", G: "#959BA3", H: "#959BA3" };
        g.fillStyle = NUM_COLOR[podLetter];
        g.font = `400 ${numSize}px ${FONT}`;
        g.fillText(text, 0, 0);
      }
      g.restore();
    }
    const tex = new THREE.CanvasTexture(c);
    tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    return { tex, worldW, worldH };
  }
  function roundRect(g, x, y, w, h, r) {
    g.beginPath();
    g.moveTo(x + r, y);
    g.arcTo(x + w, y, x + w, y + h, r);
    g.arcTo(x + w, y + h, x, y + h, r);
    g.arcTo(x, y + h, x, y, r);
    g.arcTo(x, y, x + w, y, r);
    g.closePath();
  }

  // 2b. Superpod 铭牌纹理(深灰半透明圆角 + 白字,两空格)
  function makePodPlate(letter, worldW, worldH) { // 尺寸按排传入(投影恒 90×24)
    const c = document.createElement("canvas");
    c.width = 512; c.height = Math.round(512 * worldH / worldW);
    const g = c.getContext("2d");
    g.fillStyle = "rgba(70,75,85,0.72)";
    roundRect(g, 3, 3, c.width - 6, c.height - 6, 14);
    g.fill();
    g.strokeStyle = "rgba(255,255,255,0.45)";
    g.lineWidth = 3;
    g.stroke();
    g.fillStyle = "#FFFFFF";
    g.font = `500 ${Math.round(c.height * 0.55)}px ${FONT}`;
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillText(`Superpod  ${letter}`, c.width / 2, c.height / 2 + 2);
    const tex = new THREE.CanvasTexture(c);
    tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
    return { tex, worldW, worldH };
  }

  // S01 原稿素材合成为场景 Sprite；不修改静态降级图片。
  let badgeTexturesDisposed = false;
  function makeBadgeTexture(type, aggregate, impacting = false) {
    const c = document.createElement("canvas");
    c.width = 256; c.height = 256;
    const g = c.getContext("2d");
    g.scale(4, 4);
    const tex = new THREE.CanvasTexture(c);
    const specs = type === "glow"
      ? [["auto.svg", 6, 6, 51.416, 51.416]]
      : [["fault-pin.svg", 12, 24, 24, 28.0542],
         ["fault-fill.svg", 17.04, 29.109, 13.9201, 12.5758],
         ["fault-exclamation.svg", 23.419, 32.301, 1.166, 6.738],
         aggregate
           ? ["manual-count.svg", 30.04, 17.614, 10.5725, 12]
           : impacting
             ? ["manual-count.svg", 30.04, 17.614, 10.5725, 12]
             : ["manual.svg", 24.212, 11.675, 24, 24]];
    if (impacting) specs.push(["lg-impact.svg", 44, 16.614, 14, 14]);
    Promise.all(specs.map(([file, ...rect]) => new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve({ img, rect });
      img.onerror = () => reject(new Error(`机柜气泡素材加载失败: ${file}`));
      img.src = `assets/uploads/s01/${file}`;
    }))).then(layers => {
      if (badgeTexturesDisposed) return;
      layers.forEach(({ img, rect }, index) => {
        if ((aggregate || impacting) && type !== "glow" && index === 3) {
          // Figma 2972:97365 的白底红边胶囊；不用含画板背景的 PNG 导出。
          g.fillStyle = "#FFFFFF";
          g.strokeStyle = "#E02128";
          g.lineWidth = 0.833;
          roundRect(g, 26.212 + 0.4165, 13.614 + 0.4165, (impacting ? 36 : 32) - 0.833, 20 - 0.833, 10);
          g.fill();
          g.stroke();
        }
        g.drawImage(img, ...rect);
      });
      if (aggregate && type !== "glow") {
        g.fillStyle = "#E02128";
        g.font = `500 12px ${FONT}`;
        // 按实际字形边界居中，不使用受字体行高影响的 top 基线。
        g.textBaseline = "alphabetic";
        const label = String(aggregate);
        const bounds = g.measureText(label);
        const baseline = 23.614 + (bounds.actualBoundingBoxAscent - bounds.actualBoundingBoxDescent) / 2;
        g.fillText(label, 45.212, baseline);
      }
      tex.needsUpdate = true;
    }).catch(error => console.error(error));
    return tex;
  }

  // 组装:编号贴地 / 铭牌竖立 / 气泡 Sprite
  const badgeSpecs = { "A-8": "glow", "A-15": "pin", "D-8": "pin" };
  for (const pod of PODS) {
    // —— 贴地编号(每 pod 一张,列内均布) ——
    const scale = pod.col === 0 ? PER_ROW[pod.row].sL : PER_ROW[pod.row].sR;
    // 屏高目标:A/B 10px,C/D 9px,E/F 8px,G/H 7px(row0=G…row3=A)
    const pxTarget = [7, 8, 9, 10][pod.row];
    const { tex, worldW, worldH } = makeRowNumbers(pod.id, scale, pxTarget);
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(worldW, worldH),
      new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthTest: true, depthWrite: false })
    );
    plane.rotation.x = -Math.PI / 2;
    plane.renderOrder = -0.5;
    // 贴图前移(朝相机):每排 z 偏移由投影标定,使字形中心=第7轮编号中心(底边+8px)
    const NUM_Z_OFF = [2.55, 1.9, 1.54, 1.37]; // row0=G/H 再前移避底座,E/F 微调
    plane.position.set(podCenterX(pod.row, pod.col), 0.003, PER_ROW[pod.row].z + NUM_Z_OFF[pod.row]);
    scene.add(plane);
    disposables.geo.push(plane.geometry);
    disposables.mat.push(plane.material);
    disposables.tex.push(tex);
    // —— 铭牌(竖立,朝向与正面一致) ——
    // 铭牌世界尺寸按排到相机距离补偿,默认视角投影恒 90×24px
    const PLATE_SIZE = { // row0=G … row3=A
      G: [5.94, 1.58], E: [5.23, 1.39], C: [4.61, 1.23], A: [4.0, 1.07],
    };
    const [pw, ph] = PLATE_SIZE[["G", "E", "C", "A"][pod.row]];
    const plate = makePodPlate(pod.id, pw, ph);
    const plateMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(plate.worldW, plate.worldH),
      new THREE.MeshBasicMaterial({ map: plate.tex, transparent: true, depthTest: true, depthWrite: false })
    );
    const firstX = rackX(pod.row, pod.col, 1) - CAB.w / 2;
    plateMesh.position.set(firstX + plate.worldW / 2, CAB.h + 0.3 + plate.worldH / 2, PER_ROW[pod.row].z + CAB.d / 2);
    scene.add(plateMesh);
    disposables.geo.push(plateMesh.geometry);
    disposables.mat.push(plateMesh.material);
    disposables.tex.push(plate.tex);
    // —— 告警气泡 Sprite ——
    for (const [key, type] of Object.entries(badgeSpecs)) {
      const [pl, numStr] = key.split("-");
      if (pl !== pod.id) continue;
      const idx = parseInt(numStr, 10);
      const tex2 = makeBadgeTexture(type, key === "D-8" ? 2 : 0, key === "A-15");
      const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex2, transparent: true, depthTest: true, depthWrite: false }));
      sp.userData.eventKey = key;
      sp.userData.resolved = false;
      sp.scale.set(2.9333, 2.9333, 1);
      sp.center.set(type === "glow" ? 0.5 : 24 / 64, type === "glow" ? 0.25 : 12 / 64);
      sp.position.set(rackX(pod.row, pod.col, idx), CAB.h + 0.02, PER_ROW[pod.row].z);
      scene.add(sp);
      disposables.mat.push(sp.material);
      disposables.tex.push(tex2);
    }
  }

  // Record row-owned meshes before transient hover/selection geometry is created.
  const rowVisuals = scene.children.filter(n => n.isMesh || n.isSprite).map(node => {
    const pod = PODS.reduce((best, p) => {
      const dist = Math.abs(node.position.z - PER_ROW[p.row].z) * 3 + Math.abs(node.position.x - podCenterX(p.row,p.col));
      return !best || dist < best.dist ? {id:p.id,dist} : best;
    }, null).id;
    return {node, pod, y:node.position.y, scaleY:node.scale.y, original:node.material};
  });
  let flight = null, cabinetHeld = false, returnPose = null;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const flightTarget = new THREE.Vector3();
  let heldTarget = null;
  function prepareFlightMaterials() {
    const cache = new Map();
    for(const item of rowVisuals) {
      const copy = material => {
        const key = `${item.pod}:${material.uuid}`;
        if(!cache.has(key)) { const m=material.clone(); m.transparent=true; cache.set(key,m); disposables.mat.push(m); }
        return cache.get(key);
      };
      item.node.userData.flightOriginalMaterial = item.original;
      item.node.material = Array.isArray(item.original) ? item.original.map(copy) : copy(item.original);
      item.mats=Array.isArray(item.node.material)?item.node.material:[item.node.material];
      item.originals=Array.isArray(item.original)?item.original:[item.original];
    }
  }
  function restoreFlightMaterials() {
    for(const item of rowVisuals) {
      item.node.material=item.original;
      item.node.position.y=item.y; item.node.scale.y=item.scaleY;
      for(let i=0;i<item.mats.length;i++) item.mats[i].opacity=item.originals[i].opacity;
    }
  }
  // Allocate and compile once while loading, never at the first click or handoff.
  prepareFlightMaterials();
  renderer.compile(scene,camera);
  restoreFlightMaterials();
  renderer.compile(scene,camera);
  function enterCabinet(cab) {
    if(flight || cabinetHeld || !cab) return;
    hideTip(); setHover(null); setSelected(null);
    const pod=PODS.find(p=>p.id===cab.userData.pod);
    const f=viewH/(2*Math.tan(THREE.MathUtils.degToRad(camera.fov)/2));
    // S02 body bounds, in the normal viewport: x=3.91, y=164.24, w=1345.07, h=332.978.
    const bodyW=viewW*(1345.07/1356);
    const d=POD_WIDTH*f/bodyW;
    const heightScale=332.978/(1345.07*CAB.h/POD_WIDTH);
    const z=PER_ROW[pod.row].z+CAB.d/2;
    const x=podCenterX(pod.row,pod.col)-((3.91+1345.07/2)/1356-.5)*viewW*d/f;
    const y=CAB.h*heightScale/2+((164.24+332.978/2)/647-.5)*viewH*d/f;
    returnPose={pos:camera.position.clone(),target:lookAt.clone(),view:{...view}};
    // Only objects that actually fade use the prepared transparent materials.
    // The selected solid cabinet keeps its original opaque depth ordering.
    for(const item of rowVisuals) {
      const fading=item.pod!==pod.id || item.node.isSprite || item.node.geometry?.type === "PlaneGeometry";
      item.node.material=fading ? (Array.isArray(item.original)?item.mats:item.mats[0]) : item.original;
    }
    heldTarget=new THREE.Vector3(x,y,z);
    flight={pod:pod.id,from:camera.position.clone(),fromTarget:lookAt.clone(),to:new THREE.Vector3(x,y,z+d),target:new THREE.Vector3(x,y,z),start:performance.now(),duration:reducedMotion?120:1500,heightScale,returning:false,sent:false};
  }
  function returnFromCabinet() {
    if(!returnPose) return;
    const targetNow=heldTarget.clone();
    flight={pod:flight?.pod || cabinetHeld,from:camera.position.clone(),fromTarget:targetNow,to:returnPose.pos.clone(),target:returnPose.target.clone(),start:performance.now()+ (reducedMotion?120:320),duration:reducedMotion?120:1450,heightScale:332.978/(1345.07*CAB.h/POD_WIDTH),returning:true};
    cabinetHeld=false;
  }

  // —— 调试:输出 8 排 01/20 机柜正面底边中点(主页面画布坐标) ——
  function debugLogRows() {
    const v = new THREE.Vector3();
    const groups = {};
    for (const pod of PODS) {
      const cells = [1, 20].map((idx) => {
        const xz = rackXZ(pod.id, idx);
        v.set(xz.x, 0, xz.z + CAB.d / 2).project(camera);
        const px = Math.round((v.x * 0.5 + 0.5) * viewW + VP_OFF.x);
        const py = Math.round((-v.y * 0.5 + 0.5) * viewH + VP_OFF.y);
        return `(${px},${py})`;
      });
      groups[pod.id] = cells;
    }
    console.log("[rack-align] 01/20 机柜正面底边中点 · 主页面画布坐标(y+8=编号中心):");
    for (const id of ["A", "B", "C", "D", "E", "F", "G", "H"]) {
      console.log(`  ${id}: 01=${groups[id][0]}  20=${groups[id][1]}`);
    }
    // 第13轮:贴地编号字形中心投影 + 字形投影高度(px)
    const pxTarget = { A: 10, B: 10, C: 9, D: 9, E: 8, F: 8, G: 7, H: 7 };
    console.log("[rack-text] 贴地编号 字形中心投影(画布) / 字形投影高:");
    for (const pod of PODS) {
      const cy = [];
      for (const idx of [1, 20]) {
        const xz = rackXZ(pod.id, idx);
        v.set(xz.x, 0.003, PER_ROW[pod.row].z + [2.55, 1.9, 1.54, 1.37][pod.row]).project(camera);
        const px = Math.round((v.x * 0.5 + 0.5) * viewW + VP_OFF.x);
        const py = Math.round((-v.y * 0.5 + 0.5) * viewH + VP_OFF.y);
        cy.push(`(${px},${py})`);
      }
      // 字形高:世界字高 h(=pxTarget/23.2×STRETCH) 的两个端点投影差
      const xz1 = rackXZ(pod.id, 1);
      const h = (pxTarget[pod.id] / 23.2) / Math.sin((34 * Math.PI) / 180);
      const pTop = new THREE.Vector3(xz1.x, h, PER_ROW[pod.row].z + [2.55, 1.9, 1.54, 1.37][pod.row]).project(camera);
      const pBot = new THREE.Vector3(xz1.x, 0, PER_ROW[pod.row].z + [2.55, 1.9, 1.54, 1.37][pod.row]).project(camera);
      const hPx = Math.round(Math.abs(pTop.y - pBot.y) * 0.5 * viewH);
      console.log(`  ${pod.id}: 01=${cy[0]} 20=${cy[1]} 字高≈${hPx}px(目标${pxTarget[pod.id]})`);
    }
    // A 排 01 号:正面上沿 / 顶面后沿 投影 y 与屏高验证(目标 90±3 / 27±3)
    const podA = PODS.find((p) => p.id === "A");
    const xz = rackXZ("A", 1);
    const pyOf = (y, z) => {
      v.set(xz.x, y, z).project(camera);
      return (-v.y * 0.5 + 0.5) * viewH + VP_OFF.y;
    };
    const yBottom = pyOf(0, xz.z + CAB.d / 2);
    const yTop = pyOf(CAB.h, xz.z + CAB.d / 2);
    const yBack = pyOf(CAB.h, xz.z - CAB.d / 2);
    console.log(
      `[rack-align] A排01 正面上沿 y=${yTop.toFixed(1)} 底沿 y=${yBottom.toFixed(1)} → 正面高 ${(yBottom - yTop).toFixed(1)}px(目标 90±3);` +
      ` 顶面后沿 y=${yBack.toFixed(1)} → 顶面深 ${(yTop - yBack).toFixed(1)}px(目标 27±3)`
    );
  }

  // —— 交互(第11轮 2.1–2.4):限制拖拽 + 阻尼 + hover/选中 + postMessage 协议 ——
  const DEF = { theta: 0, phi, zoom: 1 };                 // 默认视角(俯角 34°)
  const LIMIT = {
    theta: 10 * Math.PI / 180,                            // 水平 ±10°
    phiMin: (90 - 40) * Math.PI / 180,                    // 俯仰 −4°/+6° → 俯角 30°–40°
    phiMax: (90 - 30) * Math.PI / 180,
    zoomMin: 0.7, zoomMax: 1.6,                           // 缩放 70–160%
  };
  const view = { theta: DEF.theta, phi: DEF.phi, zoom: 1 };       // 当前(阻尼后)
  const goal = { theta: DEF.theta, phi: DEF.phi, zoom: 1 };       // 目标
  const lookAt = target.clone();                                   // lookAt 目标(旋转中心=阵列几何中心)
  const lookAtGoal = target.clone();
  const DAMP = 0.12;
  const SENS = 0.005 / 3;                                          // 灵敏度 1/3

  const applyView = () => {
    // zoom = 画面放大倍数:越大越近(zoom 1.3 → 半径 /1.3)
    const r = CAM.radius / view.zoom;
    camera.position.set(
      lookAt.x + r * Math.sin(view.phi) * Math.sin(view.theta),
      lookAt.y + r * Math.cos(view.phi),
      lookAt.z + r * Math.sin(view.phi) * Math.cos(view.theta)
    );
    camera.lookAt(lookAt);
    camera.updateMatrixWorld();
  };

  // —— hover / 选中覆盖物(默认隐藏,不改变静态画面) ——
  const hoverMat = new THREE.MeshBasicMaterial({
    color: 0x2f7bff, transparent: true, opacity: 0.25, depthWrite: false,
  });
  disposables.mat.push(hoverMat);
  const hoverBox = new THREE.Mesh(new THREE.BoxGeometry(CAB.w + 0.04, CAB.h + 0.04, CAB.d + 0.04), hoverMat);
  hoverBox.visible = false;
  scene.add(hoverBox);
  disposables.geo.push(hoverBox.geometry);
  const edgeMat = new THREE.LineBasicMaterial({ color: 0x2f7bff });
  disposables.mat.push(edgeMat);
  const topLoop = new THREE.LineLoop(
    new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-CAB.w / 2, CAB.h + 0.01, -CAB.d / 2),
      new THREE.Vector3(-CAB.w / 2, CAB.h + 0.01, CAB.d / 2),
      new THREE.Vector3(CAB.w / 2, CAB.h + 0.01, CAB.d / 2),
      new THREE.Vector3(CAB.w / 2, CAB.h + 0.01, -CAB.d / 2),
    ]),
    edgeMat
  );
  topLoop.visible = false;
  scene.add(topLoop);
  disposables.geo.push(topLoop.geometry);
  // 选中:正面半透明罩 rgba(47,123,255,0.18) + 四周 2px 描边(薄条) + 顶部定位针
  const selGroup = new THREE.Group();
  selGroup.visible = false;
  scene.add(selGroup);
  const selFaceMat = new THREE.MeshBasicMaterial({
    color: 0x2f7bff, transparent: true, opacity: 0.18, depthWrite: false,
  });
  disposables.mat.push(selFaceMat);
  const selFace = new THREE.Mesh(new THREE.PlaneGeometry(CAB.w, CAB.h), selFaceMat);
  selFace.position.set(0, CAB.h / 2, CAB.d / 2 + 0.015);
  selGroup.add(selFace);
  disposables.geo.push(selFace.geometry);
  const barMat = new THREE.MeshBasicMaterial({ color: 0x2f7bff, depthWrite: false });
  disposables.mat.push(barMat);
  const BAR = 0.035; // ≈ 屏上 2px
  const barGeos = [
    [CAB.w + BAR * 2, BAR, 0, BAR / 2],
    [CAB.w + BAR * 2, BAR, 0, CAB.h - BAR / 2],
    [BAR, CAB.h, -CAB.w / 2 - BAR / 2, CAB.h / 2],
    [BAR, CAB.h, CAB.w / 2 + BAR / 2, CAB.h / 2],
  ];
  for (const [w, h, x, y] of barGeos) {
    const bar = new THREE.Mesh(new THREE.PlaneGeometry(w, h), barMat);
    bar.position.set(x, y, CAB.d / 2 + 0.02);
    selGroup.add(bar);
    disposables.geo.push(bar.geometry);
  }
  const pinMat = new THREE.MeshBasicMaterial({ color: 0x2f7bff });
  disposables.mat.push(pinMat);
  const pin = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.5, 12), pinMat);
  pin.position.y = CAB.h + 0.35;
  selGroup.add(pin);
  disposables.geo.push(pin.geometry);

  // hover 提示卡(DOM)
  const tip = document.createElement("div");
  tip.className = "rack-tip";
  tip.style.display = "none";
  container.appendChild(tip);
  const STATUS_LABEL = { auto: ["自动处理中", "#c86bfa"], fault: ["故障", "#e02128"], dimmed: ["节能", "#777"], normal: ["正常", "#09aa71"] };
  const metricOf = (pod, index) => {
    const h = (pod.charCodeAt(0) * 31 + index * 17) % 89;
    return { npu: 62 + (h % 30), power: (8 + (h % 90) / 10).toFixed(1) };
  };
  let hoverCab = null;
  let selectedCab = null;
  let tipHideTimer = null;
  const showTip = (cab, clientX, clientY, pinned) => {
    const st = STATUS_LABEL[cab.userData.status || "normal"];
    const m = metricOf(cab.userData.pod, cab.userData.index);
    tip.innerHTML =
      `<div class="rack-tip-head"><span class="rack-tip-id">${cab.userData.pod}-${String(cab.userData.index).padStart(2, "0")}</span>` +
      `<span class="rack-tip-tag" style="color:${st[1]}">${st[0]}</span></div>` +
      `<div class="rack-tip-row">NPU 利用率 ${m.npu}%</div>` +
      `<div class="rack-tip-row">功耗 ${m.power} kW</div>` +
      (pinned ? `<div class="rack-tip-link">查看详情 →</div>` : "");
    tip.className = pinned ? "rack-tip rack-tip-pinned" : "rack-tip";
    tip.style.display = "block";
    const tx = Math.min(clientX + 14, viewW - 170);
    const ty = Math.max(8, clientY - 64);
    tip.style.left = `${tx}px`;
    tip.style.top = `${ty}px`;
  };
  const hideTip = () => { tip.style.display = "none"; };

  // —— 拾取 ——
  const raycaster = new THREE.Raycaster();
  const pointerNDC = new THREE.Vector2();
  const pick = (clientX, clientY) => {
    const rect = canvas.getBoundingClientRect();
    pointerNDC.set(
      ((clientX - rect.left) / rect.width) * 2 - 1,
      -((clientY - rect.top) / rect.height) * 2 + 1
    );
    raycaster.setFromCamera(pointerNDC, camera);
    const hits = raycaster.intersectObjects(cabinets, false);
    return hits.length ? hits[0].object : null;
  };
  const setHover = (cab) => {
    if (hoverCab === cab) return;
    hoverCab = cab;
    if (cab && cab !== selectedCab) {
      hoverBox.position.copy(cab.position);
      hoverBox.visible = true;
      topLoop.position.copy(cab.position);
      topLoop.visible = true;
    } else {
      hoverBox.visible = false;
      topLoop.visible = false;
    }
  };
  const setSelected = (cab) => {
    selectedCab = cab;
    if (cab) {
      selGroup.position.copy(cab.position);
      selGroup.visible = true;
      // 提示卡固定在柜顶投影附近
      const v = cab.position.clone().project(camera);
      showTip(cab, (v.x * 0.5 + 0.5) * viewW - 100, (-v.y * 0.5 + 0.5) * viewH - 70, true);
    } else {
      selGroup.visible = false;
      hideTip();
    }
  };

  // —— 事件 ——
  let dragging = false;
  let downX = 0;
  let downY = 0;
  let lastX = 0;
  let lastY = 0;
  let moved = 0;
  const onPointerDown = (e) => {
    if(flight || cabinetHeld || e.button !== 0) return;
    dragging = true;
    moved = 0;
    downX = lastX = e.clientX;
    downY = lastY = e.clientY;
  };
  const onPointerMove = (e) => {
    if(flight || cabinetHeld) return;
    if (dragging) {
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      moved += Math.abs(dx) + Math.abs(dy);
      goal.theta = Math.max(-LIMIT.theta, Math.min(LIMIT.theta, goal.theta - dx * SENS));
      goal.phi = Math.max(LIMIT.phiMin, Math.min(LIMIT.phiMax, goal.phi - dy * SENS));
      lastX = e.clientX;
      lastY = e.clientY;
      return;
    }
    const cab = pick(e.clientX, e.clientY);
    setHover(cab);
    clearTimeout(tipHideTimer);
    if (cab) {
      showTip(cab, e.clientX - rectLeft(), e.clientY - rectTop(), false);
    } else {
      tipHideTimer = setTimeout(hideTip, 150);
      if (selectedCab) {
        // 选中态固定卡:hover 空白时保留选中卡
        const v = selectedCab.position.clone().project(camera);
        showTip(selectedCab, (v.x * 0.5 + 0.5) * viewW - 100, (-v.y * 0.5 + 0.5) * viewH - 70, true);
      }
    }
  };
  const rectLeft = () => canvas.getBoundingClientRect().left;
  const rectTop = () => canvas.getBoundingClientRect().top;
  const onPointerUp = (e) => {
    if(!dragging || flight || cabinetHeld) return;
    dragging = false;
    if (moved < 4) {
      const cab = pick(e.clientX, e.clientY);
      // The referenced Labtour and S02 story currently implement SuperPod A.
      if(cab?.userData.pod === "A") enterCabinet(cab);
      else setSelected(cab === selectedCab ? null : cab);
    }
  };
  const setZoom = (z, notify) => {
    goal.zoom = Math.max(LIMIT.zoomMin, Math.min(LIMIT.zoomMax, z));
    if (notify) notifyZoom();
  };
  const onWheel = (e) => {
    e.preventDefault();
    if(flight || cabinetHeld) return;
    // 滚轮向上(deltaY<0)= 放大
    setZoom(goal.zoom * (e.deltaY > 0 ? 0.9 : 1.1), true);
  };
  const canvas = renderer.domElement;
  canvas.addEventListener("pointerdown", onPointerDown);
  window.addEventListener("pointermove", onPointerMove);
  window.addEventListener("pointerup", onPointerUp);
  canvas.addEventListener("wheel", onWheel, { passive: false });

  // —— 主页面 postMessage 协议(2.4) ——
  const notifyZoom = () => {
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({ type: "zoomChanged", value: Math.round(view.zoom * 100) }, "*");
    }
  };
  let breathUntil = 0; // focusCabinet 呼吸截止时间戳
  const onMessage = (e) => {
    const msg = e.data || {};
    if(msg.type === "cabinetReturn" && e.source === window.parent) {
      returnFromCabinet();
    } else if (msg.type === "impactFilter") {
      if (e.source !== window.parent) return;
      for (const child of scene.children) {
        if (child.isSprite && child.userData.eventKey) {
          child.visible = !child.userData.resolved && (!msg.enabled || child.userData.eventKey === "D-8");
        }
      }
    } else if (msg.type === "focusCabinet" && typeof msg.id === "string") {
      const m = msg.id.match(/^([A-H])-(\d{1,2})$/);
      if (!m) return;
      const cab = cabinets.find(
        (c) => c.userData.pod === m[1] && c.userData.index === parseInt(m[2], 10)
      );
      if (!cab) return;
      goal.theta = DEF.theta;
      goal.phi = DEF.phi;
      setZoom(1.3, true);
      lookAtGoal.set(cab.position.x, CAB.h / 2, cab.position.z);
      hoverBox.position.copy(cab.position);
      hoverBox.visible = true;
      breathUntil = performance.now() + 1200; // 2 次呼吸
      setSelected(null);
    } else if (msg.type === "reset") {
      goal.theta = DEF.theta;
      goal.phi = DEF.phi;
      setZoom(1, true);
      lookAtGoal.set(target.x, target.y, target.z);
      breathUntil = 0;
      setSelected(null);
    } else if (msg.type === "zoom" && (msg.step === 1 || msg.step === -1)) {
      setZoom(goal.zoom * (msg.step === 1 ? 1.1 : 0.9), true);
    } else if (msg.type === "resolveCabinet" && typeof msg.id === "string") {
      // 移除该柜告警:红覆盖盒/定位针(选中)/相关 Sprite 由重建纹理实现 — 简化:移除红覆盖盒并重绘其排贴图
      const m2 = msg.id.match(/^([A-H])-(\d{1,2})$/);
      if (!m2) return;
      const podId = m2[1], idx = parseInt(m2[2], 10);
      const cab = cabinets.find((c) => c.userData.pod === podId && c.userData.index === idx);
      if (!cab) return;
      // 覆盖盒定位到该柜的 overlay 隐藏
      for (const child of scene.children) {
        if (child.isMesh && (child.material === faultMat || child.userData.flightOriginalMaterial === faultMat) && child.position.distanceTo(cab.position) < 0.1) {
          child.visible = false;
        }
      }
      // 状态改为 normal(重绘该排地面贴图,移除红底标签)
      const pod = PODS.find((pp) => pp.id === podId);
      if (pod) {
        const scale = pod.col === 0 ? PER_ROW[pod.row].sL : PER_ROW[pod.row].sR;
        const pxT2 = [7, 8, 9, 10][pod.row];
        const nw = makeRowNumbers(podId, scale, pxT2, true); // skipFault 标记
        // 找该排编号平面并换贴图
        for (const child of scene.children) {
          if (child.isMesh && child.rotation.x !== 0 && child.material && child.material.map && child.position.z > PER_ROW[pod.row].z - 5 && child.position.z < PER_ROW[pod.row].z + 5 && Math.abs(child.position.x - podCenterX(pod.row, pod.col)) < 2) {
            child.material.map.dispose();
            child.material.map = nw.tex;
            child.material.needsUpdate = true;
          }
        }
      }
      // 相关 Sprite 气泡(D-08 pin)隐藏
      for (const child of scene.children) {
        if (child.isSprite && Math.abs(child.position.x - cab.position.x) < 0.5 && Math.abs(child.position.z - cab.position.z) < 0.5) {
          child.userData.resolved = true;
          child.visible = false;
        }
      }
    }
  };
  window.addEventListener("message", onMessage);

  // —— 渲染循环:阻尼趋近 goal + 呼吸高亮 + 标签投影 ——
  const animate = () => {
    frameId = requestAnimationFrame(animate);
    // 自愈:canvas 尺寸与容器不一致(初始化时序/ResizeObserver 丢失)时自动补 resize
    const dpr = renderer.getPixelRatio();
    if (
      Math.abs(renderer.domElement.width - viewW * dpr) > 2 ||
      Math.abs(renderer.domElement.height - viewH * dpr) > 2 ||
      Math.abs(camera.aspect - viewW / viewH) > 0.01
    ) {
      resize();
    }
    // 阻尼
    view.theta += (goal.theta - view.theta) * DAMP;
    view.phi += (goal.phi - view.phi) * DAMP;
    view.zoom += (goal.zoom - view.zoom) * DAMP;
    lookAt.x += (lookAtGoal.x - lookAt.x) * DAMP;
    lookAt.y += (lookAtGoal.y - lookAt.y) * DAMP;
    lookAt.z += (lookAtGoal.z - lookAt.z) * DAMP;
    if(!flight && !cabinetHeld) applyView();
    if(flight) {
      const t=Math.max(0,Math.min(1,(performance.now()-flight.start)/flight.duration));
      const eased=t*t*t*(t*(t*6-15)+10); // continuous acceleration at both ends
      camera.position.lerpVectors(flight.from,flight.to,eased);
      camera.lookAt(flightTarget.lerpVectors(flight.fromTarget,flight.target,eased));
      const collapse=flight.returning ? 1-eased : eased;
      for(const item of rowVisuals) {
        const other=item.pod!==flight.pod;
        const yScale=other?1:1+(flight.heightScale-1)*collapse;
        item.node.scale.y=item.scaleY*yScale;
        item.node.position.y=item.y*yScale-(other?collapse*(CAB.h+1.2):0);
        const fade=(other || item.node.isSprite || item.node.geometry?.type === "PlaneGeometry") ? 1-collapse : 1;
        for(let i=0;i<item.mats.length;i++) item.mats[i].opacity=item.originals[i].opacity*fade;
      }
      if(!flight.returning && t>=1 && !flight.sent) {
        flight.sent=true;
        window.parent.postMessage({type:"cabinetEnter",pod:flight.pod},"*");
      }
      if(t>=1) {
        if(flight.returning) {
          restoreFlightMaterials(); Object.assign(view,returnPose.view); Object.assign(goal,returnPose.view);
          lookAt.copy(returnPose.target);lookAtGoal.copy(returnPose.target);returnPose=null;
        } else cabinetHeld=flight.pod;
        flight=null;
      }
    }
    // zoomChanged 通知(取整后变化才发)
    const zPct = Math.round(view.zoom * 100);
    if (zPct !== lastZoomSent) {
      lastZoomSent = zPct;
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({ type: "zoomChanged", value: zPct }, "*");
      }
    }
    // focus 呼吸高亮
    const now = performance.now();
    if (breathUntil) {
      if (now > breathUntil) {
        breathUntil = 0;
        if (hoverBox.visible && !hoverCab) hoverBox.visible = false;
        hoverMat.opacity = 0.25;
      } else {
        hoverMat.opacity = 0.12 + 0.18 * Math.abs(Math.sin((now / 1200) * Math.PI * 2));
      }
    }
    if (!logged && viewW > 100) {
      logged = true;
      debugLogRows();
    }
    renderer.render(scene, camera);
  };

  const resize = () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (w > 0 && h > 0) {
      viewW = w;
      viewH = h;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      // 按宽 fit:横向可视范围恒定(tanH 不变) → tanV 随高度放大,
      // 全屏时垂直视野变宽,8 排全部可见且整体垂直居中
      const tanV0 = Math.tan((26.9 / 2) * Math.PI / 180);
      const tanH0 = tanV0 * (1356 / 647);
      camera.fov = 2 * Math.atan(tanH0 / (w / h)) * 180 / Math.PI;
      camera.updateProjectionMatrix();
    }
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);
  resize();
  // 初始化双保险:下一帧再校一次(布局就绪可能晚于首帧)
  requestAnimationFrame(resize);

  // animate 在 resize 定义之后启动(自愈逻辑引用 resize)
  let frameId = 0;
  let logged = false;
  let lastZoomSent = 100;
  animate();

  return () => {
    restoreFlightMaterials();
    badgeTexturesDisposed = true;
    cancelAnimationFrame(frameId);
    resizeObserver.disconnect();
    canvas.removeEventListener("pointerdown", onPointerDown);
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
    canvas.removeEventListener("wheel", onWheel);
    window.removeEventListener("message", onMessage);
    clearTimeout(tipHideTimer);
    if (tip.parentNode) tip.parentNode.removeChild(tip);
    for (const g of disposables.geo) g.dispose();
    for (const m of disposables.mat) m.dispose();
    for (const t of disposables.tex) t.dispose();
    renderer.dispose();
    if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
  };
}

// 挂载 3D 场景到 containerRef,返回 { status, overlayApi }
export function useThreeScene(containerRef) {
  const [status, setStatus] = useState("loading");
  const [attempt, setAttempt] = useState(0);
  const overlayApi = useRef({
    attach: () => {},
    detach: () => {},
  }).current;

  useEffect(() => {
    if (!THREE || !containerRef.current) {
      setStatus("error");
      return undefined;
    }
    let cleanup;
    let canvas;
    const lost = (event) => { event.preventDefault(); setStatus("error"); };
    const restored = () => setStatus("ready");
    try {
      cleanup = createScene(THREE, containerRef.current, overlayApi);
      canvas = containerRef.current.querySelector("canvas");
      canvas?.addEventListener("webglcontextlost", lost);
      canvas?.addEventListener("webglcontextrestored", restored);
      setStatus("ready");
      console.info("机柜实时 3D 初始化成功");
    } catch (error) {
      // WebGL 不可用时保留 React 页面，展示静态预览和重试入口。
      console.warn("机柜 3D 初始化失败", error);
      setStatus("error");
    }
    return () => {
      canvas?.removeEventListener("webglcontextlost", lost);
      canvas?.removeEventListener("webglcontextrestored", restored);
      cleanup?.();
    };
  }, [attempt]);

  return { status, overlayApi, retry: () => setAttempt(value => value + 1) };
}
