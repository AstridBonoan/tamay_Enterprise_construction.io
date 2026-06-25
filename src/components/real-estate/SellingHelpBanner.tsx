import { FloatingPromoBanner } from "@/components/ui/FloatingPromoBanner";

/** Fixed bottom-right promo on the Real Estate page. */
export function SellingHelpBanner() {
  return (
    <FloatingPromoBanner
      floatId="real-estate-selling"
      collapsedLabel="Advisor"
      ariaLabel="Talk to a real estate advisor"
      headline="Talk To A Real Estate Advisor"
      body="Connect with our team about buying, selling, or investing in Connecticut real estate."
      ctaLabel="Talk To A Real Estate Advisor"
      ctaHref="#contact"
    />
  );
}
