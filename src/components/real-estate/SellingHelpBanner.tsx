import { FloatingPromoBanner } from "@/components/ui/FloatingPromoBanner";
import { appointmentScheduleHref } from "@/lib/onlineAppointments";

/** Fixed bottom-right promo on the Real Estate page. */
export function SellingHelpBanner() {
  return (
    <FloatingPromoBanner
      floatId="real-estate-selling"
      collapsedLabel="Want A Consultation?"
      ariaLabel="Book a real estate consultation"
      headline="Book a Real Estate Consultation"
      body="Schedule a free one-hour session with our team to discuss buying, selling, or investing in Connecticut real estate."
      ctaLabel="Schedule Now"
      ctaHref={appointmentScheduleHref("real-estate")}
    />
  );
}
