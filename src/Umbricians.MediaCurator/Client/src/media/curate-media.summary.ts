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

export function resultMessage(result: { moved: number; alreadyInPlace: number; failed: number }): string {
  return `Curated: ${result.moved} moved, ${result.alreadyInPlace} already in place, ${result.failed} failed.`;
}
