import { useState, useMemo } from "react";
import { useApp } from "../../context.jsx";
import CabinetArtwork from "./artwork.jsx";
import "./detail.css";

// S02 · 机柜 / 11.06反馈修订 (2972:98551). Coordinates remain in the 1920×1080 canvas.
export default function CabinetDetail({ pod, onBack, active }) {
  const artwork = useMemo(() => <CabinetArtwork />, []);
  const { bizOnly, resolved, qwenStage, openDetail } = useApp();
  const [faults, setFaults] = useState(true);
  const [normal, setNormal] = useState(false);
  const [rear, setRear] = useState(false);
  const hasEvents = pod === "A" || pod === "D";
  const optical = pod === "A" && faults && !bizOnly;
  const qwen = hasEvents && faults && !resolved;
  return <section className={`cabinet-detail ${active ? "is-active" : ""}`} aria-label={`超节点${pod}机柜详情`} aria-hidden={!active} inert={!active ? "" : undefined}>
    <div className="s02-artwork">{artwork}</div>
    <nav className="s02-breadcrumb"><button onClick={onBack}>上海B5集群</button><span>/</span><strong>超节点{pod}</strong></nav>
    <div className="s02-stats">
      <span>POD <b className={hasEvents ? "is-fault" : ""}>{hasEvents ? (resolved ? 3 : 4) : 0} / 20</b></span>
      <span>L1交换机 <b>64</b></span><span>L2交换机 <b>16</b></span>
      <span>NPU卡 <b className={hasEvents ? "is-fault" : ""}>{hasEvents ? 2 : 0} / 1,024</b></span><span>光模块 <b>10,860</b></span>
    </div>
    {rear && <div className="s02-rear">{Array.from({length:20},(_,i)=><div key={i} className="s02-rear-cab">{Array.from({length:12},(_,j)=><div key={j}><i/><i/><i/><i/><span/></div>)}</div>)}</div>}
    {normal && <div className="s02-normal-devices">{Array.from({length:20},(_,i)=><div key={i}>{Array.from({length:i>=8&&i<12?4:8},(_,j)=><span key={j}>{i>=8&&i<12?"L2":j<6?"N":"C"}</span>)}</div>)}</div>}
    {optical && <><svg className="s02-link" viewBox="0 0 1388 650" aria-hidden="true"><path d="M660 173 C704 90 930 90 997 173" fill="none" stroke="#f74e59" strokeWidth="1"/></svg><button className="s02-tip s02-optical" onClick={()=>openDetail("optical")}><div><img src="./assets/uploads/qwen/original-fault.svg" alt=""/><strong>光链路待清污</strong><em>待人工处理</em></div><p>计算柜11 · L1交换板02</p></button></>}
    {qwen && <><button className="s02-fault-slot" onClick={()=>openDetail("qwen")} aria-label="查看 CPU02 网卡驱动故障">C</button><button className="s02-tip s02-qwen" onClick={()=>openDetail("qwen")}><div><img src="./assets/uploads/qwen/original-fault.svg" alt=""/><strong>Qwen-1.5B服务劣化：<br/>网卡驱动版本低，待升级</strong><em>{qwenStage >= 7 ? "自动处理中" : "待人工处理"}</em><img className="s02-impact" src="./assets/uploads/s01/lg-impact.svg" alt="影响业务"/></div><p>计算柜13 · 112.34.23.1 · CPU02</p></button></>}
    <div className="s02-legend"><span>设备状态</span><label><input type="checkbox" checked={faults} onChange={e=>setFaults(e.target.checked)}/><i className="fault"/>故障</label><label><input type="checkbox" checked={normal} onChange={e=>setNormal(e.target.checked)}/><i/>正常</label></div>
    <div className="s02-faces" aria-label="机柜朝向"><button className={!rear?"selected":""} onClick={()=>setRear(false)}>正面</button><button className={rear?"selected":""} onClick={()=>setRear(true)}>背面</button></div>
  </section>;
}
