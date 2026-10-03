import { html as s, state as v, customElement as C } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as k } from "@umbraco-cms/backoffice/lit-element";
import { UMB_NOTIFICATION_CONTEXT as M } from "@umbraco-cms/backoffice/notification";
import { M as p } from "./sdk.gen-BaXox45_.js";
import { n as _, r as R } from "./root-view.styles-zhTrEhZY.js";
var S = Object.defineProperty, E = Object.getOwnPropertyDescriptor, g = (e) => {
  throw TypeError(e);
}, n = (e, t, a, o) => {
  for (var l = o > 1 ? void 0 : o ? E(t, a) : t, d = e.length - 1, h; d >= 0; d--)
    (h = e[d]) && (l = (o ? h(t, a, l) : h(l)) || l);
  return o && l && S(t, a, l), l;
}, b = (e, t, a) => t.has(e) || g("Cannot " + a), m = (e, t, a) => (b(e, t, "read from private field"), a ? a.call(e) : t.get(e)), y = (e, t, a) => t.has(e) ? g("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), O = (e, t, a, o) => (b(e, t, "write to private field"), t.set(e, a), a), c = (e, t, a) => (b(e, t, "access private method"), a), u, r, f, w, $;
let i = class extends k {
  constructor() {
    super(), y(this, r), this._runs = [], this._rulesets = [], this._loading = !0, y(this, u), this.consumeContext(M, (e) => {
      O(this, u, e);
    });
  }
  connectedCallback() {
    super.connectedCallback(), c(this, r, f).call(this);
  }
  render() {
    return this._loading ? s`<uui-loader></uui-loader>` : this._runs.length === 0 ? s`<uui-box headline="Activity log" data-mark="mc:activity-log">
        <p data-mark="mc:activity-empty">No curation runs yet.</p>
      </uui-box>` : s`
      <uui-box headline="Activity log" data-mark="mc:activity-log">
        <uui-table>
          <uui-table-head>
            <uui-table-head-cell>Started</uui-table-head-cell>
            <uui-table-head-cell>Ruleset</uui-table-head-cell>
            <uui-table-head-cell>Trigger</uui-table-head-cell>
            <uui-table-head-cell>Moved</uui-table-head-cell>
            <uui-table-head-cell>In place</uui-table-head-cell>
            <uui-table-head-cell>Failed</uui-table-head-cell>
            <uui-table-head-cell></uui-table-head-cell>
          </uui-table-head>
          ${this._runs.map(
      (e) => s`
              <uui-table-row data-mark="mc:run-row">
                <uui-table-cell>${new Date(e.started).toLocaleString()}</uui-table-cell>
                <uui-table-cell>${c(this, r, w).call(this, e)}</uui-table-cell>
                <uui-table-cell>${e.trigger}</uui-table-cell>
                <uui-table-cell data-mark="mc:run-moved">${e.moved}</uui-table-cell>
                <uui-table-cell>${e.alreadyInPlace}</uui-table-cell>
                <uui-table-cell>${e.failed}</uui-table-cell>
                <uui-table-cell>
                  ${e.moved > 0 && !e.trigger.startsWith("undo:") ? s`<uui-button
                        data-mark="mc:run-undo"
                        compact
                        look="secondary"
                        label="Undo run from ${new Date(e.started).toLocaleString()}"
                        @click=${() => c(this, r, $).call(this, e)}
                        >Undo</uui-button
                      >` : ""}
                </uui-table-cell>
              </uui-table-row>
            `
    )}
        </uui-table>
      </uui-box>
    `;
  }
};
u = /* @__PURE__ */ new WeakMap();
r = /* @__PURE__ */ new WeakSet();
f = async function() {
  try {
    const [e, t] = await Promise.all([p.getRuns(), p.getRulesets()]);
    this._runs = e.data ?? [], this._rulesets = t.data ?? [];
  } catch {
    _(m(this, u), "danger", "Could not load the activity log. Check the server log and reload.");
  } finally {
    this._loading = !1;
  }
};
w = function(e) {
  return this._rulesets.find((t) => t.scopeRootKey === e.scopeFolderKey)?.name ?? "—";
};
$ = async function(e) {
  const t = await p.undoRun({ path: { runKey: e.key } });
  if (t.error || !t.data) {
    _(m(this, u), "danger", `Undo failed: ${JSON.stringify(t.error ?? "no data")}`);
    return;
  }
  const a = t.data;
  _(
    m(this, u),
    "positive",
    `Undo: ${a.moved} restored, ${a.alreadyInPlace} already in place, ${a.failed} failed.`
  ), await c(this, r, f).call(this);
};
i.styles = [R];
n([
  v()
], i.prototype, "_runs", 2);
n([
  v()
], i.prototype, "_rulesets", 2);
n([
  v()
], i.prototype, "_loading", 2);
i = n([
  C("mc-root-activity-view")
], i);
const T = i;
export {
  i as McRootActivityViewElement,
  T as default
};
//# sourceMappingURL=activity-view.element-DjvcFf8t.js.map
