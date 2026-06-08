import { FloatingPromoBanner } from "@/components/ui/FloatingPromoBanner";
import { IMAGES } from "@/lib/images";
import { ESTIMATE, SITE } from "@/lib/site";

/** Fixed bottom-right project estimator promo on the Construction page. */
export function ConstructionEstimateBanner() {
  return (
    <FloatingPromoBanner
      floatId="construction-estimate"
      collapsedLabel="Estimate"
      ariaLabel="Project cost estimator"
      headline={ESTIMATE.title}
      body={ESTIMATE.description}
      ctaLabel={ESTIMATE.ctaLabel}
      ctaHref={SITE.estimateUrl}
      bannerImage={{
        src: IMAGES.construction.estimateFloatBanner,
        alt: "Construction and home renovation services",
      }}
    />
  );
}
