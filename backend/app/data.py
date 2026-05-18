PROFILE = {
    "name": "Navy Racooon",
    "role": "Creative Developer / Full-Stack Engineer",
    "intro": "Three.js を単なる装飾ではなく、プロジェクトや記事への入口として扱うポートフォリオ。クリック操作は FastAPI に記録しつつ、行動データで導線そのものは歪めない設計にしています。",
    "location": "Tokyo, Japan",
    "focus": "3D entry points without behavior-driven ranking",
}

STRENGTHS = [
    "3D オブジェクトを固定配置の入口として扱い、装飾ではなく情報導線に変換する",
    "クリックイベントを API へ記録し、操作回数をポップアップと控えめな glow にだけ反映する",
    "通常の一覧導線も残し、Three.js が壊れてもポートフォリオとして成立する構成を維持する",
]

PROJECTS = [
    {
        "slug": "panda-app",
        "title": "PandA App",
        "summary": "Kyoto University LMS client application として設計した学習支援アプリ。",
        "impact": "教育用途の画面でも情報量を整理し、学生が必要な導線へ素早く到達できる UI を目指した。",
        "overview": "大学 LMS をモバイルから扱いやすくするためのクライアントアプリ想定。課題、通知、コース導線を整理し、複雑な情報構造を日常的な操作に落とし込むことを重視した。",
        "role": "Mobile app concept / UX / Frontend architecture",
        "year": 2026,
        "stack": ["React Native", "Expo", "TypeScript"],
        "highlights": [
            "LMS の複雑な情報構造を学生目線の導線へ再構成",
            "モバイルでの課題確認と通知閲覧を優先した UI",
            "ポートフォリオ上では 3D オブジェクトから概要へ入れる導線として利用",
        ],
        "operations": [
            "プロジェクト入口として 3D オブジェクトを固定配置",
            "クリック数は導線順位に使わず、概要ポップアップ表示にのみ利用",
        ],
        "article_slugs": ["3d-ui-information-architecture"],
        "github_url": "https://github.com/navyracooon/panda-app",
    },
    {
        "slug": "portfolio",
        "title": "Portfolio",
        "summary": "Next.js、FastAPI、Three.js で構成した公開用ポートフォリオ Web アプリケーション。",
        "impact": "フロントエンド表現、イベント記録、公開 API、運用設計を一つの体験として説明できる構成に整理。",
        "overview": "固定配置の 3D オブジェクトをプロジェクト・記事・問い合わせの入口として使い、操作イベントはバックエンドに記録する。一方で、行動データによるランキングやサイズ変更は行わず、情報設計の主導権を UI 側に残す。",
        "role": "Frontend / Backend / UX / Infra design",
        "year": 2026,
        "stack": ["Next.js", "FastAPI", "Three.js", "TypeScript", "Caddy"],
        "highlights": [
            "3D オブジェクトクリックで概要ポップアップを表示",
            "匿名 session_id 付きで interaction events を送信",
            "通常の Projects / Articles / Contact 一覧も別途用意",
        ],
        "operations": [
            "公開 API と内部サービスの責務を分離",
            "操作回数はポップアップ表示と控えめな glow のみに反映",
            "内部サーバ情報を公開 UI に出さない",
        ],
        "article_slugs": ["public-private-boundary", "caddy-compose-routing"],
        "github_url": "https://github.com/navyracooon/portfolio",
    },
    {
        "slug": "research",
        "title": "Research",
        "summary": "研究活動と技術背景を、実装と接続できる形で見せるためのまとめ。",
        "impact": "抽象的な研究テーマを、Python・最適化・制御の実装文脈まで落として説明できるようにした。",
        "overview": "数理最適化、制御、シミュレーションの知見を、Web アプリや運用設計と切り離さずに示すためのプロジェクト。研究内容そのものより、問題設定と実装思考を伝えることを重視している。",
        "role": "Research / Modeling / Technical writing",
        "year": 2026,
        "stack": ["Python", "Optimization", "Control"],
        "highlights": [
            "研究活動をポートフォリオ文脈に接続できる粒度で整理",
            "実験・実装・技術記事を横断して説明可能",
            "3D UI から研究背景へ直接遷移できる入口として配置",
        ],
        "operations": [
            "研究内容を内部情報や未公開データと混同しない",
            "公開可能な情報だけでストーリーを構成",
        ],
        "article_slugs": ["public-private-boundary"],
        "github_url": "https://github.com/navyracooon/research-notes",
    },
    {
        "slug": "dotfiles",
        "title": "Dotfiles",
        "summary": "日常の開発に使うシェル、エディタ、ターミナル構成を整理した個人設定集。",
        "impact": "開発体験の細部をコードとして管理し、環境の再現性と操作速度を両立しやすくした。",
        "overview": "Neovim、zsh、tmux などの設定をまとめたリポジトリ。派手な成果物ではないが、毎日の操作効率や思考速度に直接効く領域として扱っている。",
        "role": "Developer experience / tooling / configuration design",
        "year": 2026,
        "stack": ["Neovim", "zsh", "tmux", "Git"],
        "highlights": [
            "日常操作の小さな摩擦を設定として除去",
            "エディタ・シェル・ターミナルの責務を整理",
            "ポートフォリオ上では民家として配置し、日常の基盤を表現",
        ],
        "operations": [
            "見た目よりも継続運用と更新しやすさを優先",
            "ローカル環境構成も公開できる範囲だけ切り出して整理",
        ],
        "article_slugs": ["3d-ui-information-architecture"],
        "github_url": "https://github.com/navyracooon/dotfiles",
    },
    {
        "slug": "server-lab",
        "title": "Server Lab",
        "summary": "自宅サーバの公開構成と内部サービス分離を説明するためのインフラ寄りプロジェクト。",
        "impact": "単なるアプリ実装だけでなく、Caddy、Compose、独自ドメイン運用まで含めて説明できる軸を作った。",
        "overview": "Raspberry Pi 上で Caddy、Docker Compose、Cloudflare DNS を使い、公開用サービスと内部サービスを分離して運用する構成。Headscale の詳細そのものではなく、境界設計と公開範囲の制御を主題にしている。",
        "role": "Infra / operations / service boundary design",
        "year": 2026,
        "stack": ["Raspberry Pi", "Docker Compose", "Caddy", "Cloudflare"],
        "highlights": [
            "外部公開は 80/443 に限定",
            "ホスト名ベースで公開アプリと内部用途を振り分け",
            "3D シーン上ではサーバーラックとして配置",
        ],
        "operations": [
            "内部サービスの詳細や管理 URL は公開 UI に出さない",
            "公開アプリとして説明すべき範囲を限定している",
        ],
        "article_slugs": ["public-private-boundary", "caddy-compose-routing"],
        "github_url": "https://github.com/navyracooon/portfolio",
    },
]

