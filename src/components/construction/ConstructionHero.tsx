import Link from "next/link";
import {
  constructionChatButtonClass,
  constructionPrimaryLinkClass,
} from "@/components/construction/constructionCtaStyles";
import { SitePhoto } from "@/components/images/SitePhoto";
import { appointmentScheduleHref } from "@/lib/onlineAppointments";

/**
 * Hero asset is designed with a light left field for copy and crew on the right.
 * Dark navy page text sits on that light field; avoid heavy navy overlays that hide the photo.
 */
export function ConstructionHero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="relative aspect-[1672/941] min-h-[420px] md:min-h-[520px] w-full">
        <SitePhoto
          slot="construction.approvedHero"
          alt="Tamay construction crew working on a modern residential renovation in an organized premium jobsite"
          priority
          className="object-cover object-[72%_center] sm:object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/88 to-transparent md:via-white/75 md:to-transparent w-full md:w-[58%] pointer-events-none" />
        <div className="absolute inset-0 flex items-center">
          <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
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
          </div>
        </div>
      </div>
    </section>
  );
}
