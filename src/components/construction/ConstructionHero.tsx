import Link from "next/link";
import { SitePhoto } from "@/components/images/SitePhoto";
import { appointmentScheduleHref } from "@/lib/onlineAppointments";

const HERO_IMAGE_ALT =
  "Tamay Enterprises team reviewing renovation plans together at a premium kitchen island";

const heroPrimaryCtaClass =
  "inline-flex items-center justify-center min-h-9 sm:min-h-10 font-semibold text-[11px] sm:text-sm tracking-wide px-3.5 sm:px-5 py-2 sm:py-2.5 transition-colors text-center bg-tamay-accent hover:bg-tamay-accent-hover text-white w-fit max-w-full gap-1.5";

const heroSecondaryCtaClass =
  "inline-flex items-center justify-center min-h-9 sm:min-h-10 w-fit max-w-full font-semibold text-[11px] sm:text-sm tracking-wide px-3.5 sm:px-5 py-2 sm:py-2.5 transition-colors text-center border border-white/85 text-white bg-transparent hover:bg-white/10";

function ShieldIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={`shrink-0 text-tamay-accent ${className}`}
      aria-hidden
    >
      <path d="M10 2.5 4 5v5c0 3.5 2.6 6.4 6 7 3.4-.6 6-3.5 6-7V5l-6-2.5Z" />
      <path d="M7.5 10.2 9.2 12 12.8 8.4" />
    </svg>
  );
}

function FamilyIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={`shrink-0 text-tamay-accent ${className}`}
      aria-hidden
    >
      <circle cx="7" cy="7" r="2.2" />
      <circle cx="13.5" cy="7.8" r="1.8" />
      <path d="M3.5 16.5c.6-2.2 2-3.5 3.5-3.5s2.9 1.3 3.5 3.5M11 16.5c.4-1.6 1.4-2.7 2.5-2.7s2.1 1.1 2.5 2.7" />
    </svg>
  );
}

function WarrantyBadgeIcon({ className = "h-4 w-4 text-[9px]" }: { className?: string }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full border border-tamay-accent font-bold leading-none text-tamay-accent ${className}`}
      aria-hidden
    >
      7
    </span>
  );
}

const TRUST_ITEMS = [
  { icon: ShieldIcon, label: "Fully Insured" },
  { icon: FamilyIcon, label: "Family Owned" },
  {
    icon: WarrantyBadgeIcon,
    label: "7-Year Warranty",
    detail: "New Kitchens & Baths",
    ariaLabel: "7-Year Warranty on new kitchens and baths",
  },
] as const;

/**
 * Integrated hero aligned to approved mockup — photograph background only.
 * Desktop: left navy gradient, stacked CTAs, horizontal trust row with dividers.
 * Mobile: integrated hero with team visible above, premium bottom overlay for copy/CTAs.
 */
export function ConstructionHero() {
  return (
    <section className="relative overflow-hidden bg-[#141c2b]">
      <div className="relative w-full min-h-[min(100vw,470px)] max-h-[500px] sm:aspect-[16/9] sm:min-h-[440px] sm:max-h-[min(56.25vw,700px)] md:min-h-[500px]">
        <SitePhoto
          slot="construction.approvedHero"
          alt={HERO_IMAGE_ALT}
          priority
          className="object-cover object-[50%_28%] sm:object-center"
          sizes="100vw"
        />

        {/* Desktop: narrow navy left scrim — photo stays dominant */}
        <div
          className="absolute inset-0 pointer-events-none z-[1] hidden sm:block bg-gradient-to-r from-[#141c2b]/82 from-0% via-[#141c2b]/48 via-[18%] via-[#141c2b]/15 via-[30%] to-transparent"
          aria-hidden
        />

        {/* Mobile: navy scrim only on the lower-left band where copy sits */}
        <div
          className="absolute inset-0 pointer-events-none z-[1] sm:hidden bg-gradient-to-t from-[#141c2b]/95 from-0% via-[#141c2b]/70 via-[24%] to-transparent to-[50%]"
          aria-hidden
        />
        <div
          className="absolute inset-0 pointer-events-none z-[1] sm:hidden bg-gradient-to-r from-[#141c2b]/80 from-0% via-[#141c2b]/35 via-[42%] to-transparent"
          aria-hidden
        />

        <div className="absolute inset-0 z-10 flex items-end sm:items-center">
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 pb-5 pt-2 sm:py-11 md:py-12">
            <div className="max-w-[17.5rem] sm:max-w-md md:max-w-xl">
              <p className="text-tamay-accent font-heading font-bold tracking-[0.14em] uppercase text-[11px] sm:text-xs mb-2 sm:mb-3">
                Construction &amp; Renovation
              </p>
              <h1 className="font-heading text-white text-[1.55rem] leading-[1.12] sm:text-4xl md:text-[2.85rem] font-semibold text-balance max-w-[15ch] sm:max-w-none">
                Built Around{" "}
                <br className="lg:hidden" />
                Your Home.
              </h1>
              <p className="mt-2 sm:mt-4 text-white text-[12px] sm:text-base leading-snug sm:leading-relaxed max-w-[30ch] sm:max-w-md">
                Kitchens, bathrooms, additions, and repairs — managed from start to finish.
              </p>

              <div className="mt-3 sm:mt-5 flex flex-col items-start gap-1.5 sm:gap-2.5 w-fit max-w-full">
                <a href="#construction-services" className={heroPrimaryCtaClass}>
                  Explore Construction Services
                  <span aria-hidden className="text-sm leading-none">
                    →
                  </span>
                </a>
                <Link href={appointmentScheduleHref("construction")} className={heroSecondaryCtaClass}>
                  Book a Construction Consultation
                </Link>
              </div>
            </div>

            <ul className="mt-3 sm:mt-7 grid grid-cols-3 gap-0.5 max-w-[17.5rem] sm:max-w-none border-t border-white/20 pt-2.5 sm:flex sm:flex-wrap sm:items-center sm:gap-y-2 sm:border-t-0 sm:pt-0 sm:max-w-2xl">
              {TRUST_ITEMS.map((item, index) => {
                const Icon = item.icon;
                return (
                  <li
                    key={item.label}
                    className={`flex flex-col items-center text-center gap-1 min-w-0 sm:flex-row sm:items-center sm:text-left sm:gap-2 ${
                      index > 0
                        ? "sm:pl-5 sm:ml-5 sm:border-l sm:border-tamay-accent/35"
                        : ""
                    }`}
                    aria-label={"ariaLabel" in item ? item.ariaLabel : item.label}
                  >
                    <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span className="min-w-0">
                      <span className="block text-[9px] sm:text-xs text-white leading-tight">{item.label}</span>
                      {"detail" in item && item.detail ? (
                        <span className="block text-[8px] sm:text-[10px] text-white/80 leading-tight mt-0.5">
                          {item.detail}
                        </span>
                      ) : null}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
