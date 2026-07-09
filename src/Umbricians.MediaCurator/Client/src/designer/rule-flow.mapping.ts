import type { Edge, Node } from "@xyflow/react";
import type { ProviderModel, RuleNodeModel } from "../api/index.js";
import { sampleSegment } from "./rule-tree.logic.js";

export const SCOPE_NODE_ID = "scope";

const NODE_WIDTH = 320;
const X_INDENT = 48;
const Y_GAP = 32;
const SCOPE_HEIGHT = 52;

export type RuleFlowNodeKind = "scope" | "rule";

export type RuleFlowNodeData = {
  kind: RuleFlowNodeKind;
  path?: number[];
  scopeName: string;
  node?: RuleNodeModel;
  providers: ProviderModel[];
  prefix?: string[];
  isChild?: boolean;
  isLeaf?: boolean;
};

export function pathToId(path: number[]): string {
  return `rule:${path.join(".")}`;
}

export function idToPath(id: string): number[] | null {
  if (id === SCOPE_NODE_ID) return null;
  if (!id.startsWith("rule:")) return null;
  const parts = id.slice(5).split(".").map((p) => Number(p));
  return parts.some((n) => Number.isNaN(n)) ? null : parts;
}

export function edgeConditionLabel(condition?: string | null): string {
  return condition?.trim() ? condition : "always";
}

export function isValidTreeConnection(sourceId: string, targetId: string): boolean {
  if (sourceId === targetId) return false;
  if (targetId === SCOPE_NODE_ID) return false;
  const targetPath = idToPath(targetId);
  if (!targetPath) return false;
  if (sourceId === SCOPE_NODE_ID) return targetPath.length === 1;
  const sourcePath = idToPath(sourceId);
  if (!sourcePath) return false;
  if (targetPath.length !== sourcePath.length + 1) return false;
  return sourcePath.every((value, index) => targetPath[index] === value);
}

/** Estimate card height from provider settings so vertical spacing avoids overlap. */
export function estimateNodeHeight(
  rule: RuleNodeModel,
  providers: ProviderModel[],
  isChild: boolean,
  isLeaf: boolean,
): number {
  const provider = providers.find((item) => item.alias === rule.providerAlias);
  const settingsFields = provider?.settingsFields ?? [];
  const multilineFields = settingsFields.filter((field) => field.alias === "mappings" || field.alias === "palette").length;
  const regularFields = settingsFields.length - multilineFields;

  let height = 168;
  height += regularFields * 34;
  height += multilineFields * 72;
  if (isChild) height += 34;
  if (isLeaf) height += 28;
  return height;
}

export function rulesToFlow(
  rules: RuleNodeModel[],
  providers: ProviderModel[],
  scopeName: string,
): { nodes: Node<RuleFlowNodeData>[]; edges: Edge[] } {
  const nodes: Node<RuleFlowNodeData>[] = [];
  const edges: Edge[] = [];
  let nextY = 0;

  nodes.push({
    id: SCOPE_NODE_ID,
    type: "scope",
    position: { x: 0, y: nextY },
    data: { kind: "scope", scopeName, providers },
    width: NODE_WIDTH,
    height: SCOPE_HEIGHT,
  });
  nextY += SCOPE_HEIGHT + Y_GAP;

  const layoutRules = (
    ruleNodes: RuleNodeModel[],
    depth: number,
    parentId: string,
    pathPrefix: number[],
    prefixSegments: string[],
  ) => {
    for (let index = 0; index < ruleNodes.length; index++) {
      const rule = ruleNodes[index];
      const path = [...pathPrefix, index];
      const id = pathToId(path);
      const children = rule.children ?? [];
      const isChild = path.length > 1;
      const isLeaf = children.length === 0;
      const height = estimateNodeHeight(rule, providers, isChild, isLeaf);

      nodes.push({
        id,
        type: "rule",
        position: { x: depth * X_INDENT, y: nextY },
        data: {
          kind: "rule",
          path,
          node: rule,
          providers,
          scopeName,
          prefix: prefixSegments,
          isChild,
          isLeaf,
        },
        width: NODE_WIDTH,
        height,
      });

      edges.push({
        id: `e-${parentId}-${id}`,
        source: parentId,
        target: id,
        label: isChild ? edgeConditionLabel(rule.condition) : undefined,
        data: { condition: rule.condition, mark: "mc:edge" },
      });

      nextY += height + Y_GAP;

      if (children.length > 0) {
        layoutRules(
          children,
          depth + 1,
          id,
          path,
          [...prefixSegments, sampleSegment(rule, providers)],
        );
      }
    }
  };

  layoutRules(rules, 1, SCOPE_NODE_ID, [], []);

  return { nodes, edges };
}
