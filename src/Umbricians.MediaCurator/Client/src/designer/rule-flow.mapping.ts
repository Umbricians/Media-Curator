import type { Edge, Node } from "@xyflow/react";
import type { ProviderModel, RuleNodeModel } from "../api/index.js";
import { sampleSegment } from "./rule-tree.logic.js";

export const SCOPE_NODE_ID = "scope";

const NODE_WIDTH = 320;
const X_INDENT = 48;
const Y_GAP = 48;
const SCOPE_HEIGHT = 48;

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

  // Calibrated against rendered node heights in the backoffice designer.
  let height = 118;
  height += regularFields * 28;
  height += multilineFields * 64;
  if (isChild) height += 30;
  if (isLeaf) height += 24;
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
    draggable: false,
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
        draggable: true,
        dragHandle: ".mc-rule-flow-drag-handle",
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

/** Stable key for tree shape — add/remove/reorder only, not field edits. */
export function rulesStructureKey(rules: RuleNodeModel[]): string {
  const parts: string[] = [];
  const walk = (nodes: RuleNodeModel[], prefix: number[]) => {
    nodes.forEach((node, index) => {
      const path = [...prefix, index];
      parts.push(`${path.join(".")}:${node.providerAlias}`);
      walk(node.children ?? [], path);
    });
  };
  walk(rules, []);
  return parts.join(",");
}

type LayoutNode = Pick<Node, "id" | "position"> & {
  height?: number;
  measured?: { height?: number };
};

export function flowNodeHeight(node: LayoutNode): number {
  return node.height ?? node.measured?.height ?? 150;
}

export function flowNodeCenterY(node: LayoutNode): number {
  return node.position.y + flowNodeHeight(node) / 2;
}

export function siblingFlowNodes(path: number[], nodes: LayoutNode[]): LayoutNode[] {
  return nodes.filter((node) => {
    const nodePath = idToPath(node.id);
    if (!nodePath || nodePath.length !== path.length) return false;
    return nodePath.slice(0, -1).every((value, index) => value === path[index]);
  });
}

export function subtreeBottom(nodeId: string, nodes: LayoutNode[]): number {
  const node = nodes.find((item) => item.id === nodeId);
  if (!node) return 0;

  let bottom = node.position.y + flowNodeHeight(node);
  const parentPath = idToPath(nodeId);
  if (!parentPath) return bottom;

  for (const candidate of nodes) {
    const candidatePath = idToPath(candidate.id);
    if (!candidatePath) continue;
    if (
      candidatePath.length === parentPath.length + 1 &&
      candidatePath.slice(0, -1).every((value, index) => value === parentPath[index])
    ) {
      bottom = Math.max(bottom, subtreeBottom(candidate.id, nodes));
    }
  }

  return bottom;
}

/**
 * Resolve the sibling index a dragged node should occupy.
 * Boundaries use layout positions so gaps between sibling subtrees count as valid drop zones.
 */
export function resolveSiblingDropIndex(
  dragged: LayoutNode,
  layoutNodes: LayoutNode[],
): number {
  const path = idToPath(dragged.id);
  if (!path) return 0;

  let index = path[path.length - 1];
  const siblings = siblingFlowNodes(path, layoutNodes).sort(
    (a, b) => idToPath(a.id)![idToPath(a.id)!.length - 1] - idToPath(b.id)![idToPath(b.id)!.length - 1],
  );
  const layoutById = new Map(layoutNodes.map((node) => [node.id, node]));
  const dragCenter = flowNodeCenterY(dragged);
  const originalTop = layoutById.get(dragged.id)?.position.y ?? dragged.position.y;

  while (index > 0) {
    const previous = siblings[index - 1];
    const boundary = (subtreeBottom(previous.id, layoutNodes) + originalTop) / 2;
    if (dragCenter >= boundary) break;
    index -= 1;
  }

  while (index < siblings.length - 1) {
    const next = siblings[index + 1];
    const boundary = (subtreeBottom(dragged.id, layoutNodes) + layoutById.get(next.id)!.position.y) / 2;
    if (dragCenter <= boundary) break;
    index += 1;
  }

  return index;
}
