import { UmbEntityActionBase } from "@umbraco-cms/backoffice/entity-action";
import { UmbMediaItemRepository } from "@umbraco-cms/backoffice/media";
import { umbConfirmModal } from "@umbraco-cms/backoffice/modal";
import { UMB_NOTIFICATION_CONTEXT } from "@umbraco-cms/backoffice/notification";
import { tryExecute } from "@umbraco-cms/backoffice/resources";
import { MediaCuratorService } from "../api/index.js";
import {
  confirmMessage,
  nothingToReanalyzeMessage,
  progressMessage,
  resultMessage,
} from "./reanalyze-media.summary.js";

const HEADLINE = "Re-analyze images";

/**
 * "Re-analyze images" on a media item: re-runs AI recognition (ignoring cached results) for every
 * image in the folder and its subfolders, or for the single image that was clicked.
 */
export class McReanalyzeMediaEntityAction extends UmbEntityActionBase<never> {
  override async execute() {
    const unique = this.args.unique;
    if (!unique) throw new Error("Unique is not available");

    const name = await this.#itemName(unique);
    const { data: counted } = await tryExecute(this, MediaCuratorService.countMediaImages({ path: { mediaKey: unique } }));
    if (!counted) return;

    const count = counted.count;
    if (count === 0) {
      await this.#notify("default", nothingToReanalyzeMessage(name));
      return;
    }

    try {
      await umbConfirmModal(this, {
        headline: HEADLINE,
        content: confirmMessage(name, count),
        confirmLabel: `Re-analyze ${count}`,
        color: "warning",
      });
    } catch {
      return;
    }

    // Sticky progress notification: the call can take a while (one AI request per image).
    const notifications = await this.getContext(UMB_NOTIFICATION_CONTEXT);
    const progress = notifications?.stay("default", { data: { headline: HEADLINE, message: progressMessage(count) } });
    try {
      const { data: result } = await tryExecute(
        this,
        MediaCuratorService.reanalyzeMediaImages({ path: { mediaKey: unique } }),
      );
      if (!result) return;

      const failed = result.results.some((r) => !r.analyzed);
      await this.#notify(failed ? "warning" : "positive", resultMessage(result.results, count));
    } finally {
      progress?.close();
    }
  }

  async #itemName(unique: string): Promise<string> {
    const { data } = await new UmbMediaItemRepository(this).requestItems([unique]);
    return data?.[0]?.name ?? "this folder";
  }

  async #notify(color: "default" | "positive" | "warning", message: string) {
    const notifications = await this.getContext(UMB_NOTIFICATION_CONTEXT);
    notifications?.peek(color, { data: { headline: HEADLINE, message } });
  }
}

export { McReanalyzeMediaEntityAction as api };
