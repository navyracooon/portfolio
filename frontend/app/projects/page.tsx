import Link from "next/link";

import { getProjects } from "@/lib/projects";

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <main className="page-shell inner-page">
      <section className="panel">
        <div className="section-heading">
          <p className="eyebrow">Projects</p>
          <h1 className="page-title">公開可能な制作実績</h1>
          <p className="lede">
            個人開発，研究，自宅サーバ運用，開発環境整備など，外部に説明しやすい形で整理できる実績を掲載しています．
          </p>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <article key={project.slug} className="project-card">
              <p className="project-year">{project.year}</p>
              <h2>{project.title}</h2>
              <p className="project-summary">{project.summary}</p>
              <p className="project-impact">{project.impact}</p>
              <ul className="detail-list compact-list">
                {project.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <ul className="tag-list">
                {project.stack.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link href={`/projects/${project.slug}`} className="button-secondary inline-button">
                Open detail
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
