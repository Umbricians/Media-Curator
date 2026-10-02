import { css, customElement, html, nothing, state } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalBaseElement } from "@umbraco-cms/backoffice/modal";
import type { RuleNodeModel } from "../api/index.js";
import type { McRuleSettingsModalData, McRuleSettingsModalValue } from "./rule-settings-modal.token.js";
import {
  applyDatasetChange, buildDatasetValue, changeProvider, editorForField, finalizeRule,
} from "./rule-settings.logic.js";

const FALLBACKS = [
  { name: "Skip this level", value: "skip" },
  { name: "Use 'Unsorted' folder", value: "unsorted" },
  { name: "Leave item in place", value: "stop" },
];

@customElement("mc-rule-settings-modal")
export class McRuleSettingsModalElement extends UmbModalBaseElement<McRuleSettingsModalData, McRuleSettingsModalValue> {
  @state() private _rule?: RuleNodeModel;
  /** Dataset value is only rebuilt on provider change, so typing never re-renders editors with stale values. */
  @state() private _dataset: Array<{ alias: string; value: unknown }> = [];

  override connectedCallback() {
    super.connectedCallback();
    if (this._rule || !this.data) return;
    this._rule = { ...this.data.rule, settings: { ...(this.data.rule.settings ?? {}) } };
    this.#resetDataset();
  }

  get #provider() {
    return this.data?.providers.find((p) => p.alias === this._rule?.providerAlias);
  }

  #resetDataset() {
    this._dataset = buildDatasetValue(this.#provider, this._rule?.settings);
  }

  #onProviderChange(e: Event) {
    const alias = (e.target as HTMLSelectElement).value;
    const next = this.data?.providers.find((p) => p.alias === alias);
    if (!next || !this._rule) return;
    this._rule = changeProvider(this._rule, next);
    this.#resetDataset();
  }

  #onDatasetChange(e: Event) {
    const value = (e.target as unknown as { value?: Array<{ alias: string; value: unknown }> }).value;
    if (!this._rule || !Array.isArray(value)) return;
    // Local state is the source of truth; _dataset is intentionally not updated here.
    this._rule = { ...this._rule, settings: applyDatasetChange(this.#provider, this._rule.settings, value) };
  }

  #submit() {
    if (!this._rule) return;
    this.value = { rule: finalizeRule(this._rule) };
    this._submitModal();
  }

  override render() {
    const rule = this._rule;
    const data = this.data;
    if (!rule || !data) return nothing;
    const provider = this.#provider;
    const fields = provider?.settingsFields ?? [];
    return html`
      <umb-body-layout headline=${data.isNew ? "Add rule" : (provider?.name ?? "Rule")}>
        <div id="content">
          <uui-box>
            <umb-property-layout label="Provider" orientation="vertical" mandatory>
              <uui-select
                slot="editor"
                data-mark="mc:settings-provider"
                label="Provider"
                .value=${rule.providerAlias}
                .options=${data.providers.map((p) => ({ name: p.name, value: p.alias, selected: p.alias === rule.providerAlias }))}
                @change=${this.#onProviderChange}></uui-select>
            </umb-property-layout>
            ${data.isChild
              ? html`<umb-property-layout
                  label="Condition"
                  description="Only apply this rule when the parent rule's folder value equals this (case-insensitive). Leave empty to always apply."
                  orientation="vertical">
                  <uui-input
                    slot="editor"
                    data-mark="mc:settings-condition"
                    label="Condition"
                    placeholder="Always"
                    .value=${rule.condition ?? ""}
                    @input=${(e: Event) => {
                      if (this._rule) this._rule = { ...this._rule, condition: (e.target as HTMLInputElement).value || undefined };
                    }}></uui-input>
                </umb-property-layout>`
              : nothing}
            <umb-property-layout
              label="If unresolved"
              description="What happens when this rule can't produce a folder for an item."
              orientation="vertical">
              <uui-select
                slot="editor"
                data-mark="mc:settings-fallback"
                label="If unresolved"
                .options=${FALLBACKS.map((o) => ({ ...o, selected: o.value === rule.fallback }))}
                @change=${(e: Event) => {
                  if (this._rule) this._rule = { ...this._rule, fallback: (e.target as HTMLSelectElement).value };
                }}></uui-select>
            </umb-property-layout>
          </uui-box>
          ${fields.length
            ? html`<uui-box>
                <umb-property-dataset .value=${this._dataset} @change=${this.#onDatasetChange}>
                  ${fields.map((field) => {
                    const editor = editorForField(field);
                    return html`<umb-property
                      label=${field.label}
                      description=${field.description ?? ""}
                      alias=${field.alias}
                      data-mark=${"mc:setting-" + field.alias}
                      property-editor-ui-alias=${editor.editorUiAlias}
                      .config=${editor.config}
                      .appearance=${{ labelOnTop: true }}></umb-property>`;
                  })}
                </umb-property-dataset>
              </uui-box>`
            : nothing}
        </div>
        <div slot="actions">
          <uui-button data-mark="mc:settings-close" label="Close" @click=${() => this._rejectModal()}></uui-button>
          <uui-button data-mark="mc:settings-save" look="primary" color="positive" label="Save" @click=${() => this.#submit()}></uui-button>
        </div>
      </umb-body-layout>
    `;
  }

  static override styles = [
    css`
      #content {
        display: flex;
        flex-direction: column;
        gap: var(--uui-size-layout-1);
      }
      umb-property-layout {
        padding: var(--uui-size-space-3) 0;
      }
      uui-select,
      uui-input,
      uui-textarea {
        width: 100%;
      }
      umb-property {
        display: block;
        width: 100%;
        /* each umb-property carries 20px top/bottom padding internally; halve the gap */
        margin-block: calc(var(--uui-size-layout-1) / -2);
      }
    `,
  ];
}

export default McRuleSettingsModalElement;

declare global {
  interface HTMLElementTagNameMap {
    "mc-rule-settings-modal": McRuleSettingsModalElement;
  }
}
