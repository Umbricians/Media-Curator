import { css, html, customElement, nothing, state } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { UMB_NOTIFICATION_CONTEXT } from "@umbraco-cms/backoffice/notification";
import {
  MediaCuratorService,
  type AiReasoningEffort,
  type AiSettingsOptionsModel,
  type ClassificationMethod,
  type DecisionEngine,
  type MediaCuratorSiteSettingsModel,
} from "../api/index.js";
import { notify, type McNotifications } from "./mc-notify.js";
import { rootViewStyles } from "./root-view.styles.js";
import "./background-runs-banner.element.js";
import {
  CLASSIFICATION_METHODS,
  DEFAULT_SETTINGS,
  IMAGE_SIZES,
  profileOptions,
  reasoningOptions,
  type SelectOption,
} from "./setup-view.options.js";

@customElement("mc-root-setup-view")
export class McRootSetupViewElement extends UmbLitElement {
  @state() private _settings?: MediaCuratorSiteSettingsModel;
  @state() private _ai?: AiSettingsOptionsModel;
  @state() private _saving = false;
  @state() private _apiKey = "";
  @state() private _savingKey = false;

  #notifications?: McNotifications;

  constructor() {
    super();
    this.consumeContext(UMB_NOTIFICATION_CONTEXT, (ctx) => {
      this.#notifications = ctx;
    });
  }

  override connectedCallback() {
    super.connectedCallback();
    this.#load();
  }

  async #load() {
    try {
      const [settings, ai] = await Promise.all([MediaCuratorService.getSettings(), MediaCuratorService.getAiOptions()]);
      this._settings = settings.data ?? { ...DEFAULT_SETTINGS };
      this._ai = ai.data ?? {
        profiles: [],
        maxParallelAnalysesLimit: 16,
        preparedImagesFolder: "",
        typeSafeApiKeyConfigurationKey: "MediaCurator:Secrets:TypeSafeApiKey",
      };
    } catch {
      notify(this.#notifications, "danger", "Could not load Media Curator settings. Check the server log and reload.");
    }
  }

  async #saveSettings() {
    if (!this._settings) return;
    this._saving = true;
    try {
      const response = await MediaCuratorService.saveSettings({ body: this._settings });
      if (response.error || !response.data) {
        notify(this.#notifications, "danger", `Could not save settings: ${JSON.stringify(response.error ?? "no data")}`);
        return;
      }
      this._settings = response.data;
      notify(this.#notifications, "positive", "Settings saved.");
    } finally {
      this._saving = false;
    }
  }

  /** Stores (or with an empty key, removes) the TypeSafe API key. The key is write-only. */
  async #saveApiKey(apiKey: string) {
    this._savingKey = true;
    try {
      const response = await MediaCuratorService.setTypeSafeApiKey({ body: { apiKey } });
      if (response.error || !response.data) {
        notify(this.#notifications, "danger", "Could not save the TypeSafe API key.");
        return;
      }
      // Keep unsaved form changes; only the key status comes from the server.
      this.#update({ jevApiKeyConfigured: response.data.jevApiKeyConfigured });
      this._apiKey = "";
      notify(this.#notifications, "positive", apiKey ? "TypeSafe API key saved." : "TypeSafe API key removed.");
    } finally {
      this._savingKey = false;
    }
  }

  #update(patch: Partial<MediaCuratorSiteSettingsModel>) {
    if (this._settings) this._settings = { ...this._settings, ...patch };
  }

  #select(id: string, label: string, options: SelectOption[], onChange: (value: string) => void) {
    return html`<uui-select
      id=${id}
      data-mark=${`mc:${id.replace(/^mc-/, "")}`}
      label=${label}
      .options=${options}
      @change=${(e: Event) => onChange((e.target as HTMLSelectElement).value)}
    ></uui-select>`;
  }

