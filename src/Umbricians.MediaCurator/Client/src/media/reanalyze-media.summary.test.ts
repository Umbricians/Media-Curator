import { describe, expect, it } from "vitest";
import { confirmMessage, nothingToReanalyzeMessage, progressMessage, resultMessage } from "./reanalyze-media.summary.js";

describe("reanalyze media wording", () => {
  it("handles empty folders", () => {
    expect(nothingToReanalyzeMessage("10")).toBe('There are no images to re-analyze in "10".');
  });

  it("confirms and warns about AI usage", () => {
    expect(confirmMessage("10", 3)).toBe(
      '3 images in "10" and its subfolders will be sent to the AI again. Their stored descriptions, tags and classification codes will be replaced. Each image takes at least one AI request (usually more with hierarchical classification).',
    );
    expect(confirmMessage("10", 1)).toContain("1 image in");
    expect(confirmMessage("10", 1)).toContain("1 image in \"10\"");
  });

  it("shows progress", () => {
    expect(progressMessage(1)).toBe("Re-analyzing 1 image…");
    expect(progressMessage(5)).toBe("Re-analyzing 5 images…");
  });

  it("reports success with the curate hint", () => {
    expect(resultMessage([{ analyzed: true }, { analyzed: true }], 2)).toBe(
      "Re-analyzed 2 of 2 images. Run Curate images to move them into their new folders.",
    );
  });

  it("lists the first few failures", () => {
    const failing = ["a", "b", "c", "d"].map((n) => ({ mediaName: n, analyzed: false, error: "boom" }));
    expect(resultMessage([{ analyzed: true }, ...failing], 5)).toBe(
      "Re-analyzed 1 of 5 images. 4 failed: a (boom), b (boom), c (boom), and 1 more. Run Curate images to move them into their new folders.",
    );
  });

  it("omits the hint when nothing was analyzed", () => {
    expect(resultMessage([{ mediaName: "a", analyzed: false }], 1)).toBe("Re-analyzed 0 of 1 image. 1 failed: a.");
  });
});
