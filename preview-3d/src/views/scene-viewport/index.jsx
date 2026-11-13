import { useRef, useEffect } from "react";
import { useThreeScene } from "../../hooks/use-three-scene.js";
import "./index.css";

// 3D 机柜视口:canvas + 交互提示卡(hook 内管理)。
// 第13轮:编号/铭牌/气泡已全部 3D 化(贴地纹理/竖立平面/Sprite),不再用 DOM 覆盖层。
export default function SceneViewport() {
  const containerRef = useRef(null);
  const { status } = useThreeScene(containerRef);

  return (
    <div ref={containerRef} className="scene-viewport">
      {status === "error" ? (
        <div className="scene-viewport-overlay">
          <span className="scene-viewport-status scene-viewport-status-error">
            three.js 未注入(检查 assets/library/three.min.js)
          </span>
        </div>
      ) : null}
    </div>
  );
}
