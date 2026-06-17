/** True when the current route is the homepage (works with GitHub Pages basePath). */
export function isHomePath(pathname: string): boolean {
  const normalized = normalizeSitePath(pathname);
  return normalized === "/";
}

/** Strip trailing slashes and GitHub Pages base path for route matching. */
export function normalizeSitePath(pathname: string): string {
  let path = pathname.replace(/\/$/, "") || "/";
  const base = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
  if (base && (path === base || path.startsWith(`${base}/`))) {
    path = path.slice(base.length) || "/";
  }
  return path;
}
