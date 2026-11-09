import { css, customElement, html, nothing, state } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { UMB_NOTIFICATION_CONTEXT } from "@umbraco-cms/backoffice/notification";
import {
  MediaCuratorService,
  type ProvisioningApprovalModel,
  type RequirementReportModel,
} from "../../../api/index.js";
import { MC_RULESET_WORKSPACE_CONTEXT } from "../ruleset-workspace.context-token.js";

type Choice = "create" | "map" | "decline";

/** Requirements tab: media type properties the ruleset's providers need, with consent-based provisioning. */
@customElement("umbricians-media-curator-ruleset-requirements-view")
export class McRulesetRequirementsViewElement extends UmbLitElement {
  @state() private _report?: RequirementReportModel;
  @state() private _choices = new Map<string, Choice>();
  @state() private _loading = false;

  #unique?: string;
  #notifications?: typeof UMB_NOTIFICATION_CONTEXT.TYPE;

  constructor() {
    super();
    this.consumeContext(UMB_NOTIFICATION_CONTEXT, (context) => (this.#notifications = context));
    this.consumeContext(MC_RULESET_WORKSPACE_CONTEXT, (context) => {
      if (!context) return;
      this.observe(
        context.unique,
        (unique) => {
          if (!unique || unique === this.#unique) return;
          this.#unique = unique;
          void this.#check();
        },
        "_unique",
      );
    });
  }

  #notify(color: "positive" | "danger", message: string) {
    this.#notifications?.peek(color, { data: { message } });
  }

  #choiceKey(requirementAlias: string, mediaTypeAlias: string) {
    return `${requirementAlias}::${mediaTypeAlias}`;
  }

  async #check() {
    if (!this.#unique) return;
    this._loading = true;
    const response = await MediaCuratorService.checkRequirements({ path: { rulesetKey: this.#unique } });
    this._loading = false;
    if (!response.data) {
      this.#notify("danger", "Could not check requirements.");
      return;
    }
    const choices = new Map<string, Choice>();
    for (const item of response.data.items ?? []) {
      if (item.status !== "satisfied") {
        choices.set(this.#choiceKey(item.requirementAlias, item.mediaTypeAlias), "create");
      }
    }
    this._choices = choices;
    this._report = response.data;
  }

  async #apply() {
    const report = this._report;
    if (!report) return;
    const approvals: ProvisioningApprovalModel[] = [];
    for (const item of report.items ?? []) {
      if (item.status === "satisfied") continue;
      const choice = this._choices.get(this.#choiceKey(item.requirementAlias, item.mediaTypeAlias));
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
    await this.#check();
  }

  override render() {
    const report = this._report;
    return html`
      <uui-box headline="Property requirements" data-mark="mc:requirements">
        <uui-button
          slot="header-actions"
          data-mark="mc:requirements-check"
          label="Check again"
          look="secondary"
          ?disabled=${this._loading}
          @click=${() => this.#check()}
        ></uui-button>
        ${!report
          ? html`<uui-loader></uui-loader>`
          : html`
              <p class="intro">
                ${report.allSatisfied
                  ? html`<span data-mark="mc:requirements-ok"
                      >All requirements are satisfied. Providers in this ruleset have everything they need.</span
                    >`
                  : "The providers in this ruleset need the following media type properties. Nothing is changed without your approval — choose what to do per property."}
                Based on the last saved version of this ruleset.
              </p>
              ${(report.items ?? []).length > 0 ? this.#renderTable(report) : nothing}
              ${report.allSatisfied
                ? nothing
                : html`<div class="actions">
                    <uui-button
                      data-mark="mc:requirements-apply"
                      label="Apply approved changes"
                      look="primary"
                      color="positive"
                      @click=${() => this.#apply()}
                    ></uui-button>
                  </div>`}
            `}
      </uui-box>
    `;
  }

  #renderTable(report: RequirementReportModel) {
    return html`
      <uui-table>
        <uui-table-head>
          <uui-table-head-cell>Property</uui-table-head-cell>
          <uui-table-head-cell>Media type</uui-table-head-cell>
          <uui-table-head-cell>Status</uui-table-head-cell>
          <uui-table-head-cell>Action</uui-table-head-cell>
        </uui-table-head>
        ${(report.items ?? []).map((item) => {
          const key = this.#choiceKey(item.requirementAlias, item.mediaTypeAlias);
          const choice = this._choices.get(key);
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
                  : html`<uui-select
                      data-mark="mc:requirement-action"
                      label="Action"
                      .options=${[
                        { name: `Create '${item.requirementAlias}'`, value: "create", selected: choice === "create" },
                        ...(item.candidatePropertyAlias
                          ? [{ name: `Map onto '${item.candidatePropertyAlias}'`, value: "map", selected: choice === "map" }]
                          : []),
                        { name: "Decline (provider degraded)", value: "decline", selected: choice === "decline" },
                      ]}
                      @change=${(e: Event) => {
                        this._choices = new Map(this._choices).set(key, (e.target as HTMLSelectElement).value as Choice);
                      }}
                    ></uui-select>`}
              </uui-table-cell>
            </uui-table-row>
          `;
        })}
      </uui-table>
    `;
  }

  static override styles = [
    css`
      :host {
        display: block;
        padding: var(--uui-size-layout-1);
      }
      .intro {
        margin-top: 0;
      }
      .actions {
        display: flex;
        justify-content: flex-end;
        margin-top: var(--uui-size-space-5);
      }
    `,
  ];
}

export default McRulesetRequirementsViewElement;

declare global {
  interface HTMLElementTagNameMap {
    "umbricians-media-curator-ruleset-requirements-view": McRulesetRequirementsViewElement;
  }
}
