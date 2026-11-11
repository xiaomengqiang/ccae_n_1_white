// Layer 2: AI 对话面板（算小维）mock 数据 — 守护效果、故障隐患/能效卡片、智能体事件
export const aiPanelMeta = {
  name: "算小维",
  timeRange: "近一天",
};

export const aiHero = {
  avatar: "./assets/uploads/suanxiaowei.png",
  bubbleLead: "算小维",
  bubbleText: "在岗，健康守护中～",
};

// 守护效果正文:分段富文本。tone "grad" = 紫粉渐变,"error" = 红色
export const guardSummary = [
  { text: "正在守护" },
  { text: "8个超节点，" },
  { text: "8192卡，", tone: "grad" },
  { text: "13个训练作业，", tone: "grad" },
  { text: "16个推理服务，", tone: "grad" },
  { text: "业务均正常。目前共" },
  { text: "2", tone: "error" },
  { text: "项待" },
  { text: "人工处理的资源事件需关注", tone: "grad" },
];

export const faultCard = {
  title: "故障与隐患",
  stats: [
    { key: "recover", label: "故障恢复", num: "3", rest: "/15", numTone: "error" },
    { key: "hazard", label: "隐患处理", num: "0", rest: "/18" },
  ],
  rate: { value: "66.2", unit: "%", label: "自动闭环率" },
  metrics: [
    {
      key: "availability",
      label: "作业可用度",
      value: "99.54",
      unit: "%",
      trend: [99.52, 99.53, 99.52, 99.54, 99.53, 99.54, 99.53, 99.54, 99.54, 99.53, 99.54, 99.54],
    },
    {
      key: "successRate",
      label: "请求成功率",
      value: "99.74",
      unit: "%",
      trend: [99.72, 99.73, 99.72, 99.74, 99.73, 99.74, 99.73, 99.74, 99.74, 99.73, 99.74, 99.74],
    },
  ],
};

export const energyCard = {
  title: "能效优化",
  status: "节能中",
  ratio: { value: "86", unit: "/128", label: "节能中/节点总数" },
  metrics: [
    {
      key: "mediumModel",
      label: "中型模型·百万Token能耗",
      value: "2.56",
      unit: "kWh/Mtoken",
      alert: true,
      trend: [2.58, 2.57, 2.58, 2.56, 2.57, 2.56, 2.57, 2.56, 2.56, 2.57, 2.56, 2.56],
    },
    {
      key: "largeModel",
      label: "大型模型·百万Token能耗",
      value: "3.78",
      unit: "kWh/Mtoken",
      trend: [3.8, 3.79, 3.8, 3.78, 3.79, 3.78, 3.79, 3.78, 3.78, 3.79, 3.78, 3.78],
    },
  ],
};

export const agentEvents = {
  title: "智能体事件",
  filterLabel: "仅显示影响业务事件",
  viewAllLabel: "查看全部",
  segments: [
    { key: "manual", label: "待人工处理", count: 3, tone: "error" },
    { key: "auto", label: "自动处理中", count: 1, tone: "default" },
  ],
  list: [
    {
      key: "evt-link-dirty",
      title: "光链路脏污，待清污",
      time: "12:00:40",
      desc: "计算柜11-L1交换板02链路已优雅隔离，等待人工清污",
      affectsBusiness: false,
      focusId: "A-15",
    },
    {
      key: "evt-npu-linkdown",
      title: "NPU网口linkdown",
      time: "11:57:00",
      desc: "SuperpodD · 计算柜08，等待人工处理",
      affectsBusiness: true,
      focusId: "D-08",
    },
    {
      key: "evt-npu-firmware",
      title: "NPU驱动固件版本不一致",
      time: "11:55:00",
      desc: "SuperpodD · 计算柜08，等待人工处理",
      affectsBusiness: false,
      focusId: "D-08",
    },
  ],
  // 「自动处理中」分段的单条 mock 事件(橙色旋转圆环图标)
  autoList: [
    {
      key: "evt-hbm-temp",
      title: "HBM 温度偏高，自动降频中",
      time: "12:06:12",
      desc: "SuperpodB · 计算柜03，预计 3 分钟后恢复",
    },
  ],
  // 「查看全部」抽屉:6 条 mock(含状态标签)
  drawerList: [
    { key: "d1", title: "光链路脏污，待清污", time: "12:00:40", status: "待人工" },
    { key: "d2", title: "NPU网口linkdown", time: "11:57:00", status: "待人工" },
    { key: "d3", title: "NPU驱动固件版本不一致", time: "11:55:00", status: "待人工" },
    { key: "d4", title: "HBM 温度偏高，自动降频中", time: "12:06:12", status: "自动处理中" },
    { key: "d5", title: "冗余电源模块已自动切换", time: "11:32:08", status: "已闭环" },
    { key: "d6", title: "光模块 CRC 告警已自动恢复", time: "10:58:41", status: "已闭环" },
  ],
};

// 「近一天」下拉选项
export const rangeOptions = ["近1小时", "近一天", "近7天"];

// 算小维问答 mock:按关键词匹配回答,locateId 存在时显示「在机房中定位」
export function answerFor(question) {
  const q = question || "";
  if (q.includes("A-15")) {
    return {
      text: "A-15（SuperpodA · 计算柜15）检测到 NPU 故障，已自动隔离 2 张卡，训练作业已迁移，当前等待人工更换。",
      locateId: "A-15",
    };
  }
  if (q.includes("D-08")) {
    return {
      text: "D-08（SuperpodD · 计算柜08）NPU 网口 linkdown，链路已优雅隔离，等待人工处理。",
      locateId: "D-08",
    };
  }
  return { text: "当前集群整体健康，2 项待人工处理事件需关注。", locateId: null };
}

export const chatInput = {
  placeholder: "输入问题或输入“/”触发提示词",
};
