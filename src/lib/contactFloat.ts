import { normalizeSitePath } from "./paths";

export type ContactFloatConfig = {
  floatId: string;
  collapsedLabel: string;
  headline: string;
  body: string;
  ariaLabel: string;
  ctaLabel: string;
  ctaHref: string;
};

const PAGE_CONTACT_FLOATS: Record<string, ContactFloatConfig> = {
  "/": {
    floatId: "home-contact",
    collapsedLabel: "Contact",
    ariaLabel: "Contact us",
    headline: "Ready to Start Something Great?",
    body: "Skip the scroll — jump straight to our contact form and tell us what you need.",
    ctaLabel: "Contact Us",
    ctaHref: "#contact",
  },
  "/gallery": {
    floatId: "gallery-contact",
    collapsedLabel: "Project?",
    ariaLabel: "Contact us about a project",
    headline: "See Something You Love?",
    body: "Let's talk about bringing that same quality to your space — reach out below.",
    ctaLabel: "Start a Conversation",
    ctaHref: "#contact",
  },
  "/reviews": {
    floatId: "reviews-contact",
    collapsedLabel: "Reach Out",
    ariaLabel: "Contact Tamay Enterprises",
    headline: "Convinced Yet?",
    body: "We would love to earn your review next — get in touch and tell us about your project.",
    ctaLabel: "Get in Touch",
    ctaHref: "/#contact",
  },
  "/finance": {
    floatId: "finance-contact",
    collapsedLabel: "Questions?",
    ariaLabel: "Financing questions",
    headline: "Financing Feel Complicated?",
    body: "Our team can help you understand your options — contact us with any questions.",
    ctaLabel: "Ask Us Anything",
    ctaHref: "/#contact",
  },
  "/logistics": {
    floatId: "logistics-contact",
    collapsedLabel: "Dispatch",
    ariaLabel: "Talk to a dispatcher",
    headline: "Talk To A Dispatcher",
    body: "Need a delivery coordinated or a quote fast? Jump to our contact form and our dispatch team will follow up.",
    ctaLabel: "Contact Us",
    ctaHref: "#contact",
  },
  "/assembly-installation": {
    floatId: "assembly-contact",
    collapsedLabel: "Install",
    ariaLabel: "Assembly and installation contact",
    headline: "Something Need Assembling?",
    body: "Book a professional install — head to our contact form and share the details.",
    ctaLabel: "Book Service",
    ctaHref: "#contact",
  },
  "/home-preventive-services": {
    floatId: "preventive-contact",
    collapsedLabel: "Tune-Up",
    ariaLabel: "Preventive services contact",
    headline: "Stay Ahead of Repairs",
    body: "Schedule preventive care for your home — contact us at the bottom of this page.",
    ctaLabel: "Schedule Now",
    ctaHref: "#contact",
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

/** Paths that already show a dedicated bottom-right promo float. */
export const PAGES_WITH_PROMO_FLOAT = ["/construction", "/real-estate", "/careers-partnerships"] as const;

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
