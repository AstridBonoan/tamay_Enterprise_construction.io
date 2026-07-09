"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AppointmentCalendarActions } from "@/components/appointments/AppointmentCalendarActions";
import { useAuth } from "@/components/auth/AuthProvider";
import { ScheduleSignInPrompt } from "@/components/real-estate/ScheduleSignInPrompt";
import { ContactForm } from "@/components/ui/ContactForm";
import {
  createGuestServiceBooking,
  createServiceBooking,
  fetchBookedAppointmentStarts,
  SlotAlreadyBookedError,
  userHasActiveServiceBooking,
} from "@/lib/booking-data";
import {
  buildServiceConsultationEvent,
  formatSlotLabel,
  icsFilenameForAppointment,
} from "@/lib/googleCalendar";
import type { OnlineAppointmentService } from "@/lib/onlineAppointments";
import { appointmentSchedulePath } from "@/lib/onlineAppointments";
import { sitePath } from "@/lib/paths";
import { SCHEDULING } from "@/lib/schedulingConfig";
import { SITE } from "@/lib/site";
import { syncBookingToGoogleCalendar } from "@/lib/syncBookingCalendar";
import { useScheduleSlots } from "@/hooks/useScheduleSlots";

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

function BookingSentConfirmation({
  serviceTitle,
  preferredTime,
  showBookingsLink,
}: {
  serviceTitle: string;
  preferredTime: string;
  showBookingsLink: boolean;
}) {
  return (
    <div className="max-w-md rounded-sm border border-green-200 bg-green-50 px-5 py-6 text-center space-y-4">
      <p className="font-heading text-lg font-semibold text-tamay-primary">Request sent</p>
      <p className="text-sm text-gray-600 leading-relaxed">
        Your {serviceTitle} consultation request for <span className="font-medium text-gray-800">{preferredTime}</span>{" "}
        was sent. Our team will confirm by email or phone.
      </p>
      {showBookingsLink && (
        <Link
          href={sitePath("/m/bookings")}
          className="inline-flex items-center justify-center rounded-full bg-tamay-primary hover:bg-tamay-primary-dark text-white font-bold text-sm tracking-widest px-8 py-3 transition-colors"
        >
          View my bookings
        </Link>
      )}
      <p className="text-sm">
        <Link href={sitePath("/online-appointments")} className="text-tamay-primary font-semibold hover:underline">
          ← Back to Online Appointments
        </Link>
      </p>
    </div>
  );
}

