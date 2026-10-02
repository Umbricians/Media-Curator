import { html, customElement, state } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { UMB_NOTIFICATION_CONTEXT } from "@umbraco-cms/backoffice/notification";
import { MediaCuratorService, type CurationRunModel, type RulesetModel } from "../api/index.js";
import { notify, type McNotifications } from "./mc-notify.js";
import { rootViewStyles } from "./root-view.styles.js";

@customElement("mc-root-activity-view")
export class McRootActivityViewElement extends UmbLitElement {
  @state() private _runs: CurationRunModel[] = [];
  @state() private _rulesets: RulesetModel[] = [];
  @state() private _loading = true;

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
      const [runs, rulesets] = await Promise.all([MediaCuratorService.getRuns(), MediaCuratorService.getRulesets()]);
      this._runs = runs.data ?? [];
      this._rulesets = rulesets.data ?? [];
    } catch {
      notify(this.#notifications, "danger", "Could not load the activity log. Check the server log and reload.");
    } finally {
      this._loading = false;
    }
  }

  #rulesetNameFor(run: CurationRunModel) {
    return this._rulesets.find((r) => r.scopeRootKey === run.scopeFolderKey)?.name ?? "—";
  }

  async #undoRun(run: CurationRunModel) {
    const response = await MediaCuratorService.undoRun({ path: { runKey: run.key } });
    if (response.error || !response.data) {
      notify(this.#notifications, "danger", `Undo failed: ${JSON.stringify(response.error ?? "no data")}`);
      return;
    }
    const s = response.data;
    notify(
      this.#notifications,
      "positive",
      `Undo: ${s.moved} restored, ${s.alreadyInPlace} already in place, ${s.failed} failed.`,
    );
    await this.#load();
  }

  override render() {
    if (this._loading) return html`<uui-loader></uui-loader>`;
    if (this._runs.length === 0) {
      return html`<uui-box headline="Activity log" data-mark="mc:activity-log">
        <p data-mark="mc:activity-empty">No curation runs yet.</p>
      </uui-box>`;
    }
    return html`
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
            (run) => html`
              <uui-table-row data-mark="mc:run-row">
                <uui-table-cell>${new Date(run.started).toLocaleString()}</uui-table-cell>
                <uui-table-cell>${this.#rulesetNameFor(run)}</uui-table-cell>
                <uui-table-cell>${run.trigger}</uui-table-cell>
                <uui-table-cell data-mark="mc:run-moved">${run.moved}</uui-table-cell>
                <uui-table-cell>${run.alreadyInPlace}</uui-table-cell>
                <uui-table-cell>${run.failed}</uui-table-cell>
                <uui-table-cell>
                  ${run.moved > 0 && !run.trigger.startsWith("undo:")
                    ? html`<uui-button
                        data-mark="mc:run-undo"
                        compact
                        look="secondary"
                        label="Undo run from ${new Date(run.started).toLocaleString()}"
                        @click=${() => this.#undoRun(run)}
                        >Undo</uui-button
                      >`
                    : ""}
                </uui-table-cell>
              </uui-table-row>
            `,
          )}
        </uui-table>
      </uui-box>
    `;
  }

  static override styles = [rootViewStyles];
}

export default McRootActivityViewElement;

declare global {
  interface HTMLElementTagNameMap {
    "mc-root-activity-view": McRootActivityViewElement;
  }
}
