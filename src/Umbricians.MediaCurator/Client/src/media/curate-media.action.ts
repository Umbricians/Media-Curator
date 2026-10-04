import { UMB_ACTION_EVENT_CONTEXT } from "@umbraco-cms/backoffice/action";
import { html } from "@umbraco-cms/backoffice/external/lit";
import {
  UmbEntityActionBase,
  UmbRequestReloadChildrenOfEntityEvent,
  UmbRequestReloadStructureForEntityEvent,
} from "@umbraco-cms/backoffice/entity-action";
import { UMB_MEDIA_ROOT_ENTITY_TYPE, UmbMediaItemRepository } from "@umbraco-cms/backoffice/media";
import { umbConfirmModal } from "@umbraco-cms/backoffice/modal";
import { UMB_NOTIFICATION_CONTEXT } from "@umbraco-cms/backoffice/notification";
import { tryExecute } from "@umbraco-cms/backoffice/resources";
import { MediaCuratorService, type BulkRunStatusModel, type MediaCurationPlanModel } from "../api/index.js";
import {
  backgroundConfirmMessage,
  backgroundProgressMessage,
  backgroundResultMessage,
  cleanupOnlyMessage,
  confirmLabel,
  confirmMessage,
  emptyFoldersLine,
  nothingToMoveMessage,
  resultMessage,
  rulesetBreakdown,
  type MediaPlanCounts,
} from "./curate-media.summary.js";
import "./empty-folders-option.element.js";
import { treeReloadTargets } from "./tree-reload.js";
import { updateNotificationMessage } from "./notification-progress.js";
import { peopleDetectionEnabled, reloadPeopleBadges } from "../people/reload-people-badges.js";
import type { McEmptyFoldersOptionElement } from "./empty-folders-option.element.js";

const MEDIA_ENTITY_TYPE = "media";
const HEADLINE = "Curate images";
const POLL_MS = 3000;

/**
 * "Curate images" on a media item: dry-runs every image in the folder and its subfolders
 * against the ruleset that governs each one, confirms, then moves them and removes the empty
 * sub-folders left behind. With nothing to move it still offers to remove empty sub-folders.
 * A folder with more images than the server's threshold skips the dry run (too slow) and is
 * curated in the background, with a progress notification until it finishes.
 */
export class McCurateMediaEntityAction extends UmbEntityActionBase<never> {
  override async execute() {
    const unique = this.args.unique;
    if (!unique) throw new Error("Unique is not available");

    const name = await this.#itemName(unique);
    const { data: count } = await tryExecute(this, MediaCuratorService.countMediaCuration({ path: { mediaKey: unique } }));
    if (!count) return;
    if (count.runsInBackground) {
      await this.#curateInBackground(unique, name, count.imageCount, count.threshold);
      return;
    }

    const { data: plan } = await tryExecute(this, MediaCuratorService.planMediaCuration({ path: { mediaKey: unique } }));
    if (!plan) return;

    const counts = toCounts(plan);
    const emptyFolders = plan.emptyFolderCount;
    if (counts.moveCount === 0 && emptyFolders === 0) {
      await this.#notify("default", nothingToMoveMessage(name, counts));
      return;
    }

    const breakdown = rulesetBreakdown(counts);
    let permanentlyDelete = false;
    try {
      await umbConfirmModal(this, {
        headline: "Curate images",
        content: html`${counts.moveCount > 0
            ? html`<p>${confirmMessage(name, counts)}</p>
                ${breakdown.length > 1 ? html`<ul>${breakdown.map((line) => html`<li>${line}</li>`)}</ul>` : ""}
                <p>${emptyFoldersLine(emptyFolders)}</p>`
            : html`<p>${cleanupOnlyMessage(name, counts, emptyFolders)}</p>`}
          <p>You can undo the run from Settings › Media Curator › Activity log.</p>
          <mc-empty-folders-option
            @change=${(event: Event) =>
              (permanentlyDelete = (event.target as McEmptyFoldersOptionElement).permanentlyDelete)}
          ></mc-empty-folders-option>`,
        confirmLabel: confirmLabel(counts.moveCount, emptyFolders),
        color: "positive",
      });
    } catch {
      return;
    }

    const { data: result } = await tryExecute(
      this,
      MediaCuratorService.executeMediaCuration({
        path: { mediaKey: unique },
        query: { permanentlyDeleteEmptyFolders: permanentlyDelete },
      }),
    );
    if (!result) return;

    await this.#notify(result.failed > 0 ? "warning" : "positive", resultMessage(result, permanentlyDelete));
    await this.#reloadTrees(unique, [...plan.plans.map((p) => p.scopeFolderKey)], result.changedFolderKeys ?? []);
  }

