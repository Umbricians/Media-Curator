import { html as d, nothing as k, css as x, state as g, customElement as C } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as T } from "@umbraco-cms/backoffice/lit-element";
import { UMB_NOTIFICATION_CONTEXT as K } from "@umbraco-cms/backoffice/notification";
import { M as y } from "./sdk.gen-Bq8ZVkDW.js";
import { n as h, r as E } from "./root-view.styles-zhTrEhZY.js";
const M = {
  aiEnabled: !0,
  persistImageDescription: !0,
  recognitionImageSize: 768,
  descriptionReasoningEffort: "Low",
  classificationMethod: "OneStep",
  decisionEngine: "UmbracoAi",
  decisionReasoningEffort: "None",
  jevModel: "jev-latest",
  jevApiKeyConfigured: !1,
  jevApiKeySource: "None",
  maxParallelAnalyses: 4,
  savePreparedImages: !1
}, j = [
  { value: "OneStep", name: "Describe, then pick the code in one step (recommended)" },
  { value: "StepByStep", name: "Describe, then pick one level at a time" },
  { value: "SingleCall", name: "One call with the image and the whole scheme" }
], O = [
  { name: "512 px", value: "512" },
  { name: "768 px (recommended)", value: "768" },
  { name: "1024 px", value: "1024" },
  { name: "1536 px", value: "1536" },
  { name: "Original file", value: "0" }
], U = [
  { value: "Default", name: "Profile or model default" },
  { value: "None", name: "None" },
  { value: "Low", name: "Low" },
  { value: "Medium", name: "Medium" },
  { value: "High", name: "High" }
];
function S(e, i) {
  return U.map((t) => ({
    value: t.value,
    name: t.value === i ? `${t.name} (recommended)` : t.name,
    selected: t.value === e
  }));
}
function I(e, i, t) {
  const r = [{ name: t, value: "", selected: !i }];
  for (const o of e.profiles)
    r.push({
      name: o.model ? `${o.name} (${o.model})` : o.name,
      value: o.alias,
      selected: o.alias === i
    });
  return i && !e.profiles.some((o) => o.alias === i) && r.push({ name: `${i} (not found)`, value: i, selected: !0 }), r;
}
var z = Object.defineProperty, N = Object.getOwnPropertyDescriptor, w = (e) => {
  throw TypeError(e);
}, v = (e, i, t, r) => {
  for (var o = r > 1 ? void 0 : r ? N(i, t) : i, a = e.length - 1, p; a >= 0; a--)
    (p = e[a]) && (o = (r ? p(i, t, o) : p(o)) || o);
  return r && o && z(i, t, o), o;
}, A = (e, i, t) => i.has(e) || w("Cannot " + t), f = (e, i, t) => (A(e, i, "read from private field"), t ? t.call(e) : i.get(e)), _ = (e, i, t) => i.has(e) ? w("Cannot add the same private member more than once") : i instanceof WeakSet ? i.add(e) : i.set(e, t), L = (e, i, t, r) => (A(e, i, "write to private field"), i.set(e, t), t), n = (e, i, t) => (A(e, i, "access private method"), t), m, s, $, P, b, l, u;
let c = class extends T {
  constructor() {
    super(), _(this, s), this._saving = !1, this._apiKey = "", this._savingKey = !1, _(this, m), this.consumeContext(K, (e) => {
      L(this, m, e);
    });
  }
  connectedCallback() {
    super.connectedCallback(), n(this, s, $).call(this);
  }
  render() {
    const e = this._settings, i = this._ai;
    if (!e || !i) return d`<uui-loader></uui-loader>`;
    const t = e.decisionEngine === "Jev", r = e.jevApiKeyConfigured, o = e.jevApiKeySource === "ServerConfiguration";
    return d`
      <uui-box headline="Setup" data-mark="mc:settings">
        <p>
          Everything Media Curator needs is set up here. The classification scheme is set on each ruleset's
          Library Classification rule, and images are classified with the scheme of the ruleset that curates them.
        </p>
        <div class="form">
          <uui-label for="mc-ai-enabled">Use AI</uui-label>
          <div>
            <uui-toggle
              id="mc-ai-enabled"
              data-mark="mc:ai-enabled"
              label="Use AI"
              .checked=${e.aiEnabled}
              @change=${(a) => n(this, s, l).call(this, { aiEnabled: a.target.checked })}
            ></uui-toggle>
            <div class="hint">When off, Media Curator makes no AI calls; rules that need no AI still work.</div>
          </div>

          <uui-label for="mc-persist-description">Save image description</uui-label>
          <div>
            <uui-toggle
              id="mc-persist-description"
              data-mark="mc:persist-description"
              label="Save image description"
              .checked=${e.persistImageDescription}
              @change=${(a) => n(this, s, l).call(this, { persistImageDescription: a.target.checked })}
            ></uui-toggle>
            <div class="hint">
              Lets classification run again from the description, without re-sending the image to the AI.
            </div>
          </div>
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
            ${n(this, s, u).call(this, "mc-image-size", "Image size sent to the AI", O.map((a) => ({ ...a, selected: a.value === String(e.recognitionImageSize) })), (a) => n(this, s, l).call(this, { recognitionImageSize: Number(a) }))}
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
              @change=${(a) => {
      const p = Math.round(Number(a.target.value));
      n(this, s, l).call(this, {
        maxParallelAnalyses: Math.min(Math.max(Number.isFinite(p) ? p : 1, 1), i.maxParallelAnalysesLimit)
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
          ${n(this, s, u).call(this, "mc-description-profile", "Umbraco.AI profile for describing images", I(i, e.descriptionProfileAlias, i.defaultProfileAlias ? `Umbraco.AI default chat profile (${i.defaultProfileAlias})` : "Umbraco.AI default chat profile (none set up)"), (a) => n(this, s, l).call(this, { descriptionProfileAlias: a || null }))}

          <uui-label for="mc-description-reasoning">Reasoning effort</uui-label>
          <div>
            ${n(this, s, u).call(this, "mc-description-reasoning", "Reasoning effort for describing images", S(e.descriptionReasoningEffort, "Low"), (a) => n(this, s, l).call(this, { descriptionReasoningEffort: a }))}
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
          image description.
        </p>
        <div class="form">
          <uui-label for="mc-classification-method">How codes are chosen</uui-label>
          <div>
            ${n(this, s, u).call(this, "mc-classification-method", "How classification codes are chosen", j.map((a) => ({ ...a, selected: a.value === e.classificationMethod })), (a) => n(this, s, l).call(this, { classificationMethod: a }))}
            <div class="hint">
              One step shows every code with its classes, so the AI sees where each one sits. Changing this
              re-decides existing codes on the next curation, from their saved descriptions.
            </div>
          </div>

          <uui-label for="mc-decision-engine">Decision engine</uui-label>
          <div>
            ${n(this, s, u).call(this, "mc-decision-engine", "Decision engine", [
      { name: "Umbraco.AI chat model (default)", value: "UmbracoAi", selected: !t },
      {
        name: r ? "Jev by TypeSafe" : "Jev by TypeSafe (needs an API key)",
        value: "Jev",
        selected: t,
        disabled: !r && !t
      }
    ], (a) => n(this, s, l).call(this, { decisionEngine: a }))}
            <div class="hint">
              ${r ? d`Jev returns a typed choice in well under a second. If a Jev call fails, the Umbraco.AI
                    profile below decides instead.` : d`To use Jev, add your TypeSafe API key under "Jev by TypeSafe" below, or in server configuration.`}
            </div>
            ${t && !r ? d`<div class="hint warning" data-mark="mc:jev-missing-key">
                  Jev is selected but no TypeSafe API key is configured, so Umbraco.AI is making the decisions.
                </div>` : k}
          </div>

          <uui-label for="mc-decision-profile">${t ? "Fallback Umbraco.AI profile" : "Umbraco.AI profile"}</uui-label>
          ${n(this, s, u).call(this, "mc-decision-profile", "Umbraco.AI profile for decisions", I(i, e.decisionProfileAlias, "Same as describing images"), (a) => n(this, s, l).call(this, { decisionProfileAlias: a || null }))}

          <uui-label for="mc-decision-reasoning">Reasoning effort</uui-label>
          ${n(this, s, u).call(this, "mc-decision-reasoning", "Reasoning effort for decisions", S(e.decisionReasoningEffort, "None"), (a) => n(this, s, l).call(this, { decisionReasoningEffort: a }))}
        </div>
      </uui-box>

      <uui-box headline="Jev by TypeSafe" data-mark="mc:jev">
        <p>
          Optional: TypeSafe's Jev model can make the classification decisions instead of an Umbraco.AI chat model.
          Save the API key here (stored encrypted, never shown again), or provide it from server configuration as
          <code>${i.typeSafeApiKeyConfigurationKey}</code>: an environment variable
          (<code>${i.typeSafeApiKeyConfigurationKey.split(":").join("__")}</code>), user secrets or Azure Key Vault.
          A key from server configuration always wins.
        </p>
        <div class="form">
          <uui-label for="mc-jev-key">API key</uui-label>
          <div>
            <div class="inline">
              <uui-input
                id="mc-jev-key"
                data-mark="mc:jev-key"
                type="password"
                autocomplete="off"
                label="TypeSafe API key"
                placeholder=${o ? "Provided by server configuration" : r ? "A key is saved; enter a new one to replace it" : "Paste your TypeSafe API key"}
                ?disabled=${o}
                .value=${this._apiKey}
                @input=${(a) => this._apiKey = a.target.value}
              ></uui-input>
              <uui-button
                data-mark="mc:jev-key-save"
                label="Save key"
                look="secondary"
                ?disabled=${o || !this._apiKey.trim()}
                .state=${this._savingKey ? "waiting" : void 0}
                @click=${() => n(this, s, b).call(this, this._apiKey.trim())}
              ></uui-button>
              ${r && !o ? d`<uui-button
                    data-mark="mc:jev-key-remove"
                    label="Remove key"
                    look="secondary"
                    color="danger"
                    @click=${() => n(this, s, b).call(this, "")}
                  ></uui-button>` : k}
            </div>
            <div class="hint" data-mark="mc:jev-key-status">
              ${o ? d`The API key comes from server configuration (<code>${i.typeSafeApiKeyConfigurationKey}</code>);
                    change it there.` : r ? "A TypeSafe API key is saved." : "No TypeSafe API key saved."}
            </div>
          </div>

          <uui-label for="mc-jev-model">Model</uui-label>
          <uui-input
            id="mc-jev-model"
            data-mark="mc:jev-model"
            label="Jev model"
            .value=${e.jevModel}
            @change=${(a) => n(this, s, l).call(this, { jevModel: a.target.value })}
          ></uui-input>
        </div>
      </uui-box>

      <uui-box headline="Diagnostics" data-mark="mc:diagnostics">
        <div class="form">
          <uui-label for="mc-save-prepared">Save prepared images</uui-label>
          <div>
            <uui-toggle
              id="mc-save-prepared"
              data-mark="mc:save-prepared"
              label="Save prepared images"
              .checked=${e.savePreparedImages}
              @change=${(a) => n(this, s, l).call(this, { savePreparedImages: a.target.checked })}
            ></uui-toggle>
            <div class="hint">
              Also writes every resized image sent to the AI to <code>${i.preparedImagesFolder}</code>, to check what
              the AI sees. Leave off in production.
            </div>
          </div>
        </div>
        <div class="actions">
          <uui-button
            data-mark="mc:settings-save"
            label="Save settings"
            look="primary"
            color="positive"
            .state=${this._saving ? "waiting" : void 0}
            @click=${n(this, s, P)}
          ></uui-button>
        </div>
      </uui-box>
    `;
  }
};
m = /* @__PURE__ */ new WeakMap();
s = /* @__PURE__ */ new WeakSet();
$ = async function() {
  try {
    const [e, i] = await Promise.all([y.getSettings(), y.getAiOptions()]);
    this._settings = e.data ?? { ...M }, this._ai = i.data ?? {
      profiles: [],
      maxParallelAnalysesLimit: 16,
      preparedImagesFolder: "",
      typeSafeApiKeyConfigurationKey: "MediaCurator:Secrets:TypeSafeApiKey"
    };
  } catch {
    h(f(this, m), "danger", "Could not load Media Curator settings. Check the server log and reload.");
  }
};
P = async function() {
  if (this._settings) {
    this._saving = !0;
    try {
      const e = await y.saveSettings({ body: this._settings });
      if (e.error || !e.data) {
        h(f(this, m), "danger", `Could not save settings: ${JSON.stringify(e.error ?? "no data")}`);
        return;
      }
      this._settings = e.data, h(f(this, m), "positive", "Settings saved.");
    } finally {
      this._saving = !1;
    }
  }
};
b = async function(e) {
  this._savingKey = !0;
  try {
    const i = await y.setTypeSafeApiKey({ body: { apiKey: e } });
    if (i.error || !i.data) {
      h(f(this, m), "danger", "Could not save the TypeSafe API key.");
      return;
    }
    n(this, s, l).call(this, { jevApiKeyConfigured: i.data.jevApiKeyConfigured }), this._apiKey = "", h(f(this, m), "positive", e ? "TypeSafe API key saved." : "TypeSafe API key removed.");
  } finally {
    this._savingKey = !1;
  }
};
l = function(e) {
  this._settings && (this._settings = { ...this._settings, ...e });
};
u = function(e, i, t, r) {
  return d`<uui-select
      id=${e}
      data-mark=${`mc:${e.replace(/^mc-/, "")}`}
      label=${i}
      .options=${t}
      @change=${(o) => r(o.target.value)}
    ></uui-select>`;
};
c.styles = [
  E,
  x`
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
      .inline {
        display: flex;
        gap: var(--uui-size-space-3);
        align-items: center;
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
v([
  g()
], c.prototype, "_settings", 2);
v([
  g()
], c.prototype, "_ai", 2);
v([
  g()
], c.prototype, "_saving", 2);
v([
  g()
], c.prototype, "_apiKey", 2);
v([
  g()
], c.prototype, "_savingKey", 2);
c = v([
  C("mc-root-setup-view")
], c);
const H = c;
export {
  c as McRootSetupViewElement,
  H as default
};
//# sourceMappingURL=setup-view.element-DmrWaNwM.js.map
