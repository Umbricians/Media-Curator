import { html as u, nothing as x, css as $, state as b, customElement as E } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as P } from "@umbraco-cms/backoffice/lit-element";
import { UMB_NOTIFICATION_CONTEXT as C } from "@umbraco-cms/backoffice/notification";
import { M as f } from "./sdk.gen-LMy3RyM3.js";
import { n as h, r as M } from "./root-view.styles-zhTrEhZY.js";
const T = {
  persistImageDescription: !0,
  recognitionImageSize: 768,
  descriptionReasoningEffort: "Low",
  decisionEngine: "UmbracoAi",
  decisionReasoningEffort: "None",
  maxParallelAnalyses: 4
}, U = [
  { name: "512 px", value: "512" },
  { name: "768 px (recommended)", value: "768" },
  { name: "1024 px", value: "1024" },
  { name: "1536 px", value: "1536" },
  { name: "Original file", value: "0" }
], z = [
  { value: "Default", name: "Profile or model default" },
  { value: "None", name: "None" },
  { value: "Low", name: "Low" },
  { value: "Medium", name: "Medium" },
  { value: "High", name: "High" }
];
function A(e, i) {
  return z.map((a) => ({
    value: a.value,
    name: a.value === i ? `${a.name} (recommended)` : a.name,
    selected: a.value === e
  }));
}
function _(e, i, a) {
  const t = [{ name: a, value: "", selected: !i }];
  for (const s of e.profiles)
    t.push({
      name: s.model ? `${s.name} (${s.model})` : s.name,
      value: s.alias,
      selected: s.alias === i
    });
  return i && !e.profiles.some((s) => s.alias === i) && t.push({ name: `${i} (not found)`, value: i, selected: !0 }), t;
}
var N = Object.defineProperty, R = Object.getOwnPropertyDescriptor, S = (e) => {
  throw TypeError(e);
}, m = (e, i, a, t) => {
  for (var s = t > 1 ? void 0 : t ? R(i, a) : i, p = e.length - 1, g; p >= 0; p--)
    (g = e[p]) && (s = (t ? g(i, a, s) : g(s)) || s);
  return t && s && N(i, a, s), s;
}, y = (e, i, a) => i.has(e) || S("Cannot " + a), v = (e, i, a) => (y(e, i, "read from private field"), a ? a.call(e) : i.get(e)), I = (e, i, a) => i.has(e) ? S("Cannot add the same private member more than once") : i instanceof WeakSet ? i.add(e) : i.set(e, a), O = (e, i, a, t) => (y(e, i, "write to private field"), i.set(e, a), a), o = (e, i, a) => (y(e, i, "access private method"), a), d, n, w, k, r, l;
let c = class extends P {
  constructor() {
    super(), I(this, n), this._saving = !1, I(this, d), this.consumeContext(C, (e) => {
      O(this, d, e);
    });
  }
  connectedCallback() {
    super.connectedCallback(), o(this, n, w).call(this);
  }
  render() {
    const e = this._settings, i = this._ai;
    if (!e || !i) return u`<uui-loader></uui-loader>`;
    const a = e.decisionEngine === "Jev";
    return u`
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
            .checked=${e.persistImageDescription}
            @change=${(t) => o(this, n, r).call(this, { persistImageDescription: t.target.checked })}
          ></uui-toggle>
        </div>
      </uui-box>

      <uui-box headline="AI speed" data-mark="mc:ai-speed">
        <p>
          Smaller images and less reasoning make analysis faster and cheaper. The defaults (768px, low
          reasoning to describe, no reasoning to decide, 4 at a time) were benchmarked to roughly halve
          the time per image while keeping the same folders for nearly every image.
        </p>
        <div class="form">
          <uui-label for="mc-image-size">Image size sent to the AI</uui-label>
          <div>
            ${o(this, n, l).call(this, "mc-image-size", "Image size sent to the AI", U.map((t) => ({ ...t, selected: t.value === String(e.recognitionImageSize) })), (t) => o(this, n, r).call(this, { recognitionImageSize: Number(t) }))}
            <div class="hint">Longest edge. Larger images cost more tokens and rarely improve the description.</div>
          </div>

          <uui-label for="mc-parallel">Images analyzed at once</uui-label>
          <div>
            <uui-input
              id="mc-parallel"
              data-mark="mc:parallel"
              type="number"
              label="Images analyzed at once"
              min="1"
              max=${i.maxParallelAnalysesLimit}
              .value=${String(e.maxParallelAnalyses)}
              @change=${(t) => {
      const s = Math.round(Number(t.target.value));
      o(this, n, r).call(this, {
        maxParallelAnalyses: Math.min(Math.max(Number.isFinite(s) ? s : 1, 1), i.maxParallelAnalysesLimit)
      });
    }}
            ></uui-input>
            <div class="hint">
              Used by Analyze images, Curate images, ruleset runs and Automate's Analyze image step. Lower it if
              your AI provider rate-limits you.
            </div>
          </div>
        </div>
      </uui-box>

      <uui-box headline="Describing images" data-mark="mc:ai-description">
        <p>The vision step: one call per image that writes the description and tags.</p>
        <div class="form">
          <uui-label for="mc-description-profile">Umbraco.AI profile</uui-label>
          ${o(this, n, l).call(this, "mc-description-profile", "Umbraco.AI profile for describing images", _(i, e.descriptionProfileAlias, i.fallbackProfileAlias ? `Configured profile (${i.fallbackProfileAlias})` : "Umbraco.AI default chat profile"), (t) => o(this, n, r).call(this, { descriptionProfileAlias: t || null }))}

          <uui-label for="mc-description-reasoning">Reasoning effort</uui-label>
          <div>
            ${o(this, n, l).call(this, "mc-description-reasoning", "Reasoning effort for describing images", A(e.descriptionReasoningEffort, "Low"), (t) => o(this, n, r).call(this, { descriptionReasoningEffort: t }))}
            <div class="hint">
              Applies to reasoning models (e.g. GPT-5). A reasoning effort set on the Umbraco.AI profile itself takes
              precedence; models without reasoning ignore it.
            </div>
          </div>
        </div>
      </uui-box>

      <uui-box headline="Decisions" data-mark="mc:ai-decisions">
        <p>
          Choices the rules cannot work out on their own, such as picking a library classification code from the
          image description. Each level of the scheme is one decision.
        </p>
        <div class="form">
          <uui-label for="mc-decision-engine">Decision engine</uui-label>
          <div>
            ${o(this, n, l).call(this, "mc-decision-engine", "Decision engine", [
      { name: "Umbraco.AI chat model (default)", value: "UmbracoAi", selected: !a },
      {
        name: i.jevAvailable ? "Jev by TypeSafe" : "Jev by TypeSafe (needs an API key)",
        value: "Jev",
        selected: a,
        disabled: !i.jevAvailable && !a
      }
    ], (t) => o(this, n, r).call(this, { decisionEngine: t }))}
            <div class="hint">
              ${i.jevAvailable ? u`Jev returns a typed choice in well under a second. If a Jev call fails, the Umbraco.AI
                    profile below decides instead.` : u`To use Jev, add <code>MediaCurator:TypeSafe:ApiKey</code> to your app settings (or user
                    secrets) and restart the site.`}
            </div>
            ${a && !i.jevAvailable ? u`<div class="hint warning" data-mark="mc:jev-missing-key">
                  Jev is selected but no TypeSafe API key is configured, so Umbraco.AI is making the decisions.
                </div>` : x}
          </div>

          <uui-label for="mc-decision-profile">${a ? "Fallback Umbraco.AI profile" : "Umbraco.AI profile"}</uui-label>
          ${o(this, n, l).call(this, "mc-decision-profile", "Umbraco.AI profile for decisions", _(i, e.decisionProfileAlias, "Same as describing images"), (t) => o(this, n, r).call(this, { decisionProfileAlias: t || null }))}

          <uui-label for="mc-decision-reasoning">Reasoning effort</uui-label>
          ${o(this, n, l).call(this, "mc-decision-reasoning", "Reasoning effort for decisions", A(e.decisionReasoningEffort, "None"), (t) => o(this, n, r).call(this, { decisionReasoningEffort: t }))}
        </div>
        <div class="actions">
          <uui-button
            data-mark="mc:settings-save"
            label="Save settings"
            look="primary"
            color="positive"
            .state=${this._saving ? "waiting" : void 0}
            @click=${o(this, n, k)}
          ></uui-button>
        </div>
      </uui-box>
    `;
  }
};
d = /* @__PURE__ */ new WeakMap();
n = /* @__PURE__ */ new WeakSet();
w = async function() {
  try {
    const [e, i] = await Promise.all([f.getSettings(), f.getAiOptions()]);
    this._settings = e.data ?? { ...T }, this._ai = i.data ?? { profiles: [], jevAvailable: !1, maxParallelAnalysesLimit: 16 };
  } catch {
    h(v(this, d), "danger", "Could not load Media Curator settings. Check the server log and reload.");
  }
};
k = async function() {
  if (this._settings) {
    this._saving = !0;
    try {
      const e = await f.saveSettings({ body: this._settings });
      if (e.error || !e.data) {
        h(v(this, d), "danger", `Could not save settings: ${JSON.stringify(e.error ?? "no data")}`);
        return;
      }
      this._settings = e.data, h(v(this, d), "positive", "Settings saved.");
    } finally {
      this._saving = !1;
    }
  }
};
r = function(e) {
  this._settings && (this._settings = { ...this._settings, ...e });
};
l = function(e, i, a, t) {
  return u`<uui-select
      id=${e}
      data-mark=${`mc:${e.replace(/^mc-/, "")}`}
      label=${i}
      .options=${a}
      @change=${(s) => t(s.target.value)}
    ></uui-select>`;
};
c.styles = [
  M,
  $`
      uui-box + uui-box {
        margin-top: var(--uui-size-layout-1);
      }
      .form {
        grid-template-columns: 220px 1fr;
      }
      .hint {
        color: var(--uui-color-text-alt);
        font-size: var(--uui-type-small-size);
        margin-top: var(--uui-size-space-2);
      }
      .hint.warning {
        color: var(--uui-color-warning-standalone);
      }
      uui-select,
      uui-input {
        min-width: 280px;
      }
    `
];
m([
  b()
], c.prototype, "_settings", 2);
m([
  b()
], c.prototype, "_ai", 2);
m([
  b()
], c.prototype, "_saving", 2);
c = m([
  E("mc-root-setup-view")
], c);
const F = c;
export {
  c as McRootSetupViewElement,
  F as default
};
//# sourceMappingURL=setup-view.element-FUjFAyMv.js.map
