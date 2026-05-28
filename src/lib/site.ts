export const SITE = {
  name: "Tamay Enterprises",
  legalName: "Tamay Enterprises Inc",
  tagline: "One Company. Three Powerful Divisions.",
  phone: "203-220-6678",
  phoneTel: "tel:2032206678",
  email: "info@tamayenterprises.com",
  address: "54 Graham Manor Road, West Haven, CT, USA",
  maps: {
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.5!2d-72.9526724!3d41.2621069!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e8775d7376cd55%3A0x8dd3577fdc927647!2sTamay%20Enterprises%20Inc!5e0!3m2!1sen!2sus!4v1716652800000!5m2!1sen!2sus",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=54+Graham+Manor+Road,+West+Haven,+CT+06516,+USA",
    placeUrl:
      "https://www.google.com/maps/place/Tamay+Enterprises+Inc/@41.2621069,-72.9526724,17z/data=!4m8!3m7!1s0x89e8775d7376cd55:0x8dd3577fdc927647!8m2!3d41.2621069!4d-72.9526724!16s%2Fg%2F11n92rd69n",
  },
  license: "NHC.0018326",
  whatsapp: "https://wa.me/12032206678",
  estimateUrl: "http://estimator.tamayenterprises.com",
  financingUrl: "https://your.acornfinance.com/apply?d=93753",
  hiringUrl: "/careers-partnerships",
  /** Cart empty state + bookings */
  headerCartUrl: "/online-appointments",
  social: {
    facebook: "https://www.facebook.com/Tamay.Constructions",
    instagram: "https://www.instagram.com/tamay.enterprises/",
    tiktok: "https://www.tiktok.com/@tamay.enterprises",
    youtube: "https://www.youtube.com/@Tamayenterprises1",
  },
} as const;

export const ESTIMATE = {
  title: "Need Help with a Small Home Project?",
  description:
    "TV mounting, faucet replacements, vanity installs, painting, drywall patches, lighting, and more — get a quick estimate for your project today.",
  ctaLabel: "Estimate My Project",
} as const;

export const HERO_VIDEO = {
  eyebrow: "Tamay Enterprises · West Haven, CT",
  headline: "Building Better Spaces, One Project at a Time",
  message:
    "Watch our team at work — delivering expert construction, renovation, and home improvement with care, precision, and results you can trust.",
} as const;

export const ABOUT = {
  headline: "CONSTRUCTION, REAL ESTATE & LOGISTICS Services in West Haven, CT",
  body: "Tamay Enterprises is a West Haven, CT–based multi-service company providing construction and home renovation services, real estate solutions, and local logistics support. We help homeowners, property owners, businesses, and investors simplify their needs by working with one trusted team across multiple service areas, serving West Haven and nearby Connecticut communities.",
} as const;

/** Top bar links (matches tamayenterprises.com) */
export const NAV_PRIMARY = [
  { href: "/", label: "HOME" },
  { href: "/construction", label: "CONSTRUCTION" },
  { href: "/real-estate", label: "REAL ESTATE" },
  { href: "/logistics", label: "LOGISTICS" },
  { href: "/home-preventive-services", label: "HOME PREVENTIVE SERVICES" },
] as const;

/** MORE dropdown — order matches live site */
export const NAV_MORE = [
  { href: "/reviews", label: "REVIEWS" },
  { href: "/gallery", label: "GALLERY" },
  { href: "/online-appointments", label: "ONLINE APPOINTMENTS" },
  { href: "/careers-partnerships", label: "CAREERS & PARTNERSHIPS" },
  { href: "/assembly-installation", label: "ASSSEMBLY & INSTALLATION" },
] as const;

export const NAV_LINKS = [...NAV_PRIMARY, ...NAV_MORE] as const;

/** Person icon dropdown (matches tamayenterprises.com) */
export const ACCOUNT_MENU_ITEMS = [
  { type: "link" as const, href: "/online-appointments", label: "SIGN IN" },
  { type: "link" as const, href: "/online-appointments", label: "CREATE ACCOUNT" },
  { type: "divider" as const },
  { type: "link" as const, href: "/online-appointments", label: "BOOKINGS" },
  { type: "link" as const, href: "/online-appointments", label: "MY ACCOUNT" },
] as const;

export const FOOTER_LINKS = [
  { href: "/home-preventive-services", label: "HOME PREVENTIVE SERVICES" },
  { href: "/online-appointments", label: "ONLINE APPOINTMENTS" },
  { href: "/careers-partnerships", label: "CAREERS & PARTNERSHIPS" },
  { href: "/assembly-installation", label: "ASSEMBLY & INSTALLATION" },
] as const;

export const SERVICE_AREAS = [
  "Orange",
  "Milford",
  "New Haven",
  "Woodbridge",
  "Bethany",
  "Fairfield",
  "Trumbull",
  "Hamden",
  "East Haven",
  "Branford",
  "Shelton",
  "Stratford",
] as const;
