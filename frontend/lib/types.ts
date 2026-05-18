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
  article_slugs: string[];
  github_url?: string | null;
  live_url?: string | null;
};

export type Article = {
  slug: string;
  title: string;
  summary: string;
  published_at: string;
  reading_time: string;
  tags: string[];
  body: string[];
};

export type PortfolioPayload = {
  profile: Profile;
  strengths: string[];
  projects: Project[];
  articles: Article[];
  infrastructure: string[];
};

export type ObjectTargetType = "project" | "article" | "navigation" | "contact";

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

export type InteractionEventType =
  | "object_clicked"
  | "detail_opened"
  | "contact_opened"
  | "article_opened";

export type InteractionSummaryItem = {
  target_slug: string;
  event_type: string;
  count: number;
};
