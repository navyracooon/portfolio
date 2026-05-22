import styles from "./CareerPage.module.css";

const careerTimeline = [
  {
    period: "High School",
    title: "愛知県立岡崎高校",
    body: "数理系の学習基盤を形成した時期です．現在の工学，情報，数値計算への関心につながる基礎をここで固めました．",
  },
  {
    period: "2022.04 - 2026.03",
    title: "京都大学 工学部 電気電子工学科",
    body: "電気電子工学を軸に，数学，物理，情報，制御，数値計算の基礎を学びました．Web 開発だけでなく，研究やシミュレーションを理解するための工学的な土台になっています．",
  },
  {
    period: "2022.05 - Present",
    title: "株式会社 DeMiA / ソフトウェアエンジニア",
    body: "React，Django，React Native（Expo）を用いた Web・モバイルアプリケーション開発に従事しています．SAML / OIDC ベースの SSO 認証機能や，WebSocket を用いたリアルタイムデータ処理機構の実装も担当しました．",
  },
  {
    period: "2022.05 - Present",
    title: "株式会社 空間精度研究所 / ソフトウェアエンジニア",
    body: "React と Django を用いた製品紹介 Web ページのフロントエンドおよびバックエンド開発に従事しています．要件整理から実装までを一貫して担当し，仕様を実装に落とし込む経験を積んでいます．",
  },
  {
    period: "2023.08 - 2023.09",
    title: "業務委託での社内向けフロントエンド開発",
    body: "Next.js を用いて，業務効率化を目的とした社内向けフロントエンドシステムを開発しました．短期間で要件を整理し，実際に使える画面へ落とし込むことを重視しました．",
  },
  {
    period: "2024.10 - 2024.11",
    title: "PandA Mobile / 京都大学 LMS 公式モバイルクライアント",
    body: "React Native（Expo）を用いて，京都大学の学習管理システムと連携するクロスプラットフォームモバイルアプリを開発しました．京都大学情報環境機構により公式アプリとして承認され，iOS・Android で公開されています．",
  },
  {
    period: "2025.04 - Present",
    title: "トカマク炉心プラズマの分布制御シミュレーション",
    body: "核融合プラズマの温度分布制御問題に対して，輸送シミュレーションコードを用いた数値解析を行っています．FORTRAN で実装されたコードに Python インターフェースを構築し，PID 制御や CMA-ES による最適化を適用しています．",
  },
  {
    period: "2026.04 - 2028.03",
    title: "京都大学大学院 エネルギー科学研究科 エネルギー基礎科学専攻",
    body: "修士課程では，エネルギー科学，制御，最適化，科学計算を軸に，研究で扱う問題設定と実装の両方を深めていく予定です．",
  },
];

