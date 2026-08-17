/**
 * Real estate listings. Showing availability is managed in /m/staff/schedule (schedule_slots table).
 * Extra property facts use common public-listing details (inspired by MLS, not an MLS sheet).
 */
import { assetUrl } from "./assetUrl";
import type { MlsListingDetails } from "./mlsListing";

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
  /** Short card overview. */
  overview: string;
  /** Full description on the property page. */
  details: string;
  scheduleLabel: string;
  scheduleCtaLabel: string;
  mls?: MlsListingDetails;
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
    overview:
      "Move-in-ready colonial in West Haven with a renovated kitchen, hardwood floors, and a fenced backyard. Minutes from the shore, schools, and I-95.",
    details:
      "Located near the West Haven shoreline, this updated colonial offers a comfortable layout for everyday living with room to grow. The main level features a renovated kitchen, hardwood floors, and connected living and dining space that opens toward a fenced backyard. Three bedrooms and two full baths provide a practical floor plan for first-time buyers, growing families, or anyone looking for a well-located home with optional renovation upside, including a finished basement or expanded deck. Tamay agents can walk you through comparable sales, inspection considerations, and construction options after purchase.",
    scheduleLabel: "Open House & Showings",
    scheduleCtaLabel: "See available times",
    mls: {
      propertyType: "Single family",
      style: "Colonial",
      neighborhood: "West Haven",
      acres: 0.18,
      yearBuilt: 1948,
      parking: "Driveway, 3 spaces",
      taxes: "$8,420 / year",
      interior: ["Hardwood floors", "Updated kitchen", "Open living and dining"],
      appliances: ["Range", "Microwave", "Refrigerator", "Dishwasher"],
      basement: "Full, unfinished",
      laundry: "Hookups in the basement",
      exterior: ["Fenced backyard", "Covered front porch", "Level lot"],
      heat: "Natural gas",
      cooling: "Window units",
      water: "Public",
      sewer: "Public",
      schools: {
        elementary: "West Haven",
        middle: "West Haven",
        high: "West Haven",
      },
      nearby: ["Beach", "Shopping", "Schools", "I-95"],
    },
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
    overview:
      "Well-maintained Milford cape with an open first floor, primary suite, finished lower level, two-car garage, and a level backyard with patio space.",
    details:
      "This spacious Cape Cod sits on a quiet Milford street close to downtown, beaches, and commuter routes. The open first floor is designed for gathering, with a primary suite, updated mechanicals, and a finished lower level for extra living space. A two-car garage and level backyard with patio make everyday living and entertaining easier. Tamay agents can discuss renovation options such as a kitchen refresh or expanded outdoor living before or after closing.",
    scheduleLabel: "Open House & Showings",
    scheduleCtaLabel: "See available times",
    mls: {
      propertyType: "Single family",
      style: "Cape Cod",
      neighborhood: "Milford",
      acres: 0.25,
      yearBuilt: 1956,
      parking: "Attached 2-car garage",
      taxes: "$9,185 / year",
      interior: ["Open first floor", "Primary suite", "Finished lower level", "Fireplace"],
      appliances: ["Range", "Microwave", "Refrigerator", "Dishwasher", "Washer", "Dryer"],
      basement: "Finished, extra living space",
      laundry: "Lower level",
      exterior: ["Patio", "Level backyard", "Paved driveway"],
      heat: "Natural gas",
      cooling: "Central air",
      water: "Public",
      sewer: "Public",
      schools: {
        elementary: "Milford",
        middle: "Milford",
        high: "Milford",
      },
      nearby: ["Beaches", "Downtown Milford", "Shopping", "Commuter routes"],
    },
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
    overview:
      "Sun-filled corner unit with in-unit laundry, updated bath, and assigned parking. Heat and hot water included; tenant pays electric and internet.",
    details:
      "Sun-filled corner unit with in-unit laundry, updated bath, and assigned parking. Quiet building near shops, dining, and bus routes to New Haven. Heat and hot water included; tenant pays electric and internet. Application and credit check required. Our team coordinates viewings and move-in timelines with property owners.",
    scheduleLabel: "Viewings",
    scheduleCtaLabel: "See available times",
    mls: {
      propertyType: "Apartment",
      style: "Corner unit",
      neighborhood: "West Haven",
      yearBuilt: 1989,
      parking: "Assigned, 1 space",
      leaseTerm: "12 months preferred",
      interior: ["Sun-filled corner unit", "Updated bathroom", "In-unit laundry"],
      appliances: ["Range", "Refrigerator", "Dishwasher", "Washer", "Dryer"],
      laundry: "In unit",
      exterior: ["Quiet building", "Assigned parking"],
      heat: "Included",
      cooling: "Window units",
      water: "Public",
      sewer: "Public",
      utilitiesNotes: ["Heat and hot water included", "Tenant pays electric and internet"],
      schools: {
        elementary: "West Haven",
        middle: "West Haven",
        high: "West Haven",
      },
      nearby: ["Shops", "Dining", "Bus routes to New Haven"],
    },
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
    overview:
      "Updated single-family rental with renovated kitchen, hardwood floors, private backyard, and off-street parking. One-year lease preferred.",
    details:
      "Updated single-family rental with renovated kitchen, hardwood floors, and a private backyard. Off-street parking, washer/dryer hookups, and convenient access to downtown New Haven, Yale, and major highways. Tenant pays utilities; one-year lease preferred. Our team handles showings, applications, and move-in coordination with the property owner.",
    scheduleLabel: "Viewings",
    scheduleCtaLabel: "See available times",
    mls: {
      propertyType: "Single family",
      style: "Colonial",
      neighborhood: "New Haven",
      acres: 0.11,
      yearBuilt: 1926,
      parking: "Off-street, 2 spaces",
      leaseTerm: "12 months preferred",
      interior: ["Hardwood floors", "Renovated kitchen"],
      appliances: ["Range", "Refrigerator", "Dishwasher"],
      laundry: "Washer/dryer hookups",
      exterior: ["Private backyard"],
      heat: "Natural gas",
      cooling: "Window units",
      water: "Public",
      sewer: "Public",
      utilitiesNotes: ["Tenant pays utilities"],
      schools: {
        elementary: "New Haven",
        middle: "New Haven",
        high: "New Haven",
      },
      nearby: ["Downtown New Haven", "Yale", "Major highways"],
    },
  },
];
