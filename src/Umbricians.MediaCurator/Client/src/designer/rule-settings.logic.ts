import type { ProviderModel, RuleNodeModel, SettingFieldModel } from "../api/index.js";
import { defaultSettings } from "./rule-tree.logic.js";

/** Pure helpers for the rule settings modal (unit-tested in Node). */

export type PropertyEditorMapping = { editorUiAlias: string; config: Array<{ alias: string; value: unknown }> };

const TEXTAREA_ALIASES = new Set(["mappings", "palette", "customTable"]);

export function editorForField(field: SettingFieldModel): PropertyEditorMapping {
  switch (field.type) {
    case "select":
      return {
        editorUiAlias: "Umb.PropertyEditorUi.Dropdown",
        config: [{ alias: "items", value: (field.options ?? []).map((o) => ({ name: o.label, value: o.value })) }],
      };
    case "toggle":
      return { editorUiAlias: "Umb.PropertyEditorUi.Toggle", config: [] };
    case "number":
      return { editorUiAlias: "Umb.PropertyEditorUi.Decimal", config: [] };
    default:
      return {
        editorUiAlias: TEXTAREA_ALIASES.has(field.alias)
          ? "Umb.PropertyEditorUi.TextArea"
          : "Umb.PropertyEditorUi.TextBox",
        config: [],
      };
  }
}

type Settings = NonNullable<RuleNodeModel["settings"]>;

function rawValue(settings: RuleNodeModel["settings"], field: SettingFieldModel): unknown {
  const stored = (settings as Record<string, unknown> | null | undefined)?.[field.alias];
  return stored === undefined || stored === null ? field.defaultValue ?? undefined : stored;
}

/** Stored setting (string, or legacy boolean/number) -> value for the property editor. */
export function toEditorValue(settings: RuleNodeModel["settings"], field: SettingFieldModel): unknown {
  const raw = rawValue(settings, field);
  switch (field.type) {
    case "select":
      return raw === undefined ? [] : [String(raw)];
    case "toggle":
      return typeof raw === "boolean" ? raw : String(raw ?? "").toLowerCase() === "true";
    case "number": {
      if (raw === undefined || raw === "") return undefined;
      const n = typeof raw === "number" ? raw : Number(raw);
      return Number.isFinite(n) ? n : undefined;
    }
    default:
      return raw === undefined ? "" : String(raw);
  }
}

/** Property editor value -> string to persist (server reads every setting as a string). */
export function fromEditorValue(field: SettingFieldModel, value: unknown): string | undefined {
  switch (field.type) {
    case "select": {
      const first = Array.isArray(value) ? value[0] : value;
      return first === undefined || first === null || first === "" ? undefined : String(first);
    }
    case "toggle":
      return value === true || value === "true" ? "true" : "false";
    case "number":
      return value === undefined || value === null || value === "" || !Number.isFinite(Number(value))
        ? undefined
        : String(value);
    default:
      return value === undefined || value === null ? "" : String(value);
  }
}

export function buildDatasetValue(
  provider: ProviderModel | undefined,
  settings: RuleNodeModel["settings"],
): Array<{ alias: string; value: unknown }> {
  return (provider?.settingsFields ?? []).map((f) => ({ alias: f.alias, value: toEditorValue(settings, f) }));
}

/** Apply a dataset change onto settings; undefined results drop the key. */
export function applyDatasetChange(
  provider: ProviderModel | undefined,
  settings: RuleNodeModel["settings"],
  dataset: Array<{ alias: string; value: unknown }>,
): Settings {
  const next: Record<string, unknown> = { ...((settings as Record<string, unknown> | null | undefined) ?? {}) };
  for (const field of provider?.settingsFields ?? []) {
    const entry = dataset.find((d) => d.alias === field.alias);
    if (!entry) continue;
    const str = fromEditorValue(field, entry.value);
    if (str === undefined) delete next[field.alias];
    else next[field.alias] = str;
  }
  return next as Settings;
}

/** Changing provider resets settings to the new provider's (string) defaults; children preserved. */
export function changeProvider(rule: RuleNodeModel, newProvider: ProviderModel): RuleNodeModel {
  if (rule.providerAlias === newProvider.alias) return rule;
  return { ...rule, providerAlias: newProvider.alias, settings: defaultSettings(newProvider) };
}

/** Normalise a rule for submit: empty condition -> undefined; children untouched. */
export function finalizeRule(rule: RuleNodeModel): RuleNodeModel {
  const condition = rule.condition?.trim();
  return { ...rule, condition: condition ? rule.condition : undefined };
}
