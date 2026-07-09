import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { PropertyShowingRequestForm } from "@/components/real-estate/PropertyShowingRequestForm";
import {
  ScheduleSlotBookLink,
  ScheduleSlotPreviewInline,
} from "@/components/scheduling/ScheduleSlotPreview";
import type { PropertyListing } from "@/lib/realEstateListings";
import { schedulePagePath, type ListingKind } from "@/lib/realEstateScheduling";
import { SITE } from "@/lib/site";

type PropertyScheduleCalendarProps = {
  listing: PropertyListing;
  kind: ListingKind;
  kindLabel: "For Sale" | "For Rent";
};

export function PropertyScheduleCalendar({ listing, kind, kindLabel }: PropertyScheduleCalendarProps) {
  const bookPath = `${schedulePagePath(listing.id)}#book`;

  return (
    <div className="space-y-8">
      <div className="bg-white border border-gray-200 shadow-sm p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-widest text-tamay-accent mb-2">{kindLabel}</p>
        <h1 className="font-heading text-2xl sm:text-3xl text-tamay-primary font-semibold leading-snug">
          {listing.scheduleCtaLabel}
        </h1>
        <p className="text-gray-700 mt-2">{listing.title}</p>
        <p className="text-gray-600 mt-1">{listing.address}</p>
        <p className="text-tamay-primary font-bold text-xl sm:text-2xl mt-4">{listing.price}</p>
      </div>

      <div className="bg-white border border-gray-200 shadow-sm p-6 sm:p-8">
        <ScheduleSlotPreviewInline serviceKey={listing.id} scheduleLabel={listing.scheduleLabel} />
        <ScheduleSlotBookLink serviceKey={listing.id} bookHref={bookPath} />
        <p className="text-sm text-gray-500 mt-4">
          Select a time below — your appointment will be saved to your Bookings dashboard.
        </p>
      </div>

      <div id="book" className="bg-white border border-gray-200 shadow-sm p-6 sm:p-8 scroll-mt-24">
        <h2 className="font-heading text-lg text-tamay-primary font-semibold mb-2">
          Choose an available time
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          Pick a time and confirm your request. Your appointment will be saved to your Bookings
          dashboard. Booked times are removed automatically for other visitors.
        </p>
        <div className="space-y-6">
          <PropertyShowingRequestForm listing={listing} kind={kind} />
          <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Button href={SITE.phoneTel} variant="outline">
              Call {SITE.phone}
            </Button>
          </div>
        </div>
      </div>

      <p className="text-center">
        <Link href="/real-estate/" className="text-tamay-primary font-semibold hover:underline text-sm">
          ← Back to Real Estate
        </Link>
      </p>
    </div>
  );
}
