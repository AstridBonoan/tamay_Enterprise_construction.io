import Image from "next/image";
import { ServiceAppointmentForm } from "@/components/appointments/ServiceAppointmentForm";
import type { OnlineAppointmentService } from "@/lib/onlineAppointments";

type ServiceAppointmentScheduleProps = {
  service: OnlineAppointmentService;
};

export function ServiceAppointmentSchedule({ service }: ServiceAppointmentScheduleProps) {
  return (
    <div className="space-y-8">
      <div className="bg-white border border-gray-200 shadow-sm p-6 sm:p-8">
        <figure className="relative w-full max-w-sm aspect-[3/2] bg-gray-100 overflow-hidden mb-5">
          <Image
            src={service.image}
            alt={service.imageAlt}
            fill
            className="object-cover"
            sizes="384px"
            unoptimized
          />
        </figure>
        <p className="text-xs font-bold uppercase tracking-widest text-tamay-accent mb-2">Free consultation</p>
        <h1 className="font-heading text-2xl sm:text-3xl text-tamay-primary font-semibold leading-snug">
          {service.title}
        </h1>
        <p className="text-gray-600 mt-2">
          {service.durationLabel} | {service.priceLabel}
        </p>
        <p className="text-gray-600 mt-3 text-sm leading-relaxed">{service.description}</p>
      </div>

      <div id="book" className="bg-white border border-gray-200 shadow-sm p-6 sm:p-8 scroll-mt-24">
        <h2 className="font-heading text-lg text-tamay-primary font-semibold mb-2">Choose an available time</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          Pick a time and confirm your request. Your appointment will be saved to your Bookings dashboard.
          Booked times are removed automatically for other visitors.
        </p>
        <ServiceAppointmentForm service={service} />
      </div>
    </div>
  );
}
