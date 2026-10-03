import { html, customElement, state, nothing } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { UMB_NOTIFICATION_CONTEXT } from "@umbraco-cms/backoffice/notification";
import { MediaCuratorService, type ReanalyzeImageResultModel } from "../api/index.js";
import { notify, type McNotifications } from "./mc-notify.js";
import { rootViewStyles } from "./root-view.styles.js";

@customElement("mc-root-reanalyze-view")
export class McRootReanalyzeViewElement extends UmbLitElement {
  @state() private _mediaKeys: string[] = [];
  @state() private _results: ReanalyzeImageResultModel[] = [];
  @state() private _reanalyzing = false;

  #notifications?: McNotifications;

  constructor() {
    super();
    this.consumeContext(UMB_NOTIFICATION_CONTEXT, (ctx) => {
      this.#notifications = ctx;
    });
  }

  #onMediaChange(e: Event) {
    const selection = (e.target as { selection?: string[] }).selection ?? [];
    this._mediaKeys = selection;
    this._results = [];
  }

  async #reanalyzeImages() {
    if (this._mediaKeys.length === 0) {
      notify(this.#notifications, "danger", "Choose at least one image to re-analyze.");
      return;
    }

    this._reanalyzing = true;
    try {
      const response = await MediaCuratorService.reanalyzeImages({
        body: { mediaKeys: this._mediaKeys, keepExistingAnalysis: false },
      });
      if (response.error || !response.data) {
        notify(this.#notifications, "danger", `Re-analyze failed: ${JSON.stringify(response.error ?? "no data")}`);
        return;
      }

      this._results = response.data.results ?? [];
      const analyzed = this._results.filter((r) => r.analyzed).length;
      const failed = this._results.length - analyzed;
      if (failed === 0) {
        notify(this.#notifications, "positive", `Re-analyzed ${analyzed} image(s).`);
      } else {
        notify(
          this.#notifications,
          "danger",
          `Re-analyzed ${analyzed} image(s); ${failed} could not be analyzed. See results below.`,
        );
      }
    } finally {
      this._reanalyzing = false;
    }
  }

  override render() {
    return html`
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
            .selection=${this._mediaKeys}
            @change=${this.#onMediaChange}
          ></umb-input-media>
        </div>
        <div class="actions">
          <uui-button
            data-mark="mc:reanalyze-run"
            label="Re-analyze selected"
            look="primary"
            color="positive"
            .state=${this._reanalyzing ? "waiting" : undefined}
            ?disabled=${this._mediaKeys.length === 0}
            @click=${this.#reanalyzeImages}
          ></uui-button>
        </div>
        ${this._results.length > 0
          ? html`
              <uui-table>
                <uui-table-head>
                  <uui-table-head-cell>Image</uui-table-head-cell>
                  <uui-table-head-cell>Description</uui-table-head-cell>
                  <uui-table-head-cell>Tags</uui-table-head-cell>
                  <uui-table-head-cell>Code</uui-table-head-cell>
                </uui-table-head>
                ${this._results.map(
                  (result) => html`
                    <uui-table-row data-mark="mc:reanalyze-result">
                      <uui-table-cell>${result.mediaName ?? result.mediaKey}</uui-table-cell>
                      <uui-table-cell>
                        ${result.analyzed
                          ? (result.description ?? "—")
                          : html`<em>${result.error ?? "Not analyzed"}</em>`}
                      </uui-table-cell>
                      <uui-table-cell>${(result.tags ?? []).join(", ") || "—"}</uui-table-cell>
                      <uui-table-cell>${result.classificationCode ?? "—"}</uui-table-cell>
                    </uui-table-row>
                  `,
                )}
              </uui-table>
            `
          : nothing}
      </uui-box>
    `;
  }

  static override styles = [rootViewStyles];
}

export default McRootReanalyzeViewElement;

declare global {
  interface HTMLElementTagNameMap {
    "mc-root-reanalyze-view": McRootReanalyzeViewElement;
  }
}
