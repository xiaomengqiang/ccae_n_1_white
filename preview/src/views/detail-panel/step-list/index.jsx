import { useEffect, useRef, useState } from "react";
import { useApp } from "../../../../src/context.jsx";
import { Icon } from "../../../../assets/shared/icon.jsx";
import "./index.css";

const S03 = "./assets/uploads/s03";

const STATUS_TAG = {
  done: { text: "已完成", bg: "#E7FBF2", color: "#09AA71" },
  manual: { text: "待人工处理", bg: "#FEE7E8", color: "#E02128" },
  none: { text: "无可用方案", bg: "#FEE7E8", color: "#E02128" },
};

// 单个步骤(手风琴行)
function Step({
  step, open, onToggle, children, chartData, last, dataStep, onResolved,
}) {
  const tag = STATUS_TAG[step.status];
  // 图标仅 manual 用圆环,其余(done/none)一律绿勾
  return (
    <div className="st-step" data-step={dataStep}>
      <button type="button" className={`st-head${open ? " st-head-open" : ""}`} onClick={onToggle}>
        <span className={`st-icon${step.status === "manual" ? " st-icon-spin" : ""}`}>
          <img src={`${S03}/${step.status === "manual" ? "ic-step-monitor" : "ic-step-done"}.svg`} alt="" draggable={false} />
        </span>
        <span className="st-name">{step.name}</span>
        <span className="st-tag" style={{ background: tag.bg, color: tag.color }}>{tag.text}</span>
        <img className="st-caret" src={`${S03}/${open ? "ic-chevron-up" : "ic-chevron-down"}.svg`} alt="" draggable={false} />
      </button>
      {!last ? <span className="st-line" aria-hidden="true" /> : null}
      <div className={`st-body${open ? " st-body-open" : ""}`}>
        <div className="st-body-inner">
          {children}
        </div>
      </div>
    </div>
  );
}

// 处理过程手风琴(默认最后一个当前步骤展开)
export default function StepList({ steps, chartData, jumpKey, listRef, onResolved }) {
  const [openKeys, setOpenKeys] = useState(() => {
    const cur = steps.filter((s) => s.status === "manual").map((s) => s.key);
    return new Set(cur.length ? cur : [steps[steps.length - 1].key]);
  });
  const rootRef = listRef || useRef(null);

  // 右侧处理环节节点 → 展开并滚动到该步骤
  useEffect(() => {
    if (!jumpKey) return;
    setOpenKeys((prev) => new Set(prev).add(jumpKey));
    const el = rootRef.current?.querySelector(`[data-step="${jumpKey}"]`);
    if (el && rootRef.current) {
      let top = 0, node = el;
      while (node && node !== rootRef.current) { top += node.offsetTop; node = node.offsetParent; }
      rootRef.current.scrollTo({ top, behavior: "smooth" });
    }
  }, [jumpKey]);
  const allOpen = openKeys.size >= steps.length;

  const toggle = (key) => {
    setOpenKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };
  const toggleAll = () => {
    setOpenKeys(allOpen ? new Set() : new Set(steps.map((s) => s.key)));
  };

  const lastKey = steps[steps.length - 1].key;

  return (
    <div className="st-list" ref={rootRef}>
      <div className="st-title-row">
        <span className="st-title">处理过程</span>
        <button type="button" className="st-expand-all" onClick={toggleAll}>
          <img src={`${S03}/ic-expand-all.svg`} alt="" draggable={false} />
          {allOpen ? "收起全部" : "展开全部"}
        </button>
      </div>

      {steps.map((step, idx) => (
        <Step
          key={step.key}
          dataStep={step.key}
          onResolved={onResolved}
          step={step}
          last={idx === steps.length - 1}
          open={openKeys.has(step.key)}
          onToggle={() => toggle(step.key)}
          chartData={chartData}
        >
          {step.record ? (
            <p className="st-record">
              <span className="st-record-time">{step.record.time}</span>
              <span className="st-record-title">{step.record.title}</span>
            </p>
          ) : null}
          {step.body ? <p className="st-text">{step.body}</p> : null}

          {step.recover ? (
            <div className="st-opt-recover">
              {/* 恢复主体图(自带 28 缩进) */}
              <img
                className="st-recover-img"
                src={`${S03}/opt-recover-body@2x.png`}
                alt=""
                draggable={false}
              />
              <ChartBlock chart={chartData.POWER_CHART} svg="chart-power" height={208} />
              <ChartBlock chart={chartData.ERRORS_CHART} svg="chart-errors" height={160} />
            </div>
          ) : null}

          {step.qwenRecover ? <QwenRecover onResolved={onResolved} /> : null}
        </Step>
      ))}
    </div>
  );
}

