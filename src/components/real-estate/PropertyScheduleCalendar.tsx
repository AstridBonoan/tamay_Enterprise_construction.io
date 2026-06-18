"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import type { PropertyListing } from "@/lib/realEstateListings";
import { getSchedulingEmbedUrl } from "@/lib/realEstateScheduling";
import { SITE } from "@/lib/site";

type PropertyScheduleCalendarProps = {
  listing: PropertyListing;
  kindLabel: "For Sale" | "For Rent";
};

export function PropertyScheduleCalendar({ listing, kindLabel }: PropertyScheduleCalendarProps) {
  const embedUrl = getSchedulingEmbedUrl(listing);

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
                key={`${slot.date}-${slot.time}`}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 py-3 px-4 bg-gray-50 border border-gray-100"
              >
                <span className="font-medium text-gray-800">{slot.date}</span>
                <span className="text-gray-600 text-sm sm:text-base">{slot.time}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-gray-500 mt-4">
            Open house times are walk-in friendly. For another time, choose an available slot below.
          </p>
        </div>
      )}

      <div className="bg-white border border-gray-200 shadow-sm p-6 sm:p-8">
        <h2 className="font-heading text-lg text-tamay-primary font-semibold mb-2">
          Choose an available time
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          Select a time that works for you. Appointments sync with our Google Calendar — you&apos;ll receive
          a confirmation after booking.
        </p>

        {embedUrl ? (
          <div className="rounded-sm overflow-hidden border border-gray-200 bg-gray-50">
            <iframe
              title={`Schedule a showing for ${listing.title}`}
              src={embedUrl}
              className="w-full min-h-[600px] border-0"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="rounded-sm border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center">
            <p className="text-gray-700 font-medium mb-2">Online scheduling is being set up.</p>
            <p className="text-sm text-gray-600 leading-relaxed max-w-md mx-auto mb-6">
              Please contact our team to arrange a showing for this property. Include the property address
              in your message.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button href="/real-estate#contact" variant="primary">
                Contact an agent
              </Button>
              <Button href={SITE.phoneTel} variant="outline">
                Call {SITE.phone}
              </Button>
            </div>
          </div>
        )}
      </div>

      <p className="text-center">
        <Link href="/real-estate" className="text-tamay-primary font-semibold hover:underline text-sm">
          ← Back to Real Estate
        </Link>
      </p>
    </div>
  );
}
