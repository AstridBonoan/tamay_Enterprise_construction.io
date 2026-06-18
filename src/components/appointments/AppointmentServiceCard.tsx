import Image from "next/image";
import type { OnlineAppointmentService } from "@/lib/onlineAppointments";
import { appointmentScheduleHref } from "@/lib/onlineAppointments";

type AppointmentServiceCardProps = {
  service: OnlineAppointmentService;
  showScheduleLabel?: boolean;
};

export function AppointmentServiceCard({
  service,
  showScheduleLabel = false,
}: AppointmentServiceCardProps) {
  const scheduleHref = appointmentScheduleHref(service.id);

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-8">
      <figure className="relative w-full md:w-52 lg:w-60 aspect-[3/2] shrink-0 bg-gray-100 overflow-hidden">
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 240px"
          unoptimized
        />
      </figure>

      <div className="flex-1 min-w-0 md:pt-1">
        <h3 className="font-heading text-xl md:text-2xl font-semibold text-tamay-primary">{service.title}</h3>
        <p className="text-gray-600 mt-1">
          {service.durationLabel} | {service.priceLabel}
        </p>
        <p className="text-gray-600 mt-3 text-sm md:text-base leading-relaxed">{service.description}</p>

        {service.scheduleSlots.length > 0 && (
          <div className="mt-5 border-t border-gray-100 pt-5">
            {showScheduleLabel && (
              <h4 className="text-sm font-semibold tracking-widest uppercase text-tamay-primary mb-3">
                {service.scheduleLabel}
              </h4>
            )}
            <ul className="space-y-3">
              {service.scheduleSlots.map((slot) => (
                <li key={slot.start}>
                  <a
                    href={scheduleHref}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 py-3 px-4 bg-white border border-gray-100 hover:border-tamay-primary hover:bg-tamay-primary/5 transition-colors"
                  >
                    <span className="font-medium text-gray-800">{slot.date}</span>
                    <span className="text-gray-600 text-sm sm:text-base">{slot.time}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="flex md:items-start shrink-0">
        <a
          href={scheduleHref}
          className="inline-flex items-center justify-center rounded-full bg-tamay-primary hover:bg-tamay-primary-dark text-white font-bold text-sm tracking-widest px-8 py-3 transition-colors min-w-[120px]"
        >
          BOOK
        </a>
      </div>
    </div>
  );
}
