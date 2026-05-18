import { notFound } from "next/navigation";

import { TrackedLink } from "@/components/TrackedLink";
import { getArticle } from "@/lib/api";

export default async function ArticleDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="page-shell inner-page">
      <article className="panel prose-panel">
        <p className="eyebrow">Article</p>
        <h1 className="page-title">{article.title}</h1>
        <p className="article-meta">
          {article.published_at} / {article.reading_time}
        </p>
        <ul className="tag-list">
          {article.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <div className="prose-body">
          {article.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <TrackedLink
          href="/articles"
          className="button-secondary inline-button"
          eventType="article_opened"
          targetType="navigation"
          targetSlug="articles"
        >
          Back to articles
        </TrackedLink>
      </article>
    </main>
  );
}
