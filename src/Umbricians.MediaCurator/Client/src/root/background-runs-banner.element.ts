import { css, customElement, html, nothing, state } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { MediaCuratorService, type BulkRunStatusModel } from "../api/index.js";
import { isActive } from "../media/background-run.js";
import { backgroundProgressMessage } from "../media/curate-media.summary.js";

/** How often to look again while a run is going, and while none is (to notice one started elsewhere). */
const ACTIVE_POLL_MS = 3000;
const IDLE_POLL_MS = 15000;

/**
 * A progress line for every background run that is queued or moving images, shown at the top of the
 * Media Curator settings views so editors can check on a long run from anywhere in the section.
 * Renders nothing while no run is going.
 */
@customElement("umbricians-media-curator-background-runs-banner")
export class McBackgroundRunsBannerElement extends UmbLitElement {
  @state() private _runs: BulkRunStatusModel[] = [];

  #timer?: ReturnType<typeof setTimeout>;

  override connectedCallback() {
    super.connectedCallback();
    void this.#poll();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    clearTimeout(this.#timer);
  }

  async #poll() {
    try {
      const { data } = await MediaCuratorService.getQueueStatus();
      this._runs = (data?.statuses ?? []).filter(isActive);
    } catch {
      // A dropped request: keep showing the last known progress and ask again.
    }
    if (!this.isConnected) return;
    this.#timer = setTimeout(() => void this.#poll(), this._runs.length > 0 ? ACTIVE_POLL_MS : IDLE_POLL_MS);
  }

  override render() {
    if (this._runs.length === 0) return nothing;
    return html`${this._runs.map(
      (run) => html`<div class="run" data-mark="mc:background-banner">
        <uui-icon name="icon-time"></uui-icon>
        <div class="text">
          <span>${backgroundProgressMessage(run.name || "a folder", run)}</span>
          ${run.total > 0
            ? html`<uui-loader-bar progress=${Math.round((100 * run.processed) / run.total)}></uui-loader-bar>`
            : html`<uui-loader-bar></uui-loader-bar>`}
        </div>
      </div>`,
    )}`;
  }

  static override styles = css`
    :host {
      display: block;
    }
    .run {
      display: flex;
      align-items: center;
      gap: var(--uui-size-space-4);
      padding: var(--uui-size-space-4) var(--uui-size-space-5);
      margin-bottom: var(--uui-size-layout-1);
      border-radius: var(--uui-border-radius);
      background: var(--uui-color-surface);
      border-left: 4px solid var(--uui-color-current);
      box-shadow: var(--uui-shadow-depth-1);
    }
    .text {
      flex: 1;
      display: grid;
      gap: var(--uui-size-space-2);
    }
  `;
}

export default McBackgroundRunsBannerElement;

declare global {
  interface HTMLElementTagNameMap {
    "umbricians-media-curator-background-runs-banner": McBackgroundRunsBannerElement;
  }
}
