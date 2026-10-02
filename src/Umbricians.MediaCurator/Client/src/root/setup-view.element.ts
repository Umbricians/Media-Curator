import { html, customElement, state } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { UMB_NOTIFICATION_CONTEXT } from "@umbraco-cms/backoffice/notification";
import { MediaCuratorService, type MediaCuratorSiteSettingsModel } from "../api/index.js";
import { notify, type McNotifications } from "./mc-notify.js";
import { rootViewStyles } from "./root-view.styles.js";

@customElement("mc-root-setup-view")
export class McRootSetupViewElement extends UmbLitElement {
  @state() private _settings?: MediaCuratorSiteSettingsModel;
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
      const response = await MediaCuratorService.getSettings();
      this._settings = response.data ?? { persistImageDescription: true };
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

  override render() {
    const settings = this._settings;
    if (!settings) return html`<uui-loader></uui-loader>`;
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
            @change=${(e: Event) => {
              this._settings = {
                ...settings,
                persistImageDescription: (e.target as HTMLInputElement).checked,
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
            .state=${this._saving ? "waiting" : undefined}
            @click=${this.#saveSettings}
          ></uui-button>
        </div>
      </uui-box>
    `;
  }

  static override styles = [rootViewStyles];
}

export default McRootSetupViewElement;

declare global {
  interface HTMLElementTagNameMap {
    "mc-root-setup-view": McRootSetupViewElement;
  }
}
