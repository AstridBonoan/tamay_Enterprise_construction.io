"use client";

import { useMemo, useState } from "react";
import { ContactForm } from "@/components/ui/ContactForm";
import type { PropertyListing } from "@/lib/realEstateListings";

type PropertyShowingRequestFormProps = {
  listing: PropertyListing;
};

function slotLabel(slot: { date: string; time: string }): string {
  return `${slot.date} · ${slot.time}`;
}

export function PropertyShowingRequestForm({ listing }: PropertyShowingRequestFormProps) {
  const slotOptions = useMemo(
    () => listing.scheduleSlots.map((slot) => slotLabel(slot)),
    [listing.scheduleSlots],
  );
  const [selectedSlot, setSelectedSlot] = useState(slotOptions[0] ?? "");

  return (
    <div className="space-y-6">
      {slotOptions.length > 0 && (
        <fieldset className="space-y-3">
          <legend className="text-sm font-semibold text-tamay-primary mb-1">Select an available time</legend>
          {listing.scheduleSlots.map((slot, index) => {
            const label = slotOptions[index];
            const inputId = `showing-slot-${listing.id}-${index}`;
            return (
              <label
                key={label}
                htmlFor={inputId}
                className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 py-3 px-4 border cursor-pointer transition-colors ${
                  selectedSlot === label
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
                  value={label}
                  checked={selectedSlot === label}
                  onChange={() => setSelectedSlot(label)}
                  className="sr-only"
                />
              </label>
            );
          })}
        </fieldset>
      )}

      <ContactForm
        key={`${listing.id}-${selectedSlot}`}
        formName={`Tamay - ${listing.scheduleCtaLabel}`}
        submitLabel={listing.scheduleCtaLabel}
        defaultValues={{
          property: listing.title,
          property_address: listing.address,
          preferred_time: selectedSlot,
        }}
        fields={[
          { name: "property", label: "Property", type: "hidden" },
          { name: "property_address", label: "Property address", type: "hidden" },
          { name: "preferred_time", label: "Preferred time", type: "hidden" },
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
