import { describe, expect, it } from "vitest";
import type { ProviderModel, RuleNodeModel } from "../api/index.js";
import { ruleSummaryChips } from "./rule-flow.summary.js";

const classification: ProviderModel = {
  alias: "Umbricians.MediaCurator.Classification",
  name: "Library Classification",
  icon: "icon-books",
  requirements: [],
  settingsFields: [
    {
      alias: "scheme",
      label: "Scheme",
      type: "select",
      defaultValue: "lcc",
      options: [
        { value: "lcc", label: "Library of Congress" },
        { value: "dewey-pd", label: "Dewey (public domain)" },
      ],
    },
    { alias: "source", label: "Code source", type: "select", options: [{ value: "property", label: "Media property" }] },
    { alias: "customTable", label: "Custom code table", type: "text", options: [] },
  ],
};

const date: ProviderModel = {
  alias: "Umbricians.MediaCurator.Date",
  name: "Date Folders",
  icon: "icon-calendar",
  requirements: [],
  settingsFields: [
    { alias: "format", label: "Folder pattern", type: "text", defaultValue: "yyyy/MM", options: [] },
    {
      alias: "source",
      label: "Date source",
      type: "select",
      defaultValue: "createDate",
      options: [{ value: "createDate", label: "Upload (create) date" }],
    },
  ],
};

const unknownProvider: ProviderModel = {
  alias: "Acme.Custom",
  name: "Custom",
  icon: "icon-box",
  requirements: [],
  settingsFields: [
    { alias: "folder", label: "Folder", type: "text", options: [] },
    { alias: "mode", label: "Mode", type: "select", options: [{ value: "a", label: "Mode A" }] },
  ],
};

const rule = (providerAlias: string, settings: Record<string, unknown> = {}, extra: Partial<RuleNodeModel> = {}): RuleNodeModel => ({
  providerAlias,
  settings: settings as RuleNodeModel["settings"],
  fallback: "skip",
  children: [],
  ...extra,
});

describe("ruleSummaryChips", () => {
  it("shows the scheme option label for library classification", () => {
    const chips = ruleSummaryChips(rule(classification.alias, { scheme: "dewey-pd" }), classification);
    expect(chips).toEqual([{ text: "Dewey (public domain)", title: "Scheme: Dewey (public domain)" }]);
  });

  it("shows the date pattern and source for date folders", () => {
    const chips = ruleSummaryChips(rule(date.alias, { format: "yyyy", source: "createDate" }), date);
    expect(chips.map((chip) => chip.text)).toEqual(["yyyy", "Upload (create) date"]);
  });

  it("falls back to field defaults when a setting is missing", () => {
    const chips = ruleSummaryChips(rule(date.alias), date);
    expect(chips.map((chip) => chip.text)).toEqual(["yyyy/MM", "Upload (create) date"]);
  });

  it("uses the first select field for providers without a curated summary", () => {
    const chips = ruleSummaryChips(rule(unknownProvider.alias, { mode: "a" }), unknownProvider);
    expect(chips.map((chip) => chip.text)).toEqual(["Mode A"]);
  });

  it("prefixes a condition chip for conditional child rules", () => {
    const chips = ruleSummaryChips(rule(date.alias, {}, { condition: "2026" }), date);
    expect(chips[0]).toEqual({ text: "when 2026", title: "Only when the parent folder is \"2026\"", kind: "condition" });
  });

  it("returns no setting chips for an unknown provider", () => {
    expect(ruleSummaryChips(rule("Missing.Provider", { a: "b" }), undefined)).toEqual([]);
  });
});
