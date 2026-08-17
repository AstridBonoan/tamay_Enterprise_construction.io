"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ServiceAppointmentForm } from "@/components/appointments/ServiceAppointmentForm";
import { Button } from "@/components/ui/Button";
import {
  appointmentSchedulePath,
  ONLINE_APPOINTMENT_SERVICES,
  getAppointmentServiceById,
  type OnlineAppointmentService,
} from "@/lib/onlineAppointments";
import { sitePath } from "@/lib/paths";
import { SITE } from "@/lib/site";
import { useAppointmentServiceImage } from "@/components/images/SiteImagesProvider";

type ConsultationScheduleCalendarProps = {
  initialServiceId: string | null;
  serviceLocked?: boolean;
};

const serviceSelectClass =
  "w-full border border-gray-300 rounded-md px-4 py-3 text-base text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-tamay-primary/40 focus:border-tamay-primary";

function SelectedServicePreview({ service }: { service: OnlineAppointmentService }) {
  const imageSrc = useAppointmentServiceImage(service.id, service.image);
  return (
    <div className="flex gap-4 p-4 border border-tamay-primary bg-tamay-primary/5 ring-1 ring-tamay-primary/30">
      <figure className="relative w-24 sm:w-28 aspect-[3/2] shrink-0 bg-gray-100 overflow-hidden">
        <Image
          src={imageSrc}
          alt=""
          fill
          className="object-cover"
          sizes="112px"
          unoptimized
        />
      </figure>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <p className="font-heading text-base sm:text-lg font-semibold text-tamay-primary">{service.title}</p>
          <span className="shrink-0 text-xs font-bold uppercase tracking-wide text-tamay-primary">Selected</span>
        </div>
        <p className="text-sm text-gray-600 mt-0.5">
          {service.durationLabel} | {service.priceLabel}
        </p>
        <p className="text-sm text-gray-600 mt-1">{service.description}</p>
      </div>
    </div>
  );
}

export function ConsultationScheduleCalendar({
  initialServiceId,
  serviceLocked = false,
}: ConsultationScheduleCalendarProps) {
  const [selectedServiceId, setSelectedServiceId] = useState(initialServiceId);

  useEffect(() => {
    setSelectedServiceId(initialServiceId);
  }, [initialServiceId]);

  const selectService = useCallback((serviceId: string) => {
    if (!getAppointmentServiceById(serviceId)) return;
    setSelectedServiceId(serviceId);
    const nextUrl = sitePath(`${appointmentSchedulePath(serviceId)}#book`);
    window.history.replaceState(null, "", nextUrl);
  }, []);

  const service = selectedServiceId ? getAppointmentServiceById(selectedServiceId) : undefined;
  const serviceImage = useAppointmentServiceImage(service?.id ?? "construction", service?.image ?? "");

  return (
    <div className="space-y-8">
      <div className="bg-white border border-gray-200 shadow-sm p-6 sm:p-8">
        {service && !serviceLocked ? (
          <figure className="relative w-full max-w-md aspect-[3/2] bg-gray-100 overflow-hidden mb-5">
            <Image
              src={serviceImage}
              alt={service.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 448px"
              unoptimized
            />
          </figure>
        ) : null}
        <p className="text-xs font-bold uppercase tracking-widest text-tamay-accent mb-2">Free consultation</p>
        <h1 className="font-heading text-2xl sm:text-3xl text-tamay-primary font-semibold leading-snug">
          {service ? service.scheduleCtaLabel : "Book a consultation"}
        </h1>
        {service && !serviceLocked ? <p className="text-gray-700 mt-2">{service.title}</p> : null}
        {service ? (
          <>
            <p className="text-gray-600 mt-1">
              {service.durationLabel} | {service.priceLabel}
            </p>
            <p className="text-gray-600 mt-3 text-sm leading-relaxed">{service.description}</p>
          </>
        ) : (
          <p className="text-gray-600 mt-3 text-sm leading-relaxed">
            Choose a consultation type below to continue. Availability is shown after you select a service.
          </p>
        )}
      </div>

      {!serviceLocked ? (
        <div className="bg-white border border-gray-200 shadow-sm p-6 sm:p-8">
          <h2 className="font-heading text-lg text-tamay-primary font-semibold mb-2">Consultation services</h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            Choose the consultation you want to book. Availability is shown after you select a service.
          </p>
          <div className="space-y-4">
            <div>
              <label htmlFor="consultation-service" className="block text-sm font-semibold text-gray-700 mb-2">
                Consultation type
              </label>
              <select
                id="consultation-service"
                value={selectedServiceId ?? ""}
                onChange={(event) => selectService(event.target.value)}
                className={serviceSelectClass}
              >
                <option value="" disabled>
                  Select a consultation type
                </option>
                {ONLINE_APPOINTMENT_SERVICES.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title} — {item.durationLabel} | {item.priceLabel}
                  </option>
                ))}
              </select>
            </div>
            {service ? <SelectedServicePreview service={service} /> : null}
          </div>
        </div>
      ) : null}

      <div id="book" className="bg-white border border-gray-200 shadow-sm p-6 sm:p-8 scroll-mt-24">
        <h2 className="font-heading text-lg text-tamay-primary font-semibold mb-2">
          Choose an available time
        </h2>
        {service ? (
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            Pick a time and confirm your consultation. Your appointment will be saved to your Bookings dashboard.
            Booked times are removed automatically for other visitors.
          </p>
        ) : (
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            Select a consultation type above to see available times.
          </p>
        )}

        {!serviceLocked && service ? (
          <div className="rounded-sm border border-tamay-primary/20 bg-tamay-primary/5 px-4 py-3 mb-6">
            <p className="text-xs font-bold uppercase tracking-wide text-tamay-accent">Selected consultation</p>
            <p className="font-heading text-lg font-semibold text-tamay-primary mt-1">{service.title}</p>
            <p className="text-sm text-gray-600 mt-0.5">
              {service.durationLabel} | {service.priceLabel}
            </p>
          </div>
        ) : null}

        <div className="space-y-6">
          {service ? (
            <ServiceAppointmentForm key={service.id} service={service} />
          ) : (
            <p className="text-sm text-gray-500">Booking cannot continue until a consultation type is selected.</p>
          )}
          <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Button href={SITE.phoneTel} variant="outline">
              Call {SITE.phone}
            </Button>
          </div>
        </div>
      </div>

      <p className="text-center">
        <a
          href={sitePath("/online-appointments")}
          className="text-tamay-primary font-semibold hover:underline text-sm"
        >
          ← Back to Online Appointments
        </a>
      </p>
    </div>
  );
}