  override render() {
    const settings = this._settings;
    const ai = this._ai;
    if (!settings || !ai) return html`<mc-background-runs-banner></mc-background-runs-banner><uui-loader></uui-loader>`;
    const jevSelected = settings.decisionEngine === "Jev";
    const jevAvailable = settings.jevApiKeyConfigured;
    const keyFromServer = settings.jevApiKeySource === "ServerConfiguration";

    return html`<mc-background-runs-banner></mc-background-runs-banner>
      <uui-box headline="Setup" data-mark="mc:settings">
        <p>
          Everything Media Curator needs is set up here. The classification scheme is set on each ruleset's
          Classification rule, and images are classified with the scheme of the ruleset that curates them.
        </p>
        <div class="form">
          <uui-label for="mc-ai-enabled">Use AI</uui-label>
          <div>
            <uui-toggle
              id="mc-ai-enabled"
              data-mark="mc:ai-enabled"
              label="Use AI"
              .checked=${settings.aiEnabled}
              @change=${(e: Event) => this.#update({ aiEnabled: (e.target as HTMLInputElement).checked })}
            ></uui-toggle>
            <div class="hint">When off, Media Curator makes no AI calls; rules that need no AI still work.</div>
          </div>

          <uui-label for="mc-persist-description">Save image description</uui-label>
          <div>
            <uui-toggle
              id="mc-persist-description"
              data-mark="mc:persist-description"
              label="Save image description"
              .checked=${settings.persistImageDescription}
              @change=${(e: Event) => this.#update({ persistImageDescription: (e.target as HTMLInputElement).checked })}
            ></uui-toggle>
            <div class="hint">
              Lets classification run again from the description, without re-sending the image to the AI.
            </div>
          </div>

          <uui-label for="mc-detect-people">Detect people</uui-label>
          <div>
            <uui-toggle
              id="mc-detect-people"
              data-mark="mc:detect-people"
              label="Detect people"
              .checked=${settings.detectPeople}
              @change=${(e: Event) => this.#update({ detectPeople: (e.target as HTMLInputElement).checked })}
            ></uui-toggle>
            <div class="hint">
              When images are analyzed, also decide from their description whether they show people. The media tree
              then marks those images, and every folder with such images below it, for privacy and model-release
              review. "Analyze images" fills this in for images analyzed earlier without sending them again.
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
            ${this.#select(
              "mc-image-size",
              "Image size sent to the AI",
              IMAGE_SIZES.map((s) => ({ ...s, selected: s.value === String(settings.recognitionImageSize) })),
              (value) => this.#update({ recognitionImageSize: Number(value) }),
            )}
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
              max=${ai.maxParallelAnalysesLimit}
              .value=${String(settings.maxParallelAnalyses)}
              @change=${(e: Event) => {
                const value = Math.round(Number((e.target as HTMLInputElement).value));
                this.#update({
                  maxParallelAnalyses: Math.min(Math.max(Number.isFinite(value) ? value : 1, 1), ai.maxParallelAnalysesLimit),
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
          ${this.#select(
            "mc-description-profile",
            "Umbraco.AI profile for describing images",
            profileOptions(ai, settings.descriptionProfileAlias, ai.defaultProfileAlias
              ? `Umbraco.AI default chat profile (${ai.defaultProfileAlias})`
              : "Umbraco.AI default chat profile (none set up)"),
            (value) => this.#update({ descriptionProfileAlias: value || null }),
          )}

          <uui-label for="mc-description-reasoning">Reasoning effort</uui-label>
          <div>
            ${this.#select(
              "mc-description-reasoning",
              "Reasoning effort for describing images",
              reasoningOptions(settings.descriptionReasoningEffort, "Low"),
              (value) => this.#update({ descriptionReasoningEffort: value as AiReasoningEffort }),
            )}
            <div class="hint">
              Applies to reasoning models (e.g. GPT-5). A reasoning effort set on the Umbraco.AI profile itself takes
              precedence; models without reasoning ignore it.
            </div>
          </div>
        </div>
      </uui-box>

      <uui-box headline="Decisions" data-mark="mc:ai-decisions">
        <p>
          Choices the rules cannot work out on their own, such as picking a classification code from the
          image description.
        </p>
        <div class="form">
          <uui-label for="mc-classification-method">How codes are chosen</uui-label>
          <div>
            ${this.#select(
              "mc-classification-method",
              "How classification codes are chosen",
              CLASSIFICATION_METHODS.map((m) => ({ ...m, selected: m.value === settings.classificationMethod })),
              (value) => this.#update({ classificationMethod: value as ClassificationMethod }),
            )}
            <div class="hint">
              One step shows every code with its classes, so the AI sees where each one sits. Changing this
              re-decides existing codes on the next curation, from their saved descriptions.
            </div>
          </div>

          <uui-label for="mc-decision-engine">Decision engine</uui-label>
          <div>
            ${this.#select(
              "mc-decision-engine",
              "Decision engine",
              [
                { name: "Umbraco.AI chat model (default)", value: "UmbracoAi", selected: !jevSelected },
                {
                  name: jevAvailable ? "Jev by TypeSafe" : "Jev by TypeSafe (needs an API key)",
                  value: "Jev",
                  selected: jevSelected,
                  disabled: !jevAvailable && !jevSelected,
                },
              ],
              (value) => this.#update({ decisionEngine: value as DecisionEngine }),
            )}
            <div class="hint">
              ${jevAvailable
                ? html`Jev returns a typed choice in well under a second. If a Jev call fails, the Umbraco.AI
                    profile below decides instead.`
                : html`To use Jev, add your TypeSafe API key under "Jev by TypeSafe" below, or in server configuration.`}
            </div>
            ${jevSelected && !jevAvailable
              ? html`<div class="hint warning" data-mark="mc:jev-missing-key">
                  Jev is selected but no TypeSafe API key is configured, so Umbraco.AI is making the decisions.
                </div>`
              : nothing}
          </div>

          <uui-label for="mc-decision-profile">${jevSelected ? "Fallback Umbraco.AI profile" : "Umbraco.AI profile"}</uui-label>
          ${this.#select(
            "mc-decision-profile",
            "Umbraco.AI profile for decisions",
            profileOptions(ai, settings.decisionProfileAlias, "Same as describing images"),
            (value) => this.#update({ decisionProfileAlias: value || null }),
          )}

          <uui-label for="mc-decision-reasoning">Reasoning effort</uui-label>
          ${this.#select(
            "mc-decision-reasoning",
            "Reasoning effort for decisions",
            reasoningOptions(settings.decisionReasoningEffort, "None"),
            (value) => this.#update({ decisionReasoningEffort: value as AiReasoningEffort }),
          )}
        </div>
      </uui-box>

      <uui-box headline="Jev by TypeSafe" data-mark="mc:jev">
        <p>
          Optional: TypeSafe's Jev model can make the classification decisions instead of an Umbraco.AI chat model.
          Save the API key here (stored encrypted, never shown again), or provide it from server configuration as
          <code>${ai.typeSafeApiKeyConfigurationKey}</code>: an environment variable
          (<code>${ai.typeSafeApiKeyConfigurationKey.split(":").join("__")}</code>), user secrets or Azure Key Vault.
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
                placeholder=${keyFromServer
                  ? "Provided by server configuration"
                  : jevAvailable
                    ? "A key is saved; enter a new one to replace it"
                    : "Paste your TypeSafe API key"}
                ?disabled=${keyFromServer}
                .value=${this._apiKey}
                @input=${(e: Event) => (this._apiKey = (e.target as HTMLInputElement).value)}
              ></uui-input>
              <uui-button
                data-mark="mc:jev-key-save"
                label="Save key"
                look="secondary"
                ?disabled=${keyFromServer || !this._apiKey.trim()}
                .state=${this._savingKey ? "waiting" : undefined}
                @click=${() => this.#saveApiKey(this._apiKey.trim())}
              ></uui-button>
              ${jevAvailable && !keyFromServer
                ? html`<uui-button
                    data-mark="mc:jev-key-remove"
                    label="Remove key"
                    look="secondary"
                    color="danger"
                    @click=${() => this.#saveApiKey("")}
                  ></uui-button>`
                : nothing}
            </div>
            <div class="hint" data-mark="mc:jev-key-status">
              ${keyFromServer
                ? html`The API key comes from server configuration (<code>${ai.typeSafeApiKeyConfigurationKey}</code>);
                    change it there.`
                : jevAvailable
                  ? "A TypeSafe API key is saved."
                  : "No TypeSafe API key saved."}
            </div>
          </div>

          <uui-label for="mc-jev-model">Model</uui-label>
          <uui-input
            id="mc-jev-model"
            data-mark="mc:jev-model"
            label="Jev model"
            .value=${settings.jevModel}
            @change=${(e: Event) => this.#update({ jevModel: (e.target as HTMLInputElement).value })}
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
              .checked=${settings.savePreparedImages}
              @change=${(e: Event) => this.#update({ savePreparedImages: (e.target as HTMLInputElement).checked })}
            ></uui-toggle>
            <div class="hint">
              Also writes every resized image sent to the AI to <code>${ai.preparedImagesFolder}</code>, to check what
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
            .state=${this._saving ? "waiting" : undefined}
            @click=${this.#saveSettings}
          ></uui-button>
        </div>
      </uui-box>
    `;
  }

  static override styles = [
    rootViewStyles,
    css`
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
    `,
  ];
}

export default McRootSetupViewElement;

declare global {
  interface HTMLElementTagNameMap {
    "mc-root-setup-view": McRootSetupViewElement;
  }
}
