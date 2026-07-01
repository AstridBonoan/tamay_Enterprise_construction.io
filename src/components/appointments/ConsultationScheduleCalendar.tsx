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

type ConsultationScheduleCalendarProps = {
  initialServiceId: string;
};

const serviceSelectClass =
  "w-full border border-gray-300 rounded-md px-4 py-3 text-base text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-tamay-primary/40 focus:border-tamay-primary";

function SelectedServicePreview({ service }: { service: OnlineAppointmentService }) {
  return (
    <div className="flex gap-4 p-4 border border-tamay-primary bg-tamay-primary/5 ring-1 ring-tamay-primary/30">
      <figure className="relative w-24 sm:w-28 aspect-[3/2] shrink-0 bg-gray-100 overflow-hidden">
        <Image
          src={service.image}
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

export function ConsultationScheduleCalendar({ initialServiceId }: ConsultationScheduleCalendarProps) {
  const [selectedServiceId, setSelectedServiceId] = useState(initialServiceId);

  useEffect(() => {
    setSelectedServiceId(initialServiceId);
  }, [initialServiceId]);

  const selectService = useCallback((serviceId: string) => {
    setSelectedServiceId(serviceId);
    const nextUrl = sitePath(`${appointmentSchedulePath(serviceId)}#book`);
    window.history.replaceState(null, "", nextUrl);
  }, []);

  const service =
    getAppointmentServiceById(selectedServiceId) ?? ONLINE_APPOINTMENT_SERVICES[0];

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

      <div className="bg-white border border-gray-200 shadow-sm p-6 sm:p-8">
        <h2 className="font-heading text-lg text-tamay-primary font-semibold mb-2">Consultation services</h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          The service you chose on Online Appointments is selected below. Switch to another consultation type if
          needed — your booking form updates automatically.
        </p>
        <div className="space-y-4">
          <div>
            <label htmlFor="consultation-service" className="block text-sm font-semibold text-gray-700 mb-2">
              Consultation type
            </label>
            <select
              id="consultation-service"
              value={selectedServiceId}
              onChange={(event) => selectService(event.target.value)}
              className={serviceSelectClass}
            >
              {ONLINE_APPOINTMENT_SERVICES.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title} — {item.durationLabel} | {item.priceLabel}
                </option>
              ))}
            </select>
          </div>
          <SelectedServicePreview service={service} />
        </div>
      </div>

      <div id="book" className="bg-white border border-gray-200 shadow-sm p-6 sm:p-8 scroll-mt-24">
        <h2 className="font-heading text-lg text-tamay-primary font-semibold mb-2">
          Choose an available time
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Pick a time and confirm your consultation. Your appointment will be saved to your Bookings dashboard.
          Booked times are removed automatically for other visitors.
        </p>

        <div className="rounded-sm border border-tamay-primary/20 bg-tamay-primary/5 px-4 py-3 mb-6">
          <p className="text-xs font-bold uppercase tracking-wide text-tamay-accent">Selected consultation</p>
          <p className="font-heading text-lg font-semibold text-tamay-primary mt-1">{service.title}</p>
          <p className="text-sm text-gray-600 mt-0.5">
            {service.durationLabel} | {service.priceLabel}
          </p>
        </div>

        <div className="space-y-6">
          <ServiceAppointmentForm key={service.id} service={service} />
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
