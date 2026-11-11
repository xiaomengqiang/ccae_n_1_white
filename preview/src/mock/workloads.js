// Layer 2: S02 业务视图 mock 数据 — 训练作业 / 推理服务
// status: "interrupt"(中断,含待人工) | "degrade"(劣化) | "stall"(卡死) | "normal"(正常运行)

export const INFER_METRICS = [
  { key: "total", label: "服务总数", bg: "#E6F2FD", icon: "st-total", value: 16 },
  { key: "interrupt", label: "中断", bg: "#FEE7E8", icon: "st-interrupt", value: 1, numColor: "#E02128" },
  { key: "stall", label: "卡死", bg: "#FEF5E8", icon: "st-stall", value: 0 },
  { key: "degrade", label: "劣化", bg: "rgba(253,229,92,.6)", icon: "st-degrade", value: 1, numColor: "#C76207" },
  { key: "normal", label: "正常运行", bg: "#E7FBF2", icon: "st-normal", value: 14 },
];

export const TRAIN_METRICS = [
  { key: "total", label: "运行总数", bg: "#E6F2FD", icon: "st-total", value: 13 },
  { key: "interrupt", label: "中断", bg: "#FEE7E8", icon: "st-interrupt", value: 0 },
  { key: "stall", label: "卡死", bg: "#FEF5E8", icon: "st-stall", value: 0 },
  { key: "degrade", label: "劣化", bg: "rgba(253,229,92,.6)", icon: "st-degrade", value: 0 },
  { key: "normal", label: "正常运行", bg: "#E7FBF2", icon: "st-normal", value: 13 },
];

// 收起态摘要(2×2 小图标 + 两行文字)
export const COLLAPSED_ICONS = {
  infra: [
    { icon: "mini-alert-red", bg: "#FEE7E8" },
    { icon: "mini-security", bg: "#F3F3F3" },
    { icon: "mini-cpu", bg: "#F3F3F3" },
    { icon: "mini-more", bg: "#F3F3F3", opacity: 0.58 },
  ],
  job: [
    { icon: "mini-interrupt", bg: "#F3F3F3" },
    { icon: "mini-alert", bg: "#F3F3F3" },
    { icon: "mini-degrade", bg: "#F3F3F3" },
    { icon: "mini-play", bg: "#E7FBF2" },
  ],
};

