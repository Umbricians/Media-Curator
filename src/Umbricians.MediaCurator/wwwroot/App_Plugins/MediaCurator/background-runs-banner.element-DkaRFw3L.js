import { css as h, state as f, customElement as b, nothing as y, html as i } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as k } from "@umbraco-cms/backoffice/lit-element";
import { M as x } from "./sdk.gen-DBpJrjP9.js";
import { g as z, i as C } from "./curate-media.summary-Daao9zsU.js";
function A(e, a, t) {
  e?.peek(a, { data: { message: t } });
}
const D = h`
  :host {
    display: block;
    padding: var(--uui-size-layout-1);
  }
  .form {
    display: grid;
    grid-template-columns: 180px 1fr;
    gap: var(--uui-size-space-3) var(--uui-size-space-5);
    align-items: center;
    margin-bottom: var(--uui-size-space-5);
  }
  .actions {
    display: flex;
    gap: var(--uui-size-space-3);
    justify-content: flex-end;
    margin-top: var(--uui-size-space-5);
  }
`;
var w = Object.defineProperty, M = Object.getOwnPropertyDescriptor, m = (e) => {
  throw TypeError(e);
}, _ = (e, a, t, s) => {
  for (var r = s > 1 ? void 0 : s ? M(a, t) : a, c = e.length - 1, d; c >= 0; c--)
    (d = e[c]) && (r = (s ? d(a, t, r) : d(r)) || r);
  return s && r && w(a, t, r), r;
}, p = (e, a, t) => a.has(e) || m("Cannot " + t), E = (e, a, t) => (p(e, a, "read from private field"), a.get(e)), v = (e, a, t) => a.has(e) ? m("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(e) : a.set(e, t), S = (e, a, t, s) => (p(e, a, "write to private field"), a.set(e, t), t), g = (e, a, t) => (p(e, a, "access private method"), t), n, o, l;
const P = 3e3, L = 15e3;
let u = class extends k {
  constructor() {
    super(...arguments), v(this, o), this._runs = [], v(this, n);
  }
  connectedCallback() {
    super.connectedCallback(), g(this, o, l).call(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), clearTimeout(E(this, n));
  }
  render() {
    return this._runs.length === 0 ? y : i`${this._runs.map(
      (e) => i`<div class="run" data-mark="mc:background-banner">
        <uui-icon name="icon-time"></uui-icon>
        <div class="text">
          <span>${z(e.name || "a folder", e)}</span>
          ${e.total > 0 ? i`<uui-loader-bar progress=${Math.round(100 * e.processed / e.total)}></uui-loader-bar>` : i`<uui-loader-bar></uui-loader-bar>`}
        </div>
      </div>`
    )}`;
  }
};
n = /* @__PURE__ */ new WeakMap();
o = /* @__PURE__ */ new WeakSet();
l = async function() {
  try {
    const { data: e } = await x.getQueueStatus();
    this._runs = (e?.statuses ?? []).filter(C);
  } catch {
  }
  this.isConnected && S(this, n, setTimeout(() => {
    g(this, o, l).call(this);
  }, this._runs.length > 0 ? P : L));
};
u.styles = h`
    :host {
      display: block;
    }
    .run {
      display: flex;
      align-items: center;
      gap: var(--uui-size-space-4);
      padding: var(--uui-size-space-4) var(--uui-size-space-5);
      margin-bottom: var(--uui-size-layout-1);
      border-radius: var(--uui-border-radius);
      background: var(--uui-color-surface);
      border-left: 4px solid var(--uui-color-current);
      box-shadow: var(--uui-shadow-depth-1);
    }
    .text {
      flex: 1;
      display: grid;
      gap: var(--uui-size-space-2);
    }
  `;
_([
  f()
], u.prototype, "_runs", 2);
u = _([
  b("mc-background-runs-banner")
], u);
export {
  A as n,
  D as r
};
//# sourceMappingURL=background-runs-banner.element-DkaRFw3L.js.map
