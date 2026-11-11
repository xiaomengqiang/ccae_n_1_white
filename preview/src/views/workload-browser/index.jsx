import { useEffect, useMemo, useRef, useState } from "react";
import { useApp } from "../../context.jsx";
import { INFER_SERVICES, TRAIN_JOBS } from "../../mock/workloads.js";
import "./index.css";

const S02 = "./assets/uploads/s02";

const STATUS_COLOR = { interrupt: "#E02128", degrade: "#F4840C", stall: "#E02128", normal: "#09AA71" };
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
function WlCard({ item, view, selected, onClick }) {
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
        {item.status === "interrupt" ? (
          <span className="wl-card-tag" style={{ background: "#FABDC1", color: "#E02128" }}>待人工处理</span>
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
  const { view, detail, openDetail } = useApp();
  const [sortKey, setSortKey] = useState("status");
  const [sortOpen, setSortOpen] = useState(false);

  // ④ 视图或过滤变化时关闭排序下拉
  useEffect(() => {
    setSortOpen(false);
  }, [view, filterKey]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [glassTarget, setGlassTarget] = useState(null);
  const [glass, setGlass] = useState({ first: -1, last: -1, count: 0 });
  const listRef = useRef(null);

  const items = useMemo(() => {
    const src = view === "train" ? TRAIN_JOBS : INFER_SERVICES;
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
      const order = { interrupt: 0, degrade: 1, stall: 2, normal: 3 };
      arr.sort((a, b) => (order[a.status] ?? 9) - (order[b.status] ?? 9));
    } else if (sortKey === "name") {
      arr.sort((a, b) => a.name.localeCompare(b.name, "zh"));
    } else if (sortKey === "npu") {
      arr.sort((a, b) => b.npuCards - a.npuCards);
    }
    return arr;
  }, [view, filterKey, sortKey]);

  // 滚动时更新玻璃框与短条明暗(节流 rAF)
  useEffect(() => {
    const list = listRef.current;
    if (!list) return undefined;
    let raf = 0;
    const update = () => {
      raf = 0;
      const els = Array.from(list.querySelectorAll(".wl-cell"));
      const listTop = list.scrollTop;
      const listBottom = listTop + list.clientHeight - 64; // 渐隐区不算可视
      let first = -1, last = -1;
      els.forEach((el, i) => {
        const t = el.offsetTop, b = t + el.offsetHeight;
        if (b > listTop + 8 && t < listBottom) { if (first < 0) first = i; last = i; }
        // 短条明暗由 glass state 渲染驱动(见 wl-bars map)
      });
      if (els.length === 0) { setGlass({ first: -1, last: -1, count: 0 }); return; }
      if (first >= 0 && last >= 0) setGlass({ first, last, count: els.length });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    list.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => { list.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [items]);



  const active = (view === "train" || view === "infer") && !detail;
  const businessName = view === "train" ? "训练作业" : "推理服务";
  const filterName =
    filterKey === "interrupt" ? "中断" : filterKey === "degrade" ? "劣化" : filterKey === "stall" ? "卡死" : filterKey === "normal" ? "正常运行" : null;

  const scrollBy = (dir) => {
    if (listRef.current) listRef.current.scrollBy({ top: dir * 544, behavior: "smooth" });
  };

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
          <span>{{ status: "按状态排序", name: "按名称", npu: "按 NPU 卡数" }[sortKey]}</span>
          <span className="wl-sort-caret" aria-hidden="true">⌄</span>
        </button>
        {sortOpen ? (
          <div className="wl-sort-menu">
            {[["status", "按状态排序（异常在前）"], ["name", "按名称"], ["npu", "按 NPU 卡数"]].map(([k, label]) => (
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
        <div className="wl-bars-wrap">
        <div className="wl-bars">
          {items.map((it, i) => (
            <span
              key={it.key}
              data-bar={it.key}
              className={`wl-bar${i >= glass.first && i <= glass.last ? " wl-bar-visible" : ""}`}
              style={{ background: STATUS_COLOR[it.status] || STATUS_COLOR.normal }}
              title={it.name}
              onClick={() => {
                // 只滚列表容器(相对 offset 累加),绝不动页面滚动
                const list = listRef.current;
                const el = list?.querySelector(`[data-key="${it.key}"]`);
                if (list && el) {
                  let top = 0;
                  let node = el;
                  while (node && node !== list) { top += node.offsetTop; node = node.offsetParent; }
                  list.scrollTo({ top: Math.max(0, top - list.clientHeight / 2 + 124), behavior: "smooth" });
                  setSelectedCard(it.key);
                  setGlassTarget({ top: Math.max(0, top - list.clientHeight / 2 + 124), key: it.key });
                }
              }}
            />
          ))}
        </div>
        {glass.count > 0 ? (
          <span
            className="wl-glass"
            style={{
              left: `calc(3px + (100% - 6px) * ${glass.first / glass.count})`,
              width: `calc((100% - 6px) * ${(glass.last - glass.first + 1) / glass.count})`,
            }}
            aria-hidden="true"
          />
        ) : null}
        </div>

        <div className="wl-page-btns">
          <button type="button" className="wl-page-btn" title="上一组" onClick={() => scrollBy(-1)}>‹</button>
          <button type="button" className="wl-page-btn" title="下一组" onClick={() => scrollBy(1)}>›</button>
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
