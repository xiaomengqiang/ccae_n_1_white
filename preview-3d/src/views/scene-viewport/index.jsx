import { useRef } from "react";
import { useThreeScene } from "../../hooks/use-three-scene.js";
import "./index.css";

export default function SceneViewport() {
  const containerRef = useRef(null);
  const status = useThreeScene(containerRef);

  return (
    <div ref={containerRef} className="scene-viewport">
      <div className="scene-viewport-overlay">
        <span className="scene-viewport-title">机柜绘制区域 · 3D</span>
        {status === "error" ? <span className="scene-viewport-status scene-viewport-status-error">three.js 未注入(检查 assets/library/three.min.js)</span> : null}
      </div>
    </div>
  );
}
