"use client";

import { ContactForm } from "@/components/ui/ContactForm";
import type { PublicPropertyListing } from "@/lib/realEstateScheduling";

export function PropertyInformationRequest({ listing }: { listing: PublicPropertyListing }) {
  return (
    <div>
      <h2 className="font-heading text-xl text-tamay-primary font-semibold mb-2">Request Property Information</h2>
      <p className="text-sm text-gray-600 mb-4">
        Ask our Real Estate team about this property. The listing is included automatically with your message.
      </p>
      <ContactForm
        formName={`Tamay - Property Information Request - ${listing.title}`}
        submitLabel="Request Property Information"
        defaultValues={{
          property: listing.title,
          property_id: listing.id,
          property_address: listing.address,
          listing_kind: listing.kindLabel,
        }}
        fields={[
          { name: "property_id", label: "Property ID", type: "hidden" },
          { name: "property", label: "Property", type: "hidden" },
          { name: "property_address", label: "Property address", type: "hidden" },
          { name: "listing_kind", label: "Listing type", type: "hidden" },
          { name: "name", label: "Name", required: true },
          { name: "email", label: "Email", type: "email", required: true },
          { name: "phone", label: "Phone", type: "tel", required: true },
          {
            name: "message",
            label: "What would you like to know?",
            type: "textarea",
            required: true,
          },
        ]}
      />
    </div>
  );
}
