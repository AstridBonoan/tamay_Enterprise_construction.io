export const AUTH_STORAGE_KEY = "tamay_auth_user";

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return !!window.localStorage.getItem(AUTH_STORAGE_KEY);
}

export function signIn(email: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify({
      email,
      signedInAt: Date.now(),
    }),
  );
}

export function signOut(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
}

