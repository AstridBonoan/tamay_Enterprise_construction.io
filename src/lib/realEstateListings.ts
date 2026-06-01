export type PropertyListing = {
  id: string;
  title: string;
  address: string;
  price: string;
  beds: number;
  baths: number;
  sqft?: number;
  image: string;
  imageAlt: string;
  description?: string;
};

/** Add active sale listings here; shown in the House For Sale section. */
export const SALE_LISTINGS: PropertyListing[] = [];

/** Add active rental listings here; shown in the House For Rent section. */
export const RENT_LISTINGS: PropertyListing[] = [];
