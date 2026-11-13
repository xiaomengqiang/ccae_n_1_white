// 时间轴刻度换算工具：将 "HH:MM:SS" 时间转换为区间内的百分比位置

export function timeToMinutes(time) {
  const [h, m, s] = time.split(":").map(Number);
  return h * 60 + m + s / 60;
}

/**
 * 计算 time 在 [start, end] 区间内的位置比例（0 ~ 1）
 * @param {string} time "HH:MM:SS"
 * @param {{start: string, end: string}} range
 * @returns {number} 0 ~ 1
 */
export function fractionOf(time, range) {
  const start = timeToMinutes(range.start);
  const end = timeToMinutes(range.end);
  const current = timeToMinutes(time);
  return (current - start) / (end - start);
}

/**
 * 生成 [start, end] 内每分钟一个的时刻列表
 * @param {{start: string, end: string}} range
 * @returns {string[]} "HH:MM:SS" 数组
 */
export function minuteTicks(range) {
  const start = timeToMinutes(range.start);
  const end = timeToMinutes(range.end);
  const ticks = [];
  for (let t = Math.ceil(start); t <= Math.floor(end); t++) {
    const h = Math.floor(t / 60);
    const m = t % 60;
    ticks.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:00`);
  }
  return ticks;
}
