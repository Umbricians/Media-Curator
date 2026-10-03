import { describe, expect, it } from "vitest";
import { MEDIA_ROOT_KEY, treeReloadTargets } from "./tree-reload.js";

describe("treeReloadTargets", () => {
  it("reloads every changed folder once", () => {
    expect(treeReloadTargets(["A", "b", "a"], "media", "media-root")).toEqual([
      { entityType: "media", unique: "A" },
      { entityType: "media", unique: "b" },
    ]);
  });

  it("maps the empty GUID to the media root", () => {
    expect(treeReloadTargets([MEDIA_ROOT_KEY], "media", "media-root")).toEqual([
      { entityType: "media-root", unique: null },
    ]);
  });

  it("does nothing when nothing changed", () => {
    expect(treeReloadTargets([], "media", "media-root")).toEqual([]);
  });
});
