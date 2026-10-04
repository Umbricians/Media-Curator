import { MediaCuratorService, type BulkRunStatusModel } from "../api/index.js";

const POLL_MS = 3000;

export const isActive = (run: { state: string } | undefined) => run?.state === "queued" || run?.state === "running";

/**
 * Polls a folder's background run until it finishes. Returns the final status, or null when the server
 * no longer knows the run (the queue is in memory, so a restart forgets it).
 */
export async function waitForBackgroundRun(
  folderKey: string,
  onProgress: (status: BulkRunStatusModel) => void,
): Promise<BulkRunStatusModel | null> {
  for (;;) {
    await new Promise((resolve) => setTimeout(resolve, POLL_MS));
    const run = await getBackgroundRun(folderKey);
    if (run === null) return null;
    if (run === undefined) continue; // A dropped request: ask again.
    if (!isActive(run)) return run;
    onProgress(run);
  }
}

/**
 * The folder's background run: null when it has none (the server answers 204), undefined when the request
 * failed. Never throws, so a dropped request cannot break a view that is only showing progress.
 */
export async function getBackgroundRun(folderKey: string): Promise<BulkRunStatusModel | null | undefined> {
  try {
    const { data, response } = await MediaCuratorService.getQueueItemStatus({ path: { mediaKey: folderKey } });
    if (response?.status === 204) return null;
    return data ?? undefined;
  } catch {
    return undefined;
  }
}
