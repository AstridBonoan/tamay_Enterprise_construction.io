"use client";

import { useMemo, useState } from "react";
import { ContactForm } from "@/components/ui/ContactForm";
import { ShowingCalendarActions } from "@/components/real-estate/ShowingCalendarActions";
import { buildPropertyShowingEvent, formatSlotLabel } from "@/lib/googleCalendar";
import type { PropertyListing } from "@/lib/realEstateListings";
import type { ListingKind } from "@/lib/realEstateScheduling";
import { SCHEDULING } from "@/lib/schedulingConfig";

type PropertyShowingRequestFormProps = {
  listing: PropertyListing;
  kind: ListingKind;
};

export function PropertyShowingRequestForm({ listing, kind }: PropertyShowingRequestFormProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedSlot = listing.scheduleSlots[selectedIndex] ?? listing.scheduleSlots[0];
  const calendarEvent = useMemo(() => {
    if (!selectedSlot) return null;
    return buildPropertyShowingEvent(listing, selectedSlot, kind);
  }, [kind, listing, selectedSlot]);

  if (!selectedSlot || !calendarEvent) {
    return null;
  }

  const slotLabel = formatSlotLabel(selectedSlot);

  return (
    <div className="space-y-6">
      {listing.scheduleSlots.length > 0 && (
        <fieldset className="space-y-3">
          <legend className="text-sm font-semibold text-tamay-primary mb-1">Select an available time</legend>
          {listing.scheduleSlots.map((slot, index) => {
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
      )}

      <ShowingCalendarActions
        event={calendarEvent}
        listing={listing}
        slot={selectedSlot}
        compact
      />

      <ContactForm
        key={`${listing.id}-${selectedSlot.start}`}
        formName={`Tamay - ${listing.scheduleCtaLabel}`}
        submitLabel={listing.scheduleCtaLabel}
        successMessage="Your showing request was sent. Add the appointment to your calendar below while our team confirms."
        successExtra={
          <ShowingCalendarActions event={calendarEvent} listing={listing} slot={selectedSlot} />
        }
        defaultValues={{
          property: listing.title,
          property_address: listing.address,
          preferred_time: slotLabel,
          appointment_start: selectedSlot.start,
          appointment_end: selectedSlot.end,
          appointment_timezone: SCHEDULING.timezone,
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
