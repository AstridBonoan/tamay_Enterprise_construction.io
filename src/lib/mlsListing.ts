import type { PropertyListing } from "@/lib/realEstateListings";

export type MlsListingDetails = {
  propertyType: string;
  style?: string;
  neighborhood?: string;
  acres?: number;
  yearBuilt?: number;
  parking?: string;
  taxes?: string;
  leaseTerm?: string;
  interior: string[];
  appliances: string[];
  basement?: string;
  laundry?: string;
  exterior: string[];
  heat?: string;
  cooling?: string;
  water?: string;
  sewer?: string;
  utilitiesNotes?: string[];
  schools: {
    elementary?: string;
    middle?: string;
    high?: string;
  };
  nearby: string[];
};

export function formatBaths(baths: number): string {
  return Number.isInteger(baths) ? String(baths) : baths.toFixed(1).replace(/\.0$/, "");
}

export function listingBasicsLine(listing: PropertyListing): string {
  const acres = listing.mls?.acres;
  return [
    `${listing.beds} bed`,
    `${formatBaths(listing.baths)} bath`,
    listing.sqft ? `${listing.sqft.toLocaleString()} sq ft` : null,
    acres != null ? `${acres} acres` : null,
  ]
    .filter(Boolean)
    .join(" · ");
}

export function listingTypeLine(listing: PropertyListing): string {
  const mls = listing.mls;
  if (!mls) return "";
  return [mls.propertyType, mls.style, mls.neighborhood].filter(Boolean).join(" · ");
}

export function listingSnapshot(listing: PropertyListing) {
  const mls = listing.mls;
  return [
    { label: "Beds", value: String(listing.beds) },
    { label: "Baths", value: formatBaths(listing.baths) },
    listing.sqft ? { label: "Square feet", value: listing.sqft.toLocaleString() } : null,
    mls?.acres != null ? { label: "Lot size", value: `${mls.acres} acres` } : null,
    mls?.yearBuilt ? { label: "Year built", value: String(mls.yearBuilt) } : null,
    mls?.parking ? { label: "Parking", value: mls.parking } : null,
  ].filter((item): item is { label: string; value: string } => Boolean(item));
}
