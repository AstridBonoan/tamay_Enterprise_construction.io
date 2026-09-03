import { OpenLiveChatButton } from "@/components/layout/OpenLiveChatButton";
import { SitePhoto } from "@/components/images/SitePhoto";
import { SITE } from "@/lib/site";

const MORE_WAY_CATEGORIES = [
  {
    title: "Exterior Upgrades",
    body: "Siding, trim, and finishes that boost curb appeal and protect for years to come.",
    icon: ExteriorIcon,
  },
  {
    title: "Windows & Doors",
    body: "Energy-efficient windows and quality doors for comfort, security, and style.",
    icon: WindowIcon,
  },
  {
    title: "Decks & Outdoor Living",
    body: "Custom decks and outdoor spaces designed for relaxation and everyday living.",
    icon: DeckIcon,
  },
  {
    title: "Painting & Finishes",
    body: "Interior and exterior painting with meticulous prep and a polished finish.",
    icon: PaintIcon,
  },
  {
    title: "Repairs & Maintenance",
    body: "Reliable repairs and preventive work that help keep your home in top shape.",
    icon: RepairIcon,
  },
] as const;

const ESTIMATOR_FEATURES = [
  {
    title: "Furniture Assembly",
    body: "Tables, beds, chairs, cabinets & more.",
    icon: FurnitureIcon,
  },
  {
    title: "Shelving & Storage",
    body: "Bookcases, shelving units & organizers.",
    icon: ShelvingIcon,
  },
  {
    title: "Fixtures & Mounting",
    body: "TV mounting, mirrors, curtains & more.",
    icon: MountingIcon,
  },
] as const;

const POPULAR_PROJECTS = [
  "Beds & Dressers",
  "Desks & Office Furniture",
  "TV Mounting",
  "Shelving Units",
  "Storage Solutions",
  "Mirrors & Fixtures",
] as const;

const primaryCtaClass =
  "inline-flex items-center justify-center min-h-10 font-semibold text-xs sm:text-sm tracking-wide px-5 py-2.5 transition-colors text-center bg-tamay-accent hover:bg-tamay-accent-hover text-white";

const outlineCtaClass =
  "inline-flex items-center justify-center min-h-10 font-semibold text-xs sm:text-sm tracking-wide px-5 py-2.5 transition-colors text-center border-2 border-tamay-primary text-tamay-primary hover:bg-tamay-primary hover:text-white";

function ExteriorIcon() {
  return (
    <svg className="h-5 w-5 text-tamay-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 20V10l8-6 8 6v10M9 20v-6h6v6" />
    </svg>
  );
}

function WindowIcon() {
  return (
    <svg className="h-5 w-5 text-tamay-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 4h14v16H5V4zm7 0v16M5 12h14" />
    </svg>
  );
}

function DeckIcon() {
  return (
    <svg className="h-5 w-5 text-tamay-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 14h16M6 14v6M18 14v6M8 10h8M4 18h16" />
    </svg>
  );
}

function PaintIcon() {
  return (
    <svg className="h-5 w-5 text-tamay-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 4h10l4 4v4H9L5 8V4zm4 8v3a3 3 0 1 1-6 0v-1" />
    </svg>
  );
}

function RepairIcon() {
  return (
    <svg className="h-5 w-5 text-tamay-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 7a4 4 0 0 0 5.7 5.7L12 20.4 3.6 12 11.3 4.3A4 4 0 0 0 14 7z" />
    </svg>
  );
}

function FurnitureIcon() {
  return (
    <svg className="h-5 w-5 text-tamay-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 10h16v4H4v-4zm2 4v6m12-6v6M7 10V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3" />
    </svg>
  );
}

function ShelvingIcon() {
  return (
    <svg className="h-5 w-5 text-tamay-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 4h14v16H5V4zm0 5h14M5 14h14" />
    </svg>
  );
}

function MountingIcon() {
  return (
    <svg className="h-5 w-5 text-tamay-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7h16v9H4V7zm6 12h4M12 16v3" />
    </svg>
  );
}

