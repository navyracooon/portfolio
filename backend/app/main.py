from collections import Counter
from datetime import UTC, datetime
from threading import Lock

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware

from app.data import ARTICLES, PROFILE, PROJECTS, STRENGTHS
from app.schemas import (
    Article,
    ContactRequest,
    ContactResponse,
    InteractionEventRequest,
    InteractionEventResponse,
    InteractionEventSummaryItem,
    PortfolioResponse,
    Profile,
    Project,
)

app = FastAPI(
    title="Portfolio API",
    version="0.3.0",
    description="Public content, contact, and interaction event APIs for the portfolio frontend.",
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

_interaction_lock = Lock()
_interaction_events = [
    {
        "id": 1,
        "event_type": "object_clicked",
        "target_type": "project",
        "target_slug": "portfolio",
        "session_id": "seed-session",
        "path": "/",
        "user_agent": "seed",
        "created_at": "2026-05-18T12:00:00Z",
    },
    {
        "id": 2,
        "event_type": "object_clicked",
        "target_type": "project",
        "target_slug": "panda-app",
        "session_id": "seed-session",
        "path": "/",
        "user_agent": "seed",
        "created_at": "2026-05-18T12:01:00Z",
    },
    {
        "id": 3,
        "event_type": "object_clicked",
        "target_type": "project",
        "target_slug": "panda-app",
        "session_id": "seed-session-2",
        "path": "/",
        "user_agent": "seed",
        "created_at": "2026-05-18T12:02:00Z",
    },
    {
        "id": 4,
        "event_type": "detail_opened",
        "target_type": "article",
        "target_slug": "articles",
        "session_id": "seed-session-3",
        "path": "/",
        "user_agent": "seed",
        "created_at": "2026-05-18T12:03:00Z",
    },
]
_next_event_id = len(_interaction_events) + 1
_contact_submissions: list[ContactRequest] = []


@app.get("/health")
def healthcheck() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/portfolio", response_model=PortfolioResponse)
def get_portfolio() -> PortfolioResponse:
    return PortfolioResponse(
        profile=Profile.model_validate(PROFILE),
        strengths=STRENGTHS,
        projects=[Project.model_validate(project) for project in PROJECTS],
        articles=[Article.model_validate(article) for article in ARTICLES],
        infrastructure=[
            "Raspberry Pi 4 上で Docker Compose により複数サービスを管理",
            "Caddy によるホスト名ベースのルーティングと HTTPS 終端",
            "Cloudflare DNS と独自ドメインを使った公開運用",
            "内部サービスは公開 UI に含めず、Docker network 内に閉じる設計",
        ],
    )


@app.get("/projects", response_model=list[Project])
def get_projects() -> list[Project]:
    return [Project.model_validate(project) for project in PROJECTS]


@app.get("/projects/{slug}", response_model=Project)
def get_project(slug: str) -> Project:
    for project in PROJECTS:
        if project["slug"] == slug:
            return Project.model_validate(project)
    raise HTTPException(status_code=404, detail="Project not found")


@app.get("/articles", response_model=list[Article])
def get_articles() -> list[Article]:
    return [Article.model_validate(article) for article in ARTICLES]


@app.get("/articles/{slug}", response_model=Article)
def get_article(slug: str) -> Article:
    for article in ARTICLES:
        if article["slug"] == slug:
            return Article.model_validate(article)
    raise HTTPException(status_code=404, detail="Article not found")


@app.post("/interaction-events", response_model=InteractionEventResponse)
def record_interaction_event(
    payload: InteractionEventRequest, request: Request
) -> InteractionEventResponse:
    global _next_event_id

    now = datetime.now(UTC).replace(microsecond=0).isoformat().replace("+00:00", "Z")
    user_agent = payload.user_agent or request.headers.get("user-agent")

    with _interaction_lock:
        event = {
            "id": _next_event_id,
            "event_type": payload.event_type,
            "target_type": payload.target_type,
            "target_slug": payload.target_slug,
            "session_id": payload.session_id,
            "path": payload.path,
            "user_agent": user_agent,
            "created_at": now,
        }
        _interaction_events.append(event)
        _next_event_id += 1

    return InteractionEventResponse(
        id=event["id"],
        event_type=event["event_type"],
        target_type=event["target_type"],
        target_slug=event["target_slug"],
        created_at=event["created_at"],
    )


@app.get("/interaction-events/summary", response_model=list[InteractionEventSummaryItem])
def get_interaction_event_summary() -> list[InteractionEventSummaryItem]:
    counts = Counter(
        (event["target_slug"], event["event_type"])
        for event in _interaction_events
    )
    return [
        InteractionEventSummaryItem(
            target_slug=target_slug,
            event_type=event_type,
            count=count,
        )
        for (target_slug, event_type), count in sorted(counts.items())
    ]


@app.post("/contact", response_model=ContactResponse)
def submit_contact(payload: ContactRequest) -> ContactResponse:
    _contact_submissions.append(payload)
    return ContactResponse(
        status="accepted",
        message="Thanks. Your message has been queued for review.",
    )
