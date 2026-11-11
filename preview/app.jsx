// App entry — ICT React page
// Layering convention (one folder per component, kebab-case + index.jsx/index.css):
//   Layer 1 global state  → src/context.jsx        (AppProvider: global state + dark mode toggle)
//   Layer 2 mock data     → src/mock/              (per-domain files, e.g. device.js / alarm.js)
//   Layer 3 reusable      → src/components/{name}/ (cross-view, e.g. status-tag / section-card)
//   Layer 4 views         → src/views/{name}/      (one per tab/section, e.g. device-table / header-bar)
//   src/utils/            → pure function utilities (formatNumber, debounce, etc.)
//   src/hooks/            → custom React hooks (useDebounce, useTableData, etc.)
//   src/constants/        → enums and config constants (STATUS_MAP, PAGE_SIZE, etc.)
//   src/styles/           → cross-view shared CSS (utility classes, keyframes; not antd overrides)
//   Layer 5 layout        → app.jsx                (Provider + root container assembly)
//
// Styling: custom styles in component folder's index.css; prefer tokens for visual values.

import { useEffect, useRef, useState } from "react";
import { ConfigProvider, Empty } from "antd";
import zhCN from "./assets/shared/antd-zh.js";
import { AppProvider, useApp } from "./src/context.jsx";
import TopNav from "./src/views/top-nav/index.jsx";
import SideNav from "./src/views/side-nav/index.jsx";
import AiPanel from "./src/views/ai-panel/index.jsx";
import MetricsArea from "./src/views/metrics-area/index.jsx";
import CabinetArea from "./src/views/cabinet-area/index.jsx";
import TimelineArea from "./src/views/timeline-area/index.jsx";
import WorkloadBrowser from "./src/views/workload-browser/index.jsx";
import DetailPanel from "./src/views/detail-panel/index.jsx";
import "./app.css";

// 大屏等比缩放:设计画布固定 1920×1080,按视口整体 scale 并居中,
// 任何窗口尺寸下布局比例与 1920×1080 完全一致;留白用页面灰填充。
// transform: scale 不改变布局尺寸,iframe(3D)内部 viewport 不受影响。
const DESIGN_W = 1920;
const DESIGN_H = 1080;

// 内层页面(可使用 useApp;3D 区按视图切换隐藏态)
function Page({ metricFilter, rootRef }) {
  const { view, detail } = useApp();

  // ④ 切换视图时重置过滤为「总数」
  useEffect(() => {
    metricFilter[1]("total");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view]);
  return (
    <div className="app-shell">
      <div className="app-root" ref={rootRef}>
        <TopNav />
        <div className="app-body">
          <SideNav />
          {detail ? <DetailPanel /> : <AiPanel />}
          <div className="app-main">
            <MetricsArea onFilterChange={metricFilter[1]} />
            {/* 指标卡已 absolute 到画布 (554,72),此处占位保持 flex 流高度 */}
            <div className="metrics-ph" aria-hidden="true" />
            {/* 3D 机柜区:业务视图下淡出下移(iframe 保留 DOM 不卸载,回 home 不重载) */}
            <div className={`cabinet-fade${view === "home" && !detail ? "" : " cabinet-fade-hidden"}`}>
              <CabinetArea />
            </div>
            <TimelineArea />
            {/* 时间轴已 absolute 到画布 (556,929),此处占位保持 flex 流高度 */}
            <div className="timeline-ph" aria-hidden="true" />
            <WorkloadBrowser filterKey={metricFilter[0]} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const rootRef = useRef(null);
  const [metricFilter, setMetricFilter] = useState("total");

  useEffect(() => {
    const fit = () => {
      const el = rootRef.current;
      if (!el) return;
      const scale = Math.min(window.innerWidth / DESIGN_W, window.innerHeight / DESIGN_H);
      el.style.transform = `scale(${scale})`;
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  return (
    <AppProvider>
      <ConfigProvider
        locale={zhCN}
        wave={{ disabled: true }}
        renderEmpty={() => <Empty style={{ padding: "2rem 0" }} />}
        empty={{ image: "./assets/uploads/empty.svg" }}
        spin={{ indicator: <img src="./assets/uploads/loading.svg" alt="" className="custom-spin-indicator" /> }}
      >
        <Page metricFilter={[metricFilter, setMetricFilter]} rootRef={rootRef} />
      </ConfigProvider>
    </AppProvider>
  );
}
