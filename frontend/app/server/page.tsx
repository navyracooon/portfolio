export default function ServerPage() {
  return (
    <main className="page-shell inner-page">
      <section className="panel detail-panel">
        <div className="section-heading">
          <p className="eyebrow">Server</p>
          <h1 className="page-title">自宅サーバでポートフォリオを運用する</h1>
          <p className="lede">
            Raspberry Pi を用いた自宅サーバ環境で，Docker Compose，リバースプロキシ，HTTPS，独自ドメイン，内部向けネットワークを組み合わせて運用しています．このページでは，公開してよい設計判断と運用経験に限定して説明します．
          </p>
        </div>

        <div className="detail-columns">
          <article className="detail-card">
            <h2>Overview</h2>
            <p>
              自宅サーバは，公開用 Web アプリケーションを動かすための運用基盤として扱っています．外部に公開する入口を HTTPS に集約し，アプリケーション本体や内部向けサービスは直接公開しない構成にしています．
            </p>
          </article>

          <article className="detail-card">
            <h2>Purpose</h2>
            <p>
              単にアプリケーションを作るだけでなく，公開範囲，証明書，ドメイン，ネットワーク，コンテナ管理まで含めて，自分で運用できる状態にすることを目的としています．
            </p>
          </article>
        </div>
      </section>

      <section className="panel detail-panel">
        <div className="section-heading">
          <p className="eyebrow">Architecture</p>
          <h2>公開入口を HTTPS 終端に集約する</h2>
          <p className="lede">
            外部から到達できる入口はリバースプロキシに集約し，内部のアプリケーションポートを直接公開しない構成にしています．
          </p>
        </div>

        <div className="detail-columns">
          <article className="detail-card">
            <h2>Reverse proxy</h2>
            <ul className="detail-list">
              <li>Caddy をリバースプロキシとして利用</li>
              <li>HTTPS 終端を Caddy に集約</li>
              <li>ホスト名ベースで公開対象のサービスへ振り分ける</li>
              <li>アプリケーションの内部ポートは外部へ直接公開しない</li>
            </ul>
          </article>

          <article className="detail-card">
            <h2>Container management</h2>
            <ul className="detail-list">
              <li>Docker Compose により複数サービスを管理</li>
              <li>リバースプロキシとアプリケーションを同一構成内で管理</li>
              <li>サービスごとの責務を分ける</li>
              <li>再起動や更新がしやすい構成にする</li>
            </ul>
          </article>
        </div>

        <div className="detail-columns">
          <article className="detail-card">
            <h2>Domain and HTTPS</h2>
            <ul className="detail-list">
              <li>独自ドメインを取得してサブドメイン単位で用途を分離</li>
              <li>Cloudflare DNS でレコードを管理</li>
              <li>HTTPS による公開を前提にする</li>
              <li>証明書の管理をリバースプロキシ側に集約する</li>
            </ul>
          </article>

          <article className="detail-card">
            <h2>Network boundary</h2>
            <ul className="detail-list">
              <li>公開する通信と内部向け通信を分離</li>
              <li>外部公開は必要なポートに限定</li>
              <li>管理用途の接続は内部向けネットワーク経由に限定</li>
              <li>内部サービスの一覧や管理 URL は公開しない</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="panel detail-panel">
        <div className="section-heading">
          <p className="eyebrow">Current setup</p>
          <h2>現在の運用構成</h2>
          <p className="lede">
            現在は軽量な Linux 環境上で，公開入口と内部向けネットワークを分離しながら運用しています．ポートフォリオ上では，具体的なアドレスやノード情報ではなく，構成の考え方だけを示します．
          </p>
        </div>

        <div className="timeline-list">
          <article className="timeline-item">
            <span>Host</span>
            <h2>Raspberry Pi による常時稼働環境</h2>
            <p>
              Raspberry Pi OS Lite を用いた軽量なサーバ環境を構築しています．GUI を前提にせず，SSH とコマンドラインで管理する構成にしています．
            </p>
          </article>

          <article className="timeline-item">
            <span>DNS</span>
            <h2>Cloudflare によるドメイン管理</h2>
            <p>
              独自ドメインを取得し，Cloudflare DNS でサブドメインを管理しています．公開するサービスごとにホスト名を分けられるようにし，将来的な拡張にも対応しやすい構成にしています．
            </p>
          </article>

          <article className="timeline-item">
            <span>Proxy</span>
            <h2>Caddy による HTTPS と振り分け</h2>
            <p>
              Caddy を外部公開の入口として配置し，HTTPS 終端とリバースプロキシを担当させています．内部サービスは直接外部へ公開せず，必要なものだけをホスト名ベースで公開します．
            </p>
          </article>

          <article className="timeline-item">
            <span>Private access</span>
            <h2>内部向けアクセス経路の分離</h2>
            <p>
              管理用途のアクセスは公開 Web サイトとは分け，内部向けネットワーク経由で扱います．外部に見せる必要のない管理画面や内部状態は，ポートフォリオの公開機能には含めません．
            </p>
          </article>

          <article className="timeline-item">
            <span>Operation</span>
            <h2>Docker Compose による継続運用</h2>
            <p>
              サービスの起動，停止，ログ確認，更新を Docker Compose ベースで扱えるようにしています．小規模な個人運用でも，構成を明示し，再現しやすくすることを重視しています．
            </p>
          </article>
        </div>
      </section>

      <section className="panel detail-panel">
        <div className="section-heading">
          <p className="eyebrow">Public boundary</p>
          <h2>公開する情報と公開しない情報を分ける</h2>
          <p className="lede">
            サーバ運用経験はポートフォリオとして説明しますが，内部ネットワークや管理情報をそのまま公開することはしません．
          </p>
        </div>

        <div className="detail-columns">
          <article className="detail-card">
            <h2>Published</h2>
            <ul className="detail-list">
              <li>自宅サーバで運用していること</li>
              <li>Docker Compose による複数サービス管理</li>
              <li>Caddy によるリバースプロキシ構成</li>
              <li>HTTPS と独自ドメインを前提にした公開設計</li>
              <li>公開用サービスと内部向けサービスを分ける設計判断</li>
              <li>将来的に複数アプリケーションを追加できる構成</li>
            </ul>
          </article>

          <article className="detail-card warning-card">
            <h2>Not published</h2>
            <ul className="detail-list">
              <li>内部 IP アドレス</li>
              <li>管理 URL</li>
              <li>VPN ノード一覧</li>
              <li>Headscale の状態表示</li>
              <li>内部サービス一覧</li>
              <li>ファイアウォールの詳細な実設定</li>
              <li>SSH 接続先や具体的な管理コマンド</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="panel detail-panel">
        <div className="section-heading">
          <p className="eyebrow">Security design</p>
          <h2>小規模でも公開範囲を明確にする</h2>
          <p className="lede">
            個人開発のサーバでも，公開してよいものと公開してはいけないものを分けることを重視しています．
          </p>
        </div>

        <div className="research-grid">
          <article className="detail-card">
            <h2>Expose less</h2>
            <p>
              外部からアクセスできる入口は必要最小限にし，アプリケーションや管理用途の内部ポートを直接公開しないようにしています．
            </p>
          </article>

          <article className="detail-card">
            <h2>Separate roles</h2>
            <p>
              リバースプロキシ，アプリケーション，内部向けサービスの役割を分け，公開対象をホスト名単位で管理しやすくしています．
            </p>
          </article>

          <article className="detail-card">
            <h2>Use private access</h2>
            <p>
              管理用途の接続は，公開 Web サイトとは別の内部向けアクセス経路で扱います．外部に管理画面を置くことを前提にしません．
            </p>
          </article>

          <article className="detail-card">
            <h2>Document decisions</h2>
            <p>
              どの情報を公開し，どの情報を伏せるかを明確にすることで，ポートフォリオとして説明できる範囲と運用上の安全性を両立します．
            </p>
          </article>
        </div>
      </section>

      <section className="panel detail-panel">
        <div className="section-heading">
          <p className="eyebrow">Operations</p>
          <h2>運用で扱っていること</h2>
          <p className="lede">
            アプリケーションを作って終わりにせず，公開後に動かし続けるための最低限の運用も扱います．
          </p>
        </div>

        <div className="detail-columns">
          <article className="detail-card">
            <h2>Daily operation</h2>
            <ul className="detail-list">
              <li>コンテナの起動状態確認</li>
              <li>ログ確認</li>
              <li>設定変更後の再起動</li>
              <li>DNS 設定の確認</li>
              <li>HTTPS 到達性の確認</li>
            </ul>
          </article>

          <article className="detail-card">
            <h2>Troubleshooting</h2>
            <ul className="detail-list">
              <li>名前解決の確認</li>
              <li>IPv6 到達性の確認</li>
              <li>リバースプロキシ設定の確認</li>
              <li>ファイアウォール設定の確認</li>
              <li>コンテナ間通信の確認</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="panel detail-panel">
        <div className="section-heading">
          <p className="eyebrow">Why it matters</p>
          <h2>個人開発を運用経験まで広げる</h2>
          <p className="lede">
            このサーバは，単なる趣味の環境ではなく，Web アプリケーションを作り，公開し，運用するまでの一連の経験を得るための基盤です．
          </p>
        </div>

        <div className="detail-columns">
          <article className="detail-card">
            <h2>Application perspective</h2>
            <p>
              アプリケーションを公開するには，実装だけでなく，ドメイン，HTTPS，リバースプロキシ，ログ，更新，障害時の確認手順が必要です．自宅サーバでは，これらを自分で把握しながら構成できます．
            </p>
          </article>

          <article className="detail-card">
            <h2>Engineering perspective</h2>
            <p>
              公開するもの，公開しないもの，内部だけで扱うものを分ける判断は，個人開発でも重要です．このポートフォリオでは，その判断を含めて設計・運用経験として示します．
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
