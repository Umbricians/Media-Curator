import { describe, expect, it } from "vitest";
import type { ProviderModel, RuleNodeModel, SettingFieldModel } from "../api/index.js";
import {
  applyDatasetChange, buildDatasetValue, changeProvider, editorForField, finalizeRule, fromEditorValue, toEditorValue,
} from "./rule-settings.logic.js";

const f = (o: Partial<SettingFieldModel>): SettingFieldModel => ({ alias: "x", label: "X", type: "text", options: [], ...o });
const S = (o: Record<string, unknown>) => o as never;
const provider: ProviderModel = {
  alias: "P", name: "P", icon: "i", requirements: [],
  settingsFields: [
    f({ alias: "mode", type: "select", defaultValue: "a", options: [{ value: "a", label: "A" }, { value: "b", label: "B" }] }),
    f({ alias: "flag", type: "toggle", defaultValue: "true" }),
    f({ alias: "threshold", type: "number", defaultValue: "0.6" }),
  ],
};

describe("editorForField", () => {
  it("maps types", () => {
    expect(editorForField(f({ type: "select", options: [{ value: "a", label: "A" }] }))).toEqual({
      editorUiAlias: "Umb.PropertyEditorUi.Dropdown",
      config: [{ alias: "items", value: [{ name: "A", value: "a" }] }],
    });
    expect(editorForField(f({ type: "toggle" })).editorUiAlias).toBe("Umb.PropertyEditorUi.Toggle");
    expect(editorForField(f({ type: "number" })).editorUiAlias).toBe("Umb.PropertyEditorUi.Decimal");
    expect(editorForField(f({ alias: "palette" })).editorUiAlias).toBe("Umb.PropertyEditorUi.TextArea");
    expect(editorForField(f({ alias: "format" })).editorUiAlias).toBe("Umb.PropertyEditorUi.TextBox");
  });
});

describe("value conversion", () => {
  it("reads strings and legacy values, falling back to default", () => {
    expect(toEditorValue(S({ mode: "b" }), provider.settingsFields[0]!)).toEqual(["b"]);
    expect(toEditorValue({}, provider.settingsFields[0]!)).toEqual(["a"]);
    expect(toEditorValue(S({ flag: "false" }), provider.settingsFields[1]!)).toBe(false);
    expect(toEditorValue(S({ flag: false }), provider.settingsFields[1]!)).toBe(false);
    expect(toEditorValue({}, provider.settingsFields[1]!)).toBe(true);
    expect(toEditorValue(S({ threshold: 5 }), provider.settingsFields[2]!)).toBe(5);
    expect(toEditorValue({}, provider.settingsFields[2]!)).toBe(0.6);
  });
  it("writes strings", () => {
    expect(fromEditorValue(provider.settingsFields[0]!, ["b"])).toBe("b");
    expect(fromEditorValue(provider.settingsFields[1]!, true)).toBe("true");
    expect(fromEditorValue(provider.settingsFields[1]!, false)).toBe("false");
    expect(fromEditorValue(provider.settingsFields[2]!, 0.75)).toBe("0.75");
    expect(fromEditorValue(provider.settingsFields[2]!, undefined)).toBeUndefined();
  });
  it("applies dataset changes as strings and drops cleared values", () => {
    const out = applyDatasetChange(provider, S({ mode: "a", other: "keep" }), [
      { alias: "mode", value: ["b"] }, { alias: "flag", value: true }, { alias: "threshold", value: 5 },
    ]);
    expect(out).toEqual({ mode: "b", other: "keep", flag: "true", threshold: "5" });
    expect(buildDatasetValue(provider, out).map((d) => d.alias)).toEqual(["mode", "flag", "threshold"]);
  });
});

describe("provider change and finalize", () => {
  const rule: RuleNodeModel = { providerAlias: "Old", settings: S({ z: "1" }), fallback: "skip", children: [{ providerAlias: "c", fallback: "skip", children: [] }] };
  it("resets settings, keeps children", () => {
    const r = changeProvider(rule, provider);
    expect(r.providerAlias).toBe("P");
    expect(r.settings).toEqual({ mode: "a", flag: "true", threshold: "0.6" });
    expect(r.children).toBe(rule.children);
  });
  it("is a no-op for the same provider", () => {
    expect(changeProvider({ ...rule, providerAlias: "P" }, provider).settings).toEqual({ z: "1" });
  });
  it("clears empty condition", () => {
    expect(finalizeRule({ ...rule, condition: "  " }).condition).toBeUndefined();
    expect(finalizeRule({ ...rule, condition: "x" }).condition).toBe("x");
  });
});
