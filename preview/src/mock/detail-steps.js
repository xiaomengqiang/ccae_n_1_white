// Layer 2: S03 诊断详情页 mock — 光链路 / Qwen 两套处理步骤与图表文字
// step.status: "done"(已完成) | "manual"(待人工处理,当前) | "none"(无可用方案)

export const OPTICAL_STEPS = [
  {
    key: "sense", name: "事件感知", status: "done",
    record: { time: "12:00:00", title: "感知光链路闪断告警" },
    body: "计算柜11-L1交换板02 光链路出现闪断，自动触发诊断",
  },
  {
    key: "analyze", name: "故障分析", status: "done",
    record: { time: "12:00:28", title: "光链路通道功率与错误计数分析" },
    body: "通道4收光功率低于阈值 −3.2 dBm，错误计数持续上升，判定光模块端面脏污",
  },
  {
    key: "decide", name: "方案决策", status: "done",
    record: { time: "12:00:40", title: "已完成L1-L2异常链路优雅隔离，并生成待办事件需人工处理" },
  },
  {
    key: "recover", name: "故障恢复", status: "manual",
    // 展开内容:opt-recover-body 图 + 两张图表(DOM 文字)
    recover: true,
  },
];

export const QWEN_STEPS = [
  { key: "q-sense", name: "事件感知", status: "done", body: "12:05:12 感知 Qwen-1.5B 请求成功率下降至 77.5%" },
  { key: "q-diag", name: "业务故障诊断", status: "done", body: "12:05:22 定位 D-08 实例异常退出，影响 Qwen-1.5B 服务" },
  { key: "q-plan", name: "业务恢复方案决策", status: "none", body: "12:05:30 实例重启无法恢复，需先修复资源故障" },
  { key: "q-rdiag", name: "资源故障诊断", status: "done", body: "12:05:36 112.34.23.1 · CPU02 hinic3 网卡驱动版本 V11.8 过低" },
  { key: "q-rplan", name: "资源恢复方案决策", status: "done", body: "12:05:40 生成网卡驱动升级方案 V11.8 → V13.1，需人工授权" },
  { key: "q-recover", name: "故障恢复", status: "manual", qwenRecover: true },
];

// 光功率图表文字(相对 chart-power.svg 左上)
export const POWER_CHART = {
  title: "光功率（dBm）",
  yTicks: [
    { text: "0", x: 18, y: 21 },
    { text: "-5", x: 13, y: 59.67 },
    { text: "-10", x: 7, y: 98.33 },
    { text: "-15", x: 7, y: 137 },
  ],
  threshold: { text: "低功率阈值 −3.2", x: 325, y: 35.75, color: "#E02128" },
  xTicks: [
    { text: "12:00:40", x: 20 }, { text: "12:05:40", x: 69.71 }, { text: "12:10:40", x: 119.43 },
    { text: "12:15:40", x: 169.14 }, { text: "12:20:40", x: 218.86 }, { text: "12:25:40", x: 268.57 },
    { text: "12:30:40", x: 318.29 }, { text: "12:35:40", x: 368 },
  ],
  xTickY: 153,
  legend: {
    y: 179, textY: 184,
    items: [
      { label: "通道1", x: 52, dotX: 40, color: "#2F7BFF" },
      { label: "通道2", x: 144, dotX: 132, color: "#34C38F" },
      { label: "通道3", x: 236, dotX: 224, color: "#8B6FF2" },
      { label: "通道4", x: 328, dotX: 316, color: "#E02128" },
    ],
  },
};

// 错误次数图表文字(相对 chart-errors.svg 左上)
export const ERRORS_CHART = {
  title: "错误次数（次）",
  yTicks: [
    { text: "120", x: 6, y: 23 },
    { text: "80", x: 12, y: 53.67 },
    { text: "40", x: 12, y: 84.33 },
    { text: "0", x: 18, y: 115 },
  ],
  xTicks: POWER_CHART.xTicks,
  xTickY: 132,
};

// 监控记录抽屉(光链路,6 条 mock)
export const MONITOR_RECORDS = [
  { time: "12:00:40", text: "通道4 收光功率 −3.2 dBm,低于阈值" },
  { time: "12:01:10", text: "通道4 错误计数 42 → 68,持续上升" },
  { time: "12:02:00", text: "L1-L2 异常链路已优雅隔离,流量切换至备份通道" },
  { time: "12:05:00", text: "通道1/2/3 光功率稳定,均值 −1.1 dBm" },
  { time: "12:10:00", text: "通道4 持续离线,待人工清污" },
  { time: "12:15:00", text: "巡检建议:清洁 光模块-4 端面后复测" },
];

// 详情页头信息
export const DETAIL_META = {
  optical: { assetKey: "opt", name: "光链路脏污,待清污" },
  qwen: { assetKey: "qw", name: "Qwen-1.5B 在线服务劣化" },
};
