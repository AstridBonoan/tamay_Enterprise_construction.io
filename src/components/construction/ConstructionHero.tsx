import Link from "next/link";
import {
  constructionChatButtonClass,
  constructionOnDarkLinkClass,
} from "@/components/construction/constructionCtaStyles";
import { SitePhoto } from "@/components/images/SitePhoto";
import { appointmentScheduleHref } from "@/lib/onlineAppointments";

const HERO_IMAGE_ALT =
  "Tamay Enterprises crew reviewing plans at a premium kitchen renovation with coordinated trades on site";

const TRUST_ITEMS = [
  "Fully Insured",
  "Family Owned",
  "7-Year Workmanship on New Kitchens & Baths",
] as const;

/**
 * Full-bleed visual hero — photograph fills the canvas; copy overlays the left field.
 * Mobile keeps the same integrated hero (no separate white content block above the image).
 */
export function ConstructionHero() {
  return (
    <section className="relative overflow-hidden bg-tamay-primary">
      <div className="relative min-h-[400px] max-h-[520px] sm:min-h-[440px] md:min-h-[480px] md:max-h-[580px]">
        <SitePhoto
          slot="construction.approvedHero"
          alt={HERO_IMAGE_ALT}
          priority
          className="object-cover object-[72%_38%] sm:object-[74%_40%] md:object-[82%_center] lg:object-right"
          sizes="100vw"
        />

        {/* Desktop / tablet: controlled navy gradient on the left for copy readability */}
        <div
          className="absolute inset-0 pointer-events-none z-[1] hidden sm:block bg-gradient-to-r from-tamay-primary/92 from-0% via-tamay-primary/72 via-[32%] via-tamay-primary/35 via-[48%] to-transparent"
          aria-hidden
        />

        {/* Mobile: integrated hero overlay — readable text without hiding the scene */}
        <div
          className="absolute inset-0 pointer-events-none z-[1] sm:hidden bg-gradient-to-t from-tamay-primary/95 via-tamay-primary/55 via-50% to-tamay-primary/15"
          aria-hidden
        />
        <div
          className="absolute inset-0 pointer-events-none z-[1] sm:hidden bg-gradient-to-r from-tamay-primary/88 via-tamay-primary/45 via-[55%] to-transparent"
          aria-hidden
        />

        <div className="absolute inset-0 z-10 flex items-end sm:items-center">
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-14">
            <div className="max-w-lg">
              <p className="text-tamay-accent font-heading font-bold tracking-[0.16em] uppercase text-[11px] sm:text-xs mb-2 sm:mb-3">
                Construction &amp; Renovation
              </p>
              <h1 className="font-heading text-white text-[1.75rem] leading-[1.15] sm:text-4xl lg:text-[2.65rem] font-semibold text-balance">
                Built Around Your Home.
              </h1>
              <p className="mt-3 sm:mt-4 text-white/90 text-sm sm:text-base leading-relaxed max-w-md">
                Kitchens, bathrooms, additions, and repairs — managed from start to finish.
              </p>
              <div className="mt-5 sm:mt-7 flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <a href="#construction-services" className={constructionOnDarkLinkClass}>
                  Explore Construction Services
                </a>
                <Link href={appointmentScheduleHref("construction")} className={constructionChatButtonClass}>
                  Book a Construction Consultation
                </Link>
              </div>
            </div>

            <ul className="mt-5 sm:mt-7 pt-4 border-t border-white/15 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[10px] sm:text-xs text-white/75 tracking-wide">
              {TRUST_ITEMS.map((item, index) => (
                <li key={item} className="flex items-center gap-3">
                  {index > 0 ? (
                    <span className="hidden sm:inline text-white/25" aria-hidden>
                      |
                    </span>
                  ) : null}
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
