export const AUTH_STORAGE_KEY = "tamay_auth_user";

export type AuthUser = {
  email: string;
  signedInAt: number;
  provider?: "email" | "google";
  name?: string;
  picture?: string;
};

export function getAuthUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return !!getAuthUser();
}

export function signIn(email: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify({
      email,
      provider: "email",
      signedInAt: Date.now(),
    } satisfies AuthUser),
  );
}

export function signInWithGoogle(profile: {
  email: string;
  name?: string;
  picture?: string;
}): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify({
      email: profile.email,
      name: profile.name,
      picture: profile.picture,
      provider: "google",
      signedInAt: Date.now(),
    } satisfies AuthUser),
  );
}

export function signOut(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
}
