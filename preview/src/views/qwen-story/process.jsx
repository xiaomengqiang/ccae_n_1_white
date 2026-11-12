import { Button } from "antd";
import Icon from "./icons.jsx";
import FigmaAsset from "../../components/figma-asset/index.jsx";
import Summary from "./summary.jsx";
import { steps } from "../../mock/qwen.js";
export default function Process({ stage, expanded, setExpanded, onEvidence, onAuthorize, selected, onSend, answer, draft, setDraft, onBack }) {
 const all = expanded.every(Boolean);
 return <aside className="qw-process">
  <header className="qw-event-heading"><button className="qw-icon-button qw-back" aria-label="返回" onClick={onBack}><Icon name="chevron-left" size="1.5rem" /></button><span className={"qw-event-icon " + (stage === 9 ? "success" : "error")}><Icon name={stage === 9 ? "circle-check" : "triangle-alert"} size="1.5rem" /></span><div><h1>{stage === 9 ? "Qwen-1.5B服务已恢复，网卡故障已闭环" : "Qwen-1.5B服务劣化：网卡驱动版本低"}</h1><div className="qw-heading-tags"><span className={"qw-badge " + (stage === 9 ? "success" : stage > 6 ? "info" : "error")}>{stage === 9 ? "已闭环" : stage > 6 ? "处理中" : "待人工处理"}</span>{stage !== 9 && <span className="qw-badge warning"><Icon name="impact" size="0.75rem"/>影响业务</span>}</div><time>发生时间：2026-09-09 12:05:12</time></div></header>
  <div className="qw-process-scroll"><Summary stage={stage}/><div className="qw-process-title"><strong>处理过程</strong><a role="button" tabIndex={0} onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();e.currentTarget.click();}}} onClick={() => setExpanded(Array(6).fill(!all))}>{all ? "收起全部" : "展开全部"}</a></div>
   {steps.map((step,i)=><section key={step.title} id={"qw-step-"+i} className={"qw-step " + (expanded[i] ? "open " : "") + (selected !== null && ((selected >= 72 && i === 5) || (selected >= 6 && selected < 72 && i === 1)) ? "qw-step-selected" : "")}>
    <button className="qw-step-heading" onClick={() => setExpanded(expanded.map((v,j)=>i===j?!v:v))} aria-expanded={expanded[i]} aria-controls={"qw-step-content-"+i}>
     <span className="qw-step-symbol">{i===5 && stage < 9 ? <FigmaAsset file="9ce41.svg"/> : <FigmaAsset file="7b87f.svg"/>}</span><strong>{step.title}</strong><span className={"qw-badge " + (i===2 || (i===5 && stage===6) ? "error" : i===5 && stage<9 ? "info" : "success")}>{i===2 ? "无可用方案" : i!==5 || stage===9 ? "已完成" : stage===6 ? "待人工处理" : stage===7 ? "升级中" : "核查中"}</span><Icon name={expanded[i]?"chevron-up":"chevron-down"} size="0.875rem"/>
    </button>
    {expanded[i] && <div className="qw-step-content" id={"qw-step-content-"+i}>
     {step.evidence && <div className="qw-evidence-list">{i===3 && <strong className="qw-analysis-title">诊断分析结果</strong>}{step.evidence.map(label=><div className="qw-evidence" key={label}><Icon name="file-text" size="1rem"/><span>{i<2 ? "已读取" : "已生成"}</span><a role="button" tabIndex={0} onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();e.currentTarget.click();}}} onClick={()=>onEvidence(label)}>{label}</a></div>)}</div>}
     <p className={i===5 ? "qw-time-record" : ""}>{step.text}</p>
     {step.chain && <div className="qw-cause"><h4>{i===1?"业务故障因果链":"故障因果链"}</h4>{step.chain.map((text,j)=><div key={text} className={"qw-cause-row " + (selected !== null && i===1 && j===(selected<9?0:selected<12?1:2) ? "highlight" : "")}><span className="qw-cause-marker" style={{height:j===0?46:22}}><FigmaAsset file={j===0?(i===1?"05370.svg":"a083b.svg"):j===step.chain.length-1?"1c071.svg":"30729.svg"}/></span><div><div className="qw-cause-label"><strong>{text}</strong>{(j===0 || j>=step.chain.length-2 || (i===3&&j===3)) && <span className={"qw-cause-tag "+(i===3&&j===0?"root-cause":"")}>{j===0 ? (i===1?"直接原因":"根因") : i===3&&j===3?"直接原因":"业务影响"}</span>}</div>{j===0 && <small>OS IP 112.34.23.1</small>}</div></div>)}</div>}
     {i===5 && <><div className="qw-upgrade-card"><div className="qw-upgrade-title"><strong>hinic3 网卡驱动</strong><span>112.34.23.1 · CPU02</span></div><div className="qw-versions"><div className="qw-version"><small>{stage>=8 ? "升级前版本" : "当前版本"}</small><strong>V11.8</strong></div><div className="qw-version-arrow"><FigmaAsset file="f4d34.svg" style={{inset:-6}}/><FigmaAsset file="5e23a.svg"/></div><div className="qw-version target"><small>{stage>=8 ? "当前版本" : "待升级版本"}</small><strong>V13.1</strong></div></div><div className="qw-upgrade-actions"><Button type="primary" onClick={onAuthorize} disabled={stage!==6} loading={stage===7 || stage===8}>{stage===6 ? "授权升级网卡" : stage===7 ? "正在升级网卡" : stage===8 ? "正在核查健康" : "已完成升级"}</Button></div></div>
      {stage>=7 && <p className="qw-time-record">12:06:12 已人工授权，开始执行网卡驱动升级</p>}{stage>=8 && <p className="qw-time-record">12:06:20 驱动升级至 V13.1，正在检查节点与实例健康</p>}{stage===9 && <p className="qw-time-record success">12:06:35 节点和实例健康核查通过，Qwen-1.5B 服务恢复，事件已闭环</p>}</>}
    </div>}
   </section>)}
   {answer && <div className="qw-answer" role="status"><Icon name="sparkles" size="1rem"/><p>{answer}</p></div>}
  </div>
  <div className="qw-composer"><input aria-label="询问算小维" placeholder={'输入问题或输入“/”触发提示词'} value={draft} onChange={e=>setDraft(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.nativeEvent.isComposing)onSend();}}/><button className="qw-icon-button" aria-label="发送问题" onClick={onSend}><Icon name="send" size="1.25rem"/></button></div>
 </aside>;
}
