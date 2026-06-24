import { LitElement as O, html as u, repeat as A, css as F, property as N, customElement as j, nothing as v, state as $ } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as L } from "@umbraco-cms/backoffice/element-api";
import { UMB_NOTIFICATION_CONTEXT as ge } from "@umbraco-cms/backoffice/notification";
import { umbConfirmModal as ve } from "@umbraco-cms/backoffice/modal";
import { c as h } from "./client.gen-CkijBioZ.js";
function k(t, e, a) {
  const i = (r, n) => r.flatMap((c, o) => {
    if (o !== e[n]) return [c];
    if (n === e.length - 1) {
      const p = a(c);
      return p === null ? [] : [p];
    }
    return [{ ...c, children: i(c.children ?? [], n + 1) }];
  });
  return i(t, 0);
}
function ye(t, e, a) {
  return k(t, e, (i) => ({ ...i, children: [...i.children ?? [], a] }));
}
function fe(t, e) {
  return k(t, e, () => null);
}
function $e(t, e, a) {
  const i = e.slice(0, -1), r = e[e.length - 1], n = (c) => {
    const o = r + a;
    if (o < 0 || o >= c.length) return c;
    const p = [...c];
    return [p[r], p[o]] = [p[o], p[r]], p;
  };
  return i.length === 0 ? n(t) : k(t, i, (c) => ({ ...c, children: n(c.children ?? []) }));
}
function U(t) {
  const e = {};
  for (const a of t.settingsFields ?? [])
    a.defaultValue != null && (e[a.alias] = a.defaultValue);
  return e;
}
function K(t, e) {
  const a = t.settings ?? {}, i = (r, n) => {
    const o = String(a[r] ?? "").split(`
`).find((p) => p.includes("="));
    return o && o.split("=")[1]?.trim() || n;
  };
  switch (t.providerAlias) {
    case "Umbricians.MediaCurator.Date": {
      const r = String(a.format ?? "yyyy/MM"), n = /* @__PURE__ */ new Date();
      return r.split("/").map(
        (c) => c.replace(/yyyy/g, String(n.getFullYear())).replace(/yy/g, String(n.getFullYear()).slice(-2)).replace(/MMMM/g, n.toLocaleString(void 0, { month: "long" })).replace(/MM/g, String(n.getMonth() + 1).padStart(2, "0")).replace(/dd/g, String(n.getDate()).padStart(2, "0"))
      ).join("/");
    }
    case "Umbricians.MediaCurator.Alphabetical":
      return "A";
    case "Umbricians.MediaCurator.Exif":
      return i("mappings", "Nikon");
    case "Umbricians.MediaCurator.AiTag":
      return i("mappings", "people");
    case "Umbricians.MediaCurator.Color":
      return String(a.palette ?? "Red=#FF0000").split(`
`)[0]?.split("=")[0]?.trim() || "Red";
    default:
      return e.find((r) => r.alias === t.providerAlias)?.name ?? "…";
  }
}
var _e = Object.defineProperty, ke = Object.getOwnPropertyDescriptor, J = (t) => {
  throw TypeError(t);
}, x = (t, e, a, i) => {
  for (var r = i > 1 ? void 0 : i ? ke(e, a) : e, n = t.length - 1, c; n >= 0; n--)
    (c = t[n]) && (r = (i ? c(e, a, r) : c(r)) || r);
  return i && r && _e(e, a, r), r;
}, we = (t, e, a) => e.has(t) || J("Cannot " + a), Ce = (t, e, a) => e.has(t) ? J("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), m = (t, e, a) => (we(t, e, "access private method"), a), d, _, R, P, W, V, Y, M, q, B;
let w = class extends L(O) {
  constructor() {
    super(...arguments), Ce(this, d), this.rules = [], this.providers = [], this.scopeName = "Scope";
  }
  render() {
    return u`
      <div class="canvas" data-mark="mc:canvas">
        <div class="scope-node" data-mark="mc:canvas-scope">
          <uui-icon name="icon-folder"></uui-icon>
          <strong>${this.scopeName}</strong>
          <small>scope</small>
        </div>
        ${this.rules.length === 0 ? u`<p class="empty">No rules yet. Each rule node contributes folder levels beneath the scope.</p>` : u`<div class="level">${A(this.rules, (t, e) => e, (t, e) => m(this, d, q).call(this, t, [e], []))}</div>`}
        <uui-button data-mark="mc:canvas-add" look="secondary" label="Add rule" @click=${m(this, d, W)}></uui-button>
      </div>
    `;
  }
};
d = /* @__PURE__ */ new WeakSet();
_ = function(t) {
  this.rules = t, this.dispatchEvent(new CustomEvent("rules-change", { detail: { rules: t }, bubbles: !1 }));
};
R = function(t) {
  return this.providers.find((e) => e.alias === t);
};
P = function() {
  const t = this.providers[0];
  if (t)
    return {
      providerAlias: t.alias,
      settings: U(t),
      fallback: "skip",
      children: []
    };
};
W = function() {
  const t = m(this, d, P).call(this);
  t && m(this, d, _).call(this, [...this.rules, t]);
};
V = function(t) {
  const e = m(this, d, P).call(this);
  e && m(this, d, _).call(this, ye(this.rules, t, e));
};
Y = function(t) {
  m(this, d, _).call(this, fe(this.rules, t));
};
M = function(t, e) {
  m(this, d, _).call(this, $e(this.rules, t, e));
};
q = function(t, e, a) {
  const i = m(this, d, R).call(this, t.providerAlias), r = (i?.requirements ?? []).length > 0, n = e.length > 1, c = (t.children ?? []).length === 0;
  return u`
      <div class="branch">
        ${n ? u`<div class="edge" data-mark="mc:edge">
              ${t.condition ? u`<span class="edge-label" data-mark="mc:edge-condition">when “${t.condition}”</span>` : u`<span class="edge-label edge-label--always">always</span>`}
            </div>` : v}
        <uui-box class="node" data-mark="mc:node">
          <div slot="header" class="node-header">
            <uui-icon name=${i?.icon ?? "icon-box"}></uui-icon>
            <uui-select
              data-mark="mc:node-provider"
              label="Provider"
              .options=${this.providers.map((o) => ({
    name: o.name,
    value: o.alias,
    selected: o.alias === t.providerAlias
  }))}
              @change=${(o) => {
    const p = o.target.value, I = m(this, d, R).call(this, p);
    m(this, d, _).call(this, k(this.rules, e, (be) => ({
      ...be,
      providerAlias: p,
      settings: I ? U(I) : {}
    })));
  }}
            ></uui-select>
            ${r ? u`<uui-tag color="warning" data-mark="mc:node-requirements" title="This provider declares media type property requirements — verify them from the ruleset list.">needs properties</uui-tag>` : v}
          </div>
          <div slot="header-actions" class="node-actions">
            <uui-button compact label="Move up" title="Move up" @click=${() => m(this, d, M).call(this, e, -1)}>↑</uui-button>
            <uui-button compact label="Move down" title="Move down" @click=${() => m(this, d, M).call(this, e, 1)}>↓</uui-button>
            <uui-button compact color="danger" label="Remove rule" title="Remove" @click=${() => m(this, d, Y).call(this, e)}>✕</uui-button>
          </div>

          <div class="node-body">
            ${n ? u`
                  <uui-label>Condition (parent value)</uui-label>
                  <uui-input
                    data-mark="mc:node-condition"
                    label="Condition"
                    placeholder="leave empty for always"
                    .value=${t.condition ?? ""}
                    @input=${(o) => m(this, d, _).call(this, k(this.rules, e, (p) => ({
    ...p,
    condition: o.target.value || void 0
  })))}
                  ></uui-input>
                ` : v}
            ${(i?.settingsFields ?? []).map((o) => m(this, d, B).call(this, t, e, o))}
            <uui-label>If unresolved</uui-label>
            <uui-select
              data-mark="mc:node-fallback"
              label="If unresolved"
              .options=${["skip", "unsorted", "stop"].map((o) => ({
    name: o === "skip" ? "Skip this level" : o === "unsorted" ? "Use 'Unsorted' folder" : "Leave item in place",
    value: o,
    selected: t.fallback === o
  }))}
              @change=${(o) => m(this, d, _).call(this, k(this.rules, e, (p) => ({ ...p, fallback: o.target.value })))}
            ></uui-select>
          </div>

          ${c ? u`<div class="example" data-mark="mc:node-example" title="Example resulting folder path">
                <uui-icon name="icon-folder"></uui-icon> ${[this.scopeName, ...a, K(t, this.providers)].join("/")}
              </div>` : v}

          <uui-button
            class="add-child"
            data-mark="mc:node-add-child"
            compact
            look="secondary"
            label="Add child rule"
            @click=${() => m(this, d, V).call(this, e)}
          ></uui-button>
        </uui-box>
        ${(t.children ?? []).length > 0 ? u`<div class="level level--nested">
              ${A(t.children ?? [], (o, p) => p, (o, p) => m(this, d, q).call(this, o, [...e, p], [...a, K(t, this.providers)]))}
            </div>` : v}
      </div>
    `;
};
B = function(t, e, a) {
  const r = (t.settings ?? {})[a.alias] ?? a.defaultValue ?? "", n = (c) => m(this, d, _).call(this, k(this.rules, e, (o) => ({
    ...o,
    settings: { ...o.settings ?? {}, [a.alias]: c }
  })));
  switch (a.type) {
    case "select":
      return u`
          <uui-label title=${a.description ?? ""}>${a.label}</uui-label>
          <uui-select
            data-mark="mc:setting-${a.alias}"
            label=${a.label}
            .options=${(a.options ?? []).map((c) => ({ name: c.label, value: c.value, selected: c.value === r }))}
            @change=${(c) => n(c.target.value)}
          ></uui-select>
        `;
    case "toggle":
      return u`
          <uui-label title=${a.description ?? ""}>${a.label}</uui-label>
          <uui-toggle
            data-mark="mc:setting-${a.alias}"
            label=${a.label}
            .checked=${r === !0 || r === "true"}
            @change=${(c) => n(c.target.checked)}
          ></uui-toggle>
        `;
    case "number":
      return u`
          <uui-label title=${a.description ?? ""}>${a.label}</uui-label>
          <uui-input
            data-mark="mc:setting-${a.alias}"
            type="number"
            label=${a.label}
            .value=${String(r)}
            @input=${(c) => n(c.target.value)}
          ></uui-input>
        `;
    default:
      return a.alias === "mappings" || a.alias === "palette" ? u`
              <uui-label title=${a.description ?? ""}>${a.label}</uui-label>
              <uui-textarea
                data-mark="mc:setting-${a.alias}"
                label=${a.label}
                .value=${String(r)}
                @input=${(o) => n(o.target.value)}
              ></uui-textarea>
            ` : u`
              <uui-label title=${a.description ?? ""}>${a.label}</uui-label>
              <uui-input
                data-mark="mc:setting-${a.alias}"
                label=${a.label}
                .value=${String(r)}
                @input=${(o) => n(o.target.value)}
              ></uui-input>
            `;
  }
};
w.styles = [
  F`
      :host {
        display: block;
      }
      .canvas {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 0;
      }
      .scope-node {
        display: inline-flex;
        align-items: center;
        gap: var(--uui-size-space-3);
        align-self: flex-start;
        padding: var(--uui-size-space-3) var(--uui-size-space-5);
        background: var(--uui-color-surface-alt);
        border: 1px solid var(--uui-color-border);
        border-radius: var(--uui-border-radius);
      }
      .level {
        margin-left: var(--uui-size-space-6);
        padding-left: var(--uui-size-space-6);
        border-left: 2px solid var(--uui-color-border);
        display: flex;
        flex-direction: column;
        gap: var(--uui-size-space-4);
        padding-top: var(--uui-size-space-4);
        padding-bottom: var(--uui-size-space-4);
      }
      .node {
        max-width: 640px;
      }
      .node-header {
        display: flex;
        align-items: center;
        gap: var(--uui-size-space-3);
      }
      .node-actions {
        display: flex;
        gap: var(--uui-size-space-1);
      }
      .node-body {
        display: grid;
        grid-template-columns: 160px 1fr;
        gap: var(--uui-size-space-2) var(--uui-size-space-4);
        align-items: center;
      }
      .edge {
        margin-left: var(--uui-size-space-6);
      }
      .edge-label {
        font-size: 0.8rem;
        background: var(--uui-color-current, #f5c1bc);
        border-radius: 1em;
        padding: 0 var(--uui-size-space-3);
      }
      .edge-label--always {
        background: var(--uui-color-surface-alt);
        color: var(--uui-color-text-alt);
      }
      .example {
        margin-top: var(--uui-size-space-3);
        font-family: monospace;
        font-size: 0.85rem;
        color: var(--uui-color-positive);
        display: flex;
        align-items: center;
        gap: var(--uui-size-space-2);
      }
      .add-child {
        margin-top: var(--uui-size-space-3);
      }
      .empty {
        color: var(--uui-color-text-alt);
      }
    `
];
x([
  N({ attribute: !1 })
], w.prototype, "rules", 2);
x([
  N({ attribute: !1 })
], w.prototype, "providers", 2);
x([
  N({ attribute: !1 })
], w.prototype, "scopeName", 2);
w = x([
  j("mc-rule-tree")
], w);
class y {
  static getExclusions(e) {
    return (e?.client ?? h).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/curation/exclusions",
      ...e
    });
  }
  static setExclusion(e) {
    return (e.client ?? h).put({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/curation/exclusions/{mediaKey}",
      ...e
    });
  }
  static executeCuration(e) {
    return (e?.client ?? h).post({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/curation/execute",
      ...e,
      headers: {
        "Content-Type": "application/json",
        ...e?.headers
      }
    });
  }
  static planCuration(e) {
    return (e?.client ?? h).post({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/curation/plan",
      ...e,
      headers: {
        "Content-Type": "application/json",
        ...e?.headers
      }
    });
  }
  static getQueueStatus(e) {
    return (e?.client ?? h).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/curation/queue",
      ...e
    });
  }
  static queueCuration(e) {
    return (e?.client ?? h).post({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/curation/queue",
      ...e,
      headers: {
        "Content-Type": "application/json",
        ...e?.headers
      }
    });
  }
  static getRuns(e) {
    return (e?.client ?? h).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/curation/runs",
      ...e
    });
  }
  static getRunItems(e) {
    return (e.client ?? h).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/curation/runs/{runKey}/items",
      ...e
    });
  }
  static undoRun(e) {
    return (e.client ?? h).post({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/curation/runs/{runKey}/undo",
      ...e
    });
  }
  static getProviders(e) {
    return (e?.client ?? h).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/providers",
      ...e
    });
  }
  static applyRequirements(e) {
    return (e?.client ?? h).post({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/requirements/apply",
      ...e,
      headers: {
        "Content-Type": "application/json",
        ...e?.headers
      }
    });
  }
  static checkRequirements(e) {
    return (e.client ?? h).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/requirements/check/{rulesetKey}",
      ...e
    });
  }
  static getRulesets(e) {
    return (e?.client ?? h).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/rulesets",
      ...e
    });
  }
  static saveRuleset(e) {
    return (e?.client ?? h).put({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/rulesets",
      ...e,
      headers: {
        "Content-Type": "application/json",
        ...e?.headers
      }
    });
  }
  static deleteRuleset(e) {
    return (e.client ?? h).delete({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/rulesets/{key}",
      ...e
    });
  }
  static getRulesetByScope(e) {
    return (e.client ?? h).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/rulesets/by-scope/{scopeRootKey}",
      ...e
    });
  }
  static exportRulesets(e) {
    return (e?.client ?? h).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/rulesets/export",
      ...e
    });
  }
  static importRulesets(e) {
    return (e?.client ?? h).post({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/rulesets/import",
      ...e,
      headers: {
        "Content-Type": "application/json",
        ...e?.headers
      }
    });
  }
  static getSettings(e) {
    return (e?.client ?? h).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/settings",
      ...e
    });
  }
  static saveSettings(e) {
    return (e?.client ?? h).put({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/settings",
      ...e,
      headers: {
        "Content-Type": "application/json",
        ...e?.headers
      }
    });
  }
  static reanalyzeImages(e) {
    return (e?.client ?? h).post({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/recognition/reanalyze",
      ...e,
      headers: {
        "Content-Type": "application/json",
        ...e?.headers
      }
    });
  }
}
var ze = Object.defineProperty, xe = Object.getOwnPropertyDescriptor, G = (t) => {
  throw TypeError(t);
}, f = (t, e, a, i) => {
  for (var r = i > 1 ? void 0 : i ? xe(e, a) : e, n = t.length - 1, c; n >= 0; n--)
    (c = t[n]) && (r = (i ? c(e, a, r) : c(r)) || r);
  return i && r && ze(e, a, r), r;
}, T = (t, e, a) => e.has(t) || G("Cannot " + a), Se = (t, e, a) => (T(t, e, "read from private field"), e.get(t)), D = (t, e, a) => e.has(t) ? G("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), Re = (t, e, a, i) => (T(t, e, "write to private field"), e.set(t, a), a), s = (t, e, a) => (T(t, e, "access private method"), a), z, l, C, Q, X, b, H, Z, ee, te, ae, E, S, ie, le, re, se, ue, ne, ce, oe, de, pe, he, me;
let g = class extends L(O) {
  constructor() {
    super(), D(this, l), this._rulesets = [], this._providers = [], this._loading = !0, this._runs = [], this._savingSettings = !1, this._reanalyzeMediaKeys = [], this._reanalyzeResults = [], this._reanalyzing = !1, D(this, z), this.consumeContext(ge, (t) => {
      Re(this, z, t);
    });
  }
  connectedCallback() {
    super.connectedCallback(), s(this, l, C).call(this);
  }
  render() {
    return this._loading ? u`<uui-loader></uui-loader>` : this._plan ? s(this, l, le).call(this) : this._requirements ? s(this, l, re).call(this) : this._editing ? s(this, l, me).call(this) : s(this, l, de).call(this);
  }
};
z = /* @__PURE__ */ new WeakMap();
l = /* @__PURE__ */ new WeakSet();
C = async function() {
  this._loading = !0;
  try {
    const [t, e, a, i] = await Promise.all([
      y.getRulesets(),
      y.getProviders(),
      y.getRuns(),
      y.getSettings()
    ]);
    this._rulesets = t.data ?? [], this._providers = e.data ?? [], this._runs = a.data ?? [], this._settings = i.data ?? { persistImageDescription: !0 };
  } catch {
    s(this, l, b).call(this, "danger", "Could not load Media Curator data. Check the server log and reload.");
  } finally {
    this._loading = !1;
  }
};
Q = async function(t) {
  const e = await y.planCuration({
    body: { scopeFolderKey: t.scopeRootKey, recursive: !0 }
  });
  if (e.error || !e.data) {
    s(this, l, b).call(this, "danger", `Could not plan: ${JSON.stringify(e.error ?? "no data")}`);
    return;
  }
  this._plan = { ruleset: t, plan: e.data };
};
X = async function() {
  const t = this._plan;
  if (!t) return;
  const e = await y.executeCuration({
    body: { scopeFolderKey: t.ruleset.scopeRootKey, recursive: !0 }
  });
  if (e.error || !e.data) {
    s(this, l, b).call(this, "danger", `Curation failed: ${JSON.stringify(e.error ?? "no data")}`);
    return;
  }
  const a = e.data;
  s(this, l, b).call(this, "positive", `Curated: ${a.moved} moved, ${a.alreadyInPlace} already in place, ${a.failed} failed.`), this._plan = void 0, await s(this, l, C).call(this);
};
b = function(t, e) {
  Se(this, z)?.peek(t, { data: { message: e } });
};
H = function() {
  this._editing = {
    key: "00000000-0000-0000-0000-000000000000",
    scopeRootKey: "",
    name: "",
    enabled: !0,
    rules: []
  };
};
Z = function(t) {
  this._editing = structuredClone(t);
};
ee = async function(t) {
  try {
    await ve(this, {
      headline: "Delete ruleset",
      content: `Delete the ruleset "${t.name}"? Media that has already been curated stays where it is.`,
      color: "danger",
      confirmLabel: "Delete"
    });
  } catch {
    return;
  }
  await y.deleteRuleset({ path: { key: t.key } }), s(this, l, b).call(this, "positive", `Deleted "${t.name}".`), await s(this, l, C).call(this);
};
te = async function() {
  const t = this._editing;
  if (!t) return;
  const e = await y.saveRuleset({ body: t });
  if (e.error) {
    s(this, l, b).call(this, "danger", `Could not save: ${JSON.stringify(e.error)}`);
    return;
  }
  s(this, l, b).call(this, "positive", `Saved "${t.name}".`), this._editing = void 0, await s(this, l, C).call(this);
};
ae = function(t) {
  const e = t.target.selection;
  this._editing && e?.length && (this._editing = { ...this._editing, scopeRootKey: e[0] });
};
E = async function(t) {
  const e = await y.checkRequirements({ path: { rulesetKey: t.key } });
  if (!e.data) {
    s(this, l, b).call(this, "danger", "Could not check requirements.");
    return;
  }
  const a = /* @__PURE__ */ new Map();
  for (const i of e.data.items ?? [])
    i.status !== "satisfied" && a.set(s(this, l, S).call(this, i.requirementAlias, i.mediaTypeAlias), "create");
  this._requirements = { ruleset: t, report: e.data, choices: a };
};
S = function(t, e) {
  return `${t}::${e}`;
};
ie = async function() {
  const t = this._requirements;
  if (!t) return;
  const e = [];
  for (const r of t.report.items ?? []) {
    if (r.status === "satisfied") continue;
    const n = t.choices.get(s(this, l, S).call(this, r.requirementAlias, r.mediaTypeAlias));
    !n || n === "decline" || e.push({
      requirementAlias: r.requirementAlias,
      mediaTypeAlias: r.mediaTypeAlias,
      action: n,
      mapToPropertyAlias: n === "map" ? r.candidatePropertyAlias : void 0
    });
  }
  const a = await y.applyRequirements({ body: e });
  if (a.error) {
    s(this, l, b).call(this, "danger", `Could not apply: ${JSON.stringify(a.error)}`);
    return;
  }
  const i = a.data;
  (i.errors ?? []).length > 0 ? s(this, l, b).call(this, "danger", `Some changes failed: ${(i.errors ?? []).join("; ")}`) : s(this, l, b).call(this, "positive", `Provisioned ${(i.createdProperties ?? []).length} propert(y/ies), mapped ${(i.mappedProperties ?? []).length}.`), await s(this, l, E).call(this, t.ruleset);
};
le = function() {
  const { ruleset: t, plan: e } = this._plan;
  return u`
      <uui-box headline="Dry run — ${t.name}" data-mark="mc:plan">
        <p data-mark="mc:plan-summary">
          ${e.moveCount === 0 ? "Nothing would move. Everything is already in place or no rules resolved." : `${e.moveCount} item(s) would move. Nothing has moved yet — review and confirm below.`}
        </p>
        ${(e.moves ?? []).length > 0 ? u`
              <uui-table>
                <uui-table-head>
                  <uui-table-head-cell>Item</uui-table-head-cell>
                  <uui-table-head-cell>Target folder</uui-table-head-cell>
                  <uui-table-head-cell>Status</uui-table-head-cell>
                </uui-table-head>
                ${(e.moves ?? []).map(
    (a) => u`
                    <uui-table-row data-mark="mc:plan-move">
                      <uui-table-cell>${a.mediaName}</uui-table-cell>
                      <uui-table-cell>${a.targetPath}</uui-table-cell>
                      <uui-table-cell>${a.alreadyInPlace ? "already in place" : "will move"}</uui-table-cell>
                    </uui-table-row>
                  `
  )}
              </uui-table>
            ` : v}
        ${(e.skippedItems ?? []).length > 0 ? u`<details>
              <summary>${(e.skippedItems ?? []).length} item(s) skipped</summary>
              <ul>
                ${(e.skippedItems ?? []).map((a) => u`<li>${a}</li>`)}
              </ul>
            </details>` : v}
        <div class="actions">
          <uui-button label="Cancel" look="secondary" @click=${() => this._plan = void 0}></uui-button>
          ${e.moveCount > 0 ? u`<uui-button
                data-mark="mc:plan-execute"
                label="Move ${e.moveCount} item(s)"
                look="primary"
                color="positive"
                @click=${s(this, l, X)}
              ></uui-button>` : v}
        </div>
      </uui-box>
    `;
};
re = function() {
  const { ruleset: t, report: e, choices: a } = this._requirements;
  return u`
      <uui-box headline="Property requirements — ${t.name}" data-mark="mc:requirements">
        ${e.allSatisfied ? u`<p data-mark="mc:requirements-ok">
              All requirements are satisfied. Providers in this ruleset have everything they need.
            </p>` : u`<p>
              The providers in this ruleset need the following media type properties. Nothing is
              changed without your approval — choose what to do per property.
            </p>`}
        <uui-table>
          <uui-table-head>
            <uui-table-head-cell>Property</uui-table-head-cell>
            <uui-table-head-cell>Media type</uui-table-head-cell>
            <uui-table-head-cell>Status</uui-table-head-cell>
            <uui-table-head-cell>Action</uui-table-head-cell>
          </uui-table-head>
          ${(e.items ?? []).map((i) => {
    const r = s(this, l, S).call(this, i.requirementAlias, i.mediaTypeAlias);
    return u`
              <uui-table-row data-mark="mc:requirement-row">
                <uui-table-cell>
                  <strong>${i.requirementName}</strong><br />
                  <small>${i.requirementAlias}${i.mandatory ? " (required)" : " (optional)"}</small>
                </uui-table-cell>
                <uui-table-cell>${i.mediaTypeAlias}</uui-table-cell>
                <uui-table-cell>
                  <uui-tag
                    color=${i.status === "satisfied" ? "positive" : i.status === "partialMatch" ? "warning" : "danger"}
                    data-mark="mc:requirement-status"
                    >${i.status}</uui-tag
                  >
                </uui-table-cell>
                <uui-table-cell>
                  ${i.status === "satisfied" ? u`—` : u`
                        <uui-select
                          data-mark="mc:requirement-action"
                          label="Action"
                          .options=${[
      { name: `Create '${i.requirementAlias}'`, value: "create", selected: a.get(r) === "create" },
      ...i.candidatePropertyAlias ? [{ name: `Map onto '${i.candidatePropertyAlias}'`, value: "map", selected: a.get(r) === "map" }] : [],
      { name: "Decline (provider degraded)", value: "decline", selected: a.get(r) === "decline" }
    ]}
                          @change=${(n) => {
      a.set(r, n.target.value), this.requestUpdate();
    }}
                        ></uui-select>
                      `}
                </uui-table-cell>
              </uui-table-row>
            `;
  })}
        </uui-table>
        <div class="actions">
          <uui-button label="Close" look="secondary" @click=${() => this._requirements = void 0}></uui-button>
          ${e.allSatisfied ? v : u`<uui-button
                data-mark="mc:requirements-apply"
                label="Apply approved changes"
                look="primary"
                color="positive"
                @click=${s(this, l, ie)}
              ></uui-button>`}
        </div>
      </uui-box>
    `;
};
se = async function() {
  if (this._settings) {
    this._savingSettings = !0;
    try {
      const t = await y.saveSettings({ body: this._settings });
      if (t.error || !t.data) {
        s(this, l, b).call(this, "danger", `Could not save settings: ${JSON.stringify(t.error ?? "no data")}`);
        return;
      }
      this._settings = t.data, s(this, l, b).call(this, "positive", "Settings saved.");
    } finally {
      this._savingSettings = !1;
    }
  }
};
ue = function(t) {
  const e = t.target.selection ?? [];
  this._reanalyzeMediaKeys = e, this._reanalyzeResults = [];
};
ne = async function() {
  if (this._reanalyzeMediaKeys.length === 0) {
    s(this, l, b).call(this, "danger", "Choose at least one image to re-analyze.");
    return;
  }
  this._reanalyzing = !0;
  try {
    const t = await y.reanalyzeImages({
      body: { mediaKeys: this._reanalyzeMediaKeys }
    });
    if (t.error || !t.data) {
      s(this, l, b).call(this, "danger", `Re-analyze failed: ${JSON.stringify(t.error ?? "no data")}`);
      return;
    }
    this._reanalyzeResults = t.data.results ?? [];
    const e = this._reanalyzeResults.filter((i) => i.analyzed).length, a = this._reanalyzeResults.length - e;
    a === 0 ? s(this, l, b).call(this, "positive", `Re-analyzed ${e} image(s).`) : s(this, l, b).call(this, "danger", `Re-analyzed ${e} image(s); ${a} could not be analyzed. See results below.`);
  } finally {
    this._reanalyzing = !1;
  }
};
ce = function() {
  return u`
      <uui-box headline="Re-analyze image" data-mark="mc:reanalyze">
        <p>
          Force a fresh AI vision pass on selected images. Cached descriptions and tags are ignored
          and replaced with new results.
        </p>
        <div class="form">
          <uui-label>Images</uui-label>
          <umb-input-media
            data-mark="mc:reanalyze-media"
            .max=${20}
            .selection=${this._reanalyzeMediaKeys}
            @change=${s(this, l, ue)}
          ></umb-input-media>
        </div>
        <div class="actions">
          <uui-button
            data-mark="mc:reanalyze-run"
            label="Re-analyze selected"
            look="primary"
            color="positive"
            .state=${this._reanalyzing ? "waiting" : void 0}
            ?disabled=${this._reanalyzeMediaKeys.length === 0}
            @click=${s(this, l, ne)}
          ></uui-button>
        </div>
        ${this._reanalyzeResults.length > 0 ? u`
              <uui-table>
                <uui-table-head>
                  <uui-table-head-cell>Image</uui-table-head-cell>
                  <uui-table-head-cell>Description</uui-table-head-cell>
                  <uui-table-head-cell>Tags</uui-table-head-cell>
                  <uui-table-head-cell>Code</uui-table-head-cell>
                </uui-table-head>
                ${this._reanalyzeResults.map(
    (t) => u`
                    <uui-table-row data-mark="mc:reanalyze-result">
                      <uui-table-cell>${t.mediaName ?? t.mediaKey}</uui-table-cell>
                      <uui-table-cell>
                        ${t.analyzed ? t.description ?? "—" : u`<em>${t.error ?? "Not analyzed"}</em>`}
                      </uui-table-cell>
                      <uui-table-cell>${(t.tags ?? []).join(", ") || "—"}</uui-table-cell>
                      <uui-table-cell>${t.classificationCode ?? "—"}</uui-table-cell>
                    </uui-table-row>
                  `
  )}
              </uui-table>
            ` : v}
      </uui-box>
    `;
};
oe = function() {
  const t = this._settings;
  return t ? u`
      <uui-box headline="Setup" data-mark="mc:settings">
        <p>
          When AI recognition is enabled, Media Curator can store the image description on each media
          item so classification can run again without re-sending the image to the vision model.
        </p>
        <div class="form">
          <uui-label for="mc-persist-description">Save image description</uui-label>
          <uui-toggle
            id="mc-persist-description"
            data-mark="mc:persist-description"
            label="Save image description"
            .checked=${t.persistImageDescription}
            @change=${(e) => {
    this._settings = {
      ...t,
      persistImageDescription: e.target.checked
    };
  }}
          ></uui-toggle>
        </div>
        <div class="actions">
          <uui-button
            data-mark="mc:settings-save"
            label="Save settings"
            look="primary"
            color="positive"
            .state=${this._savingSettings ? "waiting" : void 0}
            @click=${s(this, l, se)}
          ></uui-button>
        </div>
      </uui-box>
    ` : v;
};
de = function() {
  return u`
      ${s(this, l, oe).call(this)}
      ${s(this, l, ce).call(this)}
      <uui-box headline="Curation rulesets">
        <uui-button
          slot="header-actions"
          look="primary"
          label="Create ruleset"
          @click=${s(this, l, H)}
        ></uui-button>
        ${this._rulesets.length === 0 ? u`<p data-mark="mc:empty">
              No rulesets yet. Create one and attach it to a media folder to start curating.
            </p>` : u`
              <uui-table>
                <uui-table-head>
                  <uui-table-head-cell>Name</uui-table-head-cell>
                  <uui-table-head-cell>Rules</uui-table-head-cell>
                  <uui-table-head-cell>Enabled</uui-table-head-cell>
                  <uui-table-head-cell></uui-table-head-cell>
                </uui-table-head>
                ${A(
    this._rulesets,
    (t) => t.key,
    (t) => u`
                    <uui-table-row data-mark="mc:ruleset-row">
                      <uui-table-cell>${t.name}</uui-table-cell>
                      <uui-table-cell>${t.rules?.length ?? 0}</uui-table-cell>
                      <uui-table-cell>${t.enabled ? "Yes" : "No"}</uui-table-cell>
                      <uui-table-cell>
                        <uui-button
                          label="Edit ${t.name}"
                          look="secondary"
                          @click=${() => s(this, l, Z).call(this, t)}
                        ></uui-button>
                        <uui-button
                          label="Requirements for ${t.name}"
                          look="secondary"
                          @click=${() => s(this, l, E).call(this, t)}
                        ></uui-button>
                        <uui-button
                          label="Curate now ${t.name}"
                          look="primary"
                          @click=${() => s(this, l, Q).call(this, t)}
                        ></uui-button>
                        <uui-button
                          label="Delete ${t.name}"
                          look="secondary"
                          color="danger"
                          @click=${() => s(this, l, ee).call(this, t)}
                        ></uui-button>
                      </uui-table-cell>
                    </uui-table-row>
                  `
  )}
              </uui-table>
            `}
      </uui-box>
      ${s(this, l, he).call(this)}
    `;
};
pe = async function(t) {
  const e = await y.undoRun({ path: { runKey: t.key } });
  if (e.error || !e.data) {
    s(this, l, b).call(this, "danger", `Undo failed: ${JSON.stringify(e.error ?? "no data")}`);
    return;
  }
  const a = e.data;
  s(this, l, b).call(this, "positive", `Undo: ${a.moved} restored, ${a.alreadyInPlace} already in place, ${a.failed} failed.`), await s(this, l, C).call(this);
};
he = function() {
  return this._runs.length === 0 ? v : u`
      <uui-box headline="Activity log" data-mark="mc:activity-log">
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
    (t) => u`
              <uui-table-row data-mark="mc:run-row">
                <uui-table-cell>${new Date(t.started).toLocaleString()}</uui-table-cell>
                <uui-table-cell>${t.trigger}</uui-table-cell>
                <uui-table-cell data-mark="mc:run-moved">${t.moved}</uui-table-cell>
                <uui-table-cell>${t.alreadyInPlace}</uui-table-cell>
                <uui-table-cell>${t.failed}</uui-table-cell>
                <uui-table-cell>
                  ${t.moved > 0 && !t.trigger.startsWith("undo:") ? u`<uui-button
                        data-mark="mc:run-undo"
                        compact
                        look="secondary"
                        label="Undo run from ${new Date(t.started).toLocaleString()}"
                        @click=${() => s(this, l, pe).call(this, t)}
                        >Undo</uui-button
                      >` : v}
                </uui-table-cell>
              </uui-table-row>
            `
  )}
        </uui-table>
      </uui-box>
    `;
};
me = function() {
  const t = this._editing;
  return u`
      <uui-box headline=${t.name ? `Edit: ${t.name}` : "New ruleset"}>
        <div class="form">
          <uui-label for="mc-name">Name</uui-label>
          <uui-input
            id="mc-name"
            data-mark="mc:name"
            label="Ruleset name"
            .value=${t.name ?? ""}
            @input=${(e) => this._editing = { ...t, name: e.target.value }}
          ></uui-input>

          <uui-label>Scope folder</uui-label>
          <umb-input-media
            data-mark="mc:scope"
            .max=${1}
            .selection=${t.scopeRootKey ? [t.scopeRootKey] : []}
            @change=${s(this, l, ae)}
          ></umb-input-media>

          <uui-label>Enabled</uui-label>
          <uui-toggle
            data-mark="mc:enabled"
            label="Enabled"
            .checked=${t.enabled ?? !0}
            @change=${(e) => this._editing = { ...t, enabled: e.target.checked }}
          ></uui-toggle>
        </div>

        <h4>Rules</h4>
        <mc-rule-tree
          .rules=${t.rules ?? []}
          .providers=${this._providers}
          .scopeName=${t.name || "Scope"}
          @rules-change=${(e) => this._editing = { ...t, rules: e.detail.rules }}
        ></mc-rule-tree>

        <div class="actions">
          <uui-button label="Cancel" look="secondary" @click=${() => this._editing = void 0}></uui-button>
          <uui-button data-mark="mc:save" label="Save" look="primary" color="positive" @click=${s(this, l, te)}></uui-button>
        </div>
      </uui-box>
    `;
};
g.styles = [
  F`
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
      .rule {
        margin-bottom: var(--uui-size-space-4);
      }
      .actions {
        display: flex;
        gap: var(--uui-size-space-3);
        justify-content: flex-end;
        margin-top: var(--uui-size-space-5);
      }
    `
];
f([
  $()
], g.prototype, "_rulesets", 2);
f([
  $()
], g.prototype, "_providers", 2);
f([
  $()
], g.prototype, "_editing", 2);
f([
  $()
], g.prototype, "_loading", 2);
f([
  $()
], g.prototype, "_requirements", 2);
f([
  $()
], g.prototype, "_plan", 2);
f([
  $()
], g.prototype, "_runs", 2);
f([
  $()
], g.prototype, "_settings", 2);
f([
  $()
], g.prototype, "_savingSettings", 2);
f([
  $()
], g.prototype, "_reanalyzeMediaKeys", 2);
f([
  $()
], g.prototype, "_reanalyzeResults", 2);
f([
  $()
], g.prototype, "_reanalyzing", 2);
g = f([
  j("mediacurator-dashboard")
], g);
const Te = g;
export {
  g as MediaCuratorDashboardElement,
  Te as default
};
//# sourceMappingURL=mediacurator-dashboard.element-DOGcgT3H.js.map
