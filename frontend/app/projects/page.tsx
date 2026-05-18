import { TrackedLink } from "@/components/TrackedLink";
import { getProjects } from "@/lib/api";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="page-shell inner-page">
      <section className="panel">
        <div className="section-heading">
          <p className="eyebrow">Projects</p>
          <h1 className="page-title">公開ポートフォリオとして見せる制作実績</h1>
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
              <TrackedLink
                href={`/projects/${project.slug}`}
                className="button-secondary inline-button"
                eventType="detail_opened"
                targetType="project"
                targetSlug={project.slug}
              >
                Open detail
              </TrackedLink>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
