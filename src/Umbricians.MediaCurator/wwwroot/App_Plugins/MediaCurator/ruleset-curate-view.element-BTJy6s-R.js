import { html as o, nothing as f, css as T, state as m, customElement as U } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as L } from "@umbraco-cms/backoffice/lit-element";
import { UMB_NOTIFICATION_CONTEXT as W } from "@umbraco-cms/backoffice/notification";
import { UmbMediaItemRepository as A } from "@umbraco-cms/backoffice/media";
import { umbConfirmModal as B } from "@umbraco-cms/backoffice/modal";
import { M as p } from "./sdk.gen-DBpJrjP9.js";
import { d as J } from "./bundle.manifests-BGBdPeL-.js";
import { M as Y } from "./ruleset-workspace.context-token-CizKWrw5.js";
import { i as q, w as z, h as V, g as G, f as K, e as H, d as M } from "./empty-folders-option.element-DqAqCN9I.js";
var X = Object.defineProperty, Q = Object.getOwnPropertyDescriptor, R = (e) => {
  throw TypeError(e);
}, d = (e, t, a, u) => {
  for (var h = u > 1 ? void 0 : u ? Q(t, a) : t, $ = e.length - 1, k; $ >= 0; $--)
    (k = e[$]) && (h = (u ? k(t, a, h) : k(h)) || h);
  return u && h && X(t, a, h), h;
}, C = (e, t, a) => t.has(e) || R("Cannot " + a), c = (e, t, a) => (C(e, t, "read from private field"), t.get(e)), _ = (e, t, a) => t.has(e) ? R("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), g = (e, t, a, u) => (C(e, t, "write to private field"), t.set(e, a), a), s = (e, t, a) => (C(e, t, "access private method"), a), n, b, v, i, r, y, x, S, w, I, N, E, D, O, P;
const F = (e, t, a) => `${e} ${e === 1 ? t : a}`;
let l = class extends L {
  constructor() {
    super(), _(this, i), this._runs = [], this._busy = !1, this._scopeName = "this folder", _(this, n, !1), _(this, b), _(this, v), this.consumeContext(W, (e) => g(this, v, e)), this.consumeContext(Y, (e) => {
      g(this, b, e), e && this.observe(
        e.persistedData,
        (t) => {
          const a = t?.scopeRootKey && t.scopeRootKey !== J ? t.scopeRootKey : void 0;
          a !== this._scopeFolderKey && (this._scopeFolderKey = a, this._plan = void 0, this._count = void 0, this._background = void 0, s(this, i, y).call(this), s(this, i, x).call(this));
        },
        "_persistedData"
      );
    });
  }
  render() {
    return this._scopeFolderKey ? o`${this._count?.runsInBackground ? s(this, i, D).call(this) : s(this, i, O).call(this)} ${s(this, i, P).call(this)}` : o`<uui-box headline="Curate">
        <p data-mark="mc:curate-no-scope">Choose a scope folder on the Settings tab and save the ruleset before curating.</p>
      </uui-box>`;
  }
};
n = /* @__PURE__ */ new WeakMap();
b = /* @__PURE__ */ new WeakMap();
v = /* @__PURE__ */ new WeakMap();
i = /* @__PURE__ */ new WeakSet();
r = function(e, t) {
  c(this, v)?.peek(e, { data: { message: t } });
};
y = async function() {
  if (!this._scopeFolderKey) {
    this._runs = [];
    return;
  }
  const { data: e } = await p.getRuns();
  this._runs = (e ?? []).filter((t) => t.scopeFolderKey === this._scopeFolderKey);
};
x = async function() {
  const e = this._scopeFolderKey;
  if (!e) return;
  const [{ data: t }, { data: a }, { data: u }] = await Promise.all([
    p.countMediaCuration({ path: { mediaKey: e } }),
    p.getQueueItemStatus({ path: { mediaKey: e } }),
    new A(this).requestItems([e])
  ]);
  e === this._scopeFolderKey && (this._count = t, this._scopeName = u?.[0]?.name ?? "this folder", a && q(a) && s(this, i, w).call(this, a));
};
S = async function() {
  const e = this._scopeFolderKey, t = this._count;
  if (!e || !t) return;
  c(this, b)?.getHasUnpersistedChanges() && s(this, i, r).call(this, "warning", "You have unsaved changes. Curation uses the last saved version of this ruleset.");
  try {
    await B(this, {
      headline: "Curate",
      content: o`<p>${K(this._scopeName, t.imageCount, t.threshold)}</p>
          <p>You can undo the run below, or from Settings › Media Curator › Activity log.</p>`,
      confirmLabel: "Curate in the background",
      color: "positive"
    });
  } catch {
    return;
  }
  this._busy = !0;
  const a = await p.executeCuration({
    body: { scopeFolderKey: e, recursive: !0, permanentlyDeleteEmptyFolders: c(this, n) }
  });
  if (this._busy = !1, a.error || !a.data) {
    s(this, i, r).call(this, "danger", `Curation failed: ${JSON.stringify(a.error ?? "no data")}`);
    return;
  }
  if (!a.data.queued) {
    s(this, i, r).call(this, "positive", M(a.data, c(this, n))), await s(this, i, y).call(this);
    return;
  }
  await s(this, i, w).call(this, {
    scopeFolderKey: e,
    state: "queued",
    processed: 0,
    total: 0,
    imageCount: t.imageCount,
    moved: 0,
    alreadyInPlace: 0,
    failed: 0,
    foldersRemoved: 0,
    runKeys: [],
    changedFolderKeys: [],
    updated: (/* @__PURE__ */ new Date()).toISOString()
  });
};
w = async function(e) {
  const t = e.scopeFolderKey;
  this._background = e;
  const a = await z(t, (u) => {
    t === this._scopeFolderKey && (this._background = u);
  });
  if (t === this._scopeFolderKey) {
    if (this._background = void 0, !a) {
      s(this, i, r).call(this, "warning", `Lost track of the run for "${this._scopeName}" (the site may have restarted). Check the Activity log.`);
      return;
    }
    s(this, i, r).call(this, a.state === "completed" && a.failed === 0 ? "positive" : "warning", V(this._scopeName, a, c(this, n))), await s(this, i, y).call(this);
  }
};
I = async function() {
  if (!this._scopeFolderKey) return;
  c(this, b)?.getHasUnpersistedChanges() && s(this, i, r).call(this, "warning", "You have unsaved changes. The dry run uses the last saved version of this ruleset."), this._busy = !0;
  const e = await p.planCuration({
    body: { scopeFolderKey: this._scopeFolderKey, recursive: !0, permanentlyDeleteEmptyFolders: !1 }
  });
  if (this._busy = !1, e.error || !e.data) {
    s(this, i, r).call(this, "danger", `Could not plan: ${JSON.stringify(e.error ?? "no data")}`);
    return;
  }
  this._plan = e.data;
};
N = async function() {
  if (!this._scopeFolderKey) return;
  this._busy = !0;
  const e = await p.executeCuration({
    body: {
      scopeFolderKey: this._scopeFolderKey,
      recursive: !0,
      permanentlyDeleteEmptyFolders: c(this, n)
    }
  });
  if (this._busy = !1, e.error || !e.data) {
    s(this, i, r).call(this, "danger", `Curation failed: ${JSON.stringify(e.error ?? "no data")}`);
    return;
  }
  s(this, i, r).call(this, "positive", M(e.data, c(this, n))), this._plan = void 0, await s(this, i, y).call(this);
};
E = async function(e) {
  const t = await p.undoRun({ path: { runKey: e.key } });
  if (t.error || !t.data) {
    s(this, i, r).call(this, "danger", `Undo failed: ${JSON.stringify(t.error ?? "no data")}`);
    return;
  }
  const a = t.data;
  s(this, i, r).call(this, "positive", `Undo: ${a.moved} restored, ${a.alreadyInPlace} already in place, ${a.failed} failed.`), await s(this, i, y).call(this);
};
D = function() {
  const e = this._count, t = this._background;
  return o`
      <uui-box headline="Curate" data-mark="mc:background-curate">
        ${t ? o`<p data-mark="mc:background-progress">${G(this._scopeName, t)}</p>
              ${t.total > 0 ? o`<uui-loader-bar progress=${Math.round(100 * t.processed / t.total)}></uui-loader-bar>` : o`<uui-loader-bar></uui-loader-bar>`}` : o`<p>${K(this._scopeName, e.imageCount, e.threshold)}</p>
              <mc-empty-folders-option
                @change=${(a) => g(this, n, a.target.permanentlyDelete)}
              ></mc-empty-folders-option>
              <div class="actions">
                <uui-button
                  data-mark="mc:background-execute"
                  label="Curate in the background"
                  look="primary"
                  color="positive"
                  ?disabled=${this._busy}
                  @click=${() => s(this, i, S).call(this)}
                ></uui-button>
              </div>`}
      </uui-box>
    `;
};
O = function() {
  const e = this._plan;
  return o`
      <uui-box headline="Dry run" data-mark="mc:plan">
        <uui-button
          slot="header-actions"
          data-mark="mc:dry-run"
          label=${e ? "Run again" : "Run dry run"}
          look=${e ? "secondary" : "primary"}
          ?disabled=${this._busy}
          @click=${() => s(this, i, I).call(this)}
        ></uui-button>
        ${e ? o`
              <p data-mark="mc:plan-summary">
                ${e.moveCount === 0 ? "Nothing would move. Everything is already in place or no rules resolved." : `${e.moveCount} item(s) would move. Nothing has moved yet — review and confirm below.`}
              </p>
              ${(e.moves ?? []).length > 0 ? o`<uui-table>
                    <uui-table-head>
                      <uui-table-head-cell>Item</uui-table-head-cell>
                      <uui-table-head-cell>Target folder</uui-table-head-cell>
                      <uui-table-head-cell>Status</uui-table-head-cell>
                    </uui-table-head>
                    ${(e.moves ?? []).map(
    (t) => o`<uui-table-row data-mark="mc:plan-move">
                        <uui-table-cell>${t.mediaName}</uui-table-cell>
                        <uui-table-cell>${t.targetPath}</uui-table-cell>
                        <uui-table-cell>${t.alreadyInPlace ? "already in place" : "will move"}</uui-table-cell>
                      </uui-table-row>`
  )}
                  </uui-table>` : f}
              ${(e.skippedItems ?? []).length > 0 ? o`<details>
                    <summary>${(e.skippedItems ?? []).length} item(s) skipped</summary>
                    <ul>
                      ${(e.skippedItems ?? []).map((t) => o`<li>${t}</li>`)}
                    </ul>
                  </details>` : f}
              ${e.moveCount > 0 || e.emptyFolderCount > 0 ? o`${e.moveCount > 0 ? o`<p>${H(e.emptyFolderCount)}</p>` : o`<p data-mark="mc:plan-cleanup-only">${F(e.emptyFolderCount, "empty sub-folder", "empty sub-folders")} can be removed.</p>`}
                    <mc-empty-folders-option
                      @change=${(t) => g(this, n, t.target.permanentlyDelete)}
                    ></mc-empty-folders-option>
                    <div class="actions">
                      <uui-button
                        data-mark="mc:plan-execute"
                        label=${e.moveCount > 0 ? `Move ${e.moveCount} item(s)` : `Remove ${F(e.emptyFolderCount, "empty folder", "empty folders")}`}
                        look="primary"
                        color="positive"
                        ?disabled=${this._busy}
                        @click=${() => s(this, i, N).call(this)}
                      ></uui-button>
                    </div>` : f}
            ` : o`<p>See where every item in the scope folder would go, before anything moves.</p>`}
      </uui-box>
    `;
};
P = function() {
  return this._runs.length === 0 ? f : o`
      <uui-box headline="Runs for this folder" data-mark="mc:ruleset-runs">
        <uui-table>
          <uui-table-head>
            <uui-table-head-cell>Started</uui-table-head-cell>
            <uui-table-head-cell>Trigger</uui-table-head-cell>
            <uui-table-head-cell>Moved</uui-table-head-cell>
            <uui-table-head-cell>In place</uui-table-head-cell>
            <uui-table-head-cell>Failed</uui-table-head-cell>
            <uui-table-head-cell></uui-table-head-cell>
          </uui-table-head>
          ${this._runs.map(
    (e) => o`<uui-table-row data-mark="mc:ruleset-run">
              <uui-table-cell>${new Date(e.started).toLocaleString()}</uui-table-cell>
              <uui-table-cell>${e.trigger}</uui-table-cell>
              <uui-table-cell>${e.moved}</uui-table-cell>
              <uui-table-cell>${e.alreadyInPlace}</uui-table-cell>
              <uui-table-cell>${e.failed}</uui-table-cell>
              <uui-table-cell>
                ${e.moved > 0 && !e.trigger.startsWith("undo:") ? o`<uui-button
                      data-mark="mc:run-undo"
                      compact
                      look="secondary"
                      label="Undo run from ${new Date(e.started).toLocaleString()}"
                      @click=${() => s(this, i, E).call(this, e)}
                      >Undo</uui-button
                    >` : f}
              </uui-table-cell>
            </uui-table-row>`
  )}
        </uui-table>
      </uui-box>
    `;
};
l.styles = [
  T`
      :host {
        display: block;
        padding: var(--uui-size-layout-1);
      }
      uui-box + uui-box {
        margin-top: var(--uui-size-layout-1);
      }
      .actions {
        display: flex;
        justify-content: flex-end;
        margin-top: var(--uui-size-space-5);
      }
    `
];
d([
  m()
], l.prototype, "_scopeFolderKey", 2);
d([
  m()
], l.prototype, "_plan", 2);
d([
  m()
], l.prototype, "_runs", 2);
d([
  m()
], l.prototype, "_busy", 2);
d([
  m()
], l.prototype, "_count", 2);
d([
  m()
], l.prototype, "_background", 2);
d([
  m()
], l.prototype, "_scopeName", 2);
l = d([
  U("mc-ruleset-curate-view")
], l);
const le = l;
export {
  l as McRulesetCurateViewElement,
  le as default
};
//# sourceMappingURL=ruleset-curate-view.element-BTJy6s-R.js.map
