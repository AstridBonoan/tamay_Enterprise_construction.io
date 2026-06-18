"use client";

import { Button } from "@/components/ui/Button";
import {
  buildGoogleCalendarEventUrl,
  buildIcsFileContent,
  downloadIcsFile,
  type CalendarEventInput,
  icsFilenameForShowing,
} from "@/lib/googleCalendar";
import type { PropertyListing, PropertyScheduleSlot } from "@/lib/realEstateListings";

type ShowingCalendarActionsProps = {
  event: CalendarEventInput;
  listing: PropertyListing;
  slot: PropertyScheduleSlot;
  compact?: boolean;
};

export function ShowingCalendarActions({ event, listing, slot, compact = false }: ShowingCalendarActionsProps) {
  const googleUrl = buildGoogleCalendarEventUrl(event);
  const icsFilename = icsFilenameForShowing(listing, slot);

  const handleDownloadIcs = () => {
    downloadIcsFile(buildIcsFileContent(event), icsFilename);
  };

  if (compact) {
    return (
      <div className="flex flex-col sm:flex-row gap-3">
        <Button href={googleUrl} external variant="outline" className="flex-1">
          Add to Google Calendar
        </Button>
        <button
          type="button"
          onClick={handleDownloadIcs}
          className="flex-1 inline-block font-bold text-sm tracking-wide px-6 py-3 transition-colors text-center border-2 border-tamay-primary text-tamay-primary hover:bg-tamay-primary hover:text-white"
        >
          Download .ics invite
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-sm border border-tamay-primary/20 bg-tamay-primary/5 px-5 py-5 text-left max-w-md mx-auto">
      <p className="font-heading text-base font-semibold text-tamay-primary">Add this showing to your calendar</p>
      <p className="mt-2 text-sm text-gray-600 leading-relaxed">
        Your selected date and time are pre-filled. Our team will confirm your appointment by email or phone.
      </p>
      <div className="mt-4 flex flex-col gap-3">
        <Button href={googleUrl} external variant="primary">
          Add to Google Calendar
        </Button>
        <button
          type="button"
          onClick={handleDownloadIcs}
          className="w-full inline-block font-bold text-sm tracking-wide px-6 py-3 transition-colors text-center border-2 border-tamay-primary text-tamay-primary hover:bg-tamay-primary hover:text-white"
        >
          Download calendar invite (.ics)
        </button>
      </div>
    </div>
  );
}
