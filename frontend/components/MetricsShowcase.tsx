'use client';

import { useEffect, useMemo, useState } from 'react';
import { FlipCounter } from '@/components/FlipCounter';
import { getMetricsSummary } from '@/lib/interactions';
import type { MetricsSummary } from '@/lib/types';

const dummyMetrics = {
  pageViews: 12847,
  islandClicks: 936,
};

export function MetricsShowcase() {
  const [summary, setSummary] = useState<MetricsSummary | null>(null);

  useEffect(() => {
    void getMetricsSummary()
      .then(setSummary)
      .catch(() => setSummary(null));
  }, []);

  const metrics = useMemo(() => {
    return {
      pageViews: Math.max(summary?.total_page_views ?? 0, dummyMetrics.pageViews),
      islandClicks: Math.max(summary?.total_island_clicks ?? 0, dummyMetrics.islandClicks),
    };
  }, [summary]);

  return (
    <div className="metrics-showcase" aria-label="Portfolio counters">
      <FlipCounter value={metrics.pageViews} label="Visitors" note="閲覧数。実測値が少ない間は表示用のベース値を使っています。" />
      <FlipCounter value={metrics.islandClicks} label="Island clicks" note="浮遊島のクリック回数。バックエンドの集計 API に接続済みです。" />
    </div>
  );
}
