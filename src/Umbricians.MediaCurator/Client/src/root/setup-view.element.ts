import { css, html, customElement, nothing, state } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { UMB_NOTIFICATION_CONTEXT } from "@umbraco-cms/backoffice/notification";
import {
  MediaCuratorService,
  type AiReasoningEffort,
  type AiSettingsOptionsModel,
  type DecisionEngine,
  type MediaCuratorSiteSettingsModel,
} from "../api/index.js";
import { notify, type McNotifications } from "./mc-notify.js";
import { rootViewStyles } from "./root-view.styles.js";
import {
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
      this._ai = ai.data ?? { profiles: [], jevAvailable: false, maxParallelAnalysesLimit: 16 };
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
    if (!settings || !ai) return html`<uui-loader></uui-loader>`;
    const jevSelected = settings.decisionEngine === "Jev";

    return html`
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
            .checked=${settings.persistImageDescription}
            @change=${(e: Event) => this.#update({ persistImageDescription: (e.target as HTMLInputElement).checked })}
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
            profileOptions(ai, settings.descriptionProfileAlias, ai.fallbackProfileAlias
              ? `Configured profile (${ai.fallbackProfileAlias})`
              : "Umbraco.AI default chat profile"),
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
          Choices the rules cannot work out on their own, such as picking a library classification code from the
          image description. Each level of the scheme is one decision.
        </p>
        <div class="form">
          <uui-label for="mc-decision-engine">Decision engine</uui-label>
          <div>
            ${this.#select(
              "mc-decision-engine",
              "Decision engine",
              [
                { name: "Umbraco.AI chat model (default)", value: "UmbracoAi", selected: !jevSelected },
                {
                  name: ai.jevAvailable ? "Jev by TypeSafe" : "Jev by TypeSafe (needs an API key)",
                  value: "Jev",
                  selected: jevSelected,
                  disabled: !ai.jevAvailable && !jevSelected,
                },
              ],
              (value) => this.#update({ decisionEngine: value as DecisionEngine }),
            )}
            <div class="hint">
              ${ai.jevAvailable
                ? html`Jev returns a typed choice in well under a second. If a Jev call fails, the Umbraco.AI
                    profile below decides instead.`
                : html`To use Jev, add <code>MediaCurator:TypeSafe:ApiKey</code> to your app settings (or user
                    secrets) and restart the site.`}
            </div>
            ${jevSelected && !ai.jevAvailable
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
