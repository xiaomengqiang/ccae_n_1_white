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

## Qwen 浅色故事 Demo

- 当前预览默认进入同事实现的智能首页。左侧 Qwen 网卡驱动事件、首页时间轴对应事件和推理服务 Qwen 卡片均通过 context 的 `openDetail("qwen")` 进入 **网卡驱动待授权** 状态。故事源码位于 `preview/src/views/qwen-story/`，业务数据与时序位于 `preview/src/mock/qwen.js`。
- 设计来源为 Figma「N+1任何人可编辑版」的 `2972:106385`（S10 / 11.06反馈修订）和 `2972:110604`（展开全部 / 原文对照）。Figma 只读，原图不修改。实际使用的素材已保存至 `preview/assets/uploads/qwen/`，来源节点与校验值见模块内 `asset-manifest.json`，运行时不请求 Figma。
- Qwen 在 `app.jsx` 中作为首页缩放容器的同级视图挂载，避免二次缩放。返回时保留首页筛选、3D iframe 和 Qwen 处理状态；恢复闭环通过 `onResolved` 同步首页及机柜。光链路沿用同事版本，节能故事不接入；未实现的其他事件不跳转到 Qwen。没有传 `onBack` 时，返回按钮打开 Qwen 事件概览。
- 点击「授权升级网卡」后，以演示时长推进到驱动升级中、1.8 秒后健康核查、3.6 秒后恢复闭环。该操作仅改变本地演示状态，不调用真实设备。集成首页后返回再进入保留处理进度，刷新页面可重新演示。
- 实时处理阶段与历史回看时刻分离。6 / 9 / 12 秒分别表示操作系统故障、实例退出、业务劣化；服务总览在修复前始终保持原稿的橙色劣化状态和 77.5% 成功率；图表仍展示各时刻的历史指标。恢复后回看历史不会退回已完成的授权状态。时间范围菜单内「回到最新」、再次点击选中的事件或按 Escape 可回到最新状态。
- 拓扑每个实例显示 8 个 N 和 2 个 C；CPU/NPU 的 U 位沿用深色 Demo 映射。悬浮或键盘聚焦节点联动对应机柜，未关联槽位置灰，故障 CPU 独立保留高亮直至恢复。
- 「处理环节」沿用 S07（`2972:105547`）圆角卡片与时间刻度样式，保留 Qwen 原故事的分支及全部处理内容；非待处理环节用深色 Demo 的绿色机器人，待处理用 S07 红色手。
- 主页面沿用现有构建命令。`src/components/story-chart/` 适配仓库内 HUICharts 的 `setResize/uninstall` 生命周期，避免自带通用封装的接口不匹配；未改动共享库及 3D 工程。
- 先构建和预览验收，仅在用户通知后用中文提交并推送 GitHub。

浏览器回归测试（需要 Node.js 18+ 和测试环境中的 Playwright；不增加页面运行依赖）：

```bash
# 仓库根目录启动服务
python3 -m http.server 8765 --bind 127.0.0.1
# 另一终端；Playwright 可安装在仓库外，通过 NODE_PATH 指向其 node_modules
NODE_PATH=/path/to/test-tools/node_modules \
CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
node tests/qwen-story.browser.cjs
```

测试覆盖初始画面、素材加载、过程折叠、证据查看、故障回看、指标切换、机柜联动、处理环节、授权至闭环、恢复后回看、重置以及 1440×900 缩放。截图写入 `/tmp/ccae-qwen-*.png`。无头构建验证与这些真实浏览器检查分别执行。

首页集成回归：用相同的 `NODE_PATH` / `CHROME_PATH` 环境运行 `node tests/home-qwen.browser.cjs`，覆盖左侧事件与时间轴入口、返回、单次缩放、后台闭环、3D 状态同步和再次进入保留进度。

3D 图形环境：WebGL 初始化失败或上下文丢失时保留页面，显示明确标注的静态机柜概览及「重试 3D」。静态图来自本工程实际 3D 渲染，不支持旋转/缩放；Qwen 闭环状态仍同步，恢复真实 3D 后保留闭环状态。

### 首页事件状态与时间轴

- 首页时间轴采用只读 Figma 选中画板 `2972:100898` 的图标和位置，导出来源见 `preview/src/views/timeline-area/asset-manifest.json`。Qwen 的画板落点沿用设计位置，提示中的实际事件时间仍为 12:05:12。
- 首页保留两项独立 NPU 故障及光链路待清污事件，Qwen 待授权时故障数/待人工数为 4；升级与核验时故障仍为 4、待人工为 3、自动处理中为 1；Qwen 闭环后故障与待人工数为 3、自动处理中为 0。只显示影响业务时，列表与分段计数仅统计 Qwen。
- `qwenStage` 同步详情的实时阶段（历史回看不改变它），用于事件列表、时间轴、首页指标和推理服务列表。Qwen 未闭环时为 1 项劣化、15 项正常，闭环后 16 项正常；其他事件不误跳转到 Qwen。

### 业务对象浏览条

- 推理服务浏览条参考深色低保真 `源码/home/main.js`：悬浮展开对象名称、状态及处理状态；异常对象默认显示图标与首字，卡片保留处理状态标签。点击平滑滚动并选中卡片，不直接进入详情；浏览条的滚轮/触控板输入驱动列表，列表滚动反向更新范围框。方向键支持对象焦点和当前范围移动。
- 推理服务可按状态（中断→卡死→劣化→正常）、成功率、卡数排序，；更换排序或筛选回到首行。当前浅色卡片为每屏四个对象，范围框按两列整行随滚动更新，悬浮展开时按实际短条宽度跟随。保留浅色短条与玻璃样式，不显示翻页按钮、反转按钮及范围页数小字。

- 影响业务筛选由 context 的 `bizOnly` 共享；通过 `impactFilter` 消息同步机柜气泡，场景就绪/iframe 重载后重新同步。仅保留 D-08/Qwen 气泡，取消筛选不恢复已闭环气泡。真实 3D 直接设置场景内气泡 Sprite 的可见性；静态降级图不裁剪、不覆盖，无法演示气泡筛选。时间轴同步筛选，仅保留 Qwen 事件。
- 左侧两卡片分隔线复用 Figma `2972:103742` 的 405×1 SVG，面板坐标 x=38，y=343.5 / 515.5。

### S02 机柜详情

- 点击真实 3D 中超节点 A 的柜体，其他排下沉淡出，镜头 1.5 秒推进正面；到位后以 320ms 衔接预挂载的 S02 原生详情页。点击「上海B5集群」或 Escape 反向返回，保留原总览视角；返回先淡出详情再拉远，避免双层画面同时运动。材质在场景加载时准备及预编译，动效帧复用向量与材质数组。参照最新 Labtour 副本 `CCAE26N+1-AgentDemo-2026-11-13`；其余超节点暂保留原选中交互，不套用 A 的故障故事。
- `preview/src/views/cabinet-area/detail.jsx` / `artwork.jsx` 对应只读 Figma `2972:98551`（S02 · 机柜 / 11.06反馈修订）。柜体采用原生元素与本地 SVG，来源见同目录 `asset-manifest.json`。筛选、正背面和故障提示为独立控件；Qwen/光链路提示进入已有诊断页。左侧事件、顶部指标、时间轴沿用实时故事状态。
- WebGL 失败时仍明确标注静态概览，可用「查看超节点 A 机柜详情」检查 S02 页面；这个入口不模拟镜头飞行，也不代表 WebGL 已恢复。真实动画仍须在支持 WebGL 的浏览器验收。
