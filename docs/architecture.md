# Portfolio Architecture

## 目的

このリポジトリは、公開用ポートフォリオ Web アプリケーションを構築するためのものとする。

ポートフォリオは単なる静的サイトではなく、以下を含む実運用可能な Web アプリケーションとして設計する。

- 3D UI を含むフロントエンド
- API を持つバックエンド
- Docker Compose によるサービス管理
- Cloudflare Tunnel / Caddy による公開経路の分離
- Cloudflare DNS と独自ドメインによる公開運用

一方で、内部向けに運用しているサービスは公開アプリケーションの機能に含めない。公開サイトと内部運用系は明確に分離する。

## 公開する機能

- 3D オブジェクトによる主要ページへの導線
- プロジェクト一覧とプロジェクト詳細ページ
- 研究、経歴、自宅サーバ運用の説明ページ
- 問い合わせフォーム
- 操作イベントの記録・集計

## 公開しない情報・機能

以下はポートフォリオの公開画面や公開 API に含めない。

- Headscale の状態表示
- VPN ノード一覧
- 内部サービス一覧
- 内部 IP
- 管理 URL
- IoT センサー値
- 植物育成ログ

これらは内部向け運用情報として扱い、公開アプリケーションの責務から外す。

## 公開サイトで説明する内容

公開サイト上では、以下を運用経験・設計経験として説明する。

- 自宅サーバ上で Web アプリケーションを運用していること
- Docker Compose によって複数サービスを管理していること
- Cloudflare Tunnel により origin を直接公開しない構成
- Cloudflare DNS / Tunnel と独自ドメインを利用していること
- 内部向けサービスは外部公開しない設計にしていること
- 将来的に IoT、センサー連携、植物育成ログなどへ拡張できる余地があること

## 情報設計

公開ポートフォリオは、以下の画面構成を基本とする。

- トップページ
- About
- Career
- Research
- Server
- プロジェクト一覧
- プロジェクト詳細
- 問い合わせ

トップページでは 3D UI を導線として使い、各詳細ページへの遷移を中心に構成する。内部サービスの詳細表示は行わない。

## 現在の自宅サーバ構成

- Host: Raspberry Pi 4
- OS: Raspberry Pi OS Lite
- DNS: Cloudflare
- Public route: Cloudflare Tunnel
- Existing reverse proxy: Caddy
- Service Management: Docker Compose
- 公開中サービスの例: `headscale.navyracooon.com`

ポートフォリオは Cloudflare Tunnel から内部コンテナへ転送する。各アプリケーションの内部ポートは Docker network 内だけで利用する。

## 公開構成の考え方

ポートフォリオ追加後の公開構成は以下を想定する。

- `navyracooon.com`: ポートフォリオ本体
- `www.navyracooon.com`: `navyracooon.com` へリダイレクト
- `api.navyracooon.com`: ポートフォリオ用公開 API
- `headscale.navyracooon.com`: 既存の運用用サービス

ポートフォリオは Cloudflare Tunnel 経由で内部サービスへ接続する。既存の Headscale など、別サービスで使っている Caddy 構成はポートフォリオ本体とは分けて扱う。

- `navyracooon.com` -> portfolio frontend
- `api.navyracooon.com` -> portfolio backend
- `headscale.navyracooon.com` -> headscale

この構成では、ポートフォリオ用コンテナのホスト側ポートは公開せず、各サービスの内部ポートは Docker network 内に閉じる。

## コンテナ構成方針

ポートフォリオは Headscale と同じ Docker Compose 配下、または別の Compose project として追加する。

管理対象の例:

- `frontend`
- `backend`
- `cloudflared`
- `caddy`（既存サービス用）
- `headscale`

重要なのは Compose を分けることではなく、公開サービスと内部サービスの責務および公開範囲を分離することである。

## セキュリティ方針

- 公開サイトでは内部サービスの存在や管理 URL を露出しない
- Headscale、VPN ノード、内部 IP、管理用エンドポイントは公開機能に含めない
- 問い合わせフォームやイベント収集は公開 API として明確に分離する
- CORS と書き込み API の Origin 検査は `PORTFOLIO_ALLOWED_ORIGINS` で許可した公開フロントエンドに限定する
- ページ閲覧・島選択・問い合わせ API には IP 単位の簡易 rate limit を設定する
- 問い合わせフォームには honeypot を置き、必要に応じて `PORTFOLIO_CAPTCHA_SECRET_KEY` で CAPTCHA 検証を必須化する
- ポートフォリオ用コンテナはホスト側に直接公開しない

内部向けサービスは「存在を隠す」のではなく、「公開アプリケーションの責務に含めない」方針で扱う。

## ポートフォリオで見せる価値

このポートフォリオで見せる価値は、単にページを作れることではない。主に以下を示す。

- 3D UI を含むフロントエンド実装
- プロジェクト、研究、経歴、運用経験を整理して見せる情報設計
- 自宅サーバでの実運用
- Docker Compose によるサービス管理
- Cloudflare Tunnel / Caddy による公開経路の分離
- 独自ドメイン運用
- 公開サービスと内部サービスの分離
- 将来的な IoT・ログ収集・可視化への拡張性

## 表現方針

Headscale や VPN の詳細は、ポートフォリオの機能として前面に出さない。

「自宅サーバで Headscale を動かしている」こと自体は、運用経験として Server ページやプロジェクト詳細で概要レベルに留めて説明できる。一方で、ノード一覧、内部 IP、管理画面、内部 URL などを公開画面に表示する必要はない。

公開サイトでは、あくまでポートフォリオ Web アプリケーションとして完結させる。自宅サーバ構成は、Server ページやプロジェクト詳細の中で概要として説明する。

## 実装指針

このリポジトリでは、以下の責務分離を維持する。

- `frontend`: 公開 UI
- `backend`: 公開 API、問い合わせ受付、イベント記録・集計
- インフラ設定: 公開ルーティング、TLS 終端、サービス接続

内部向けサービスのデータモデルや表示ロジックを、公開 UI の中に直接組み込まない。
