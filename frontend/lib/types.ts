export type Profile = {
  name: string;
  role: string;
  intro: string;
  location: string;
  focus: string;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  impact: string;
  overview: string;
  role: string;
  year: number;
  stack: string[];
  highlights: string[];
  operations: string[];
  github_url?: string | null;
  live_url?: string | null;
};

export type PortfolioPayload = {
  profile: Profile;
  strengths: string[];
  projects: Project[];
  infrastructure: string[];
};

export type ObjectTargetType = "project" | "navigation" | "contact";

export type PortfolioObjectConfig = {
  slug: string;
  title: string;
  description: string;
  targetType: ObjectTargetType;
  href: string;
  technologies: string[];
  position: [number, number, number];
  sceneKind: "tower" | "house" | "rack" | "sign";
  githubUrl?: string;
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