export function ServiceAppointmentForm({ service }: ServiceAppointmentFormProps) {
  const { user, loading: authLoading } = useAuth();
  const [guestMode, setGuestMode] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [confirmedTimeLabel, setConfirmedTimeLabel] = useState("");
  const { slots: scheduleSlots, loading: loadingScheduleSlots, reload: reloadScheduleSlots } =
    useScheduleSlots(service.id);
  const [bookedStarts, setBookedStarts] = useState<string[]>([]);
  const [loadingBooked, setLoadingBooked] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const schedulePath = sitePath(`${appointmentSchedulePath(service.id)}#book`);
  const canBook = Boolean(user) || guestMode;
  const loadingSlots = loadingScheduleSlots || loadingBooked;

  const availableSlots = useMemo(
    () => scheduleSlots.filter((slot) => !bookedStarts.includes(slot.start)),
    [bookedStarts, scheduleSlots],
  );

  const loadBookedSlots = useCallback(async () => {
    setLoadingBooked(true);
    try {
      setBookedStarts(await fetchBookedAppointmentStarts(service.id));
    } finally {
      setLoadingBooked(false);
    }
  }, [service.id]);

  const loadSlots = useCallback(async () => {
    await Promise.all([reloadScheduleSlots(), loadBookedSlots()]);
  }, [loadBookedSlots, reloadScheduleSlots]);

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

  if (!canBook) {
    return (
      <ScheduleSignInPrompt
        schedulePath={schedulePath}
        actionLabel={service.scheduleCtaLabel}
        onContinueAsGuest={() => setGuestMode(true)}
      />
    );
  }

  if (bookingComplete) {
    return (
      <BookingSentConfirmation
        serviceTitle={service.title}
        preferredTime={confirmedTimeLabel || "your selected time"}
        showBookingsLink={Boolean(user) && !guestMode}
      />
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
  const memberName = user ? [user.firstName, user.lastName].filter(Boolean).join(" ").trim() : "";
  const memberEmail = user?.email ?? "";
  const memberPhone = user?.phone ?? "";

  const bookingFields = [
    { name: "service", label: "Consultation service", type: "hidden" as const },
    { name: "service_category", label: "Service category", type: "hidden" as const },
    { name: "preferred_time", label: "Preferred time", type: "hidden" as const },
    { name: "appointment_start", label: "Appointment start (ISO)", type: "hidden" as const },
    { name: "appointment_end", label: "Appointment end (ISO)", type: "hidden" as const },
    { name: "appointment_timezone", label: "Appointment timezone", type: "hidden" as const },
    { name: "booking_as_guest", label: "Guest booking", type: "hidden" as const },
    ...(guestMode
      ? [
          { name: "name", label: "Name", required: true as const },
          { name: "email", label: "Email", type: "email" as const, required: true as const },
          { name: "phone", label: "Phone", type: "tel" as const, required: true as const },
        ]
      : [
          { name: "name", label: "Name", type: "hidden" as const },
          { name: "email", label: "Email", type: "hidden" as const },
          { name: "phone", label: "Phone", type: "hidden" as const },
        ]),
    {
      name: "message",
      label: "Additional details (optional)",
      type: "textarea" as const,
    },
  ];

  const handleBookingSuccess = async (formData: FormData) => {
    const notes = String(formData.get("message") ?? "").trim();
    const bookingInput = {
      bookingType: "consultation" as const,
      serviceCategory: service.serviceCategory,
      serviceId: service.id,
      title: `${service.title} consultation`,
      subtitle: SITE.address,
      appointmentStart: selectedSlot.start,
      appointmentEnd: selectedSlot.end,
      preferredTime: slotLabel,
      notes: notes || undefined,
    };

    try {
      if (guestMode) {
        try {
          await createGuestServiceBooking(bookingInput);
        } catch (err) {
          if (err instanceof SlotAlreadyBookedError) {
            await loadSlots();
            throw err;
          }
          console.warn("Guest booking saved via email only:", err);
        }
        if (calendarEvent) {
          void syncBookingToGoogleCalendar({
            ...calendarEvent,
            customerName: String(formData.get("name") ?? "").trim() || undefined,
            customerEmail: String(formData.get("email") ?? "").trim() || undefined,
          });
        }
        setConfirmedTimeLabel(slotLabel);
        setBookingComplete(true);
        return;
      }

      if (!user) return;

      try {
        await createServiceBooking(user.id, bookingInput);
      } catch (err) {
        if (err instanceof SlotAlreadyBookedError) {
          // Same user re-submitting an already-saved booking should still see success.
          if (await userHasActiveServiceBooking(user.id, service.id, selectedSlot.start)) {
            setConfirmedTimeLabel(slotLabel);
            setBookingComplete(true);
            return;
          }
          await loadSlots();
          throw err;
        }
        throw err;
      }

      if (calendarEvent) {
        void syncBookingToGoogleCalendar({
          ...calendarEvent,
          customerName: memberName || undefined,
          customerEmail: memberEmail || undefined,
        });
      }
      setConfirmedTimeLabel(slotLabel);
      setBookingComplete(true);
    } catch (err) {
      if (err instanceof SlotAlreadyBookedError) {
        await loadSlots();
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
        key={`${service.id}-${selectedSlot.start}-${guestMode ? "guest" : "member"}`}
        formName={`Tamay - ${service.title} Consultation${guestMode ? " (Guest)" : ""}`}
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
          booking_as_guest: guestMode ? "Yes" : "No",
          name: guestMode ? "" : memberName,
          email: guestMode ? "" : memberEmail,
          phone: guestMode ? "" : memberPhone,
        }}
        fields={bookingFields}
      />
    </div>
  );
}
