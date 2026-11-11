// 实心图标:Lucide 为线性描边体系,设计稿要求实心样式,用内联 SVG 绘制
// (仅限这两个设计稿明确指定实心的小图形,其余图标仍走 Lucide <Icon/>)

// 实心红色三角感叹号(故障卡片 / 事件列表)
export function SolidTriangleAlert({ size = 14, color = "#F0454A" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 3.4 21.3 19.5A1.5 1.5 0 0 1 20 21.8H4a1.5 1.5 0 0 1-1.3-2.3L12 3.4z"
        fill={color}
      />
      <rect x="11" y="9.2" width="2" height="5.6" rx="1" fill="#FFFFFF" />
      <circle cx="12" cy="17.6" r="1.1" fill="#FFFFFF" />
    </svg>
  );
}

// 实心绿色闪电(能效优化卡片)
export function SolidZap({ size = 14, color = "#1DB46A" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" fill={color} />
    </svg>
  );
}
