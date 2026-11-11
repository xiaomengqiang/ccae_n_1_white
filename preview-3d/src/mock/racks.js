// Layer 2: 机柜阵列 mock 数据 — Superpod 布局与状态高亮
// pod 命名:由远到近 G H / E F / C D / A B;index 1–20 从左到右

export const RACKS_PER_POD = 20;

export const PODS = [
  { id: "A", row: 3, col: 0 },
  { id: "B", row: 3, col: 1 },
  { id: "C", row: 2, col: 0 },
  { id: "D", row: 2, col: 1 },
  { id: "E", row: 1, col: 0 },
  { id: "F", row: 1, col: 1 },
  { id: "G", row: 0, col: 0 },
  { id: "H", row: 0, col: 1 },
];

// 状态机柜(mock)
export const HIGHLIGHTS = {
  // 自动处理中:整体覆盖橙→粉紫→蓝竖向渐变发光
  autoProcessing: [{ pod: "A", index: 8 }],
  // 故障·待人工处理:整体覆盖半透明红色
  fault: [{ pod: "A", index: 15 }, { pod: "D", index: 8 }],
  // 节能/下电:A-09~A-12 + 其余各排中间几台,统一用弱条纹效果
  dimmed: [
    { pod: "A", index: 9 }, { pod: "A", index: 10 }, { pod: "A", index: 11 }, { pod: "A", index: 12 },
    { pod: "B", index: 9 }, { pod: "B", index: 10 }, { pod: "B", index: 13 },
    { pod: "C", index: 8 }, { pod: "C", index: 11 }, { pod: "C", index: 12 },
    { pod: "D", index: 10 }, { pod: "D", index: 11 },
    { pod: "E", index: 9 }, { pod: "E", index: 12 }, { pod: "E", index: 13 },
    { pod: "F", index: 8 }, { pod: "F", index: 10 }, { pod: "F", index: 12 },
    { pod: "G", index: 9 }, { pod: "G", index: 10 }, { pod: "G", index: 11 },
    { pod: "H", index: 10 }, { pod: "H", index: 12 },
  ],
};

// 单台机柜状态查询:"auto" | "fault" | "dimmed" | null
export function statusOf(pod, index) {
  if (HIGHLIGHTS.autoProcessing.some((c) => c.pod === pod && c.index === index)) return "auto";
  if (HIGHLIGHTS.fault.some((c) => c.pod === pod && c.index === index)) return "fault";
  if (HIGHLIGHTS.dimmed.some((c) => c.pod === pod && c.index === index)) return "dimmed";
  return null;
}

// 悬浮徽标(mock):glow = 白底圆 + 橙紫渐变三角(自动处理中);
// pin = 白底定位针 + 红色三角 + 红底白手掌角标(故障·待人工处理)
export const BADGES = [
  { key: "glow-A-08", type: "glow", pod: "A", index: 8 },
  { key: "pin-A-15", type: "pin", pod: "A", index: 15 },
  { key: "pin-D-08", type: "pin", pod: "D", index: 8 },
];
