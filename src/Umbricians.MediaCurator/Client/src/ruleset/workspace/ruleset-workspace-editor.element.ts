import { css, customElement, html } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { MC_ROOT_WORKSPACE_PATH } from "../constants.js";

@customElement("umbricians-media-curator-ruleset-workspace-editor")
export class McRulesetWorkspaceEditorElement extends UmbLitElement {
  override render() {
    return html`
      <umb-entity-detail-workspace-editor .backPath=${MC_ROOT_WORKSPACE_PATH}>
        <umb-workspace-header-name-editable slot="header"></umb-workspace-header-name-editable>
      </umb-entity-detail-workspace-editor>
    `;
  }

  static override styles = [
    css`
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }
    `,
  ];
}

export default McRulesetWorkspaceEditorElement;

declare global {
  interface HTMLElementTagNameMap {
    "umbricians-media-curator-ruleset-workspace-editor": McRulesetWorkspaceEditorElement;
  }
}
