import { describe, expect, it } from "vitest";
import type { RuleNodeModel } from "../api/index.js";
import {
  edgeConditionLabel,
  idToPath,
  isValidTreeConnection,
  pathToId,
  rulesToFlow,
  SCOPE_NODE_ID,
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

describe("edgeConditionLabel", () => {
  it("uses always for empty conditions", () => {
    expect(edgeConditionLabel(undefined)).toBe("always");
    expect(edgeConditionLabel("  ")).toBe("always");
    expect(edgeConditionLabel("2026")).toBe("2026");
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
  it("creates scope, rule nodes, and conditional edges", () => {
    const rules = [node("a", [node("b", [], { condition: "x" })])];
    const { nodes, edges } = rulesToFlow(rules, [], "Products");

    expect(nodes).toHaveLength(3);
    expect(nodes[0]?.id).toBe(SCOPE_NODE_ID);
    expect(nodes[1]?.id).toBe("rule:0");
    expect(nodes[2]?.id).toBe("rule:0.0");

    const childEdge = edges.find((edge) => edge.target === "rule:0.0");
    expect(childEdge?.label).toBe("x");
  });

  it("omits edge labels for root rules", () => {
    const { edges } = rulesToFlow([node("a")], [], "Products");
    const rootEdge = edges.find((edge) => edge.target === "rule:0");
    expect(rootEdge?.label).toBeUndefined();
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
  });
});
