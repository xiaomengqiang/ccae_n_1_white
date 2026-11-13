import { useEffect, useRef, useState } from "react";
import { useApp } from "../../context.jsx";
import {
  OPTICAL_STEPS, QWEN_STEPS, POWER_CHART, ERRORS_CHART,
} from "../../mock/detail-steps.js";
import StepList from "./step-list/index.jsx";
import DetailRight from "../detail-right/index.jsx";
import "./index.css";

const S03 = "./assets/uploads/s03";

// S03 诊断详情页:左侧事件面板(页头图 + 摘要图 + 处理过程手风琴 + 底部输入框)
// 右侧诊断区第 1 批仅工具条 + 占位
export default function DetailPanel() {
  const { detail, closeDetail, resolved, markResolved } = useApp();
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  useEffect(() => {
    const onToast = (e) => {
      setToast(e.detail ? e.detail.text : "");
      clearTimeout(toastTimer.current);
      toastTimer.current = setTimeout(() => setToast(null), 2200);
    };
    window.addEventListener("s03:toast", onToast);
    return () => { window.removeEventListener("s03:toast", onToast); clearTimeout(toastTimer.current); };
  }, []);
  const [expandedPanel, setExpandedPanel] = useState(false);
  const [jumpKey, setJumpKey] = useState(null);
  const scrollRef = useRef(null); // 右侧处理环节节点 → 左侧步骤

  useEffect(() => {
    const onJump = (e) => setJumpKey(e.detail ? e.detail.key : null);
    window.addEventListener("s03:jump-step", onJump);
    return () => window.removeEventListener("s03:jump-step", onJump);
  }, []);

  if (!detail) return null;

  const isOptical = detail === "optical";
  // qwen 已恢复:故障恢复步骤 → 已完成
  const steps = isOptical
    ? OPTICAL_STEPS
    : resolved
      ? QWEN_STEPS.map((st) => (st.key === "q-recover" ? { ...st, status: "done" } : st))
      : QWEN_STEPS;
  const assetKey = isOptical ? "opt" : "qw";

  return (
    <>
      {/* 左侧面板(x48–532):替换算小维(由 app 层互斥渲染) */}
      <aside className={`dt-panel${expandedPanel ? " dt-panel-hidden" : ""}`}>
        {/* 页头图(含返回箭头/标题/标签/时间/···) */}
        <img
          className="dt-header"
          src={`${S03}/${assetKey}-header@2x.png`}
          alt=""
          draggable={false}
        />
        {/* 返回热区 */}
        <button
          type="button"
          className="dt-back-hot"
          title="返回"
          onClick={closeDetail}
        />
        {/* 已恢复标签(授权升级完成,覆盖页头待人工处理) */}
        {resolved && !isOptical ? <span className="dt-restored-tag">已恢复</span> : null}
        {/* 更多热区(菜单第2批) */}
        <button type="button" className="dt-more-hot" title="更多" />

        <span className="dt-head-divider" aria-hidden="true" />

        {/* 滚动区:摘要卡 + 处理过程 */}
        <div className="dt-scroll" ref={scrollRef}>
          <img
            className="dt-summary"
            src={`${S03}/${assetKey}-summary@2x.png`}
            alt=""
            draggable={false}
          />
          <StepList steps={steps} chartData={{ POWER_CHART, ERRORS_CHART }} jumpKey={jumpKey} listRef={scrollRef} onResolved={markResolved} />
        </div>

        {/* 底部固定输入区(复用首页输入框样式) */}
        <div className="dt-input-zone">
          <img className="dt-input-bg" src="./assets/uploads/s01/input-box@2x.png" alt="" draggable={false} />
          <input className="dt-input" placeholder="输入问题或输入“/”触发提示词" aria-label="输入问题" />
        </div>
      </aside>

      {/* 右侧诊断区内容(§4/§5) */}
      <DetailRight expanded={expandedPanel} onExpandToggle={() => setExpandedPanel((v) => !v)} />

      {/* 工具条(覆盖在最上) */}
      <section className={`dt-right dt-right-toolbar-only${expandedPanel ? " dt-right-expanded" : ""}`}>
        <div className="dt-toolbar">
          <span className="dt-toolbar-title">诊断详情</span>
          <button
            type="button"
            className="dt-toolbar-zoom"
            title={expandedPanel ? "收起" : "放大"}
            onClick={() => setExpandedPanel((v) => !v)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#777" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              {expandedPanel ? (
                <>
                  <path d="M9 3H3v6" /><path d="M15 21h6v-6" />
                  <path d="M3 3l7 7" /><path d="M21 21l-7-7" />
                </>
              ) : (
                <>
                  <path d="M3 9V3h6" /><path d="M21 15v6h-6" />
                  <path d="M3 9l7-7" /><path d="M21 15l-7 7" />
                </>
              )}
            </svg>
          </button>
        </div>
      </section>
      {toast ? <span className="dt-toast">{toast}</span> : null}
    </>
  );
}
