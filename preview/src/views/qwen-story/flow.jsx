import { useRef, useEffect, useLayoutEffect, useState } from "react";
import Icon from "./icons.jsx";
import FigmaAsset from "../../components/figma-asset/index.jsx";
import { flow } from "../../mock/qwen.js";
export default function Flow({ stage, onFocusStep }) {
 const box=useRef(null),[selected,setSelected]=useState(null);
 const visible=flow.filter(f=>f[4]<=stage),gap=40;
 const [widths,setWidths]=useState([]);
 const width=i=>widths[i]||220,column=i=>i<4?i:i-2;
 const columns=[];visible.forEach((f,i)=>{const c=column(i);columns[c]=Math.max(columns[c]||0,width(i));});
 const starts=[];let contentWidth=0;columns.forEach((w,i)=>{starts[i]=contentWidth;contentWidth+=w+(i<columns.length-1?gap:0);});
 const x=i=>starts[column(i)],y=i=>i<2?32:i<4?0:64;
 useLayoutEffect(()=>{
  let live=true;const measure=()=>{if(!live||!box.current)return;const next=Array.from(box.current.querySelectorAll('.qw-flow>button'),el=>el.offsetWidth);setWidths(old=>old.length===next.length&&old.every((w,i)=>w===next[i])?old:next);};
  measure();const observer=new ResizeObserver(measure);box.current.querySelectorAll('.qw-flow>button').forEach(el=>observer.observe(el));document.fonts?.ready.then(measure);
  return()=>{live=false;observer.disconnect();};
 },[stage]);
 useEffect(()=>{if(box.current)box.current.scrollLeft=box.current.scrollWidth;},[stage,contentWidth]);
 return <div className="qw-flow-viewport" ref={box}><div className="qw-flow" style={{width:Math.max(1292,contentWidth)}}>
  {[[0,1],[1,2],[2,3],[1,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,12]].filter(([a,b])=>b<visible.length).map(([a,b])=><span key={a+"-"+b} className="qw-flow-connector" style={{left:x(a)+width(a),top:Math.min(y(a),y(b))+32,width:x(b)-x(a)-width(a),height:Math.abs(y(a)-y(b))||4,borderTopWidth:y(a)<=y(b)?4:0,borderBottomWidth:y(a)>y(b)?4:0}}>{y(a)===y(b)&&<FigmaAsset file="b587d.svg"/>}</span>)}
  <div className="qw-flow-baseline"/>
  {visible.map((f,i)=>{const waiting=i===9&&stage===6;return <button key={i} className={(selected===i?"selected ":"")+(waiting?"waiting":"")} aria-pressed={selected===i} style={{left:x(i),top:y(i),width:"max-content"}} onClick={()=>{setSelected(i);onFocusStep(f[2]);}}><Icon name={waiting?"flow-hand":"flow-robot"} size="32px"/><span className="qw-flow-copy"><span className="qw-flow-title">{f[0]}{waiting&&<em>待处理</em>}</span><strong>{f[1].replaceAll("／","\n")}</strong></span></button>})}
  {visible.map((f,i)=>(i<2||i>=4)&&<div key={i} className={"qw-flow-tick "+(selected===i||selected===null&&i===visible.length-1?"current":"")} style={{left:x(i),width:width(i),top:y(i)+64,height:136-y(i)-64}}><i/><time>{i===0?"2026-09-09 ":""}{f[3]}</time></div>)}
 </div></div>;
}
