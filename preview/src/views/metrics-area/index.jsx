import { inferenceMetrics } from "../../mock/workloads.js";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useApp } from "../../context.jsx";
import { infrastructureMetrics, jobStatuses } from "../../mock/metrics.js";
import { INFER_METRICS, TRAIN_METRICS, COLLAPSED_ICONS } from "../../mock/workloads.js";
import "./index.css";

const S02 = "./assets/uploads/s02";
const S01 = "./assets/uploads/s01";

// 通用文字
function T({ x, y, size, lh, weight = 400, color = "#191919", children }) {
  return (
    <span
      className="mt-t"
      style={{ left: x, top: y, fontSize: size, lineHeight: `${lh}px`, fontWeight: weight, color }}
    >
      {children}
    </span>
  );
}

// 小图标 12 显示在 24×24 圆底托上(托底色按规格;mini-more 半透明)
function MiniIcon({ icon, bg, opacity }) {
  return (
    <span className="mx-mini" style={{ background: bg }}>
      <img src={`${S02}/${icon}@2x.png`} alt="" style={{ opacity }} draggable={false} />
    </span>
  );
}

// 收起摘要段(宽 156)
function Collapsed({ title, icons, line1, line2, active, onClick }) {
  return (
    <div
      className={`mx-collapsed${active ? " mx-collapsed-active" : ""}`}
      onClick={onClick}
      title={title}
    >
      <T x={0} y={0} size={18} lh={26} weight={500}>{title}</T>
      <div className="mx-collapsed-body">
        <div className="mx-mini-grid">
          {icons.map((it) => (
            <MiniIcon key={it.icon} icon={it.icon} bg={it.bg} opacity={it.opacity} />
          ))}
        </div>
        <div className="mx-collapsed-text">
          <span className="mx-collapsed-line1">{line1}</span>
          <span className="mx-collapsed-line2">{line2}</span>
        </div>
      </div>
    </div>
  );
}

// 展开段指标块(148×72;40 圆底托按规格底色 + 18 图标)
function MetricBlock({ m, selected, onClick }) {
  return (
    <button
      type="button"
      className={`mx-block${selected ? " mx-block-selected" : ""}`}
      onClick={onClick}
      title={m.label}
    >
      <span className="mx-block-icon" style={{ background: m.key === "total" ? "#eef3fe" : m.bg }}>
        <img src={`${S02}/${m.icon}@2x.png`} alt="" draggable={false} />
      </span>
      <span className="mx-block-text">
        <span className="mx-block-label">{m.label}</span>
        <span className="mx-block-value" style={m.numColor && m.value > 0 ? { color: m.numColor } : undefined}>
          {m.value}
        </span>
      </span>
    </button>
  );
}

// 展开段(宽 886)
function Expanded({ title, metrics, selectedKey, onSelect }) {
  return (
    <div className="mx-expanded">
      <T x={0} y={0} size={18} lh={26} weight={500}>{title}</T>
      <div className="mx-blocks">
        {metrics.map((m) => (
          <MetricBlock
            key={m.key}
            m={m}
            selected={selectedKey === m.key}
            onClick={() => onSelect(m.key)}
          />
        ))}
      </div>
    </div>
  );
}

