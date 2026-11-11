import { useEffect, useRef, useState } from "react";
import { useApp } from "../../context.jsx";
import { Icon } from "../../../assets/shared/icon.jsx";
import {
  aiPanelMeta,
  chatInput,
  energyCard,
  faultCard,
  agentEvents,
  rangeOptions,
  answerFor,
} from "../../mock/ai-panel.js";
import "./index.css";

// 1:1 还原:Figma 原稿资产(panel-art/card/spark/segmented-track/input-box)
// + 绝对坐标文字层 + 第11轮交互(输入/分段/复选框/事件条目/抽屉/下拉)。
// 坐标为面板内坐标(画布坐标 − 48,48),画布 1920×1080 固定。
const S01 = "./assets/uploads/s01";

// 通用文字:绝对定位 + 字号/行高/字重/颜色(字重 Regular=400 Medium=500 Bold=700)
function T({ x, y, size, lh, weight = 400, color = "#191919", width, wrap, gradient, style, children }) {
  const base = { left: x, top: y, fontSize: size, lineHeight: `${lh}px`, fontWeight: weight, color };
  if (width) base.width = width;
  if (wrap) base.whiteSpace = "normal";
  if (gradient) {
    base.backgroundImage = gradient;
    base.WebkitBackgroundClip = "text";
    base.backgroundClip = "text";
    base.color = "transparent";
  }
  return (
    <span className="ai-t" style={{ ...base, ...style }}>
      {children}
    </span>
  );
}

// 资产图层:img 按原稿 1x 尺寸显示
function Art({ src, x, y, w, h, alt = "" }) {
  return (
    <img
      className="ai-art"
      src={`${S01}/${src}`}
      alt={alt}
      style={{ left: x, top: y, width: w, height: h }}
      draggable={false}
    />
  );
}

// 主页面 → 3D iframe 定位消息(第2批实现接收)
function focusCabinet(id) {
  const frame = document.querySelector(".cabinet-area-frame");
  if (frame && frame.contentWindow) {
    frame.contentWindow.postMessage({ type: "focusCabinet", id }, "*");
  }
}

