import { describe, expect, it } from "vitest";
import { runPool } from "./run-pool.js";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe("runPool", () => {
  it("keeps at most `limit` running and returns results in input order", async () => {
    let running = 0;
    let maxSeen = 0;
    const results = await runPool([5, 1, 4, 2, 3, 0], 3, async (n) => {
      running++;
      maxSeen = Math.max(maxSeen, running);
      await delay(n * 3);
      running--;
      return n * 10;
    });

    expect(results).toEqual([50, 10, 40, 20, 30, 0]);
    expect(maxSeen).toBe(3);
  });

  it("reports progress as each item settles", async () => {
    const progress: number[] = [];
    await runPool([1, 2, 3], 2, async (n) => n, (_, done) => progress.push(done));
    expect(progress).toEqual([1, 2, 3]);
  });

  it("treats a missing or silly limit as one at a time", async () => {
    let running = 0;
    let maxSeen = 0;
    await runPool([1, 2, 3], 0, async () => {
      running++;
      maxSeen = Math.max(maxSeen, running);
      await delay(1);
      running--;
    });
    expect(maxSeen).toBe(1);
  });

  it("handles an empty list", async () => {
    expect(await runPool([], 4, async () => 1)).toEqual([]);
  });
});
