"use client";

import { ScheduleSlotPreview } from "@/components/scheduling/ScheduleSlotPreview";
import { SitePhoto } from "@/components/images/SitePhoto";
import { APPOINTMENT_SERVICE_IMAGE_KEYS } from "@/lib/siteImageSlots";
import type { OnlineAppointmentService } from "@/lib/onlineAppointments";
import { appointmentScheduleHref } from "@/lib/onlineAppointments";

type AppointmentServiceCardProps = {
  service: OnlineAppointmentService;
  showScheduleLabel?: boolean;
  collapseAvailability?: boolean;
  availabilityOpen?: boolean;
  onToggleAvailability?: () => void;
};

export function AppointmentServiceCard({
  service,
  showScheduleLabel = false,
  collapseAvailability = false,
  availabilityOpen = false,
  onToggleAvailability,
}: AppointmentServiceCardProps) {
  const scheduleHref = appointmentScheduleHref(service.id);
  const imageSlot = APPOINTMENT_SERVICE_IMAGE_KEYS[service.id] ?? "logo";

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-8">
      <figure className="relative w-full md:w-52 lg:w-60 aspect-[3/2] shrink-0 bg-gray-100 overflow-hidden">
        <SitePhoto slot={imageSlot} alt={service.imageAlt} sizes="(max-width: 768px) 100vw, 240px" compact />
      </figure>

      <div className="flex-1 min-w-0 md:pt-1">
        <h3 className="font-heading text-xl md:text-2xl font-semibold text-tamay-primary">{service.title}</h3>
        <p className="text-gray-600 mt-1">
          {service.durationLabel} | {service.priceLabel}
        </p>
        <p className="text-gray-600 mt-3 text-sm md:text-base leading-relaxed">{service.description}</p>

        <div className="mt-5 border-t border-gray-100 pt-5">
          {collapseAvailability ? (
            <div>
              <button
                type="button"
                onClick={onToggleAvailability}
                aria-expanded={availabilityOpen}
                className="w-full min-h-11 inline-flex items-center justify-between gap-3 px-4 py-3 border border-tamay-primary text-tamay-primary font-bold text-sm tracking-wide hover:bg-tamay-primary/5 transition-colors"
              >
                <span>{availabilityOpen ? "Hide available times" : "View available times"}</span>
                <span
                  aria-hidden="true"
                  className={`text-base leading-none transition-transform ${availabilityOpen ? "rotate-180" : ""}`}
                >
                  ▼
                </span>
              </button>
              {availabilityOpen ? (
                <div className="mt-4">
                  <ScheduleSlotPreview
                    serviceKey={service.id}
                    scheduleLabel={service.scheduleLabel}
                    bookHref={scheduleHref}
                    showLabel={showScheduleLabel}
                    emptyMessage="No times listed yet. Contact our team or check back soon."
                  />
                </div>
              ) : null}
            </div>
          ) : (
            <ScheduleSlotPreview
              serviceKey={service.id}
              scheduleLabel={service.scheduleLabel}
              bookHref={scheduleHref}
              showLabel={showScheduleLabel}
              emptyMessage="No times listed yet. Contact our team or check back soon."
            />
          )}
        </div>
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
