import { timelineMeta, timelineRange } from "../../mock/timeline.js";
import { timeToMinutes, minuteTicks } from "../../utils/time-scale.js";
import { useApp } from "../../context.jsx";
import { Icon } from "../../../assets/shared/icon.jsx";
import "./index.css";

// 1:1 还原:tl-bg / tl-track / tl-now / tl-event-* / lg-*.svg 原稿资产 + 绝对坐标文字。
// 卡片画布区域 (556,929,1340×126),组件 absolute 定位到画布;内部坐标 = 画布坐标 − (556,929)。
const S01 = "./assets/uploads/s01";

// 图例(x 为 16×16 图标左缘,文字在图标右 22px、垂直居中)
const LEGEND = [
  { icon: "lg-fault", label: "故障", x: 148 },
  { icon: "lg-risk", label: "隐患", x: 208 },
  { icon: "lg-energy", label: "节能机会", x: 268 },
  { sep: true, x: 352 },
  { icon: "lg-manual", label: "待人工处理", x: 367 },
  { icon: "lg-auto", label: "自动处理中", x: 463 },
  { icon: "lg-closed", label: "已闭环", x: 559 },
  { sep: true, x: 631 },
  { icon: "lg-impact", label: "影响到业务", x: 646 },
];

export default function TimelineArea() {
  const { openDetail, resolved, qwenStage, bizOnly } = useApp();
  const ticks = minuteTicks(timelineRange);
  const nowOffset = timeToMinutes(timelineRange.now) - timeToMinutes(timelineRange.start);
  // 刻度中心 x = 48 + 65.4737·i(卡内);i = nowOffset 一格由 tl-now 标签代替
  const tickCenter = (i) => 48 + 65.4737 * i;

  return (
    <section className="timeline-area">
      {/* 卡片底 + 轨道 + 当前时间 + 两枚融球事件胶囊
          (tl-now 画布 x1620 → 卡内 1064;事件 SVG 含外扩,主体左上画布
          (979.51/1205.24, 989.15) → SVG 左上卡内 (411, 36.6) / (636.84, 36.6)) */}
      <img className="tl-img" src={`${S01}/tl-bg.svg`} alt="" style={{ left: 0, top: 0, width: 1340, height: 126 }} />
      <img className="tl-img" src={`${S01}/tl-track.svg`} alt="" style={{ left: 20, top: 70.68, width: 1304, height: 10 }} />
      <img className="tl-img" src={`${S01}/tl-now.svg`} alt="" style={{ left: 1064, top: 70.68, width: 64, height: 41 }} />
      {/* 事件胶囊(hover 提示卡 + 点击联动左侧选中与 3D 定位) */}
      {[
        { img:"tl-figma-0.svg", x:71.55, w:84, evKey:"evt-npu-firmware", focusId:"D-08", tip:["11:55:00 NPU驱动固件版本不一致", "SuperpodD · 计算柜08 · 待人工处理"] },
        { img:"tl-figma-0.svg", x:211.55, w:84, evKey:"evt-npu-port", focusId:"D-08", tip:["11:57:00 NPU网口linkdown", "SuperpodD · 计算柜08 · 待人工处理"] },
        { img:"tl-figma-2.svg", x:411.07, w:93, evKey:"evt-link-dirty", storyId:"optical", focusId:"A-15", tip:["12:00:40 光链路脏污，待清污", "计算柜11 · 待人工处理"] },
        { img:"tl-figma-1.svg", x:662.55, w:96, evKey:"evt-npu-linkdown", storyId:"qwen", focusId:"D-08", tip:["12:05:12 Qwen-1.5B服务劣化：网卡驱动版本低", "影响业务 · " + (resolved ? "已闭环" : qwenStage > 6 ? "自动处理中" : "待人工处理")] },
      ].filter(ev => !bizOnly || ev.storyId === "qwen").map((ev) => (
        <span
          key={ev.evKey}
          className="tl-event-hot"
          style={{ left: ev.x, top: ev.storyId === "optical" ? 47.02 : 47.55, width: ev.w, height: 59 }}
          tabIndex={0}
          role="button"
          aria-label={ev.tip[0]}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); e.currentTarget.click(); } }}
          onClick={() => {
            window.dispatchEvent(new CustomEvent("s01:event-select", { detail: { key: ev.evKey } }));
            const frame = document.querySelector(".cabinet-area-frame");
            if (frame && frame.contentWindow) frame.contentWindow.postMessage({ type: "focusCabinet", id: ev.focusId }, "*");
            if (ev.storyId) openDetail(ev.storyId);
          }}
        >
          {ev.storyId === "qwen" && qwenStage !== 6 ? (
            <span className={"tl-single-state " + (resolved ? "closed" : "processing")} aria-hidden="true">
              <img className="tl-single-glass" src={`${S01}/tl-figma-0.svg`} alt="" />
              <img className="tl-state-badge" src={`${S01}/${resolved ? "lg-closed" : "lg-auto"}.svg`} alt="" />
              {!resolved && <img className="tl-state-impact" src={`${S01}/lg-impact.svg`} alt="" />}
            </span>
          ) : <img className="tl-img tl-event-pill" src={`${S01}/${ev.img}`} alt="" style={{ left:0, top:0, width:ev.w, height:59 }} />}
          <span className="tl-event-tip">
            <span className="tl-event-tip-title">{ev.tip[0]}</span>
            <span className="tl-event-tip-sub">{ev.tip[1]}</span>
          </span>
        </span>
      ))}

      {/* 标题 */}
      <span className="tl-t" style={{ left: 20, top: 16.68, fontSize: 16, lineHeight: "24px", fontWeight: 500 }}>
        {timelineMeta.title}
      </span>

      {/* 图例:16×16 图标 + 6px 间隙 + 文字 */}
      {LEGEND.map((item, i) =>
        item.sep ? (
          <span key={`sep-${i}`} className="tl-sep" style={{ left: item.x, top: 21 }} />
        ) : (
          <span key={item.icon} className="tl-lg">
            <img src={`${S01}/${item.icon}.svg`} alt="" style={{ left: item.x, top: 18.68 }} />
            <span className="tl-t" style={{ left: item.x + 22, top: 16.68 }}>{item.label}</span>
          </span>
        )
      )}

      {/* 右侧时钟 + 近24h */}
      <svg className="tl-clock-svg" width="14" height="14" viewBox="0 0 24 24" style={{ left: 1268, top: 19.68 }} aria-hidden="true">
        <circle cx="12" cy="12" r="9" fill="none" stroke="#777" strokeWidth="1.8" />
        <path d="M12 7.5V12l3 2" fill="none" stroke="#777" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
      <span className="tl-t" style={{ left: 1287, top: 16.68 }}>{timelineMeta.rangeLabel}</span>

      {/* 时间刻度:20 格等分,中心 x = 48 + 65.4737·i,当前时间格由 tl-now 蓝标签代替 */}
      {ticks.map((tick, i) =>
        i === nowOffset ? null : (
          <span
            key={tick}
            className="tl-t tl-tick"
            style={{ left: tickCenter(i) - 28, top: 91.68 }}
          >
            {tick}
          </span>
        )
      )}

      {/* 当前时间白字(居中于 tl-now 蓝标签) */}
      <span className="tl-t tl-now-text" style={{ left: tickCenter(nowOffset) - 28, top: 91.68 }}>
        {timelineRange.now}
      </span>
    </section>
  );
}
