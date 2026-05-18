from pydantic import BaseModel, EmailStr


class Profile(BaseModel):
    name: str
    role: str
    intro: str
    location: str
    focus: str


class Project(BaseModel):
    slug: str
    title: str
    summary: str
    impact: str
    overview: str
    role: str
    year: int
    stack: list[str]
    highlights: list[str]
    operations: list[str]
    article_slugs: list[str]
    github_url: str | None = None
    live_url: str | None = None


class Article(BaseModel):
    slug: str
    title: str
    summary: str
    published_at: str
    reading_time: str
    tags: list[str]
    body: list[str]


class PortfolioResponse(BaseModel):
    profile: Profile
    strengths: list[str]
    projects: list[Project]
    articles: list[Article]
    infrastructure: list[str]


class ContactRequest(BaseModel):
    name: str
    email: EmailStr
    company: str | None = None
    message: str


class ContactResponse(BaseModel):
    status: str
    message: str


class InteractionEventRequest(BaseModel):
    event_type: str
    target_type: str
    target_slug: str
    session_id: str
    path: str
    user_agent: str | None = None


class InteractionEventResponse(BaseModel):
    id: int
    event_type: str
    target_type: str
    target_slug: str
    created_at: str


class InteractionEventSummaryItem(BaseModel):
    target_slug: str
    event_type: str
    count: int
