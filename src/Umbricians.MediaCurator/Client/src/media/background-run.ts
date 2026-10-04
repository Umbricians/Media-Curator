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
    const { data: status, response } = await MediaCuratorService.getQueueItemStatus({ path: { mediaKey: folderKey } });
    if (response?.status === 404) return null;
    if (!status) continue; // A dropped request: ask again.
    if (!isActive(status)) return status;
    onProgress(status);
  }
}