export default function CareerPage() {
  return (
    <main className="page-shell inner-page">
      <section className="panel detail-panel">
        <div className="section-heading">
          <p className="eyebrow">Career</p>
          <h1 className="page-title">学歴・実務経験・スキルを時系列で整理する</h1>
          <p className="lede">
            Web
            アプリケーション開発，モバイル開発，研究での数値計算，自宅サーバ運用を別々の経験として切り分けつつ，現在までの技術的な積み上げが分かるように整理します．
          </p>
        </div>

        <div className={styles.careerTimeline} aria-label="Career timeline">
          {careerTimeline.map((item) => (
            <article className={styles.careerTimelineItem} key={`${item.period}-${item.title}`}>
              <div className={styles.careerTimelineDate}>{item.period}</div>
              <div className={styles.careerTimelineMarker} aria-hidden="true" />
              <div className={styles.careerTimelineContent}>
                <h2>{item.title}</h2>
                <p>{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="panel detail-panel">
        <div className="section-heading">
          <p className="eyebrow">Engineering experience</p>
          <h2>開発経験</h2>
          <p className="lede">
            実務では Web
            フロントエンド，バックエンド，モバイルアプリを横断して扱い，個人開発では公開・運用まで含めて設計しています．
          </p>
        </div>

        <div className="detail-columns">
          <article className="detail-card">
            <h2>Web / Frontend</h2>
            <ul className="detail-list">
              <li>React と Next.js を用いた Web アプリケーション開発</li>
              <li>TypeScript による型付き UI 実装</li>
              <li>画面設計，要件整理，API 連携を含むフロントエンド開発</li>
              <li>社内向けシステムや製品紹介ページの実装</li>
            </ul>
          </article>

          <article className="detail-card">
            <h2>Backend / Integration</h2>
            <ul className="detail-list">
              <li>Django を用いたバックエンド開発</li>
              <li>SAML / OIDC ベースの SSO 認証機能の実装</li>
              <li>WebSocket を用いたリアルタイムデータ処理</li>
              <li>外部 API と連携するアプリケーション設計</li>
            </ul>
          </article>
        </div>

        <div className="detail-columns">
          <article className="detail-card">
            <h2>Mobile</h2>
            <ul className="detail-list">
              <li>React Native（Expo）によるクロスプラットフォーム開発</li>
              <li>iOS・Android 向けアプリの公開を前提にした実装</li>
              <li>大学 LMS と連携するモバイルクライアントの開発</li>
              <li>公開後の軽微な修正・改善</li>
            </ul>
          </article>

          <article className="detail-card">
            <h2>Operation</h2>
            <ul className="detail-list">
              <li>Linux 環境での開発・運用</li>
              <li>Docker を用いた環境構築</li>
              <li>自宅サーバでのサービス運用</li>
              <li>公開範囲を意識したネットワーク・ドメイン設計</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="panel detail-panel">
        <div className="section-heading">
          <p className="eyebrow">Research background</p>
          <h2>研究で扱っている技術領域</h2>
          <p className="lede">
            Web 開発とは別軸の強みとして，数値シミュレーション，制御，最適化，科学計算を扱っています．
          </p>
        </div>

        <div className="research-grid">
          <article className="detail-card">
            <h2>Numerical simulation</h2>
            <p>物理モデルをもとにした輸送シミュレーションを扱い，解析対象をコード上で実験可能な形に整理します．</p>
          </article>

          <article className="detail-card">
            <h2>Control</h2>
            <p>
              プラズマ温度分布の制御問題に対して，PID 制御などの手法を適用し，安定した制御系の設計を検討しています．
            </p>
          </article>

          <article className="detail-card">
            <h2>Optimization</h2>
            <p>CMA-ES などの最適化手法を用いて，制御パラメータの探索や実験の自動化に取り組んでいます．</p>
          </article>

          <article className="detail-card">
            <h2>Scientific computing</h2>
            <p>FORTRAN の既存コードに対して Python インターフェースを構築し，解析と実験を効率化しています．</p>
          </article>
        </div>
      </section>

      <section className="panel detail-panel">
        <div className="section-heading">
          <p className="eyebrow">Skills</p>
          <h2>主な使用技術</h2>
          <p className="lede">抽象的なスキル名よりも，実際に扱っている技術と用途が分かるように整理しています．</p>
        </div>

        <div className="detail-columns">
          <article className="detail-card">
            <h2>Languages</h2>
            <ul className="detail-list">
              <li>Python</li>
              <li>TypeScript</li>
              <li>C++</li>
            </ul>
          </article>

          <article className="detail-card">
            <h2>Frontend</h2>
            <ul className="detail-list">
              <li>React</li>
              <li>Next.js</li>
              <li>React Three Fiber</li>
              <li>CSS</li>
            </ul>
          </article>
        </div>

        <div className="detail-columns">
          <article className="detail-card">
            <h2>Backend / Mobile</h2>
            <ul className="detail-list">
              <li>Django</li>
              <li>React Native</li>
              <li>Expo</li>
              <li>API 連携</li>
            </ul>
          </article>

          <article className="detail-card">
            <h2>Tools / Infrastructure</h2>
            <ul className="detail-list">
              <li>Git</li>
              <li>Linux</li>
              <li>Docker</li>
              <li>自宅サーバ運用</li>
            </ul>
          </article>
        </div>

        <div className="detail-columns">
          <article className="detail-card">
            <h2>Specialized areas</h2>
            <ul className="detail-list">
              <li>数値シミュレーション</li>
              <li>最適化</li>
              <li>制御工学</li>
              <li>科学計算</li>
            </ul>
          </article>

          <article className="detail-card">
            <h2>Language / International background</h2>
            <ul className="detail-list">
              <li>TOEIC 920</li>
              <li>米国居住経験: 2006年9月 - 2009年1月</li>
              <li>英国居住経験: 2014年3月 - 2016年12月</li>
            </ul>
          </article>
        </div>
      </section>
    </main>
  );
}
