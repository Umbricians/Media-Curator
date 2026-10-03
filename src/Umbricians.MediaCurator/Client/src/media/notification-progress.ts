import type { UmbNotificationHandler } from "@umbraco-cms/backoffice/notification";

/**
 * Changes the message of an open notification in place. Umbraco renders a notification's
 * data through a layout element; reassigning its `data` re-renders it without a new toast.
 */
export function updateNotificationMessage(
  handler: UmbNotificationHandler | undefined,
  headline: string,
  message: string,
): void {
  const layout = handler?.element.firstElementChild as (HTMLElement & { data?: unknown }) | null | undefined;
  if (layout) layout.data = { headline, message };
}
