"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { ScheduleSignInPrompt } from "@/components/real-estate/ScheduleSignInPrompt";
import { ShowingCalendarActions } from "@/components/real-estate/ShowingCalendarActions";
import { ContactForm } from "@/components/ui/ContactForm";
import {
  createGuestPropertyBooking,
  createPropertyBooking,
  fetchBookedSlotStarts,
  SlotAlreadyBookedError,
} from "@/lib/booking-data";
import { buildPropertyShowingEvent, formatSlotLabel } from "@/lib/googleCalendar";
import type { PropertyListing } from "@/lib/realEstateListings";
import { schedulePagePath, type ListingKind } from "@/lib/realEstateScheduling";
import { sitePath } from "@/lib/paths";
import { SCHEDULING } from "@/lib/schedulingConfig";
import { syncBookingToGoogleCalendar } from "@/lib/syncBookingCalendar";
import { useScheduleSlots } from "@/hooks/useScheduleSlots";

type PropertyShowingRequestFormProps = {
  listing: PropertyListing;
  kind: ListingKind;
};

function ShowingSentConfirmation({
  listingTitle,
  preferredTime,
  showBookingsLink,
}: {
  listingTitle: string;
  preferredTime: string;
  showBookingsLink: boolean;
}) {
  return (
    <div className="max-w-md rounded-sm border border-green-200 bg-green-50 px-5 py-6 text-center space-y-4">
      <p className="font-heading text-lg font-semibold text-tamay-primary">Request sent</p>
      <p className="text-sm text-gray-600 leading-relaxed">
        Your showing request for <span className="font-medium text-gray-800">{listingTitle}</span> on{" "}
        <span className="font-medium text-gray-800">{preferredTime}</span> was sent. Our team will confirm by
        email or phone.
      </p>
      {showBookingsLink ? (
        <Link
          href={sitePath("/m/bookings")}
          className="inline-flex items-center justify-center rounded-full bg-tamay-primary hover:bg-tamay-primary-dark text-white font-bold text-sm tracking-widest px-8 py-3 transition-colors"
        >
          View my bookings
        </Link>
      ) : null}
      <p className="text-sm">
        <Link href={sitePath("/real-estate")} className="text-tamay-primary font-semibold hover:underline">
          ← Back to Real Estate
        </Link>
      </p>
    </div>
  );
}

