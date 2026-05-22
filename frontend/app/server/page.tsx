export default function ServerPage() {
  return (
    <main className="page-shell inner-page">
      <section className="panel detail-panel">
        <div className="section-heading">
          <p className="eyebrow">Server</p>
          <h1 className="page-title">自宅サーバでポートフォリオを運用する</h1>
          <p className="lede">
            Raspberry Pi 上の Docker Compose 環境で，このポートフォリオサイトを運用します．外部公開には Cloudflare
            Tunnel を使い，自宅サーバのポートを直接インターネットへ公開しない構成にしています．
          </p>
        </div>

        <div className="detail-columns">
          <article className="detail-card">
            <h2>Overview</h2>
            <p>
              公開サイトは独自ドメインから Cloudflare を経由して自宅サーバ上のコンテナへ到達します．ポートフォリオ本体は
              Docker network 内でのみ待ち受け，外部から直接アクセスできるポートは持たせません．
            </p>
          </article>

          <article className="detail-card">
            <h2>Purpose</h2>
            <p>
              アプリケーションを作るだけでなく，ドメイン，HTTPS，コンテナ運用，公開範囲の分離まで含めて，自分で管理できる
              Web 運用基盤として構成しています．
            </p>
          </article>
        </div>
      </section>

      <section className="panel detail-panel">
        <div className="section-heading">
          <p className="eyebrow">Public route</p>
          <h2>Cloudflare Tunnel で origin を直接公開しない</h2>
          <p className="lede">
            外部からのアクセスは Cloudflare DNS / CDN と Cloudflare Tunnel を通し，home-pi 上の cloudflared コンテナから
            portfolio コンテナへ転送します．
          </p>
        </div>

        <div className="timeline-list">
          <article className="timeline-item">
            <span>Visitor</span>
            <h2>独自ドメインへアクセス</h2>
            <p>
              閲覧者は navyracooon.com または www.navyracooon.com
              からポートフォリオへアクセスします．公開する入口は通常の Web
              サイトとして見えるようにし，内部構成は表に出しません．
            </p>
          </article>

          <article className="timeline-item">
            <span>Cloudflare</span>
            <h2>DNS / CDN / HTTPS を入口にする</h2>
            <p>
              ドメインの名前解決と外部公開の入口は Cloudflare 側に集約します．ブラウザから見える公開面は Cloudflare
              に置き，自宅サーバ側のポート開放に依存しない構成にします．
            </p>
          </article>

          <article className="timeline-item">
            <span>Tunnel</span>
            <h2>cloudflared から内部コンテナへ接続する</h2>
            <p>
              home-pi 上で cloudflared コンテナを動かし，Cloudflare Tunnel 経由で portfolio
              コンテナへ接続します．portfolio コンテナは内部ポートだけを公開し，ホスト側の ports は使いません．
            </p>
          </article>

          <article className="timeline-item">
            <span>Application</span>
            <h2>portfolio コンテナでサイトを提供する</h2>
            <p>
              Next.js アプリケーションを portfolio コンテナとして動かし，Docker network 内の 3000
              番ポートで受けます．外部からは Cloudflare Tunnel 経由でのみ到達できるようにします．
            </p>
          </article>
        </div>
      </section>

      <section className="panel detail-panel">
        <div className="section-heading">
          <p className="eyebrow">Architecture</p>
          <h2>公開サイトと内部アクセス経路を分離する</h2>
          <p className="lede">
            ポートフォリオ公開用の経路と，内部管理・VPN 用の経路は分けて扱います．Headscale
            は既存の構成を維持し，ポートフォリオとは別の役割として運用します．
          </p>
        </div>

        <div className="detail-columns">
          <article className="detail-card">
            <h2>Portfolio</h2>
            <ul className="detail-list">
              <li>公開入口は Cloudflare Tunnel に限定</li>
              <li>portfolio コンテナは Docker network 内でのみ待ち受け</li>
              <li>ホスト側の ports は使用しない</li>
              <li>内部ポートは 3000 番を想定</li>
              <li>navyracooon.com または www.navyracooon.com で提供</li>
            </ul>
          </article>

          <article className="detail-card">
            <h2>Headscale</h2>
            <ul className="detail-list">
              <li>既存の headscale 用サブドメインを維持</li>
              <li>ポートフォリオとは別のサービスとして分離</li>
              <li>既存の Caddy 構成を継続して利用</li>
              <li>内部アクセス経路として利用</li>
              <li>VPN ノード情報は公開ページに表示しない</li>
            </ul>
          </article>
        </div>

        <div className="detail-columns">
          <article className="detail-card">
            <h2>Docker Compose</h2>
            <ul className="detail-list">
              <li>portfolio と cloudflared をコンテナとして管理</li>
              <li>cloudflared は portfolio に依存して起動</li>
              <li>Cloudflare Tunnel の token は環境変数で渡す</li>
              <li>サービスの起動，停止，更新を Compose で扱う</li>
              <li>構成をファイルとして残し，再現しやすくする</li>
            </ul>
          </article>

          <article className="detail-card">
            <h2>Runtime</h2>
            <ul className="detail-list">
              <li>Raspberry Pi OS Lite を使用</li>
              <li>GUI を前提にしない軽量な運用環境</li>
              <li>SSH とコマンドラインで管理</li>
              <li>公開サイトと内部サービスを役割ごとに分離</li>
              <li>将来的なアプリケーション追加を想定</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="panel detail-panel">
        <div className="section-heading">
          <p className="eyebrow">Security design</p>
          <h2>自宅サーバの公開面を小さく保つ</h2>
          <p className="lede">
            ポートフォリオを自宅サーバで運用しながら，origin を直接公開しないことを重視しています．外部公開は Cloudflare
            Tunnel に集約し，管理用途の接続は LAN または Headscale 経由に限定します．
          </p>
        </div>

        <div className="research-grid">
          <article className="detail-card">
            <h2>No public port</h2>
            <p>
              ポートフォリオ用コンテナはホスト側にポートを公開しません．外部から直接 portfolio
              コンテナへ到達するのではなく，Cloudflare Tunnel を経由してアクセスする構成にします．
            </p>
          </article>

          <article className="detail-card">
            <h2>Private administration</h2>
            <p>
              SSH は従来通り LAN または Headscale 経由に限定します．管理作業のために SSH
              や管理画面を一般公開する構成にはしません．
            </p>
          </article>

          <article className="detail-card">
            <h2>Service separation</h2>
            <p>
              一般公開するポートフォリオサイトと，内部アクセスのための Headscale
              は分離して扱います．公開サイトから内部サービスの状態を見せることはしません．
            </p>
          </article>

          <article className="detail-card">
            <h2>Public boundary</h2>
            <p>
              ポートフォリオでは，運用設計の考え方だけを説明します．内部 IP，VPN ノード情報，管理
              URL，内部サービス一覧，IoT ログは公開しません．
            </p>
          </article>
        </div>
      </section>

      <section className="panel detail-panel">
        <div className="section-heading">
          <p className="eyebrow">Site features</p>
          <h2>公開サイトとして提供する機能</h2>
          <p className="lede">
            自宅サーバ上で動かす対象は，外部に公開してよいポートフォリオ機能に限定します．内部サービスのダッシュボードや管理用情報は含めません．
          </p>
        </div>

        <div className="detail-columns">
          <article className="detail-card">
            <h2>Content</h2>
            <ul className="detail-list">
              <li>トップページ</li>
              <li>プロジェクト一覧</li>
              <li>プロジェクト詳細</li>
              <li>研究，経歴，自宅サーバ運用の説明ページ</li>
              <li>問い合わせページ</li>
            </ul>
          </article>

          <article className="detail-card">
            <h2>Interaction</h2>
            <ul className="detail-list">
              <li>3D オブジェクトによるページ導線</li>
              <li>通常の HTML リンクによるページ移動</li>
              <li>問い合わせフォーム</li>
              <li>ページ閲覧の記録</li>
              <li>島クリックなどの操作イベント集計</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="panel detail-panel">
        <div className="section-heading">
          <p className="eyebrow">Operations</p>
          <h2>運用で扱うこと</h2>
          <p className="lede">
            個人開発でも，アプリケーションを作って終わりにせず，公開後に動かし続けるための運用を含めて扱います．
          </p>
        </div>

        <div className="detail-columns">
          <article className="detail-card">
            <h2>Daily operation</h2>
            <ul className="detail-list">
              <li>コンテナの起動状態確認</li>
              <li>アプリケーションログの確認</li>
              <li>Cloudflare Tunnel の接続状態確認</li>
              <li>DNS 設定の確認</li>
              <li>デプロイ後の到達性確認</li>
            </ul>
          </article>

          <article className="detail-card">
            <h2>Troubleshooting</h2>
            <ul className="detail-list">
              <li>名前解決の確認</li>
              <li>Tunnel 経由の疎通確認</li>
              <li>コンテナ間通信の確認</li>
              <li>環境変数の確認</li>
              <li>アプリケーション起動状態の確認</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="panel detail-panel">
        <div className="section-heading">
          <p className="eyebrow">Public boundary</p>
          <h2>公開する範囲を明確にする</h2>
          <p className="lede">
            サーバ運用の経験は説明しますが，内部構成の詳細や管理情報は公開ページに含めません．公開するのは，外から見せて問題のない設計判断と運用方針に限定します．
          </p>
        </div>

        <div className="detail-columns">
          <article className="detail-card">
            <h2>Shown on this site</h2>
            <ul className="detail-list">
              <li>自宅サーバで Web アプリケーションを運用していること</li>
              <li>Docker Compose で複数コンテナを管理していること</li>
              <li>Cloudflare Tunnel で origin を直接公開しない構成にしていること</li>
              <li>一般公開サイトと内部サービスを分離していること</li>
              <li>Headscale による内部アクセス経路を別途運用していること</li>
            </ul>
          </article>

          <article className="detail-card warning-card">
            <h2>Kept private</h2>
            <ul className="detail-list">
              <li>内部 IP アドレス</li>
              <li>管理 URL</li>
              <li>VPN ノード一覧</li>
              <li>Headscale の状態表示</li>
              <li>内部サービス一覧</li>
              <li>IoT ログ</li>
              <li>SSH 接続先や具体的な管理コマンド</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="panel detail-panel">
        <div className="section-heading">
          <p className="eyebrow">Why it matters</p>
          <h2>個人開発を公開運用まで広げる</h2>
          <p className="lede">
            この構成は，ポートフォリオを単に作るだけでなく，独自ドメインで公開し，コンテナとして運用し，安全に公開範囲を分けるための実践です．
          </p>
        </div>

        <div className="detail-columns">
          <article className="detail-card">
            <h2>Application perspective</h2>
            <p>
              Web
              アプリケーションを公開するには，実装だけでなく，ドメイン，HTTPS，デプロイ，ログ，更新，障害時の確認手順が必要です．自宅サーバで運用することで，それらを一連の経験として扱えます．
            </p>
          </article>

          <article className="detail-card">
            <h2>Infrastructure perspective</h2>
            <p>
              Cloudflare Tunnel を使うことで，自宅サーバの origin
              を直接公開せずに一般公開サイトを提供できます．公開サイトと内部向けアクセス経路を分けることで，個人開発でも安全性を意識した構成にできます．
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
