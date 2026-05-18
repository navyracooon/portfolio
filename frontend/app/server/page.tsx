export default function ServerPage() {
  return (
    <main className="page-shell inner-page">
      <section className="panel detail-panel">
        <div className="section-heading">
          <p className="eyebrow">Server</p>
          <h1 className="page-title">公開できる範囲で自宅サーバ運用を説明する</h1>
          <p className="lede">
            Docker、リバースプロキシ、HTTPS、独自ドメイン運用を説明します。内部 IP、管理 URL、ノード一覧、内部サービス名は公開しません。
          </p>
        </div>
        <div className="detail-columns">
          <article className="detail-card">
            <h2>Public boundary</h2>
            <ul className="detail-list">
              <li>公開入口は HTTPS 終端に集約</li>
              <li>アプリケーションの内部ポートは直接公開しない</li>
              <li>ホスト名ベースで公開アプリだけを振り分ける</li>
            </ul>
          </article>
          <article className="detail-card warning-card">
            <h2>Not published</h2>
            <p>
              Headscale の状態、VPN ノード、内部サービス一覧、管理画面へのリンクはこのポートフォリオには含めません。公開するのは設計判断と運用経験の範囲に限定します。
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
