# ccae_n_1_white — 机房 3D 可视化页面原型

基于 `ict-coder` skill 体系生成的两个自运行单页工程:主布局页面 + 3D 机柜 iframe 页面。产物均为不依赖网络的 `index.page.html`(React + Ant Design 5 + Design Token,本地 UMD 资源)。

## 目录结构

```
.opencode/skills/ict-coder/   ict-coder skill 本体(SKILL.md + references/ + scripts/),构建脚本的唯一来源
preview/                      主页面工程(app.jsx + src/)
preview-3d/                   3D 机柜页面工程(iframe 内嵌页,three.js)
```

## 本地预览

- 主页面:双击打开 `preview/index.page.html`(若浏览器拦截 file:// 页面加载 iframe,改用本地 http 服务,如 `npx serve`)
- 3D 页面:`preview-3d/index.page.html` 可独立打开,也被主页面机柜区域以 iframe 内嵌(相对路径 `../preview-3d/index.page.html`,两工程须保持同级)

## 构建与验证(两个页面各自独立执行)

```powershell
# 主页面
node .opencode/skills/ict-coder/scripts/build.mjs --dir "preview"
node .opencode/skills/ict-coder/scripts/verify-build.mjs --dir "preview"

# 3D 页面(用 build-3d.mjs:构建期注入 three.js)
node .opencode/skills/ict-coder/scripts/build-3d.mjs --dir "preview-3d"
node .opencode/skills/ict-coder/scripts/verify-build.mjs --dir "preview-3d"
```

修改页面时只改 `src/` 源码后重新 build,**禁止直接编辑产物 index.page.html**。详见 `.opencode/skills/ict-coder/SKILL.md`(修改工作流章节)。

## 关键非显性约定(重要)

1. **preview-3d 的来历**:`init.mjs` 写死脚手架目录名为 `preview`,preview-3d 是先在临时目录初始化再移动改名得到的。修改会话中不要再对任何页面执行 init.mjs(它会复用现有 app.jsx,无害但无意义)。
2. **3D 页面必须用 `scripts/build-3d.mjs` 构建**:three.min.js(r147 UMD)以 `<script>` 标签与其他库一同注入产物 HTML,源码写 `import THREE from "three"`(构建期映射为 `window.THREE` 全局)。差异明细见 build-3d.mjs 文件头注释。
3. **verify-build 是无头验证**:React 组件不会真正挂载(useEffect 不执行),3D 场景初始化对验证不可见,验证通过不代表 3D 渲染正常,需在浏览器中人工确认。
4. **iframe 指向**:主页面机柜区域 iframe src 为相对路径 `../preview-3d/index.page.html`,preview/ 与 preview-3d/ 的同级关系不能变,否则 iframe 失效。
5. **assets 是真实文件**:两个页面工程的 assets/ 均为完整拷贝(非 junction 链接),这是刻意选择。skill 更新共享资源后不会自动传播,如需同步删除 assets/ 后重新拷贝。

## 提交约定

- 提交信息用中文,风格如「安装 ict-coder skill 并生成空页面预览脚手架」。
- 两个页面工程及其 assets(约 50MB)已纳入版本管理,属预期行为。

## AI 协作

- 本仓库同时有 `AGENTS.md`(AI 工具自动读取的入口指针):本 readme 即唯一内容源,AI 会话开始前请完整阅读本文件。
