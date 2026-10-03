/** The server reports a change to the media root as the empty GUID. */
export const MEDIA_ROOT_KEY = "00000000-0000-0000-0000-000000000000";

export type TreeReloadTarget = { entityType: string; unique: string | null };

/**
 * Which tree branches to reload after a curation run: every folder whose children changed (items moved
 * in or out, folders created, removed or sorted). Reloading only the clicked folder and the ruleset's
 * scope root left already-expanded sub-folders stale: new month folders missing, removed ones still shown.
 */
export function treeReloadTargets(
  changedFolderKeys: readonly string[],
  mediaEntityType: string,
  mediaRootEntityType: string,
): TreeReloadTarget[] {
  const targets: TreeReloadTarget[] = [];
  const seen = new Set<string>();
  for (const key of changedFolderKeys) {
    const normalized = key.toLowerCase();
    if (seen.has(normalized)) continue;
    seen.add(normalized);
    targets.push(
      normalized === MEDIA_ROOT_KEY
        ? { entityType: mediaRootEntityType, unique: null }
        : { entityType: mediaEntityType, unique: key },
    );
  }
  return targets;
}
