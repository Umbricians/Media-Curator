import { describe, expect, it } from "vitest";
import type { ProviderModel, RuleNodeModel } from "../api/index.js";
import { addChildAt, addRule, defaultSettings, examplePath, moveSibling, removeAt, reorderSibling, ruleAt, updateAt } from "./rule-tree.logic.js";

const node = (alias: string, children: RuleNodeModel[] = [], extra: Partial<RuleNodeModel> = {}): RuleNodeModel => ({
  providerAlias: alias,
  settings: {},
  fallback: "skip",
  children,
  ...extra,
});

const providers: ProviderModel[] = [
  {
    alias: "Umbricians.MediaCurator.Date",
    name: "Date Folders",
    icon: "icon-calendar",
    settingsFields: [{ alias: "format", label: "Folder pattern", type: "text", defaultValue: "yyyy/MM", options: [] }],
    requirements: [],
  },
];

describe("updateAt", () => {
  it("updates a nested node immutably", () => {
    const rules = [node("a", [node("b"), node("c")])];

    const updated = updateAt(rules, [0, 1], (n) => ({ ...n, condition: "x" }));

    expect(updated[0].children![1].condition).toBe("x");
    expect(rules[0].children![1].condition).toBeUndefined(); // original untouched
  });

  it("removes a node when the updater returns null", () => {
    const rules = [node("a", [node("b"), node("c")])];

    const updated = removeAt(rules, [0, 0]);

    expect(updated[0].children).toHaveLength(1);
    expect(updated[0].children![0].providerAlias).toBe("c");
  });
});

describe("addChildAt", () => {
  it("appends a child at the path", () => {
    const rules = [node("a")];

    const updated = addChildAt(rules, [0], node("b"));

    expect(updated[0].children![0].providerAlias).toBe("b");
  });
});

describe("moveSibling", () => {
  it("swaps siblings at root level", () => {
    const rules = [node("a"), node("b")];

    const updated = moveSibling(rules, [1], -1);

    expect(updated.map((r) => r.providerAlias)).toEqual(["b", "a"]);
  });

  it("ignores out-of-range moves", () => {
    const rules = [node("a"), node("b")];

    expect(moveSibling(rules, [0], -1).map((r) => r.providerAlias)).toEqual(["a", "b"]);
    expect(moveSibling(rules, [1], 1).map((r) => r.providerAlias)).toEqual(["a", "b"]);
  });

  it("moves nested siblings", () => {
    const rules = [node("a", [node("x"), node("y")])];

    const updated = moveSibling(rules, [0, 0], 1);

    expect(updated[0].children!.map((c) => c.providerAlias)).toEqual(["y", "x"]);
  });
});

describe("reorderSibling", () => {
  it("moves a root rule to a new index", () => {
    const rules = [node("a"), node("b"), node("c")];

    const updated = reorderSibling(rules, [2], 0);

    expect(updated.map((r) => r.providerAlias)).toEqual(["c", "a", "b"]);
  });

  it("ignores invalid target indices", () => {
    const rules = [node("a"), node("b")];

    expect(reorderSibling(rules, [0], 0).map((r) => r.providerAlias)).toEqual(["a", "b"]);
    expect(reorderSibling(rules, [0], 5).map((r) => r.providerAlias)).toEqual(["a", "b"]);
  });
});

describe("defaultSettings", () => {
  it("collects field defaults", () => {
    expect(defaultSettings(providers[0])).toEqual({ format: "yyyy/MM" });
  });
});

describe("examplePath", () => {
  it("walks the first branch and renders date tokens", () => {
    const rules = node("Umbricians.MediaCurator.Date", [node("Umbricians.MediaCurator.Alphabetical")], {
      settings: { format: "yyyy/MM" } as unknown as RuleNodeModel["settings"],
    });

    const path = examplePath("Products", rules, providers);

    const year = String(new Date().getFullYear());
    const month = String(new Date().getMonth() + 1).padStart(2, "0");
    expect(path).toBe(`Products/${year}/${month}/A`);
  });

  it("uses mapping targets and palette names for samples", () => {
    const exif = node("Umbricians.MediaCurator.Exif", [], { settings: { mappings: "NIKON CORPORATION=Nikon" } as unknown as RuleNodeModel["settings"] });
    const color = node("Umbricians.MediaCurator.Color", [], { settings: { palette: "Brand Blue=#1B264F" } as unknown as RuleNodeModel["settings"] });

    expect(examplePath("S", exif, providers)).toBe("S/Nikon");
    expect(examplePath("S", color, providers)).toBe("S/Brand Blue");
  });
});

describe("ruleAt", () => {
  it("finds nested rules and returns undefined for missing paths", () => {
    const rules = [node("a", [node("b"), node("c")])];
    expect(ruleAt(rules, [0, 1])?.providerAlias).toBe("c");
    expect(ruleAt(rules, [0, 5])).toBeUndefined();
    expect(ruleAt(rules, [])).toBeUndefined();
  });
});

describe("addRule", () => {
  it("appends a root rule and returns its path", () => {
    const { rules, path } = addRule([node("a")], null, node("b"));
    expect(path).toEqual([1]);
    expect(rules.map((r) => r.providerAlias)).toEqual(["a", "b"]);
  });

  it("appends a child after existing children and returns its path", () => {
    const { rules, path } = addRule([node("a", [node("b")])], [0], node("c"));
    expect(path).toEqual([0, 1]);
    expect(ruleAt(rules, path)?.providerAlias).toBe("c");
  });
});
