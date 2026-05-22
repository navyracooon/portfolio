import os
import sqlite3
from collections import Counter
from collections.abc import Iterator
from contextlib import contextmanager
from datetime import UTC, datetime
from pathlib import Path
from threading import Lock

from app.schemas import ContactRequest, CountItem, MetricsSummaryResponse

DB_PATH = Path(os.environ.get("PORTFOLIO_DB_PATH", "/tmp/portfolio-api.sqlite3"))
_lock = Lock()


def _now_iso() -> str:
    return datetime.now(UTC).replace(microsecond=0).isoformat().replace("+00:00", "Z")


@contextmanager
def _connect() -> Iterator[sqlite3.Connection]:
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    connection = sqlite3.connect(DB_PATH)
    connection.row_factory = sqlite3.Row
    try:
        yield connection
        connection.commit()
    finally:
        connection.close()


def init_db() -> None:
    with _connect() as connection:
        connection.executescript(
            """
            CREATE TABLE IF NOT EXISTS page_views (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                path TEXT NOT NULL,
                session_id TEXT NOT NULL,
                user_agent TEXT,
                created_at TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS island_clicks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                island_id TEXT NOT NULL,
                href TEXT NOT NULL,
                session_id TEXT NOT NULL,
                path TEXT NOT NULL,
                user_agent TEXT,
                created_at TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS contact_submissions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                company TEXT,
                message TEXT NOT NULL,
                created_at TEXT NOT NULL
            );
            """
        )


def insert_page_view(path: str, session_id: str, user_agent: str | None) -> dict[str, object]:
    created_at = _now_iso()
    with _lock, _connect() as connection:
        cursor = connection.execute(
            """
            INSERT INTO page_views (path, session_id, user_agent, created_at)
            VALUES (?, ?, ?, ?)
            """,
            (path, session_id, user_agent, created_at),
        )
        event_id = int(cursor.lastrowid)

    return {"id": event_id, "path": path, "created_at": created_at}


def insert_island_click(
    island_id: str,
    href: str,
    session_id: str,
    path: str,
    user_agent: str | None,
) -> dict[str, object]:
    created_at = _now_iso()
    with _lock, _connect() as connection:
        cursor = connection.execute(
            """
            INSERT INTO island_clicks (island_id, href, session_id, path, user_agent, created_at)
            VALUES (?, ?, ?, ?, ?, ?)
            """,
            (island_id, href, session_id, path, user_agent, created_at),
        )
        event_id = int(cursor.lastrowid)

    return {
        "id": event_id,
        "island_id": island_id,
        "href": href,
        "created_at": created_at,
    }


def insert_contact_submission(payload: ContactRequest) -> None:
    with _lock, _connect() as connection:
        connection.execute(
            """
            INSERT INTO contact_submissions (name, email, company, message, created_at)
            VALUES (?, ?, ?, ?, ?)
            """,
            (payload.name, str(payload.email), payload.company, payload.message, _now_iso()),
        )


def get_metrics_summary() -> MetricsSummaryResponse:
    with _connect() as connection:
        page_view_rows = connection.execute(
            "SELECT path, COUNT(*) AS count FROM page_views GROUP BY path ORDER BY path"
        ).fetchall()
        island_click_rows = connection.execute(
            """
            SELECT island_id, COUNT(*) AS count
            FROM island_clicks
            GROUP BY island_id
            ORDER BY island_id
            """
        ).fetchall()

    page_view_counts = Counter({str(row["path"]): int(row["count"]) for row in page_view_rows})
    island_click_counts = Counter(
        {str(row["island_id"]): int(row["count"]) for row in island_click_rows}
    )

    return MetricsSummaryResponse(
        total_page_views=sum(page_view_counts.values()),
        total_island_clicks=sum(island_click_counts.values()),
        page_views=[CountItem(key=key, count=count) for key, count in page_view_counts.items()],
        island_clicks=[
            CountItem(key=key, count=count) for key, count in island_click_counts.items()
        ],
    )
