// ratio.js：算比值（整数运算：分子乘一万再整除分母，向下取整）
import { readColumns } from "./scale.js";

const SCALE = 10000n;

function scaledRatio(top, base) {
  const product = BigInt(top) * SCALE;
  const divisor = BigInt(base);
  let quotient = product / divisor;
  const rest = product % divisor;
  if (rest !== 0n && ((rest < 0n) !== (divisor < 0n))) {
    quotient -= 1n;
  }
  return Number(quotient);
}

export function ratios(numer, denom) {
  const columns = readColumns(numer, denom);
  const scaled = new Array(columns.numer.length);
  let best_at = 0;
  let best = 0;
  for (let spot = 0; spot < columns.numer.length; spot += 1) {
    const value = scaledRatio(columns.numer[spot], columns.denom[spot]);
    scaled[spot] = value;
    if (spot === 0 || value > best) {
      best = value;
      best_at = spot;
    }
  }
  return { scaled: scaled, best_at: best_at, best: best };
}
