import { FloatingPromoBanner } from "@/components/ui/FloatingPromoBanner";

/** Fixed bottom-right promo on the Real Estate page. */
export function SellingHelpBanner() {
  return (
    <FloatingPromoBanner
      floatId="real-estate-selling"
      collapsedLabel="Next Move"
      ariaLabel="Plan your next real estate move"
      headline="What's Your Next Move?"
      body="Connect with our team about buying, selling, or investing in Connecticut real estate."
      ctaLabel="Start The Conversation"
      ctaHref="#contact"
    />
  );
}
