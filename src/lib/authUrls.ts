/**
 * Canonical site URL for Supabase auth redirects (email confirm, password reset).
 * Must match URLs allowlisted in Supabase → Authentication → URL Configuration.
 */
export function getAuthSiteUrl(): string {
  const trim = (url: string) => url.replace(/\/$/, "");

  if (typeof window !== "undefined") {
    const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
    return trim(`${window.location.origin}${base}`);
  }

  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  if (fromEnv) return trim(fromEnv);

  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (base) return trim(`https://astridbonoan.github.io${base}`);

  return "";
}

export function getAuthConfirmUrl(): string {
  const site = getAuthSiteUrl();
  return site ? `${site}/m/auth/confirm/` : "/m/auth/confirm/";
}

export function getAuthLoginUrl(): string {
  const site = getAuthSiteUrl();
  return site ? `${site}/m/login/` : "/m/login/";
}
