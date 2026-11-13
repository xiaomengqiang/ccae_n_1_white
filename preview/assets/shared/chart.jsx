import { useRef, useEffect, useState, forwardRef, useImperativeHandle } from "react";

// Chart — HUICharts 的 React 封装(命令式 → 声明式)
// 底层: echarts + hui-charts.umd.js(全局 HUICharts),配置项 option 原样透传给 setSimpleOption。
// 暗色联动:自动监听 <html> 的 .dark class,切换 hdesign-light / hdesign-dark 主题并重建图表。
const Chart = forwardRef(function Chart(
  { name, option, className, style, onChartRendered },
  ref
) {
  const containerRef = useRef(null);
  const chartRef = useRef(null);
  const renderedRef = useRef(onChartRendered);
  renderedRef.current = onChartRendered;

  // .dark 切换 → 递增 tick 触发主 effect 重建(走同一条 init/dispose 路径)
  const [darkTick, setDarkTick] = useState(0);
  useEffect(() => {
    const mo = new MutationObserver(() => setDarkTick((t) => t + 1));
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);

  useEffect(() => {
    const dom = containerRef.current;
    if (!dom || !window.HUICharts) return;

    const isDark = document.documentElement.classList.contains("dark");
    const chart = new HUICharts();
    chart.init(dom, { renderer: "svg"});
    chart.setSimpleOption(name, {
      theme: isDark ? "hdesign-dark" : "hdesign-light",
      a2ui: true,
      ...option,
    });
    chart.render();
    chartRef.current = chart;
    if (renderedRef.current) renderedRef.current(chart);

    // 容器尺寸变化(侧栏折叠/窗口缩放/响应式) → 同步画布
    // 注:HUICharts 实例无 resize 方法,需取其内部 echarts 实例调用
    const syncSize = () => {
      const c = chartRef.current;
      if (!c || c._disposed) return;
      if (typeof c.resize === "function") {
        c.resize();
        return;
      }
      const ec = typeof c.getEchartsInstance === "function" ? c.getEchartsInstance() : null;
      if (ec && typeof ec.resize === "function") ec.resize();
    };
    const ro = new ResizeObserver(syncSize);
    ro.observe(dom);

    return () => {
      ro.disconnect();
      try { chart.dispose(); } catch (e) { /* 容器已卸载时静默 */ }
      chartRef.current = null;
    };
    // JSON.stringify 作 dep:option 是 JSX 内联对象,内容不变则不重建
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, JSON.stringify(option), darkTick]);

  useImperativeHandle(ref, () => ({
    getEchartsInstance: () => (chartRef.current ? chartRef.current.getEchartsInstance() : null),
    resizeHandler: () => {
      const c = chartRef.current;
      if (!c) return;
      if (typeof c.resize === "function") {
        c.resize();
        return;
      }
      const ec = typeof c.getEchartsInstance === "function" ? c.getEchartsInstance() : null;
      if (ec && typeof ec.resize === "function") ec.resize();
    },
  }), []);

  const wrapperStyle = { width: "100%", height: "100%", ...style };
  return <div ref={containerRef} className={className} style={wrapperStyle} />;
});

export default Chart;
