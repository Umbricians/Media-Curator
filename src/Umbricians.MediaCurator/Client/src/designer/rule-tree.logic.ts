import type { ProviderModel, RuleNodeModel } from "../api/index.js";

/** Pure tree-manipulation and preview logic for the ruleset designer (unit-tested in Node). */

export function updateAt(
  rules: RuleNodeModel[],
  path: number[],
  update: (node: RuleNodeModel) => RuleNodeModel | null,
): RuleNodeModel[] {
  const clone = (nodes: RuleNodeModel[], depth: number): RuleNodeModel[] =>
    nodes.flatMap((node, i) => {
      if (i !== path[depth]) return [node];
      if (depth === path.length - 1) {
        const updated = update(node);
        return updated === null ? [] : [updated];
      }
      return [{ ...node, children: clone(node.children ?? [], depth + 1) }];
    });
  return clone(rules, 0);
}

export function addChildAt(rules: RuleNodeModel[], path: number[], child: RuleNodeModel): RuleNodeModel[] {
  return updateAt(rules, path, (node) => ({ ...node, children: [...(node.children ?? []), child] }));
}

export function removeAt(rules: RuleNodeModel[], path: number[]): RuleNodeModel[] {
  return updateAt(rules, path, () => null);
}

export function moveSibling(rules: RuleNodeModel[], path: number[], delta: number): RuleNodeModel[] {
  const parentPath = path.slice(0, -1);
  const index = path[path.length - 1];
  const moveIn = (siblings: RuleNodeModel[]): RuleNodeModel[] => {
    const target = index + delta;
    if (target < 0 || target >= siblings.length) return siblings;
    const copy = [...siblings];
    const current = copy[index];
    const swapWith = copy[target];
    if (!current || !swapWith) return siblings;
    copy[index] = swapWith;
    copy[target] = current;
    return copy;
  };
  return parentPath.length === 0
    ? moveIn(rules)
    : updateAt(rules, parentPath, (node) => ({ ...node, children: moveIn(node.children ?? []) }));
}

export function reorderSibling(rules: RuleNodeModel[], path: number[], newIndex: number): RuleNodeModel[] {
  const parentPath = path.slice(0, -1);
  const oldIndex = path[path.length - 1];
  const reorderIn = (siblings: RuleNodeModel[]): RuleNodeModel[] => {
    if (newIndex < 0 || newIndex >= siblings.length || newIndex === oldIndex) return siblings;
    const copy = [...siblings];
    const [item] = copy.splice(oldIndex, 1);
    if (!item) return siblings;
    copy.splice(newIndex, 0, item);
    return copy;
  };
  return parentPath.length === 0
    ? reorderIn(rules)
    : updateAt(rules, parentPath, (node) => ({ ...node, children: reorderIn(node.children ?? []) }));
}

export function defaultSettings(provider: ProviderModel): NonNullable<RuleNodeModel["settings"]> {
  const settings: Record<string, unknown> = {};
  for (const field of provider.settingsFields ?? []) {
    if (field.defaultValue != null) settings[field.alias] = field.defaultValue;
  }
  return settings as NonNullable<RuleNodeModel["settings"]>;
}

/** Live example path (§11.1): first-branch walk producing a sample segment per level. */
export function examplePath(scopeName: string, node: RuleNodeModel, providers: ProviderModel[]): string {
  const segments: string[] = [];
  let current: RuleNodeModel | undefined = node;
  while (current) {
    const sample = sampleSegment(current, providers);
    if (sample) segments.push(sample);
    current = (current.children ?? [])[0];
  }
  return `${scopeName}/${segments.join("/")}`;
}

export function sampleSegment(node: RuleNodeModel, providers: ProviderModel[]): string {
  const settings = (node.settings ?? {}) as Record<string, unknown>;
  const firstMapping = (key: string, fallback: string) => {
    const text = String(settings[key] ?? "");
    const line = text.split("\n").find((l) => l.includes("="));
    return line ? line.split("=")[1]?.trim() || fallback : fallback;
  };
  switch (node.providerAlias) {
    case "Umbricians.MediaCurator.Date": {
      const format = String(settings["format"] ?? "yyyy/MM");
      const now = new Date();
      return format
        .split("/")
        .map((part) =>
          part
            .replace(/yyyy/g, String(now.getFullYear()))
            .replace(/yy/g, String(now.getFullYear()).slice(-2))
            .replace(/MMMM/g, now.toLocaleString(undefined, { month: "long" }))
            .replace(/MM/g, String(now.getMonth() + 1).padStart(2, "0"))
            .replace(/dd/g, String(now.getDate()).padStart(2, "0")),
        )
        .join("/");
    }
    case "Umbricians.MediaCurator.Alphabetical":
      return "A";
    case "Umbricians.MediaCurator.Exif":
      return firstMapping("mappings", "Nikon");
    case "Umbricians.MediaCurator.AiTag":
      return firstMapping("mappings", "people");
    case "Umbricians.MediaCurator.Color": {
      const palette = String(settings["palette"] ?? "Red=#FF0000");
      return palette.split("\n")[0]?.split("=")[0]?.trim() || "Red";
    }
    default:
      return providers.find((p) => p.alias === node.providerAlias)?.name ?? "…";
  }
}
