export default function CareerPage() {
  return (
    <main className="page-shell inner-page">
      <section className="panel detail-panel">
        <div className="section-heading">
          <p className="eyebrow">Career</p>
          <h1 className="page-title">学歴・実務経験・スキルを整理する</h1>
          <p className="lede">
            技術領域を Web、研究、運用に分け、経験の粒度を読みやすくまとめます。詳細な職務経歴や非公開情報は必要な範囲に限定します。
          </p>
        </div>
        <div className="timeline-list">
          <article className="timeline-item">
            <span>Education</span>
            <h2>数理・情報系の学習基盤</h2>
            <p>数値計算、制御、最適化を扱うための数学・プログラミング基礎を中心に整理します。</p>
          </article>
          <article className="timeline-item">
            <span>Engineering</span>
            <h2>フロントエンドから運用まで</h2>
            <p>TypeScript、React、API 連携、Docker、リバースプロキシ運用を横断して扱います。</p>
          </article>
          <article className="timeline-item">
            <span>Skills</span>
            <h2>実装と設計の接続</h2>
            <p>UI 実装だけでなく、公開範囲、安全な情報の切り出し、継続運用を含めて設計します。</p>
          </article>
        </div>
      </section>
    </main>
  );
}
