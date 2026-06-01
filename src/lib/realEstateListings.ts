import { assetUrl } from "./assetUrl";

export type PropertyScheduleSlot = {
  date: string;
  time: string;
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
};

const saleImage = assetUrl("/real-estate/listings/house-for-sale-west-haven.png");
const rentImage = assetUrl("/real-estate/listings/apartment-for-rent-west-haven.png");

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
    scheduleLabel: "Open House",
    scheduleSlots: [
      { date: "Saturday, June 14, 2026", time: "11:00 AM – 1:00 PM" },
      { date: "Sunday, June 15, 2026", time: "1:00 PM – 3:00 PM" },
    ],
    scheduleCtaLabel: "Request a private showing",
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
    scheduleLabel: "Apartment Viewings",
    scheduleSlots: [
      { date: "Wednesday, June 11, 2026", time: "5:30 PM – 6:30 PM" },
      { date: "Saturday, June 14, 2026", time: "10:00 AM – 11:30 AM" },
      { date: "Tuesday, June 17, 2026", time: "6:00 PM – 7:00 PM" },
    ],
    scheduleCtaLabel: "Schedule a viewing",
  },
];