// 推理服务 16 个(异常在前)
export const INFER_SERVICES = [
  {
    key: "svc-qwen15", name: "Qwen-1.5B 在线服务", icon: "qwen",
    status: "interrupt", statusLabel: "中断 · 待人工处理", time: "08-22 09:02",
    successRate: "99.94", requests: "124860 / 124781 / 79", failed: "79",
    npuCards: 32, ttft: "182", tpot: "23.6", tokens: "8.42",
    manual: "1 / 29",
  },
  {
    key: "svc-qwen14", name: "Qwen-14B", icon: "qwen",
    status: "degrade", statusLabel: "劣化", time: "08-22 08:10",
    successRate: "99.97", requests: "286420 / 286332 / 88", failed: "88",
    npuCards: 48, ttft: "146", tpot: "18.2", tokens: "16.8",
    manual: "0 / 19",
  },
  {
    key: "svc-vision3b", name: "视觉理解服务-3B", icon: "cube",
    status: "normal", statusLabel: "正常运行", time: "08-22 07:55",
    successRate: "99.93", requests: "68210 / 68163 / 47", failed: "47",
    npuCards: 16, ttft: "238", tpot: "31.4", tokens: "3.21",
    manual: "0 / 46",
  },
  {
    key: "svc-copilot", name: "代码生成 Copilot-1.5B", icon: "cube",
    status: "normal", statusLabel: "正常运行", time: "08-22 06:26",
    successRate: "99.95", requests: "47380 / 47358 / 22", failed: "22",
    npuCards: 24, ttft: "520", tpot: "66.8", tokens: "2.08",
    manual: "0 / 28",
  },
  { key: "svc-qwen7b", name: "Qwen-7B 对话服务", icon: "qwen", status: "normal", statusLabel: "正常运行", time: "08-22 06:10", successRate: "99.96", requests: "198340 / 198287 / 53", failed: "53", npuCards: 32, ttft: "164", tpot: "21.4", tokens: "12.6", manual: "0 / 34" },
  { key: "svc-qwen72b", name: "Qwen-72B 长文本", icon: "qwen", status: "normal", statusLabel: "正常运行", time: "08-22 05:48", successRate: "99.91", requests: "42860 / 42819 / 41", failed: "41", npuCards: 128, ttft: "312", tpot: "42.6", tokens: "5.18", manual: "0 / 12" },
  { key: "svc-asr", name: "语音识别 ASR-1B", icon: "cube", status: "normal", statusLabel: "正常运行", time: "08-22 05:20", successRate: "99.98", requests: "88120 / 88098 / 22", failed: "22", npuCards: 16, ttft: "96", tpot: "12.8", tokens: "6.74", manual: "0 / 41" },
  { key: "svc-tts", name: "语音合成 TTS-0.6B", icon: "cube", status: "normal", statusLabel: "正常运行", time: "08-22 04:55", successRate: "99.99", requests: "15640 / 15636 / 4", failed: "4", npuCards: 8, ttft: "88", tpot: "11.2", tokens: "2.44", manual: "0 / 18" },
  { key: "svc-bge", name: "Embedding-bge-m3", icon: "cube", status: "normal", statusLabel: "正常运行", time: "08-22 04:30", successRate: "99.97", requests: "214580 / 214498 / 82", failed: "82", npuCards: 16, ttft: "42", tpot: "8.6", tokens: "18.9", manual: "0 / 52" },
  { key: "svc-rerank", name: "Rerank-v2", icon: "cube", status: "normal", statusLabel: "正常运行", time: "08-22 04:12", successRate: "99.96", requests: "96840 / 96801 / 39", failed: "39", npuCards: 8, ttft: "54", tpot: "9.4", tokens: "7.02", manual: "0 / 25" },
  { key: "svc-ocr", name: "OCR 文档解析", icon: "cube", status: "normal", statusLabel: "正常运行", time: "08-22 03:48", successRate: "99.94", requests: "64180 / 64121 / 59", failed: "59", npuCards: 24, ttft: "204", tpot: "28.6", tokens: "4.36", manual: "0 / 33" },
  { key: "svc-mm-retrieval", name: "多模态检索", icon: "cube", status: "normal", statusLabel: "正常运行", time: "08-22 03:20", successRate: "99.95", requests: "78260 / 78203 / 57", failed: "57", npuCards: 32, ttft: "176", tpot: "24.2", tokens: "9.14", manual: "0 / 27" },
  { key: "svc-agent", name: "智能客服 Agent", icon: "cube", status: "normal", statusLabel: "正常运行", time: "08-22 02:58", successRate: "99.92", requests: "112430 / 112278 / 152", failed: "152", npuCards: 16, ttft: "148", tpot: "19.8", tokens: "11.2", manual: "0 / 45" },
  { key: "svc-nllb", name: "翻译服务 NLLB", icon: "cube", status: "normal", statusLabel: "正常运行", time: "08-22 02:34", successRate: "99.98", requests: "134890 / 134856 / 34", failed: "34", npuCards: 16, ttft: "112", tpot: "15.6", tokens: "8.88", manual: "0 / 31" },
  { key: "svc-summ", name: "摘要生成 Summ-3B", icon: "cube", status: "normal", statusLabel: "正常运行", time: "08-22 02:10", successRate: "99.96", requests: "57620 / 57588 / 32", failed: "32", npuCards: 16, ttft: "134", tpot: "17.4", tokens: "5.62", manual: "0 / 22" },
  { key: "svc-rag", name: "知识库问答 RAG", icon: "cube", status: "normal", statusLabel: "正常运行", time: "08-22 01:45", successRate: "99.93", requests: "102340 / 102247 / 93", failed: "93", npuCards: 24, ttft: "188", tpot: "26.1", tokens: "7.78", manual: "0 / 38" },
];

