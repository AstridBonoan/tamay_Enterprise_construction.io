import { normalizeSitePath } from "./paths";
import { SITE } from "./site";

export const ESTIMATOR_PROMO = {
  headline: "Have a small home project in mind?",
  body: "Get a quick online estimate for small repairs, installations, assemblies, painting, and other everyday home projects.",
  ctaLabel: "Estimate My Small Project",
  dismissLabel: "Not now",
  href: SITE.estimateUrl,
} as const;

export const ESTIMATOR_ELIGIBLE_PATHS = [
  "/",
  "/construction",
  "/gallery",
  "/reviews",
  "/assembly-installation",
  "/home-preventive-services",
] as const;

/** Accumulated eligible-page time before first display. */
export const ESTIMATOR_THRESHOLD_MS = 70_000;
export const ESTIMATOR_DISMISS_DAYS = 7;
export const ESTIMATOR_ENGAGE_DAYS = 30;

export const ESTIMATOR_STORAGE_KEY = "tamay_estimator_promo";
export const ESTIMATOR_ACCUM_KEY = "tamay_estimator_eligible_ms";

export function isEstimatorEligiblePath(pathname: string): boolean {
  const normalized = normalizeSitePath(pathname);
  return (ESTIMATOR_ELIGIBLE_PATHS as readonly string[]).includes(normalized);
}

export type EstimatorPromoRecord = {
  status: "dismissed" | "engaged";
  until: number;
};
