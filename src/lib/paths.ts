function ensureTrailingSlash(pathPart: string): string {
  const queryIndex = pathPart.indexOf("?");
  if (queryIndex >= 0) {
    return `${ensureTrailingSlash(pathPart.slice(0, queryIndex))}${pathPart.slice(queryIndex)}`;
  }

  if (pathPart === "" || pathPart === "/") return pathPart || "/";
  if (/\.[a-zA-Z0-9]+$/.test(pathPart)) return pathPart;
  if (pathPart.endsWith("/")) return pathPart;
  return `${pathPart}/`;
}

/** Normalize internal routes (trailing slash for static-friendly URLs). */
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

  const hashIndex = path.indexOf("#");
  const pathWithoutHash = hashIndex >= 0 ? path.slice(0, hashIndex) : path;
  const hash = hashIndex >= 0 ? path.slice(hashIndex) : "";

  const queryIndex = pathWithoutHash.indexOf("?");
  const pathname = queryIndex >= 0 ? pathWithoutHash.slice(0, queryIndex) : pathWithoutHash;
  const search = queryIndex >= 0 ? pathWithoutHash.slice(queryIndex) : "";

  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${ensureTrailingSlash(normalized)}${search}${hash}`;
}

/** Full-page navigation (e.g. after auth redirect). */
export function navigateToSitePath(path: string): void {
  if (typeof window === "undefined") return;
  window.location.assign(sitePath(path));
}

/** Site origin for auth redirects and canonical URLs. */
export function getSiteOrigin(): string {
  const trim = (url: string) => url.replace(/\/$/, "");

  if (typeof window !== "undefined") {
    return trim(window.location.origin);
  }

  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  if (fromEnv) return trim(fromEnv);

  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) return trim(`https://${vercelUrl}`);

  return "";
}

/** True when the current route is the homepage. */
export function isHomePath(pathname: string): boolean {
  return normalizeSitePath(pathname) === "/";
}

/** Strip trailing slashes for route matching. */
export function normalizeSitePath(pathname: string): string {
  return pathname.replace(/\/$/, "") || "/";
}
