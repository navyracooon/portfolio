import { HeroScene } from '@/components/HeroScene';
import { MetricsShowcase } from '@/components/MetricsShowcase';
import { ScrollReveal } from '@/components/ScrollReveal';
import { primaryNavItems } from '@/lib/siteNavigation';

export function PortfolioPage() {
  return (
    <main className="page-shell home-page">
      <ScrollReveal className="name-section" >
        <p className="eyebrow">navyracooon</p>
        <h1 id="welcome-title">Floating islands for technical traces.</h1>
        <p className="hero-intro">
          研究、開発、運用を分けて辿れる個人ポートフォリオです。情報は詰め込まず、詳細は各ページへ分離します。
        </p>
      </ScrollReveal>

      <ScrollReveal className="island-section" >
        <div className="section-heading island-heading">
          <p className="eyebrow">Three.js Navigation</p>
          <h2>島を選ぶ。ページへ進む。</h2>
        </div>
        <HeroScene />
      </ScrollReveal>

      <ScrollReveal className="counter-section" >
        <div className="section-heading">
          <p className="eyebrow">Live-ish metrics</p>
          <h2>来訪者と島クリック数</h2>
          <p className="lede">
            バックエンドは問い合わせ、ページ閲覧、島クリックだけを扱います。数字は実測値が増えるまでダミーベースで表示しています。
          </p>
        </div>
        <MetricsShowcase />
      </ScrollReveal>

      <ScrollReveal className="home-explain-section" >
        <div className="section-heading">
          <p className="eyebrow">Structure</p>
          <h2>トップは入口、詳細はページへ。</h2>
          <p className="lede">
            3D シーンは装飾ではなく、About、Career、Research、Projects、Server、Contact への入口です。3D 操作が難しい場合も通常の HTML リンクから同じ情報へ到達できます。
          </p>
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
      </ScrollReveal>
    </main>
  );
}
