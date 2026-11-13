#!/usr/bin/env node
// scripts/build-standalone.mjs — 生成单文件可交互 demo HTML（双击即可打开，无任何外部依赖）
// 用法：
//   1) python3 scripts/subset-fonts.py      # 首次或文案变化后：按页面实际用字裁剪 HarmonyOS 字体（17MB → 约 1MB）
//   2) node scripts/build-standalone.mjs
// 输出：dist/CCAE-S01-智能首页-可交互demo.html
//
// 关键点：
// - 库脚本内联时转义 "</script" 与 "<!--"，否则 hui-charts 等库里的字符串会提前截断 <script>
// - 3D 页整页 base64 后放入 <script type="text/plain">，运行时生成 Blob URL 给 iframe（不再走 srcdoc，避免多层转义）
// - 所有 ./assets/uploads/** 图片打包成资产表，运行时拦截 img/src、setAttribute 把路径映射为 data URI
// - 字体 url('assets/font/...') 替换为裁剪后的 woff data URI
// - 在线图标（octo.hdesign.huawei.com）请求立即失败，图标组件走本地降级

import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, dirname, extname, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "dist", "CCAE-S01-智能首页-可交互demo.html");
const FONT_SUBSET_DIR = join(ROOT, "scripts", "standalone-fonts");

const MIME = {
  ".png": "image/png", ".svg": "image/svg+xml", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".gif": "image/gif", ".webp": "image/webp", ".woff": "font/woff", ".woff2": "font/woff2",
};

const dataURI = (abs) => `data:${MIME[extname(abs).toLowerCase()] || "application/octet-stream"};base64,${readFileSync(abs).toString("base64")}`;
const escScript = (code) => code.replace(/<\/script/gi, "<\\/script").replace(/<!--/g, "<\\!--");

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const n of readdirSync(dir)) {
    const p = join(dir, n);
    const st = statSync(p);
    if (st.isDirectory()) { if (n !== "raw") walk(p, out); }
    else if (MIME[extname(n).toLowerCase()]) out.push(p);
  }
  return out;
}

// 资产表：key = "uploads/xxx/yyy.png"（相对 assets/），运行时按路径中 "assets/uploads/" 之后部分匹配
function assetMap(appDir) {
  const base = join(ROOT, appDir, "assets");
  const map = {};
  for (const f of walk(join(base, "uploads"))) map[relative(base, f).split(sep).join("/")] = dataURI(f);
  return map;
}

function runtimeShim(map) {
  return `<script>
(function(){
  var MAP = ${JSON.stringify(map)};
  function fix(v){
    if (typeof v !== "string") return v;
    var i = v.indexOf("assets/uploads/");
    if (i === -1) return v;
    var k = v.slice(i + 7).split("?")[0].split("#")[0];
    return MAP[k] || v;
  }
  window.__fixAsset = fix;
  var sa = Element.prototype.setAttribute;
  Element.prototype.setAttribute = function(n, v){
    if (n === "src" || n === "href" || n === "xlink:href" || n === "poster") v = fix(v);
    return sa.call(this, n, v);
  };
  [HTMLImageElement, HTMLSourceElement].forEach(function(C){
    var d = Object.getOwnPropertyDescriptor(C.prototype, "src");
    if (d && d.set) Object.defineProperty(C.prototype, "src", { get: d.get, set: function(v){ d.set.call(this, fix(v)); }, configurable: true });
  });
  var of = window.fetch;
  window.fetch = function(input, init){
    var url = typeof input === "string" ? input : (input && input.url) || "";
    if (url.indexOf("octo.hdesign.huawei.com") !== -1) return Promise.reject(new TypeError("offline icon service disabled"));
    if (url.indexOf("assets/uploads/") !== -1 && fix(url) !== url) return of.call(this, fix(url), init);
    return of.call(this, input, init);
  };
})();
</script>`;
}

function inlineLibs(html, appDir) {
  return html.replace(/<script src="(\.\/assets\/library\/[^"]+)"><\/script>/g, (_, src) => {
    const code = readFileSync(join(ROOT, appDir, src.slice(2)), "utf8");
    return `<script>\n${escScript(code)}\n</script>`;
  });
}

function inlineFonts(html, appDir) {
  return html.replace(/url\((['"]?)(\.?\/?assets\/font\/[^'")]+)\1\)/g, (full, q, p) => {
    const name = p.split("/").pop();                       // Regular.woff2
    const sub = join(FONT_SUBSET_DIR, name.replace(/\.woff2$/, ".woff"));
    const abs = existsSync(sub) ? sub : join(ROOT, appDir, p.replace(/^\.?\//, ""));
    const fmt = abs.endsWith(".woff") ? "" : "";
    return `url('${dataURI(abs)}')${fmt}`;
  }).replace(/format\('woff2'\)/g, (m) => existsSync(FONT_SUBSET_DIR) ? "format('woff')" : m);
}

function injectHead(html, s) {
  // 资产/网络 shim 必须早于任何应用脚本执行
  return html.replace(/<head>/i, () => `<head>\n${s}`);
}

// —— 3D 页 ——
let three = readFileSync(join(ROOT, "preview-3d/index.page.html"), "utf8");
three = injectHead(three, runtimeShim(assetMap("preview-3d")));
three = inlineLibs(three, "preview-3d");
three = inlineFonts(three, "preview-3d");
const threeB64 = Buffer.from(three, "utf8").toString("base64");

// —— 主页面 ——
let main = readFileSync(join(ROOT, "preview/index.page.html"), "utf8");
// 注意：所有注入都必须在内联库之前完成（库代码里含有 "<head>"/"<body>" 字样，内联后再做正则会插进库代码里）
const bootstrap3D = `<script type="text/plain" id="cab3d-b64">${threeB64}</script>
<script>
(function(){
  var b64 = document.getElementById("cab3d-b64").textContent.trim();
  var bin = atob(b64), u8 = new Uint8Array(bin.length);
  for (var i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
  window.__CAB3D_URL = URL.createObjectURL(new Blob([u8], { type: "text/html;charset=utf-8" }));
})();
</script>`;
main = injectHead(main, runtimeShim(assetMap("preview")));
main = main.replace(/<body([^>]*)>/i, (m) => `${m}\n${bootstrap3D}`);
main = inlineLibs(main, "preview");
main = inlineFonts(main, "preview");

const before = main;
main = main.replace(/src="\.\.\/preview-3d\/index\.page\.html"/g, "src={window.__CAB3D_URL}");
if (main === before) throw new Error("未找到 3D iframe 的 src，构建中止");

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, main, "utf8");
console.log(`OK  ${relative(ROOT, OUT)}  ${(Buffer.byteLength(main) / 1048576).toFixed(1)} MB`);
