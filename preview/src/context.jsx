import { useState, useEffect, createContext, useContext } from "react";

// Layer 1: 全局状态 — 主题模式 + 业务视图状态机(S02) + 诊断详情路由(S03)
// view: 'home' | 'train' | 'infer';detail: null | 'optical' | 'qwen'
const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  const [view, setView] = useState("home");
  const [detail, setDetail] = useState(null);
  const [detailFrom, setDetailFrom] = useState("home");
  const [bizOnly, setBizOnly] = useState(false);
  const [qwenStage, setQwenStage] = useState(6);
  const resolved = qwenStage === 9; // true = Qwen 授权升级已完成

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  // 用户先返回首页时，后台演示完成也要同步机柜状态。
  useEffect(() => {
    if (!resolved) return;
    const frame = document.querySelector(".cabinet-area-frame");
    const sync = () => frame?.contentWindow?.postMessage({ type: "resolveCabinet", id: "D-08" }, "*");
    sync();
    frame?.addEventListener("load", sync);
    return () => frame?.removeEventListener("load", sync);
  }, [resolved]);

  const openDetail = (id) => {
    setDetailFrom(view);
    setDetail(id);
  };
  const closeDetail = () => {
    if (resolved) {
      const frame = document.querySelector(".cabinet-area-frame");
      if (frame && frame.contentWindow) {
        frame.contentWindow.postMessage({ type: "resolveCabinet", id: "D-08" }, "*");
        // reset 延迟:等 detail 卸载动画/层恢复后再触发,避免被隐藏态吞掉
        setTimeout(() => {
          if (frame.contentWindow) frame.contentWindow.postMessage({ type: "reset" }, "*");
        }, 400);
      }
    }
    setDetail(null);
  };

  // Esc:详情页优先返回 detailFrom,业务视图返回 home
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      // Qwen 的 Escape 留给历史回看、抽屉等局部交互。
      if (detail === "qwen") return;
      if (detail) { closeDetail(); return; }
      if (view !== "home") setView("home");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [detail, view, resolved]);

  const value = {
    isDark,
    toggleDark: () => setIsDark((d) => !d),
    view,
    setView,
    detail,
    detailFrom,
    openDetail,
    closeDetail,
    resolved,
    qwenStage,
    bizOnly,
    setBizOnly,
    setQwenStage,
    faultCount: resolved ? 3 : 4,
    markResolved: () => setQwenStage(9),
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}
