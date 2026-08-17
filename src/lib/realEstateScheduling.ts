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

export function propertyPagePath(listingId: string): string {
  return `/real-estate/properties/${listingId}`;
}

export function realEstateSectionHref(kind: ListingKind): string {
  return kind === "sale" ? "/real-estate/#houses-for-sale" : "/real-estate/#houses-for-rent";
}

export type PublicPropertyListing = PropertyListing & {
  kind: ListingKind;
  kindLabel: "For Sale" | "For Rent";
  statusLabel: "Available";
};

export function getPublicPropertyListings(): PublicPropertyListing[] {
  return [
    ...SALE_LISTINGS.map((listing) => ({
      ...listing,
      kind: "sale" as const,
      kindLabel: "For Sale" as const,
      statusLabel: "Available" as const,
    })),
    ...RENT_LISTINGS.map((listing) => ({
      ...listing,
      kind: "rent" as const,
      kindLabel: "For Rent" as const,
      statusLabel: "Available" as const,
    })),
  ];
}

export function getPublicListingById(listingId: string): PublicPropertyListing | null {
  return getPublicPropertyListings().find((listing) => listing.id === listingId) ?? null;
}

export function listingPreviewSlides(listing: PropertyListing) {
  return [{ src: listing.image, alt: listing.imageAlt }];
}
