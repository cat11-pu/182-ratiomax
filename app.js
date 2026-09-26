// app.js：渲染结果
import { readColumns } from "./scale.js";
import { ratios } from "./ratio.js";

export function render(spec) {
  const numer = spec.numer || [];
  const denom = spec.denom || [];
  const columns = readColumns(numer, denom);
  const view = ratios(numer, denom);
  const scaled = view.scaled || [];
  return { scaled: scaled, best_at: view.best_at || 0, best: view.best || 0,
           count: scaled.length, numer_count: columns.numer.length,
           denom_count: columns.denom.length };
}
