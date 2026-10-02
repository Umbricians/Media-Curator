import { css, customElement, html, state } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import type { ProviderModel, RuleNodeModel } from "../../../api/index.js";
import "../../../designer/rule-flow.element.js";
import { MC_RULESET_WORKSPACE_CONTEXT } from "../ruleset-workspace.context-token.js";

/** Design tab: the rule flow chart filling the whole workspace area. */
@customElement("mc-ruleset-design-view")
export class McRulesetDesignViewElement extends UmbLitElement {
  @state() private _rules: RuleNodeModel[] = [];
  @state() private _providers: ProviderModel[] = [];
  @state() private _name = "";

  #context?: typeof MC_RULESET_WORKSPACE_CONTEXT.TYPE;

  constructor() {
    super();
    this.consumeContext(MC_RULESET_WORKSPACE_CONTEXT, (context) => {
      this.#context = context;
      if (!context) return;
      this.observe(context.rules, (rules) => (this._rules = rules), "_rules");
      this.observe(context.providers, (providers) => (this._providers = providers), "_providers");
      this.observe(context.name, (name) => (this._name = name ?? ""), "_name");
    });
  }

  #onRulesChange(event: CustomEvent<{ rules: RuleNodeModel[] }>) {
    this.#context?.updateProperty("rules", event.detail.rules);
  }

  override render() {
    return html`
      <mc-rule-flow
        fill
        .rules=${this._rules}
        .providers=${this._providers}
        .scopeName=${this._name || "Scope"}
        @rules-change=${this.#onRulesChange}
      ></mc-rule-flow>
    `;
  }

  static override styles = [
    css`
      :host {
        display: block;
        height: 100%;
      }
    `,
  ];
}

export default McRulesetDesignViewElement;

declare global {
  interface HTMLElementTagNameMap {
    "mc-ruleset-design-view": McRulesetDesignViewElement;
  }
}
