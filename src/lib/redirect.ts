const DEFAULT_REDIRECT = "/";

export function createRedirectUrl(basePath: string, redirectTo?: string | null): string {
  if (!redirectTo) return basePath;

  const safeRedirect = getRedirectPath(redirectTo);
  const params = new URLSearchParams({
    redirect: safeRedirect,
  });

  return `${basePath}?${params.toString()}`;
}

export function getRedirectPath(redirectTo: string | null | undefined): string {
  if (!redirectTo || !redirectTo.startsWith("/") || redirectTo.startsWith("//") || redirectTo.includes("\\")) {
    return DEFAULT_REDIRECT;
  }

  try {
    const url = new URL(redirectTo, "https://app.invalid");

    if (url.origin !== "https://app.invalid") {
      return DEFAULT_REDIRECT;
    }

    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return DEFAULT_REDIRECT;
  }
}
