import { describe, expect, it } from "vitest";
import type { RulesetModel } from "../api/index.js";
import { MC_EMPTY_GUID, MC_RULESET_ENTITY_TYPE } from "./entity.js";
import { scaffoldRuleset, toDetailModel, toItemModel, toRulesetModel } from "./ruleset.mapper.js";

const ruleset: RulesetModel = {
  key: "3f1c2a4e-0000-0000-0000-000000000001",
  scopeRootKey: "3f1c2a4e-0000-0000-0000-000000000002",
  name: "Dates",
  cultureName: null,
  enabled: true,
  rules: [{ providerAlias: "Umbricians.MediaCurator.Date", settings: {}, fallback: "skip", children: [] }],
  dateUpdated: "2026-10-01T10:00:00Z",
};

describe("ruleset mapper", () => {
  it("round-trips a ruleset through the detail model", () => {
    const detail = toDetailModel(ruleset);
    expect(detail.unique).toBe(ruleset.key);
    expect(detail.entityType).toBe(MC_RULESET_ENTITY_TYPE);
    expect(detail).not.toHaveProperty("key");
    expect(toRulesetModel(detail)).toEqual(ruleset);
  });

  it("maps tree/item models by key and name", () => {
    expect(toItemModel(ruleset)).toEqual({ entityType: MC_RULESET_ENTITY_TYPE, unique: ruleset.key, name: "Dates" });
  });

  it("scaffolds an enabled ruleset with no scope or rules", () => {
    const scaffold = scaffoldRuleset("abc");
    expect(scaffold).toMatchObject({ unique: "abc", name: "", enabled: true, rules: [], scopeRootKey: MC_EMPTY_GUID });
  });
});
