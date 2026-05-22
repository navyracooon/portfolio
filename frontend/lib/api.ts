import type { PortfolioPayload, Project } from "@/lib/types";
import { getServerApiBaseUrl } from "@/lib/apiBase";

const fallbackPortfolio: PortfolioPayload = {
  profile: {
    name: "Navy Racooon",
    role: "Creative Developer / Full-Stack Engineer",
    intro: "API に接続できない場合の最小表示です。バックエンドが起動すると詳細データを取得します。",
    location: "Tokyo, Japan",
    focus: "3D entry points without behavior-driven ranking",
  },
  strengths: [],
  projects: [],
  infrastructure: [],
};

async function fetchJson<T>(path: string): Promise<T | null> {
  const apiBaseUrl = getServerApiBaseUrl();

  try {
    const response = await fetch(`${apiBaseUrl}${path}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export async function getPortfolioData(): Promise<PortfolioPayload> {
  return (await fetchJson<PortfolioPayload>("/portfolio")) ?? fallbackPortfolio;
}

export async function getProjects(): Promise<Project[]> {
  return (await fetchJson<Project[]>("/projects")) ?? fallbackPortfolio.projects;
}

export async function getProject(slug: string): Promise<Project | null> {
  return (
    (await fetchJson<Project>(`/projects/${encodeURIComponent(slug)}`)) ??
    fallbackPortfolio.projects.find((item) => item.slug === slug) ??
    null
  );
}
