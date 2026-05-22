from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware

from app.data import PORTFOLIO, PROJECTS, get_project
from app.schemas import (
    ContactRequest,
    ContactResponse,
    IslandClickRequest,
    IslandClickResponse,
    MetricsSummaryResponse,
    PageViewRequest,
    PageViewResponse,
    PortfolioPayload,
    Project,
)
from app.storage import (
    get_metrics_summary as read_metrics_summary,
)
from app.storage import (
    init_db,
    insert_contact_submission,
    insert_island_click,
    insert_page_view,
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

init_db()


def _user_agent(payload_user_agent: str | None, request: Request) -> str | None:
    return payload_user_agent or request.headers.get("user-agent")


@app.get("/health")
def healthcheck() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/portfolio", response_model=PortfolioPayload)
def get_portfolio() -> PortfolioPayload:
    return PORTFOLIO


@app.get("/projects", response_model=list[Project])
def list_projects() -> list[Project]:
    return PROJECTS


@app.get("/projects/{slug}", response_model=Project)
def get_project_detail(slug: str) -> Project:
    project = get_project(slug)

    if project is None:
        raise HTTPException(status_code=404, detail="Project not found")

    return project


@app.post("/page-views", response_model=PageViewResponse)
def record_page_view(payload: PageViewRequest, request: Request) -> PageViewResponse:
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
def submit_contact(payload: ContactRequest) -> ContactResponse:
    insert_contact_submission(payload)
    return ContactResponse(
        status="accepted",
        message="Thanks. Your message has been queued for review.",
    )