// 训练作业 13 个(全部正常运行;字段:进度|步数|卡数|MFU|迭代耗时|Loss|断点续训/守护)
export const TRAIN_JOBS = [
  { key: "job-pangu38", name: "Pangu-38B 预训练", progress: "62.4", steps: "186000 / 300000", npuCards: 1024, mfu: "52.3", iterTime: "1.82", loss: "1.734", manual: "0 / 38", time: "08-22 09:00" },
  { key: "job-pangu135", name: "Pangu-135B 预训练", progress: "41.8", steps: "84200 / 201600", npuCards: 2048, mfu: "48.6", iterTime: "3.94", loss: "2.106", manual: "0 / 52", time: "08-22 08:40" },
  { key: "job-qwen72-sft", name: "Qwen-72B SFT", progress: "78.2", steps: "94800 / 121200", npuCards: 512, mfu: "56.8", iterTime: "1.24", loss: "0.842", manual: "0 / 26", time: "08-22 08:15" },
  { key: "job-ds3-lora", name: "DeepSeek-V3 LoRA 微调", progress: "35.6", steps: "42600 / 119600", npuCards: 256, mfu: "44.2", iterTime: "0.86", loss: "1.284", manual: "0 / 19", time: "08-22 07:50" },
  { key: "job-vit22", name: "多模态 ViT-22B 预训练", progress: "55.1", steps: "128400 / 233000", npuCards: 1024, mfu: "51.4", iterTime: "2.48", loss: "1.918", manual: "0 / 44", time: "08-22 07:25" },
  { key: "job-whisper", name: "语音大模型 Whisper-L 微调", progress: "82.7", steps: "76800 / 92800", npuCards: 128, mfu: "58.2", iterTime: "0.64", loss: "0.612", manual: "0 / 16", time: "08-22 07:00" },
  { key: "job-dlrm", name: "推荐模型 DLRM 训练", progress: "91.3", steps: "412000 / 451400", npuCards: 64, mfu: "62.8", iterTime: "0.22", loss: "0.318", manual: "0 / 61", time: "08-22 06:35" },
  { key: "job-starcoder", name: "代码模型 StarCoder-15B 续训", progress: "48.9", steps: "96200 / 196800", npuCards: 256, mfu: "47.6", iterTime: "1.08", loss: "1.452", manual: "0 / 23", time: "08-22 06:10" },
  { key: "job-rm7b", name: "RLHF 奖励模型 RM-7B", progress: "67.4", steps: "58200 / 86300", npuCards: 64, mfu: "54.1", iterTime: "0.42", loss: "0.724", manual: "0 / 18", time: "08-22 05:45" },
  { key: "job-sdxl", name: "文生图 SDXL 微调", progress: "73.8", steps: "88400 / 119800", npuCards: 128, mfu: "49.8", iterTime: "1.62", loss: "0.968", manual: "0 / 21", time: "08-22 05:20" },
  { key: "job-embed-cl", name: "Embedding 对比学习", progress: "88.2", steps: "342000 / 387800", npuCards: 64, mfu: "60.4", iterTime: "0.18", loss: "0.246", manual: "0 / 36", time: "08-22 04:55" },
  { key: "job-med-sft", name: "医疗问答 SFT-13B", progress: "59.6", steps: "64800 / 108700", npuCards: 128, mfu: "53.2", iterTime: "0.94", loss: "1.104", manual: "0 / 28", time: "08-22 04:30" },
  { key: "job-fin-pt", name: "金融大模型 增量预训练", progress: "44.2", steps: "52400 / 118500", npuCards: 512, mfu: "46.8", iterTime: "2.16", loss: "1.628", manual: "0 / 33", time: "08-22 04:05" },
];
