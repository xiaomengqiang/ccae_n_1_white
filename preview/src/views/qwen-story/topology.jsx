import { useState, useEffect } from "react";
import Icon from "./icons.jsx";
import FigmaAsset from "../../components/figma-asset/index.jsx";
import { rackGeometry } from "./rack-geometry.js";
import RackArt from "./rackart.jsx";
import RackGlow from "./rackglow.jsx";
import { nodes, metrics, snapshot, events, recoveredTip, processingTips } from "../../mock/qwen.js";
export default function Topology({ stage, selected }) {
 const view=snapshot(stage,selected);
 const serviceDegraded=stage<9||view.degraded;
 const [active,setActive]=useState("D-08");
 const [pinned,setPinned]=useState("D-08");
 // A new timeline selection takes focus back from any previously pinned node.
 useEffect(()=>{setActive("D-08");setPinned("D-08");},[selected]);
 const current=nodes.find(n=>n.name===active)||nodes[9];
 const event=selected===null?null:events.filter(e=>e.second<=selected&&e.stage<=stage).slice(-1)[0];
 let title=stage===9?recoveredTip.title:stage===8?processingTips[8]:stage===7?processingTips[7]:"待升级网卡驱动版本";
 let detail=stage===9?recoveredTip.detail:"原故障节点 112.34.23.1 · CPU02 · hinic3\n当前版本为 "+(stage>=8?"V13.1，正在核查节点与实例健康。":"V11.8，版本过低，需升级至 V13.1。");
 if(selected!==null){title=event?.title||"节点与服务正常";detail=event?.detail||"112.34.23.1 · D-08 实例，当前时间切片尚未发生故障";if(event?.second===12){title=events[1].title;detail=events[1].detail;}}
 if(selected!==null&&event?.second===95){title=recoveredTip.title;detail=recoveredTip.detail;}
 if(selected!==null&&event?.second===72)title=processingTips[7];
 if(selected!==null&&event?.second===80)title=processingTips[8];
 const processing=(selected===null?(stage===7||stage===8):(event?.second===72||event?.second===80));
 const tipIcon=view.healthy?"circle-check":processing?"manual-processing":"triangle-alert";
 function Node({node}) { const fault=node.name==="D-08"&&!view.healthy;return <button className={"qw-node "+(fault?"fault ":"")+(active===node.name?"linked ":"")+(pinned===node.name&&node.name!=="D-08"?"pinned":"")} aria-label={node.name+" 实例 "+node.ip+(fault?" 故障":" 正常")} onMouseEnter={()=>setActive(node.name)} onMouseLeave={()=>setActive(pinned)} onFocus={()=>setActive(node.name)} onBlur={()=>setActive(pinned)} onClick={()=>{setPinned(node.name);setActive(node.name);}}><strong>{node.name} 实例</strong><div className="qw-hex"><FigmaAsset file={fault?"8b419.svg":"23586.svg"}/><div className="qw-cells">{Array.from({length:10},(_,i)=><span key={i} className={fault&&i===9?"bad-cell":""}>{i<8?"N":"C"}</span>)}</div></div><small>{node.ip}</small></button>; }
 return <section className="qw-service" aria-label="Qwen-1.5B服务诊断" data-healthy={view.healthy}>
  <h2>Qwen-1.5B服务 <span className={"qw-badge "+(serviceDegraded?"warning":"success")}>{serviceDegraded?"劣化":"正常"}</span></h2>
  <div className="qw-metrics">{metrics.map((m,i)=><div key={m.key} className={(i===0&&serviceDegraded?"degraded ":"")+(i===0&&selected===12?"highlight":"")}><span>{m.label}</span><strong>{serviceDegraded?m.bad:m.normal}<small>{m.unit}</small></strong></div>)}</div>
  <div className="qw-topology"><div className="qw-node-canvas"><div className="qw-p-group"><span>P 节点 · 2</span><div>{nodes.slice(0,2).map(n=><Node key={n.name} node={n}/>)}</div></div><div className="qw-d-group"><span>D 节点 · 8</span><div>{nodes.slice(2).map(n=><Node key={n.name} node={n}/>)}</div></div></div>
   <div className="qw-racks"><div className="qw-rack-glow"><RackGlow/></div><strong>超节点01</strong><div className="qw-rack-art"><div className="qw-rack-base"><RackArt active={active} healthy={view.healthy}/></div>{["CPU","NPU"].map(kind=>{const row=kind==="CPU"?[18,17,16,15,4,3,2,1].indexOf(current.cpuU):12-current.npuU;const box=rackGeometry[current.rack+"-"+(kind==="CPU"?"C":"N")+"-"+row];return <span key={kind} className={"qw-blade "+(kind==="NPU"?"npu ":"")+(active==="D-08"&&!view.healthy?"fault":"")} data-kind={kind} data-u={kind==="CPU"?current.cpuU:current.npuU} style={box}><span className={"qw-u-label "+(current.rack===12?"left":"right")}>{kind} U{String(kind==="CPU"?current.cpuU:current.npuU).padStart(2,"0")}</span></span>})}</div><div className="qw-rack-names"><span>计算柜12</span><span>计算柜13</span></div></div>
   <div className={"qw-node-tip "+(view.healthy?"healthy":"")} role="status"><div><Icon name={tipIcon} size="1.25rem"/><strong>{title}</strong>{selected===null&&stage===6&&<span className="qw-badge error">待人工处理</span>}</div><p>{detail}</p></div>
  </div>
 </section>;
}
