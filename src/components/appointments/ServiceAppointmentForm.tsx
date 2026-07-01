"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AppointmentCalendarActions } from "@/components/appointments/AppointmentCalendarActions";
import { useAuth } from "@/components/auth/AuthProvider";
import { ScheduleSignInPrompt } from "@/components/real-estate/ScheduleSignInPrompt";
import { ContactForm } from "@/components/ui/ContactForm";
import {
  createServiceBooking,
  fetchBookedAppointmentStarts,
  SlotAlreadyBookedError,
} from "@/lib/booking-data";
import {
  buildServiceConsultationEvent,
  formatSlotLabel,
  icsFilenameForAppointment,
} from "@/lib/googleCalendar";
import type { OnlineAppointmentService } from "@/lib/onlineAppointments";
import { appointmentScheduleHref, appointmentSchedulePath } from "@/lib/onlineAppointments";
import { navigateToSitePath, sitePath } from "@/lib/paths";
import { SCHEDULING } from "@/lib/schedulingConfig";
import { SITE } from "@/lib/site";

type ServiceAppointmentFormProps = {
  service: OnlineAppointmentService;
};

const slotSelectClass =
  "w-full border border-gray-300 rounded-md px-4 py-3 text-base text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-tamay-primary/40 focus:border-tamay-primary";

function SelectedTimePreview({ date, time }: { date: string; time: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 border border-tamay-primary bg-tamay-primary/5 ring-1 ring-tamay-primary/30">
      <div>
        <p className="font-medium text-gray-800">{date}</p>
        <p className="text-sm text-gray-600 mt-0.5">{time}</p>
      </div>
      <span className="shrink-0 text-xs font-bold uppercase tracking-wide text-tamay-primary">Selected</span>
    </div>
  );
}

export function ServiceAppointmentForm({ service }: ServiceAppointmentFormProps) {
  const { user, loading: authLoading } = useAuth();
  const [bookedStarts, setBookedStarts] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const schedulePath = sitePath(`${appointmentSchedulePath(service.id)}#book`);

  const availableSlots = useMemo(
    () => service.scheduleSlots.filter((slot) => !bookedStarts.includes(slot.start)),
    [bookedStarts, service.scheduleSlots],
  );

  const loadBookedSlots = useCallback(async () => {
    setLoadingSlots(true);
    try {
      setBookedStarts(await fetchBookedAppointmentStarts(service.id));
    } finally {
      setLoadingSlots(false);
    }
  }, [service.id]);

  useEffect(() => {
    void loadBookedSlots();
  }, [loadBookedSlots]);

  useEffect(() => {
    if (selectedIndex >= availableSlots.length) {
      setSelectedIndex(0);
    }
  }, [availableSlots.length, selectedIndex]);

  const selectedSlot = availableSlots[selectedIndex] ?? availableSlots[0];
  const calendarEvent = useMemo(() => {
    if (!selectedSlot) return null;
    return buildServiceConsultationEvent(service.title, service.serviceCategory, selectedSlot);
  }, [selectedSlot, service.serviceCategory, service.title]);

  if (authLoading) {
    return <p className="text-sm text-gray-600">Loading...</p>;
  }

  if (!user) {
    return (
      <ScheduleSignInPrompt schedulePath={schedulePath} actionLabel={service.scheduleCtaLabel} />
    );
  }

  if (loadingSlots) {
    return <p className="text-sm text-gray-600">Loading available times...</p>;
  }

  if (!selectedSlot || !calendarEvent || availableSlots.length === 0) {
    return (
      <div className="rounded-sm border border-gray-200 bg-gray-50 px-5 py-6 text-center">
        <p className="text-gray-700 font-medium">No appointment times are available right now.</p>
        <p className="text-sm text-gray-600 mt-2">
          Please check back later or{" "}
          <Link href={sitePath("/#contact")} className="text-tamay-primary font-semibold hover:underline">
            contact our team
          </Link>
          .
        </p>
      </div>
    );
  }

  const slotLabel = formatSlotLabel(selectedSlot);
  const icsFilename = icsFilenameForAppointment(service.id, selectedSlot);

  const handleBookingSuccess = async (formData: FormData) => {
    const notes = String(formData.get("message") ?? "").trim();

    try {
      await createServiceBooking(user.id, {
        bookingType: "consultation",
        serviceCategory: service.serviceCategory,
        serviceId: service.id,
        title: `${service.title} consultation`,
        subtitle: SITE.address,
        appointmentStart: selectedSlot.start,
        appointmentEnd: selectedSlot.end,
        preferredTime: slotLabel,
        notes: notes || undefined,
      });
      navigateToSitePath("/m/bookings");
    } catch (err) {
      if (err instanceof SlotAlreadyBookedError) {
        await loadBookedSlots();
        throw err;
      }
      throw err;
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor={`appointment-slot-${service.id}`} className="block text-sm font-semibold text-gray-700 mb-2">
            Available time
          </label>
          <select
            id={`appointment-slot-${service.id}`}
            value={selectedIndex}
            onChange={(event) => setSelectedIndex(Number(event.target.value))}
            className={slotSelectClass}
          >
            {availableSlots.map((slot, index) => (
              <option key={slot.start} value={index}>
                {slot.date} — {slot.time}
              </option>
            ))}
          </select>
        </div>
        <SelectedTimePreview date={selectedSlot.date} time={selectedSlot.time} />
      </div>

      <AppointmentCalendarActions event={calendarEvent} icsFilename={icsFilename} compact />

      <ContactForm
        key={`${service.id}-${selectedSlot.start}`}
        formName={`Tamay - ${service.title} Consultation`}
        submitLabel={service.scheduleCtaLabel}
        showRecaptchaNote={false}
        onSuccess={handleBookingSuccess}
        defaultValues={{
          service: service.title,
          service_category: service.serviceCategory,
          preferred_time: slotLabel,
          appointment_start: selectedSlot.start,
          appointment_end: selectedSlot.end,
          appointment_timezone: SCHEDULING.timezone,
          name: [user.firstName, user.lastName].filter(Boolean).join(" ").trim(),
          email: user.email,
          phone: user.phone ?? "",
        }}
        fields={[
          { name: "service", label: "Consultation service", type: "hidden" },
          { name: "service_category", label: "Service category", type: "hidden" },
          { name: "preferred_time", label: "Preferred time", type: "hidden" },
          { name: "appointment_start", label: "Appointment start (ISO)", type: "hidden" },
          { name: "appointment_end", label: "Appointment end (ISO)", type: "hidden" },
          { name: "appointment_timezone", label: "Appointment timezone", type: "hidden" },
          { name: "name", label: "Name", required: true },
          { name: "email", label: "Email", type: "email", required: true },
          { name: "phone", label: "Phone", type: "tel", required: true },
          {
            name: "message",
            label: "Additional details (optional)",
            type: "textarea",
          },
        ]}
      />
    </div>
  );
}
