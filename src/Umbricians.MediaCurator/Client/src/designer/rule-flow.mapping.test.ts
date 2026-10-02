import { describe, expect, it } from "vitest";
import type { RuleNodeModel } from "../api/index.js";
import {
  idToPath,
  isValidTreeConnection,
  pathToId,
  resolveSiblingDropIndex,
  rulesStructureKey,
  rulesToFlow,
  SCOPE_NODE_ID,
  Y_GAP,
  subtreeBottom,
} from "./rule-flow.mapping.js";

const node = (alias: string, children: RuleNodeModel[] = [], extra: Partial<RuleNodeModel> = {}): RuleNodeModel => ({
  providerAlias: alias,
  settings: {},
  fallback: "skip",
  children,
  ...extra,
});

describe("pathToId / idToPath", () => {
  it("round-trips rule paths", () => {
    expect(pathToId([0, 1, 2])).toBe("rule:0.1.2");
    expect(idToPath("rule:0.1.2")).toEqual([0, 1, 2]);
    expect(idToPath(SCOPE_NODE_ID)).toBeNull();
  });
});

describe("isValidTreeConnection", () => {
  it("allows scope to root rules only", () => {
    expect(isValidTreeConnection(SCOPE_NODE_ID, "rule:0")).toBe(true);
    expect(isValidTreeConnection(SCOPE_NODE_ID, "rule:0.1")).toBe(false);
  });

  it("allows parent to direct child only", () => {
    expect(isValidTreeConnection("rule:0", "rule:0.0")).toBe(true);
    expect(isValidTreeConnection("rule:0", "rule:0.1")).toBe(true);
    expect(isValidTreeConnection("rule:0", "rule:1")).toBe(false);
    expect(isValidTreeConnection("rule:0", "rule:0.0.0")).toBe(false);
  });

  it("rejects cycles and scope targets", () => {
    expect(isValidTreeConnection("rule:0", "rule:0")).toBe(false);
    expect(isValidTreeConnection("rule:0", SCOPE_NODE_ID)).toBe(false);
  });
});

describe("rulesToFlow", () => {
  it("creates scope, rule nodes, and parent-to-child edges", () => {
    const rules = [node("a", [node("b", [], { condition: "x" })])];
    const { nodes, edges } = rulesToFlow(rules, [], "Products");

    expect(nodes).toHaveLength(3);
    expect(nodes[0]?.id).toBe(SCOPE_NODE_ID);
    expect(nodes[1]?.id).toBe("rule:0");
    expect(nodes[2]?.id).toBe("rule:0.0");

    const childEdge = edges.find((edge) => edge.target === "rule:0.0");
    expect(childEdge?.source).toBe("rule:0");
    expect(childEdge?.data?.condition).toBe("x");
  });

  it("connects root rules to the scope", () => {
    const { edges } = rulesToFlow([node("a")], [], "Products");
    expect(edges.find((edge) => edge.target === "rule:0")?.source).toBe(SCOPE_NODE_ID);
  });

  it("stacks nodes vertically and indents by depth", () => {
    const rules = [node("a", [node("b", [], { condition: "x" })])];
    const { nodes } = rulesToFlow(rules, [], "Products");

    const scope = nodes.find((item) => item.id === SCOPE_NODE_ID);
    const root = nodes.find((item) => item.id === "rule:0");
    const child = nodes.find((item) => item.id === "rule:0.0");

    expect(scope?.position.y).toBe(0);
    expect(root?.position.y).toBeGreaterThan(scope?.position.y ?? 0);
    expect(child?.position.y).toBeGreaterThan(root?.position.y ?? 0);
    expect(child?.position.x).toBeGreaterThan(root?.position.x ?? 0);
    // Auto-layout leaves a visible gap between stacked cards.
    expect((child?.position.y ?? 0) - ((root?.position.y ?? 0) + (root?.initialHeight ?? 0))).toBeGreaterThanOrEqual(Y_GAP);
  });

  it("does not pin node heights, so cards can size to their content", () => {
    const { nodes } = rulesToFlow([node("a")], [], "Products");
    expect(nodes.every((item) => item.height === undefined)).toBe(true);
  });

  it("stacks using measured heights when they are known", () => {
    const rules = [node("a"), node("b")];
    const measured = new Map([["rule:0", 400]]);
    const { nodes } = rulesToFlow(rules, [], "Products", measured);

    const first = nodes.find((item) => item.id === "rule:0");
    const second = nodes.find((item) => item.id === "rule:1");

    expect(first?.initialHeight).toBe(400);
    expect((second?.position.y ?? 0) - ((first?.position.y ?? 0) + 400)).toBe(Y_GAP);
  });
});

describe("rulesStructureKey", () => {
  it("changes when sibling order changes for distinct providers", () => {
    const first = rulesStructureKey([node("a"), node("b")]);
    const second = rulesStructureKey([node("b"), node("a")]);
    expect(first).not.toBe(second);
  });

  it("stays the same when identical-provider siblings swap", () => {
    const first = rulesStructureKey([node("a"), node("a")]);
    const second = rulesStructureKey([node("a"), node("a")]);
    expect(first).toBe(second);
  });
});

describe("resolveSiblingDropIndex", () => {
  it("moves a root rule up across a sibling subtree gap", () => {
    const layout = [
      { id: SCOPE_NODE_ID, position: { x: 0, y: 0 }, height: 52 },
      { id: "rule:0", position: { x: 48, y: 84 }, height: 200 },
      { id: "rule:0.0", position: { x: 96, y: 316 }, height: 150 },
      { id: "rule:1", position: { x: 48, y: 498 }, height: 180 },
    ];

    const dragged = { id: "rule:1", position: { x: 48, y: 250 }, height: 180 };
    expect(resolveSiblingDropIndex(dragged, layout)).toBe(0);
  });

  it("keeps the index when dropped near the original slot", () => {
    const layout = [
      { id: "rule:0", position: { x: 48, y: 84 }, height: 200 },
      { id: "rule:1", position: { x: 48, y: 498 }, height: 180 },
    ];

    const dragged = { id: "rule:1", position: { x: 48, y: 470 }, height: 180 };
    expect(resolveSiblingDropIndex(dragged, layout)).toBe(1);
  });

  it("uses subtree bottom when computing reorder boundaries", () => {
    const layout = [
      { id: "rule:0", position: { x: 48, y: 0 }, height: 100 },
      { id: "rule:0.0", position: { x: 96, y: 132 }, height: 80 },
      { id: "rule:1", position: { x: 48, y: 244 }, height: 100 },
    ];

    expect(subtreeBottom("rule:0", layout)).toBe(212);
    expect(resolveSiblingDropIndex({ id: "rule:1", position: { x: 48, y: 170 }, height: 100 }, layout)).toBe(0);
  });
});
