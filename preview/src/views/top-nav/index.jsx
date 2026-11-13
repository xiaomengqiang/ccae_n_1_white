import { useEffect, useRef, useState } from "react";
import "./index.css";

const S01 = "./assets/uploads/s01";

// 顶部导航 · 1:1:整条 top-nav@2x.png(白底/Logo/标题/胶囊图形/右侧图标/分割线)
// + 叠加「智能模式」白字;胶囊/月亮/用户仅保留透明热区(图内已有可见图形)
export default function TopNav() {
  const [themeTip, setThemeTip] = useState(false);
  const tipTimer = useRef(null);

  useEffect(() => () => clearTimeout(tipTimer.current), []);

  const onThemeClick = () => {
    setThemeTip(true);
    clearTimeout(tipTimer.current);
    tipTimer.current = setTimeout(() => setThemeTip(false), 2000);
  };

  return (
    <header className="top-nav">
      <img className="tn-bg" src={`${S01}/top-nav@2x.png`} alt="" draggable={false} />

      {/* 图内不含的「智能模式」文字(257,14) */}
      <span className="tn-mode-text">智能模式</span>

      {/* 透明热区:智能模式胶囊 224–335 × 6–42 */}
      <button type="button" className="tn-hot" style={{ left: 224, top: 6, width: 111, height: 36 }} title="切换智能模式" />

      {/* 透明热区:月亮 ≈1804–1828(y12–36,主题切换) / 用户 ≈1852–1876 */}
      <button
        type="button"
        className="tn-hot"
        style={{ left: 1804, top: 12, width: 24, height: 24 }}
        onClick={onThemeClick}
        title="深色主题"
      />
      {themeTip ? <span className="tn-theme-tip">深色主题设计中，敬请期待</span> : null}
      <button
        type="button"
        className="tn-hot"
        style={{ left: 1852, top: 12, width: 24, height: 24 }}
        title="用户中心"
      />
    </header>
  );
}
