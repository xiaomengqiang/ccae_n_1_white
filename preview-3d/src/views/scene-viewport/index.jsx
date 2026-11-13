import { useRef, useEffect, useState } from "react";
import { useThreeScene } from "../../hooks/use-three-scene.js";
import "./index.css";

export default function SceneViewport() {
  const containerRef = useRef(null);
  const { status, retry } = useThreeScene(containerRef);
  const [resolved, setResolved] = useState(false);
  useEffect(() => {
    const receive = (event) => {
      if (event.data?.type === "resolveCabinet" && event.data.id === "D-08") setResolved(true);
    };
    window.addEventListener("message", receive);
    return () => window.removeEventListener("message", receive);
  }, []);
  useEffect(() => {
    if (status === "ready" || status === "error") window.parent.postMessage({type:"sceneReady"}, "*");
    if (status === "ready" && resolved) window.postMessage({type:"resolveCabinet",id:"D-08"}, "*");
  }, [status, resolved]);
  return (
    <div ref={containerRef} className="scene-viewport" data-render-status={status}>
      {status === "error" ? <div className="scene-fallback">
        <img src={`./assets/uploads/scene/overview${resolved ? "-resolved" : ""}.png`} alt="机柜阵列静态预览" />
        <div className="scene-fallback-notice" role="status">
          <span>静态预览 · 当前浏览器暂无法启用 3D</span>
          <button type="button" onClick={retry}>重试 3D</button>
          <button type="button" onClick={()=>window.parent.postMessage({type:"cabinetEnter",pod:"A"},"*")}>查看超节点 A 机柜详情</button>
        </div>
      </div> : null}
    </div>
  );
}
