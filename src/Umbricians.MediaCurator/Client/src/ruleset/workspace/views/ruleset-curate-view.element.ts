import { css, customElement, html, nothing, state } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { UMB_NOTIFICATION_CONTEXT } from "@umbraco-cms/backoffice/notification";
import { UmbMediaItemRepository } from "@umbraco-cms/backoffice/media";
import { umbConfirmModal } from "@umbraco-cms/backoffice/modal";
import {
  MediaCuratorService,
  type BulkRunStatusModel,
  type CurationPlanModel,
  type CurationRunModel,
  type MediaCurationCountModel,
} from "../../../api/index.js";
import { MC_EMPTY_GUID } from "../../entity.js";
import { MC_RULESET_WORKSPACE_CONTEXT } from "../ruleset-workspace.context-token.js";
import {
  backgroundConfirmMessage,
  backgroundProgressMessage,
  backgroundResultMessage,
  emptyFoldersLine,
  resultMessage,
} from "../../../media/curate-media.summary.js";
import { getBackgroundRun, isActive, waitForBackgroundRun } from "../../../media/background-run.js";

const plural = (count: number, one: string, many: string) => `${count} ${count === 1 ? one : many}`;
import "../../../media/empty-folders-option.element.js";
import type { McEmptyFoldersOptionElement } from "../../../media/empty-folders-option.element.js";

/**
 * Curate tab: dry run the saved ruleset against its scope folder, apply it, and see this folder's runs.
 * A scope with more images than the server's threshold skips the dry run (too slow) and is curated in
 * the background, with its progress shown here until it finishes.
 */
@customElement("mc-ruleset-curate-view")
export class McRulesetCurateViewElement extends UmbLitElement {
  @state() private _scopeFolderKey?: string;
  @state() private _plan?: CurationPlanModel;
  @state() private _runs: CurationRunModel[] = [];
  @state() private _busy = false;
  @state() private _count?: MediaCurationCountModel;
  @state() private _background?: BulkRunStatusModel;
  @state() private _scopeName = "this folder";
  #permanentlyDeleteEmptyFolders = false;

  #context?: typeof MC_RULESET_WORKSPACE_CONTEXT.TYPE;
  #notifications?: typeof UMB_NOTIFICATION_CONTEXT.TYPE;

  constructor() {
    super();
    this.consumeContext(UMB_NOTIFICATION_CONTEXT, (context) => (this.#notifications = context));
    this.consumeContext(MC_RULESET_WORKSPACE_CONTEXT, (context) => {
      this.#context = context;
      if (!context) return;
      // Curation runs against what is saved on the server, not unsaved edits.
      this.observe(
        context.persistedData,
        (data) => {
          const key = data?.scopeRootKey && data.scopeRootKey !== MC_EMPTY_GUID ? data.scopeRootKey : undefined;
          if (key === this._scopeFolderKey) return;
          this._scopeFolderKey = key;
          this._plan = undefined;
          this._count = undefined;
          this._background = undefined;
          void this.#loadRuns();
          void this.#loadCount();
        },
        "_persistedData",
      );
    });
  }

  #notify(color: "positive" | "danger" | "warning", message: string) {
    this.#notifications?.peek(color, { data: { message } });
  }

  async #loadRuns() {
    if (!this._scopeFolderKey) {
      this._runs = [];
      return;
    }
    const { data } = await MediaCuratorService.getRuns();
    this._runs = (data ?? []).filter((run) => run.scopeFolderKey === this._scopeFolderKey);
  }

