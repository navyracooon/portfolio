from collections import Counter
from datetime import UTC, datetime
from threading import Lock

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from app.schemas import (
    ContactRequest,
    ContactResponse,
    CountItem,
    IslandClickRequest,
    IslandClickResponse,
    MetricsSummaryResponse,
    PageViewRequest,
    PageViewResponse,
)

app = FastAPI(
    title="Portfolio API",
    version="0.5.0",
    description="Contact handling and lightweight portfolio analytics API.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

_metrics_lock = Lock()
_page_views: list[dict[str, object]] = []
_island_clicks: list[dict[str, object]] = []
_contact_submissions: list[ContactRequest] = []
_next_page_view_id = 1
_next_island_click_id = 1


def _now_iso() -> str:
    return datetime.now(UTC).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def _user_agent(payload_user_agent: str | None, request: Request) -> str | None:
    return payload_user_agent or request.headers.get("user-agent")


@app.get("/health")
def healthcheck() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/page-views", response_model=PageViewResponse)
def record_page_view(payload: PageViewRequest, request: Request) -> PageViewResponse:
    global _next_page_view_id

    with _metrics_lock:
        event = {
            "id": _next_page_view_id,
            "path": payload.path,
            "session_id": payload.session_id,
            "user_agent": _user_agent(payload.user_agent, request),
            "created_at": _now_iso(),
        }
        _page_views.append(event)
        _next_page_view_id += 1

    return PageViewResponse(
        id=event["id"],
        path=event["path"],
        created_at=event["created_at"],
    )


@app.post("/island-clicks", response_model=IslandClickResponse)
def record_island_click(payload: IslandClickRequest, request: Request) -> IslandClickResponse:
    global _next_island_click_id

    with _metrics_lock:
        event = {
            "id": _next_island_click_id,
            "island_id": payload.island_id,
            "href": payload.href,
            "session_id": payload.session_id,
            "path": payload.path,
            "user_agent": _user_agent(payload.user_agent, request),
            "created_at": _now_iso(),
        }
        _island_clicks.append(event)
        _next_island_click_id += 1

    return IslandClickResponse(
        id=event["id"],
        island_id=event["island_id"],
        href=event["href"],
        created_at=event["created_at"],
    )


@app.get("/metrics/summary", response_model=MetricsSummaryResponse)
def get_metrics_summary() -> MetricsSummaryResponse:
    with _metrics_lock:
        page_view_counts = Counter(str(event["path"]) for event in _page_views)
        island_click_counts = Counter(str(event["island_id"]) for event in _island_clicks)

    return MetricsSummaryResponse(
        total_page_views=sum(page_view_counts.values()),
        total_island_clicks=sum(island_click_counts.values()),
        page_views=[CountItem(key=key, count=count) for key, count in sorted(page_view_counts.items())],
        island_clicks=[CountItem(key=key, count=count) for key, count in sorted(island_click_counts.items())],
    )


@app.post("/contact", response_model=ContactResponse)
def submit_contact(payload: ContactRequest) -> ContactResponse:
    _contact_submissions.append(payload)
    return ContactResponse(
        status="accepted",
        message="Thanks. Your message has been queued for review.",
    )
