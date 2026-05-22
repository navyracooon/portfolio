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

フロントエンドは API のベース URL を以下で上書きできます。

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

## Notes

- API が起動していない場合でも、フロントエンドはフォールバックデータで表示されます。
- 実績データは [backend/app/data.py](/Users/navyracooon/projects/portfolio/backend/app/data.py) に置いてあるので、そのまま書き換えれば内容を差し替えられます。
- ページ閲覧、島クリック、問い合わせは SQLite に保存されます。Docker 起動時は `backend-data` volume、ローカル起動時は `PORTFOLIO_DB_PATH` 未指定なら `/tmp/portfolio-api.sqlite3` を使います。
- フロントエンドは ESLint / Prettier、バックエンドは Ruff で lint / format します。

## Quality Commands

```bash
task lint
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
```

## Architecture

- 公開範囲、運用構成、セキュリティ方針は [docs/architecture.md](/Users/navyracooon/projects/portfolio/docs/architecture.md) を参照してください。
