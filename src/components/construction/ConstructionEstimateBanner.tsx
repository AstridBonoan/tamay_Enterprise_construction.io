import { FloatingPromoBanner } from "@/components/ui/FloatingPromoBanner";
import { ESTIMATE, SITE } from "@/lib/site";

/** Fixed bottom-right project estimator promo on the Construction page. */
export function ConstructionEstimateBanner() {
  return (
    <FloatingPromoBanner
      ariaLabel="Project cost estimator"
      headline={ESTIMATE.title}
      body={ESTIMATE.description}
      ctaLabel={ESTIMATE.ctaLabel}
      ctaHref={SITE.estimateUrl}
    />
  );
}
