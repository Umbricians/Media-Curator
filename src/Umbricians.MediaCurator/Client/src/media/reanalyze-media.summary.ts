/** Pure wording helpers for the "Re-analyze images" action (unit-tested in Node). */

export type ReanalyzeOutcome = { mediaName?: string | null; analyzed: boolean; error?: string | null };

const MAX_FAILURES_LISTED = 3;

const plural = (count: number, one: string, many: string) => `${count} ${count === 1 ? one : many}`;

export function nothingToReanalyzeMessage(name: string): string {
  return `There are no images to re-analyze in "${name}".`;
}

export function confirmMessage(name: string, count: number): string {
  const subject = count === 1 ? `1 image in "${name}" and its subfolders` : `${count} images in "${name}" and its subfolders`;
  return `${subject} will be sent to the AI again. Their stored descriptions, tags and classification codes will be replaced. Each image takes at least one AI request (usually more with hierarchical classification).`;
}

export function progressMessage(count: number): string {
  return `Re-analyzing ${plural(count, "image", "images")}…`;
}

export function resultMessage(results: ReanalyzeOutcome[], total: number): string {
  const analyzed = results.filter((r) => r.analyzed).length;
  const failed = results.filter((r) => !r.analyzed);
  const parts = [`Re-analyzed ${analyzed} of ${plural(total, "image", "images")}.`];
  if (failed.length > 0) {
    const listed = failed
      .slice(0, MAX_FAILURES_LISTED)
      .map((r) => `${r.mediaName || "Unknown"}${r.error ? ` (${r.error})` : ""}`);
    const more = failed.length > MAX_FAILURES_LISTED ? `, and ${failed.length - MAX_FAILURES_LISTED} more` : "";
    parts.push(`${failed.length} failed: ${listed.join(", ")}${more}.`);
  }
  if (analyzed > 0) parts.push("Run Curate images to move them into their new folders.");
  return parts.join(" ");
}
