/**
 * Runs `work` for every item with at most `limit` in flight, calling `onSettled` as each finishes.
 * Results keep the order of `items`. `work` should not throw; a throw rejects the whole run.
 */
export async function runPool<TItem, TResult>(
  items: readonly TItem[],
  limit: number,
  work: (item: TItem) => Promise<TResult>,
  onSettled?: (result: TResult, done: number) => void,
): Promise<TResult[]> {
  const results = new Array<TResult>(items.length);
  let next = 0;
  let done = 0;

  async function worker() {
    while (next < items.length) {
      const index = next++;
      results[index] = await work(items[index]);
      done++;
      onSettled?.(results[index], done);
    }
  }

  const workers = Math.max(1, Math.min(Math.floor(limit) || 1, items.length));
  await Promise.all(Array.from({ length: workers }, worker));
  return results;
}
