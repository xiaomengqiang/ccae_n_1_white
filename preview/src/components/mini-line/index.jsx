import { useId } from "react";
import "./index.css";

// 迷你趋势面积图:几乎水平的 1.5px 细线 #6E9BF2(起伏峰峰值 ≤ 4px),
// 线下方浅蓝渐变填充 rgba(110,155,242,0.18) → 0,高 14px 铺满该列
export default function MiniLine({ data = [] }) {
  const id = useId();
  const W = 100;
  const H = 14;
  const pad = 1;
  if (data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min;
  const mid = (min + max) / 2;
  const AMP = 4; // 峰峰值上限 4px

  const pts = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (W - pad * 2);
    const t = span === 0 ? 0 : (v - mid) / span; // -0.5 ~ 0.5
    const y = H / 2 - t * AMP;
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  });
  const line = pts.join(" ");
  const area = `${pad},${H} ${line} ${W - pad},${H}`;

  return (
    <svg className="mini-line-svg" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6E9BF2" stopOpacity="0.18" />
          <stop offset="1" stopColor="#6E9BF2" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill={`url(#${id})`} />
      <polyline
        points={line}
        fill="none"
        stroke="#6E9BF2"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
