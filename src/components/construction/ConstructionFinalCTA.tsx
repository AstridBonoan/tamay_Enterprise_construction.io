import Link from "next/link";
import { OpenLiveChatButton } from "@/components/layout/OpenLiveChatButton";
import {
  constructionChatButtonClass,
  constructionOnDarkLinkClass,
} from "@/components/construction/constructionCtaStyles";
import { appointmentScheduleHref } from "@/lib/onlineAppointments";

export function ConstructionFinalCTA() {
  return (
    <section className="py-16 md:py-20 bg-tamay-primary text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight">
          Ready to Talk About Your Project?
        </h2>
        <p className="mt-4 text-white/85 leading-relaxed">
          Tell us what you’re planning. We’ll help you understand the next step, what may be involved, and how Tamay
          can help bring the project together.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href={appointmentScheduleHref("construction")} className={constructionOnDarkLinkClass}>
            Book a Construction Consultation
          </Link>
          <OpenLiveChatButton className={constructionChatButtonClass}>Chat With Our Team</OpenLiveChatButton>
        </div>
        <p className="mt-8 text-sm text-white/70">
          Licensed • Fully Insured • Serving West Haven and nearby Connecticut communities
        </p>
      </div>
    </section>
  );
}
