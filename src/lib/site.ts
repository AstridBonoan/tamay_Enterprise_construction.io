export const SITE = {
  name: "Tamay Enterprises",
  legalName: "Tamay Enterprises Inc",
  tagline: "One Company. Three Powerful Divisions.",
  phone: "203-220-6678",
  phoneTel: "tel:2032206678",
  email: "info@tamayenterprises.com",
  address: "54 Graham Manor Road, West Haven, CT, USA",
  license: "NHC.0018326",
  whatsapp: "https://wa.me/12032206678",
  estimateUrl: "http://estimator.tamayenterprises.com",
  financingUrl: "https://your.acornfinance.com/apply?d=93753",
  hiringUrl: "/careers-partnerships",
  social: {
    facebook: "https://www.facebook.com/Tamay.Constructions",
    instagram: "https://www.instagram.com/tamay.enterprises/",
    tiktok: "https://www.tiktok.com/@tamayconstruction1",
    youtube: "https://www.youtube.com/@tamayconstructions8766",
  },
} as const;

export const HERO_VIDEO = {
  eyebrow: "Tamay Enterprises · West Haven, CT",
  headline: "Building Better Spaces, One Project at a Time",
  message:
    "Watch our team at work — delivering expert construction, renovation, and home improvement with care, precision, and results you can trust.",
  cta: { label: "Explore Our Services", href: "#our-services" },
} as const;

export const ABOUT = {
  headline: "CONSTRUCTION, REAL ESTATE & LOGISTICS Services in West Haven, CT",
  body: "Tamay Enterprises is a West Haven, CT–based multi-service company providing construction and home renovation services, real estate solutions, and local logistics support. We help homeowners, property owners, businesses, and investors simplify their needs by working with one trusted team across multiple service areas, serving West Haven and nearby Connecticut communities.",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "HOME" },
  { href: "/construction", label: "CONSTRUCTION" },
  { href: "/real-estate", label: "REAL ESTATE" },
  { href: "/logistics", label: "LOGISTICS" },
  { href: "/home-preventive-services", label: "HOME PREVENTIVE SERVICES" },
  { href: "/reviews", label: "REVIEWS" },
  { href: "/gallery", label: "GALLERY" },
  { href: "/online-appointments", label: "ONLINE APPOINTMENTS" },
  { href: "/careers-partnerships", label: "CAREERS & PARTNERSHIPS" },
  { href: "/assembly-installation", label: "ASSSEMBLY & INSTALLATION" },
] as const;

export const FOOTER_LINKS = [
  { href: "/home-preventive-services", label: "HOME PREVENTIVE SERVICES" },
  { href: "/online-appointments", label: "ONLINE APPOINTMENTS" },
  { href: "/careers-partnerships", label: "CAREERS & PARTNERSHIPS" },
  { href: "/assembly-installation", label: "ASSSEMBLY & INSTALLATION" },
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
