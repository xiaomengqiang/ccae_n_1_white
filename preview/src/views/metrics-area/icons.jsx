// 实心图标:Lucide 为线性描边体系,设计稿要求实心填充,用内联 SVG 绘制
// (仅限设计稿明确指定实心的小图形,其余图标仍走 Lucide <Icon/>)

// 实心红色三角感叹号(故障)
export function SolidTriangleAlert({ size = 20, color = "#F0454A" }) {
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

// 实心橙色盾牌(隐患)
export function SolidShield({ size = 20, color = "#FF8A1F" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 2.2 20 5.2v5.6c0 5.2-3.4 9-8 10.9-4.6-1.9-8-5.7-8-10.9V5.2l8-3z"
        fill={color}
      />
      <path
        d="M8.6 11.6l2.4 2.4 4.6-4.6"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// 实心蓝色芯片(NPU)
export function SolidChip({ size = 20, color = "#3D7BFF" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="6" y="6" width="12" height="12" rx="2.4" fill={color} />
      <rect x="9.4" y="9.4" width="5.2" height="5.2" rx="1" fill="#FFFFFF" opacity="0.9" />
      <g stroke={color} strokeWidth="1.8" strokeLinecap="round">
        <path d="M9 3.2v2M12 3.2v2M15 3.2v2" />
        <path d="M9 18.8v2M12 18.8v2M15 18.8v2" />
        <path d="M3.2 9h2M3.2 12h2M3.2 15h2" />
        <path d="M18.8 9h2M18.8 12h2M18.8 15h2" />
      </g>
    </svg>
  );
}

// 实心紫色内存条(HBM)
export function SolidMemory({ size = 20, color = "#A64DFF" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="7" width="18" height="10" rx="2" fill={color} />
      <g fill="#FFFFFF" opacity="0.9">
        <rect x="5.4" y="9.4" width="1.9" height="5.2" rx="0.5" />
        <rect x="8.6" y="9.4" width="1.9" height="5.2" rx="0.5" />
        <rect x="11.8" y="9.4" width="1.9" height="5.2" rx="0.5" />
        <rect x="15" y="9.4" width="1.9" height="5.2" rx="0.5" />
        <rect x="18" y="9.4" width="0.9" height="5.2" rx="0.45" />
      </g>
      <g fill={color}>
        <rect x="5.4" y="18" width="2.4" height="2" rx="0.5" />
        <rect x="10.8" y="18" width="2.4" height="2" rx="0.5" />
        <rect x="16.2" y="18" width="2.4" height="2" rx="0.5" />
      </g>
    </svg>
  );
}

// 实心绿色闪电(能耗)
export function SolidZap({ size = 20, color = "#1DB46A" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" fill={color} />
    </svg>
  );
}

// 实心绿色圆形播放按钮(作业状态网格右下)
export function SolidPlayCircle({ size = 14, color = "#1DB46A" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill={color} />
      <path d="M10 8.2v7.6a.6.6 0 0 0 .92.5l6-3.8a.6.6 0 0 0 0-1l-6-3.8a.6.6 0 0 0-.92.5z" fill="#FFFFFF" />
    </svg>
  );
}

// 按名称取实心图标(基础设施指标)
export function SolidIconByName({ name, size = 20 }) {
  switch (name) {
    case "fault":
      return <SolidTriangleAlert size={size} />;
    case "hazard":
      return <SolidShield size={size} />;
    case "npu":
      return <SolidChip size={size} />;
    case "hbm":
      return <SolidMemory size={size} />;
    case "energy":
      return <SolidZap size={size} />;
    default:
      return null;
  }
}
