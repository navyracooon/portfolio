import { HeroScene } from '@/components/HeroScene';
import { MetricsShowcase } from '@/components/MetricsShowcase';
import { ScrollReveal } from '@/components/ScrollReveal';
import { primaryNavItems } from '@/lib/siteNavigation';
import styles from './PortfolioPage.module.css';

export function PortfolioPage() {
  return (
    <main className={`page-shell ${styles.homePage}`}>
      <ScrollReveal className={styles.nameSection}>
        <p className="eyebrow">navyracooon</p>
        <h1 id="welcome-title">Floating islands for technical traces.</h1>
        <p className={`hero-intro ${styles.nameIntro}`}>
          研究，開発，運用の経験を，それぞれの文脈に分けて辿れるポートフォリオです．
        </p>
      </ScrollReveal>

      <ScrollReveal className={styles.islandSection}>
        <div className={`section-heading ${styles.islandHeading}`}>
          <p className="eyebrow">Navigation</p>
          <h2>島を選んで，関心のあるページへ。</h2>
        </div>

        <div className={styles.sceneFrame}>
          <HeroScene />
          <div className={styles.dragHint} aria-hidden="true">
            <div className={styles.dragGlyph}>
              <span className={styles.dragArrowUp}>↑</span>
              <span className={styles.dragArrowLeft}>←</span>
              <span className={styles.dragDot} />
              <span className={styles.dragArrowRight}>→</span>
              <span className={styles.dragArrowDown}>↓</span>
            </div>
            <p>Drag to look around</p>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal className={styles.counterSection}>
        <div className="section-heading">
          <p className="eyebrow">Activity</p>
          <h2>このサイトでの閲覧と移動</h2>
          <p className="lede">
            ページ閲覧数と，トップページの浮遊島から各ページへ移動した回数を表示しています．
          </p>
        </div>
        <MetricsShowcase />
      </ScrollReveal>

      <ScrollReveal className={styles.homeExplainSection}>
        <div className="section-heading">
          <p className="eyebrow">Explore</p>
          <h2>経歴，研究，制作物，運用経験を見る</h2>
          <p className="lede">
            About，Career，Research，Projects，Server，Contact の各ページに，このポートフォリオの背景と制作物を整理しています．
          </p>
        </div>
        <div className={styles.fallbackLinks}>
          {primaryNavItems.map((item) =>
            item.external ? (
              <a key={item.key} href={item.href} target="_blank" rel="noreferrer" className={styles.fallbackLink}>
                {item.label}
                <span>外部リンク</span>
              </a>
            ) : (
              <a key={item.key} href={item.href} className={styles.fallbackLink}>
                {item.label}
                <span>{item.short}</span>
              </a>
            ),
          )}
        </div>
      </ScrollReveal>
    </main>
  );
}
