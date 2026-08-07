import {
  LitElement,
  css,
  html,
  customElement,
  state,
  repeat,
  nothing,
} from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { UMB_NOTIFICATION_CONTEXT } from "@umbraco-cms/backoffice/notification";
import { umbConfirmModal } from "@umbraco-cms/backoffice/modal";
import "../designer/rule-flow.element.js";
import {
  MediaCuratorService,
  type CurationPlanModel,
  type CurationRunModel,
  type ProviderModel,
  type ProvisioningApprovalModel,
  type RequirementReportModel,
  type RulesetModel,
  type RuleNodeModel,
  type MediaCuratorSiteSettingsModel,
  type ReanalyzeImageResultModel,
} from "../api/index.js";

/**
 * Media Curator dashboard: lists rulesets and provides a form-based rule editor.
 * (The visual node-based designer replaces the editor part in a later milestone.)
 */
@customElement("mediacurator-dashboard")
export class MediaCuratorDashboardElement extends UmbElementMixin(LitElement) {
  @state() private _rulesets: RulesetModel[] = [];
  @state() private _providers: ProviderModel[] = [];
  @state() private _editing?: RulesetModel;
  @state() private _loading = true;
  @state() private _requirements?: {
    ruleset: RulesetModel;
    report: RequirementReportModel;
    choices: Map<string, "create" | "map" | "decline">;
  };
  @state() private _plan?: { ruleset: RulesetModel; plan: CurationPlanModel };
  @state() private _runs: CurationRunModel[] = [];
  @state() private _settings?: MediaCuratorSiteSettingsModel;
  @state() private _savingSettings = false;
  @state() private _reanalyzeMediaKeys: string[] = [];
  @state() private _reanalyzeResults: ReanalyzeImageResultModel[] = [];
  @state() private _reanalyzing = false;

