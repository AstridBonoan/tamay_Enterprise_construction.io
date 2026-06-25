import { RENT_LISTINGS, SALE_LISTINGS, type PropertyListing } from "./realEstateListings";
import { isGoogleAppointmentScheduleConfigured, SCHEDULING } from "./schedulingConfig";

export type ListingKind = "sale" | "rent";

/** @deprecated Use SCHEDULING.googleAppointmentEmbedUrl from schedulingConfig. */
export const GOOGLE_CALENDAR_SCHEDULING_URL = SCHEDULING.googleAppointmentEmbedUrl;

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
  const url = listing.schedulingUrl?.trim() || SCHEDULING.googleAppointmentEmbedUrl.trim();
  return url || null;
}

export function isAppointmentScheduleEnabled(listing?: PropertyListing): boolean {
  if (listing?.schedulingUrl?.trim()) return true;
  return isGoogleAppointmentScheduleConfigured();
}

/** Public booking page URL (opens Google Calendar appointment flow in a new tab). */
export function getSchedulingBookingUrl(listing: PropertyListing): string | null {
  const embedUrl = getSchedulingEmbedUrl(listing);
  if (!embedUrl) return null;
  return embedUrl.replace("?gv=true", "").replace("&gv=true", "");
}

export function realEstateSectionHref(kind: ListingKind): string {
  return kind === "sale" ? "/real-estate/#houses-for-sale" : "/real-estate/#houses-for-rent";
}
