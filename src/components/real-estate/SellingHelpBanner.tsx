import { FloatingPromoBanner } from "@/components/ui/FloatingPromoBanner";
import { appointmentScheduleHref } from "@/lib/onlineAppointments";

/** Compact right-side booking CTA on the Real Estate page. */
export function SellingHelpBanner() {
  return (
    <FloatingPromoBanner
      collapsedLabel="Book Consultation"
      ariaLabel="Book a real estate consultation"
      ctaHref={appointmentScheduleHref("real-estate")}
    />
  );
}
