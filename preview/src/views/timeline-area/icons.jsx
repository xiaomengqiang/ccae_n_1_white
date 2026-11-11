// 时间轴专用内联 SVG 图标:实心图例图形 + 事件胶囊内的小图标
// (Lucide 为线性描边体系,设计稿要求实心/异形,故手绘)

// 图例·故障:红色实心三角
export function SolidLegendTriangle({ size = 14, color = "#F0454A" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 4 21.2 20H2.8L12 4z" fill={color} />
    </svg>
  );
}

// 图例·隐患:橙色实心盾牌
export function SolidLegendShield({ size = 14, color = "#FF8A1F" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.2 20 5.2v5.6c0 5.2-3.4 9-8 10.9-4.6-1.9-8-5.7-8-10.9V5.2l8-3z" fill={color} />
    </svg>
  );
}

// 图例·节能机会:绿色叶子
export function SolidLeaf({ size = 14, color = "#1DB46A" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19.5 4.5C10 4.5 4.5 10 4.5 19c0 .8.7 1.5 1.5 1.5 9 0 14.5-5.5 14.5-15 0-.55-.45-1-1-1z" fill={color} />
      <path d="M5.5 18.5C9 15 12.5 11.5 16.5 8.5" fill="none" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

// 图例·已闭环:深灰实心圆 + 白色对勾
export function SolidCheckCircle({ size = 14, color = "#4A4F5C" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill={color} />
      <path d="M7.6 12.4l3 3 5.8-5.8" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// 图例·影响到业务 / 事件角标:橙色八角星
export function SolidOctaStar({ size = 14, color = "#FF8A1F" }) {
  const pts = Array.from({ length: 16 }, (_, i) => {
    const a = (i * Math.PI) / 8;
    const r = i % 2 === 0 ? 10 : 4.4;
    return `${(12 + r * Math.cos(a)).toFixed(1)},${(12 + r * Math.sin(a)).toFixed(1)}`;
  }).join(" ");
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <polygon points={pts} fill={color} />
    </svg>
  );
}

// 图例·待人工处理 / 事件徽标:实心红色手掌(四指 + 拇指 + 掌)
export function SolidHand({ size = 14, color = "#F0454A" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <g fill={color}>
        <rect x="5.4" y="7.5" width="2.9" height="9" rx="1.45" />
        <rect x="9.1" y="5.6" width="2.9" height="11" rx="1.45" />
        <rect x="12.8" y="6.2" width="2.9" height="10.4" rx="1.45" />
        <rect x="16.5" y="8.2" width="2.9" height="8.4" rx="1.45" />
        <path d="M7 12.2 C4.9 11.7 3.6 10.5 3 8.8 C2.6 7.7 1.1 8.1 1.4 9.3 C1.9 11.7 3.3 13.3 5.4 14 L7 14.5 Z" />
        <path d="M5.2 13.2 H19.4 V16.6 C19.4 20.2 16.7 22.4 12.8 22.4 H11.2 C7.5 22.4 5.2 20 5.2 16.8 Z" />
      </g>
    </svg>
  );
}

// 事件胶囊·灰色描边三角(已闭环的隐患)
export function OutlineTriangle({ size = 14, color = "#A0A5AE" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 4.6 20.6 19.4H3.4L12 4.6z" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

// 事件胶囊·红色实心圆内白色三角(故障)
export function FaultCircle({ size = 14, color = "#F0454A" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill={color} />
      <path d="M12 7.4 17 16H7l5-8.6z" fill="#FFFFFF" />
    </svg>
  );
}
