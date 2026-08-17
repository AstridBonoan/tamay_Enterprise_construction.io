import { AppointmentServiceCard } from "@/components/appointments/AppointmentServiceCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAppointmentServiceById } from "@/lib/onlineAppointments";
import { getServiceAppointmentSectionCopy } from "@/lib/serviceAppointmentSections";

type ServiceAppointmentSectionProps = {
  serviceId: string;
  id?: string;
};

export function ServiceAppointmentSection({ serviceId, id }: ServiceAppointmentSectionProps) {
  const service = getAppointmentServiceById(serviceId);
  const copy = getServiceAppointmentSectionCopy(serviceId);

  if (!service || !copy) return null;

  return (
    <section id={id} className="py-14 md:py-16 px-4 bg-gray-50 border-t border-gray-100 scroll-mt-24">
      <div className="max-w-4xl mx-auto">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle} />
        <div className="mt-8 bg-white border border-gray-200 shadow-sm p-6 sm:p-8">
          <AppointmentServiceCard service={service} />
        </div>
      </div>
    </section>
  );
}