function SplitPhoto({
  slot,
  alt,
  objectPosition,
  className = "",
  sizes = "(max-width: 1024px) 100vw, 58vw",
  edge = "soft",
}: {
  slot: string;
  alt: string;
  objectPosition: string;
  className?: string;
  sizes?: string;
  /** Mockup edge language: sweeping curve where image meets copy */
  edge?: "soft" | "moreWays" | "estimator";
}) {
  const edgeClass =
    edge === "moreWays"
      ? "rounded-tl-[4.5rem] sm:rounded-tl-[6.5rem] lg:rounded-tl-[8.5rem] rounded-br-[1.5rem] sm:rounded-br-[2rem] rounded-tr-none rounded-bl-none"
      : edge === "estimator"
        ? "rounded-tr-[4.5rem] sm:rounded-tr-[6.5rem] lg:rounded-tr-[8.5rem] rounded-bl-[1.5rem] sm:rounded-bl-[2rem] rounded-tl-none rounded-br-none"
        : "rounded-xl sm:rounded-2xl";

  return (
    <figure className={`relative w-full h-full min-h-0 ${className}`}>
      <div
        className={`relative w-full overflow-hidden shadow-sm ring-1 ring-black/5 aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[400px] ${edgeClass}`}
      >
        <SitePhoto slot={slot} alt={alt} className={`object-cover ${objectPosition}`} sizes={sizes} />
      </div>
    </figure>
  );
}

