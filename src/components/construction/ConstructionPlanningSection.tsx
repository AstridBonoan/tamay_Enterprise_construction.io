import Link from "next/link";
import { ConstructionApprovedImage } from "@/components/construction/ConstructionApprovedImage";
import { constructionPrimaryLinkClass } from "@/components/construction/constructionCtaStyles";
import { appointmentScheduleHref } from "@/lib/onlineAppointments";

/**
 * Approved planning visual already includes the heading, four discovery groups, and a consultation banner.
 * Show the full graphic uncropped; keep a real Book Consultation CTA for routing.
 */
export function ConstructionPlanningSection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="sr-only">What Are You Planning For Your Home?</h2>
        <ConstructionApprovedImage
          slot="construction.approvedPlanning"
          alt="What Are You Planning For Your Home — Renovate a Space, Add or Build, Repair or Upgrade, and Improve Home Systems"
          width={1536}
          height={1024}
        />
        <div className="mt-8 flex justify-center">
          <Link href={appointmentScheduleHref("construction")} className={constructionPrimaryLinkClass}>
            Book a Consultation
          </Link>
        </div>
      </div>
    </section>
  );
}
