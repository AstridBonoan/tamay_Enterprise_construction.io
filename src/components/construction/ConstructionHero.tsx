import Link from "next/link";
import {
  constructionChatButtonClass,
  constructionPrimaryLinkClass,
} from "@/components/construction/constructionCtaStyles";
import { SitePhoto } from "@/components/images/SitePhoto";
import { appointmentScheduleHref } from "@/lib/onlineAppointments";

const HERO_IMAGE_ALT =
  "Tamay construction crew reviewing plans at a premium kitchen renovation, with a second team member working on built-in cabinetry in the background";

function HeroCopy() {
  return (
    <>
      <p className="text-tamay-accent font-heading font-bold tracking-[0.18em] uppercase text-xs mb-3">
        Construction
      </p>
      <h1 className="font-heading text-tamay-primary text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold leading-tight max-w-xl text-balance">
        Built Around Your Home. Managed From Start to Finish.
      </h1>
      <p className="mt-4 text-gray-700 text-base sm:text-lg leading-relaxed max-w-lg">
        From renovations and additions to kitchens, bathrooms, structural work, and home improvements, Tamay
        brings planning, materials, trades, and construction together under one coordinated process.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <a href="#construction-services" className={constructionPrimaryLinkClass}>
          Explore Construction Services
        </a>
        <Link href={appointmentScheduleHref("construction")} className={constructionChatButtonClass}>
          Book a Construction Consultation
        </Link>
      </div>
    </>
  );
}

/**
 * Approved hero uses the light left field for live copy; kitchen and crew stay visible on the right.
 * Mobile stacks copy above a dedicated image band so text never competes with the scene.
 */
export function ConstructionHero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="relative flex flex-col md:aspect-[1200/630] md:max-h-[580px] md:min-h-[460px]">
        <div className="relative z-10 w-full px-4 sm:px-6 py-10 md:absolute md:inset-0 md:flex md:items-center">
          <div className="w-full max-w-6xl mx-auto">
            <div className="max-w-xl">
              <HeroCopy />
            </div>
          </div>
        </div>

        <div className="relative w-full aspect-[1200/630] max-h-[min(58vw,360px)] shrink-0 md:absolute md:inset-0 md:max-h-none md:aspect-auto">
          <SitePhoto
            slot="construction.approvedHero"
            alt={HERO_IMAGE_ALT}
            priority
            className="object-cover object-[68%_center] md:object-right md:object-center"
            sizes="100vw"
          />
          <div
            className="hidden md:block absolute inset-0 pointer-events-none bg-gradient-to-r from-white from-[28%] via-white/45 via-[40%] to-transparent"
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
