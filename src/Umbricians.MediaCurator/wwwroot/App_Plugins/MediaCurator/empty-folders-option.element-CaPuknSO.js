import { css as u, state as f, customElement as y, html as h } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as v } from "@umbraco-cms/backoffice/lit-element";
const s = (t, e, a) => `${t} ${t === 1 ? e : a}`;
function P(t, e) {
  const a = [`${s(e.moveCount, "image", "images")} in "${t}" and its subfolders will be moved`];
  return e.alreadyInPlaceCount > 0 && a.push(`${e.alreadyInPlaceCount} already in place`), e.skippedCount > 0 && a.push(`${e.skippedCount} skipped`), `${a.join(", ")}.`;
}
function M(t) {
  return t.rulesets.filter((e) => e.moveCount > 0).map((e) => `${e.name}: ${s(e.moveCount, "image", "images")}`);
}
function I(t, e) {
  if (e.alreadyInPlaceCount === 0 && e.skippedCount === 0)
    return `There are no images to curate in "${t}".`;
  const a = [];
  return e.alreadyInPlaceCount > 0 && a.push(`${e.alreadyInPlaceCount} already in place`), e.skippedCount > 0 && a.push(`${e.skippedCount} skipped (no ruleset applies, excluded, or not an image)`), `Nothing to move in "${t}": ${a.join(", ")}.`;
}
function O(t, e = !1) {
  const a = `Curated: ${t.moved} moved, ${t.alreadyInPlace} already in place, ${t.failed} failed.`, n = t.foldersRemoved ?? 0;
  if (n === 0) return a;
  const r = e ? "deleted permanently" : "moved to the Recycle Bin";
  return `${a} ${s(n, "empty folder", "empty folders")} ${r}.`;
}
function x(t) {
  return t === 0 ? "Any sub-folders the run leaves empty will be removed." : `${s(t, "empty sub-folder", "empty sub-folders")} will also be removed, plus any the run leaves empty.`;
}
function D(t, e, a) {
  const n = e.alreadyInPlaceCount > 0 ? ` (${e.alreadyInPlaceCount} already in place)` : "";
  return `No images in "${t}" need moving${n}. ${s(a, "empty sub-folder", "empty sub-folders")} will be removed.`;
}
function R(t, e) {
  return t > 0 ? `Move ${t}` : `Remove ${s(e, "empty folder", "empty folders")}`;
}
function $(t) {
  return t ? "Empty sub-folders left after the run will be deleted permanently. Undo recreates them by name." : "Empty sub-folders left after the run will be moved to the Recycle Bin.";
}
var _ = Object.defineProperty, g = Object.getOwnPropertyDescriptor, d = (t) => {
  throw TypeError(t);
}, m = (t, e, a, n) => {
  for (var r = n > 1 ? void 0 : n ? g(e, a) : e, o = t.length - 1, i; o >= 0; o--)
    (i = t[o]) && (r = (n ? i(e, a, r) : i(r)) || r);
  return n && r && _(e, a, r), r;
}, b = (t, e, a) => e.has(t) || d("Cannot " + a), C = (t, e, a) => e.has(t) ? d("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), k = (t, e, a) => (b(t, e, "access private method"), a), p, c;
let l = class extends v {
  constructor() {
    super(...arguments), C(this, p), this._permanent = !1;
  }
  get permanentlyDelete() {
    return this._permanent;
  }
  render() {
    return h`
      <uui-checkbox
        data-mark="mc:delete-empty-folders"
        label="Delete empty folders permanently"
        .checked=${this._permanent}
        @change=${k(this, p, c)}
      ></uui-checkbox>
      <small>${$(this._permanent)}</small>
    `;
  }
};
p = /* @__PURE__ */ new WeakSet();
c = function(t) {
  this._permanent = t.target.checked, this.dispatchEvent(new Event("change"));
};
l.styles = [
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
m([
  f()
], l.prototype, "_permanent", 2);
l = m([
  y("mc-empty-folders-option")
], l);
export {
  P as a,
  D as b,
  R as c,
  O as d,
  x as e,
  I as n,
  M as r
};
//# sourceMappingURL=empty-folders-option.element-CaPuknSO.js.map
