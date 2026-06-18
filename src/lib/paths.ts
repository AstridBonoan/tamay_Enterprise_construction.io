const basePath = () => (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

/** Prefix internal routes for GitHub Pages subpath deployment. */
export function sitePath(path: string): string {
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("tel:") ||
    path.startsWith("mailto:") ||
    path.startsWith("#")
  ) {
    return path;
  }

  const base = basePath();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (base && (normalized === base || normalized.startsWith(`${base}/`))) {
    return normalized;
  }
  return `${base}${normalized}`;
}

/** True when the current route is the homepage (works with GitHub Pages basePath). */
export function isHomePath(pathname: string): boolean {
  const normalized = normalizeSitePath(pathname);
  return normalized === "/";
}

/** Strip trailing slashes and GitHub Pages base path for route matching. */
export function normalizeSitePath(pathname: string): string {
  let path = pathname.replace(/\/$/, "") || "/";
  const base = basePath();
  if (base && (path === base || path.startsWith(`${base}/`))) {
    path = path.slice(base.length) || "/";
  }
  return path;
}
