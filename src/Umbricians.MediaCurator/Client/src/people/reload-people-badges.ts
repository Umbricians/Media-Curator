import { UMB_ACTION_EVENT_CONTEXT } from "@umbraco-cms/backoffice/action";
import type { UmbControllerBase } from "@umbraco-cms/backoffice/class-api";
import { UmbRequestReloadChildrenOfEntityEvent } from "@umbraco-cms/backoffice/entity-action";
import { UMB_MEDIA_ROOT_ENTITY_TYPE } from "@umbraco-cms/backoffice/media";
import { MediaCuratorService } from "../api/index.js";
import { treeReloadTargets } from "../media/tree-reload.js";

const MEDIA_ENTITY_TYPE = "media";

/**
 * Refreshes the people badges in the media tree after analysis or curation changed what sits where.
 * A tree item's badge comes with its parent's children, and a folder's "people below" badge depends on
 * everything under it, so every folder above the given items (the media root included) reloads its
 * children. Only branches already shown in the tree react to the reload events.
 */
export async function reloadPeopleBadges(host: UmbControllerBase, mediaKeys: readonly string[]): Promise<void> {
  if (mediaKeys.length === 0) return;
  try {
    const { data } = await MediaCuratorService.getAncestorFolders({ body: { mediaKeys: [...mediaKeys] } });
    if (!data) return;
    const actionEvents = await host.getContext(UMB_ACTION_EVENT_CONTEXT);
    if (!actionEvents) return;
    for (const target of treeReloadTargets(data.folderKeys, MEDIA_ENTITY_TYPE, UMB_MEDIA_ROOT_ENTITY_TYPE)) {
      actionEvents.dispatchEvent(new UmbRequestReloadChildrenOfEntityEvent(target));
    }
  } catch {
    // Badges catch up the next time the branch loads; never fail the action over them.
  }
}

/** Whether people detection is on (badges are only shown then). */
export async function peopleDetectionEnabled(): Promise<boolean> {
  try {
    const { data } = await MediaCuratorService.getSettings();
    return data?.detectPeople ?? false;
  } catch {
    return false;
  }
}
