import Link from "next/link";
import { constructionChatButtonClass } from "@/components/construction/constructionCtaStyles";
import { SitePhoto } from "@/components/images/SitePhoto";
import { appointmentScheduleHref } from "@/lib/onlineAppointments";

const HERO_IMAGE_ALT =
  "Tamay construction team reviewing plans together at a premium kitchen renovation";

const heroSecondaryCtaClass =
  "inline-flex items-center justify-center min-h-11 w-full sm:w-auto font-bold text-sm tracking-wide px-6 py-3 transition-colors text-center border border-tamay-accent/85 text-white bg-tamay-primary/25 hover:bg-tamay-primary/40 backdrop-blur-[2px]";

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-4 w-4 shrink-0 text-tamay-accent"
      aria-hidden
    >
      <path d="M10 2.5 4 5v5c0 3.5 2.6 6.4 6 7 3.4-.6 6-3.5 6-7V5l-6-2.5Z" />
      <path d="M7.5 10.2 9.2 12 12.8 8.4" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-4 w-4 shrink-0 text-tamay-accent"
      aria-hidden
    >
      <path d="M3.5 8.5 10 3l6.5 5.5V16a1 1 0 0 1-1 1h-4v-4.5H8.5V17h-4a1 1 0 0 1-1-1V8.5Z" />
    </svg>
  );
}

function WarrantyIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-4 w-4 shrink-0 text-tamay-accent"
      aria-hidden
    >
      <circle cx="10" cy="10" r="6.5" />
      <path d="M10 6.5v4.2l2.6 1.5" />
    </svg>
  );
}

const TRUST_ITEMS = [
  { icon: ShieldIcon, label: "Fully Insured" },
  { icon: HomeIcon, label: "Family Owned" },
  {
    icon: WarrantyIcon,
    label: "7-Year Warranty",
    detail: "New Kitchens & Baths",
    ariaLabel: "7-Year Warranty on new kitchens and baths",
  },
] as const;

/**
 * Integrated full-bleed hero — approved photograph as background only.
 * Desktop: left navy gradient + copy; team remains visible center-right.
 * Mobile: same photograph with bottom-weighted gradient; no separate white block.
 */
export function ConstructionHero() {
  return (
    <section className="relative overflow-hidden bg-tamay-primary">
      <div className="relative min-h-[430px] max-h-[500px] sm:min-h-[480px] sm:max-h-[560px] md:min-h-[540px] md:max-h-[650px] lg:min-h-[580px] lg:max-h-[680px]">
        <SitePhoto
          slot="construction.approvedHero"
          alt={HERO_IMAGE_ALT}
          priority
          className="object-cover object-[56%_38%] sm:object-[60%_40%] md:object-[68%_center] lg:object-[72%_center]"
          sizes="100vw"
        />

        {/* Desktop / tablet: restrained left gradient */}
        <div
          className="absolute inset-0 pointer-events-none z-[1] hidden sm:block bg-gradient-to-r from-tamay-primary/90 from-0% via-tamay-primary/68 via-[30%] via-tamay-primary/28 via-[46%] to-transparent"
          aria-hidden
        />

        {/* Mobile: lower-weighted gradient for integrated hero readability */}
        <div
          className="absolute inset-0 pointer-events-none z-[1] sm:hidden bg-gradient-to-t from-tamay-primary/96 via-tamay-primary/62 via-[52%] to-tamay-primary/10"
          aria-hidden
        />
        <div
          className="absolute inset-0 pointer-events-none z-[1] sm:hidden bg-gradient-to-r from-tamay-primary/82 via-tamay-primary/35 via-[58%] to-transparent"
          aria-hidden
        />

        <div className="absolute inset-0 z-10 flex items-end sm:items-center">
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-11 md:py-14">
            <div className="max-w-md md:max-w-lg">
              <p className="text-tamay-accent font-heading font-bold tracking-[0.14em] uppercase text-[11px] sm:text-xs mb-2 sm:mb-3">
                Construction &amp; Renovation
              </p>
              <h1 className="font-heading text-white text-[1.85rem] leading-[1.1] sm:text-4xl md:text-[2.75rem] font-semibold">
                Built Around{" "}
                <br className="lg:hidden" />
                Your Home.
              </h1>
              <p className="mt-3 sm:mt-4 text-white/90 text-sm sm:text-base leading-relaxed max-w-sm md:max-w-md">
                Kitchens, bathrooms, additions, and repairs —
                <br />
                managed from start to finish.
              </p>
              <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <a href="#construction-services" className={`${constructionChatButtonClass} w-full sm:w-auto`}>
                  Explore Construction Services
                </a>
                <Link
                  href={appointmentScheduleHref("construction")}
                  className={heroSecondaryCtaClass}
                >
                  Book a Construction Consultation
                </Link>
              </div>
            </div>

            <ul className="mt-5 sm:mt-6 pt-4 border-t border-white/15 grid grid-cols-3 gap-2 md:flex md:flex-wrap md:items-center md:gap-0 max-w-2xl">
              {TRUST_ITEMS.map((item, index) => {
                const Icon = item.icon;
                return (
                  <li
                    key={item.label}
                    className={`flex items-start gap-1.5 md:gap-2 min-w-0 md:pr-6 ${
                      index > 0 ? "md:pl-6 md:border-l md:border-white/20" : ""
                    }`}
                    aria-label={"ariaLabel" in item ? item.ariaLabel : item.label}
                  >
                    <Icon />
                    <span className="min-w-0">
                      <span className="block text-[10px] sm:text-xs text-white/85 leading-tight">{item.label}</span>
                      {"detail" in item && item.detail ? (
                        <span className="block text-[9px] sm:text-[10px] text-white/65 leading-tight mt-0.5">
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
