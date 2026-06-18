"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { ScheduleSignInPrompt } from "@/components/real-estate/ScheduleSignInPrompt";
import { ShowingCalendarActions } from "@/components/real-estate/ShowingCalendarActions";
import { ContactForm } from "@/components/ui/ContactForm";
import {
  createPropertyBooking,
  fetchBookedSlotStarts,
  SlotAlreadyBookedError,
} from "@/lib/booking-data";
import { buildPropertyShowingEvent, formatSlotLabel } from "@/lib/googleCalendar";
import type { PropertyListing } from "@/lib/realEstateListings";
import { schedulePagePath, type ListingKind } from "@/lib/realEstateScheduling";
import { sitePath } from "@/lib/paths";
import { SCHEDULING } from "@/lib/schedulingConfig";

type PropertyShowingRequestFormProps = {
  listing: PropertyListing;
  kind: ListingKind;
};

export function PropertyShowingRequestForm({ listing, kind }: PropertyShowingRequestFormProps) {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [bookedStarts, setBookedStarts] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const schedulePath = schedulePagePath(listing.id);

  const availableSlots = useMemo(
    () => listing.scheduleSlots.filter((slot) => !bookedStarts.includes(slot.start)),
    [bookedStarts, listing.scheduleSlots],
  );

  const loadBookedSlots = useCallback(async () => {
    setLoadingSlots(true);
    try {
      setBookedStarts(await fetchBookedSlotStarts(listing.id));
    } finally {
      setLoadingSlots(false);
    }
  }, [listing.id]);

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

  if (!user) {
    return (
      <ScheduleSignInPrompt schedulePath={sitePath(schedulePath)} actionLabel={listing.scheduleCtaLabel} />
    );
  }

  if (loadingSlots) {
    return <p className="text-sm text-gray-600">Loading available times...</p>;
  }

  if (!selectedSlot || !calendarEvent || availableSlots.length === 0) {
    return (
      <div className="rounded-sm border border-gray-200 bg-gray-50 px-5 py-6 text-center">
        <p className="text-gray-700 font-medium">No viewing times are available right now.</p>
        <p className="text-sm text-gray-600 mt-2">
          Please check back later or{" "}
          <Link href={sitePath("/real-estate#contact")} className="text-tamay-primary font-semibold hover:underline">
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

    try {
      await createPropertyBooking(user.id, {
        listingId: listing.id,
        listingKind: kind,
        listingTitle: listing.title,
        listingAddress: listing.address,
        appointmentStart: selectedSlot.start,
        appointmentEnd: selectedSlot.end,
        preferredTime: slotLabel,
        notes: notes || undefined,
      });
      router.push(sitePath("/m/bookings"));
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
        key={`${listing.id}-${selectedSlot.start}`}
        formName={`Tamay - ${listing.scheduleCtaLabel}`}
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
          name: [user.firstName, user.lastName].filter(Boolean).join(" ").trim(),
          email: user.email,
          phone: user.phone ?? "",
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
