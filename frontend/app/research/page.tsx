export default function ResearchPage() {
  return (
    <main className="page-shell inner-page">
      <section className="panel detail-panel">
        <div className="section-heading">
          <p className="eyebrow">Research</p>
          <h1 className="page-title">数値計算・制御・最適化を独立した強みにする</h1>
          <p className="lede">
            Web 開発とは別軸の技術的背景として、問題設定、モデル化、実験、評価の考え方をまとめます。
          </p>
        </div>
        <div className="research-grid">
          <article className="detail-card">
            <h2>Numerical Computing</h2>
            <p>Python などを用いた実験、シミュレーション、結果の検証を重視します。</p>
          </article>
          <article className="detail-card">
            <h2>Control</h2>
            <p>動的システムを観察し、安定性や応答を意識した実装へ落とし込みます。</p>
          </article>
          <article className="detail-card">
            <h2>Optimization</h2>
            <p>制約条件のもとで目的関数をどう設計するかを、実装可能な粒度で説明します。</p>
          </article>
        </div>
      </section>
    </main>
  );
}
