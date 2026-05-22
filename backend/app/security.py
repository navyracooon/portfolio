import json
import time
from collections import defaultdict, deque
from threading import Lock
from urllib.parse import urlencode
from urllib.request import Request as UrlRequest
from urllib.request import urlopen

from fastapi import HTTPException, Request

from app.schemas import ContactRequest
from app.settings import Settings, normalize_origin


class RateLimiter:
    def __init__(self) -> None:
        self._events: dict[tuple[str, str], deque[float]] = defaultdict(deque)
        self._lock = Lock()

    def check(self, key: str, bucket: str, limit: int, window_seconds: int) -> None:
        if limit <= 0 or window_seconds <= 0:
            return

        now = time.monotonic()
        oldest_allowed = now - window_seconds
        event_key = (key, bucket)

        with self._lock:
            events = self._events[event_key]

            while events and events[0] < oldest_allowed:
                events.popleft()

            if len(events) >= limit:
                raise HTTPException(status_code=429, detail="Too many requests")

            events.append(now)


rate_limiter = RateLimiter()


def client_key(request: Request) -> str:
    if request.client and request.client.host:
        return request.client.host

    return "unknown"


def enforce_origin_policy(request: Request, settings: Settings) -> None:
    raw_origin = request.headers.get("origin")
    raw_referer = request.headers.get("referer")
    origin = normalize_origin(raw_origin)
    referer_origin = normalize_origin(raw_referer)

    if raw_origin and origin is None:
        raise HTTPException(status_code=403, detail="Origin is not allowed")

    if raw_referer and referer_origin is None:
        raise HTTPException(status_code=403, detail="Origin is not allowed")

    request_origin = origin or referer_origin

    if request_origin is None and not settings.require_origin:
        return

    if request_origin not in settings.allowed_origins:
        raise HTTPException(status_code=403, detail="Origin is not allowed")


def enforce_rate_limit(
    request: Request,
    *,
    bucket: str,
    limit: int,
    window_seconds: int,
) -> None:
    rate_limiter.check(client_key(request), bucket, limit, window_seconds)


def enforce_contact_honeypot(payload: ContactRequest) -> None:
    if payload.website:
        raise HTTPException(status_code=400, detail="Invalid contact submission")


def verify_captcha(payload: ContactRequest, request: Request, settings: Settings) -> None:
    if not settings.captcha_secret_key:
        return

    if not payload.captcha_token:
        raise HTTPException(status_code=400, detail="Captcha token is required")

    body = urlencode(
        {
            "secret": settings.captcha_secret_key,
            "response": payload.captcha_token,
            "remoteip": client_key(request),
        }
    ).encode()
    verification_request = UrlRequest(
        settings.captcha_verify_url,
        data=body,
        headers={"Content-Type": "application/x-www-form-urlencoded"},
        method="POST",
    )

    try:
        with urlopen(verification_request, timeout=settings.captcha_timeout_seconds) as response:
            result = json.loads(response.read().decode("utf-8"))
    except (OSError, ValueError) as exc:
        raise HTTPException(status_code=503, detail="Captcha verification failed") from exc

    if result.get("success") is not True:
        raise HTTPException(status_code=400, detail="Captcha verification failed")
