import type { Metadata } from "next";
import { AppointmentServiceRow } from "@/components/appointments/AppointmentServiceRow";
import { SiteContactSection } from "@/components/ui/SiteContactSection";
import { ONLINE_APPOINTMENT_SERVICES } from "@/lib/onlineAppointments";
import { buildSocialMetadata } from "@/lib/socialMetadata";

export const metadata: Metadata = buildSocialMetadata("appointments");

export default function OnlineAppointmentsPage() {
  return (
    <>
      <section className="py-14 md:py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-heading text-3xl md:text-4xl font-semibold text-tamay-primary text-center uppercase tracking-wide">
            Online Appointments
          </h1>
          <hr className="section-divider max-w-[120px] mx-auto mt-4 mb-2" />

          <div className="mt-8">
            {ONLINE_APPOINTMENT_SERVICES.map((service) => (
              <AppointmentServiceRow key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      <SiteContactSection />
    </>
  );
}
