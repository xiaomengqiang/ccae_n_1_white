import FigmaAsset from "../../components/figma-asset/index.jsx";
export default function Summary({ stage }) {
 return <section className="qw-summary" aria-label="事件摘要">
  <div className="qw-summary-art" aria-hidden="true">
   <FigmaAsset file="0ef53.svg" />
   <FigmaAsset file="6e845.svg" style={{ bottom: "-8.89%" }} />
   <FigmaAsset file="0b9a2.svg" style={{ left: "-2.59%", top: "-48.47%", right: "-24.92%", bottom: "17.83%", transform: "rotate(.18deg)" }} />
   <FigmaAsset file="df845.png" style={{ left: "51.38%", top: "5.61%", right: "-4.77%", bottom: "22.87%" }} />
   <FigmaAsset file="101d6.svg" style={{ left: "-2.64%", top: "-4.8%", right: "61.26%", bottom: "-13.09%" }} />
   <FigmaAsset file="5aceb.svg" style={{ top: "71.1%", left: 0, right: 0, bottom: 0 }} />
   <FigmaAsset file="effd5.svg" style={{ top: -33.26, left: 346.72, right: "auto", bottom: "auto", width: 141.6, height: 81.59 }} />
   <div className="qw-summary-fade" /><div className="qw-summary-floor" />
   <FigmaAsset file="ab1cd.svg" style={{ left: 228, top: -39, width: 315.56, height: 204.188, right: "auto", bottom: "auto", transform: "scaleX(-1)" }} />
  </div>
  <div className="qw-summary-copy"><span>事件摘要</span><strong>{stage === 9 ? <>网卡驱动升级完成，<br/>D-08 实例恢复，<br/>Qwen-1.5B 服务已恢复</> : <>网卡驱动版本低导致系统崩溃、<br/>D-08 实例退出，影响<br/>Qwen-1.5B 服务</>}</strong></div>
  <dl className="qw-summary-fields"><div><dt>故障对象</dt><dd>112.34.23.1 · CPU02 · hinic3 网卡驱动</dd></div><div><dt>业务影响</dt><dd>{stage === 9 ? "Qwen-1.5B 请求成功率恢复至99.94%" : "Qwen-1.5B 请求成功率降至77.5%"}</dd></div><div><dt>处置状态</dt><dd>{stage === 9 ? "健康核查通过，服务恢复，事件已闭环" : stage === 8 ? "驱动已升级，正在核查节点、实例和服务健康" : stage === 7 ? "已人工授权，正在升级网卡驱动" : "无可替换节点，无法自动恢复，待人工升级网卡"}</dd></div></dl>
 </section>;
}