  async #curateInBackground(unique: string, name: string, imageCount: number, threshold: number) {
    let permanentlyDelete = false;
    try {
      await umbConfirmModal(this, {
        headline: HEADLINE,
        content: html`<p>${backgroundConfirmMessage(name, imageCount, threshold)}</p>
          <p>You can undo the run from Settings › Media Curator › Activity log.</p>
          <mc-empty-folders-option
            @change=${(event: Event) =>
              (permanentlyDelete = (event.target as McEmptyFoldersOptionElement).permanentlyDelete)}
          ></mc-empty-folders-option>`,
        confirmLabel: "Curate in the background",
        color: "positive",
      });
    } catch {
      return;
    }

    const { data: result } = await tryExecute(
      this,
      MediaCuratorService.executeMediaCuration({
        path: { mediaKey: unique },
        query: { permanentlyDeleteEmptyFolders: permanentlyDelete },
      }),
    );
    if (!result) return;
    if (!result.queued) {
      // The folder shrank below the threshold since it was counted: it ran in the request.
      await this.#notify(result.failed > 0 ? "warning" : "positive", resultMessage(result, permanentlyDelete));
      await this.#reloadTrees(unique, [], result.changedFolderKeys ?? []);
      return;
    }

    const notifications = await this.getContext(UMB_NOTIFICATION_CONTEXT);
    const queued = { state: "queued", processed: 0, total: 0, imageCount, moved: 0, failed: 0, foldersRemoved: 0 };
    const progress = notifications?.stay("default", { data: { headline: HEADLINE, message: backgroundProgressMessage(name, queued) } });
    const run = await this.#waitForRun(unique, (status) =>
      updateNotificationMessage(progress, HEADLINE, backgroundProgressMessage(name, status)),
    );
    progress?.close();
    if (!run) {
      await this.#notify("warning", `Lost track of "${name}" (the site may have restarted). Check the Activity log.`);
      return;
    }

    await this.#notify(run.state === "completed" && run.failed === 0 ? "positive" : "warning", backgroundResultMessage(name, run, permanentlyDelete));
    await this.#reloadTrees(unique, [], run.changedFolderKeys ?? []);
  }

  /** Polls the folder's background run until it finishes; null when the server no longer knows it. */
  async #waitForRun(unique: string, onProgress: (status: BulkRunStatusModel) => void): Promise<BulkRunStatusModel | null> {
    for (;;) {
      await new Promise((resolve) => setTimeout(resolve, POLL_MS));
      const { data: status, response } = await MediaCuratorService.getQueueItemStatus({ path: { mediaKey: unique } });
      if (response?.status === 404) return null;
      if (!status) continue; // A dropped request: ask again.
      if (status.state === "completed" || status.state === "failed") return status;
      onProgress(status);
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

  /**
   * Reloads every tree branch the run changed (reported by the server), plus the clicked folder and each
   * ruleset's scope folder: images move under their ruleset's scope, which may sit above the clicked folder.
   */
  async #reloadTrees(unique: string, scopeFolderKeys: readonly string[], changedFolderKeys: readonly string[]) {
    const actionEvents = await this.getContext(UMB_ACTION_EVENT_CONTEXT);
    if (!actionEvents) return;
    actionEvents.dispatchEvent(new UmbRequestReloadStructureForEntityEvent({ unique, entityType: MEDIA_ENTITY_TYPE }));
    const keys = [unique, ...scopeFolderKeys, ...changedFolderKeys];
    for (const target of treeReloadTargets(keys, MEDIA_ENTITY_TYPE, UMB_MEDIA_ROOT_ENTITY_TYPE)) {
      actionEvents.dispatchEvent(new UmbRequestReloadChildrenOfEntityEvent(target));
    }

    // Moved images keep their people badge, but the "people below" badge of every folder above a changed
    // folder may have changed too.
    if (changedFolderKeys.length > 0 && (await peopleDetectionEnabled())) {
      await reloadPeopleBadges(this, changedFolderKeys);
    }
  }
}

function toCounts(plan: MediaCurationPlanModel): MediaPlanCounts {
  return {
    moveCount: plan.moveCount,
    alreadyInPlaceCount: plan.alreadyInPlaceCount,
    skippedCount: plan.skippedItems.length,
    rulesets: plan.plans.map((p) => ({ name: p.rulesetName, moveCount: p.moveCount })),
  };
}

export { McCurateMediaEntityAction as api };
