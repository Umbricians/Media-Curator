import type { ProviderModel, RuleNodeModel, SettingFieldModel } from "../api/index.js";

export type RuleSummaryChip = {
  text: string;
  title: string;
  kind?: "condition";
};

/**
 * The one or two settings that identify a rule at a glance on its canvas block.
 * Providers not listed here show their first select field.
 */
const SUMMARY_FIELDS: Record<string, string[]> = {
  "Umbricians.MediaCurator.Date": ["format", "source"],
  "Umbricians.MediaCurator.Classification": ["scheme"],
  "Umbricians.MediaCurator.Color": ["mode"],
  "Umbricians.MediaCurator.Exif": ["tag"],
  "Umbricians.MediaCurator.AiTag": ["threshold"],
  "Umbricians.MediaCurator.Filename": ["pattern"],
  "Umbricians.MediaCurator.Alphabetical": [],
  "Umbricians.MediaCurator.Dimensions": [],
  "Umbricians.MediaCurator.Format": [],
};

function summaryFields(provider: ProviderModel): SettingFieldModel[] {
  const fields = provider.settingsFields ?? [];
  const aliases = SUMMARY_FIELDS[provider.alias];
  if (!aliases) {
    const firstSelect = fields.find((field) => field.type === "select");
    return firstSelect ? [firstSelect] : [];
  }
  return aliases
    .map((alias) => fields.find((field) => field.alias === alias))
    .filter((field): field is SettingFieldModel => field !== undefined);
}

function displayValue(field: SettingFieldModel, raw: unknown): string {
  const value = String(raw ?? field.defaultValue ?? "").trim();
  if (field.type === "select") {
    return field.options?.find((option) => option.value === value)?.label ?? value;
  }
  return value;
}

export function ruleSummaryChips(rule: RuleNodeModel, provider: ProviderModel | undefined): RuleSummaryChip[] {
  const chips: RuleSummaryChip[] = [];
  const condition = rule.condition?.trim();
  if (condition) {
    chips.push({ text: `when ${condition}`, title: `Only when the parent folder is "${condition}"`, kind: "condition" });
  }
  if (!provider) return chips;

  const settings = (rule.settings ?? {}) as Record<string, unknown>;
  for (const field of summaryFields(provider)) {
    const text = displayValue(field, settings[field.alias]);
    if (text) chips.push({ text, title: `${field.label}: ${text}` });
  }
  return chips;
}
