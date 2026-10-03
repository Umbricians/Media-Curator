import { css, customElement, html, state } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { emptyFoldersDescription } from "./curate-media.summary.js";

/** "Delete empty folders permanently" choice shown before a curation run (default: Recycle Bin). */
@customElement("mc-empty-folders-option")
export class McEmptyFoldersOptionElement extends UmbLitElement {
  @state() private _permanent = false;

  get permanentlyDelete() {
    return this._permanent;
  }

  #onToggle(event: Event) {
    this._permanent = (event.target as HTMLInputElement).checked;
    this.dispatchEvent(new Event("change"));
  }

  override render() {
    return html`
      <uui-checkbox
        data-mark="mc:delete-empty-folders"
        label="Delete empty folders permanently"
        .checked=${this._permanent}
        @change=${this.#onToggle}
      ></uui-checkbox>
      <small>${emptyFoldersDescription(this._permanent)}</small>
    `;
  }

  static override styles = [
    css`
      :host {
        display: block;
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
    "mc-empty-folders-option": McEmptyFoldersOptionElement;
  }
}
