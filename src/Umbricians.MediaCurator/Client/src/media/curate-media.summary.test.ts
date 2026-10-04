import { describe, expect, it } from "vitest";
import {
  backgroundConfirmMessage,
  backgroundProgressMessage,
  backgroundResultMessage,
  cleanupOnlyMessage,
  confirmLabel,
  confirmMessage,
  emptyFoldersDescription,
  emptyFoldersLine,
  nothingToMoveMessage,
  resultMessage,
  rulesetBreakdown,
} from "./curate-media.summary.js";

const counts = (moveCount: number, alreadyInPlaceCount = 0, skippedCount = 0) => ({
  moveCount,
  alreadyInPlaceCount,
  skippedCount,
  rulesets: [
    { name: "Dates", moveCount },
    { name: "Colors", moveCount: 0 },
  ],
});

describe("curate media wording", () => {
  it("summarises what will move, with in-place and skipped counts", () => {
    expect(confirmMessage("10", counts(3, 2, 1))).toBe(
      '3 images in "10" and its subfolders will be moved, 2 already in place, 1 skipped.',
    );
    expect(confirmMessage("10", counts(1))).toBe('1 image in "10" and its subfolders will be moved.');
  });

  it("lists only rulesets that move something", () => {
    expect(rulesetBreakdown(counts(2))).toEqual(["Dates: 2 images"]);
  });

  it("explains why nothing moves", () => {
    expect(nothingToMoveMessage("10", counts(0))).toBe('There are no images to curate in "10".');
    expect(nothingToMoveMessage("10", counts(0, 4, 1))).toBe(
      'Nothing to move in "10": 4 already in place, 1 skipped (no ruleset applies, excluded, or not an image).',
    );
  });

  it("reports removed empty folders and where they went", () => {
    const result = { moved: 3, alreadyInPlace: 0, failed: 0, foldersRemoved: 2 };
    expect(resultMessage(result)).toBe("Curated: 3 moved, 0 already in place, 0 failed. 2 empty folders moved to the Recycle Bin.");
    expect(resultMessage({ ...result, foldersRemoved: 1 }, true)).toBe(
      "Curated: 3 moved, 0 already in place, 0 failed. 1 empty folder deleted permanently.",
    );
    expect(resultMessage({ ...result, foldersRemoved: 0 })).toBe("Curated: 3 moved, 0 already in place, 0 failed.");
  });

  it("mentions empty sub-folders found by the dry run", () => {
    expect(emptyFoldersLine(0)).toBe("Any sub-folders the run leaves empty will be removed.");
    expect(emptyFoldersLine(2)).toBe("2 empty sub-folders will also be removed, plus any the run leaves empty.");
  });

  it("offers a cleanup-only run when nothing moves", () => {
    expect(cleanupOnlyMessage("10", counts(0, 4), 1)).toBe('No images in "10" need moving (4 already in place). 1 empty sub-folder will be removed.');
    expect(confirmLabel(0, 3)).toBe("Remove 3 empty folders");
    expect(confirmLabel(2, 3)).toBe("Move 2");
  });

  it("describes what happens to empty folders", () => {
    expect(emptyFoldersDescription(false)).toContain("Recycle Bin");
    expect(emptyFoldersDescription(true)).toContain("deleted permanently");
  });

  it("reports the run outcome", () => {
    expect(resultMessage({ moved: 3, alreadyInPlace: 2, failed: 0 })).toBe(
      "Curated: 3 moved, 2 already in place, 0 failed.",
    );
  });

  it("explains why a large folder is curated in the background", () => {
    expect(backgroundConfirmMessage("Demo", 10000, 100)).toBe(
      '"Demo" and its subfolders hold 10000 images. Folders with more than 100 images are curated in the background, so you can carry on working while it runs.',
    );
  });

  it("reports a background run's progress", () => {
    const run = { state: "running", processed: 250, total: 1000, imageCount: 1000, moved: 0, failed: 0, foldersRemoved: 0 };
    expect(backgroundProgressMessage("Demo", { ...run, state: "queued" })).toContain("queued");
    expect(backgroundProgressMessage("Demo", { ...run, total: 0 })).toContain("Working out");
    expect(backgroundProgressMessage("Demo", run)).toBe('Curating "Demo": 250 of 1000 images moved.');
  });

  it("reports a finished or failed background run", () => {
    const run = { state: "completed", processed: 10, total: 10, imageCount: 10, moved: 9, failed: 1, foldersRemoved: 2 };
    expect(backgroundResultMessage("Demo", run)).toBe(
      'Curated "Demo" in the background: 9 moved, 1 failed. 2 empty folders moved to the Recycle Bin.',
    );
    expect(backgroundResultMessage("Demo", { ...run, state: "failed", error: "boom" })).toContain("stopped: boom");
  });
});
