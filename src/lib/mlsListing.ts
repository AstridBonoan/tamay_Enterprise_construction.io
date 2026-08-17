import type { PropertyListing } from "@/lib/realEstateListings";

export type MlsFact = {
  label: string;
  value: string;
};

export type MlsRoom = {
  name: string;
  level: string;
  features?: string;
};

export type MlsListingDetails = {
  propertyType: string;
  county?: string;
  neighborhood?: string;
  acres?: number;
  yearBuilt?: number;
  roomsCount?: number;
  propertyInfo: MlsFact[];
  schools: MlsFact[];
  rooms: MlsRoom[];
  interior: MlsFact[];
  exterior: MlsFact[];
  utilities: MlsFact[];
  listingInfo: MlsFact[];
};

/** SmartMLS-style baths, e.g. 2.5 → "2/1". */
export function formatMlsBaths(baths: number): string {
  const full = Math.floor(baths);
  const half = Math.round((baths % 1) * 2);
  return `${full}/${half}`;
}

export function listingBasicsLine(listing: PropertyListing): string {
  const acres = listing.mls?.acres;
  return [
    `${listing.beds} Beds`,
    `${formatMlsBaths(listing.baths)} Baths`,
    listing.sqft ? `${listing.sqft.toLocaleString()} SqFt` : null,
    acres != null ? `${acres} Acres` : null,
  ]
    .filter(Boolean)
    .join(" · ");
}

export function listingTypeLine(listing: PropertyListing): string {
  const mls = listing.mls;
  if (!mls) return "";
  return [mls.propertyType, mls.neighborhood, mls.county ? `${mls.county} County` : null]
    .filter(Boolean)
    .join(" · ");
}
