import { RENT_LISTINGS, SALE_LISTINGS, type PropertyListing } from "./realEstateListings";

export type ListingKind = "sale" | "rent";

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

export function realEstateSectionHref(kind: ListingKind): string {
  return kind === "sale" ? "/real-estate/#houses-for-sale" : "/real-estate/#houses-for-rent";
}