  async #loadCount() {
    const key = this._scopeFolderKey;
    if (!key) return;
    const [{ data: count }, status, { data: folders }] = await Promise.all([
      MediaCuratorService.countMediaCuration({ path: { mediaKey: key } }),
      getBackgroundRun(key),
      new UmbMediaItemRepository(this).requestItems([key]),
    ]);
    if (key !== this._scopeFolderKey) return;
    this._count = count;
    this._scopeName = folders?.[0]?.name ?? "this folder";
    // A run started earlier (here or from the media tree) is still going: show it and follow it.
    if (status && isActive(status)) void this.#follow(status);
  }

  async #curateInBackground() {
    const key = this._scopeFolderKey;
    const count = this._count;
    if (!key || !count) return;
    if (this.#context?.getHasUnpersistedChanges()) {
      this.#notify("warning", "You have unsaved changes. Curation uses the last saved version of this ruleset.");
    }
    try {
      await umbConfirmModal(this, {
        headline: "Curate",
        content: html`<p>${backgroundConfirmMessage(this._scopeName, count.imageCount, count.threshold)}</p>
          <p>You can undo the run below, or from Settings › Media Curator › Activity log.</p>`,
        confirmLabel: "Curate in the background",
        color: "positive",
      });
    } catch {
      return;
    }

    this._busy = true;
    const response = await MediaCuratorService.executeCuration({
      body: { scopeFolderKey: key, recursive: true, permanentlyDeleteEmptyFolders: this.#permanentlyDeleteEmptyFolders },
    });
    this._busy = false;
    if (response.error || !response.data) {
      this.#notify("danger", `Curation failed: ${JSON.stringify(response.error ?? "no data")}`);
      return;
    }
    if (!response.data.queued) {
      // The scope shrank below the threshold since it was counted: it ran in the request.
      this.#notify("positive", resultMessage(response.data, this.#permanentlyDeleteEmptyFolders));
      await this.#loadRuns();
      return;
    }
    await this.#follow({
      scopeFolderKey: key,
      state: "queued",
      processed: 0,
      total: 0,
      imageCount: count.imageCount,
      moved: 0,
      alreadyInPlace: 0,
      failed: 0,
      foldersRemoved: 0,
      runKeys: [],
      changedFolderKeys: [],
      updated: new Date().toISOString(),
    });
  }

  async #follow(status: BulkRunStatusModel) {
    const key = status.scopeFolderKey;
    this._background = status;
    const run = await waitForBackgroundRun(key, (progress) => {
      if (key === this._scopeFolderKey) this._background = progress;
    });
    if (key !== this._scopeFolderKey) return;
    this._background = undefined;
    if (!run) {
      this.#notify("warning", `Lost track of the run for "${this._scopeName}" (the site may have restarted). Check the Activity log.`);
      return;
    }
    this.#notify(
      run.state === "completed" && run.failed === 0 ? "positive" : "warning",
      backgroundResultMessage(this._scopeName, run, this.#permanentlyDeleteEmptyFolders),
    );
    await this.#loadRuns();
  }

  async #dryRun() {
    if (!this._scopeFolderKey) return;
    if (this.#context?.getHasUnpersistedChanges()) {
      this.#notify("warning", "You have unsaved changes. The dry run uses the last saved version of this ruleset.");
    }
    this._busy = true;
    const response = await MediaCuratorService.planCuration({
      body: { scopeFolderKey: this._scopeFolderKey, recursive: true, permanentlyDeleteEmptyFolders: false },
    });
    this._busy = false;
    if (response.error || !response.data) {
      this.#notify("danger", `Could not plan: ${JSON.stringify(response.error ?? "no data")}`);
      return;
    }
    this._plan = response.data;
  }

  async #execute() {
    if (!this._scopeFolderKey) return;
    this._busy = true;
    const response = await MediaCuratorService.executeCuration({
      body: {
        scopeFolderKey: this._scopeFolderKey,
        recursive: true,
        permanentlyDeleteEmptyFolders: this.#permanentlyDeleteEmptyFolders,
      },
    });
    this._busy = false;
    if (response.error || !response.data) {
      this.#notify("danger", `Curation failed: ${JSON.stringify(response.error ?? "no data")}`);
      return;
    }
    this.#notify("positive", resultMessage(response.data, this.#permanentlyDeleteEmptyFolders));
    this._plan = undefined;
    await this.#loadRuns();
  }

  async #undo(run: CurationRunModel) {
    const response = await MediaCuratorService.undoRun({ path: { runKey: run.key } });
    if (response.error || !response.data) {
      this.#notify("danger", `Undo failed: ${JSON.stringify(response.error ?? "no data")}`);
      return;
    }
    const summary = response.data;
    this.#notify("positive", `Undo: ${summary.moved} restored, ${summary.alreadyInPlace} already in place, ${summary.failed} failed.`);
    await this.#loadRuns();
  }

  override render() {
    if (!this._scopeFolderKey) {
      return html`<uui-box headline="Curate">
        <p data-mark="mc:curate-no-scope">Choose a scope folder on the Settings tab and save the ruleset before curating.</p>
      </uui-box>`;
    }
    return html`${this._count?.runsInBackground ? this.#renderBackground() : this.#renderPlan()} ${this.#renderRuns()}`;
  }

  #renderBackground() {
    const count = this._count!;
    const run = this._background;
    return html`
      <uui-box headline="Curate" data-mark="mc:background-curate">
        ${run
          ? html`<p data-mark="mc:background-progress">${backgroundProgressMessage(this._scopeName, run)}</p>
              ${run.total > 0
                ? html`<uui-loader-bar progress=${Math.round((100 * run.processed) / run.total)}></uui-loader-bar>`
                : html`<uui-loader-bar></uui-loader-bar>`}`
          : html`<p>${backgroundConfirmMessage(this._scopeName, count.imageCount, count.threshold)}</p>
              <mc-empty-folders-option
                @change=${(event: Event) =>
                  (this.#permanentlyDeleteEmptyFolders = (event.target as McEmptyFoldersOptionElement).permanentlyDelete)}
              ></mc-empty-folders-option>
              <div class="actions">
                <uui-button
                  data-mark="mc:background-execute"
                  label="Curate in the background"
                  look="primary"
                  color="positive"
                  ?disabled=${this._busy}
                  @click=${() => this.#curateInBackground()}
                ></uui-button>
              </div>`}
      </uui-box>
    `;
  }

  #renderPlan() {
    const plan = this._plan;
    return html`
      <uui-box headline="Dry run" data-mark="mc:plan">
        <uui-button
          slot="header-actions"
          data-mark="mc:dry-run"
          label=${plan ? "Run again" : "Run dry run"}
          look=${plan ? "secondary" : "primary"}
          ?disabled=${this._busy}
          @click=${() => this.#dryRun()}
        ></uui-button>
        ${!plan
          ? html`<p>See where every item in the scope folder would go, before anything moves.</p>`
          : html`
              <p data-mark="mc:plan-summary">
                ${plan.moveCount === 0
                  ? "Nothing would move. Everything is already in place or no rules resolved."
                  : `${plan.moveCount} item(s) would move. Nothing has moved yet — review and confirm below.`}
              </p>
              ${(plan.moves ?? []).length > 0
                ? html`<uui-table>
                    <uui-table-head>
                      <uui-table-head-cell>Item</uui-table-head-cell>
                      <uui-table-head-cell>Target folder</uui-table-head-cell>
                      <uui-table-head-cell>Status</uui-table-head-cell>
                    </uui-table-head>
                    ${(plan.moves ?? []).map(
                      (move) => html`<uui-table-row data-mark="mc:plan-move">
                        <uui-table-cell>${move.mediaName}</uui-table-cell>
                        <uui-table-cell>${move.targetPath}</uui-table-cell>
                        <uui-table-cell>${move.alreadyInPlace ? "already in place" : "will move"}</uui-table-cell>
                      </uui-table-row>`,
                    )}
                  </uui-table>`
                : nothing}
              ${(plan.skippedItems ?? []).length > 0
                ? html`<details>
                    <summary>${(plan.skippedItems ?? []).length} item(s) skipped</summary>
                    <ul>
                      ${(plan.skippedItems ?? []).map((item) => html`<li>${item}</li>`)}
                    </ul>
                  </details>`
                : nothing}
              ${plan.moveCount > 0 || plan.emptyFolderCount > 0
                ? html`${plan.moveCount > 0
                      ? html`<p>${emptyFoldersLine(plan.emptyFolderCount)}</p>`
                      : html`<p data-mark="mc:plan-cleanup-only">${plural(plan.emptyFolderCount, "empty sub-folder", "empty sub-folders")} can be removed.</p>`}
                    <mc-empty-folders-option
                      @change=${(event: Event) =>
                        (this.#permanentlyDeleteEmptyFolders = (event.target as McEmptyFoldersOptionElement).permanentlyDelete)}
                    ></mc-empty-folders-option>
                    <div class="actions">
                      <uui-button
                        data-mark="mc:plan-execute"
                        label=${plan.moveCount > 0
                          ? `Move ${plan.moveCount} item(s)`
                          : `Remove ${plural(plan.emptyFolderCount, "empty folder", "empty folders")}`}
                        look="primary"
                        color="positive"
                        ?disabled=${this._busy}
                        @click=${() => this.#execute()}
                      ></uui-button>
                    </div>`
                : nothing}
            `}
      </uui-box>
    `;
  }

  #renderRuns() {
    if (this._runs.length === 0) return nothing;
    return html`
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
            (run) => html`<uui-table-row data-mark="mc:ruleset-run">
              <uui-table-cell>${new Date(run.started).toLocaleString()}</uui-table-cell>
              <uui-table-cell>${run.trigger}</uui-table-cell>
              <uui-table-cell>${run.moved}</uui-table-cell>
              <uui-table-cell>${run.alreadyInPlace}</uui-table-cell>
              <uui-table-cell>${run.failed}</uui-table-cell>
              <uui-table-cell>
                ${run.moved > 0 && !run.trigger.startsWith("undo:")
                  ? html`<uui-button
                      data-mark="mc:run-undo"
                      compact
                      look="secondary"
                      label="Undo run from ${new Date(run.started).toLocaleString()}"
                      @click=${() => this.#undo(run)}
                      >Undo</uui-button
                    >`
                  : nothing}
              </uui-table-cell>
            </uui-table-row>`,
          )}
        </uui-table>
      </uui-box>
    `;
  }

  static override styles = [
    css`
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
    `,
  ];
}

export default McRulesetCurateViewElement;

declare global {
  interface HTMLElementTagNameMap {
    "mc-ruleset-curate-view": McRulesetCurateViewElement;
  }
}
