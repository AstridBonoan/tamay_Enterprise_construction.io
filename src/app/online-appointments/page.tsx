import type { Metadata } from "next";
import { BookingEmbed } from "@/components/appointments/BookingEmbed";
import { HeroBanner } from "@/components/ui/HeroBanner";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { IMAGES } from "@/lib/images";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Schedule an Appointment | Tamay Enterprises West Haven CT",
  description:
    "Schedule an appointment with Tamay Enterprises in West Haven, CT for construction, real estate, logistics, and home services.",
};

export default function OnlineAppointmentsPage() {
  return (
    <>
      <HeroBanner
        image={IMAGES.heroConstruction}
        title="Schedule an Appointment"
        subtitle="Book time with our team for construction, real estate, logistics, or home preventive services."
        cta={{ label: "Book now", href: "#book" }}
        height="medium"
      />

      <section id="book" className="py-14 max-w-5xl mx-auto px-4">
        <SectionHeading title="Online Appointments" />
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10 -mt-2 leading-relaxed">
          Request a consultation or site visit using our online scheduler. You will complete booking on our
          main website in a new tab.
        </p>
        <BookingEmbed />
      </section>

      <section className="py-12 bg-gray-50 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-xl text-tamay-primary font-semibold mb-4">
            Need help scheduling?
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Questions about availability or which service to choose? Contact us directly and we will help
            you schedule.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href={SITE.appointmentsUrl} variant="primary" external>
              Open scheduler
            </Button>
            <Button href={SITE.phoneTel} variant="outline">
              Call {SITE.phone}
            </Button>
            <Button href={SITE.whatsapp} variant="outline" external>
              WhatsApp
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
