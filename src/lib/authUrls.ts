import { getSiteOrigin } from "./paths";

/**
 * Canonical site URL for Supabase auth redirects (email confirm, password reset).
 * Must match URLs allowlisted in Supabase → Authentication → URL Configuration.
 */
export function getAuthSiteUrl(): string {
  return getSiteOrigin();
}

export function getAuthConfirmUrl(): string {
  const site = getAuthSiteUrl();
  return site ? `${site}/m/auth/confirm/` : "/m/auth/confirm/";
}

export function getAuthLoginUrl(): string {
  const site = getAuthSiteUrl();
  return site ? `${site}/m/login/` : "/m/login/";
}
