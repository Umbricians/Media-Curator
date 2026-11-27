import {
  LitElement,
  css,
  html,
  customElement,
  property,
  nothing,
  repeat,
} from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import type { ProviderModel, RuleNodeModel, SettingFieldModel } from "../api/index.js";
import { addChildAt, defaultSettings, moveSibling, removeAt, sampleSegment, updateAt } from "./rule-tree.logic.js";

/**
 * Node-based ruleset designer (§11.1): a constrained vertical tree on UUI primitives that
 * replicates the Automate-style canvas UX — each rule is a node, conditional children
 * branch beneath their parent with labelled edges, and every leaf shows a live example
 * path so the nesting structure is legible before anything runs.
 */
@customElement("umbricians-media-curator-rule-tree")
export class McRuleTreeElement extends UmbElementMixin(LitElement) {
  @property({ attribute: false }) rules: RuleNodeModel[] = [];
  @property({ attribute: false }) providers: ProviderModel[] = [];
  @property({ attribute: false }) scopeName = "Scope";

  #emitChange(rules: RuleNodeModel[]) {
    this.rules = rules;
    this.dispatchEvent(new CustomEvent("rules-change", { detail: { rules }, bubbles: false }));
  }

  #provider(alias: string) {
    return this.providers.find((p) => p.alias === alias);
  }

  #newRule(): RuleNodeModel | undefined {
    const provider = this.providers[0];
    if (!provider) return undefined;
    return {
      providerAlias: provider.alias,
      settings: defaultSettings(provider),
      fallback: "skip",
      children: [],
    };
  }

  #addRoot() {
    const rule = this.#newRule();
    if (rule) this.#emitChange([...this.rules, rule]);
  }

  #addChild(path: number[]) {
    const rule = this.#newRule();
    if (rule) this.#emitChange(addChildAt(this.rules, path, rule));
  }

  #remove(path: number[]) {
    this.#emitChange(removeAt(this.rules, path));
  }

  #move(path: number[], delta: number) {
    this.#emitChange(moveSibling(this.rules, path, delta));
  }

  override render() {
    return html`
      <div class="canvas" data-mark="mc:canvas">
        <div class="scope-node" data-mark="mc:canvas-scope">
          <uui-icon name="icon-folder"></uui-icon>
          <strong>${this.scopeName}</strong>
          <small>scope</small>
        </div>
        ${this.rules.length === 0
          ? html`<p class="empty">No rules yet. Each rule node contributes folder levels beneath the scope.</p>`
          : html`<div class="level">${repeat(this.rules, (_, i) => i, (rule, i) => this.#renderNode(rule, [i], []))}</div>`}
        <uui-button data-mark="mc:canvas-add" look="secondary" label="Add rule" @click=${this.#addRoot}></uui-button>
      </div>
    `;
  }

  #renderNode(node: RuleNodeModel, path: number[], prefix: string[]): unknown {
    const provider = this.#provider(node.providerAlias);
    const hasRequirements = (provider?.requirements ?? []).length > 0;
    const isChild = path.length > 1;
    const isLeaf = (node.children ?? []).length === 0;

    return html`
      <div class="branch">
        ${isChild
          ? html`<div class="edge" data-mark="mc:edge">
              ${node.condition
                ? html`<span class="edge-label" data-mark="mc:edge-condition">when “${node.condition}”</span>`
                : html`<span class="edge-label edge-label--always">always</span>`}
            </div>`
          : nothing}
        <uui-box class="node" data-mark="mc:node">
          <div slot="header" class="node-header">
            <uui-icon name=${provider?.icon ?? "icon-box"}></uui-icon>
            <uui-select
              data-mark="mc:node-provider"
              label="Provider"
              .options=${this.providers.map((p) => ({
                name: p.name,
                value: p.alias,
                selected: p.alias === node.providerAlias,
              }))}
              @change=${(e: Event) => {
                const alias = (e.target as HTMLSelectElement).value;
                const next = this.#provider(alias);
                this.#emitChange(updateAt(this.rules, path, (n) => ({
                  ...n,
                  providerAlias: alias,
                  settings: next ? defaultSettings(next) : {},
                })));
              }}
            ></uui-select>
            ${hasRequirements
              ? html`<uui-tag color="warning" data-mark="mc:node-requirements" title="This provider declares media type property requirements — verify them from the ruleset list.">needs properties</uui-tag>`
              : nothing}
          </div>
          <div slot="header-actions" class="node-actions">
            <uui-button compact label="Move up" title="Move up" @click=${() => this.#move(path, -1)}>↑</uui-button>
            <uui-button compact label="Move down" title="Move down" @click=${() => this.#move(path, 1)}>↓</uui-button>
            <uui-button compact color="danger" label="Remove rule" title="Remove" @click=${() => this.#remove(path)}>✕</uui-button>
          </div>

          <div class="node-body">
            ${isChild
              ? html`
                  <uui-label>Condition (parent value)</uui-label>
                  <uui-input
                    data-mark="mc:node-condition"
                    label="Condition"
                    placeholder="leave empty for always"
                    .value=${node.condition ?? ""}
                    @input=${(e: InputEvent) =>
                      this.#emitChange(
                        updateAt(this.rules, path, (n) => ({
                          ...n,
                          condition: (e.target as HTMLInputElement).value || undefined,
                        })),
                      )}
                  ></uui-input>
                `
              : nothing}
            ${(provider?.settingsFields ?? []).map((field) => this.#renderSettingField(node, path, field))}
            <uui-label>If unresolved</uui-label>
            <uui-select
              data-mark="mc:node-fallback"
              label="If unresolved"
              .options=${["skip", "unsorted", "stop"].map((v) => ({
                name: v === "skip" ? "Skip this level" : v === "unsorted" ? "Use 'Unsorted' folder" : "Leave item in place",
                value: v,
                selected: node.fallback === v,
              }))}
              @change=${(e: Event) =>
                this.#emitChange(
                  updateAt(this.rules, path, (n) => ({ ...n, fallback: (e.target as HTMLSelectElement).value })),
                )}
            ></uui-select>
          </div>

          ${isLeaf
            ? html`<div class="example" data-mark="mc:node-example" title="Example resulting folder path">
                <uui-icon name="icon-folder"></uui-icon> ${[this.scopeName, ...prefix, sampleSegment(node, this.providers)].join("/")}
              </div>`
            : nothing}

          <uui-button
            class="add-child"
            data-mark="mc:node-add-child"
            compact
            look="secondary"
            label="Add child rule"
            @click=${() => this.#addChild(path)}
          ></uui-button>
        </uui-box>
        ${(node.children ?? []).length > 0
          ? html`<div class="level level--nested">
              ${repeat(node.children ?? [], (_, i) => i, (child, i) => this.#renderNode(child, [...path, i], [...prefix, sampleSegment(node, this.providers)]))}
            </div>`
          : nothing}
      </div>
    `;
  }

  #renderSettingField(node: RuleNodeModel, path: number[], field: SettingFieldModel) {
    const settings = (node.settings ?? {}) as Record<string, unknown>;
    const current = settings[field.alias] ?? field.defaultValue ?? "";
    const set = (value: unknown) =>
      this.#emitChange(updateAt(this.rules, path, (n) => ({
        ...n,
        settings: { ...(n.settings ?? {}), [field.alias]: value } as NonNullable<RuleNodeModel["settings"]>,
      })));

    switch (field.type) {
      case "select":
        return html`
          <uui-label title=${field.description ?? ""}>${field.label}</uui-label>
          <uui-select
            data-mark="mc:setting-${field.alias}"
            label=${field.label}
            .options=${(field.options ?? []).map((o) => ({ name: o.label, value: o.value, selected: o.value === current }))}
            @change=${(e: Event) => set((e.target as HTMLSelectElement).value)}
          ></uui-select>
        `;
      case "toggle":
        return html`
          <uui-label title=${field.description ?? ""}>${field.label}</uui-label>
          <uui-toggle
            data-mark="mc:setting-${field.alias}"
            label=${field.label}
            .checked=${current === true || current === "true"}
            @change=${(e: Event) => set((e.target as HTMLInputElement).checked)}
          ></uui-toggle>
        `;
      case "number":
        return html`
          <uui-label title=${field.description ?? ""}>${field.label}</uui-label>
          <uui-input
            data-mark="mc:setting-${field.alias}"
            type="number"
            label=${field.label}
            .value=${String(current)}
            @input=${(e: InputEvent) => set((e.target as HTMLInputElement).value)}
          ></uui-input>
        `;
      default: {
        const multiline = field.alias === "mappings" || field.alias === "palette";
        return multiline
          ? html`
              <uui-label title=${field.description ?? ""}>${field.label}</uui-label>
              <uui-textarea
                data-mark="mc:setting-${field.alias}"
                label=${field.label}
                .value=${String(current)}
                @input=${(e: InputEvent) => set((e.target as HTMLTextAreaElement).value)}
              ></uui-textarea>
            `
          : html`
              <uui-label title=${field.description ?? ""}>${field.label}</uui-label>
              <uui-input
                data-mark="mc:setting-${field.alias}"
                label=${field.label}
                .value=${String(current)}
                @input=${(e: InputEvent) => set((e.target as HTMLInputElement).value)}
              ></uui-input>
            `;
      }
    }
  }

  static override styles = [
    css`
      :host {
        display: block;
      }
      .canvas {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 0;
      }
      .scope-node {
        display: inline-flex;
        align-items: center;
        gap: var(--uui-size-space-3);
        align-self: flex-start;
        padding: var(--uui-size-space-3) var(--uui-size-space-5);
        background: var(--uui-color-surface-alt);
        border: 1px solid var(--uui-color-border);
        border-radius: var(--uui-border-radius);
      }
      .level {
        margin-left: var(--uui-size-space-6);
        padding-left: var(--uui-size-space-6);
        border-left: 2px solid var(--uui-color-border);
        display: flex;
        flex-direction: column;
        gap: var(--uui-size-space-4);
        padding-top: var(--uui-size-space-4);
        padding-bottom: var(--uui-size-space-4);
      }
      .node {
        max-width: 640px;
      }
      .node-header {
        display: flex;
        align-items: center;
        gap: var(--uui-size-space-3);
      }
      .node-actions {
        display: flex;
        gap: var(--uui-size-space-1);
      }
      .node-body {
        display: grid;
        grid-template-columns: 160px 1fr;
        gap: var(--uui-size-space-2) var(--uui-size-space-4);
        align-items: center;
      }
      .edge {
        margin-left: var(--uui-size-space-6);
      }
      .edge-label {
        font-size: 0.8rem;
        background: var(--uui-color-current, #f5c1bc);
        border-radius: 1em;
        padding: 0 var(--uui-size-space-3);
      }
      .edge-label--always {
        background: var(--uui-color-surface-alt);
        color: var(--uui-color-text-alt);
      }
      .example {
        margin-top: var(--uui-size-space-3);
        font-family: monospace;
        font-size: 0.85rem;
        color: var(--uui-color-positive);
        display: flex;
        align-items: center;
        gap: var(--uui-size-space-2);
      }
      .add-child {
        margin-top: var(--uui-size-space-3);
      }
      .empty {
        color: var(--uui-color-text-alt);
      }
    `,
  ];
}

export default McRuleTreeElement;

declare global {
  interface HTMLElementTagNameMap {
    "umbricians-media-curator-rule-tree": McRuleTreeElement;
  }
}
