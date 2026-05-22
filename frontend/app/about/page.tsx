export default function AboutPage() {
  return (
    <main className="page-shell inner-page">
      <section className="panel detail-panel">
        <div className="section-heading">
          <p className="eyebrow">About this portfolio</p>
          <h1 className="page-title">3D 表現を，情報へ入るための導線として使う</h1>
          <p className="lede">
            このポートフォリオは，3D
            表現を単なる装飾ではなく，経歴，研究，個人開発，自宅サーバ運用，GitHub，問い合わせへ進むための入口として設計しています．
            視覚的な印象を作りつつ，通常の HTML リンクでも同じ情報に到達できる構成にしています．
          </p>
        </div>

        <div className="detail-columns">
          <article className="detail-card">
            <h2>Design goal</h2>
            <p>
              最初に長い自己紹介を読ませるのではなく，閲覧者が関心のある領域を選び，必要な詳細へ進める構成にしています．
              3D シーンは印象づけのためだけでなく，情報の分類とページ遷移を兼ねたインターフェースとして扱っています．
            </p>
          </article>

          <article className="detail-card">
            <h2>Navigation policy</h2>
            <p>
              トップページでは，浮遊島を各ページへの入口として配置しています．一方で，3D
              操作ができない環境でも閲覧できるように，サイドバーと通常リンクによる導線も用意しています．
            </p>
          </article>
        </div>
      </section>

      <section className="panel detail-panel">
        <div className="section-heading">
          <p className="eyebrow">3D assets</p>
          <h2>生成した 3D アセットを Web UI として調整する</h2>
          <p className="lede">
            一部の 3D アセットは Hunyuan3D で生成し，Web 上で扱いやすいサイズ，向き，配置へ調整しています．
            モデル自体に説明文を埋め込むのではなく，ラベルや説明パネルを UI 側で管理しています．
          </p>
        </div>

        <div className="detail-columns">
          <article className="detail-card">
            <h2>Asset workflow</h2>
            <ul className="detail-list">
              <li>Hunyuan3D で浮遊島の GLB アセットを生成</li>
              <li>BoundingBox を用いてモデルの見た目の大きさを正規化</li>
              <li>島ごとの向きを補正し，ページ導線として見やすく配置</li>
              <li>ラベル，説明，遷移先は React 側で管理</li>
              <li>外部リンクや壊れやすいロゴ表現はテキスト UI で補完</li>
            </ul>
          </article>

          <article className="detail-card">
            <h2>Disclosure</h2>
            <p>
              3D アセットの一部には生成 AI
              による出力を利用しています．ただし，サイト全体の構成，導線設計，モデル配置，インタラクション，ページ遷移，レスポンシブ対応，アクセシビリティ対応は
              Web アプリケーションとして設計・実装しています．
            </p>
          </article>
        </div>
      </section>

      <section className="panel detail-panel">
        <div className="section-heading">
          <p className="eyebrow">Performance tuning</p>
          <h2>3D 表現を公開サイトで扱える重さにする</h2>
          <p className="lede">
            生成した GLB をそのまま使うのではなく，glTF Transform
            とブラウザ上の実測値を見ながら，ファイルサイズ，テクスチャ解像度，描画負荷を調整しています．
          </p>
        </div>

        <div className="detail-columns">
          <article className="detail-card">
            <h2>Measured bottleneck</h2>
            <ul className="detail-list">
              <li>最適化前の 7 個の GLB アセット合計サイズは 307MB</li>
              <li>各モデルには 4096×4096 の PNG テクスチャが 3 枚含まれていた</li>
              <li>主なボトルネックはメッシュではなく高解像度テクスチャだった</li>
              <li>1 モデルあたりテクスチャだけで約 268MB，7 モデル合計で約 1.88GB 相当だった</li>
            </ul>
          </article>

          <article className="detail-card">
            <h2>Optimization result</h2>
            <ul className="detail-list">
              <li>Web 表示に対して過剰だった 4K テクスチャを削減</li>
              <li>Stars，shadow，Canvas の DPR 設定を見直し，描画負荷を調整</li>
              <li>主要なブラウザプロセス群のメモリ使用量を約 5.28GB から約 1.15GB まで削減</li>
              <li>3D 表現を維持しながら，通常の閲覧に耐えるパフォーマンスへ改善</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="panel detail-panel">
        <div className="section-heading">
          <p className="eyebrow">Accessible interaction</p>
          <h2>3D 操作に依存しない導線を確保する</h2>
          <p className="lede">
            3D
            シーンは主要な入口の一つですが，操作できない環境でも情報に到達できることを優先しています．選択状態の表示，説明パネル，通常リンクを組み合わせています．
          </p>
        </div>

        <div className="detail-columns">
          <article className="detail-card">
            <h2>Selection feedback</h2>
            <ul className="detail-list">
              <li>選択中の島を軽く拡大し，現在の対象を示す</li>
              <li>ラベルを表示し，島と遷移先ページの対応を明確にする</li>
              <li>説明パネルにも選択状態を反映する</li>
              <li>色や発光だけでなく，文字情報でも状態を伝える</li>
              <li>内部ページと外部リンクの違いが分かるようにする</li>
            </ul>
          </article>

          <article className="detail-card">
            <h2>Fallback navigation</h2>
            <ul className="detail-list">
              <li>3D シーンを操作しなくても，サイドバーから全ページへ移動できる</li>
              <li>選択後の説明パネルにも通常の HTML リンクを配置する</li>
              <li>キーボード操作時の focus を明確に表示する</li>
              <li>現在ページは視覚的な強調と aria-current で示す</li>
              <li>prefers-reduced-motion が有効な場合は，動きのある演出を抑える</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="panel detail-panel">
        <div className="section-heading">
          <p className="eyebrow">Public boundary</p>
          <h2>公開してよい情報だけを載せる</h2>
          <p className="lede">
            自宅サーバ運用や内部アクセス経路は技術経験として扱いますが，管理情報や内部サービスの詳細は公開ページに含めません．
          </p>
        </div>

        <div className="detail-columns">
          <article className="detail-card">
            <h2>Shown on this site</h2>
            <ul className="detail-list">
              <li>自宅サーバで Web アプリケーションを運用していること</li>
              <li>Docker Compose による複数サービス管理</li>
              <li>Cloudflare Tunnel による origin 非公開の構成</li>
              <li>外部公開する機能と内部向け機能を分ける設計判断</li>
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
            </ul>
          </article>
        </div>
      </section>
    </main>
  );
}
