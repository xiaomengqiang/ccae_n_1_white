import { useEffect, useState } from "react";
import { Icon } from "../../../assets/shared/icon.jsx";
import { cabinetScene } from "../../mock/cabinet.js";
import "./index.css";
import { useApp } from "../../context.jsx";

import CabinetDetail from "./detail.jsx";

const S01 = "./assets/uploads/s01";

// 工具条透明热区(第11轮 2.5:接功能 + 左侧 tooltip)
const HOT_ZONES = [
  { key: "refresh", label: "重置视角", cx: 1868, cy: 731, action: "reset" },
  { key: "cube", label: "3D 视图", cx: 1868, cy: 763, action: null },
  { key: "expand", label: "全屏", cx: 1868, cy: 794, action: "fullscreen" },
  { key: "plus", label: "放大", cx: 1868, cy: 827.5, action: "zoomIn" },
  { key: "minus", label: "缩小", cx: 1868, cy: 860, action: "zoomOut" },
];

// 主页面 → 3D iframe 消息
function postTo3D(msg) {
  const frame = document.querySelector(".cabinet-area-frame");
  if (frame && frame.contentWindow) {
    frame.contentWindow.postMessage(msg, "*");
  }
}

// 机柜区 · 1:1 + 第11轮 2.5 工具条交互(默认静态不变)
export default function CabinetArea() {
  const { bizOnly, detail, view } = useApp();
  const [pod, setPod] = useState(null);
  const [inCabinet, setInCabinet] = useState(false);
  const returnToOverview = () => { setInCabinet(false); postTo3D({type:"cabinetReturn"}); };
  useEffect(() => {
    const receive = e => {
      const frame = document.querySelector(".cabinet-area-frame");
      if(e.source !== frame?.contentWindow) return;
      if(e.data?.type === "cabinetEnter" && /^[A-H]$/.test(e.data.pod)) {
        setPod(e.data.pod); setInCabinet(true); setFullscreen(false);
      }
    };
    window.addEventListener("message", receive);
    return () => window.removeEventListener("message", receive);
  }, []);
  useEffect(() => {
    if(!inCabinet || detail) return;
    const key = e => { if(e.key === "Escape") returnToOverview(); };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [inCabinet, detail]);
  useEffect(() => {
    const frame = document.querySelector(".cabinet-area-frame");
    const sync = () => postTo3D({ type: "impactFilter", enabled: bizOnly });
    const receive = event => { if (event.source === frame?.contentWindow && event.data?.type === "sceneReady") sync(); };
    sync();
    frame?.addEventListener("load", sync);
    window.addEventListener("message", receive);
    return () => { frame?.removeEventListener("load", sync); window.removeEventListener("message", receive); };
  }, [bizOnly]);
  const [zoomPct, setZoomPct] = useState(100);
  const [fullscreen, setFullscreen] = useState(false);

  // 3D → 主页面:zoomChanged 实时更新「100%」文字
  useEffect(() => {
    const onMsg = (e) => {
      const msg = e.data || {};
      if (msg.type === "zoomChanged" && typeof msg.value === "number") {
        setZoomPct(msg.value);
      }
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  // Esc 退出全屏(恢复默认视角与 100%)
  useEffect(() => {
    if (!fullscreen) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setFullscreen(false);
        postTo3D({ type: "reset" });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [fullscreen]);

  const onHot = (zone) => {
    if (zone.action === "reset") postTo3D({ type: "reset" });
    else if (zone.action === "zoomIn") postTo3D({ type: "zoom", step: 1 });
    else if (zone.action === "zoomOut") postTo3D({ type: "zoom", step: -1 });
    else if (zone.action === "fullscreen") {
      setFullscreen(true);
      postTo3D({ type: "reset" }); // 进入全屏:zoom 重置 100%
    }
  };

  return (
    <>
      {/* 3D 视口(flex 流内;全屏时覆盖右侧主区 x548–1904 y48–1080) */}
      <div className={`cabinet-area ${fullscreen ? "cabinet-area-fullscreen" : ""} ${inCabinet ? "is-detail" : ""}`}>
        {!fullscreen ? <span className="cabinet-bg-bleed" aria-hidden="true" /> : null}
        <iframe
          className="cabinet-area-frame"
          src="../preview-3d/index.page.html?v=s02-20261113-solid-materials"
          title="机柜绘制区域 3D 视图"
        />
        {fullscreen ? (
          <button
            type="button"
            className="cabinet-exit-fullscreen"
            onClick={() => {
              setFullscreen(false);
              postTo3D({ type: "reset" });
            }}
          >
            <Icon name="minimize" size="0.75rem" color="#191919" strokeWidth={1.5} />
            退出全屏
          </button>
        ) : null}
      </div>

      {!inCabinet && <>
      {/* 标题:文字框左上角画布 (556,263) */}
      <span className="cabinet-area-title">{cabinetScene.title}</span>

      {/* 时间:13px,墨迹右缘对齐 x1893,顶 y270 */}
      <span className="cabinet-area-time">{cabinetScene.time}</span>

      {/* 右侧工具条:原稿 PNG + 叠加刷新图标与 zoom 文字(实时) */}
      <img className="cabinet-toolbar" src={`${S01}/toolbar@2x.png`} alt="" draggable={false} />
      <span
        className="cabinet-toolbar-refresh"
        onClick={() => postTo3D({ type: "reset" })}
        style={{ cursor: "pointer" }}
        role="button"
        aria-label="重置视角"
      >
        <Icon name="refresh-cw" size="0.875rem" strokeWidth={1.5} color="#777777" />
      </span>
      <span className="cabinet-toolbar-zoom">{zoomPct}%</span>

      {/* 透明热区(hover 显示左侧深色 tooltip) */}
      {HOT_ZONES.map((zone) => (
        <button
          key={zone.key}
          type="button"
          className="cabinet-toolbar-hot"
          style={{ left: zone.cx - 14, top: zone.cy - 14 }}
          data-tip={zone.label}
          aria-label={zone.label}
          onClick={() => onHot(zone)}
        />
      ))}
      </>}
      <CabinetDetail pod={pod || "A"} active={inCabinet && !detail && view === "home"} onBack={returnToOverview}/>
    </>
  );
}
