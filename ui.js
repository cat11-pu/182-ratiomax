// ui.js：操作面板与视图（原生 DOM，无弹窗）
import { render } from "./app.js";

export function mount(spec, parts) {
  parts.log.textContent = "分子 " + (spec.numer || []).length + " 项，分母 " + (spec.denom || []).length + " 项。";

  function draw() {
    let view = null;
    try {
      view = render(spec);
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
      parts.log.textContent = "跑不动：" + String(error && error.message ? error.message : error);
      return;
    }
    parts.out.textContent = JSON.stringify(view, null, 1);
    parts.stage.textContent = "";
    view.scaled.forEach(function (value, spot) {
      const row = document.createElement("div");
      row.className = "row";
      const head = document.createElement("span");
      head.textContent = (spec.numer || [])[spot] + " 除 " + (spec.denom || [])[spot];
      row.appendChild(head);
      const bar = document.createElement("span");
      bar.className = "bar";
      const fill = document.createElement("i");
      fill.style.width = Math.min(100, Math.max(0, value)) + "%";
      bar.appendChild(fill);
      row.appendChild(bar);
      const mark = document.createElement("span");
      mark.className = "chip" + (spot === view.best_at ? " ok" : "");
      mark.textContent = "万分之 " + value + (spot === view.best_at ? "（最大）" : "");
      row.appendChild(mark);
      parts.stage.appendChild(row);
    });
    parts.legend.textContent = "最大位置 " + view.best_at + "，最大比值 " + view.best + "（万分比）";
    parts.log.textContent = "项数 " + view.count;
  }

  const runButton = document.createElement("button");
  runButton.className = "primary";
  runButton.textContent = "算比值";
  runButton.addEventListener("click", draw);
  parts.controls.appendChild(runButton);

  const addButton = document.createElement("button");
  addButton.textContent = "分母加一项";
  addButton.addEventListener("click", function () {
    spec.denom = (spec.denom || []).concat([10]);
    draw();
  });
  parts.controls.appendChild(addButton);

  const dropButton = document.createElement("button");
  dropButton.textContent = "分母去一项";
  dropButton.addEventListener("click", function () {
    spec.denom = (spec.denom || []).slice(0, -1);
    draw();
  });
  parts.controls.appendChild(dropButton);

  const label = document.createElement("label");
  label.textContent = "等比放大";
  parts.controls.appendChild(label);

  const box = document.createElement("input");
  box.type = "number";
  box.value = "1";
  box.addEventListener("input", function () {
    const parsed = Number(box.value);
    if (parsed >= 1) {
      try {
        const view = render(Object.assign({}, spec, {
          numer: (spec.numer || []).map((item) => item * parsed),
          denom: (spec.denom || []).map((item) => item * parsed)
        }));
        parts.out.textContent = "放大 " + parsed + " 倍后最大位置 " + view.best_at;
      } catch (error) {
        parts.out.textContent = String(error && error.code ? error.code : String(error));
      }
    }
  });
  parts.controls.appendChild(box);

  const readButton = document.createElement("button");
  readButton.textContent = "只看最大位置";
  readButton.addEventListener("click", function () {
    const view = render(spec);
    parts.out.textContent = "最大位置 " + view.best_at + "，最大比值 " + view.best;
  });
  parts.controls.appendChild(readButton);

  draw();
}