// 图表块(svg + DOM 绝对文字)
function ChartBlock({ chart, svg, height }) {
  const [hover, setHover] = useState(null);
  return (
    <div
      className="st-chart"
      style={{ height }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setHover(((e.clientX - r.left) / r.width) * 424);
      }}
      onMouseLeave={() => setHover(null)}
    >
      <img src={`${S03}/${svg}.svg`} alt="" draggable={false} />
      <span className="st-chart-title">{chart.title}</span>
      {chart.yTicks.map((t) => (
        <span key={t.text} className="st-chart-tick" style={{ left: t.x, top: t.y }}>{t.text}</span>
      ))}
      {chart.threshold ? (
        <span className="st-chart-tick st-chart-threshold" style={{ left: chart.threshold.x, top: chart.threshold.y }}>
          {chart.threshold.text}
        </span>
      ) : null}
      {chart.xTicks.map((t) => (
        <span key={t.text} className="st-chart-tick st-chart-x" style={{ left: t.x, top: chart.xTickY }}>{t.text}</span>
      ))}
      {chart.legend ? chart.legend.items.map((it) => (
        <span key={it.label} className="st-chart-legend" style={{ left: it.x, top: chart.legend.textY }}>
          <i style={{ background: it.color, left: it.dotX - it.x, top: chart.legend.y - chart.legend.textY }} />
          {it.label}
        </span>
      )) : null}
      {hover !== null ? (
        <>
          <span className="st-chart-cursor" style={{ left: hover }} />
          <span className="st-chart-tip" style={{ left: Math.min(hover + 8, 300) }}>
            12:0{Math.floor(hover / 53)}:40 · 通道1 −1.2 · 通道2 −1.0 · 通道3 −0.9 · 通道4 −3.2 dBm
          </span>
        </>
      ) : null}
    </div>
  );
}

// §6 授权升级完整流程组件(确认弹窗 → 升级中 → 完成态)
function QwenRecover({ onResolved }) {
  const { resolved } = useApp();
  const [phase, setPhase] = useState("idle"); // idle | confirm | upgrading | done
  const [progress, setProgress] = useState(0);
  const [extraRecords, setExtraRecords] = useState([]);
  const timers = useRef([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const startUpgrade = () => {
    setPhase("upgrading");
    setProgress(0);
    const t0 = performance.now();
    const tick = () => {
      const p = Math.min(1, (performance.now() - t0) / 3000);
      setProgress(p);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    const REC = [
      "12:06:20 开始升级 hinic3 驱动",
      "12:06:48 驱动升级完成，版本 V13.1",
      "12:06:52 D-08 实例已恢复，Qwen-1.5B 请求成功率 99.95%",
    ];
    timers.current = [
      setTimeout(() => setExtraRecords((r) => [...r, REC[0]]), 1000),
      setTimeout(() => setExtraRecords((r) => [...r, REC[1]]), 2000),
      setTimeout(() => {
        setExtraRecords((r) => [...r, REC[2]]);
        setPhase("done");
        if (onResolved) onResolved();
        window.dispatchEvent(new CustomEvent("s03:toast", { detail: { text: "网卡驱动升级完成，业务已恢复" } }));
      }, 3000),
    ];
  };

  const done = phase === "done" || resolved;

  return (
    <div className="st-qwen-recover">
      <p className="st-record">
        <img className="st-record-dot" src={`${S03}/ic-record-dot.svg`} alt="" draggable={false} />
        <span className="st-text-inline">
          12:06:06 待人工确认执行网卡升级，升级后核查驱动版本、D-08 实例和 Qwen-1.5B 服务
        </span>
      </p>
      {extraRecords.map((r) => (
        <p key={r} className="st-record">
          <img className="st-record-dot" src={`${S03}/ic-record-dot.svg`} alt="" draggable={false} />
          <span className="st-text-inline">{r}</span>
        </p>
      ))}
      <div className={`st-version-card${phase === "upgrading" ? " st-version-upgrading" : ""}`}>
        <div className="st-vc-head">
          <span className="st-vc-name">hinic3 网卡驱动</span>
          <span className="st-vc-host">112.34.23.1 · CPU02</span>
        </div>
        <div className="st-vc-body">
          <div className="st-vc-cell">
            <span className="st-vc-label">{done ? "已升级版本" : "当前版本"}</span>
            <span className="st-vc-ver">{done ? "V13.1" : "V11.8"}</span>
          </div>
          <span className="st-vc-swap" aria-hidden="true">
            <img src={`${S03}/ic-version-ring.svg`} alt="" className="st-vc-ring" draggable={false} />
            <img src={`${S03}/ic-version-swap.svg`} alt="" className="st-vc-arrow" draggable={false} />
          </span>
          <div className="st-vc-cell st-vc-target">
            <span className="st-vc-label">{done ? "当前版本" : "待升级版本"}</span>
            <span className="st-vc-ver st-vc-ver-grad">V13.1</span>
          </div>
        </div>
        {phase === "upgrading" ? <div className="st-progress"><span style={{ width: `${progress * 100}%` }} /></div> : null}
        <div className="st-vc-foot">
          {done ? (
            <button type="button" className="st-auth-btn st-auth-done" disabled>已升级</button>
          ) : phase === "upgrading" ? (
            <button type="button" className="st-auth-btn st-auth-busy" disabled>
              <span className="st-spinner" aria-hidden="true" />升级中…
            </button>
          ) : (
            <button type="button" className="st-auth-btn" onClick={() => setPhase("confirm")}>授权升级网卡</button>
          )}
        </div>
      </div>

      {phase === "confirm" ? (
        <div className="st-confirm-mask" onClick={() => setPhase("idle")}>
          <div className="st-confirm" onClick={(e) => e.stopPropagation()}>
            <span className="st-confirm-title">确认授权升级</span>
            <p className="st-confirm-body">
              将在 112.34.23.1 · CPU02 上把 hinic3 网卡驱动从 V11.8 升级至 V13.1，期间 D-08 实例将短暂不可用（约 30 秒）。
            </p>
            <div className="st-confirm-btns">
              <button type="button" className="st-confirm-cancel" onClick={() => setPhase("idle")}>取消</button>
              <button type="button" className="st-confirm-ok" onClick={startUpgrade}>确认升级</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
