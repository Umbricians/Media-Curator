import { css, customElement, html, property, state } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { analyzeAllDescription, dialogMessage } from "./analyze-media.summary.js";

/** Body of the "Analyze images" confirmation: the summary follows the "Analyze all images" box. */
@customElement("mc-analyze-media-confirm")
export class McAnalyzeMediaConfirmElement extends UmbLitElement {
  @property() folderName = "";
  @property({ type: Number }) total = 0;
  @property({ type: Number }) notAnalyzed = 0;
  @state() private _all = false;

  get all() {
    return this._all;
  }

  #onToggle(event: Event) {
    this._all = (event.target as HTMLInputElement).checked;
    this.dispatchEvent(new Event("change"));
  }

  override render() {
    return html`
      <p data-mark="mc:analyze-summary">${dialogMessage(this.folderName, this.total, this.notAnalyzed, this._all)}</p>
      <uui-checkbox
        data-mark="mc:analyze-all"
        label="Analyze all images"
        .checked=${this._all}
        @change=${this.#onToggle}
      ></uui-checkbox>
      <small>${analyzeAllDescription(this.total, this.notAnalyzed)}</small>
    `;
  }

  static override styles = [
    css`
      :host {
        display: block;
        max-width: 480px;
      }
      p {
        margin-top: 0;
      }
      small {
        display: block;
        margin: var(--uui-size-space-1) 0 0 calc(var(--uui-size-space-5) + var(--uui-size-space-2));
        color: var(--uui-color-text-alt);
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "mc-analyze-media-confirm": McAnalyzeMediaConfirmElement;
  }
}
