import type { Project } from "@/lib/types";

export const projects = [
  {
    slug: "panda-app",
    title: "PandA App",
    summary: "京都大学の学習管理システムと連携するモバイルアプリケーション。",
    impact: "京都大学情報環境機構により公式アプリとして承認され、iOS・Android 向けに公開されています。",
    overview:
      "PandA App は、京都大学の学習管理システムをスマートフォンから扱いやすくするために開発したクロスプラットフォームアプリです。課題、通知、授業情報などの導線を整理し、学生が日常的に必要とする情報へ素早くアクセスできることを重視しました。",
    role: "Mobile application development / UI design / API integration",
    year: 2024,
    stack: ["React Native", "Expo", "TypeScript"],
    highlights: [
      "京都大学 LMS と連携するモバイルクライアントを開発",
      "React Native（Expo）により iOS・Android の両方に対応",
      "京都大学情報環境機構により公式アプリとして承認",
      "課題確認，通知閲覧，授業情報確認の導線をモバイル向けに整理",
    ],
    operations: [
      "公開後の軽微な修正と改善に対応",
      "大学システムとの連携を前提にした画面構成を設計",
      "ユーザーが日常的に使う操作を中心に UI を整理",
    ],
    githubUrl: "https://github.com/navyracooon/panda-app",
  },
  {
    slug: "portfolio",
    title: "Portfolio",
    summary: "Next.js、FastAPI、Three.js で構成した公開用ポートフォリオ Web アプリケーション。",
    impact: "3D 表現，ページ導線，イベント記録，公開運用を一つの Web アプリケーションとして設計しています。",
    overview:
      "このポートフォリオでは、固定配置の 3D オブジェクトを各詳細ページへの入口として使っています。操作イベントはバックエンドに記録しますが、行動データによって表示順位を自動変更するのではなく、情報設計の主導権を UI 側に残しています。",
    role: "Frontend / Backend / UX / Infrastructure design",
    year: 2026,
    stack: ["Next.js", "FastAPI", "Three.js", "TypeScript", "Docker"],
    highlights: [
      "Three.js による 3D ナビゲーションを実装",
      "React Three Fiber を用いて GLB アセットを表示",
      "FastAPI でページ閲覧と操作イベントを記録",
      "通常リンクによる fallback 導線を併設",
      "Cloudflare Tunnel を用いた自宅サーバ運用を想定",
    ],
    operations: [
      "3D 操作に依存しないページ導線を確保",
      "内部サーバ情報を公開 UI に出さない構成に整理",
      "生成した GLB アセットのサイズと描画負荷を最適化",
    ],
    githubUrl: "https://github.com/navyracooon/portfolio",
  },
  {
    slug: "research",
    title: "Research",
    summary: "トカマク炉心プラズマの温度分布制御を題材にした数値計算・制御・最適化の研究。",
    impact:
      "物理モデルを用いた数値シミュレーションを、制御問題として定式化し、Python による実験管理と最適化へ接続しています。",
    overview:
      "核融合プラズマの温度分布制御を対象に、輸送シミュレーション、PID 制御、CMA-ES によるパラメータ探索を扱っています。研究内容そのものだけでなく、既存の FORTRAN コードを Python から扱えるようにし、実験を自動化する実装面も重視しています。",
    role: "Research / Numerical simulation / Control / Optimization",
    year: 2025,
    stack: ["Python", "FORTRAN", "CMA-ES", "PID Control"],
    highlights: [
      "トカマク炉心プラズマの温度分布制御を対象にした数値解析",
      "中心電子温度と規格化温度勾配を制御指標として設定",
      "PID 制御器と入力混合係数を CMA-ES で最適化",
      "既存の科学計算コードを Python インターフェースから実行管理",
    ],
    operations: [
      "入力条件を自動生成し，輸送シミュレーションを反復実行",
      "定常状態，周期振動，計算破綻を分類",
      "到達可能領域をもとに制御結果を評価",
    ],
    githubUrl: "https://github.com/navyracooon/research-notes",
  },
  {
    slug: "dotfiles",
    title: "Dotfiles",
    summary: "日常の開発に使うシェル、エディタ、ターミナル構成を整理した個人設定集。",
    impact: "開発環境をコードとして管理し、環境の再現性と日常的な操作速度を両立しやすくしています。",
    overview:
      "Neovim、zsh、tmux などの設定をまとめたリポジトリです。成果物として目立つものではありませんが、毎日の開発効率に直接関わる基盤として、設定の責務分離と継続的な更新を重視しています。",
    role: "Developer experience / Tooling / Configuration design",
    year: 2026,
    stack: ["Neovim", "zsh", "tmux", "Git"],
    highlights: [
      "エディタ，シェル，ターミナルの設定をコードとして管理",
      "日常操作の小さな摩擦を設定として削減",
      "ローカル環境の再現性を意識して構成",
    ],
    operations: ["見た目よりも継続運用と更新しやすさを優先", "公開できる範囲の設定だけをリポジトリとして整理"],
    githubUrl: "https://github.com/navyracooon/dotfiles",
  },
  {
    slug: "server-lab",
    title: "Server Lab",
    summary: "自宅サーバの公開構成と内部サービス分離を説明するためのインフラ寄りプロジェクト。",
    impact:
      "Web アプリケーションを作るだけでなく、独自ドメイン、HTTPS、コンテナ運用、公開範囲の分離まで含めて扱っています。",
    overview:
      "Raspberry Pi 上で Docker Compose と Cloudflare Tunnel を用い、公開用サービスと内部サービスを分離して運用する構成です。Headscale などの内部アクセス経路は維持しつつ、ポートフォリオとして公開する情報は安全に見せられる範囲に限定しています。",
    role: "Infrastructure / Operations / Service boundary design",
    year: 2026,
    stack: ["Raspberry Pi", "Docker Compose", "Cloudflare Tunnel", "Linux"],
    highlights: [
      "Cloudflare Tunnel により origin を直接公開しない構成",
      "Docker Compose で portfolio と cloudflared を管理",
      "公開サイトと内部アクセス経路を分離",
      "独自ドメインと HTTPS を前提にした運用",
    ],
    operations: [
      "内部 IP，管理 URL，VPN ノード一覧は公開しない",
      "公開してよい技術判断だけをポートフォリオ上で説明",
      "将来的なサービス追加を想定して構成を整理",
    ],
    githubUrl: "https://github.com/navyracooon/portfolio",
  },
] satisfies readonly Project[];
