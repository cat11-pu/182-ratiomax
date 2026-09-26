// ratio.js：算比值，分子乘一万再整除分母（向下取整），整数运算一次扫描
import { readColumns } from "./scale.js";

const SCALE = 10000n;

// BigInt 整除默认向零取整，这里补成向下取整，负数场景也不偏。
function floorDiv(top, base) {
  const quot = top / base;
  const rem = top % base;
  if (rem !== 0n && (rem < 0n) !== (base < 0n)) {
    return quot - 1n;
  }
  return quot;
}

export function ratios(numer, denom) {
  const columns = readColumns(numer, denom);
  const count = columns.numer.length;
  const scaled = new Array(count);
  let best_at = 0;
  let best = 0;
  for (let spot = 0; spot < count; spot += 1) {
    const top = BigInt(columns.numer[spot]) * SCALE;
    const base = BigInt(columns.denom[spot]);
    const value = Number(floorDiv(top, base));
    scaled[spot] = value;
    if (spot === 0 || value > best) {
      best = value;
      best_at = spot;
    }
  }
  return { scaled: scaled, best_at: best_at, best: best };
}
