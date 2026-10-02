import type { UMB_NOTIFICATION_CONTEXT } from "@umbraco-cms/backoffice/notification";

export type McNotifications = typeof UMB_NOTIFICATION_CONTEXT.TYPE | undefined;

export function notify(ctx: McNotifications, color: "positive" | "danger", message: string) {
  ctx?.peek(color, { data: { message } });
}
