import { projects } from "@/content/projects";
import type { Project } from "@/lib/types";

export function getProjects(): readonly Project[] {
  return projects;
}

export function getProject(slug: string): Project | null {
  return projects.find((project) => project.slug === slug) ?? null;
}

export function getProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}
