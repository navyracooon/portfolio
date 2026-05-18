"use client";

import { getPortfolioSessionId } from "@/lib/session";
import type {
  InteractionEventType,
  InteractionSummaryItem,
  ObjectTargetType,
} from "@/lib/types";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

export async function recordInteractionEvent({
  eventType,
  targetType,
  targetSlug,
}: {
  eventType: InteractionEventType;
  targetType: ObjectTargetType;
  targetSlug: string;
}) {
  return fetch(`${apiBaseUrl}/interaction-events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event_type: eventType,
      target_type: targetType,
      target_slug: targetSlug,
      session_id: getPortfolioSessionId(),
      path: window.location.pathname,
      user_agent: window.navigator.userAgent,
    }),
    keepalive: true,
  });
}

export async function getInteractionSummary(): Promise<InteractionSummaryItem[]> {
  const response = await fetch(`${apiBaseUrl}/interaction-events/summary`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return [];
  }

  return (await response.json()) as InteractionSummaryItem[];
}

export function getInteractionCount(
  items: InteractionSummaryItem[],
  targetSlug: string,
  eventType = "object_clicked",
) {
  return items.find((item) => item.target_slug === targetSlug && item.event_type === eventType)?.count ?? 0;
}
