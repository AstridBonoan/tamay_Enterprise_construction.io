import type { PropertyListing, PropertyScheduleSlot } from "./realEstateListings";
import type { ListingKind } from "./realEstateScheduling";
import { SCHEDULING } from "./schedulingConfig";

export type CalendarEventInput = {
  title: string;
  startIso: string;
  endIso: string;
  location: string;
  description?: string;
  timezone?: string;
};

/** Local datetime without offset, e.g. 2026-06-14T11:00:00 → 20260614T110000 */
export function toGoogleCalendarDateTime(isoLocal: string): string {
  const [datePart, timePart] = isoLocal.split("T");
  if (!datePart || !timePart) {
    throw new Error(`Invalid local ISO datetime: ${isoLocal}`);
  }

  const [year, month, day] = datePart.split("-");
  const [hour, minute, second = "00"] = timePart.split(":");
  return `${year}${month}${day}T${hour}${minute}${second.slice(0, 2)}`;
}

export function buildGoogleCalendarEventUrl(event: CalendarEventInput): string {
  const timezone = event.timezone ?? SCHEDULING.timezone;
  const start = toGoogleCalendarDateTime(event.startIso);
  const end = toGoogleCalendarDateTime(event.endIso);

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${start}/${end}`,
    ctz: timezone,
  });

  if (event.location) params.set("location", event.location);
  if (event.description) params.set("details", event.description);

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function escapeIcsValue(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

function foldIcsLine(line: string): string {
  const maxLength = 75;
  if (line.length <= maxLength) return line;

  const parts = [line.slice(0, maxLength)];
  let index = maxLength;
  while (index < line.length) {
    parts.push(` ${line.slice(index, index + maxLength - 1)}`);
    index += maxLength - 1;
  }
  return parts.join("\r\n");
}

export function buildIcsFileContent(event: CalendarEventInput): string {
  const timezone = event.timezone ?? SCHEDULING.timezone;
  const start = toGoogleCalendarDateTime(event.startIso);
  const end = toGoogleCalendarDateTime(event.endIso);
  const uid = `${start}-${event.title.replace(/\s+/g, "-").toLowerCase()}@tamayenterprises.com`;
  const dtstamp = new Date()
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}Z$/, "Z");

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Tamay Enterprises//Property Showing//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART;TZID=${timezone}:${start}`,
    `DTEND;TZID=${timezone}:${end}`,
    foldIcsLine(`SUMMARY:${escapeIcsValue(event.title)}`),
    foldIcsLine(`LOCATION:${escapeIcsValue(event.location)}`),
  ];

  if (event.description) {
    lines.push(foldIcsLine(`DESCRIPTION:${escapeIcsValue(event.description)}`));
  }

  if (SCHEDULING.organizerEmail) {
    lines.push(`ORGANIZER;CN=Tamay Enterprises:mailto:${SCHEDULING.organizerEmail}`);
  }

  lines.push("END:VEVENT", "END:VCALENDAR");
  return `${lines.join("\r\n")}\r\n`;
}

export function downloadIcsFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function formatSlotLabel(slot: PropertyScheduleSlot): string {
  return `${slot.date} · ${slot.time}`;
}

export function buildPropertyShowingEvent(
  listing: PropertyListing,
  slot: PropertyScheduleSlot,
  kind: ListingKind,
): CalendarEventInput {
  const eventLabel = kind === "sale" ? "Private showing" : "Property viewing";

  return {
    title: `${eventLabel}: ${listing.title}`,
    startIso: slot.start,
    endIso: slot.end,
    location: listing.address,
    timezone: SCHEDULING.timezone,
    description: [
      listing.scheduleCtaLabel,
      `Property: ${listing.title}`,
      `Price: ${listing.price}`,
      `Address: ${listing.address}`,
      `When: ${formatSlotLabel(slot)} (${SCHEDULING.timezone})`,
      "",
      "Requested via Tamay Enterprises website.",
    ].join("\n"),
  };
}

export function icsFilenameForShowing(listing: PropertyListing, slot: PropertyScheduleSlot): string {
  const slug = listing.id.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
  const date = slot.start.slice(0, 10);
  return `tamay-showing-${slug}-${date}.ics`;
}
