import { html as u, state as g, customElement as M } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as P } from "@umbraco-cms/backoffice/lit-element";
import { UMB_NOTIFICATION_CONTEXT as x } from "@umbraco-cms/backoffice/notification";
import { M as b } from "./sdk.gen-DBpJrjP9.js";
import { n as v, r as R } from "./background-runs-banner.element-DkaRFw3L.js";
var T = Object.defineProperty, E = Object.getOwnPropertyDescriptor, $ = (e) => {
  throw TypeError(e);
}, h = (e, t, a, i) => {
  for (var o = i > 1 ? void 0 : i ? E(t, a) : t, p = e.length - 1, _; p >= 0; p--)
    (_ = e[p]) && (o = (i ? _(t, a, o) : _(o)) || o);
  return i && o && T(t, a, o), o;
}, k = (e, t, a) => t.has(e) || $("Cannot " + a), s = (e, t, a) => (k(e, t, "read from private field"), t.get(e)), f = (e, t, a) => t.has(e) ? $("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), w = (e, t, a, i) => (k(e, t, "write to private field"), t.set(e, a), a), n = (e, t, a) => (k(e, t, "access private method"), a), d, c, l, m, C, S, y;
let r = class extends P {
  constructor() {
    super(), f(this, l), this._runs = [], this._rulesets = [], this._loading = !0, this._background = [], f(this, d), f(this, c), this.consumeContext(x, (e) => {
      w(this, c, e);
    });
  }
  connectedCallback() {
    super.connectedCallback(), n(this, l, m).call(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), clearTimeout(s(this, d));
  }
  render() {
    return this._loading ? u`<mc-background-runs-banner></mc-background-runs-banner><uui-loader></uui-loader>` : this._runs.length === 0 ? u`<mc-background-runs-banner></mc-background-runs-banner>${n(this, l, y).call(this)}
        <uui-box headline="Activity log" data-mark="mc:activity-log">
          <p data-mark="mc:activity-empty">No curation runs yet.</p>
        </uui-box>` : u`<mc-background-runs-banner></mc-background-runs-banner>
      ${n(this, l, y).call(this)}
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
      (e) => u`
              <uui-table-row data-mark="mc:run-row">
                <uui-table-cell>${new Date(e.started).toLocaleString()}</uui-table-cell>
                <uui-table-cell>${n(this, l, C).call(this, e)}</uui-table-cell>
                <uui-table-cell>${e.trigger}</uui-table-cell>
                <uui-table-cell data-mark="mc:run-moved">${e.moved}</uui-table-cell>
                <uui-table-cell>${e.alreadyInPlace}</uui-table-cell>
                <uui-table-cell>${e.failed}</uui-table-cell>
                <uui-table-cell>
                  ${e.moved > 0 && !e.trigger.startsWith("undo:") ? u`<uui-button
                        data-mark="mc:run-undo"
                        compact
                        look="secondary"
                        label="Undo run from ${new Date(e.started).toLocaleString()}"
                        @click=${() => n(this, l, S).call(this, e)}
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
d = /* @__PURE__ */ new WeakMap();
c = /* @__PURE__ */ new WeakMap();
l = /* @__PURE__ */ new WeakSet();
m = async function() {
  try {
    const [e, t, a] = await Promise.all([
      b.getRuns(),
      b.getRulesets(),
      b.getQueueStatus()
    ]);
    this._runs = e.data ?? [], this._rulesets = t.data ?? [], this._background = a.data?.statuses ?? [], clearTimeout(s(this, d)), this._background.some((i) => i.state === "queued" || i.state === "running") && w(this, d, setTimeout(() => n(this, l, m).call(this), 5e3));
  } catch {
    v(s(this, c), "danger", "Could not load the activity log. Check the server log and reload.");
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
    v(s(this, c), "danger", `Undo failed: ${JSON.stringify(t.error ?? "no data")}`);
    return;
  }
  const a = t.data;
  v(
    s(this, c),
    "positive",
    `Undo: ${a.moved} restored, ${a.alreadyInPlace} already in place, ${a.failed} failed.`
  ), await n(this, l, m).call(this);
};
y = function() {
  return this._background.length === 0 ? "" : u`<uui-box headline="Background runs" data-mark="mc:background-runs">
      <uui-table>
        <uui-table-head>
          <uui-table-head-cell>Folder</uui-table-head-cell>
          <uui-table-head-cell>Status</uui-table-head-cell>
          <uui-table-head-cell>Progress</uui-table-head-cell>
          <uui-table-head-cell>Updated</uui-table-head-cell>
        </uui-table-head>
        ${this._background.map(
    (e) => u`<uui-table-row data-mark="mc:background-row">
            <uui-table-cell>${e.name || "—"}</uui-table-cell>
            <uui-table-cell>${e.state}${e.error ? u`: ${e.error}` : ""}</uui-table-cell>
            <uui-table-cell>
              ${e.state === "completed" ? `${e.moved} moved, ${e.alreadyInPlace} in place, ${e.failed} failed` : e.total > 0 ? u`<uui-loader-bar progress=${Math.round(100 * e.processed / e.total)}></uui-loader-bar>
                      ${e.processed} of ${e.total}` : e.state === "running" ? `Planning ${e.imageCount} images…` : `${e.imageCount} images`}
            </uui-table-cell>
            <uui-table-cell>${new Date(e.updated).toLocaleString()}</uui-table-cell>
          </uui-table-row>`
  )}
      </uui-table>
    </uui-box>`;
};
r.styles = [R];
h([
  g()
], r.prototype, "_runs", 2);
h([
  g()
], r.prototype, "_rulesets", 2);
h([
  g()
], r.prototype, "_loading", 2);
h([
  g()
], r.prototype, "_background", 2);
r = h([
  M("mc-root-activity-view")
], r);
const D = r;
export {
  r as McRootActivityViewElement,
  D as default
};
//# sourceMappingURL=activity-view.element-gYRPkdk6.js.map
