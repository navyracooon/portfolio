export type Project = {
  slug: string;
  title: string;
  summary: string;
  impact: string;
  overview: string;
  role: string;
  year: number;
  stack: readonly string[];
  highlights: readonly string[];
  operations: readonly string[];
  githubUrl?: string;
  liveUrl?: string;
};

export type MetricsCountItem = {
  key: string;
  count: number;
};

export type MetricsSummary = {
  total_page_views: number;
  total_island_clicks: number;
  page_views: MetricsCountItem[];
  island_clicks: MetricsCountItem[];
};