export default function MetricsArea({ onFilterChange }) {
  const { view, setView, resolved, qwenStage, faultCount } = useApp();
  const [training, inference] = jobStatuses;
  const [fault, hazard, npu, hbm, energy] = infrastructureMetrics;
  const [selKey, setSelKey] = useState("total");
  const areaRef = useRef(null);
  const previousWidths = useRef(null);
  const previousDividers = useRef(null);
  const switchView = (next) => {
    if (next === view) return;
    const area = areaRef.current;
    const scale = area.getBoundingClientRect().width / area.offsetWidth;
    const sections = [...area.querySelectorAll(".mx-collapsed, .mx-expanded, .mx-home-section")];
    previousWidths.current = sections.length
      ? sections.map(el => el.getBoundingClientRect().width / scale)
      : [area.clientWidth - 64 - 64 - 312, 156, 156];
    previousDividers.current = [...area.querySelectorAll(".mx-sep")].map(el => getComputedStyle(el).transform);
    setView(next);
  };
  useLayoutEffect(() => {
    const previous = previousWidths.current;
    previousWidths.current = null;
    if (!previous || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const area = areaRef.current;
    const sections = [...area.querySelectorAll(".mx-collapsed, .mx-expanded, .mx-home-section")];
    // Animate real flex widths together: growing content pushes its next sibling.
    // Read all final widths before starting animations so measurements cannot affect each other.
    const widths = sections.map(el => el.offsetWidth);
    const animations = sections.map((el, index) => el.animate([
      { flexBasis: `${previous[index]}px`, flexGrow: 0, flexShrink: 0 },
      { flexBasis: `${widths[index]}px`, flexGrow: 0, flexShrink: 0 }
    ], { duration: 360, easing: "cubic-bezier(.22,1,.36,1)" }));
    const oldDividers = previousDividers.current;
    previousDividers.current = null;
    if (oldDividers) [...area.querySelectorAll(".mx-sep")].forEach((el, index) => {
      animations.push(el.animate([
        { transform: oldDividers[index] },
        { transform: getComputedStyle(el).transform }
      ], { duration: 360, easing: "cubic-bezier(.22,1,.36,1)" }));
    });
    return () => animations.forEach(animation => animation.cancel());
  }, [view]);


  // 视图切换时重置选中块(过滤随之回 total)
  useEffect(() => {
    setSelKey("total");
    if (onFilterChange) onFilterChange("total");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view]);

  const expanded = view === "train" ? "train" : view === "infer" ? "infer" : null;
  const metrics = expanded === "train" ? TRAIN_METRICS : inferenceMetrics(qwenStage);

  return (
    <section ref={areaRef} className={`metrics-area${expanded ? " metrics-area-expanded" : ""}`}>
      {view === "home" ? (
        <div className="mx-home-wrap">
          <div className="mx-home-section" style={{flexBasis:918}}>
            <div className="mx-home-content" style={{left:-40}}>
              <img className="mt-bg" src={`${S01}/metrics-bg@2x.png`} alt="" draggable={false} />
              <T x={40} y={20} size={18} lh={26} weight={500}>基础设施</T>
              <button type="button" className="mt-fault-selected mx-block-selected" aria-label="故障数" aria-pressed="true" />
          <T x={98} y={71} size={12} lh={20} color="#777">{fault.label}</T>
          <T x={98} y={93} size={24} lh={32} weight={700} color="#E02128">{faultCount}</T>

          <T x={290.5} y={71} size={12} lh={20} color="#777">{hazard.label}</T>
          <T x={290.5} y={93} size={24} lh={32} weight={700}>{hazard.value}</T>

          <T x={483} y={71} size={12} lh={20} color="#777">{npu.label}</T>
          <T x={483} y={93} size={24} lh={32} weight={700}>{npu.value}</T>
          <T x={536} y={103} size={12} lh={20} color="#777">{npu.unit}</T>

          <T x={675.5} y={71} size={12} lh={20} color="#777">{hbm.label}</T>
          <T x={675.5} y={93} size={24} lh={32} weight={700}>{hbm.value}</T>
          <T x={728.5} y={103} size={12} lh={20} color="#777">{hbm.unit}</T>

          <T x={868} y={71} size={12} lh={20} color="#777">{energy.label}</T>
          <T x={868} y={93} size={24} lh={32} weight={700}>{energy.value}</T>
          <T x={915} y={103} size={12} lh={20} color="#777">{energy.unit}</T>

            </div>
          </div>
          <span className="mx-sep" aria-hidden="true" />
          <div className="mx-home-section" style={{flexBasis:156}}>
            <div className="mx-home-content" style={{left:-990}}>
              <img className="mt-bg" src={`${S01}/metrics-bg@2x.png`} alt="" draggable={false} />
              <T x={990} y={20} size={18} lh={26} weight={500}>{training.label}</T>
          <T x={1058} y={71} size={24} lh={32} weight={500} color="#09AA71">{training.status}</T>
          <T x={1058} y={105} size={12} lh={20} color="#777">总数 {training.total} 个</T>
            </div>
            <button className="mx-entry-hot mx-home-hot" title="查看训练作业" onClick={() => switchView("train")} />
          </div>
          <span className="mx-sep" aria-hidden="true" />
          <div className="mx-home-section" style={{flexBasis:124}}>
            <div className="mx-home-content" style={{left:-1178}}>
              <img className="mt-bg" src={`${S01}/metrics-bg@2x.png`} alt="" draggable={false} />
              <T x={1178} y={20} size={18} lh={26} weight={500}>{inference.label}</T>
          {resolved ? <T x={1246} y={71} size={24} lh={32} weight={500} color="#09AA71">正常</T> : <>
            <span className="mt-infer-abnormal"><strong>1</strong><span>项异常</span></span>
            <img className="mt-infer-degraded" src={`${S01}/infer-degraded.svg`} alt="劣化" />
          </>}
          <T x={1246} y={105} size={12} lh={20} color="#777">总数 {inference.total} 个</T>

            </div>
            <button className="mx-entry-hot mx-home-hot" title="查看推理服务" onClick={() => switchView("infer")} />
          </div>
        </div>
      ) : (
        /* —— 业务视图态:三段横排(展开段替换当前业务) —— */
        <div className={`mx-expand-wrap mx-expand-${expanded}`}>
          <Collapsed
            title="基础设施"
            icons={COLLAPSED_ICONS.infra}
            line1={<><b className="mx-num-red">{faultCount}</b><em className="mx-unit-red">项异常</em></>}
            line2="NPU 8192 卡"
            onClick={() => switchView("home")}
          />
          <span className="mx-sep" aria-hidden="true" />
          {expanded === "train" ? (
            <Expanded
              title="训练作业"
              metrics={metrics}
              selectedKey={selKey}
              onSelect={(k) => { setSelKey(k); if (onFilterChange) onFilterChange(k); }}
            />
          ) : (
            <Collapsed
              title="训练作业"
              icons={COLLAPSED_ICONS.job}
              line1={<b className="mx-num-green">正常</b>}
              line2="总数 13 个"
              onClick={() => switchView("train")}
            />
          )}
          <span className="mx-sep" aria-hidden="true" />
          {expanded === "infer" ? (
            <Expanded
              title="推理服务"
              metrics={metrics}
              selectedKey={selKey}
              onSelect={(k) => { setSelKey(k); if (onFilterChange) onFilterChange(k); }}
            />
          ) : (
            <Collapsed
              title="推理服务"
              icons={COLLAPSED_ICONS.job}
              line1={resolved ? <b className="mx-num-green">正常</b> : <><b className="mx-num-red">1</b><em className="mx-unit-red">项异常</em></>}
              line2="总数 16 个"
              onClick={() => switchView("infer")}
            />
          )}
        </div>
      )}
    </section>
  );
}
