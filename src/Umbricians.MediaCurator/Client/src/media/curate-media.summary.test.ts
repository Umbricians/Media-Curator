import { describe, expect, it } from "vitest";
import {
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
});
