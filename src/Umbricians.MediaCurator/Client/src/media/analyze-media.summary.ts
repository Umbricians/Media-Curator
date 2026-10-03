/** Pure wording helpers for the "Analyze images" action (unit-tested in Node). */

export type AnalyzeOutcome = { mediaName?: string | null; analyzed: boolean; error?: string | null };

const MAX_FAILURES_LISTED = 3;

const plural = (count: number, one: string, many: string) => `${count} ${count === 1 ? one : many}`;

const COST_NOTE = "Each image takes at least one AI request (usually more with hierarchical classification).";

/** How many images a run will send to the AI. */
export function imagesToSend(total: number, notAnalyzed: number, all: boolean): number {
  return all ? total : notAnalyzed;
}

export function nothingToAnalyzeMessage(name: string): string {
  return `There are no images to analyze in "${name}".`;
}

export function dialogMessage(name: string, total: number, notAnalyzed: number, all: boolean): string {
  const where = `in "${name}" and its subfolders`;
  if (all) {
    return `${plural(total, "image", "images")} ${where} will be sent to the AI. Stored descriptions, tags and classification codes will be replaced. ${COST_NOTE}`;
  }
  if (notAnalyzed === 0) {
    return `All ${plural(total, "image", "images")} ${where} have already been analyzed. Tick "Analyze all images" to analyze them again.`;
  }
  const subject = notAnalyzed === total ? plural(total, "image", "images") : `${notAnalyzed} of ${plural(total, "image", "images")}`;
  return `${subject} ${where} ${notAnalyzed === 1 ? "has" : "have"} not been analyzed yet and will be sent to the AI. ${COST_NOTE}`;
}

export function analyzeAllDescription(total: number, notAnalyzed: number): string {
  const done = total - notAnalyzed;
  return done === 0
    ? "Nothing has been analyzed yet, so every image is included either way."
    : `Also re-analyze the ${plural(done, "image", "images")} already analyzed, replacing their stored results.`;
}

/** Progress shown in the single notification while images are analyzed one at a time. */
export function progressMessage(done: number, total: number): string {
  const left = total - done;
  return left === 0
    ? `Analyzed ${plural(total, "image", "images")}.`
    : `Analyzing image ${done + 1} of ${total} (${left} left)…`;
}

export function resultMessage(results: AnalyzeOutcome[], alreadyAnalyzed: number): string {
  const analyzed = results.filter((r) => r.analyzed).length;
  const failed = results.filter((r) => !r.analyzed);
  const parts = [`Analyzed ${analyzed} of ${plural(results.length, "image", "images")}.`];
  if (failed.length > 0) {
    const listed = failed
      .slice(0, MAX_FAILURES_LISTED)
      .map((r) => `${r.mediaName || "Unknown"}${r.error ? ` (${r.error})` : ""}`);
    const more = failed.length > MAX_FAILURES_LISTED ? `, and ${failed.length - MAX_FAILURES_LISTED} more` : "";
    parts.push(`${failed.length} failed: ${listed.join(", ")}${more}.`);
  }
  if (alreadyAnalyzed > 0) parts.push(`Skipped ${plural(alreadyAnalyzed, "image", "images")} already analyzed.`);
  if (analyzed > 0) parts.push("Run Curate images to move them into their new folders.");
  return parts.join(" ");
}
