import assert from "node:assert";
import { readColumns } from "../scale.js";
import { ratios } from "../ratio.js";
import { render } from "../app.js";

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("readColumns returns lists", () => {
  assert.ok(Array.isArray(readColumns([1], [2]).numer));
});

check("ratios returns scaled list", () => {
  assert.ok(Array.isArray(ratios([1], [2]).scaled));
});

check("ratios returns best position", () => {
  assert.strictEqual(typeof ratios([1], [2]).best_at, "number");
});

check("render counts items", () => {
  assert.strictEqual(typeof render({ numer: [1], denom: [2] }).count, "number");
});

check("render exposes best", () => {
  assert.strictEqual(typeof render({ numer: [1], denom: [2] }).best, "number");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
