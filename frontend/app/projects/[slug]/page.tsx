import { notFound } from "next/navigation";

import { TrackedLink } from "@/components/TrackedLink";
import { getProject } from "@/lib/api";

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="page-shell inner-page">
      <section className="panel detail-panel">
        <p className="eyebrow">Project detail</p>
        <h1 className="page-title">{project.title}</h1>
        <p className="lede">{project.overview}</p>
        <div className="detail-columns">
          <div>
            <h2>Summary</h2>
            <p>{project.summary}</p>
            <p>{project.impact}</p>
          </div>
          <div className="mini-facts">
            <div>
              <span>Year</span>
              <strong>{project.year}</strong>
            </div>
            <div>
              <span>Role</span>
              <strong>{project.role}</strong>
            </div>
          </div>
        </div>
        <div className="detail-columns">
          <div>
            <h2>Highlights</h2>
            <ul className="detail-list">
              {project.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Operations</h2>
            <ul className="detail-list">
              {project.operations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <ul className="tag-list">
          {project.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="cta-row">
          <TrackedLink href="/projects" className="button-secondary" eventType="detail_opened" targetType="navigation" targetSlug="projects">
            Back to projects
          </TrackedLink>
        </div>
      </section>
    </main>
  );
}
