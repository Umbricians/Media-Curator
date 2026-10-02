import { describe, expect, it } from "vitest";
import { confirmMessage, nothingToMoveMessage, resultMessage, rulesetBreakdown } from "./curate-media.summary.js";

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

  it("reports the run outcome", () => {
    expect(resultMessage({ moved: 3, alreadyInPlace: 2, failed: 0 })).toBe(
      "Curated: 3 moved, 2 already in place, 0 failed.",
    );
  });
});
