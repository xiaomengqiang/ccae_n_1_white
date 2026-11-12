import AgentMark from "./agent-mark.jsx";
import FigmaAsset from "../../components/figma-asset/index.jsx";
import { Icon } from "../../../assets/shared/icon.jsx";
// Original Figma SVG layers, positioned in their original icon slots.
const layers={
 "flow-robot":[["flow-robot.svg","0"]],"flow-hand":[["742f7.svg","0"],["8cff0.svg","30.52% 35.63% 31.25% 30.69%"]],
 "clock":[["edcc1.svg","0"]], "circle":[["37adb.svg","8%"]],
 "circle-check":[["7b87f.svg","0"]], "triangle-alert":[["original-fault.svg","0"]],
 "chevron-left":[["4ea43.svg","23% 35.6% 24% 35.7%"]],
 "chevron-up":[["04278.svg","25% 15%"]],"chevron-down":[["4e6aa.svg","25% 15%"]],
 "file-text":[["95004.svg","0"]],"report":[["1b670.svg","0"]],
 "user-round":[["b6535.svg","8% 12%"]],"moon":[["d7a06.svg","0"]],
 "sparkles":[["1e0f7.svg","9% 5% 7% 7%"]],"impact":[["28974.svg","2.07% 4.19% 4.18% 5.18%"],["c2a5c.svg","2.07% 1.05% 1.06% 2.06%"]],
 "house":[["0b9d7.svg","3% 2%"],["97da5.svg","3% 2%"]],
 "message-circle":[["829f7.svg","1% 0 4%"],["cabe4.svg","1% 0 4%"],["3fe52.svg","40% 25% 50%"],["304f5.svg","40% 25% 50%"]],
 "commands":[["20016.svg","2% 1% 1% 2%"],["83956.svg","2% 1% 1% 2%"]],
 "send":[["cd3d8.svg","10% 6%"],["770bb.svg","10% 6%"]]
};
export default function DesignIcon({name,size="1rem",className=""}){if(name==="agent")return <AgentMark/>;const parts=layers[name];if(!parts)return <Icon name={name} size={size}/>;return <span className={"qw-design-icon "+className} data-icon={name} aria-hidden="true" style={{width:size,height:size}}>{parts.map(([file,inset])=><FigmaAsset key={file} file={file} style={{inset}}/>)}</span>;}
