import "./index.css";

const S01 = "./assets/uploads/s01";

// 左侧图标栏 · 1:1:白底 + 右 1px 边线(现有),图标全部用原稿 PNG
// 组件内 y = 画布 y − 48(侧栏起于顶栏之下)
const ITEMS = [
  { src: "sn-logo@2x.png", x: 12, y: 32, w: 24, h: 24, title: "" },
  { src: "sn-home@2x.png", x: 6, y: 78.79, w: 36, h: 36, title: "首页" },
  { src: "sn-1@2x.png", x: 16, y: 136.79, w: 16, h: 16, title: "" },
  { src: "sn-2@2x.png", x: 16, y: 184.79, w: 16, h: 16, title: "" },
  { src: "sn-3@2x.png", x: 16, y: 232.79, w: 16, h: 16, title: "" },
  { src: "sn-bottom@2x.png", x: 16, y: 998, w: 16, h: 16, title: "展开菜单" },
];

export default function SideNav() {
  return (
    <nav className="side-nav">
      {ITEMS.map((item) => (
        <img
          key={item.src}
          src={`${S01}/${item.src}`}
          alt=""
          title={item.title || undefined}
          draggable={false}
          style={{ left: item.x, top: item.y, width: item.w, height: item.h }}
        />
      ))}
    </nav>
  );
}
