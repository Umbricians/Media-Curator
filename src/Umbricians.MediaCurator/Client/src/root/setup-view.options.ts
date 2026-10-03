import type {
  AiReasoningEffort,
  AiSettingsOptionsModel,
  ClassificationMethod,
  MediaCuratorSiteSettingsModel,
} from "../api/index.js";

export type SelectOption = { name: string; value: string; selected?: boolean; disabled?: boolean };

export const DEFAULT_SETTINGS: MediaCuratorSiteSettingsModel = {
  aiEnabled: true,
  persistImageDescription: true,
  recognitionImageSize: 768,
  descriptionReasoningEffort: "Low",
  classificationMethod: "OneStep",
  decisionEngine: "UmbracoAi",
  decisionReasoningEffort: "None",
  jevModel: "jev-latest",
  jevApiKeyConfigured: false,
  jevApiKeySource: "None",
  maxParallelAnalyses: 4,
  savePreparedImages: false,
};

export const CLASSIFICATION_METHODS: { value: ClassificationMethod; name: string }[] = [
  { value: "OneStep", name: "Describe, then pick the code in one step (recommended)" },
  { value: "StepByStep", name: "Describe, then pick one level at a time" },
  { value: "SingleCall", name: "One call with the image and the whole scheme" },
];

export const IMAGE_SIZES: SelectOption[] = [
  { name: "512 px", value: "512" },
  { name: "768 px (recommended)", value: "768" },
  { name: "1024 px", value: "1024" },
  { name: "1536 px", value: "1536" },
  { name: "Original file", value: "0" },
];

const REASONING: { value: AiReasoningEffort; name: string }[] = [
  { value: "Default", name: "Profile or model default" },
  { value: "None", name: "None" },
  { value: "Low", name: "Low" },
  { value: "Medium", name: "Medium" },
  { value: "High", name: "High" },
];

/** Reasoning choices with the benchmarked one marked as recommended. */
export function reasoningOptions(selected: AiReasoningEffort, recommended: AiReasoningEffort): SelectOption[] {
  return REASONING.map((r) => ({
    value: r.value,
    name: r.value === recommended ? `${r.name} (recommended)` : r.name,
    selected: r.value === selected,
  }));
}

/**
 * Chat profiles to pick from, led by the "use the fallback" option (empty value). A saved alias that
 * no longer exists stays listed so saving the page does not silently change it.
 */
export function profileOptions(
  ai: AiSettingsOptionsModel,
  selected: string | null | undefined,
  fallbackLabel: string,
): SelectOption[] {
  const options: SelectOption[] = [{ name: fallbackLabel, value: "", selected: !selected }];
  for (const profile of ai.profiles) {
    options.push({
      name: profile.model ? `${profile.name} (${profile.model})` : profile.name,
      value: profile.alias,
      selected: profile.alias === selected,
    });
  }
  if (selected && !ai.profiles.some((p) => p.alias === selected)) {
    options.push({ name: `${selected} (not found)`, value: selected, selected: true });
  }
  return options;
}
