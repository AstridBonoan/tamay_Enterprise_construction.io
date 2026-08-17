import Link from "next/link";
import { OpenLiveChatButton } from "@/components/layout/OpenLiveChatButton";
import {
  realEstateChatButtonClass,
  realEstateOnDarkLinkClass,
} from "@/components/real-estate/realEstateCtaStyles";
import { appointmentScheduleHref } from "@/lib/onlineAppointments";
import { SiteText } from "@/components/copy/SiteText";

export function RealEstateFinalCTA() {
  return (
    <section className="py-16 md:py-20 bg-tamay-primary text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <SiteText k="realEstate.final.title" as="h2" className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight">
          Your Next Property Should Fit More Than Today.
        </SiteText>
        <SiteText k="realEstate.final.body" as="p" className="mt-4 text-white/85 leading-relaxed" multiline>
          Whether you’re buying your first home, planning for a growing family, investing, selling, or preparing for the future, our Real Estate team is here to help you look at the full picture.
        </SiteText>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <OpenLiveChatButton className={realEstateChatButtonClass}>
            <SiteText k="realEstate.final.chat">Talk to Our Real Estate Team</SiteText>
          </OpenLiveChatButton>
          <Link href={appointmentScheduleHref("real-estate")} className={realEstateOnDarkLinkClass}>
            <SiteText k="realEstate.final.book">Book a Real Estate Consultation</SiteText>
          </Link>
        </div>
      </div>
    </section>
  );
}
