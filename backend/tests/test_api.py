import os
import tempfile
import unittest
from pathlib import Path

_tmpdir = tempfile.TemporaryDirectory()
os.environ["PORTFOLIO_DB_PATH"] = str(Path(_tmpdir.name) / "portfolio-test.sqlite3")
os.environ["PORTFOLIO_ALLOWED_ORIGINS"] = "http://testserver"
os.environ["PORTFOLIO_REQUIRE_ORIGIN"] = "true"
os.environ["PORTFOLIO_ANALYTICS_RATE_LIMIT"] = "100"
os.environ["PORTFOLIO_CONTACT_RATE_LIMIT"] = "100"

from fastapi import HTTPException  # noqa: E402
from fastapi.testclient import TestClient  # noqa: E402

from app.main import app  # noqa: E402
from app.security import RateLimiter  # noqa: E402


class PortfolioApiTests(unittest.TestCase):
    def setUp(self) -> None:
        self.client = TestClient(app)
        self.headers = {"Origin": "http://testserver"}

    def test_healthcheck(self) -> None:
        health = self.client.get("/health")
        self.assertEqual(health.status_code, 200)
        self.assertEqual(health.json(), {"status": "ok"})

    def test_event_recording_and_summary(self) -> None:
        page_view = self.client.post(
            "/page-views",
            json={"session_id": "test-session", "path": "/", "user_agent": "test"},
            headers=self.headers,
        )
        self.assertEqual(page_view.status_code, 200)
        self.assertEqual(page_view.json()["path"], "/")

        island_click = self.client.post(
            "/island-clicks",
            json={
                "island_id": "about",
                "href": "/about",
                "session_id": "test-session",
                "path": "/",
                "user_agent": "test",
            },
            headers=self.headers,
        )
        self.assertEqual(island_click.status_code, 200)
        self.assertEqual(island_click.json()["island_id"], "about")

        summary = self.client.get("/metrics/summary")
        self.assertEqual(summary.status_code, 200)
        self.assertGreaterEqual(summary.json()["total_page_views"], 1)
        self.assertGreaterEqual(summary.json()["total_island_clicks"], 1)

    def test_public_write_endpoints_reject_untrusted_origin(self) -> None:
        response = self.client.post(
            "/page-views",
            json={"session_id": "test-session", "path": "/"},
            headers={"Origin": "https://example.invalid"},
        )

        self.assertEqual(response.status_code, 403)

        null_origin = self.client.post(
            "/page-views",
            json={"session_id": "test-session", "path": "/"},
            headers={"Origin": "null"},
        )

        self.assertEqual(null_origin.status_code, 403)

    def test_rate_limiter_rejects_after_limit(self) -> None:
        limiter = RateLimiter()

        limiter.check("127.0.0.1", "contact", limit=1, window_seconds=60)

        with self.assertRaises(HTTPException) as context:
            limiter.check("127.0.0.1", "contact", limit=1, window_seconds=60)

        self.assertEqual(context.exception.status_code, 429)

    def test_contact_accepts_valid_submission_and_rejects_honeypot(self) -> None:
        accepted = self.client.post(
            "/contact",
            json={
                "name": "Check",
                "email": "check@example.com",
                "company": "Example",
                "message": "hello",
                "website": "",
            },
            headers=self.headers,
        )
        self.assertEqual(accepted.status_code, 200)
        self.assertEqual(accepted.json()["status"], "accepted")

        trapped = self.client.post(
            "/contact",
            json={
                "name": "Bot",
                "email": "bot@example.com",
                "message": "spam",
                "website": "https://spam.example",
            },
            headers=self.headers,
        )
        self.assertEqual(trapped.status_code, 400)


if __name__ == "__main__":
    unittest.main()