export default function AiPanel() {
  const { openDetail, resolved } = useApp();
  const [faultStat, hazardStat] = faultCard.stats;
  const [mAvail, mReq] = faultCard.metrics;
  const [mMedium, mLarge] = energyCard.metrics;
  const [segManual, segAuto] = agentEvents.segments;

  // —— 交互状态(默认值与静态截图一致) ——
  const [seg, setSeg] = useState("manual");           // 分段:manual | auto
  const [bizOnly, setBizOnly] = useState(false);       // 仅显示影响业务事件
  const [selectedEvt, setSelectedEvt] = useState(null);// 选中事件 key
  const [drawerOpen, setDrawerOpen] = useState(false); // 查看全部抽屉
  const [range, setRange] = useState(aiPanelMeta.timeRange);
  const [rangeOpen, setRangeOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(null);          // {q, phase:'thinking'|'done', text, locateId}
  const inputRef = useRef(null);
  const answerTimer = useRef(null);

  // Esc 关闭回答卡/抽屉/下拉
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      setAnswer(null);
      setDrawerOpen(false);
      setRangeOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => () => clearTimeout(answerTimer.current), []);

  // 时间轴胶囊点击 → 左侧对应事件选中(第3批 B 联动)
  useEffect(() => {
    const onSelect = (e) => {
      const key = e.detail && e.detail.key;
      if (key) setSelectedEvt(key);
    };
    window.addEventListener("s01:event-select", onSelect);
    return () => window.removeEventListener("s01:event-select", onSelect);
  }, []);

  const sendQuestion = () => {
    const q = question.trim();
    if (!q) return;
    const mock = answerFor(q);
    setAnswer({ q, phase: "thinking", ...mock });
    setQuestion("");
    clearTimeout(answerTimer.current);
    answerTimer.current = setTimeout(() => {
      setAnswer((a) => (a ? { ...a, phase: "done" } : a));
    }, 600);
  };

  const visibleList = seg === "manual" ? agentEvents.list : agentEvents.autoList;

  return (
    <aside className="ai-panel">
      {/* —— 资产层(由底至上;panel-art-noevents 已去掉事件三角与分割线,由 DOM 渲染) —— */}
      <Art src="panel-art-noevents@2x.png" x={0} y={0} w={484} h={1032} />
      <Art src="card-fault@2x.png" x={25.75} y={271.5} w={429.5} h={162} />
      <Art src="card-energy@2x.png" x={26.5} y={443} w={426.5} h={177} />
      <Art src="spark-job@2x.png" x={45} y={402} w={178} h={18} />
      <Art src="spark-req@2x.png" x={264} y={405} w={178} h={18} />
      <Art src="spark-energy@2x.png" x={41} y={530} w={404} h={76} />
      {/* 分段轨道(无胶囊)+ CSS 选中胶囊 */}
      <Art src="segmented-track@2x.png" x={17} y={676} w={448} h={46} />
      <span
        className="ai-seg-pill"
        style={{ left: seg === "manual" ? 27 : 251, top: 684 }}
        aria-hidden="true"
      />
      <Art src="input-box@2x.png" x={8} y={952} w={468} h={72} />

      {/* —— 文字层 —— */}
      {/* 近一天(可点,展开下拉) */}
      <button
        type="button"
        className="ai-range-btn"
        style={{ left: 390, top: 10, width: 64, height: 28 }}
        title="切换统计时间范围"
        onClick={() => setRangeOpen((v) => !v)}
      >
        <T x={7} y={5.5} size={12} lh={20} color="#777">{range}</T>
      </button>
      {rangeOpen ? (
        <>
          <span className="ai-dropdown-mask" onClick={() => setRangeOpen(false)} aria-hidden="true" />
          <div className="ai-dropdown" style={{ left: 392, top: 40 }}>
            {rangeOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                className={`ai-dropdown-item${opt === range ? " ai-dropdown-item-active" : ""}`}
                onClick={() => { setRange(opt); setRangeOpen(false); }}
              >
                {opt}
                {opt === range ? <Icon name="check" size="0.75rem" color="#0067D1" /> : null}
              </button>
            ))}
          </div>
        </>
      ) : null}

      <T
        x={52}
        y={88}
        size={16}
        lh={24}
        weight={700}
        gradient="linear-gradient(90deg,#77C1EE 6.1%,#D270E1 51.5%,#F89E21 109.2%)"
        style={{ letterSpacing: "0.32px" }}
      >
        算小维
      </T>
      <T x={101} y={88} size={16} lh={24} weight={700} color="#34465F" style={{ letterSpacing: "0.32px" }}>
        在岗，健康守护中～
      </T>

      <T x={28} y={180} size={16} lh={24} weight={500}>守护效果</T>

      <div
        className="ai-guard-text"
        style={{
          left: 28.88,
          top: 215,
          width: 390,
          backgroundImage:
            "linear-gradient(90deg,#777 0%,#777 28.93%,#AD66FF 44.57%,#FF666B 55.45%,#FF9466 66.34%,#777 80.94%)",
        }}
      >
        <div style={{ whiteSpace: "nowrap" }}>正在守护8个超节点，8192卡，13个训练作业，16个推理服务，业务</div>
        <div style={{ whiteSpace: "nowrap" }}>均正常。目前共2项待人工处理的资源事件需关注</div>
      </div>

      {/* 故障与隐患卡片(右上 ^ 箭头热区:hover 圆底) */}
      <T x={85} y={291} size={14} lh={22} weight={500}>{faultCard.title}</T>
      <button type="button" className="ai-fold-hot" style={{ left: 414, top: 282 }} title="收起" />
      <T x={85} y={315} size={12} lh={20} weight={500} color="#777">
        {faultStat.label} <b className="c-red">{faultStat.num}</b>{faultStat.rest}
      </T>
      <T x={178} y={315} size={12} lh={20} weight={500} color="#777">
        {hazardStat.label} <b className="c-gray">{hazardStat.num}</b>{hazardStat.rest}
      </T>
      <T x={355.92} y={289} size={20} lh={28} weight={700}>{faultCard.rate.value}</T>
      <T x={399.45} y={296} size={12} lh={20} weight={500} color="#939393">{faultCard.rate.unit}</T>
      <T x={349.24} y={317} size={12} lh={20} weight={500} color="#777">{faultCard.rate.label}</T>
      <T x={45} y={346.27} size={12} lh={20} color="#777">{mAvail.label}</T>
      <T x={45} y={364.28} size={24} lh={32} weight={500}>{mAvail.value}</T>
      <T x={111} y={374.28} size={12} lh={20} color="#777">{mAvail.unit}</T>
      <T x={264.06} y={349.24} size={12} lh={20} color="#777">{mReq.label}</T>
      <T x={264.06} y={368.23} size={24} lh={32} weight={500}>{mReq.value}</T>
      <T x={330.06} y={378.23} size={12} lh={20} color="#777">{mReq.unit}</T>

      {/* 能效优化卡片 */}
      <T x={85} y={463} size={14} lh={22} weight={500}>{energyCard.title}</T>
      <button type="button" className="ai-fold-hot" style={{ left: 414, top: 454 }} title="收起" />
      <T x={85} y={487} size={12} lh={20} weight={500} color="#777">{energyCard.status}</T>
      <T x={356.72} y={461} size={20} lh={28} weight={700}>{energyCard.ratio.value}</T>
      <T x={383.38} y={468} size={12} lh={20} weight={500} color="#939393">{energyCard.ratio.unit}</T>
      <T x={320.24} y={489} size={12} lh={20} weight={500} color="#777">{energyCard.ratio.label}</T>
      <T x={41.04} y={530} size={12} lh={20} color="#777">{mMedium.label}</T>
      <T x={41.04} y={554} size={24} lh={32} weight={500}>{mMedium.value}</T>
      <T x={93.04} y={564} size={12} lh={20} color="#777">{mMedium.unit}</T>
      <T x={259.37} y={530} size={12} lh={20} color="#777">{mLarge.label}</T>
      <T x={259.36} y={554} size={24} lh={32} weight={500}>{mLarge.value}</T>
      <T x={311.37} y={564} size={12} lh={20} color="#777">{mLarge.unit}</T>

      {/* 智能体事件标题 + 复选框 + 查看全部 */}
      <T x={28} y={648} size={16} lh={24} weight={500}>{agentEvents.title}</T>
      <button
        type="button"
        className={`ai-check${bizOnly ? " ai-check-on" : ""}`}
        style={{ left: 233.47, top: 649 }}
        title={agentEvents.filterLabel}
        onClick={() => setBizOnly((v) => !v)}
        aria-pressed={bizOnly}
      >
        {bizOnly ? <Icon name="check" size="0.625rem" color="#FFFFFF" strokeWidth={3} /> : null}
      </button>
      <T
        x={257.47}
        y={649}
        size={14}
        lh={22}
        color="#777"
        style={{ pointerEvents: "none" }}
      >
        {agentEvents.filterLabel}
      </T>
      <a
        className="ai-events-link"
        style={{ left: 400, top: 649 }}
        onClick={() => setDrawerOpen(true)}
      >
        {agentEvents.viewAllLabel}
      </a>

      {/* 分段控件文字(选中 #191919 Medium / 未选中 #777)+ 点击切换 */}
      <button type="button" className="ai-seg-hot" style={{ left: 27, top: 684, width: 204, height: 30 }} onClick={() => setSeg("manual")}>
        <T x={55.05} y={4.87} size={14} lh={22} weight={500} color={seg === "manual" ? "#191919" : "#777"}>{segManual.label}</T>
        <T x={133.06} y={4.87} size={14} lh={22} weight={700} color={seg === "manual" ? "#E02128" : "#777"}>{resolved ? 1 : segManual.count}</T>
      </button>
      <button type="button" className="ai-seg-hot" style={{ left: 251, top: 684, width: 204, height: 30 }} onClick={() => setSeg("auto")}>
        <T x={55.05} y={4.5} size={14} lh={22} weight={500} color={seg === "auto" ? "#191919" : "#777"}>{segAuto.label}</T>
        <T x={129.05} y={4.5} size={14} lh={22} weight={700} color={seg === "auto" ? "#191919" : "#777"}>{segAuto.count}</T>
      </button>

      {/* 事件列表(红三角图标与分割线为 DOM,随列表淡出);manual 3 条 / auto 1 条 */}
      {(resolved ? visibleList.filter((ev) => ev.key === "evt-link-dirty") : visibleList).map((event, i) => {
        const dimmed = seg === "manual" && bizOnly && !event.affectsBusiness;
        const isAuto = seg === "auto";
        const showDivider = i < visibleList.length - 1 && !(seg === "manual" && bizOnly && !visibleList[i + 1].affectsBusiness) && !dimmed;
        return (
          <div
            key={event.key}
            className={`ai-event-row${dimmed ? " ai-event-dimmed" : ""}${selectedEvt === event.key ? " ai-event-selected" : ""}`}
            style={{ left: 28, top: 732 + i * 72 }}
            onClick={() => {
              if (isAuto) return;
              setSelectedEvt(event.key);
              focusCabinet(event.focusId);
              // 200ms 后进入诊断详情(事件1→optical,事件2/3→qwen)
              const target = event.key === "evt-link-dirty" ? "optical" : "qwen";
              setTimeout(() => openDetail(target), 200);
            }}
          >
            {isAuto ? (
              <span className="ai-orbit" style={{ left: 5, top: 3 }} aria-hidden="true" />
            ) : (
              <img className="ai-event-alert" src={`${S01}/event-alert@2x.png`} alt="" draggable={false} />
            )}
            <T x={isAuto ? 30 : 32} y={0} size={14} lh={22} weight={500} width={340}>{event.title}</T>
            <T x={380} y={1} size={12} lh={20} color="#777">{event.time}</T>
            <T x={32} y={26} size={14} lh={22} width={396} color="#777">{event.desc}</T>
            {showDivider ? <span className="ai-event-divider" aria-hidden="true" /> : null}
          </div>
        );
      })}

      {/* 底部输入框(第1批修正:全新落位,框体画布 68,1012,444×48) */}
      <input
        ref={inputRef}
        className="ai-input2"
        placeholder={chatInput.placeholder}
        aria-label="输入问题"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") sendQuestion(); }}
      />
      {/* 发送按钮热区(框体右缘向左 44 起,40×40 圆) */}
      <button
        type="button"
        className="ai-input-send-hot"
        title="发送"
        onClick={sendQuestion}
      />

      {/* 算小维回答卡(输入框正上方) */}
      {answer ? (
        <div className="ai-answer-card">
          <button type="button" className="ai-answer-close" title="关闭" onClick={() => setAnswer(null)}>
            <Icon name="x" size="0.875rem" color="#777777" />
          </button>
          <div className="ai-answer-q">{answer.q}</div>
          {answer.phase === "thinking" ? (
            <div className="ai-answer-thinking">
              算小维思考中
              <span className="ai-dot" />·<span className="ai-dot" />·<span className="ai-dot" />
            </div>
          ) : (
            <div className="ai-answer-text">
              {answer.text}
              {answer.locateId ? (
                <a className="ai-answer-locate" onClick={() => focusCabinet(answer.locateId)}>
                  在机房中定位 →
                </a>
              ) : null}
            </div>
          )}
        </div>
      ) : null}

      {/* 查看全部抽屉(画布右侧 480×1080,面板内偏移定位) */}
      {drawerOpen ? (
        <>
          <span className="ai-drawer-mask" onClick={() => setDrawerOpen(false)} aria-hidden="true" />
          <div className="ai-drawer">
            <div className="ai-drawer-head">
              <span className="ai-drawer-title">{agentEvents.title}</span>
              <button type="button" className="ai-drawer-close" title="关闭" onClick={() => setDrawerOpen(false)}>
                <Icon name="x" size="1rem" color="#777777" />
              </button>
            </div>
            <ul className="ai-drawer-list">
              {agentEvents.drawerList.map((item) => (
                <li key={item.key} className="ai-drawer-item">
                  <div className="ai-drawer-item-top">
                    <span className="ai-drawer-item-title">{item.title}</span>
                    <span className={`ai-status-tag ai-status-tag-${item.status}`}>{item.status}</span>
                  </div>
                  <span className="ai-drawer-item-time">{item.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : null}
    </aside>
  );
}
