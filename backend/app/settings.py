import os
from dataclasses import dataclass
from urllib.parse import urlparse

DEFAULT_ALLOWED_ORIGINS = (
    "http://localhost:3000",
    "http://127.0.0.1:3000",
)


def _env_list(name: str, default: tuple[str, ...]) -> tuple[str, ...]:
    raw_value = os.environ.get(name)

    if raw_value is None:
        return default

    return tuple(item.strip().rstrip("/") for item in raw_value.split(",") if item.strip())


def _env_bool(name: str, default: bool = False) -> bool:
    raw_value = os.environ.get(name)

    if raw_value is None:
        return default

    return raw_value.strip().lower() in {"1", "true", "yes", "on"}


def _env_int(name: str, default: int) -> int:
    raw_value = os.environ.get(name)

    if raw_value is None:
        return default

    try:
        return int(raw_value)
    except ValueError:
        return default


def normalize_origin(value: str | None) -> str | None:
    if not value:
        return None

    parsed = urlparse(value)

    if parsed.scheme not in {"http", "https"} or not parsed.netloc:
        return None

    return f"{parsed.scheme}://{parsed.netloc}".rstrip("/")


@dataclass(frozen=True)
class Settings:
    allowed_origins: tuple[str, ...]
    require_origin: bool
    analytics_rate_limit: int
    analytics_rate_window_seconds: int
    contact_rate_limit: int
    contact_rate_window_seconds: int
    captcha_secret_key: str | None
    captcha_verify_url: str
    captcha_timeout_seconds: int


def get_settings() -> Settings:
    return Settings(
        allowed_origins=_env_list("PORTFOLIO_ALLOWED_ORIGINS", DEFAULT_ALLOWED_ORIGINS),
        require_origin=_env_bool("PORTFOLIO_REQUIRE_ORIGIN", False),
        analytics_rate_limit=_env_int("PORTFOLIO_ANALYTICS_RATE_LIMIT", 120),
        analytics_rate_window_seconds=_env_int("PORTFOLIO_ANALYTICS_RATE_WINDOW_SECONDS", 60),
        contact_rate_limit=_env_int("PORTFOLIO_CONTACT_RATE_LIMIT", 5),
        contact_rate_window_seconds=_env_int("PORTFOLIO_CONTACT_RATE_WINDOW_SECONDS", 3600),
        captcha_secret_key=os.environ.get("PORTFOLIO_CAPTCHA_SECRET_KEY"),
        captcha_verify_url=os.environ.get(
            "PORTFOLIO_CAPTCHA_VERIFY_URL",
            "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        ),
        captcha_timeout_seconds=_env_int("PORTFOLIO_CAPTCHA_TIMEOUT_SECONDS", 5),
    )