  #notifications?: typeof UMB_NOTIFICATION_CONTEXT.TYPE;

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
    this._loading = true;
    try {
      const [rulesets, providers, runs, settings] = await Promise.all([
        MediaCuratorService.getRulesets(),
        MediaCuratorService.getProviders(),
        MediaCuratorService.getRuns(),
        MediaCuratorService.getSettings(),
      ]);
      this._rulesets = rulesets.data ?? [];
      this._providers = providers.data ?? [];
      this._runs = runs.data ?? [];
      this._settings = settings.data ?? { persistImageDescription: true };
    } catch {
      this.#notify("danger", "Could not load Media Curator data. Check the server log and reload.");
    } finally {
      this._loading = false;
    }
  }

  async #dryRun(ruleset: RulesetModel) {
    const response = await MediaCuratorService.planCuration({
      body: { scopeFolderKey: ruleset.scopeRootKey, recursive: true },
    });
    if (response.error || !response.data) {
      this.#notify("danger", `Could not plan: ${JSON.stringify(response.error ?? "no data")}`);
      return;
    }
    this._plan = { ruleset, plan: response.data };
  }

  async #executePlan() {
    const current = this._plan;
    if (!current) return;
    const response = await MediaCuratorService.executeCuration({
      body: { scopeFolderKey: current.ruleset.scopeRootKey, recursive: true },
    });
    if (response.error || !response.data) {
      this.#notify("danger", `Curation failed: ${JSON.stringify(response.error ?? "no data")}`);
      return;
    }
    const s = response.data;
    this.#notify("positive", `Curated: ${s.moved} moved, ${s.alreadyInPlace} already in place, ${s.failed} failed.`);
    this._plan = undefined;
    await this.#load();
  }

  #notify(color: "positive" | "danger", message: string) {
    this.#notifications?.peek(color, { data: { message } });
  }

  #newRuleset() {
    this._editing = {
      key: "00000000-0000-0000-0000-000000000000",
      scopeRootKey: "",
      name: "",
      enabled: true,
      rules: [],
    } as unknown as RulesetModel;
  }

  #editRuleset(ruleset: RulesetModel) {
    this._editing = structuredClone(ruleset);
  }

  async #deleteRuleset(ruleset: RulesetModel) {
    try {
      await umbConfirmModal(this, {
        headline: "Delete ruleset",
        content: `Delete the ruleset "${ruleset.name}"? Media that has already been curated stays where it is.`,
        color: "danger",
        confirmLabel: "Delete",
      });
    } catch {
      return; // cancelled
    }
    await MediaCuratorService.deleteRuleset({ path: { key: ruleset.key! } });
    this.#notify("positive", `Deleted "${ruleset.name}".`);
    await this.#load();
  }

  async #save() {
    const editing = this._editing;
    if (!editing) return;
    const response = await MediaCuratorService.saveRuleset({ body: editing });
    if (response.error) {
      this.#notify("danger", `Could not save: ${JSON.stringify(response.error)}`);
      return;
    }
    this.#notify("positive", `Saved "${editing.name}".`);
    this._editing = undefined;
    await this.#load();
  }

  #onScopeChange(e: Event) {
    const selection = (e.target as { selection?: string[] }).selection;
    if (this._editing && selection?.length) {
      this._editing = { ...this._editing, scopeRootKey: selection[0] };
    }
  }

  async #verifyRequirements(ruleset: RulesetModel) {
    const response = await MediaCuratorService.checkRequirements({ path: { rulesetKey: ruleset.key! } });
    if (!response.data) {
      this.#notify("danger", "Could not check requirements.");
      return;
    }
    const choices = new Map<string, "create" | "map" | "decline">();
    for (const item of response.data.items ?? []) {
      if (item.status !== "satisfied") {
        choices.set(this.#choiceKey(item.requirementAlias, item.mediaTypeAlias), "create");
      }
    }
    this._requirements = { ruleset, report: response.data, choices };
  }

  #choiceKey(requirementAlias: string, mediaTypeAlias: string) {
    return `${requirementAlias}::${mediaTypeAlias}`;
  }

  async #applyRequirements() {
    const req = this._requirements;
    if (!req) return;
    const approvals: ProvisioningApprovalModel[] = [];
    for (const item of req.report.items ?? []) {
      if (item.status === "satisfied") continue;
      const choice = req.choices.get(this.#choiceKey(item.requirementAlias, item.mediaTypeAlias));
      if (!choice || choice === "decline") continue;
      approvals.push({
        requirementAlias: item.requirementAlias,
        mediaTypeAlias: item.mediaTypeAlias,
        action: choice,
        mapToPropertyAlias: choice === "map" ? item.candidatePropertyAlias : undefined,
      });
    }
    const response = await MediaCuratorService.applyRequirements({ body: approvals });
    if (response.error) {
      this.#notify("danger", `Could not apply: ${JSON.stringify(response.error)}`);
      return;
    }
    const result = response.data!;
    if ((result.errors ?? []).length > 0) {
      this.#notify("danger", `Some changes failed: ${(result.errors ?? []).join("; ")}`);
    } else {
      this.#notify(
        "positive",
        `Provisioned ${(result.createdProperties ?? []).length} propert(y/ies), mapped ${(result.mappedProperties ?? []).length}.`,
      );
    }
    // Re-check so the dialog reflects the new state.
    await this.#verifyRequirements(req.ruleset);
  }

  override render() {
    if (this._loading) return html`<uui-loader></uui-loader>`;
    if (this._plan) return this.#renderPlan();
    if (this._requirements) return this.#renderRequirements();
    return this._editing ? this.#renderEditor() : this.#renderList();
  }

  #renderPlan() {
    const { ruleset, plan } = this._plan!;
    return html`
      <uui-box headline="Dry run — ${ruleset.name}" data-mark="mc:plan">
        <p data-mark="mc:plan-summary">
          ${plan.moveCount === 0
            ? "Nothing would move. Everything is already in place or no rules resolved."
            : `${plan.moveCount} item(s) would move. Nothing has moved yet — review and confirm below.`}
        </p>
        ${(plan.moves ?? []).length > 0
          ? html`
              <uui-table>
                <uui-table-head>
                  <uui-table-head-cell>Item</uui-table-head-cell>
                  <uui-table-head-cell>Target folder</uui-table-head-cell>
                  <uui-table-head-cell>Status</uui-table-head-cell>
                </uui-table-head>
                ${(plan.moves ?? []).map(
                  (m) => html`
                    <uui-table-row data-mark="mc:plan-move">
                      <uui-table-cell>${m.mediaName}</uui-table-cell>
                      <uui-table-cell>${m.targetPath}</uui-table-cell>
                      <uui-table-cell>${m.alreadyInPlace ? "already in place" : "will move"}</uui-table-cell>
                    </uui-table-row>
                  `,
                )}
              </uui-table>
            `
          : nothing}
        ${(plan.skippedItems ?? []).length > 0
          ? html`<details>
              <summary>${(plan.skippedItems ?? []).length} item(s) skipped</summary>
              <ul>
                ${(plan.skippedItems ?? []).map((s) => html`<li>${s}</li>`)}
              </ul>
            </details>`
          : nothing}
        <div class="actions">
          <uui-button label="Cancel" look="secondary" @click=${() => (this._plan = undefined)}></uui-button>
          ${plan.moveCount > 0
            ? html`<uui-button
                data-mark="mc:plan-execute"
                label="Move ${plan.moveCount} item(s)"
                look="primary"
                color="positive"
                @click=${this.#executePlan}
              ></uui-button>`
            : nothing}
        </div>
      </uui-box>
    `;
  }

  #renderRequirements() {
    const { ruleset, report, choices } = this._requirements!;
    return html`
      <uui-box headline="Property requirements — ${ruleset.name}" data-mark="mc:requirements">
        ${report.allSatisfied
          ? html`<p data-mark="mc:requirements-ok">
              All requirements are satisfied. Providers in this ruleset have everything they need.
            </p>`
          : html`<p>
              The providers in this ruleset need the following media type properties. Nothing is
              changed without your approval — choose what to do per property.
            </p>`}
        <uui-table>
          <uui-table-head>
            <uui-table-head-cell>Property</uui-table-head-cell>
            <uui-table-head-cell>Media type</uui-table-head-cell>
            <uui-table-head-cell>Status</uui-table-head-cell>
            <uui-table-head-cell>Action</uui-table-head-cell>
          </uui-table-head>
          ${(report.items ?? []).map((item) => {
            const key = this.#choiceKey(item.requirementAlias, item.mediaTypeAlias);
            return html`
              <uui-table-row data-mark="mc:requirement-row">
                <uui-table-cell>
                  <strong>${item.requirementName}</strong><br />
                  <small>${item.requirementAlias}${item.mandatory ? " (required)" : " (optional)"}</small>
                </uui-table-cell>
                <uui-table-cell>${item.mediaTypeAlias}</uui-table-cell>
                <uui-table-cell>
                  <uui-tag
                    color=${item.status === "satisfied" ? "positive" : item.status === "partialMatch" ? "warning" : "danger"}
                    data-mark="mc:requirement-status"
                    >${item.status}</uui-tag
                  >
                </uui-table-cell>
                <uui-table-cell>
                  ${item.status === "satisfied"
                    ? html`—`
                    : html`
                        <uui-select
                          data-mark="mc:requirement-action"
                          label="Action"
                          .options=${[
                            { name: `Create '${item.requirementAlias}'`, value: "create", selected: choices.get(key) === "create" },
                            ...(item.candidatePropertyAlias
                              ? [{ name: `Map onto '${item.candidatePropertyAlias}'`, value: "map", selected: choices.get(key) === "map" }]
                              : []),
                            { name: "Decline (provider degraded)", value: "decline", selected: choices.get(key) === "decline" },
                          ]}
                          @change=${(e: Event) => {
                            choices.set(key, (e.target as HTMLSelectElement).value as "create" | "map" | "decline");
                            this.requestUpdate();
                          }}
                        ></uui-select>
                      `}
                </uui-table-cell>
              </uui-table-row>
            `;
          })}
        </uui-table>
        <div class="actions">
          <uui-button label="Close" look="secondary" @click=${() => (this._requirements = undefined)}></uui-button>
          ${report.allSatisfied
            ? nothing
            : html`<uui-button
                data-mark="mc:requirements-apply"
                label="Apply approved changes"
                look="primary"
                color="positive"
                @click=${this.#applyRequirements}
              ></uui-button>`}
        </div>
      </uui-box>
    `;
  }

  async #saveSettings() {
    if (!this._settings) return;
    this._savingSettings = true;
    try {
      const response = await MediaCuratorService.saveSettings({ body: this._settings });
      if (response.error || !response.data) {
        this.#notify("danger", `Could not save settings: ${JSON.stringify(response.error ?? "no data")}`);
        return;
      }
      this._settings = response.data;
      this.#notify("positive", "Settings saved.");
    } finally {
      this._savingSettings = false;
    }
  }

  #onReanalyzeMediaChange(e: Event) {
    const selection = (e.target as { selection?: string[] }).selection ?? [];
    this._reanalyzeMediaKeys = selection;
    this._reanalyzeResults = [];
  }

  async #reanalyzeImages() {
    if (this._reanalyzeMediaKeys.length === 0) {
      this.#notify("danger", "Choose at least one image to re-analyze.");
      return;
    }

    this._reanalyzing = true;
    try {
      const response = await MediaCuratorService.reanalyzeImages({
        body: { mediaKeys: this._reanalyzeMediaKeys },
      });
      if (response.error || !response.data) {
        this.#notify("danger", `Re-analyze failed: ${JSON.stringify(response.error ?? "no data")}`);
        return;
      }

      this._reanalyzeResults = response.data.results ?? [];
      const analyzed = this._reanalyzeResults.filter((r) => r.analyzed).length;
      const failed = this._reanalyzeResults.length - analyzed;
      if (failed === 0) {
        this.#notify("positive", `Re-analyzed ${analyzed} image(s).`);
      } else {
        this.#notify(
          "danger",
          `Re-analyzed ${analyzed} image(s); ${failed} could not be analyzed. See results below.`,
        );
      }
    } finally {
      this._reanalyzing = false;
    }
  }

  #renderReanalyze() {
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
            .selection=${this._reanalyzeMediaKeys}
            @change=${this.#onReanalyzeMediaChange}
          ></umb-input-media>
        </div>
        <div class="actions">
          <uui-button
            data-mark="mc:reanalyze-run"
            label="Re-analyze selected"
            look="primary"
            color="positive"
            .state=${this._reanalyzing ? "waiting" : undefined}
            ?disabled=${this._reanalyzeMediaKeys.length === 0}
            @click=${this.#reanalyzeImages}
          ></uui-button>
        </div>
        ${this._reanalyzeResults.length > 0
          ? html`
              <uui-table>
                <uui-table-head>
                  <uui-table-head-cell>Image</uui-table-head-cell>
                  <uui-table-head-cell>Description</uui-table-head-cell>
                  <uui-table-head-cell>Tags</uui-table-head-cell>
                  <uui-table-head-cell>Code</uui-table-head-cell>
                </uui-table-head>
                ${this._reanalyzeResults.map(
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

  #renderSettings() {
    const settings = this._settings;
    if (!settings) return nothing;
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
            .state=${this._savingSettings ? "waiting" : undefined}
            @click=${this.#saveSettings}
          ></uui-button>
        </div>
      </uui-box>
    `;
  }

  #renderList() {
    return html`
      ${this.#renderSettings()}
      ${this.#renderReanalyze()}
      <uui-box headline="Curation rulesets">
        <uui-button
          slot="header-actions"
          look="primary"
          label="Create ruleset"
          @click=${this.#newRuleset}
        ></uui-button>
        ${this._rulesets.length === 0
          ? html`<p data-mark="mc:empty">
              No rulesets yet. Create one and attach it to a media folder to start curating.
            </p>`
          : html`
              <uui-table>
                <uui-table-head>
                  <uui-table-head-cell>Name</uui-table-head-cell>
                  <uui-table-head-cell>Rules</uui-table-head-cell>
                  <uui-table-head-cell>Enabled</uui-table-head-cell>
                  <uui-table-head-cell></uui-table-head-cell>
                </uui-table-head>
                ${repeat(
                  this._rulesets,
                  (r) => r.key,
                  (r) => html`
                    <uui-table-row data-mark="mc:ruleset-row">
                      <uui-table-cell>${r.name}</uui-table-cell>
                      <uui-table-cell>${r.rules?.length ?? 0}</uui-table-cell>
                      <uui-table-cell>${r.enabled ? "Yes" : "No"}</uui-table-cell>
                      <uui-table-cell>
                        <uui-button
                          label="Edit ${r.name}"
                          look="secondary"
                          @click=${() => this.#editRuleset(r)}
                        ></uui-button>
                        <uui-button
                          label="Requirements for ${r.name}"
                          look="secondary"
                          @click=${() => this.#verifyRequirements(r)}
                        ></uui-button>
                        <uui-button
                          label="Curate now ${r.name}"
                          look="primary"
                          @click=${() => this.#dryRun(r)}
                        ></uui-button>
                        <uui-button
                          label="Delete ${r.name}"
                          look="secondary"
                          color="danger"
                          @click=${() => this.#deleteRuleset(r)}
                        ></uui-button>
                      </uui-table-cell>
                    </uui-table-row>
                  `,
                )}
              </uui-table>
            `}
      </uui-box>
      ${this.#renderActivityLog()}
    `;
  }

  async #undoRun(run: CurationRunModel) {
    const response = await MediaCuratorService.undoRun({ path: { runKey: run.key } });
    if (response.error || !response.data) {
      this.#notify("danger", `Undo failed: ${JSON.stringify(response.error ?? "no data")}`);
      return;
    }
    const s = response.data;
    this.#notify("positive", `Undo: ${s.moved} restored, ${s.alreadyInPlace} already in place, ${s.failed} failed.`);
    await this.#load();
  }

  #renderActivityLog() {
    if (this._runs.length === 0) return nothing;
    return html`
      <uui-box headline="Activity log" data-mark="mc:activity-log">
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
            (run) => html`
              <uui-table-row data-mark="mc:run-row">
                <uui-table-cell>${new Date(run.started).toLocaleString()}</uui-table-cell>
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
                    : nothing}
                </uui-table-cell>
              </uui-table-row>
            `,
          )}
        </uui-table>
      </uui-box>
    `;
  }

  #renderEditor() {
    const editing = this._editing!;
    return html`
      <uui-box headline=${editing.name ? `Edit: ${editing.name}` : "New ruleset"}>
        <div class="form">
          <uui-label for="mc-name">Name</uui-label>
          <uui-input
            id="mc-name"
            data-mark="mc:name"
            label="Ruleset name"
            .value=${editing.name ?? ""}
            @input=${(e: InputEvent) =>
              (this._editing = { ...editing, name: (e.target as HTMLInputElement).value })}
          ></uui-input>

          <uui-label>Scope folder</uui-label>
          <umb-input-media
            data-mark="mc:scope"
            .max=${1}
            .selection=${editing.scopeRootKey ? [editing.scopeRootKey] : []}
            @change=${this.#onScopeChange}
          ></umb-input-media>

          <uui-label>Enabled</uui-label>
          <uui-toggle
            data-mark="mc:enabled"
            label="Enabled"
            .checked=${editing.enabled ?? true}
            @change=${(e: Event) =>
              (this._editing = { ...editing, enabled: (e.target as HTMLInputElement).checked })}
          ></uui-toggle>
        </div>

        <h4 class="rules-heading">Rules</h4>
        <div class="rules-editor">
          <mc-rule-flow
            .rules=${editing.rules ?? []}
            .providers=${this._providers}
            .scopeName=${editing.name || "Scope"}
            @rules-change=${(e: CustomEvent<{ rules: RuleNodeModel[] }>) => {
              const current = this._editing;
              if (!current) return;
              this._editing = { ...current, rules: e.detail.rules };
            }}
          ></mc-rule-flow>
        </div>

        <div class="actions">
          <uui-button label="Cancel" look="secondary" @click=${() => (this._editing = undefined)}></uui-button>
          <uui-button data-mark="mc:save" label="Save" look="primary" color="positive" @click=${this.#save}></uui-button>
        </div>
      </uui-box>
    `;
  }

  static override styles = [
    css`
      :host {
        display: block;
        padding: var(--uui-size-layout-1);
      }
      .form {
        display: grid;
        grid-template-columns: 180px 1fr;
        gap: var(--uui-size-space-3) var(--uui-size-space-5);
        align-items: center;
        margin-bottom: var(--uui-size-space-5);
      }
      .rule {
        margin-bottom: var(--uui-size-space-4);
      }
      .actions {
        display: flex;
        gap: var(--uui-size-space-3);
        justify-content: flex-end;
        margin-top: var(--uui-size-space-5);
      }
      .rules-heading {
        position: relative;
        z-index: 0;
        pointer-events: none;
      }
      .rules-editor {
        position: relative;
        z-index: 1;
        isolation: isolate;
      }
    `,
  ];
}

export default MediaCuratorDashboardElement;

declare global {
  interface HTMLElementTagNameMap {
    "mediacurator-dashboard": MediaCuratorDashboardElement;
  }
}
