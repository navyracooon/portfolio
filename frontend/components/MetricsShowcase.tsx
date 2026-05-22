"use client";

import { useEffect, useMemo, useState } from "react";
import { FlipCounter } from "@/components/FlipCounter";
import { getMetricsSummary } from "@/lib/interactions";
import type { MetricsSummary } from "@/lib/types";
import styles from "./MetricsShowcase.module.css";

export function MetricsShowcase() {
  const [summary, setSummary] = useState<MetricsSummary | null>(null);
  const [refreshCycle, setRefreshCycle] = useState(0);

  useEffect(() => {
    let isMounted = true;

    async function refreshMetrics() {
      try {
        const nextSummary = await getMetricsSummary();

        if (isMounted) {
          setSummary(nextSummary);
        }
      } catch {
        if (isMounted) {
          setSummary(null);
        }
      } finally {
        if (isMounted) {
          setRefreshCycle((cycle) => cycle + 1);
        }
      }
    }

    void refreshMetrics();

    const intervalId = window.setInterval(refreshMetrics, 10000);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
    };
  }, []);

  const metrics = useMemo(() => {
    return {
      pageViews: summary?.total_page_views ?? 0,
      islandClicks: summary?.total_island_clicks ?? 0,
    };
  }, [summary]);

  return (
    <div className={styles.metricsShowcase} aria-label="Portfolio activity">
      <FlipCounter
        value={metrics.pageViews}
        refreshKey={refreshCycle}
        label="Page views"
        note="このポートフォリオで閲覧されたページ数です．"
      />
      <FlipCounter
        value={metrics.islandClicks}
        refreshKey={refreshCycle}
        label="Island clicks"
        note="トップページの浮遊島から各ページへ移動した回数です．"
      />
    </div>
  );
}
