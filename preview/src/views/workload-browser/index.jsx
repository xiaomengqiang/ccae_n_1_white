import { useEffect, useMemo, useRef, useState } from "react";
import { useApp } from "../../context.jsx";
import { TRAIN_JOBS, inferenceServices } from "../../mock/workloads.js";
import "./index.css";

const S02 = "./assets/uploads/s02";

const STATUS_COLOR = { interrupt: "#E02128", degrade: "#C76207", stall: "#E02128", normal: "#09AA71" };
const CARD_STYLE = {
  interrupt: { border: "#FEE7E8", bg: "linear-gradient(180deg,#FEE7E8 0%,#FFF 35%)" },
  degrade: { border: "rgba(252,206,146,.4)", bg: "linear-gradient(180deg,#FEF5E8 0%,#FFF 34%)" },
  stall: { border: "#FEF5E8", bg: "linear-gradient(180deg,#FEF5E8 0%,#FFF 34%)" },
  normal: { border: "#EDEDED", bg: "#FFFFFF" },
};
const TAG_STYLE = {
  interrupt: { bg: "#FABDC1", color: "#E02128" },
  degrade: { bg: "#FDE2BD", color: "#C76207" },
  normal: { bg: "#E7FBF2", color: "#09AA71" },
};

// —— 单张卡片 ——
function WlCard({ item, view, selected, onClick, handlingText }) {
  const st = CARD_STYLE[item.status] || CARD_STYLE.normal;
  const tag = TAG_STYLE[item.status] || TAG_STYLE.normal;
  const isQwen = item.icon === "qwen";
  return (
    <div
      className={`wl-card${selected ? " wl-card-selected" : ""}`}
      style={{ border: `0.8px solid ${st.border}`, background: st.bg }}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      {/* 标题行 */}
      <div className="wl-card-head">
        <img
          className="wl-card-icon"
          src={isQwen ? `${S02}/icon-qwen.svg` : `${S02}/icon-cube.svg`}
          alt=""
          draggable={false}
        />
        <span className="wl-card-name">{item.name}</span>
        <span className="wl-card-tag" style={{ background: tag.bg, color: tag.color }}>
          {{ interrupt: "中断", degrade: "劣化", stall: "卡死", normal: "正常运行" }[item.status] || "正常运行"}
        </span>
        {handlingText ? (
          <span className="wl-card-tag" style={{ background: "#FABDC1", color: "#E02128" }}>{handlingText}</span>
        ) : null}
        <span className="wl-card-time">{item.time}</span>
      </div>

      {/* 主指标三列 */}
      {view === "infer" ? (
        <div className="wl-main-metrics">
          <div className="wl-mm wl-mm-first">
            <span className="wl-mm-label">近24h请求成功率</span>
            <span className="wl-mm-value-xl">{item.successRate}<em className="wl-unit">%</em></span>
          </div>
          <div className="wl-mm wl-mm-mid">
            <span className="wl-mm-label">近24h请求数 / 成功 / 失败</span>
            <span className="wl-mm-value-md">
              {item.requests.split(" / ")[0]} / {item.requests.split(" / ")[1]} /{" "}
              <b className="wl-fail">{item.failed}</b>
            </span>
          </div>
          <div className="wl-mm wl-mm-last">
            <span className="wl-mm-label">NPU卡数</span>
            <span className="wl-mm-value-md">{item.npuCards}</span>
          </div>
        </div>
      ) : (
        <div className="wl-main-metrics">
          <div className="wl-mm wl-mm-first">
            <span className="wl-mm-label">训练进度</span>
            <span className="wl-mm-value-xl">{item.progress}<em className="wl-unit">%</em></span>
          </div>
          <div className="wl-mm wl-mm-mid">
            <span className="wl-mm-label">当前步数 / 总步数</span>
            <span className="wl-mm-value-md">{item.steps}</span>
          </div>
          <div className="wl-mm wl-mm-last">
            <span className="wl-mm-label">NPU卡数</span>
            <span className="wl-mm-value-md">{item.npuCards}</span>
          </div>
        </div>
      )}

      <div className="wl-divider" />

      {/* 辅助指标四列 */}
      {view === "infer" ? (
        <div className="wl-sub-metrics">
          <div><span className="wl-sm-label">TTFT</span><span className="wl-sm-value">{item.ttft}<em className="wl-unit-sm">ms</em></span></div>
          <div><span className="wl-sm-label">TPOT</span><span className="wl-sm-value">{item.tpot}<em className="wl-unit-sm">ms</em></span></div>
          <div><span className="wl-sm-label">生成Token数</span><span className="wl-sm-value">{item.tokens}<em className="wl-unit-sm">M</em></span></div>
          <div><span className="wl-sm-label">待人工处理 / 守护总数</span><span className="wl-sm-value">{item.manual}</span></div>
        </div>
      ) : (
        <div className="wl-sub-metrics">
          <div><span className="wl-sm-label">MFU</span><span className="wl-sm-value">{item.mfu}<em className="wl-unit-sm">%</em></span></div>
          <div><span className="wl-sm-label">迭代耗时</span><span className="wl-sm-value">{item.iterTime}<em className="wl-unit-sm">s</em></span></div>
          <div><span className="wl-sm-label">Loss</span><span className="wl-sm-value">{item.loss}</span></div>
          <div><span className="wl-sm-label">断点续训 / 守护总数</span><span className="wl-sm-value">{item.manual}</span></div>
        </div>
      )}
    </div>
  );
}

