import { useState } from "react";
import { Icon } from "../../../assets/shared/icon.jsx";
import { useApp } from "../../context.jsx";
import { QWEN_STEPS } from "../../mock/detail-steps.js";
import "./index.css";

const S03 = "./assets/uploads/s03";

// 热区数据:optical(Qwen 同款结构由 QWEN_HOTZONES)
const OPT_HOTZONES = [
  { key: "lpo01", x: 815, y: 434, w: 38, h: 54, tip: ["L1-L2异常链路自动优雅隔离，待清污", "异常链路已完成优雅隔离，事件已关闭。"], alert: true },
  ...[1, 2, 3, 4].map((i) => ({ key: `lingqu-${i}`, x: 814 + 260 * (i - 1), y: 212, w: 250, h: 72, tip: [`灵衢 L2-0${i} · 互联芯片 2 · 正常`] })),
  ...[1, 2, 3, 4, 5, 6, 7, 8].map((i) => ({ key: `npu-${i}`, x: 814 + 130 * (i - 1), y: 755, w: 120, h: 64, tip: [`NPU计算刀片0${i} · NPU 8 卡 · 正常`] })),
];

const QWEN_HOTZONES = [
  { key: "P-01", x: 628, y: 383, w: 95, h: 102, tip: ["P-01 实例 · 10.0.12.11 · 正常"] },
  { key: "P-02", x: 628, y: 580, w: 95, h: 102, tip: ["P-02 实例 · 10.0.12.12 · 正常"] },
  ...[1, 2, 3, 4].flatMap((i) => [
    { key: `D-0${i}`, x: 863 + 206 * (i - 1), y: 383, w: 95, h: 102, tip: [`D-0${i} 实例 · 正常`] },
    { key: `D-0${i + 4}`, x: 863 + 206 * (i - 1), y: 580, w: 95, h: 102, tip: [`D-0${i + 4} 实例 · 正常`], isD08: i === 4 },
  ]),
  { key: "cab-c", x: 1690, y: 470, w: 160, h: 110, tip: ["计算柜13 · CPU02 · hinic3 网卡"] },
];

// 处理环节节点(两页共用式):optical 4 步 / qwen 6 步
const OPT_NODES = [
  { x: 600, w: 160, key: "sense" }, { x: 950, w: 180, key: "analyze" },
  { x: 1328, w: 210, key: "decide" }, { x: 1740, w: 130, key: "recover" },
];

const QWEN_NODE_X = { "q-sense": 600, "q-diag": 792, "q-plan": 984, "q-rdiag": 1176, "q-rplan": 1368, "q-recover": 1560, end: 1840 };

