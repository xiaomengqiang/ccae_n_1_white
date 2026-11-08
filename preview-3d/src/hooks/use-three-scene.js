import { useEffect, useState } from "react";
import THREE from "three";

// three.js 由 build-3d.mjs 以 UMD 形式在构建期注入产物 HTML(与其他库一致),
// 源码 import THREE from "three" 在构建期映射为 window.THREE 全局。
// 场景:机柜占位盒(柜体 + 线框 + U 位隔板)+ 地面网格 + 灯光;
// 交互:拖拽环绕(迷你轨道相机)+ 待机自转。后续替换为真实机柜模型渲染。
function createScene(THREE, container) {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  const target = new THREE.Vector3(0, 1, 0);
  let theta = 0.7; // 水平角
  let phi = 1.15; // 俯仰角
  const radius = 4;
  const updateCamera = () => {
    camera.position.set(
      target.x + radius * Math.sin(phi) * Math.sin(theta),
      target.y + radius * Math.cos(phi),
      target.z + radius * Math.sin(phi) * Math.cos(theta)
    );
    camera.lookAt(target);
  };
  updateCamera();

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio || 1);
  container.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0xffffff, 0.75));
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
  dirLight.position.set(3, 5, 4);
  scene.add(dirLight);

  const grid = new THREE.GridHelper(10, 20, 0x9aa5b1, 0xc9d1d9);
  scene.add(grid);

  const rackGroup = new THREE.Group();
  const rackW = 0.6;
  const rackH = 2;
  const rackD = 0.6;

  const bodyGeometry = new THREE.BoxGeometry(rackW, rackH, rackD);
  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: 0x64748b,
    transparent: true,
    opacity: 0.35,
    roughness: 0.6,
    metalness: 0.1,
  });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.position.y = rackH / 2;
  rackGroup.add(body);

  const edgesGeometry = new THREE.EdgesGeometry(bodyGeometry);
  const edgesMaterial = new THREE.LineBasicMaterial({ color: 0x334155 });
  const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
  edges.position.y = rackH / 2;
  rackGroup.add(edges);

  const slotGeometry = new THREE.BoxGeometry(rackW - 0.06, 0.04, rackD - 0.06);
  const slotMaterial = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.5, metalness: 0.2 });
  for (let i = 1; i <= 7; i++) {
    const slot = new THREE.Mesh(slotGeometry, slotMaterial);
    slot.position.y = (rackH / 8) * i;
    rackGroup.add(slot);
  }
  scene.add(rackGroup);

  // 迷你轨道交互:拖拽环绕 + 待机自转
  let dragging = false;
  let lastX = 0;
  let lastY = 0;
  let autoRotating = true;
  const onPointerDown = (e) => {
    dragging = true;
    autoRotating = false;
    lastX = e.clientX;
    lastY = e.clientY;
  };
  const onPointerMove = (e) => {
    if (!dragging) return;
    theta -= (e.clientX - lastX) * 0.005;
    phi = Math.max(0.2, Math.min(1.45, phi - (e.clientY - lastY) * 0.005));
    lastX = e.clientX;
    lastY = e.clientY;
    updateCamera();
  };
  const onPointerUp = () => {
    dragging = false;
  };
  const canvas = renderer.domElement;
  canvas.addEventListener("pointerdown", onPointerDown);
  window.addEventListener("pointermove", onPointerMove);
  window.addEventListener("pointerup", onPointerUp);

  let frameId = 0;
  const animate = () => {
    frameId = requestAnimationFrame(animate);
    if (autoRotating) {
      theta += 0.003;
      updateCamera();
    }
    renderer.render(scene, camera);
  };
  animate();

  const resize = () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (w > 0 && h > 0) {
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);
  resize();

  return () => {
    cancelAnimationFrame(frameId);
    resizeObserver.disconnect();
    canvas.removeEventListener("pointerdown", onPointerDown);
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
    bodyGeometry.dispose();
    edgesGeometry.dispose();
    slotGeometry.dispose();
    bodyMaterial.dispose();
    edgesMaterial.dispose();
    slotMaterial.dispose();
    renderer.dispose();
    if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
  };
}

// 挂载 3D 场景到 containerRef,返回状态:"ready" | "error"
export function useThreeScene(containerRef) {
  const [status, setStatus] = useState("ready");

  useEffect(() => {
    if (!THREE || !containerRef.current) {
      setStatus("error");
      return undefined;
    }
    const cleanup = createScene(THREE, containerRef.current);
    return cleanup;
  }, []);

  return status;
}
