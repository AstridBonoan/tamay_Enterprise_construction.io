import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { PropertyShowingRequestForm } from "@/components/real-estate/PropertyShowingRequestForm";
import type { PropertyListing } from "@/lib/realEstateListings";
import { sitePath } from "@/lib/paths";
import {
  getSchedulingBookingUrl,
  getSchedulingEmbedUrl,
  isAppointmentScheduleEnabled,
  type ListingKind,
} from "@/lib/realEstateScheduling";
import { SITE } from "@/lib/site";

type PropertyScheduleCalendarProps = {
  listing: PropertyListing;
  kind: ListingKind;
  kindLabel: "For Sale" | "For Rent";
};

export function PropertyScheduleCalendar({ listing, kind, kindLabel }: PropertyScheduleCalendarProps) {
  const appointmentScheduleEnabled = isAppointmentScheduleEnabled(listing);
  const embedUrl = appointmentScheduleEnabled ? getSchedulingEmbedUrl(listing) : null;
  const bookingUrl = embedUrl ? getSchedulingBookingUrl(listing) : null;

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

      {listing.scheduleSlots.length > 0 && (
        <div className="bg-white border border-gray-200 shadow-sm p-6 sm:p-8">
          <h2 className="font-heading text-lg text-tamay-primary font-semibold mb-4">
            {listing.scheduleLabel}
          </h2>
          <ul className="space-y-3">
            {listing.scheduleSlots.map((slot) => (
              <li
                key={slot.start}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 py-3 px-4 bg-gray-50 border border-gray-100"
              >
                <span className="font-medium text-gray-800">{slot.date}</span>
                <span className="text-gray-600 text-sm sm:text-base">{slot.time}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-gray-500 mt-4">
            {appointmentScheduleEnabled
              ? "Choose a time below to book directly through Google Calendar."
              : "Select a time below — your date and time will pre-fill a Google Calendar event when you book."}
          </p>
        </div>
      )}

      <div id="book" className="bg-white border border-gray-200 shadow-sm p-6 sm:p-8 scroll-mt-24">
        <h2 className="font-heading text-lg text-tamay-primary font-semibold mb-2">
          Choose an available time
        </h2>

        {appointmentScheduleEnabled && embedUrl ? (
          <>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Book a showing through our Google Calendar appointment schedule. You&apos;ll receive a
              confirmation email after booking.
            </p>
            <div className="space-y-4">
              {bookingUrl && (
                <p className="text-sm text-gray-600">
                  Prefer to book in a new tab?{" "}
                  <a
                    href={bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-tamay-primary font-semibold hover:underline"
                  >
                    Open Google Calendar scheduling
                  </a>
                </p>
              )}
              <div className="rounded-sm overflow-hidden border border-gray-200 bg-gray-50">
                <iframe
                  title={`Schedule a showing for ${listing.title}`}
                  src={embedUrl}
                  className="w-full min-h-[600px] border-0"
                  loading="lazy"
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Pick a time and confirm your request. Your appointment will be saved to your Bookings
              dashboard with any other consultations or services you schedule. Booked times are removed
              automatically for other visitors.
            </p>
            <div className="space-y-6">
              <PropertyShowingRequestForm listing={listing} kind={kind} />
              <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <Button href={SITE.phoneTel} variant="outline">
                  Call {SITE.phone}
                </Button>
              </div>
            </div>
          </>
        )}
      </div>

      <p className="text-center">
        <Link href={sitePath("/real-estate")} className="text-tamay-primary font-semibold hover:underline text-sm">
          ← Back to Real Estate
        </Link>
      </p>
    </div>
  );
}
