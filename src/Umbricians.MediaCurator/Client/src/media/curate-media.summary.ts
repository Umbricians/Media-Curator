/** Pure wording helpers for the "Curate images" action (unit-tested in Node). */

export type MediaPlanCounts = {
  moveCount: number;
  alreadyInPlaceCount: number;
  skippedCount: number;
  rulesets: Array<{ name: string; moveCount: number }>;
};

const plural = (count: number, one: string, many: string) => `${count} ${count === 1 ? one : many}`;

export function confirmMessage(folderName: string, counts: MediaPlanCounts): string {
  const parts = [`${plural(counts.moveCount, "image", "images")} in "${folderName}" and its subfolders will be moved`];
  if (counts.alreadyInPlaceCount > 0) parts.push(`${counts.alreadyInPlaceCount} already in place`);
  if (counts.skippedCount > 0) parts.push(`${counts.skippedCount} skipped`);
  return `${parts.join(", ")}.`;
}

export function rulesetBreakdown(counts: MediaPlanCounts): string[] {
  return counts.rulesets
    .filter((ruleset) => ruleset.moveCount > 0)
    .map((ruleset) => `${ruleset.name}: ${plural(ruleset.moveCount, "image", "images")}`);
}

export function nothingToMoveMessage(folderName: string, counts: MediaPlanCounts): string {
  if (counts.alreadyInPlaceCount === 0 && counts.skippedCount === 0) {
    return `There are no images to curate in "${folderName}".`;
  }
  const parts: string[] = [];
  if (counts.alreadyInPlaceCount > 0) parts.push(`${counts.alreadyInPlaceCount} already in place`);
  if (counts.skippedCount > 0) parts.push(`${counts.skippedCount} skipped (no ruleset applies, excluded, or not an image)`);
  return `Nothing to move in "${folderName}": ${parts.join(", ")}.`;
}

export function resultMessage(
  result: { moved: number; alreadyInPlace: number; failed: number; foldersRemoved?: number },
  permanentlyDeleted = false,
): string {
  const curated = `Curated: ${result.moved} moved, ${result.alreadyInPlace} already in place, ${result.failed} failed.`;
  const removed = result.foldersRemoved ?? 0;
  if (removed === 0) return curated;
  const where = permanentlyDeleted ? "deleted permanently" : "moved to the Recycle Bin";
  return `${curated} ${plural(removed, "empty folder", "empty folders")} ${where}.`;
}

/** The dialog line about empty sub-folders found by the dry run (more may empty during the run). */
export function emptyFoldersLine(emptyFolderCount: number): string {
  return emptyFolderCount === 0
    ? "Any sub-folders the run leaves empty will be removed."
    : `${plural(emptyFolderCount, "empty sub-folder", "empty sub-folders")} will also be removed, plus any the run leaves empty.`;
}

/** Dialog text when no image moves but empty sub-folders can still be cleaned up. */
export function cleanupOnlyMessage(folderName: string, counts: MediaPlanCounts, emptyFolderCount: number): string {
  const moved = counts.alreadyInPlaceCount > 0 ? ` (${counts.alreadyInPlaceCount} already in place)` : "";
  return `No images in "${folderName}" need moving${moved}. ${plural(emptyFolderCount, "empty sub-folder", "empty sub-folders")} will be removed.`;
}

export function confirmLabel(moveCount: number, emptyFolderCount: number): string {
  return moveCount > 0
    ? `Move ${moveCount}`
    : `Remove ${plural(emptyFolderCount, "empty folder", "empty folders")}`;
}

/** Explains what happens to empty sub-folders, beside the "delete permanently" checkbox. */
export function emptyFoldersDescription(permanentlyDelete: boolean): string {
  return permanentlyDelete
    ? "Empty sub-folders left after the run will be deleted permanently. Undo recreates them by name."
    : "Empty sub-folders left after the run will be moved to the Recycle Bin.";
}

/** A background run's state, as the queue status reports it. */
export type BackgroundRun = {
  state: string;
  processed: number;
  total: number;
  imageCount: number;
  moved: number;
  alreadyInPlace: number;
  failed: number;
  foldersRemoved: number;
  error?: string | null;
};

/** The confirm dialog for a folder large enough to curate in the background (no preview: too slow). */
export function backgroundConfirmMessage(folderName: string, imageCount: number, threshold: number): string {
  return `"${folderName}" and its subfolders hold ${plural(imageCount, "image", "images")}. Folders with more than ${threshold} images are curated in the background, so you can carry on working while it runs.`;
}

/** The progress notification while a background run is queued or moving images. */
export function backgroundProgressMessage(folderName: string, run: BackgroundRun): string {
  if (run.state === "queued") return `"${folderName}" is queued and will start in a few seconds.`;
  if (run.total === 0) return `Working out where the images in "${folderName}" belong…`;
  return `Curating "${folderName}": ${run.processed} of ${plural(run.total, "image", "images")} moved.`;
}

/** The notification when a background run finishes. */
export function backgroundResultMessage(folderName: string, run: BackgroundRun, permanentlyDeleted = false): string {
  if (run.state === "failed") return `Curating "${folderName}" stopped: ${run.error ?? "unknown error"}. The Activity log shows what moved, and can undo it.`;
  const curated = `Curated "${folderName}" in the background: ${run.moved} moved, ${run.alreadyInPlace} already in place, ${run.failed} failed.`;
  if (run.foldersRemoved === 0) return curated;
  const where = permanentlyDeleted ? "deleted permanently" : "moved to the Recycle Bin";
  return `${curated} ${plural(run.foldersRemoved, "empty folder", "empty folders")} ${where}.`;
}
