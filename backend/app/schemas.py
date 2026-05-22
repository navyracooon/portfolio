from pydantic import BaseModel, EmailStr, Field


class ContactRequest(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    company: str | None = Field(default=None, max_length=160)
    message: str = Field(min_length=1, max_length=5000)
    website: str | None = Field(default=None, max_length=200)
    captcha_token: str | None = Field(default=None, max_length=4096)


class ContactResponse(BaseModel):
    status: str
    message: str


class PageViewRequest(BaseModel):
    session_id: str = Field(min_length=1, max_length=128)
    path: str = Field(min_length=1, max_length=2048)
    user_agent: str | None = Field(default=None, max_length=512)


class PageViewResponse(BaseModel):
    id: int
    path: str
    created_at: str


class IslandClickRequest(BaseModel):
    island_id: str = Field(min_length=1, max_length=80)
    href: str = Field(min_length=1, max_length=2048)
    session_id: str = Field(min_length=1, max_length=128)
    path: str = Field(min_length=1, max_length=2048)
    user_agent: str | None = Field(default=None, max_length=512)


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
