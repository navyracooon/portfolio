from pydantic import BaseModel, EmailStr, Field


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
    github_url: str | None = None
    live_url: str | None = None


class PortfolioPayload(BaseModel):
    profile: Profile
    strengths: list[str]
    projects: list[Project]
    infrastructure: list[str]


class ContactRequest(BaseModel):
    name: str
    email: EmailStr
    company: str | None = None
    message: str


class ContactResponse(BaseModel):
    status: str
    message: str


class PageViewRequest(BaseModel):
    session_id: str
    path: str
    user_agent: str | None = None


class PageViewResponse(BaseModel):
    id: int
    path: str
    created_at: str


class IslandClickRequest(BaseModel):
    island_id: str = Field(min_length=1)
    href: str
    session_id: str
    path: str
    user_agent: str | None = None


class IslandClickResponse(BaseModel):
    id: int
    island_id: str
    href: str
    created_at: str


class CountItem(BaseModel):
    key: str
    count: int


class MetricsSummaryResponse(BaseModel):
    total_page_views: int
    total_island_clicks: int
    page_views: list[CountItem]
    island_clicks: list[CountItem]
