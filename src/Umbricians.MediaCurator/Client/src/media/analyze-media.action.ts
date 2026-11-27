import { UmbEntityActionBase } from "@umbraco-cms/backoffice/entity-action";
import { html } from "@umbraco-cms/backoffice/external/lit";
import { UmbMediaItemRepository } from "@umbraco-cms/backoffice/media";
import { umbConfirmModal } from "@umbraco-cms/backoffice/modal";
import { UMB_NOTIFICATION_CONTEXT } from "@umbraco-cms/backoffice/notification";
import { tryExecute } from "@umbraco-cms/backoffice/resources";
import { MediaCuratorService } from "../api/index.js";
import "./analyze-media-confirm.element.js";
import type { McAnalyzeMediaConfirmElement } from "./analyze-media-confirm.element.js";
import {
  imagesToSend,
  nothingToAnalyzeMessage,
  progressMessage,
  resultMessage,
  type AnalyzeOutcome,
} from "./analyze-media.summary.js";
import { updateNotificationMessage } from "./notification-progress.js";
import { reloadPeopleBadges } from "../people/reload-people-badges.js";
import { runPool } from "./run-pool.js";

const HEADLINE = "Analyze images";
const DEFAULT_PARALLEL_ANALYSES = 4;

/**
 * "Analyze images" on a media item: runs AI recognition for the images in the folder and its
 * subfolders (or the clicked image) that have not been analyzed yet, or for all of them when
 * "Analyze all images" is ticked.
 */
export class McAnalyzeMediaEntityAction extends UmbEntityActionBase<never> {
  override async execute() {
    const unique = this.args.unique;
    if (!unique) throw new Error("Unique is not available");

    const name = await this.#itemName(unique);
    const { data: counted } = await tryExecute(this, MediaCuratorService.countMediaImages({ path: { mediaKey: unique } }));
    if (!counted) return;

    if (counted.count === 0) {
      await this.#notify("default", nothingToAnalyzeMessage(name));
      return;
    }

    let all = false;
    try {
      await umbConfirmModal(this, {
        headline: HEADLINE,
        content: html`<umbricians-media-curator-analyze-media-confirm
          .folderName=${name}
          .total=${counted.count}
          .notAnalyzed=${counted.notAnalyzedCount}
          @change=${(event: Event) => (all = (event.target as McAnalyzeMediaConfirmElement).all)}
        ></umbricians-media-curator-analyze-media-confirm>`,
        confirmLabel: "Analyze",
        color: "warning",
      });
    } catch {
      return;
    }

    if (imagesToSend(counted.count, counted.notAnalyzedCount, all) === 0) {
      await this.#notify("default", `All images in "${name}" have already been analyzed.`);
      return;
    }

    const { data: listed } = await tryExecute(
      this,
      MediaCuratorService.listImagesToAnalyze({ path: { mediaKey: unique }, query: { all } }),
    );
    if (!listed) return;

    // One image per request, several at a time (the "parallel analyses" setting), so a single
    // sticky notification can count them down.
    const total = listed.images.length;
    const parallel = await this.#maxParallelAnalyses();
    const notifications = await this.getContext(UMB_NOTIFICATION_CONTEXT);
    const progress = notifications?.stay("default", { data: { headline: HEADLINE, message: progressMessage(0, total) } });
    let results: AnalyzeOutcome[] = [];
    try {
      results = await runPool(
        listed.images,
        parallel,
        (image) => this.#analyzeOne(image.mediaKey, image.mediaName, !all),
        (_, done) => updateNotificationMessage(progress, HEADLINE, progressMessage(done, total)),
      );
    } finally {
      progress?.close();
    }

    const failed = results.some((r) => !r.analyzed);
    await this.#notify(failed ? "warning" : "positive", resultMessage(results, listed.alreadyAnalyzedCount));

    // People decisions come back only when people detection is on; then refresh the tree badges.
    if (results.some((r) => r.containsPeople != null)) {
      await reloadPeopleBadges(this, listed.images.map((image) => image.mediaKey));
    }
  }

  /** Errors are collected for the summary rather than shown one notification at a time. */
  /** With keepExistingAnalysis, an image analyzed before is not sent again; only what it is missing (such as
   * whether it shows people) is decided from its stored description. */
  async #analyzeOne(
    mediaKey: string,
    mediaName: string,
    keepExistingAnalysis: boolean,
  ): Promise<AnalyzeOutcome> {
    try {
      const { data, error } = await MediaCuratorService.reanalyzeImages({
        body: { mediaKeys: [mediaKey], keepExistingAnalysis },
      });
      const result = data?.results[0];
      if (error || !result) return { mediaName, analyzed: false, error: "The request failed." };
      return {
        mediaName: result.mediaName ?? mediaName,
        analyzed: result.analyzed,
        error: result.error,
        containsPeople: result.containsPeople,
      };
    } catch (error) {
      return { mediaName, analyzed: false, error: error instanceof Error ? error.message : "The request failed." };
    }
  }

  async #maxParallelAnalyses(): Promise<number> {
    try {
      const { data } = await MediaCuratorService.getSettings();
      return data?.maxParallelAnalyses ?? DEFAULT_PARALLEL_ANALYSES;
    } catch {
      return DEFAULT_PARALLEL_ANALYSES;
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

export { McAnalyzeMediaEntityAction as api };
