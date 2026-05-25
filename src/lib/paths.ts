/** True when the current route is the homepage (works with GitHub Pages basePath). */
export function isHomePath(pathname: string): boolean {
  const normalized = pathname.replace(/\/$/, "") || "/";
  if (normalized === "/" || normalized === "") return true;
  const base = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
  if (base && normalized === base) return true;
  return false;
}
