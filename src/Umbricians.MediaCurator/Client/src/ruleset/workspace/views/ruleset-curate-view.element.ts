import { css, customElement, html, nothing, state } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { UMB_NOTIFICATION_CONTEXT } from "@umbraco-cms/backoffice/notification";
import { MediaCuratorService, type CurationPlanModel, type CurationRunModel } from "../../../api/index.js";
import { MC_EMPTY_GUID } from "../../entity.js";
import { MC_RULESET_WORKSPACE_CONTEXT } from "../ruleset-workspace.context-token.js";

/** Curate tab: dry run the saved ruleset against its scope folder, apply it, and see this folder's runs. */
@customElement("mc-ruleset-curate-view")
export class McRulesetCurateViewElement extends UmbLitElement {
  @state() private _scopeFolderKey?: string;
  @state() private _plan?: CurationPlanModel;
  @state() private _runs: CurationRunModel[] = [];
  @state() private _busy = false;

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
          void this.#loadRuns();
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

  async #dryRun() {
    if (!this._scopeFolderKey) return;
    if (this.#context?.getHasUnpersistedChanges()) {
      this.#notify("warning", "You have unsaved changes. The dry run uses the last saved version of this ruleset.");
    }
    this._busy = true;
    const response = await MediaCuratorService.planCuration({
      body: { scopeFolderKey: this._scopeFolderKey, recursive: true },
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
      body: { scopeFolderKey: this._scopeFolderKey, recursive: true },
    });
    this._busy = false;
    if (response.error || !response.data) {
      this.#notify("danger", `Curation failed: ${JSON.stringify(response.error ?? "no data")}`);
      return;
    }
    const summary = response.data;
    this.#notify(
      "positive",
      `Curated: ${summary.moved} moved, ${summary.alreadyInPlace} already in place, ${summary.failed} failed.`,
    );
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
    return html`${this.#renderPlan()} ${this.#renderRuns()}`;
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
              ${plan.moveCount > 0
                ? html`<div class="actions">
                    <uui-button
                      data-mark="mc:plan-execute"
                      label="Move ${plan.moveCount} item(s)"
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
