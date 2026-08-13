import { appointmentScheduleHref } from "./onlineAppointments";
import { normalizeSitePath, sitePath } from "./paths";
import { SITE } from "./site";

export type ContactFloatConfig = {
  floatId: string;
  collapsedLabel: string;
  headline: string;
  body: string;
  ariaLabel: string;
  ctaLabel: string;
  ctaHref: string;
  ctaExternal?: boolean;
};

const PAGE_CONTACT_FLOATS: Record<string, ContactFloatConfig> = {
  "/": {
    floatId: "home-contact",
    collapsedLabel: "Book",
    ariaLabel: "Schedule an online appointment",
    headline: "Ready to Get Started?",
    body: "Choose the department you need and book a free consultation online.",
    ctaLabel: "Online Appointments",
    ctaHref: sitePath("/online-appointments"),
  },
  "/construction": {
    floatId: "construction-consult",
    collapsedLabel: "Consult",
    ariaLabel: "Schedule a construction consultation",
    headline: "Talk With a Project Advisor",
    body: "Book a free construction consultation to discuss renovations, remodeling, or additions.",
    ctaLabel: "Schedule Now",
    ctaHref: appointmentScheduleHref("construction"),
  },
  "/gallery": {
    floatId: "gallery-consult",
    collapsedLabel: "Consult",
    ariaLabel: "Schedule a project consultation",
    headline: "See Something You Love?",
    body: "Schedule a project consultation and we will help you plan the next step.",
    ctaLabel: "Schedule a Project Consultation",
    ctaHref: sitePath("/online-appointments"),
  },
  "/reviews": {
    floatId: "reviews-write",
    collapsedLabel: "Review",
    ariaLabel: "Leave a review",
    headline: "Leave Us a Review",
    body: "Share your experience with Tamay Enterprises — it only takes a minute.",
    ctaLabel: "Leave Us a Review",
    ctaHref: "#write-review",
  },
  "/finance": {
    floatId: "finance-contact",
    collapsedLabel: "Finance",
    ariaLabel: "Check financing options",
    headline: "Financing Feel Complicated?",
    body: "Apply through our secure financing partner to see what plans may be available for your project.",
    ctaLabel: "Check Financing Options",
    ctaHref: SITE.financingUrl,
    ctaExternal: true,
  },
  "/logistics": {
    floatId: "logistics-contact",
    collapsedLabel: "Dispatch",
    ariaLabel: "Schedule a logistics consultation",
    headline: "Talk To A Dispatcher",
    body: "Need a delivery coordinated or a quote fast? Schedule a logistics consultation and our dispatch team will follow up.",
    ctaLabel: "Schedule Now",
    ctaHref: appointmentScheduleHref("logistics"),
  },
  "/assembly-installation": {
    floatId: "assembly-contact",
    collapsedLabel: "Install",
    ariaLabel: "Schedule assembly and installation",
    headline: "Something Need Assembling?",
    body: "Book a professional install — pick a time that works for you.",
    ctaLabel: "Schedule Now",
    ctaHref: appointmentScheduleHref("assembly-installation"),
  },
  "/home-preventive-services": {
    floatId: "preventive-contact",
    collapsedLabel: "Tune-Up",
    ariaLabel: "Schedule preventive services",
    headline: "Stay Ahead of Repairs",
    body: "Schedule preventive care for your home — pick a time that works for you.",
    ctaLabel: "Schedule Now",
    ctaHref: appointmentScheduleHref("prevention-services"),
  },
  "/careers-partnerships/apply": {
    floatId: "careers-apply-contact",
    collapsedLabel: "Help",
    ariaLabel: "Application help",
    headline: "Stuck on the Form?",
    body: "We are happy to help with your application — send us a message anytime.",
    ctaLabel: "Get Help",
    ctaHref: "/#contact",
  },
};

/** Pages with a dedicated right-side float (not driven by PAGE_CONTACT_FLOATS). */
export const PAGES_WITH_PROMO_FLOAT = ["/real-estate", "/careers-partnerships"] as const;

export function getContactFloatConfig(pathname: string): ContactFloatConfig | null {
  return PAGE_CONTACT_FLOATS[normalizeSitePath(pathname)] ?? null;
}

export function shouldShowContactFloat(pathname: string): boolean {
  const normalized = normalizeSitePath(pathname);
  if (normalized.startsWith("/m/")) return false;
  if (PAGES_WITH_PROMO_FLOAT.includes(normalized as (typeof PAGES_WITH_PROMO_FLOAT)[number])) {
    return false;
  }
  return getContactFloatConfig(normalized) !== null;
}