// —— 主区业务视图(浏览导航 + 卡片列表;home 时整体隐藏) ——
export default function WorkloadBrowser({ filterKey }) {
  const { qwenStage, view, detail, openDetail } = useApp();
  const [sortKey, setSortKey] = useState("status");
  const [sortOpen, setSortOpen] = useState(false);

  // ④ 视图或过滤变化时关闭排序下拉
  useEffect(() => {
    setSortOpen(false);
  }, [view, filterKey]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [frame, setFrame] = useState({ left: 0, width: 0 });
  const barsRef = useRef(null);
  const hoverRef = useRef({ x: null, locked: 0, timer: null });
  useEffect(() => () => clearTimeout(hoverRef.current.timer), []);
  const active = (view === "train" || view === "infer") && !detail;
  const capacity = 4; // 当前浅色卡片布局一屏两行，每行两个

  const [rangeState, setGlass] = useState({ first: -1, last: -1, count: 0 });
  const listRef = useRef(null);

  const items = useMemo(() => {
    const src = view === "train" ? TRAIN_JOBS : inferenceServices(qwenStage);
    let arr = [...src];
    if (filterKey && filterKey !== "total") {
      arr = arr.filter((it) => {
        if (filterKey === "normal") return it.status === "normal";
        if (filterKey === "degrade") return it.status === "degrade";
        if (filterKey === "interrupt") return it.status === "interrupt";
        if (filterKey === "stall") return it.status === "stall";
        return true;
      });
    }
    if (sortKey === "status") {
      const order = { interrupt: 0, stall: 1, degrade: 2, normal: 3 };
      arr.sort((a, b) => (order[a.status] ?? 9) - (order[b.status] ?? 9));
    } else if (sortKey === "quality") {
      arr.sort((a, b) => Number(a.successRate) - Number(b.successRate));
    } else if (sortKey === "name") {
      arr.sort((a, b) => a.name.localeCompare(b.name, "zh"));
    } else if (sortKey === "npu") {
      arr.sort((a, b) => b.npuCards - a.npuCards);
    }
    return arr;
  }, [view, filterKey, sortKey, qwenStage]);

  const maxStart = Math.ceil(Math.max(0, items.length - capacity) / 2) * 2;
  const firstIndex = Math.max(0, Math.min(rangeState.first, maxStart));
  const glass = { first: firstIndex, last: Math.min(items.length - 1, firstIndex + capacity - 1), count: items.length };
  useEffect(() => { setSortKey("status"); }, [view]);
  const navigate = (index, smooth = false) => {
    // 当前页内的对象只选中；右列对象必须向下取整定位到所在行，不能跳到下一行。
    if (smooth && index >= glass.first && index <= glass.last) return;
    const start = Math.max(0, Math.min(Math.floor(index / 2) * 2, maxStart));
    listRef.current?.scrollTo({ top: start / 2 * 272, behavior: smooth && !window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "smooth" : "auto" });
    if (!smooth) setGlass({ first: start, last: Math.min(items.length - 1, start + capacity - 1), count: items.length });
  };

  useEffect(() => {
    setExpanded(null);
    setSelectedCard(null);
    navigate(0);
  }, [view, filterKey, sortKey]);

  useEffect(() => {
    const list = listRef.current;
    if (!list || !active) return;
    const update = () => {
      const first = Math.min(maxStart, Math.floor((list.scrollTop + 1) / 272) * 2);
      setGlass({ first, last: Math.min(items.length - 1, first + capacity - 1), count: items.length });
    };
    list.addEventListener("scroll", update, { passive: true });
    update();
    return () => list.removeEventListener("scroll", update);
  }, [items, active, maxStart]);

  // 浏览条接收滚轮/触控板输入，统一驱动列表，由列表 scroll 回推范围框。
  useEffect(() => {
    const rail = barsRef.current?.parentElement;
    if (!rail || !active) return;
    const wheel = event => {
      const list = listRef.current;
      if (!list || !maxStart) return;
      event.preventDefault();
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      list.scrollBy({ top: delta * (event.deltaMode === 1 ? 20 : event.deltaMode === 2 ? list.clientHeight : 1), behavior: "auto" });
    };
    rail.addEventListener("wheel", wheel, { passive: false });
    return () => rail.removeEventListener("wheel", wheel);
  }, [active, maxStart]);

  // 用短条实际位置计算玻璃框，悬浮展开时仍包住当前四个对象。
  useEffect(() => {
    const bars = barsRef.current;
    if (!bars || !active) return;
    const update = () => {
      const first = bars.children[glass.first], last = bars.children[glass.last];
      if (first && last) setFrame({ left: first.offsetLeft - 3, width: last.offsetLeft + last.offsetWidth - first.offsetLeft + 6 });
    };
    const observer = new ResizeObserver(update);
    observer.observe(bars);
    Array.from(bars.children).forEach(el => observer.observe(el));
    update();
    return () => observer.disconnect();
  }, [glass.first, glass.last, glass.count, active, expanded]);

  const labels = { interrupt: "中断", stall: "卡死", degrade: "劣化", normal: "正常运行" };
  const handling = it => it.status === "normal" || !it.status ? "" : parseInt(it.manual) > 0 ? "待人工处理" : it.key === "svc-qwen15" && qwenStage < 9 ? "自动处理中" : "";
  const businessName = view === "train" ? "训练作业" : "推理服务";
  const filterName =
    filterKey === "interrupt" ? "中断" : filterKey === "degrade" ? "劣化" : filterKey === "stall" ? "卡死" : filterKey === "normal" ? "正常运行" : null;


  if (!active) return null;

  return (
    <div className="wl-root">
      {/* 浏览导航 */}
      <div className="wl-nav">
        <button
          type="button"
          className="wl-sort"
          onClick={() => setSortOpen((v) => !v)}
          title="排序"
        >
          <span>{{ status: "按状态排序", quality: "按成功率排序", name: "按名称", npu: "按卡数排序" }[sortKey]}</span>
          <span className="wl-sort-caret" aria-hidden="true"><img src={`${S02}/sort-chevron.svg`} alt="" /></span>
        </button>
        {sortOpen ? (
          <div className="wl-sort-menu">
            {[["status", "按状态排序（异常在前）"], [view === "infer" ? "quality" : "name", view === "infer" ? "按成功率排序" : "按名称"], ["npu", "按卡数排序"]].map(([k, label]) => (
              <button
                key={k}
                type="button"
                className={`wl-sort-item${sortKey === k ? " wl-sort-item-on" : ""}`}
                onClick={() => { setSortKey(k); setSortOpen(false); }}
              >
                {label}
              </button>
            ))}
          </div>
        ) : null}
        <span className="wl-nav-sep" />
        <div className="wl-bars-wrap" onPointerLeave={() => { clearTimeout(hoverRef.current.timer); setExpanded(null); hoverRef.current = { x: null, locked: 0, timer: null }; }}>
          <div className="wl-bars" ref={barsRef} onPointerMove={event => {
            const prev = hoverRef.current;
            if (prev.x !== null && Math.abs(prev.x - event.clientX) < 2) return;
            prev.x = event.clientX;
            if (performance.now() < prev.locked) return;
            const current = barsRef.current.querySelector(".wl-bar-expanded");
            const rect = current?.getBoundingClientRect();
            if (rect && event.clientX >= rect.left - 4 && event.clientX <= rect.right + 4) return;
            clearTimeout(prev.timer);
            const target = event.target.closest("[data-bar]");
            if (target && target.dataset.bar !== expanded) {
              const key = target.dataset.bar;
              prev.timer = setTimeout(() => { setExpanded(key); prev.locked = performance.now() + 260; }, 100);
            }
          }}>
            {items.map((it, i) => (
              <button type="button" key={it.key} data-bar={it.key}
                className={`wl-bar${it.status && it.status !== "normal" ? " wl-bar-abnormal" : ""}${i >= glass.first && i <= glass.last ? " wl-bar-visible" : ""}${expanded === it.key ? " wl-bar-expanded" : ""}`}
                style={{ color: STATUS_COLOR[it.status] || STATUS_COLOR.normal }}
                aria-label={`${it.name}，${labels[it.status] || "正常运行"}${handling(it) ? "，" + handling(it) : ""}，定位卡片`}
                onPointerDown={() => { clearTimeout(hoverRef.current.timer); hoverRef.current.locked = performance.now() + 350; }}
                onFocus={e => { if (e.target.matches(":focus-visible")) setExpanded(it.key); }}
                onBlur={() => setExpanded(null)}
                onKeyDown={e => {
                  if (["ArrowLeft", "ArrowRight"].includes(e.key)) {
                    e.preventDefault();
                    barsRef.current.children[Math.max(0, Math.min(items.length - 1, i + (e.key === "ArrowRight" ? 1 : -1)))].focus();
                  }
                }}
                onClick={() => { navigate(i, true); setSelectedCard(it.key); }}>
                <img className="wl-rail-icon" src={`${S02}/icon-${it.icon === "qwen" ? "qwen" : "cube"}.svg`} alt="" />
                <span className="wl-rail-short">{it.name.slice(0, 1)}</span>
                <span className="wl-rail-copy"><strong>{it.name}</strong><small><em className={`wl-rail-status wl-rail-status-${it.status || "normal"}`}>{labels[it.status] || "正常运行"}</em>{handling(it) && <em className={handling(it) === "待人工处理" ? "wl-rail-manual" : "wl-rail-auto"}>{handling(it)}</em>}</small></span>
                {handling(it) === "待人工处理" && <img className="wl-rail-hand" src="./assets/uploads/s01/lg-manual.svg" alt="待人工处理" />}
              </button>
            ))}
          </div>
          {glass.count > 0 && <span className="wl-glass" style={frame} aria-hidden="true" />}
          <input className="wl-range" type="range" min="0" max={maxStart} step="2" value={Math.max(0, glass.first)} disabled={!maxStart}
            aria-label="浏览当前屏对象，方向键移动范围" aria-valuetext={items.length ? `第 ${glass.first + 1} 至 ${glass.last + 1} 个，共 ${items.length} 个` : "没有符合条件的对象"}
            onChange={e => navigate(Number(e.target.value))} />
        </div>


      </div>

      {/* 卡片列表 */}
      <div className="wl-list-mask">
        <div className="wl-list" ref={listRef}>
          {items.length === 0 ? (
            <div className="wl-empty">
              <img src={`${S02}/icon-cube.svg`} alt="" className="wl-empty-icon" draggable={false} />
              <span>暂无{filterName || "该状态"}的{businessName}</span>
            </div>
          ) : (
            <div className="wl-grid">
              {items.map((it) => (
                <div data-key={it.key} key={it.key} className="wl-cell">
                  <WlCard
                    item={it}
                    view={view}
                    selected={selectedCard === it.key}
                    handlingText={handling(it)}
                    onClick={() => {
                      setSelectedCard(selectedCard === it.key ? null : it.key);
                      if (it.key === "svc-qwen15") openDetail("qwen");
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
