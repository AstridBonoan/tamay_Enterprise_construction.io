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
}: {
  slot: string;
  alt: string;
  objectPosition: string;
  className?: string;
}) {
  return (
    <figure className={`relative w-full h-full min-h-0 ${className}`}>
      <div className="relative w-full overflow-hidden rounded-xl sm:rounded-2xl shadow-sm ring-1 ring-black/5 aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[360px]">
        <SitePhoto slot={slot} alt={alt} className={`object-cover ${objectPosition}`} sizes="(max-width: 1024px) 100vw, 58vw" />
      </div>
    </figure>
  );
}

/**
 * Combined “More Ways We Improve Homes” + Assemblies/Installations estimator area.
 * Replaces the leftover Core Services / More Ways graphic block.
 */
export function MoreWaysImproveHomesSection() {
  return (
    <section id="construction-services" className="bg-[#faf8f5] border-b border-gray-200/60 scroll-mt-24">
      {/* More Ways — text left / image right */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 md:pt-14 lg:pt-16">
        <div className="lg:grid lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:gap-8 xl:gap-10 lg:items-stretch">
          <div className="min-w-0 flex flex-col justify-center lg:pr-2">
            <p className="text-tamay-accent font-heading font-bold tracking-[0.16em] uppercase text-[11px] sm:text-xs">
              Tamay Enterprises Construction
            </p>
            <div className="mt-2 h-px w-10 bg-tamay-accent/70" aria-hidden />
            <h2 className="mt-3 font-heading text-[1.65rem] sm:text-[1.85rem] lg:text-[1.95rem] xl:text-[2.15rem] text-tamay-primary font-semibold leading-[1.12] text-balance">
              More Ways We Improve Homes
            </h2>
            <p className="mt-3 text-gray-600 text-sm leading-snug max-w-md">
              Thoughtful improvements that elevate comfort, enhance durability, and bring lasting beauty to every part of
              your home.
            </p>

            <div className="mt-5 flex flex-col sm:flex-row gap-2 sm:gap-2.5">
              <a href="#more-ways-categories" className={`${primaryCtaClass} w-full sm:w-auto`}>
                Explore Our Services
              </a>
              <OpenLiveChatButton className={`${outlineCtaClass} w-full sm:w-auto`}>Talk to Our Team</OpenLiveChatButton>
            </div>
          </div>

          <SplitPhoto
            className="mt-6 lg:mt-0"
            slot="construction.approvedMoreWays"
            alt="Premium home exterior upgrades including siding, trim, windows, doors, and outdoor living details"
            objectPosition="object-[42%_58%]"
          />
        </div>

        <div id="more-ways-categories" className="mt-8 md:mt-10 scroll-mt-24">
          <div className="rounded-xl sm:rounded-2xl bg-white ring-1 ring-black/5 px-5 sm:px-7 py-6 sm:py-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 lg:gap-4">
              {MORE_WAY_CATEGORIES.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="min-w-0">
                    <div className="flex items-center gap-2">
                      <Icon />
                      <h3 className="font-heading text-tamay-primary text-sm font-semibold leading-snug">{item.title}</h3>
                    </div>
                    <p className="mt-2 text-[12px] sm:text-[13px] text-gray-600 leading-snug">{item.body}</p>
                  </article>
                );
              })}
            </div>
            <div className="mt-6 pt-5 border-t border-gray-200/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <p className="font-heading text-tamay-primary text-sm font-semibold tracking-wide uppercase">
                Built Better. Built to Last.
              </p>
              <p className="text-[13px] text-gray-600">Quality upgrades designed around the way you live.</p>
            </div>
          </div>

          <div className="mt-7 mb-4 text-center max-w-xl mx-auto">
            <p className="font-heading text-tamay-primary text-base sm:text-lg font-semibold">
              Trusted Craftsmanship. Lasting Results.
            </p>
            <p className="mt-1.5 text-sm text-gray-600 leading-snug">
              Our team treats every home like our own — with care, precision, and pride.
            </p>
            <p className="mt-3 text-sm text-tamay-primary font-medium">
              Ready to get started? Let’s bring your vision to life.
            </p>
          </div>
        </div>
      </div>

      {/* Estimator — image left / copy right for alternating rhythm */}
      <div className="border-t border-gray-200/70 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 md:pt-14 lg:pt-16">
          <div className="lg:grid lg:grid-cols-[minmax(0,0.58fr)_minmax(0,0.42fr)] lg:gap-8 xl:gap-10 lg:items-stretch">
            <SplitPhoto
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

          <div className="mt-8 md:mt-10 pb-12 md:pb-14 lg:pb-16">
            <div className="rounded-xl sm:rounded-2xl bg-[#faf8f5] ring-1 ring-black/5 px-5 sm:px-7 py-6 sm:py-7">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                <div>
                  <p className="font-heading text-tamay-primary text-sm font-semibold tracking-wide uppercase">
                    Small Projects. Big Difference.
                  </p>
                  <p className="mt-2 text-[13px] text-gray-600 leading-snug">
                    Professional assemblies and installations that save you time and stress.
                  </p>
                </div>
                <div className="md:border-x md:border-gray-200/80 md:px-6">
                  <p className="font-heading text-tamay-primary text-sm font-semibold tracking-wide uppercase">
                    Popular Projects
                  </p>
                  <ul className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-[13px] text-gray-600">
                    {POPULAR_PROJECTS.map((project) => (
                      <li key={project} className="flex items-start gap-1.5">
                        <span className="mt-[7px] h-1 w-1 rounded-full bg-tamay-accent shrink-0" aria-hidden />
                        {project}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-heading text-tamay-primary text-sm font-semibold tracking-wide uppercase">
                    Built Better. Built to Last.
                  </p>
                  <p className="mt-2 text-[13px] text-gray-600 leading-snug">
                    Expert workmanship and attention to every detail.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
