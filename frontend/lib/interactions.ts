"use client";

import { getPortfolioSessionId } from "@/lib/session";
import type { MetricsSummary } from "@/lib/types";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

function analyticsPayload() {
  return {
    session_id: getPortfolioSessionId(),
    path: window.location.pathname,
    user_agent: window.navigator.userAgent,
  };
}

export async function recordPageView(path = window.location.pathname) {
  return fetch(`${apiBaseUrl}/page-views`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...analyticsPayload(),
      path,
    }),
    keepalive: true,
  });
}

export async function recordIslandClick({
  islandId,
  href,
}: {
  islandId: string;
  href: string;
}) {
  return fetch(`${apiBaseUrl}/island-clicks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...analyticsPayload(),
      island_id: islandId,
      href,
    }),
    keepalive: true,
  });
}

export async function getMetricsSummary(): Promise<MetricsSummary | null> {
  const response = await fetch(`${apiBaseUrl}/metrics/summary`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as MetricsSummary;
}
