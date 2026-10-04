import { html as i, state as p, customElement as M } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as x } from "@umbraco-cms/backoffice/lit-element";
import { UMB_NOTIFICATION_CONTEXT as R } from "@umbraco-cms/backoffice/notification";
import { M as b } from "./sdk.gen-DBpJrjP9.js";
import { n as v, r as T } from "./root-view.styles-zhTrEhZY.js";
var E = Object.defineProperty, O = Object.getOwnPropertyDescriptor, k = (e) => {
  throw TypeError(e);
}, h = (e, t, a, u) => {
  for (var o = u > 1 ? void 0 : u ? O(t, a) : t, _ = e.length - 1, f; _ >= 0; _--)
    (f = e[_]) && (o = (u ? f(t, a, o) : f(o)) || o);
  return u && o && E(t, a, o), o;
}, $ = (e, t, a) => t.has(e) || k("Cannot " + a), d = (e, t, a) => ($(e, t, "read from private field"), t.get(e)), g = (e, t, a) => t.has(e) ? k("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), w = (e, t, a, u) => ($(e, t, "write to private field"), t.set(e, a), a), c = (e, t, a) => ($(e, t, "access private method"), a), n, s, l, m, C, S, y;
let r = class extends x {
  constructor() {
    super(), g(this, l), this._runs = [], this._rulesets = [], this._loading = !0, this._background = [], g(this, n), g(this, s), this.consumeContext(R, (e) => {
      w(this, s, e);
    });
  }
  connectedCallback() {
    super.connectedCallback(), c(this, l, m).call(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), clearTimeout(d(this, n));
  }
  render() {
    return this._loading ? i`<uui-loader></uui-loader>` : this._runs.length === 0 ? i`${c(this, l, y).call(this)}
        <uui-box headline="Activity log" data-mark="mc:activity-log">
          <p data-mark="mc:activity-empty">No curation runs yet.</p>
        </uui-box>` : i`
      ${c(this, l, y).call(this)}
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
      (e) => i`
              <uui-table-row data-mark="mc:run-row">
                <uui-table-cell>${new Date(e.started).toLocaleString()}</uui-table-cell>
                <uui-table-cell>${c(this, l, C).call(this, e)}</uui-table-cell>
                <uui-table-cell>${e.trigger}</uui-table-cell>
                <uui-table-cell data-mark="mc:run-moved">${e.moved}</uui-table-cell>
                <uui-table-cell>${e.alreadyInPlace}</uui-table-cell>
                <uui-table-cell>${e.failed}</uui-table-cell>
                <uui-table-cell>
                  ${e.moved > 0 && !e.trigger.startsWith("undo:") ? i`<uui-button
                        data-mark="mc:run-undo"
                        compact
                        look="secondary"
                        label="Undo run from ${new Date(e.started).toLocaleString()}"
                        @click=${() => c(this, l, S).call(this, e)}
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
n = /* @__PURE__ */ new WeakMap();
s = /* @__PURE__ */ new WeakMap();
l = /* @__PURE__ */ new WeakSet();
m = async function() {
  try {
    const [e, t, a] = await Promise.all([
      b.getRuns(),
      b.getRulesets(),
      b.getQueueStatus()
    ]);
    this._runs = e.data ?? [], this._rulesets = t.data ?? [], this._background = a.data?.statuses ?? [], clearTimeout(d(this, n)), this._background.some((u) => u.state === "queued" || u.state === "running") && w(this, n, setTimeout(() => c(this, l, m).call(this), 5e3));
  } catch {
    v(d(this, s), "danger", "Could not load the activity log. Check the server log and reload.");
  } finally {
    this._loading = !1;
  }
};
C = function(e) {
  return this._rulesets.find((t) => t.scopeRootKey === e.scopeFolderKey)?.name ?? "—";
};
S = async function(e) {
  const t = await b.undoRun({ path: { runKey: e.key } });
  if (t.error || !t.data) {
    v(d(this, s), "danger", `Undo failed: ${JSON.stringify(t.error ?? "no data")}`);
    return;
  }
  const a = t.data;
  v(
    d(this, s),
    "positive",
    `Undo: ${a.moved} restored, ${a.alreadyInPlace} already in place, ${a.failed} failed.`
  ), await c(this, l, m).call(this);
};
y = function() {
  return this._background.length === 0 ? "" : i`<uui-box headline="Background runs" data-mark="mc:background-runs">
      <uui-table>
        <uui-table-head>
          <uui-table-head-cell>Folder</uui-table-head-cell>
          <uui-table-head-cell>Status</uui-table-head-cell>
          <uui-table-head-cell>Progress</uui-table-head-cell>
          <uui-table-head-cell>Updated</uui-table-head-cell>
        </uui-table-head>
        ${this._background.map(
    (e) => i`<uui-table-row data-mark="mc:background-row">
            <uui-table-cell>${e.name || "—"}</uui-table-cell>
            <uui-table-cell>${e.state}${e.error ? i`: ${e.error}` : ""}</uui-table-cell>
            <uui-table-cell>
              ${e.state === "completed" ? `${e.moved} moved, ${e.failed} failed` : e.total > 0 ? i`<uui-loader-bar progress=${Math.round(100 * e.processed / e.total)}></uui-loader-bar>
                      ${e.processed} of ${e.total}` : `${e.imageCount} images`}
            </uui-table-cell>
            <uui-table-cell>${new Date(e.updated).toLocaleString()}</uui-table-cell>
          </uui-table-row>`
  )}
      </uui-table>
    </uui-box>`;
};
r.styles = [T];
h([
  p()
], r.prototype, "_runs", 2);
h([
  p()
], r.prototype, "_rulesets", 2);
h([
  p()
], r.prototype, "_loading", 2);
h([
  p()
], r.prototype, "_background", 2);
r = h([
  M("mc-root-activity-view")
], r);
const D = r;
export {
  r as McRootActivityViewElement,
  D as default
};
//# sourceMappingURL=activity-view.element-BoGaSNvQ.js.map
