// Layer 2: 集群保障时间轴 mock 数据 — 三组图例、时间区间与事件胶囊
export const timelineMeta = {
  title: "集群保障时间轴",
  rangeLabel: "近24h",
};

export const timelineRange = {
  start: "11:54:00",
  end: "12:13:00",
  now: "12:10:00",
};

// 三组图例(组间竖线分隔):故障/隐患/节能机会 | 待人工处理/自动处理中/已闭环 | 影响到业务
export const legendGroups = [
  [
    { key: "fault", label: "故障" },
    { key: "hazard", label: "隐患" },
    { key: "saving", label: "节能机会" },
  ],
  [
    { key: "manual", label: "待人工处理" },
    { key: "auto", label: "自动处理中" },
    { key: "closed", label: "已闭环" },
  ],
  [{ key: "impact", label: "影响到业务" }],
];

// 事件胶囊(轨道上):白底胶囊 = 灰描边三角(已闭环隐患) + 红实心圆白三角(故障)
// badge:hand = 右上角红描边小圆(红手掌);hand-star = 红描边小胶囊(红手掌+橙八角星)
export const timelineEvents = [
  { key: "evt-1200", time: "12:00:00", badge: "hand" },
  { key: "evt-1204", time: "12:04:00", badge: "hand-star" },
];
