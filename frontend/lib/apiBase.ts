const defaultBrowserApiBaseUrl = "http://127.0.0.1:8000";

export function getPublicApiBaseUrl() {
  return process.env.NEXT_PUBLIC_API_BASE_URL ?? defaultBrowserApiBaseUrl;
}

export function getServerApiBaseUrl() {
  return process.env.API_INTERNAL_BASE_URL ?? getPublicApiBaseUrl();
}
