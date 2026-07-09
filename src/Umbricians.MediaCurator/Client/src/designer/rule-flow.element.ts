import {
  LitElement,
  css,
  html,
  customElement,
  property,
  type PropertyValues,
} from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { createElement } from "react";
import { createRoot, type Root } from "react-dom/client";
import type { ProviderModel, RuleNodeModel } from "../api/index.js";
import { RuleFlowCanvas } from "./rule-flow.react.js";
import { adoptRuleFlowStyles } from "./rule-flow.styles.js";

/**
 * xyflow-based ruleset designer: React Flow renders inside a custom element that
 * bridges into the Umbraco Lit dashboard (same contract as mc-rule-tree).
 */
@customElement("mc-rule-flow")
export class McRuleFlowElement extends UmbElementMixin(LitElement) {
  @property({ attribute: false }) rules: RuleNodeModel[] = [];
  @property({ attribute: false }) providers: ProviderModel[] = [];
  @property({ attribute: false }) scopeName = "Scope";

  #mount?: HTMLDivElement;
  #root?: Root;

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

  #emitChange(rules: RuleNodeModel[]) {
    this.rules = rules;
    this.dispatchEvent(new CustomEvent("rules-change", { detail: { rules }, bubbles: false }));
  }

  #renderReact() {
    if (!this.#root) return;

    this.#root.render(
      createElement(RuleFlowCanvas, {
        rules: this.rules,
        providers: this.providers,
        scopeName: this.scopeName,
        onRulesChange: (rules: RuleNodeModel[]) => this.#emitChange(rules),
      }),
    );
  }

  static override styles = [
    css`
      :host {
        display: block;
      }
      .react-root {
        width: 100%;
      }
    `,
  ];
}

export default McRuleFlowElement;

declare global {
  interface HTMLElementTagNameMap {
    "mc-rule-flow": McRuleFlowElement;
  }
}
