import { useState, useEffect, useRef } from "react";
import { Button, Drawer, Modal } from "antd";
import Icon from "./icons.jsx";
import FigmaAsset from "../../components/figma-asset/index.jsx";
import Process from "./process.jsx";
import Topology from "./topology.jsx";
import Journey from "./journey.jsx";
import { evidence } from "../../mock/qwen.js";
import "./index.css";
import "./figma-layers.css";
// Self-contained story. The homepage can mount this component with onBack.
export default function QwenStory({ onBack }) {
 const [stage,setStage]=useState(6),[expanded,setExpanded]=useState([false,false,false,false,false,true]);
 const [selected,setSelected]=useState(null),[documentName,setDocumentName]=useState(null),[overview,setOverview]=useState(false);
 const [draft,setDraft]=useState(""),[answer,setAnswer]=useState(""),[full,setFull]=useState(false);
 const [scale,setScale]=useState(1); const timers=useRef([]),canvas=useRef(null),authorized=useRef(false);
 useEffect(()=>{const resize=()=>setScale(Math.min(window.innerWidth/1920,window.innerHeight/1080));resize();window.addEventListener("resize",resize);return()=>{window.removeEventListener("resize",resize);timers.current.forEach(clearTimeout);};},[]);
 function authorize(){if(authorized.current||stage!==6)return;authorized.current=true;setSelected(null);setStage(7);timers.current.push(setTimeout(()=>setStage(8),1800),setTimeout(()=>setStage(9),3600));}
 function reset(){timers.current.forEach(clearTimeout);timers.current=[];authorized.current=false;setStage(6);setSelected(null);setExpanded([false,false,false,false,false,true]);setAnswer("");setDraft("");setOverview(false);}
 function select(second){setSelected(second);if(second!==null&&second>=6){const section=second>=72?5:1;setExpanded(v=>v.map((b,i)=>i===section?true:b));}}
 function focusStep(i){setSelected(null);setExpanded(v=>v.map((b,j)=>i===j?true:b));requestAnimationFrame(()=>document.getElementById("qw-step-"+i)?.scrollIntoView({block:"nearest",behavior:"smooth"}));}
 function send(){if(!draft.trim())return;const question=draft.trim();setDraft("");setAnswer(question.includes("/")?"可以问我：故障根因是什么？为什么不能自动恢复？升级到哪个版本？当前恢复状态是什么？":/根因|原因/.test(question)?evidence["vmcore 分析结果"]:/方案|版本|升级/.test(question)?evidence["处置方案"]:/自动|替换/.test(question)?"当前没有可替换节点，无法通过节点切换自动恢复。需人工授权，将原节点 hinic3 网卡驱动升级至 V13.1，再核查节点、D-08 实例和服务健康。":stage===9?"驱动已升级至 V13.1，节点和 D-08 实例健康核查通过，Qwen-1.5B 服务已恢复，请求成功率为99.94%。":"当前 Qwen-1.5B 服务持续劣化，请求成功率77.5%。根因是 hinic3 网卡驱动版本过低。"+(stage===6?"升级方案已生成，等待人工授权。":"正在执行升级和健康核查。"));setTimeout(()=>{const sc=document.querySelector('.qw-process-scroll');if(sc)sc.scrollTop=sc.scrollHeight;},0);}
 function back(){if(onBack)onBack();else setOverview(true);}
 return <div className="qw-stage"><div ref={canvas} className={"qw-canvas "+(full?"qw-focus-mode":"")} style={{transform:`scale(${scale})`,left:`calc(50% - ${960*scale}px)`,top:`calc(50% - ${540*scale}px)`}} data-stage={stage}>
  <header className="qw-header"><div className="qw-brand"><span className="qw-brand-mark"><FigmaAsset file="00f33.svg"/></span><span>iMaster CCAE</span></div><div className="qw-mode"><Icon name="sparkles" size="0.875rem"/>智能模式<Icon name="chevron-down" size="0.75rem"/></div><div className="qw-header-tools"><span className="qw-icon-button" title="浅色主题"><Icon name="moon" size="1rem"/></span><Icon name="user-round" size="1.25rem"/></div></header>
  <nav className="qw-sidebar" aria-label="故事导航"><div className="qw-agent-orb"><Icon name="agent" size="24px"/></div><div className="qw-nav-items">{[{key:"home",label:"Qwen 事件",icon:"house"},{key:"chat",label:"询问算小维",icon:"message-circle"},{key:"process",label:"处理过程",icon:"commands"},{key:"report",label:"处置方案",icon:"report"}].map(item=><button key={item.key} className={item.key==="home"?"selected":""} aria-label={item.label} title={item.label} onClick={()=>{if(item.key==="home")back();if(item.key==="chat")document.querySelector('.qw-composer input')?.focus();if(item.key==="process")setExpanded(Array(6).fill(true));if(item.key==="report")setDocumentName("处置方案");}}><Icon name={item.icon} size="16px"/></button>)}</div></nav>
  <Process stage={stage} expanded={expanded} setExpanded={setExpanded} onEvidence={setDocumentName} onAuthorize={authorize} selected={selected} onSend={send} answer={answer} draft={draft} setDraft={setDraft} onBack={back}/>
  <main className="qw-main"><div className="qw-toolbar"><span>诊断详情</span><button className="qw-icon-button" aria-label={full?"退出专注视图":"放大诊断详情"} onClick={()=>setFull(!full)}><Icon name={full?"minimize-2":"maximize-2"} size="1.25rem"/></button></div><Topology stage={stage} selected={selected}/><Journey stage={stage} selected={selected} onSelect={select} onFocusStep={focusStep}/></main>
 </div>
 <Drawer title={documentName} open={!!documentName} onClose={()=>setDocumentName(null)} width={560}><div className="qw-evidence-document"><span className="qw-badge success">已生成</span><h3>{documentName}</h3><p>{evidence[documentName]}</p><small>Qwen-1.5B · 112.34.23.1 · CPU02</small></div></Drawer>
 <Modal title="Qwen-1.5B 业务故障" centered open={overview} onCancel={()=>setOverview(false)} footer={[<Button key="reset" onClick={reset}>重新演示</Button>,<Button key="continue" type="primary" onClick={()=>setOverview(false)}>继续查看诊断</Button>]}><p>网卡驱动版本低导致操作系统崩溃重启，D-08 实例退出，影响 Qwen-1.5B 服务。</p><p>当前状态：{stage===9?"已恢复并闭环":stage===8?"健康核查中":stage===7?"正在升级网卡驱动":"待人工授权升级"}</p></Modal>
 </div>;
}
