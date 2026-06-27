const KNOWN_APP_ROOTS = new Set([
  "assembly-installation",
  "careers-partnerships",
  "construction",
  "gallery",
  "home-preventive-services",
  "logistics",
  "m",
  "online-appointments",
  "real-estate",
  "reviews",
]);

function resolveBasePath(): string {
  const fromEnv = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
  if (fromEnv) return fromEnv;

  if (typeof window === "undefined") return "";

  const segment = window.location.pathname.split("/").filter(Boolean)[0];
  if (segment && !KNOWN_APP_ROOTS.has(segment)) {
    return `/${segment}`;
  }

  return "";
}

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

  const hashIndex = path.indexOf("#");
  const pathWithoutHash = hashIndex >= 0 ? path.slice(0, hashIndex) : path;
  const hash = hashIndex >= 0 ? path.slice(hashIndex) : "";

  const queryIndex = pathWithoutHash.indexOf("?");
  const pathname = queryIndex >= 0 ? pathWithoutHash.slice(0, queryIndex) : pathWithoutHash;
  const search = queryIndex >= 0 ? pathWithoutHash.slice(queryIndex) : "";

  const base = resolveBasePath();
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  let result: string;
  if (base && (normalized === base || normalized.startsWith(`${base}/`))) {
    result = normalized;
  } else {
    result = `${base}${normalized}`;
  }

  return `${ensureTrailingSlash(result)}${search}${hash}`;
}

/** True when the current route is the homepage (works with GitHub Pages basePath). */
export function isHomePath(pathname: string): boolean {
  const normalized = normalizeSitePath(pathname);
  return normalized === "/";
}

/** Strip trailing slashes and GitHub Pages base path for route matching. */
export function normalizeSitePath(pathname: string): string {
  let path = pathname.replace(/\/$/, "") || "/";
  const base = resolveBasePath();
  if (base && (path === base || path.startsWith(`${base}/`))) {
    path = path.slice(base.length) || "/";
  }
  return path;
}
