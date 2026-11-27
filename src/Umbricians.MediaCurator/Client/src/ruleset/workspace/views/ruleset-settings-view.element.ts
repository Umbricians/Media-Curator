import { css, customElement, html, state } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { MC_EMPTY_GUID } from "../../entity.js";
import { MC_RULESET_WORKSPACE_CONTEXT } from "../ruleset-workspace.context-token.js";

/** Settings tab: everything about a ruleset except its rules (edited on Design) and name (header). */
@customElement("umbricians-media-curator-ruleset-settings-view")
export class McRulesetSettingsViewElement extends UmbLitElement {
  @state() private _scopeRootKey?: string;
  @state() private _enabled = true;

  #context?: typeof MC_RULESET_WORKSPACE_CONTEXT.TYPE;

  constructor() {
    super();
    this.consumeContext(MC_RULESET_WORKSPACE_CONTEXT, (context) => {
      this.#context = context;
      if (!context) return;
      this.observe(context.scopeRootKey, (key) => (this._scopeRootKey = key), "_scopeRootKey");
      this.observe(context.enabled, (enabled) => (this._enabled = enabled), "_enabled");
    });
  }

  #onScopeChange(event: Event) {
    const selection = (event.target as { selection?: string[] }).selection ?? [];
    this.#context?.updateProperty("scopeRootKey", selection[0] ?? MC_EMPTY_GUID);
  }

  #onEnabledChange(event: Event) {
    this.#context?.updateProperty("enabled", (event.target as HTMLInputElement).checked);
  }

  override render() {
    const hasScope = !!this._scopeRootKey && this._scopeRootKey !== MC_EMPTY_GUID;
    return html`
      <uui-box>
        <umb-property-layout
          label="Scope folder"
          description="The media folder this ruleset curates. Items in it (and its subfolders) are sorted into folders built by the rules. Each folder can have only one ruleset."
          orientation="vertical"
          mandatory
        >
          <umb-input-media
            slot="editor"
            data-mark="mc:scope"
            .max=${1}
            .selection=${hasScope ? [this._scopeRootKey!] : []}
            @change=${this.#onScopeChange}
          ></umb-input-media>
        </umb-property-layout>
        <umb-property-layout
          label="Enabled"
          description="Whether this ruleset is active."
          orientation="vertical"
        >
          <uui-toggle
            slot="editor"
            data-mark="mc:enabled"
            label="Enabled"
            .checked=${this._enabled}
            @change=${this.#onEnabledChange}
          ></uui-toggle>
        </umb-property-layout>
      </uui-box>
    `;
  }

  static override styles = [
    css`
      :host {
        display: block;
        padding: var(--uui-size-layout-1);
      }
    `,
  ];
}

export default McRulesetSettingsViewElement;

declare global {
  interface HTMLElementTagNameMap {
    "umbricians-media-curator-ruleset-settings-view": McRulesetSettingsViewElement;
  }
}
