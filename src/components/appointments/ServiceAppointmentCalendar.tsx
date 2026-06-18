import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ServiceAppointmentForm } from "@/components/appointments/ServiceAppointmentForm";
import type { OnlineAppointmentService } from "@/lib/onlineAppointments";
import { sitePath } from "@/lib/paths";
import { SITE } from "@/lib/site";

type ServiceAppointmentCalendarProps = {
  service: OnlineAppointmentService;
};

export function ServiceAppointmentCalendar({ service }: ServiceAppointmentCalendarProps) {
  return (
    <div className="space-y-8">
      <div className="bg-white border border-gray-200 shadow-sm p-6 sm:p-8">
        <figure className="relative w-full max-w-md aspect-[3/2] bg-gray-100 overflow-hidden mb-5">
          <Image
            src={service.image}
            alt={service.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 448px"
            unoptimized
          />
        </figure>
        <p className="text-xs font-bold uppercase tracking-widest text-tamay-accent mb-2">Free consultation</p>
        <h1 className="font-heading text-2xl sm:text-3xl text-tamay-primary font-semibold leading-snug">
          {service.scheduleCtaLabel}
        </h1>
        <p className="text-gray-700 mt-2">{service.title}</p>
        <p className="text-gray-600 mt-1">
          {service.durationLabel} | {service.priceLabel}
        </p>
        <p className="text-gray-600 mt-3 text-sm leading-relaxed">{service.description}</p>
      </div>

      {service.scheduleSlots.length > 0 && (
        <div className="bg-white border border-gray-200 shadow-sm p-6 sm:p-8">
          <h2 className="font-heading text-lg text-tamay-primary font-semibold mb-4">
            {service.scheduleLabel}
          </h2>
          <ul className="space-y-3">
            {service.scheduleSlots.map((slot) => (
              <li
                key={slot.start}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 py-3 px-4 bg-gray-50 border border-gray-100"
              >
                <span className="font-medium text-gray-800">{slot.date}</span>
                <span className="text-gray-600 text-sm sm:text-base">{slot.time}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-gray-500 mt-4">
            Select a time below — your date and time will pre-fill a Google Calendar event when you book.
          </p>
        </div>
      )}

      <div id="book" className="bg-white border border-gray-200 shadow-sm p-6 sm:p-8 scroll-mt-24">
        <h2 className="font-heading text-lg text-tamay-primary font-semibold mb-2">
          Choose an available time
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          Pick a time and confirm your consultation. Your appointment will be saved to your Bookings
          dashboard. Booked times are removed automatically for other visitors.
        </p>
        <div className="space-y-6">
          <ServiceAppointmentForm service={service} />
          <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Button href={SITE.phoneTel} variant="outline">
              Call {SITE.phone}
            </Button>
          </div>
        </div>
      </div>

      <p className="text-center">
        <Link
          href={sitePath("/online-appointments")}
          className="text-tamay-primary font-semibold hover:underline text-sm"
        >
          ← Back to Online Appointments
        </Link>
      </p>
    </div>
  );
}
