import { HeroScene } from "@/components/HeroScene";
import { MetricsShowcase } from "@/components/MetricsShowcase";
import { ScrollReveal } from "@/components/ScrollReveal";
import styles from "./HomePage.module.css";

export function HomePage() {
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

          <div className={styles.interactionOverlay} aria-hidden="true">
            <div className={styles.interactionHint}>
              <div className={styles.handTrack}>
                <div className={styles.handIcon}>
                  <svg viewBox="0 0 48 48" role="img">
                    <path d="M19.6 7.8c0-2.1 1.7-3.8 3.8-3.8s3.8 1.7 3.8 3.8v13.8l1.1-1.1c1.5-1.5 3.9-1.5 5.4 0 .7.7 1.1 1.7 1.1 2.7 1.4-.8 3.2-.6 4.4.6.8.8 1.2 1.8 1.2 2.8 1.4-.6 3.1-.3 4.2.8 1.4 1.4 1.5 3.7.2 5.2l-8.3 9.6C34 45.2 30.4 47 26.5 47h-3.1c-4.5 0-8.7-2.2-11.2-6L4.7 29.8c-1.1-1.7-.7-4 1-5.1 1.5-1 3.5-.8 4.8.5l3.1 3.1V12.2c0-2.1 1.7-3.8 3.8-3.8.8 0 1.5.2 2.2.6V7.8Z" />
                  </svg>
                </div>
              </div>
              <p>Drag to move the scene</p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal className={styles.counterSection}>
        <div className="section-heading">
          <p className="eyebrow">Activity</p>
          <h2>このサイトでの閲覧と移動</h2>
          <p className="lede">ページ閲覧数と，トップページで浮遊島を選択した回数を表示しています．</p>
        </div>
        <MetricsShowcase />
      </ScrollReveal>
    </main>
  );
}
