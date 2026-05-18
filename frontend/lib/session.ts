"use client";

export function getPortfolioSessionId() {
  const key = "portfolio_session_id";
  const existing = window.localStorage.getItem(key);

  if (existing) {
    return existing;
  }

  const created = crypto.randomUUID();
  window.localStorage.setItem(key, created);
  return created;
}
