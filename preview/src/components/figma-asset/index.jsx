import { useEffect, useRef, useState } from "react";
// Keep exported SVG intrinsic dimensions; scale the image within its Figma slot.
export default function FigmaAsset({ file, alt = "", className = "", style }) {
  const box = useRef(null);
  const [natural, setNatural] = useState(null);
  const [scale, setScale] = useState([1, 1]);
  useEffect(() => {
    if (!natural || !box.current) return;
    const element = box.current;
    const resize = () => { if (element.isConnected) setScale([element.clientWidth / natural[0], element.clientHeight / natural[1]]); };
    resize(); const observer = new ResizeObserver(resize); observer.observe(element);
    return () => observer.disconnect();
  }, [natural]);
  return <span ref={box} className={className} style={{ position: "absolute", inset: 0, display: "block", pointerEvents: "none", ...style }}><img src={"./assets/uploads/qwen/" + file} alt={alt} onLoad={e => setNatural([e.target.naturalWidth, e.target.naturalHeight])} style={{ position: "absolute", left: 0, top: 0, maxWidth: "none", transformOrigin: "0 0", transform: `scale(${scale[0]},${scale[1]})` }} /></span>;
}
