// Layer 2: 首页指标区 mock 数据 — 基础设施指标 + 训练/推理作业状态
export const infrastructureMetrics = [
  { key: "fault", label: "故障数", value: "2", unit: "", icon: "fault", tone: "error" },
  { key: "hazard", label: "隐患数", value: "0", unit: "", icon: "hazard", tone: "warning" },
  { key: "npu", label: "NPU利用率", value: "76.4", unit: "%", icon: "npu", tone: "info" },
  { key: "hbm", label: "HBM利用率", value: "74.2", unit: "%", icon: "hbm", tone: "purple" },
  { key: "energy", label: "能耗", value: "771", unit: "kW", icon: "energy", tone: "success" },
];

// 2×2 小图标网格:左上链路、右上三角警示、左下下降趋势、右下绿色实心播放
export const jobStatusIcons = [
  { key: "link", icon: "link", tone: "muted" },
  { key: "alert", icon: "triangle-alert", tone: "muted" },
  { key: "trend-down", icon: "trending-down", tone: "muted" },
  { key: "play", icon: "play", tone: "success" },
];

export const jobStatuses = [
  {
    key: "training",
    label: "训练作业",
    status: "正常",
    total: 13,
  },
  {
    key: "inference",
    label: "推理服务",
    status: "正常",
    total: 16,
  },
];
