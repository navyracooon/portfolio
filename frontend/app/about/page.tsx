export default function AboutPage() {
  return (
    <main className="page-shell inner-page">
      <section className="panel detail-panel">
        <div className="section-heading">
          <p className="eyebrow">About this portfolio</p>
          <h1 className="page-title">3D 表現を情報設計の入口として使う</h1>
          <p className="lede">
            このページは自己紹介ではなく，ポートフォリオ自体の設計意図を説明する場所です．トップページでは Welcome と浮遊島の Three.js シーンを主役にし，経歴，研究，個人開発，自宅サーバ，GitHub，問い合わせへの導線を 3D と通常の HTML リンクの両方で提供します．
          </p>
        </div>

        <div className="detail-columns">
          <article className="detail-card">
            <h2>サイトの役割</h2>
            <p>
              このポートフォリオは，長い自己紹介を最初に読ませる構成ではなく，興味のある領域へ短い操作で移動できる構成にしています．浮遊島は視覚的な入口であり，情報そのものは各詳細ページに分離します．
            </p>
          </article>

          <article className="detail-card">
            <h2>トップページの方針</h2>
            <p>
              初期表示では Welcome テキストと Three.js シーンを中心に置き，説明量を抑えます．各島は about，career，research，projects，server，github，contact に対応し，選択中の島は拡大，ラベル，説明パネルの強調によって状態が分かるようにします．
            </p>
          </article>
        </div>
      </section>

      <section className="panel detail-panel">
        <div className="section-heading">
          <p className="eyebrow">3D assets</p>
          <h2>Hunyuan3D で生成したモデルを Web の導線として調整する</h2>
          <p className="lede">
            トップページで使用している一部の 3D アセットは，Tencent Hunyuan3D を用いて生成しています．生成した GLB をそのまま配置するのではなく，Web 上で見やすく，操作しやすく，ページ導線として成立するように，サイズ，向き，配置，ラベル表示を調整しています．
          </p>
        </div>

        <div className="detail-columns">
          <article className="detail-card">
            <h2>Asset workflow</h2>
            <ul className="detail-list">
              <li>Hunyuan3D で浮遊島のベースとなる GLB を生成</li>
              <li>各モデルを BoundingBox で正規化し，見た目の大きさを揃える</li>
              <li>島ごとの向きを yawOffset で補正し，中央を向くように配置する</li>
              <li>ラベルや説明はモデル内に埋め込まず，UI 側で表示する</li>
              <li>GitHub のような壊れやすいロゴ表現は 3D モデルではなくテキストで補う</li>
            </ul>
          </article>

          <article className="detail-card">
            <h2>Disclosure</h2>
            <p>
              3D アセットの一部には生成 AI による出力を利用しています．一方で，サイト全体の構成，導線設計，モデル配置，インタラクション，ページ遷移，レスポンシブ対応，アクセシビリティ対応は，Web アプリケーションとして設計・実装しています．
            </p>
          </article>
        </div>
      </section>

      <section className="panel detail-panel">
        <div className="section-heading">
          <p className="eyebrow">Performance tuning</p>
          <h2>生成した GLB を計測し，Web で扱える重さまで最適化する</h2>
          <p className="lede">
            3D アセットは生成結果をそのまま使うのではなく，glTF Transform でファイルサイズ，頂点数，テクスチャ解像度，GPU メモリ見積もりを確認し，ブラウザ上の実測値を見ながら調整しています．
          </p>
        </div>

        <div className="detail-columns">
          <article className="detail-card">
            <h2>Measured bottleneck</h2>
            <ul className="detail-list">
              <li>最適化前の 7 個の GLB アセット合計サイズは 307MB</li>
              <li>各モデルには 4096×4096 の PNG テクスチャが 3 枚含まれていた</li>
              <li>1 枚の 4096×4096 テクスチャは GPU メモリ見積もりで約 89.48MB</li>
              <li>1 モデルあたりテクスチャだけで約 268MB，7 モデル合計で約 1.88GB 相当だった</li>
              <li>メッシュ本体のサイズは各モデル約 1.4〜1.75MB 程度で，主なボトルネックはポリゴン数ではなく高解像度テクスチャだった</li>
            </ul>
          </article>

          <article className="detail-card">
            <h2>Optimization result</h2>
            <ul className="detail-list">
              <li>テクスチャ解像度を削減し，Web 表示に対して過剰だった 4K テクスチャを整理</li>
              <li>Stars，shadow，Canvas の DPR 設定など，見た目への影響が小さい描画負荷も見直した</li>
              <li>主要なブラウザプロセス群のメモリ使用量は約 5.28GB から約 1.15GB まで低下</li>
              <li>実測で約 4.13GB，約 78% のメモリ削減を確認</li>
              <li>3D 表現を維持しながら，通常の閲覧に耐えるパフォーマンスまで改善した</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="panel detail-panel">
        <div className="section-heading">
          <p className="eyebrow">Accessible interaction</p>
          <h2>3D の選択状態を，説明表示と通常リンクにも反映する</h2>
          <p className="lede">
            浮遊島は視覚的な入口ですが，3D シーンだけに操作を閉じません．島を選択したときは，モデル側の強調だけでなく，説明パネルやラベルにも状態を反映し，どのページへ進もうとしているのかを分かりやすく示します．
          </p>
        </div>

        <div className="detail-columns">
          <article className="detail-card">
            <h2>Selection feedback</h2>
            <ul className="detail-list">
              <li>選択中の島を軽く拡大し，視覚的に現在の対象を示す</li>
              <li>ラベルを表示して，島がどのページに対応するかを明確にする</li>
              <li>説明パネル側も同時に強調し，3D とテキストの対応関係を示す</li>
              <li>発光や色の変化だけに頼らず，文字情報でも状態を伝える</li>
              <li>クリック後の遷移先が内部ページか外部リンクか分かるようにする</li>
            </ul>
          </article>

          <article className="detail-card">
            <h2>Fallback navigation</h2>
            <ul className="detail-list">
              <li>3D シーンを操作しなくても，サイドバーから全ページへ移動できる</li>
              <li>トップページ下部にも通常の HTML リンクを配置する</li>
              <li>キーボード操作時の focus を明確に表示する</li>
              <li>現在ページは視覚的な強調と aria-current で示す</li>
              <li>prefers-reduced-motion が有効な場合は，動きのある演出を抑える</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="panel detail-panel">
        <div className="section-heading">
          <p className="eyebrow">Information architecture</p>
          <h2>3D と HTML リンクを併用する</h2>
          <p className="lede">
            3D シーンは印象を作るための入口ですが，操作できない環境でも情報へ到達できることを優先しています．そのため，全ての主要導線はサイドバーと通常の HTML リンクにも配置します．
          </p>
        </div>

        <div className="detail-columns">
          <article className="detail-card">
            <h2>3D interaction</h2>
            <ul className="detail-list">
              <li>中央に About 島を配置し，その他の島を円周上に等間隔で配置する</li>
              <li>各 GLB は BoundingBox を使って読み込み時に正規化する</li>
              <li>島ごとの差が導線の強弱に見えないよう，見た目のサイズを揃える</li>
              <li>各島は中央を向け，必要に応じて yawOffset で個別補正する</li>
              <li>GitHub 島では壊れやすいロゴをモデル内に含めず，UI 側で GitHub と表示する</li>
            </ul>
          </article>

          <article className="detail-card">
            <h2>HTML navigation</h2>
            <ul className="detail-list">
              <li>Three.js のクリック導線に依存しない</li>
              <li>about，career，research，projects，server，github，contact をサイドバーに表示する</li>
              <li>GitHub は外部リンクであることが分かる表現にする</li>
              <li>現在ページは aria-current と視覚的な強調で示す</li>
              <li>キーボード操作でも主要ページへ移動できるようにする</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="panel detail-panel">
        <div className="section-heading">
          <p className="eyebrow">Technology</p>
          <h2>使用技術と実装範囲</h2>
          <p className="lede">
            見た目の演出だけでなく，ページ構成，遷移，アクセシビリティ，公開範囲の整理までを含めて実装します．
          </p>
        </div>

        <div className="research-grid">
          <article className="detail-card">
            <h2>Frontend</h2>
            <ul className="detail-list">
              <li>Next.js によるページ構成</li>
              <li>TypeScript による型付き実装</li>
              <li>CSS Modules によるコンポーネント単位のスタイル管理</li>
              <li>通常の HTML リンクによる fallback 導線</li>
            </ul>
          </article>

          <article className="detail-card">
            <h2>3D scene</h2>
            <ul className="detail-list">
              <li>Hunyuan3D による GLB アセット生成</li>
              <li>React Three Fiber による Three.js シーン構築</li>
              <li>drei による GLB 読み込み，環境光，星空，HTML ラベルの利用</li>
              <li>BoundingBox によるモデルの正規化</li>
              <li>選択状態に応じた島，ラベル，説明パネルの強調</li>
              <li>glTF Transform による GLB の計測とテクスチャ最適化</li>
            </ul>
          </article>

          <article className="detail-card">
            <h2>Motion</h2>
            <ul className="detail-list">
              <li>ページ遷移には短いフェード，スライド，軽いスケール変化を使う</li>
              <li>操作の邪魔にならない速度に抑える</li>
              <li>prefers-reduced-motion が有効な場合は最小限の動きにする</li>
              <li>Three.js 表示中も UI 遷移を滑らかに保つ</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="panel detail-panel">
        <div className="section-heading">
          <p className="eyebrow">Content policy</p>
          <h2>ページごとの役割</h2>
          <p className="lede">
            各ページは同じ粒度で自己紹介を繰り返すのではなく，それぞれ別の判断材料を提供するために分けています．
          </p>
        </div>

        <div className="timeline-list">
          <article className="timeline-item">
            <span>About</span>
            <h2>サイト自体の説明</h2>
            <p>
              自己紹介ではなく，3D 表現，導線設計，アクセシビリティ，公開範囲の考え方を説明します．
            </p>
          </article>

          <article className="timeline-item">
            <span>Career</span>
            <h2>学歴・実務経験・スキル</h2>
            <p>
              学習背景，実務経験，扱える技術を整理し，Web，研究，運用を横断できることを示します．
            </p>
          </article>

          <article className="timeline-item">
            <span>Research</span>
            <h2>Web 開発とは別軸の技術的強み</h2>
            <p>
              数値計算，制御，最適化，問題設定，評価の考え方を，開発経験とは独立した強みとしてまとめます．
            </p>
          </article>

          <article className="timeline-item">
            <span>Projects</span>
            <h2>代表的な個人開発</h2>
            <p>
              公開可能な制作物を中心に，設計意図，実装範囲，運用上の工夫，得られた成果を説明します．
            </p>
          </article>

          <article className="timeline-item">
            <span>Server</span>
            <h2>公開可能な範囲の自宅サーバ運用</h2>
            <p>
              Docker Compose，Cloudflare Tunnel，HTTPS，独自ドメインなどの運用経験を説明します．内部 IP，管理 URL，VPN ノード一覧，内部サービス一覧は公開しません．
            </p>
          </article>

          <article className="timeline-item">
            <span>Contact</span>
            <h2>連絡導線</h2>
            <p>
              サイト閲覧後に必要な連絡へ移れるようにし，3D シーンや GitHub とは独立した通常フォームとして配置します．
            </p>
          </article>
        </div>
      </section>

      <section className="panel detail-panel">
        <div className="section-heading">
          <p className="eyebrow">Accessibility</p>
          <h2>見た目より先に到達可能性を確保する</h2>
          <p className="lede">
            3D 表現を使っていても，操作環境や身体的条件によって情報に到達できない構成にはしません．選択状態，説明表示，フォーカス表示，通常リンクを組み合わせて，視覚的な演出と到達可能性を両立します．
          </p>
        </div>

        <div className="detail-columns">
          <article className="detail-card">
            <h2>操作しやすくするための工夫</h2>
            <ul className="detail-list">
              <li>主要導線を Three.js のクリック操作だけに限定しない</li>
              <li>サイドバーと HTML リンクを併設する</li>
              <li>島の選択状態をラベルと説明パネルにも反映する</li>
              <li>ボタンとリンクの keyboard focus を明確に表示する</li>
              <li>aria-label と aria-current を適切に設定する</li>
              <li>色だけで現在地や選択状態を表現しない</li>
              <li>背景と文字のコントラストを確保する</li>
              <li>prefers-reduced-motion に対応する</li>
            </ul>
          </article>

          <article className="detail-card">
            <h2>避けている設計</h2>
            <ul className="detail-list">
              <li>トップページに長い自己紹介文を置く</li>
              <li>3D 操作ができないとページ移動できない構成にする</li>
              <li>選択状態を発光や色だけで表現する</li>
              <li>アニメーションを長くして操作を待たせる</li>
              <li>GitHub 外部リンクを通常の内部ページと同じ見せ方にする</li>
              <li>装飾を優先して詳細ページの読みやすさを落とす</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="panel detail-panel">
        <div className="section-heading">
          <p className="eyebrow">Public boundary</p>
          <h2>安全に公開するための設計</h2>
          <p className="lede">
            このサイトでは，自宅サーバ運用そのものは技術経験として扱います．ただし，内部サービスの詳細や管理情報はポートフォリオの公開機能に含めません．
          </p>
        </div>

        <div className="detail-columns">
          <article className="detail-card">
            <h2>公開するもの</h2>
            <ul className="detail-list">
              <li>自宅サーバで運用しているという設計経験</li>
              <li>Docker Compose による複数サービス管理</li>
              <li>Cloudflare Tunnel による origin 非公開の構成</li>
              <li>外部公開する機能と内部向け機能を分ける判断</li>
              <li>将来的に IoT などへ拡張できる余地</li>
            </ul>
          </article>

          <article className="detail-card warning-card">
            <h2>公開しないもの</h2>
            <ul className="detail-list">
              <li>Headscale の状態表示</li>
              <li>VPN ノード一覧</li>
              <li>内部サービス一覧</li>
              <li>内部 IP</li>
              <li>管理 URL</li>
              <li>IoT センサー値や植物育成ログ</li>
            </ul>
          </article>
        </div>
      </section>
    </main>
  );
}
