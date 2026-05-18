import { HeroScene } from '@/components/HeroScene';
import { primaryNavItems } from '@/lib/siteNavigation';

export function PortfolioPage() {
  return (
    <main className="page-shell home-page">
      <section className="welcome-section" aria-labelledby="welcome-title">
        <div className="welcome-copy">
          <p className="eyebrow">Three.js Floating Islands</p>
          <h1 id="welcome-title"></h1>
          <p className="hero-intro">
            研究、開発、運用を分けて辿れる個人ポートフォリオです。詳細は各島またはサイドバーから開けます。
          </p>
          <div className="hero-meta" aria-label="Site highlights">
            <span>Next.js</span>
            <span>React Three Fiber</span>
            <span>Home server aware</span>
          </div>
        </div>

        <HeroScene />
      </section>

      <section className="html-fallback" aria-labelledby="fallback-title">
        <div>
          <p className="eyebrow">HTML fallback</p>
          <h2 id="fallback-title">主要導線</h2>
        </div>
        <div className="fallback-links">
          {primaryNavItems.map((item) =>
            item.external ? (
              <a key={item.key} href={item.href} target="_blank" rel="noreferrer" className="fallback-link">
                {item.label}<span>外部リンク</span>
              </a>
            ) : (
              <a key={item.key} href={item.href} className="fallback-link">
                {item.label}<span>{item.short}</span>
              </a>
            ),
          )}
        </div>
      </section>
    </main>
  );
}
