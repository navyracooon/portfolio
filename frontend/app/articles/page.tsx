import { TrackedLink } from "@/components/TrackedLink";
import { getArticles } from "@/lib/api";

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <main className="page-shell inner-page">
      <section className="panel">
        <div className="section-heading">
          <p className="eyebrow">Articles</p>
          <h1 className="page-title">設計判断と運用構成を文章でも説明する</h1>
        </div>
        <div className="article-grid">
          {articles.map((article) => (
            <article key={article.slug} className="article-card">
              <p className="article-meta">
                {article.published_at} / {article.reading_time}
              </p>
              <h2>{article.title}</h2>
              <p>{article.summary}</p>
              <ul className="tag-list">
                {article.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <TrackedLink
                href={`/articles/${article.slug}`}
                className="button-secondary inline-button"
                eventType="article_opened"
                targetType="article"
                targetSlug={article.slug}
              >
                Open article
              </TrackedLink>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
