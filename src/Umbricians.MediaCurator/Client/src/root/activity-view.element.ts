import { html, customElement, state } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { UMB_NOTIFICATION_CONTEXT } from "@umbraco-cms/backoffice/notification";
import { MediaCuratorService, type BulkRunStatusModel, type CurationRunModel, type RulesetModel } from "../api/index.js";
import { notify, type McNotifications } from "./mc-notify.js";
import { rootViewStyles } from "./root-view.styles.js";

@customElement("mc-root-activity-view")
export class McRootActivityViewElement extends UmbLitElement {
  @state() private _runs: CurationRunModel[] = [];
  @state() private _rulesets: RulesetModel[] = [];
  @state() private _loading = true;
  @state() private _background: BulkRunStatusModel[] = [];

  #refresh?: ReturnType<typeof setTimeout>;

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

  override disconnectedCallback() {
    super.disconnectedCallback();
    clearTimeout(this.#refresh);
  }

  async #load() {
    try {
      const [runs, rulesets, queue] = await Promise.all([
        MediaCuratorService.getRuns(),
        MediaCuratorService.getRulesets(),
        MediaCuratorService.getQueueStatus(),
      ]);
      this._runs = runs.data ?? [];
      this._rulesets = rulesets.data ?? [];
      this._background = queue.data?.statuses ?? [];

      // While a background run is queued or moving images, keep its progress (and the log) current.
      clearTimeout(this.#refresh);
      if (this._background.some((b) => b.state === "queued" || b.state === "running")) {
        this.#refresh = setTimeout(() => this.#load(), 5000);
      }
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

  #renderBackground() {
    if (this._background.length === 0) return "";
    return html`<uui-box headline="Background runs" data-mark="mc:background-runs">
      <uui-table>
        <uui-table-head>
          <uui-table-head-cell>Folder</uui-table-head-cell>
          <uui-table-head-cell>Status</uui-table-head-cell>
          <uui-table-head-cell>Progress</uui-table-head-cell>
          <uui-table-head-cell>Updated</uui-table-head-cell>
        </uui-table-head>
        ${this._background.map(
          (b) => html`<uui-table-row data-mark="mc:background-row">
            <uui-table-cell>${b.name || "—"}</uui-table-cell>
            <uui-table-cell>${b.state}${b.error ? html`: ${b.error}` : ""}</uui-table-cell>
            <uui-table-cell>
              ${b.state === "completed"
                ? `${b.moved} moved, ${b.failed} failed`
                : b.total > 0
                  ? html`<uui-loader-bar progress=${Math.round((100 * b.processed) / b.total)}></uui-loader-bar>
                      ${b.processed} of ${b.total}`
                  : `${b.imageCount} images`}
            </uui-table-cell>
            <uui-table-cell>${new Date(b.updated).toLocaleString()}</uui-table-cell>
          </uui-table-row>`,
        )}
      </uui-table>
    </uui-box>`;
  }

  override render() {
    if (this._loading) return html`<uui-loader></uui-loader>`;
    if (this._runs.length === 0) {
      return html`${this.#renderBackground()}
        <uui-box headline="Activity log" data-mark="mc:activity-log">
          <p data-mark="mc:activity-empty">No curation runs yet.</p>
        </uui-box>`;
    }
    return html`
      ${this.#renderBackground()}
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