export function PropertyShowingRequestForm({ listing, kind }: PropertyShowingRequestFormProps) {
  const { user, loading: authLoading } = useAuth();
  const { slots: scheduleSlots, loading: loadingScheduleSlots, reload: reloadScheduleSlots } =
    useScheduleSlots(listing.id);
  const [guestMode, setGuestMode] = useState(false);
  const [bookedStarts, setBookedStarts] = useState<string[]>([]);
  const [loadingBooked, setLoadingBooked] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [confirmedTimeLabel, setConfirmedTimeLabel] = useState("");

  const schedulePath = sitePath(`${schedulePagePath(listing.id)}#book`);
  const canBook = Boolean(user) || guestMode;
  const loadingSlots = loadingScheduleSlots || loadingBooked;

  const availableSlots = useMemo(
    () => scheduleSlots.filter((slot) => !bookedStarts.includes(slot.start)),
    [bookedStarts, scheduleSlots],
  );

  const loadBookedSlots = useCallback(async () => {
    setLoadingBooked(true);
    try {
      setBookedStarts(await fetchBookedSlotStarts(listing.id));
    } finally {
      setLoadingBooked(false);
    }
  }, [listing.id]);

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
    return buildPropertyShowingEvent(listing, selectedSlot, kind);
  }, [kind, listing, selectedSlot]);

  if (authLoading) {
    return <p className="text-sm text-gray-600">Loading...</p>;
  }

  if (!canBook) {
    return (
      <ScheduleSignInPrompt
        schedulePath={schedulePath}
        actionLabel={listing.scheduleCtaLabel}
        onContinueAsGuest={() => setGuestMode(true)}
      />
    );
  }

  if (loadingSlots) {
    return <p className="text-sm text-gray-600">Loading available times...</p>;
  }

  if (bookingComplete) {
    return (
      <ShowingSentConfirmation
        listingTitle={listing.title}
        preferredTime={confirmedTimeLabel || "your selected time"}
        showBookingsLink={Boolean(user) && !guestMode}
      />
    );
  }

  if (!selectedSlot || !calendarEvent || availableSlots.length === 0) {
    return (
      <div className="rounded-sm border border-gray-200 bg-gray-50 px-5 py-6 text-center">
        <p className="text-gray-700 font-medium">No viewing times are available right now.</p>
        <p className="text-sm text-gray-600 mt-2">
          Please check back later or{" "}
          <Link href="/real-estate/#consultation" className="text-tamay-primary font-semibold hover:underline">
            contact our team
          </Link>
          .
        </p>
      </div>
    );
  }

  const slotLabel = formatSlotLabel(selectedSlot);

  const handleBookingSuccess = async (formData: FormData) => {
    const notes = String(formData.get("message") ?? "").trim();

    const bookingInput = {
      listingId: listing.id,
      listingKind: kind,
      listingTitle: listing.title,
      listingAddress: listing.address,
      appointmentStart: selectedSlot.start,
      appointmentEnd: selectedSlot.end,
      preferredTime: slotLabel,
      notes: notes || undefined,
    };

    try {
      if (guestMode) {
        try {
          await createGuestPropertyBooking(bookingInput);
        } catch (err) {
          if (err instanceof SlotAlreadyBookedError) {
            await loadSlots();
            throw err;
          }
          console.warn("Guest showing saved via email only:", err);
          setConfirmedTimeLabel(slotLabel);
          setBookingComplete(true);
          return;
        }
        void syncBookingToGoogleCalendar({
          listingId: listing.id,
          appointmentStart: selectedSlot.start,
        });
        setConfirmedTimeLabel(slotLabel);
        setBookingComplete(true);
        return;
      }

      if (!user) return;

      await createPropertyBooking(user.id, bookingInput);
      if (calendarEvent) {
        void syncBookingToGoogleCalendar({
          listingId: listing.id,
          appointmentStart: selectedSlot.start,
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
      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold text-tamay-primary mb-1">Select an available time</legend>
        {availableSlots.map((slot, index) => {
          const inputId = `showing-slot-${listing.id}-${index}`;
          return (
            <label
              key={slot.start}
              htmlFor={inputId}
              className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 py-3 px-4 border cursor-pointer transition-colors ${
                selectedIndex === index
                  ? "border-tamay-primary bg-tamay-primary/5"
                  : "border-gray-100 bg-gray-50 hover:border-gray-300"
              }`}
            >
              <span className="font-medium text-gray-800">{slot.date}</span>
              <span className="text-gray-600 text-sm sm:text-base">{slot.time}</span>
              <input
                id={inputId}
                type="radio"
                name="preferred-showing-time"
                checked={selectedIndex === index}
                onChange={() => setSelectedIndex(index)}
                className="sr-only"
              />
            </label>
          );
        })}
      </fieldset>

      <ShowingCalendarActions event={calendarEvent} listing={listing} slot={selectedSlot} compact />

      <ContactForm
        key={`${listing.id}-${selectedSlot.start}-${guestMode ? "guest" : "member"}`}
        formName={`Tamay - ${listing.scheduleCtaLabel}${guestMode ? " (Guest)" : ""}`}
        submitLabel={listing.scheduleCtaLabel}
        showRecaptchaNote={false}
        onSuccess={handleBookingSuccess}
        defaultValues={{
          property: listing.title,
          property_address: listing.address,
          preferred_time: slotLabel,
          appointment_start: selectedSlot.start,
          appointment_end: selectedSlot.end,
          appointment_timezone: SCHEDULING.timezone,
          name: guestMode ? "" : [user?.firstName, user?.lastName].filter(Boolean).join(" ").trim(),
          email: guestMode ? "" : (user?.email ?? ""),
          phone: guestMode ? "" : (user?.phone ?? ""),
        }}
        fields={[
          { name: "property", label: "Property", type: "hidden" },
          { name: "property_address", label: "Property address", type: "hidden" },
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
