// Layer 2: 导航 mock 数据 — 顶部导航 + 侧边图标导航
export const brand = {
  name: "iMaster CCAE",
  modeTag: "智能模式",
};

export const topNavActions = [
  { key: "theme", label: "切换深色模式", labelDark: "切换浅色模式" },
  { key: "user", label: "用户中心" },
];

export const sideNavItems = [
  { key: "home", icon: "house", label: "首页", active: true },
  { key: "chat", icon: "message-circle", label: "对话", active: false },
  { key: "agent", icon: "sparkles", label: "智能", active: false },
  { key: "docs", icon: "file-text", label: "文档", active: false },
];

export const sideNavFooter = { key: "menu", icon: "menu", label: "展开菜单" };
