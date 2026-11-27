import {
  LitElement,
  css,
  html,
  customElement,
  property,
  type PropertyValues,
} from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { umbConfirmModal, umbOpenModal } from "@umbraco-cms/backoffice/modal";
import { createElement } from "react";
import { createRoot, type Root } from "react-dom/client";
import type { ProviderModel, RuleNodeModel } from "../api/index.js";
import { RuleFlowCanvas } from "./rule-flow.react.js";
import { newRule } from "./rule-flow.nodes.js";
import { adoptRuleFlowStyles } from "./rule-flow.styles.js";
import { MC_RULE_SETTINGS_MODAL } from "./rule-settings-modal.token.js";
import { addRule, removeAt, ruleAt, updateAt } from "./rule-tree.logic.js";

/**
 * xyflow-based ruleset designer: React Flow renders inside a custom element that
 * bridges into the Umbraco Lit dashboard (same contract as umbricians-media-curator-rule-tree).
 */
@customElement("umbricians-media-curator-rule-flow")
export class McRuleFlowElement extends UmbElementMixin(LitElement) {
  @property({ attribute: false }) rules: RuleNodeModel[] = [];
  @property({ attribute: false }) providers: ProviderModel[] = [];
  @property({ attribute: false }) scopeName = "Scope";
  /** Fill the host's container instead of using a fixed-height viewport. */
  @property({ type: Boolean, reflect: true }) fill = false;

  #mount?: HTMLDivElement;
  #root?: Root;
  /** Bumped on structural edits so React always re-layouts, even for identical-provider swaps. */
  #layoutGeneration = 0;

  override connectedCallback() {
    super.connectedCallback();
    if (this.shadowRoot) {
      adoptRuleFlowStyles(this.shadowRoot);
    }
  }

  override render() {
    return html`<div class="react-root"></div>`;
  }

  protected override shouldUpdate(changedProperties: PropertyValues): boolean {
    if (!this.hasUpdated) {
      return true;
    }

    if (
      changedProperties.has("rules") ||
      changedProperties.has("providers") ||
      changedProperties.has("scopeName")
    ) {
      this.#renderReact();
    }

    return false;
  }

  override firstUpdated() {
    this.#mount = this.renderRoot.querySelector(".react-root") as HTMLDivElement | null ?? undefined;
    if (!this.#mount) return;
    this.#root = createRoot(this.#mount);
    this.#renderReact();
  }

  override disconnectedCallback() {
    this.#root?.unmount();
    this.#root = undefined;
    this.#mount = undefined;
    super.disconnectedCallback();
  }

  #emitChange(rules: RuleNodeModel[], relayout = false) {
    if (relayout) {
      this.#layoutGeneration += 1;
    }
    // Keep the host property in sync, then push into React immediately so we do
    // not depend on Lit's async update cycle to reflect arrow/drag reorders.
    this.rules = rules;
    this.#renderReact();
    this.dispatchEvent(new CustomEvent("rules-change", { detail: { rules }, bubbles: false }));
  }

  #providerName(rule: RuleNodeModel): string {
    return this.providers.find((provider) => provider.alias === rule.providerAlias)?.name ?? rule.providerAlias;
  }

  /** Edit a rule in the settings sidebar. A dismissed new rule is rolled back to `rollback`. */
  async #openSettings(path: number[], isNew: boolean, rollback?: RuleNodeModel[]) {
    const rule = ruleAt(this.rules, path);
    if (!rule) return;

    try {
      const { rule: updated } = await umbOpenModal(this, MC_RULE_SETTINGS_MODAL, {
        data: { rule, providers: this.providers, isChild: path.length > 1, isNew },
      });
      this.#emitChange(updateAt(this.rules, path, (current) => ({ ...updated, children: current.children })));
    } catch {
      if (rollback) this.#emitChange(rollback, true);
    }
  }

  #onEditRule = (path: number[]) => void this.#openSettings(path, false);

  #onAddRule = (parentPath: number[] | null) => {
    const rule = newRule(this.providers);
    if (!rule) return;
    const before = this.rules;
    const { rules, path } = addRule(before, parentPath, rule);
    this.#emitChange(rules, true);
    void this.#openSettings(path, true, before);
  };

  #onDeleteRule = async (path: number[]) => {
    const rule = ruleAt(this.rules, path);
    if (!rule) return;
    const childCount = rule.children?.length ?? 0;
    const children = childCount === 0 ? "" : ` and its ${childCount === 1 ? "child rule" : `${childCount} child rules`}`;

    try {
      await umbConfirmModal(this, {
        headline: "Delete",
        content: `Are you sure you want to delete "${this.#providerName(rule)}"${children}?`,
        color: "danger",
        confirmLabel: "Delete",
      });
    } catch {
      return;
    }
    this.#emitChange(removeAt(this.rules, path), true);
  };

  #renderReact() {
    if (!this.#root) return;

    this.#root.render(
      createElement(RuleFlowCanvas, {
        rules: this.rules,
        providers: this.providers,
        scopeName: this.scopeName,
        layoutGeneration: this.#layoutGeneration,
        onRulesChange: (rules: RuleNodeModel[], options?: { relayout?: boolean }) =>
          this.#emitChange(rules, options?.relayout === true),
        onEditRule: this.#onEditRule,
        onDeleteRule: this.#onDeleteRule,
        onAddRule: this.#onAddRule,
      }),
    );
  }

  static override styles = [
    css`
      :host {
        display: block;
        position: relative;
        isolation: isolate;
        z-index: 1;
      }
      :host([fill]) {
        height: 100%;
      }
      .react-root {
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 1;
      }
    `,
  ];
}

export default McRuleFlowElement;

declare global {
  interface HTMLElementTagNameMap {
    "umbricians-media-curator-rule-flow": McRuleFlowElement;
  }
}
