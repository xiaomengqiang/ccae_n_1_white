// Story and timing mirror the approved AgentDemo nic-event/event.js.
export const steps = [
  { title: "事件感知", text: "推理服务劣化 12:05:12\n业务影响：Qwen-1.5B 请求成功率降至77.5%\n实例异常：D-08 实例异常退出，服务持续劣化", evidence: ["告警与事件记录"] },
  { title: "业务故障诊断", text: "12:05:22 完成业务故障诊断：节点操作系统崩溃重启，导致 D-08 实例异常退出", evidence: ["告警与事件记录"], chain: ["操作系统崩溃重启", "D-08 实例异常退出", "Qwen-1.5B 请求成功率降至77.5%"] },
  { title: "业务恢复方案决策", text: "12:05:30 评估节点切换方案\n12:05:40 因无可替换节点，无法生成可执行的业务恢复方案" },
  { title: "资源故障诊断", text: "12:05:56 完成 BMC、OS 日志与 vmcore 综合分析：hinic3 网卡驱动版本过低导致操作系统崩溃重启，进而导致服务劣化", evidence: ["BMC 日志分析结果", "OS 日志分析结果", "vmcore 分析结果"], chain: ["网卡驱动版本过低", "操作系统内存耗尽", "内核空指针异常", "操作系统崩溃重启", "D-08 实例异常退出", "Qwen-1.5B 服务劣化"] },
  { title: "资源恢复方案决策", text: "12:06:06 已生成网卡升级方案：将 hinic3 驱动由 V11.8 升级至 V13.1\n无可替换节点，采用原节点人工升级方案；升级后核查驱动版本、D-08 实例和 Qwen-1.5B 服务", evidence: ["处置方案"] },
  { title: "故障恢复", text: "12:06:06 待人工确认执行网卡升级，升级后核查驱动版本、D-08 实例和 Qwen-1.5B 服务" }
];
export const events = [
 { second: 6, title: "操作系统崩溃重启", detail: "节点 112.34.23.1 操作系统崩溃重启", stage: 6, section: 1 },
 { second: 9, title: "D-08 实例异常退出", detail: "节点 112.34.23.1 的 D-08 实例因操作系统崩溃重启而异常退出", stage: 6, section: 1 },
 { second: 12, title: "推理服务劣化", detail: "Qwen-1.5B 请求成功率降至77.5%", stage: 6, section: 1 },
 { second: 72, title: "人工授权升级", detail: "正在执行网卡驱动升级，服务尚未恢复", stage: 7, section: 5 },
 { second: 80, title: "驱动已升级，节点与实例恢复待核查", detail: "hinic3 已升级至 V13.1，正在核查节点、D-08 实例及服务健康", stage: 8, section: 5 },
 { second: 95, title: "健康核查通过", detail: "原节点及 D-08 实例健康核查通过，Qwen-1.5B 服务恢复", stage: 9, section: 5 }
];
export const metrics = [
 { key: "success", label: "请求成功率", unit: "%", normal: 99.94, bad: 77.5 },
 { key: "rate", label: "请求速率", unit: "req/s", normal: 1840, bad: 1840 },
 { key: "ttft", label: "TTFT P99", unit: "ms", normal: 182, bad: 186 },
 { key: "tpot", label: "TPOT P99", unit: "ms", normal: 23.6, bad: 43 },
 { key: "concurrency", label: "并发请求", unit: "", normal: 892, bad: 892 },
 { key: "output", label: "输出吞吐", unit: "k tok/s", normal: 11.2, bad: 8.7 }
];
export const nodes = [
 { name: "P-01", cpuU: 18, npuU: 12, ip: "112.34.13.2", rack: 12, cpu: 65, npu: 160 },
 { name: "P-02", cpuU: 17, npuU: 11, ip: "112.34.13.3", rack: 12, cpu: 84, npu: 174.5 },
 { name: "D-01", cpuU: 16, npuU: 10, ip: "112.34.13.4", rack: 12, cpu: 103, npu: 189 },
 { name: "D-02", cpuU: 15, npuU: 9, ip: "112.34.13.5", rack: 12, cpu: 122, npu: 203.5 },
 { name: "D-03", cpuU: 4, npuU: 8, ip: "112.34.13.6", rack: 12, cpu: 272, npu: 218 },
 { name: "D-04", cpuU: 3, npuU: 7, ip: "112.34.13.7", rack: 12, cpu: 291, npu: 232.5 },
 { name: "D-05", cpuU: 2, npuU: 6, ip: "112.34.14.4", rack: 12, cpu: 310, npu: 247 },
 { name: "D-06", cpuU: 1, npuU: 5, ip: "112.34.14.5", rack: 12, cpu: 329, npu: 261.5 },
 { name: "D-07", cpuU: 18, npuU: 12, ip: "112.34.14.7", rack: 13, cpu: 65, npu: 160 },
 { name: "D-08", cpuU: 16, npuU: 10, ip: "112.34.23.1", rack: 13, cpu: 101, npu: 189 }
];
export function timeLabel(t) { return `12:${String(5 + Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`; }
export function latestSecond(stage) { return stage === 9 ? 120 : stage === 8 ? 80 : stage === 7 ? 72 : 66; }
export function snapshot(stage, selected) {
 const second = selected === null ? latestSecond(stage) : selected;
 return { second, degraded: second >= 12 && !(stage === 9 && second >= 95), healthy: second < 6 || (stage === 9 && second >= 95), upgraded: second >= 80 && stage >= 8 };
}
export const evidence = {
 "告警与事件记录": "12:05:06　112.34.23.1 操作系统崩溃重启\n12:05:09　D-08 实例异常退出\n12:05:12　Qwen-1.5B 推理服务劣化，请求成功率降至77.5%",
 "BMC 日志分析结果": "分析对象：112.34.23.1 · CPU02\n分析结论：未发现独立硬件故障证据，继续结合 OS 日志与内核转储定位。",
 "OS 日志分析结果": "分析对象：112.34.23.1 · 操作系统\n分析结论：操作系统内存耗尽并崩溃重启，D-08 实例异常退出。",
 "vmcore 分析结果": "分析对象：112.34.23.1 · 内核转储\n分析结论：发现内核空指针异常；结合 OS 日志与 hinic3 驱动版本信息，定位根因为网卡驱动版本过低。\n当前版本：V11.8\n处置建议：升级至 V13.1，随后核查节点、D-08 实例及 Qwen-1.5B 服务。",
 "处置方案": "升级对象：112.34.23.1 · CPU02 · hinic3 网卡驱动\n当前版本：V11.8 → 目标版本：V13.1\n无可替换节点，采用原节点人工升级方案。\n执行条件：人工授权。\n验证范围：驱动版本、节点健康、D-08 实例与 Qwen-1.5B 服务。"
};
export const flow = [
 ["事件感知","服务劣化／D-08 实例异常",0,"12:05:12",1],
 ["业务故障诊断","定位直接原因／操作系统崩溃重启",1,"12:05:22",2],
 ["业务恢复方案决策","评估节点切换方案",2,"12:05:30",3],
 ["业务恢复方案决策","无可替换节点／无可用方案",2,"12:05:40",3],
 ["资源故障诊断","BMC 日志分析",3,"12:05:48",4],
 ["资源故障诊断","OS 日志分析",3,"12:05:48",4],
 ["资源故障诊断","vmcore 分析",3,"12:05:48",4],
 ["资源故障诊断","综合分析／网卡驱动版本低",3,"12:05:56",5],
 ["资源恢复方案决策","生成网卡升级方案",4,"12:06:06",6],
 ["故障恢复","等待人工授权升级",5,"12:06:06",6],
 ["故障恢复","人工授权／开始升级网卡驱动",5,"12:06:12",7],
 ["故障恢复","驱动升级完成／核查节点与实例健康",5,"12:06:20",8],
 ["故障恢复","健康核查通过／服务恢复，事件闭环",5,"12:06:35",9]
];
