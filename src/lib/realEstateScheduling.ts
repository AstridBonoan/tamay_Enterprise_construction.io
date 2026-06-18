import { RENT_LISTINGS, SALE_LISTINGS, type PropertyListing } from "./realEstateListings";

export type ListingKind = "sale" | "rent";

/**
 * Google Calendar Appointment Schedule embed URL.
 * Create one in Google Calendar → Create → Appointment schedule → Share → Website embed.
 * Example: https://calendar.google.com/calendar/appointments/schedules/AcZssZ...?gv=true
 */
export const GOOGLE_CALENDAR_SCHEDULING_URL =
  process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_SCHEDULING_URL ?? "";

export function getAllListingIds(): string[] {
  return [...SALE_LISTINGS, ...RENT_LISTINGS].map((listing) => listing.id);
}

export function getListingById(
  listingId: string,
): { listing: PropertyListing; kind: ListingKind } | null {
  const sale = SALE_LISTINGS.find((listing) => listing.id === listingId);
  if (sale) return { listing: sale, kind: "sale" };

  const rent = RENT_LISTINGS.find((listing) => listing.id === listingId);
  if (rent) return { listing: rent, kind: "rent" };

  return null;
}

export function schedulePagePath(listingId: string): string {
  return `/real-estate/schedule/${listingId}`;
}

export function getSchedulingEmbedUrl(listing: PropertyListing): string | null {
  const url = listing.schedulingUrl?.trim() || GOOGLE_CALENDAR_SCHEDULING_URL.trim();
  return url || null;
}

export function realEstateSectionHref(kind: ListingKind): string {
  return kind === "sale" ? "/real-estate#houses-for-sale" : "/real-estate#houses-for-rent";
}
