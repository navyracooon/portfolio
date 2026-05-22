# Portfolio Monorepo

Nix で開発環境を固定しつつ、`frontend` に Next.js、`backend` に FastAPI を置いたポートフォリオです。フロントは Three.js ベースのビジュアル演出を含み、バックエンドからプロフィール情報と制作実績を取得します。

## Stack

- Nix Flakes
- Next.js App Router + TypeScript
- Three.js + React Three Fiber
- FastAPI + Pydantic

## Directory

```text
.
├── backend
│   └── app
└── frontend
    ├── app
    └── components
```

## Setup

### 1. 開発環境に入る

```bash
nix develop
```

### 2. フロントエンドを起動

```bash
cd frontend
npm install
npm run dev
```

Next.js は `http://localhost:3000` で起動します。

### 3. バックエンドを起動

```bash
cd backend
uv sync
uv run uvicorn app.main:app --reload
```

FastAPI は `http://localhost:8000` で起動します。

## Environment Variables

フロントエンドはサーバ側 fetch とブラウザ側 fetch で API URL を分けています。

```bash
API_INTERNAL_BASE_URL=http://127.0.0.1:8000
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
```

Docker Compose では SSR から `http://backend:8000` を使い、ブラウザからは `http://localhost:8000` を使います。本番では `NEXT_PUBLIC_API_BASE_URL=https://api.example.com` のように公開 API ドメインを指定します。

バックエンドの公開 API 設定:

```bash
PORTFOLIO_ALLOWED_ORIGINS=https://example.com,https://www.example.com
PORTFOLIO_REQUIRE_ORIGIN=true
PORTFOLIO_ANALYTICS_RATE_LIMIT=120
PORTFOLIO_ANALYTICS_RATE_WINDOW_SECONDS=60
PORTFOLIO_CONTACT_RATE_LIMIT=5
PORTFOLIO_CONTACT_RATE_WINDOW_SECONDS=3600
PORTFOLIO_CAPTCHA_SECRET_KEY=
```

`PORTFOLIO_CAPTCHA_SECRET_KEY` を設定すると、問い合わせ API は `captcha_token` を必須にし、`PORTFOLIO_CAPTCHA_VERIFY_URL` で検証します。未設定の開発環境では rate limit、Origin 検査、honeypot のみを使います。

## Notes

- API が起動していない場合でも、フロントエンドはフォールバックデータで表示されます。
- 実績データは [backend/app/data.py](/Users/navyracooon/projects/portfolio/backend/app/data.py) に集約しています。フロントエンドの fallback は API 障害時の最小表示だけです。
- ページ閲覧、島クリック、問い合わせは SQLite に保存されます。Docker 起動時は `backend-data` volume、ローカル起動時は `PORTFOLIO_DB_PATH` 未指定なら `/tmp/portfolio-api.sqlite3` を使います。
- フロントエンドは ESLint / Prettier、バックエンドは Ruff で lint / format します。

## Quality Commands

```bash
task lint
task test
task format
```

個別に実行する場合:

```bash
cd frontend
npm run lint
npm run format:check

cd backend
uv run ruff check .
uv run ruff format --check .
uv run python -m unittest discover -s tests

cd frontend
npm test
```

## Architecture

- 公開範囲、運用構成、セキュリティ方針は [docs/architecture.md](/Users/navyracooon/projects/portfolio/docs/architecture.md) を参照してください。
