import { M as p } from "./sdk.gen-DBpJrjP9.js";
import { css as f, state as y, customElement as h, html as v } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as g } from "@umbraco-cms/backoffice/lit-element";
const s = (t, e, a) => `${t} ${t === 1 ? e : a}`;
function O(t, e) {
  const a = [`${s(e.moveCount, "image", "images")} in "${t}" and its subfolders will be moved`];
  return e.alreadyInPlaceCount > 0 && a.push(`${e.alreadyInPlaceCount} already in place`), e.skippedCount > 0 && a.push(`${e.skippedCount} skipped`), `${a.join(", ")}.`;
}
function x(t) {
  return t.rulesets.filter((e) => e.moveCount > 0).map((e) => `${e.name}: ${s(e.moveCount, "image", "images")}`);
}
function T(t, e) {
  if (e.alreadyInPlaceCount === 0 && e.skippedCount === 0)
    return `There are no images to curate in "${t}".`;
  const a = [];
  return e.alreadyInPlaceCount > 0 && a.push(`${e.alreadyInPlaceCount} already in place`), e.skippedCount > 0 && a.push(`${e.skippedCount} skipped (no ruleset applies, excluded, or not an image)`), `Nothing to move in "${t}": ${a.join(", ")}.`;
}
function B(t, e = !1) {
  const a = `Curated: ${t.moved} moved, ${t.alreadyInPlace} already in place, ${t.failed} failed.`, n = t.foldersRemoved ?? 0;
  if (n === 0) return a;
  const r = e ? "deleted permanently" : "moved to the Recycle Bin";
  return `${a} ${s(n, "empty folder", "empty folders")} ${r}.`;
}
function D(t) {
  return t === 0 ? "Any sub-folders the run leaves empty will be removed." : `${s(t, "empty sub-folder", "empty sub-folders")} will also be removed, plus any the run leaves empty.`;
}
function F(t, e, a) {
  const n = e.alreadyInPlaceCount > 0 ? ` (${e.alreadyInPlaceCount} already in place)` : "";
  return `No images in "${t}" need moving${n}. ${s(a, "empty sub-folder", "empty sub-folders")} will be removed.`;
}
function L(t, e) {
  return t > 0 ? `Move ${t}` : `Remove ${s(e, "empty folder", "empty folders")}`;
}
function $(t) {
  return t ? "Empty sub-folders left after the run will be deleted permanently. Undo recreates them by name." : "Empty sub-folders left after the run will be moved to the Recycle Bin.";
}
function S(t, e, a) {
  return `"${t}" and its subfolders hold ${s(e, "image", "images")}. Folders with more than ${a} images are curated in the background, so you can carry on working while it runs.`;
}
function A(t, e) {
  return e.state === "queued" ? `"${t}" is queued and will start in a few seconds.` : e.total === 0 ? `Working out where the images in "${t}" belong…` : `Curating "${t}": ${e.processed} of ${s(e.total, "image", "images")} moved.`;
}
function q(t, e, a = !1) {
  if (e.state === "failed") return `Curating "${t}" stopped: ${e.error ?? "unknown error"}. The Activity log shows what moved, and can undo it.`;
  const n = `Curated "${t}" in the background: ${e.moved} moved, ${e.alreadyInPlace} already in place, ${e.failed} failed.`;
  if (e.foldersRemoved === 0) return n;
  const r = a ? "deleted permanently" : "moved to the Recycle Bin";
  return `${n} ${s(e.foldersRemoved, "empty folder", "empty folders")} ${r}.`;
}
const b = 3e3, w = (t) => t?.state === "queued" || t?.state === "running";
async function z(t, e) {
  for (; ; ) {
    await new Promise((r) => setTimeout(r, b));
    const { data: a, response: n } = await p.getQueueItemStatus({ path: { mediaKey: t } });
    if (n?.status === 404) return null;
    if (a) {
      if (!w(a)) return a;
      e(a);
    }
  }
}
var _ = Object.defineProperty, C = Object.getOwnPropertyDescriptor, u = (t) => {
  throw TypeError(t);
}, c = (t, e, a, n) => {
  for (var r = n > 1 ? void 0 : n ? C(e, a) : e, i = t.length - 1, l; i >= 0; i--)
    (l = t[i]) && (r = (n ? l(e, a, r) : l(r)) || r);
  return n && r && _(e, a, r), r;
}, k = (t, e, a) => e.has(t) || u("Cannot " + a), P = (t, e, a) => e.has(t) ? u("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), M = (t, e, a) => (k(t, e, "access private method"), a), d, m;
let o = class extends g {
  constructor() {
    super(...arguments), P(this, d), this._permanent = !1;
  }
  get permanentlyDelete() {
    return this._permanent;
  }
  render() {
    return v`
      <uui-checkbox
        data-mark="mc:delete-empty-folders"
        label="Delete empty folders permanently"
        .checked=${this._permanent}
        @change=${M(this, d, m)}
      ></uui-checkbox>
      <small>${$(this._permanent)}</small>
    `;
  }
};
d = /* @__PURE__ */ new WeakSet();
m = function(t) {
  this._permanent = t.target.checked, this.dispatchEvent(new Event("change"));
};
o.styles = [
  f`
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
  y()
], o.prototype, "_permanent", 2);
o = c([
  h("mc-empty-folders-option")
], o);
export {
  O as a,
  F as b,
  L as c,
  B as d,
  D as e,
  S as f,
  A as g,
  q as h,
  w as i,
  T as n,
  x as r,
  z as w
};
//# sourceMappingURL=empty-folders-option.element-DqAqCN9I.js.map