ARTICLES = [
    {
        "slug": "public-private-boundary",
        "title": "公開ポートフォリオと内部サービスの境界をどう切るか",
        "summary": "同じ自宅サーバ上で複数サービスを動かしていても、公開アプリとして見せる責務は分けるべきという整理。",
        "published_at": "2026-05-18",
        "reading_time": "5 min",
        "tags": ["Architecture", "Security", "Home Server"],
        "body": [
            "公開ポートフォリオで見せるべきなのは、内部情報そのものではなく、公開範囲を制御している設計判断です。",
            "Headscale や VPN ノード、内部 IP のような運用情報は、公開 UI の価値ではありません。これらは内部向けサービスとして扱い、公開アプリの責務から切り離します。",
            "一方で、自宅サーバ上で Docker Compose と Caddy を使い、外部から見えるエンドポイントを整理していること自体は十分に価値があります。",
        ],
    },
    {
        "slug": "caddy-compose-routing",
        "title": "Caddy と Docker Compose で公開サービスを束ねる",
        "summary": "ホスト名ごとにコンテナを振り分け、アプリの内部ポートを外へ直接出さない構成の要点。",
        "published_at": "2026-05-18",
        "reading_time": "6 min",
        "tags": ["Caddy", "Docker Compose", "HTTPS"],
        "body": [
            "外部から到達できる入り口は Caddy の 80/443 のみに寄せ、各アプリケーションの実ポートは Docker network 内に閉じます。",
            "この構成にすると、フロントエンド、公開 API、内部運用サービスの責務分離が明快になります。",
            "重要なのは Compose のファイル数ではなく、公開境界がどこにあるかをアプリとインフラの両方で説明できることです。",
        ],
    },
    {
        "slug": "3d-ui-information-architecture",
        "title": "3D UI を情報導線として成立させる",
        "summary": "演出の強さを維持しながら、記事や制作実績に自然に遷移できる導線を作る考え方。",
        "published_at": "2026-05-18",
        "reading_time": "4 min",
        "tags": ["Three.js", "UX", "Frontend"],
        "body": [
            "3D UI は目を引きますが、遷移先の意味が不明確だと単なる飾りになります。",
            "そのため、各オブジェクトを project / article / contact への固定入口として扱い、クリック時に概要ポップアップを出す構成にしました。",
            "操作回数は保存しますが、サイズ変更や人気順ソートには使いません。導線を歪めずに、補助情報だけを増やすためです。",
        ],
    },
]
