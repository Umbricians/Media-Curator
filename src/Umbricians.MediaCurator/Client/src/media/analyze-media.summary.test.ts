import { describe, expect, it } from "vitest";
import {
  analyzeAllDescription,
  dialogMessage,
  imagesToSend,
  nothingToAnalyzeMessage,
  progressMessage,
  resultMessage,
} from "./analyze-media.summary.js";

describe("analyze media wording", () => {
  it("sends only unanalyzed images unless all is ticked", () => {
    expect(imagesToSend(10, 3, false)).toBe(3);
    expect(imagesToSend(10, 3, true)).toBe(10);
  });

  it("describes the default run as the images not analyzed yet", () => {
    expect(dialogMessage("10", 5, 2, false)).toBe(
      '2 of 5 images in "10" and its subfolders have not been analyzed yet and will be sent to the AI. Each image takes at least one AI request (usually more with hierarchical classification).',
    );
    expect(dialogMessage("10", 3, 3, false)).toContain('3 images in "10" and its subfolders have not been analyzed yet');
    expect(dialogMessage("10", 4, 1, false)).toContain("1 of 4 images in \"10\" and its subfolders has not been analyzed yet");
  });

  it("explains when everything is already analyzed", () => {
    expect(dialogMessage("10", 4, 0, false)).toBe(
      'All 4 images in "10" and its subfolders have already been analyzed. Tick "Analyze all images" to analyze them again.',
    );
  });

  it("warns that analyze all replaces stored results", () => {
    expect(dialogMessage("10", 4, 1, true)).toContain("4 images in \"10\" and its subfolders will be sent to the AI. Stored descriptions");
  });

  it("describes the checkbox", () => {
    expect(analyzeAllDescription(5, 2)).toBe("Also re-analyze the 3 images already analyzed, replacing their stored results.");
    expect(analyzeAllDescription(2, 2)).toBe("Nothing has been analyzed yet, so every image is included either way.");
  });

  it("reports progress and nothing-to-do", () => {
    expect(progressMessage(0, 20)).toBe("Analyzing image 1 of 20 (20 left)…");
    expect(progressMessage(19, 20)).toBe("Analyzing image 20 of 20 (1 left)…");
    expect(progressMessage(20, 20)).toBe("Analyzed 20 images.");
    expect(nothingToAnalyzeMessage("10")).toBe('There are no images to analyze in "10".');
  });

  it("summarises results, failures and skipped images", () => {
    expect(resultMessage([{ analyzed: true }, { analyzed: true }], 3)).toBe(
      "Analyzed 2 of 2 images. Skipped 3 images already analyzed. Run Curate images to move them into their new folders.",
    );
    const withFailures = resultMessage(
      [
        { mediaName: "a.jpg", analyzed: false, error: "boom" },
        { mediaName: "b.jpg", analyzed: false },
        { mediaName: "c.jpg", analyzed: false },
        { mediaName: "d.jpg", analyzed: false },
        { analyzed: true },
      ],
      0,
    );
    expect(withFailures).toBe(
      "Analyzed 1 of 5 images. 4 failed: a.jpg (boom), b.jpg, c.jpg, and 1 more. Run Curate images to move them into their new folders.",
    );
  });
});
