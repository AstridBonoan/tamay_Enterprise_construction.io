import { DivisionCard } from "@/components/ui/DivisionCard";
import { IMAGES } from "@/lib/images";

const SERVICES = [
  {
    image: IMAGES.divisions.construction,
    eyebrow: "RELIABLE. EXPERIENCED. FULLY INSURED",
    title: "Construction & Home Renovation",
    tagline: "We Design, Supply, Build & Maintain",
    description:
      "High-quality home renovations, remodeling, and additions for homeowners in West Haven and surrounding Connecticut towns.",
    bullets: [
      "* Flexible Financing Options",
      "* 7-Year Warranty on eligible renovations",
      "* Complimentary Kitchen + Bathroom Tune-Up",
    ],
    discoverHref: "/construction",
    ctaLabel: "Talk to a Project Advisor",
    ctaHref: "/construction#contact",
    reverse: false,
  },
  {
    image: IMAGES.divisions.realEstate,
    eyebrow: "YOUR TRUSTED PARTNER IN REAL ESTATE",
    title: "Real Estate Services & Property Solutions",
    tagline: "Experience. Network. Results.",
    description:
      "Support for buyers, sellers, and property owners with practical guidance across West Haven and nearby Connecticut markets.",
    bullets: ["* Helping homeowners and investors buy, sell, and grow with confidence"],
    discoverHref: "/real-estate",
    ctaLabel: "Talk to a Real Estate Advisor",
    ctaHref: "/real-estate#contact",
    reverse: true,
  },
  {
    image: IMAGES.divisions.logistics,
    eyebrow: "DELIVERING MORE THAN MILES — WE DELIVER TRUST",
    title: "Local & Regional Logistics Services",
    tagline: "Proudly serving Connecticut and nearby regions",
    description:
      "Reliable local and regional delivery for businesses and individuals — efficient, communicative, and dependable.",
    bullets: ["* ProMaster vans and a hands-on team ready to serve you"],
    discoverHref: "/logistics",
    ctaLabel: "Talk to Dispatch",
    ctaHref: "/logistics#contact",
    reverse: false,
  },
] as const;

export function OurServicesSection() {
  return (
    <section
      id="our-services"
      className="bg-gray-50 h-[100svh] min-h-[640px] max-h-[100svh] flex flex-col overflow-hidden snap-start snap-always"
    >
      <header className="shrink-0 pt-4 pb-2 sm:pt-5 sm:pb-3 px-4">
        <h2 className="font-heading text-center text-xl sm:text-2xl md:text-3xl text-tamay-primary font-semibold uppercase tracking-wide">
          Our Services
        </h2>
      </header>

      <div className="flex-1 min-h-0 flex flex-col divide-y divide-gray-200/80 overflow-y-auto overscroll-contain md:overflow-hidden">
        {SERVICES.map((service) => (
          <DivisionCard key={service.title} viewport {...service} />
        ))}
      </div>
    </section>
  );
}
