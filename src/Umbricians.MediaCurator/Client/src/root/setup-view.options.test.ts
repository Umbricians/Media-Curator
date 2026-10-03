import { describe, expect, it } from "vitest";
import { profileOptions, reasoningOptions } from "./setup-view.options.js";

const ai = {
  profiles: [
    { alias: "vision", name: "Vision", model: "gpt-5.5" },
    { alias: "fast", name: "Fast" },
  ],
  jevAvailable: false,
  maxParallelAnalysesLimit: 16,
};

describe("profileOptions", () => {
  it("leads with the fallback and selects it when no profile is chosen", () => {
    const options = profileOptions(ai, null, "Same as describing images");
    expect(options[0]).toEqual({ name: "Same as describing images", value: "", selected: true });
    expect(options.map((o) => o.name)).toEqual(["Same as describing images", "Vision (gpt-5.5)", "Fast"]);
  });

  it("selects the saved profile", () => {
    const options = profileOptions(ai, "fast", "Default");
    expect(options.filter((o) => o.selected).map((o) => o.value)).toEqual(["fast"]);
  });

  it("keeps a saved profile that no longer exists", () => {
    const options = profileOptions(ai, "deleted", "Default");
    expect(options[options.length - 1]).toEqual({ name: "deleted (not found)", value: "deleted", selected: true });
  });
});

describe("reasoningOptions", () => {
  it("marks the recommended level and the selected one", () => {
    const options = reasoningOptions("Medium", "Low");
    expect(options.find((o) => o.value === "Low")?.name).toBe("Low (recommended)");
    expect(options.filter((o) => o.selected).map((o) => o.value)).toEqual(["Medium"]);
  });
});