function ServiceList({ className = "" }: { className?: string }) {
  return (
    <ul id="more-ways-categories" className={`divide-y divide-gray-200/80 border-y border-gray-200/80 scroll-mt-24 ${className}`}>
      {MORE_WAY_CATEGORIES.map((item) => {
        const Icon = item.icon;
        return (
          <li key={item.title} className="flex items-start gap-2.5 py-2.5 sm:py-3">
            <Icon />
            <span className="min-w-0">
              <span className="block font-heading text-tamay-primary text-sm font-semibold leading-snug">{item.title}</span>
              <span className="mt-0.5 block text-[12px] sm:text-[13px] text-gray-600 leading-snug">{item.body}</span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * Combined “More Ways We Improve Homes” + Assemblies/Installations estimator area.
 * Desktop More Ways: content left / house image center / services right.
 */
export function MoreWaysImproveHomesSection() {
  return (
    <section id="construction-services" className="bg-[#faf8f5] border-b border-gray-200/60 scroll-mt-24">
      {/* More Ways — desktop 3-zone; mobile stacked */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 md:pt-14 lg:pt-16 pb-6 md:pb-7 lg:pb-8">
        {/* Desktop: left content | center image | right services */}
        <div className="hidden lg:grid lg:grid-cols-[minmax(0,0.24fr)_minmax(0,0.52fr)_minmax(0,0.24fr)] lg:gap-5 xl:gap-6 lg:items-stretch">
          <div className="min-w-0 flex flex-col justify-center">
            <p className="text-tamay-accent font-heading font-bold tracking-[0.16em] uppercase text-[11px] sm:text-xs">
              Tamay Enterprises Construction
            </p>
            <div className="mt-2 h-px w-10 bg-tamay-accent/70" aria-hidden />
            <h2 className="mt-3 font-heading text-[1.65rem] xl:text-[1.9rem] text-tamay-primary font-semibold leading-[1.12] text-balance">
              More Ways We Improve Homes
            </h2>
            <p className="mt-3 text-gray-600 text-sm leading-snug">
              Thoughtful improvements that elevate comfort, enhance durability, and bring lasting beauty to every part of
              your home.
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <a href="#more-ways-categories" className={`${primaryCtaClass} w-full`}>
                Explore Our Services
              </a>
              <OpenLiveChatButton className={`${outlineCtaClass} w-full`}>Talk to Our Team</OpenLiveChatButton>
            </div>
          </div>

          <SplitPhoto
            edge="moreWays"
            slot="construction.approvedMoreWays"
            alt="Premium home exterior upgrades including siding, trim, windows, doors, and outdoor living details"
            objectPosition="object-[42%_58%]"
            sizes="(max-width: 1024px) 100vw, 52vw"
          />

          <div className="min-w-0 flex flex-col justify-center">
            <ServiceList />
          </div>
        </div>

        {/* Mobile / tablet stack */}
        <div className="lg:hidden">
          <p className="text-tamay-accent font-heading font-bold tracking-[0.16em] uppercase text-[11px] sm:text-xs">
            Tamay Enterprises Construction
          </p>
          <div className="mt-2 h-px w-10 bg-tamay-accent/70" aria-hidden />
          <h2 className="mt-3 font-heading text-[1.65rem] sm:text-[1.85rem] text-tamay-primary font-semibold leading-[1.12] text-balance">
            More Ways We Improve Homes
          </h2>
          <p className="mt-3 text-gray-600 text-sm leading-snug max-w-md">
            Thoughtful improvements that elevate comfort, enhance durability, and bring lasting beauty to every part of
            your home.
          </p>

          <SplitPhoto
            edge="moreWays"
            className="mt-5"
            slot="construction.approvedMoreWays"
            alt="Premium home exterior upgrades including siding, trim, windows, doors, and outdoor living details"
            objectPosition="object-[42%_58%]"
          />

          <ServiceList className="mt-6" />

          <div className="mt-5 flex flex-col sm:flex-row gap-2 sm:gap-2.5">
            <a href="#more-ways-categories" className={`${primaryCtaClass} w-full sm:w-auto`}>
              Explore Our Services
            </a>
            <OpenLiveChatButton className={`${outlineCtaClass} w-full sm:w-auto`}>Talk to Our Team</OpenLiveChatButton>
          </div>
        </div>
      </div>

      {/* Estimator — image left / copy right for alternating rhythm */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-7 md:pt-8 lg:pt-9">
          <div className="lg:grid lg:grid-cols-[minmax(0,0.58fr)_minmax(0,0.42fr)] lg:gap-8 xl:gap-10 lg:items-stretch">
            <SplitPhoto
              edge="estimator"
              className="order-2 lg:order-1 mt-6 lg:mt-0"
              slot="construction.approvedEstimator"
              alt="Tamay Enterprises technician assembling furniture for a small home installation project"
              objectPosition="object-[40%_48%]"
            />

            <div className="order-1 lg:order-2 min-w-0 flex flex-col justify-center">
              <p className="text-tamay-accent font-heading font-bold tracking-[0.16em] uppercase text-[11px] sm:text-xs">
                Tamay Enterprises
              </p>
              <div className="mt-2 h-px w-10 bg-tamay-accent/70" aria-hidden />
              <h2 className="mt-3 font-heading text-[1.65rem] sm:text-[1.85rem] lg:text-[1.95rem] xl:text-[2.15rem] text-tamay-primary font-semibold leading-[1.12] text-balance">
                Project Cost Estimator
              </h2>
              <p className="mt-1.5 font-heading text-tamay-accent text-sm sm:text-base italic">
                For Assemblies &amp; Installations
              </p>
              <p className="mt-3 text-gray-600 text-sm leading-snug max-w-md">
                Get an instant estimate for assemblies and installations completed with precision and care.
              </p>

              <ul className="mt-5 space-y-3">
                {ESTIMATOR_FEATURES.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.title} className="flex items-start gap-3">
                      <Icon />
                      <span>
                        <span className="block font-heading text-tamay-primary text-sm font-semibold">{item.title}</span>
                        <span className="block text-[13px] text-gray-600 leading-snug">{item.body}</span>
                      </span>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-5 flex flex-col sm:flex-row gap-2 sm:gap-2.5">
                <a
                  href={SITE.estimateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${primaryCtaClass} w-full sm:w-auto`}
                >
                  Get My Estimate
                </a>
                <OpenLiveChatButton className={`${outlineCtaClass} w-full sm:w-auto`}>Talk to Our Team</OpenLiveChatButton>
              </div>
            </div>
          </div>
        </div>

        {/* Dark navy small-projects support row */}
        <div className="mt-8 md:mt-10 bg-[#141c2b] text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-7">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0">
              <div className="md:pr-6">
                <p className="font-heading text-tamay-accent text-sm font-semibold tracking-wide uppercase">
                  Small Projects. Big Difference.
                </p>
                <p className="mt-2 text-[13px] text-white/80 leading-snug">
                  Professional assemblies and installations that save you time and stress.
                </p>
              </div>
              <div className="md:px-6 md:border-x md:border-white/15">
                <p className="font-heading text-tamay-accent text-sm font-semibold tracking-wide uppercase">
                  Popular Projects
                </p>
                <ul className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1.5 text-[13px] text-white/90">
                  {POPULAR_PROJECTS.map((project) => (
                    <li key={project} className="flex items-start gap-1.5">
                      <svg
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-tamay-accent"
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden
                      >
                        <path
                          d="M3.5 8.2 6.4 11l6.1-6.5"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {project}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:pl-6">
                <p className="font-heading text-tamay-accent text-sm font-semibold tracking-wide uppercase">
                  Built Better. Built to Last.
                </p>
                <p className="mt-2 text-[13px] text-white/80 leading-snug">
                  Expert workmanship and attention to every detail.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
