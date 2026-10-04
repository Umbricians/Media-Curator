import { css as u, state as f, customElement as h, html as y } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as v } from "@umbraco-cms/backoffice/lit-element";
const o = (t, e, a) => `${t} ${t === 1 ? e : a}`;
function E(t, e) {
  const a = [`${o(e.moveCount, "image", "images")} in "${t}" and its subfolders will be moved`];
  return e.alreadyInPlaceCount > 0 && a.push(`${e.alreadyInPlaceCount} already in place`), e.skippedCount > 0 && a.push(`${e.skippedCount} skipped`), `${a.join(", ")}.`;
}
function M(t) {
  return t.rulesets.filter((e) => e.moveCount > 0).map((e) => `${e.name}: ${o(e.moveCount, "image", "images")}`);
}
function I(t, e) {
  if (e.alreadyInPlaceCount === 0 && e.skippedCount === 0)
    return `There are no images to curate in "${t}".`;
  const a = [];
  return e.alreadyInPlaceCount > 0 && a.push(`${e.alreadyInPlaceCount} already in place`), e.skippedCount > 0 && a.push(`${e.skippedCount} skipped (no ruleset applies, excluded, or not an image)`), `Nothing to move in "${t}": ${a.join(", ")}.`;
}
function R(t, e = !1) {
  const a = `Curated: ${t.moved} moved, ${t.alreadyInPlace} already in place, ${t.failed} failed.`, r = t.foldersRemoved ?? 0;
  if (r === 0) return a;
  const n = e ? "deleted permanently" : "moved to the Recycle Bin";
  return `${a} ${o(r, "empty folder", "empty folders")} ${n}.`;
}
function O(t) {
  return t === 0 ? "Any sub-folders the run leaves empty will be removed." : `${o(t, "empty sub-folder", "empty sub-folders")} will also be removed, plus any the run leaves empty.`;
}
function x(t, e, a) {
  const r = e.alreadyInPlaceCount > 0 ? ` (${e.alreadyInPlaceCount} already in place)` : "";
  return `No images in "${t}" need moving${r}. ${o(a, "empty sub-folder", "empty sub-folders")} will be removed.`;
}
function D(t, e) {
  return t > 0 ? `Move ${t}` : `Remove ${o(e, "empty folder", "empty folders")}`;
}
function $(t) {
  return t ? "Empty sub-folders left after the run will be deleted permanently. Undo recreates them by name." : "Empty sub-folders left after the run will be moved to the Recycle Bin.";
}
function T(t, e, a) {
  return `"${t}" and its subfolders hold ${o(e, "image", "images")}. Folders with more than ${a} images are curated in the background, so you can carry on working while it runs.`;
}
function B(t, e) {
  return e.state === "queued" ? `"${t}" is queued and will start in a few seconds.` : e.total === 0 ? `Working out where the images in "${t}" belong…` : `Curating "${t}": ${e.processed} of ${o(e.total, "image", "images")} moved.`;
}
function F(t, e, a = !1) {
  if (e.state === "failed") return `Curating "${t}" stopped: ${e.error ?? "unknown error"}. The Activity log shows what moved, and can undo it.`;
  const r = `Curated "${t}" in the background: ${e.moved} moved, ${e.failed} failed.`;
  if (e.foldersRemoved === 0) return r;
  const n = a ? "deleted permanently" : "moved to the Recycle Bin";
  return `${r} ${o(e.foldersRemoved, "empty folder", "empty folders")} ${n}.`;
}
var g = Object.defineProperty, b = Object.getOwnPropertyDescriptor, p = (t) => {
  throw TypeError(t);
}, c = (t, e, a, r) => {
  for (var n = r > 1 ? void 0 : r ? b(e, a) : e, l = t.length - 1, i; l >= 0; l--)
    (i = t[l]) && (n = (r ? i(e, a, n) : i(n)) || n);
  return r && n && g(e, a, n), n;
}, w = (t, e, a) => e.has(t) || p("Cannot " + a), _ = (t, e, a) => e.has(t) ? p("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), C = (t, e, a) => (w(t, e, "access private method"), a), d, m;
let s = class extends v {
  constructor() {
    super(...arguments), _(this, d), this._permanent = !1;
  }
  get permanentlyDelete() {
    return this._permanent;
  }
  render() {
    return y`
      <uui-checkbox
        data-mark="mc:delete-empty-folders"
        label="Delete empty folders permanently"
        .checked=${this._permanent}
        @change=${C(this, d, m)}
      ></uui-checkbox>
      <small>${$(this._permanent)}</small>
    `;
  }
};
d = /* @__PURE__ */ new WeakSet();
m = function(t) {
  this._permanent = t.target.checked, this.dispatchEvent(new Event("change"));
};
s.styles = [
  u`
      :host {
        display: block;
      }
      small {
        display: block;
        margin: var(--uui-size-space-1) 0 0 calc(var(--uui-size-space-5) + var(--uui-size-space-2));
        color: var(--uui-color-text-alt);
      }
    `
];
c([
  f()
], s.prototype, "_permanent", 2);
s = c([
  h("mc-empty-folders-option")
], s);
export {
  E as a,
  x as b,
  D as c,
  R as d,
  O as e,
  T as f,
  B as g,
  F as h,
  I as n,
  M as r
};
//# sourceMappingURL=empty-folders-option.element-CfdlwhLM.js.map
