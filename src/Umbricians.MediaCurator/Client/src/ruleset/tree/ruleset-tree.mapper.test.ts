import { describe, expect, it } from "vitest";
import { MC_ROOT_ENTITY_TYPE, MC_RULESET_ENTITY_TYPE } from "../entity.js";
import { sortRulesetsByName, toTreeItem } from "./ruleset-tree.mapper.js";

describe("ruleset tree mapper", () => {
  it("maps a ruleset to a flat child of the root", () => {
    expect(toTreeItem({ key: "k1", name: "Dates" })).toEqual({
      unique: "k1",
      parent: { unique: null, entityType: MC_ROOT_ENTITY_TYPE },
      name: "Dates",
      entityType: MC_RULESET_ENTITY_TYPE,
      hasChildren: false,
      isFolder: false,
      icon: "icon-mindmap",
    });
  });

  it("sorts by name case-insensitively without mutating", () => {
    const input = [{ name: "b" }, { name: "A" }, { name: "c" }];
    expect(sortRulesetsByName(input).map((r) => r.name)).toEqual(["A", "b", "c"]);
    expect(input[0].name).toBe("b");
  });
});