export default function DetailRight({ onExpandToggle, expanded }) {
  const { detail, resolved } = useApp();
  const [hoverZone, setHoverZone] = useState(null);
  const [showBigTip, setShowBigTip] = useState(true); // 默认显示
  const [tab, setTab] = useState("journey"); // journey | process
  const [flash, setFlash] = useState(null);

  if (!detail) return null;
  const isOptical = detail === "optical";
  const zones = isOptical ? OPT_HOTZONES : QWEN_HOTZONES;
  const steps = QWEN_STEPS; // qwen;optical 的步骤在 detail-panel 左侧,联动经 props?此处用全局 mock

  const jumpToStep = (key) => {
    setFlash(key);
    setTimeout(() => setFlash(null), 600);
    window.dispatchEvent(new CustomEvent("s03:jump-step", { detail: { key } }));
  };

  return (
    <section className={`dt-right${expanded ? " dt-right-expanded" : ""}`}>
      {/* —— 光链路右侧 —— */}
      {isOptical ? (
        <>
          <img className="dr-opt-topo" src={`${S03}/opt-topo@2x.png`} alt="" draggable={false} />
          {/* 状态提示框(默认显示,LPO01 点击切换) */}
          {showBigTip ? (
            <div className="dr-tip dr-tip-opt">
              <span className="dr-tip-arrow" aria-hidden="true" />
              <div className="dr-tip-head">
                <Icon name="triangle-alert" size="1.5rem" color="#E02128" strokeWidth={2} />
                <span className="dr-tip-title">L1-L2异常链路自动优雅隔离，待清污</span>
              </div>
              <p className="dr-tip-body">异常链路已完成优雅隔离，事件已关闭。</p>
            </div>
          ) : null}
          {/* 热区 */}
          {zones.map((z) => (
            <button
              key={z.key}
              type="button"
              className="dr-zone"
              style={{ left: z.x, top: z.y, width: z.w, height: z.h }}
              onMouseEnter={() => setHoverZone(z)}
              onMouseLeave={() => setHoverZone(null)}
              onClick={() => { if (z.alert) setShowBigTip((v) => !v); }}
              title={z.tip[0]}
            />
          ))}
          {/* 处理环节卡 + 节点热区 */}
          <img className="dr-opt-process" src={`${S03}/opt-process@2x.png`} alt="" draggable={false} />
          {OPT_NODES.map((n) => (
            <button
              key={n.key}
              type="button"
              className={`dr-node${flash === n.key ? " dr-node-flash" : ""}`}
              style={{ left: n.x, top: 905, width: n.w, height: 100 }}
              title="定位到对应步骤"
              onClick={() => jumpToStep(n.key)}
            />
          ))}
        </>
      ) : (
        /* —— Qwen 右侧 —— */
        <>
          <div className="dr-qw-card">
            <img className="dr-qw-metrics" src={`${S03}/qw-metrics@2x.png`} alt="" draggable={false} />
            <img className="dr-qw-topo" src={`${S03}/qw-topo@2x.png`} alt="" draggable={false} />
            <img className="dr-qw-cabinet" src={`${S03}/qw-cabinet@2x.png`} alt="" draggable={false} />
            {/* 大提示框(默认显示,指 D-08;点 D-08 切换) */}
            {showBigTip && !resolved ? (
              <div className="dr-tip dr-tip-qw">
                <span className="dr-tip-arrow-down" aria-hidden="true" />
                <div className="dr-tip-head">
                  <Icon name="triangle-alert" size="1.5rem" color="#E02128" strokeWidth={2} />
                  <span className="dr-tip-title">待升级网卡驱动版本</span>
                  <span className="dr-tip-tag">待人工处理</span>
                </div>
                <p className="dr-tip-body">原故障节点 112.34.23.1 · CPU02 · hinic3</p>
                <p className="dr-tip-body">当前版本为 V11.8，版本过低，需升级至 V13.1。</p>
              </div>
            ) : null}
            {/* D-08 恢复后叠绿色正常六边形 */}
            {resolved ? (
              <img className="dr-hex-normal" src={`${S03}/hex-normal@2x.png`} alt="" draggable={false} />
            ) : null}
            {/* 实例热区 */}
            {zones.map((z) => (
              <button
                key={z.key}
                type="button"
                className="dr-zone"
                style={{ left: z.x, top: z.y, width: z.w, height: z.h }}
                onMouseEnter={() => setHoverZone(z)}
                onMouseLeave={() => setHoverZone(null)}
                onClick={() => { if (z.isD08) setShowBigTip((v) => !v); }}
                title={z.tip[0]}
              />
            ))}
          </div>

          {/* 底部卡:服务旅程/处理环节 页签 */}
          <div className="dr-qw-bottom">
            <div className="dr-tabs">
              <button type="button" className={`dr-tab${tab === "journey" ? " dr-tab-on" : ""}`} onClick={() => setTab("journey")}>服务旅程</button>
              <button type="button" className={`dr-tab${tab === "process" ? " dr-tab-on" : ""}`} onClick={() => setTab("process")}>处理环节</button>
            </div>
            {tab === "journey" ? (
              <>
                <img className="dr-qw-journey" src={`${S03}/qw-journey@2x.png`} alt="" draggable={false} />
                {/* 处置时间点 hover */}
                {[
                  { x: 834, tip: "12:05:12 服务劣化开始" },
                  { x: 1049, tip: "12:05:22 定位 D-08 实例退出" },
                  { x: 1222, tip: "12:05:30 尝试实例重启失败" },
                  { x: 1437, tip: "12:05:40 生成网卡升级方案" },
                ].map((m) => (
                  <span key={m.x} className="dr-journey-dot" style={{ left: m.x }} title={m.tip} />
                ))}
              </>
            ) : (
              <div className="dr-process-strip">
                <span className="dr-ps-line" aria-hidden="true" />
                {steps.map((st, i) => (
                  <div
                    key={st.key}
                    className={`dr-ps-node${st.status === "manual" ? " dr-ps-node-cur" : ""}`}
                    style={{ left: 600 + i * 208 }}
                    onClick={() => jumpToStep(st.key)}
                    role="button"
                    tabIndex={0}
                  >
                    <span className="dr-ps-dot">
                      {st.status !== "manual" ? (
                        <img src={`${S03}/ic-step-done.svg`} alt="" draggable={false} />
                      ) : (
                        <img className="dr-ps-hand" src={`${S03}/ic-step-monitor.svg`} alt="" draggable={false} />
                      )}
                    </span>
                    <span className="dr-ps-name">{st.name}</span>
                    <span className="dr-ps-desc">{st.body || st.record?.title || ""}</span>
                    <span className="dr-ps-time">{(st.body || "").slice(0, 8)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* hover 小提示(跟随热区) */}
      {hoverZone ? (
        <span className="dr-hover-tip" style={{ left: hoverZone.x + hoverZone.w / 2, top: hoverZone.y - 34 }}>
          {hoverZone.tip[0]}
        </span>
      ) : null}
    </section>
  );
}
