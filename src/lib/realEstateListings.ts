/**
 * Real estate listings. Showing availability uses System B (Google Calendar) when
 * NEXT_PUBLIC_GOOGLE_CALENDAR_SCHEDULING_URL is set — manage times in Google Calendar, not here.
 * Optional per-listing override: schedulingUrl on each PropertyListing.
 *
 * scheduleSlots are legacy fallback only (System A) when no Google URL is configured.
 */
import { assetUrl } from "./assetUrl";

export type PropertyScheduleSlot = {
  /** Display date, e.g. "Saturday, June 14, 2026" */
  date: string;
  /** Display time range, e.g. "11:00 AM – 1:00 PM" */
  time: string;
  /** Local start datetime for calendar integration (America/New_York), e.g. "2026-06-14T11:00:00" */
  start: string;
  /** Local end datetime for calendar integration, e.g. "2026-06-14T13:00:00" */
  end: string;
};

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
  /** Longer property description shown below price. */
  details: string;
  scheduleLabel: string;
  scheduleSlots: readonly PropertyScheduleSlot[];
  scheduleCtaLabel: string;
  /** Optional per-listing Google Calendar appointment schedule embed URL. */
  schedulingUrl?: string;
};

const saleImage = assetUrl("/real-estate/listings/house-for-sale-west-haven.png");
const saleImageMilford = assetUrl("/gallery/photos/photo-6.png");
const rentImage = assetUrl("/real-estate/listings/apartment-for-rent-west-haven.png");
const rentImageNewHaven = assetUrl("/gallery/photos/photo-1.png");

export const SALE_LISTINGS: PropertyListing[] = [
  {
    id: "sale-west-haven-colonial",
    title: "Updated 3-Bed Colonial",
    address: "142 Ocean Avenue, West Haven, CT 06516",
    price: "$489,000",
    beds: 3,
    baths: 2,
    sqft: 1840,
    image: saleImage,
    imageAlt: "Updated colonial-style home with front porch in West Haven, Connecticut",
    details:
      "Move-in-ready colonial with renovated kitchen, hardwood floors, and a fenced backyard. Minutes from the shore, schools, and I-95. Ideal for buyers who want room to grow with optional renovation upside for a finished basement or expanded deck. Tamay agents can walk you through comparable sales, inspection considerations, and construction options after purchase.",
    scheduleLabel: "Open House & Showings",
    scheduleSlots: [],
    scheduleCtaLabel: "See available times",
  },
  {
    id: "sale-milford-cape",
    title: "Spacious 4-Bed Cape Cod",
    address: "7 Orchard Lane, Milford, CT 06460",
    price: "$525,000",
    beds: 4,
    baths: 2.5,
    sqft: 2120,
    image: saleImageMilford,
    imageAlt: "Spacious cape cod home with updated exterior in Milford, Connecticut",
    details:
      "Well-maintained cape with an open first floor, primary suite, and finished lower level. Updated mechanicals, two-car garage, and a level backyard with patio space. Close to downtown Milford, beaches, and commuter routes. Tamay agents can discuss renovation options such as a kitchen refresh or expanded outdoor living before or after closing.",
    scheduleLabel: "Open House & Showings",
    scheduleSlots: [],
    scheduleCtaLabel: "See available times",
  },
];

export const RENT_LISTINGS: PropertyListing[] = [
  {
    id: "rent-west-haven-apartment",
    title: "Bright 2-Bed Apartment",
    address: "18 Main Street, Unit 4B, West Haven, CT 06516",
    price: "$2,150 / month",
    beds: 2,
    baths: 1,
    sqft: 980,
    image: rentImage,
    imageAlt: "Bright modern apartment living room available for rent in West Haven",
    details:
      "Sun-filled corner unit with in-unit laundry, updated bath, and assigned parking. Quiet building near shops, dining, and bus routes to New Haven. Heat and hot water included; tenant pays electric and internet. Application and credit check required. Our team coordinates viewings and move-in timelines with property owners.",
    scheduleLabel: "Viewings",
    scheduleSlots: [],
    scheduleCtaLabel: "See available times",
  },
  {
    id: "rent-new-haven-single-family",
    title: "Charming 3-Bed Single-Family Home",
    address: "56 Park Street, New Haven, CT 06511",
    price: "$2,850 / month",
    beds: 3,
    baths: 1.5,
    sqft: 1280,
    image: rentImageNewHaven,
    imageAlt: "Renovated kitchen in a single-family home available for rent in New Haven",
    details:
      "Updated single-family rental with renovated kitchen, hardwood floors, and a private backyard. Off-street parking, washer/dryer hookups, and convenient access to downtown New Haven, Yale, and major highways. Tenant pays utilities; one-year lease preferred. Our team handles showings, applications, and move-in coordination with the property owner.",
    scheduleLabel: "Viewings",
    scheduleSlots: [],
    scheduleCtaLabel: "See available times",
  },
];
