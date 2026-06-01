import { FloatingPromoBanner } from "@/components/ui/FloatingPromoBanner";

/** Fixed bottom-right promo on the Real Estate page — text only, no buttons. */
export function SellingHelpBanner() {
  return (
    <FloatingPromoBanner
      ariaLabel="Selling your home"
      headline="Are You Selling A House?"
      body="We Can Help You Prepare Your House For The Market"
    />
  );
}
