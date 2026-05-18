export default function AboutPage() {
  return (
    <main className="page-shell inner-page">
      <section className="panel detail-panel">
        <div className="section-heading">
          <p className="eyebrow">About this portfolio</p>
          <h1 className="page-title">3D 表現を情報設計の入口として使う</h1>
          <p className="lede">
            このページは自己紹介ではなく、ポートフォリオ自体の設計意図を説明する場所です。トップでは浮遊島の体験を主役にし、詳細な説明は個別ページへ分離しています。
          </p>
        </div>
        <div className="detail-columns">
          <article className="detail-card">
            <h2>使用技術</h2>
            <ul className="detail-list">
              <li>Next.js と TypeScript によるページ構成</li>
              <li>React Three Fiber と drei による GLB 表示</li>
              <li>Framer Motion による短いページ遷移</li>
              <li>CSS による reduced motion とレスポンシブ対応</li>
            </ul>
          </article>
          <article className="detail-card">
            <h2>実装方針</h2>
            <p>
              各 GLB は読み込み時に BoundingBox で正規化し、島ごとの差が導線の強弱に見えないように揃えます。3D 操作に依存せず、サイドバーと HTML リンクを必ず併設します。
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
