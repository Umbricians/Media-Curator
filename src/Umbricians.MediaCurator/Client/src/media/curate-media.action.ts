import { UMB_ACTION_EVENT_CONTEXT } from "@umbraco-cms/backoffice/action";
import { html } from "@umbraco-cms/backoffice/external/lit";
import {
  UmbEntityActionBase,
  UmbRequestReloadChildrenOfEntityEvent,
  UmbRequestReloadStructureForEntityEvent,
} from "@umbraco-cms/backoffice/entity-action";
import { UmbMediaItemRepository } from "@umbraco-cms/backoffice/media";
import { umbConfirmModal } from "@umbraco-cms/backoffice/modal";
import { UMB_NOTIFICATION_CONTEXT } from "@umbraco-cms/backoffice/notification";
import { tryExecute } from "@umbraco-cms/backoffice/resources";
import { MediaCuratorService, type MediaCurationPlanModel } from "../api/index.js";
import {
  confirmMessage,
  nothingToMoveMessage,
  resultMessage,
  rulesetBreakdown,
  type MediaPlanCounts,
} from "./curate-media.summary.js";

const MEDIA_ENTITY_TYPE = "media";

/**
 * "Curate images" on a media item: dry-runs every image in the folder and its subfolders
 * against the ruleset that governs each one, confirms, then moves them.
 */
export class McCurateMediaEntityAction extends UmbEntityActionBase<never> {
  override async execute() {
    const unique = this.args.unique;
    if (!unique) throw new Error("Unique is not available");

    const name = await this.#itemName(unique);
    const { data: plan } = await tryExecute(this, MediaCuratorService.planMediaCuration({ path: { mediaKey: unique } }));
    if (!plan) return;

    const counts = toCounts(plan);
    if (counts.moveCount === 0) {
      await this.#notify("default", nothingToMoveMessage(name, counts));
      return;
    }

    const breakdown = rulesetBreakdown(counts);
    try {
      await umbConfirmModal(this, {
        headline: "Curate images",
        content: html`<p>${confirmMessage(name, counts)}</p>
          ${breakdown.length > 1 ? html`<ul>${breakdown.map((line) => html`<li>${line}</li>`)}</ul>` : ""}
          <p>You can undo the run from Settings › Media Curator › Activity log.</p>`,
        confirmLabel: `Move ${counts.moveCount}`,
        color: "positive",
      });
    } catch {
      return;
    }

    const { data: result } = await tryExecute(
      this,
      MediaCuratorService.executeMediaCuration({ path: { mediaKey: unique } }),
    );
    if (!result) return;

    await this.#notify(result.failed > 0 ? "warning" : "positive", resultMessage(result));
    await this.#reloadTrees(unique, plan);
  }

  async #itemName(unique: string): Promise<string> {
    const { data } = await new UmbMediaItemRepository(this).requestItems([unique]);
    return data?.[0]?.name ?? "this folder";
  }

  async #notify(color: "default" | "positive" | "warning", message: string) {
    const notifications = await this.getContext(UMB_NOTIFICATION_CONTEXT);
    notifications?.peek(color, { data: { headline: "Curate images", message } });
  }

  // Images move under their ruleset's scope folder, which may sit above the clicked folder.
  async #reloadTrees(unique: string, plan: MediaCurationPlanModel) {
    const actionEvents = await this.getContext(UMB_ACTION_EVENT_CONTEXT);
    if (!actionEvents) return;
    actionEvents.dispatchEvent(new UmbRequestReloadStructureForEntityEvent({ unique, entityType: MEDIA_ENTITY_TYPE }));
    for (const scope of new Set(plan.plans.map((p) => p.scopeFolderKey))) {
      actionEvents.dispatchEvent(new UmbRequestReloadChildrenOfEntityEvent({ unique: scope, entityType: MEDIA_ENTITY_TYPE }));
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
