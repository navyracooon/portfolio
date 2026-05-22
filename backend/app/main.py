from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from app.schemas import (
    ContactRequest,
    ContactResponse,
    IslandClickRequest,
    IslandClickResponse,
    MetricsSummaryResponse,
    PageViewRequest,
    PageViewResponse,
)
from app.security import (
    enforce_contact_honeypot,
    enforce_origin_policy,
    enforce_rate_limit,
    verify_captcha,
)
from app.settings import get_settings
from app.storage import (
    get_metrics_summary as read_metrics_summary,
)
from app.storage import (
    init_db,
    insert_contact_submission,
    insert_island_click,
    insert_page_view,
)

settings = get_settings()

app = FastAPI(
    title="Portfolio API",
    version="0.5.0",
    description="Contact handling and lightweight portfolio analytics API.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=list(settings.allowed_origins),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

init_db()


def _user_agent(payload_user_agent: str | None, request: Request) -> str | None:
    return payload_user_agent or request.headers.get("user-agent")


@app.get("/health")
def healthcheck() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/page-views", response_model=PageViewResponse)
def record_page_view(payload: PageViewRequest, request: Request) -> PageViewResponse:
    enforce_origin_policy(request, settings)
    enforce_rate_limit(
        request,
        bucket="page-views",
        limit=settings.analytics_rate_limit,
        window_seconds=settings.analytics_rate_window_seconds,
    )
    event = insert_page_view(
        path=payload.path,
        session_id=payload.session_id,
        user_agent=_user_agent(payload.user_agent, request),
    )

    return PageViewResponse(
        id=event["id"],
        path=event["path"],
        created_at=event["created_at"],
    )


@app.post("/island-clicks", response_model=IslandClickResponse)
def record_island_click(payload: IslandClickRequest, request: Request) -> IslandClickResponse:
    enforce_origin_policy(request, settings)
    enforce_rate_limit(
        request,
        bucket="island-clicks",
        limit=settings.analytics_rate_limit,
        window_seconds=settings.analytics_rate_window_seconds,
    )
    event = insert_island_click(
        island_id=payload.island_id,
        href=payload.href,
        session_id=payload.session_id,
        path=payload.path,
        user_agent=_user_agent(payload.user_agent, request),
    )

    return IslandClickResponse(
        id=event["id"],
        island_id=event["island_id"],
        href=event["href"],
        created_at=event["created_at"],
    )


@app.get("/metrics/summary", response_model=MetricsSummaryResponse)
def get_metrics_summary() -> MetricsSummaryResponse:
    return read_metrics_summary()


@app.post("/contact", response_model=ContactResponse)
def submit_contact(payload: ContactRequest, request: Request) -> ContactResponse:
    enforce_origin_policy(request, settings)
    enforce_rate_limit(
        request,
        bucket="contact",
        limit=settings.contact_rate_limit,
        window_seconds=settings.contact_rate_window_seconds,
    )
    enforce_contact_honeypot(payload)
    verify_captcha(payload, request, settings)
    insert_contact_submission(payload)
    return ContactResponse(
        status="accepted",
        message="Thanks. Your message has been queued for review.",
    )
