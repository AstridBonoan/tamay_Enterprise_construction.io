import { FloatingPromoBanner } from "@/components/ui/FloatingPromoBanner";
import { assetUrl } from "@/lib/assetUrl";
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
        src: assetUrl("/images/construction/estimate-float-banner.png"),
        alt: "Construction planning with blueprints, calculator, and hard hat",
      }}
    />
  );
}
