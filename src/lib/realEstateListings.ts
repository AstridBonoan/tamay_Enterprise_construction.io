/**
 * Real estate listings. Showing availability is managed in /m/staff/schedule (schedule_slots table).
 * service_key for each property is the listing id (e.g. sale-west-haven-colonial).
 * MLS-style fields follow the common SmartMLS listing structure (overview, facts, rooms, features).
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
  /** Short card overview, in the style of an MLS listing summary. */
  overview: string;
  /** Full listing remarks shown on the property page. */
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
      propertyType: "Single Family For Sale",
      county: "New Haven",
      neighborhood: "West Haven Shore",
      acres: 0.18,
      yearBuilt: 1948,
      roomsCount: 7,
      propertyInfo: [
        { label: "Style", value: "Colonial" },
        { label: "Color", value: "White" },
        { label: "New Construction", value: "No / Resale" },
        { label: "Year Built / Source", value: "1948 / Public Records" },
        { label: "Rooms", value: "7" },
        { label: "Above Grade SqFt", value: "1,840" },
        { label: "Total SqFt", value: "1,840" },
        { label: "Zoning", value: "R3" },
        { label: "Home Warranty", value: "No" },
        { label: "Property Tax", value: "$8,420" },
        { label: "Assessed Value", value: "$262,500" },
        { label: "Tax Year", value: "July 2026–June 2027" },
      ],
      schools: [
        { label: "Elementary School", value: "West Haven Public Schools" },
        { label: "Middle School", value: "West Haven" },
        { label: "High School", value: "West Haven" },
        { label: "Walk Score", value: "Car-dependent — most errands require a car" },
      ],
      rooms: [
        { name: "Living Room", level: "Main", features: "Hardwood floors" },
        { name: "Dining Room", level: "Main", features: "Open to kitchen" },
        { name: "Kitchen", level: "Main", features: "Renovated, appliances included" },
        { name: "Primary Bedroom", level: "Upper", features: "Full bath" },
        { name: "Bedroom", level: "Upper" },
        { name: "Bedroom", level: "Upper" },
        { name: "Full Bath", level: "Upper" },
        { name: "Full Bath", level: "Main" },
      ],
      interior: [
        { label: "Interior Features", value: "Hardwood floors, updated kitchen, open living/dining" },
        { label: "Appliances Included", value: "Oven/Range, Microwave, Refrigerator, Dishwasher" },
        { label: "# of Fireplaces", value: "0" },
        { label: "Energy Features", value: "Thermopane windows" },
        { label: "Laundry", value: "Lower level hookups" },
      ],
      exterior: [
        { label: "Construction", value: "Frame" },
        { label: "Basement", value: "Full, unfinished, interior access" },
        { label: "Foundation", value: "Concrete" },
        { label: "Roof", value: "Asphalt shingle" },
        { label: "Garage", value: "1-car driveway / off-street parking" },
        { label: "Parking Total Spaces", value: "3" },
        { label: "Exterior Features", value: "Fenced yard, covered front porch" },
        { label: "Exterior Siding", value: "Vinyl" },
        { label: "Acres / Source", value: "0.18 / Public Records" },
        { label: "Lot Description", value: "Fenced, level lot" },
        { label: "In Flood Zone", value: "No" },
        { label: "Nearby Amenities", value: "Beach, shopping, schools, I-95, public transportation" },
      ],
      utilities: [
        { label: "Heat Type / Fuel", value: "Hot air / Natural gas" },
        { label: "Cooling", value: "Window units" },
        { label: "Hot Water System", value: "Natural gas" },
        { label: "Water Service", value: "Public water connected" },
        { label: "Sewer Service", value: "Public sewer connected" },
      ],
      listingInfo: [
        { label: "Listing Type", value: "Single Family For Sale" },
        { label: "Acceptable Financing", value: "Conventional, FHA, VA, CHFA" },
        { label: "Date Available", value: "Negotiable" },
        { label: "Potential Short Sale", value: "No" },
      ],
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
      propertyType: "Single Family For Sale",
      county: "New Haven",
      neighborhood: "Milford",
      acres: 0.25,
      yearBuilt: 1956,
      roomsCount: 8,
      propertyInfo: [
        { label: "Style", value: "Cape Cod" },
        { label: "Color", value: "Gray" },
        { label: "New Construction", value: "No / Resale" },
        { label: "Year Built / Source", value: "1956 / Public Records" },
        { label: "Rooms", value: "8" },
        { label: "Above Grade SqFt", value: "1,640" },
        { label: "Below Grade SqFt", value: "480" },
        { label: "Total SqFt", value: "2,120" },
        { label: "Zoning", value: "R10" },
        { label: "Home Warranty", value: "No" },
        { label: "Property Tax", value: "$9,185" },
        { label: "Assessed Value", value: "$301,000" },
        { label: "Tax Year", value: "July 2026–June 2027" },
      ],
      schools: [
        { label: "Elementary School", value: "Milford Public Schools" },
        { label: "Middle School", value: "Milford" },
        { label: "High School", value: "Jonathan Law / Foran" },
        { label: "Walk Score", value: "Somewhat walkable — some errands can be accomplished on foot" },
      ],
      rooms: [
        { name: "Living Room", level: "Main", features: "Open floor plan" },
        { name: "Dining Area", level: "Main" },
        { name: "Kitchen", level: "Main" },
        { name: "Primary Bedroom", level: "Main", features: "Primary suite" },
        { name: "Bedroom", level: "Main" },
        { name: "Bedroom", level: "Upper" },
        { name: "Bedroom", level: "Upper" },
        { name: "Family Room", level: "Lower", features: "Finished lower level" },
        { name: "Half Bath", level: "Main" },
        { name: "Full Bath", level: "Main" },
        { name: "Full Bath", level: "Upper" },
      ],
      interior: [
        { label: "Interior Features", value: "Open floor plan, primary suite, finished lower level" },
        { label: "Appliances Included", value: "Oven/Range, Microwave, Refrigerator, Dishwasher, Washer, Dryer" },
        { label: "# of Fireplaces", value: "1" },
        { label: "Energy Features", value: "Updated mechanicals, programmable thermostat" },
        { label: "Laundry", value: "Lower level" },
      ],
      exterior: [
        { label: "Construction", value: "Frame" },
        { label: "Basement", value: "Fully finished, liveable space, interior access" },
        { label: "Foundation", value: "Concrete" },
        { label: "Roof", value: "Asphalt shingle" },
        { label: "Garage (# of Cars)", value: "2" },
        { label: "Garage Type", value: "Attached garage" },
        { label: "Parking Total Spaces", value: "4" },
        { label: "Parking", value: "Driveway, off-street" },
        { label: "Driveway Type", value: "Private, paved" },
        { label: "Exterior Features", value: "Patio, lighting" },
        { label: "Acres / Source", value: "0.25 / Public Records" },
        { label: "Lot Description", value: "Level lot" },
        { label: "In Flood Zone", value: "No" },
        { label: "Nearby Amenities", value: "Beaches, downtown Milford, shopping, commuting routes" },
      ],
      utilities: [
        { label: "Heat Type / Fuel", value: "Hot air / Natural gas" },
        { label: "Cooling", value: "Central air" },
        { label: "Hot Water System", value: "Natural gas" },
        { label: "Water Service", value: "Public water connected" },
        { label: "Sewer Service", value: "Public sewer connected" },
      ],
      listingInfo: [
        { label: "Listing Type", value: "Single Family For Sale" },
        { label: "Acceptable Financing", value: "Conventional, FHA, VA, CHFA" },
        { label: "Date Available", value: "Negotiable" },
        { label: "Potential Short Sale", value: "No" },
      ],
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
      propertyType: "Apartment For Rent",
      county: "New Haven",
      neighborhood: "Downtown West Haven",
      yearBuilt: 1989,
      roomsCount: 4,
      propertyInfo: [
        { label: "Style", value: "Apartment / Corner unit" },
        { label: "New Construction", value: "No / Resale building" },
        { label: "Year Built / Source", value: "1989 / Public Records" },
        { label: "Rooms", value: "4" },
        { label: "Total SqFt", value: "980" },
        { label: "Unit", value: "4B" },
        { label: "Lease Term", value: "12 months preferred" },
        { label: "Application", value: "Application and credit check required" },
      ],
      schools: [
        { label: "Elementary School", value: "West Haven Public Schools" },
        { label: "Middle School", value: "West Haven" },
        { label: "High School", value: "West Haven" },
        { label: "Walk Score", value: "Somewhat walkable — shops, dining, and bus routes nearby" },
      ],
      rooms: [
        { name: "Living Room", level: "Main", features: "Sun-filled corner unit" },
        { name: "Kitchen", level: "Main" },
        { name: "Bedroom", level: "Main" },
        { name: "Bedroom", level: "Main" },
        { name: "Full Bath", level: "Main", features: "Updated" },
      ],
      interior: [
        { label: "Interior Features", value: "In-unit laundry, updated bath, corner windows" },
        { label: "Appliances Included", value: "Oven/Range, Refrigerator, Dishwasher, Washer, Dryer" },
        { label: "Laundry", value: "In unit" },
        { label: "# of Fireplaces", value: "0" },
      ],
      exterior: [
        { label: "Parking", value: "Assigned parking, 1 space" },
        { label: "Parking Total Spaces", value: "1" },
        { label: "Building", value: "Quiet residential building" },
        { label: "Nearby Amenities", value: "Shopping, dining, bus routes to New Haven" },
      ],
      utilities: [
        { label: "Heat / Hot Water", value: "Included" },
        { label: "Electric", value: "Tenant pays" },
        { label: "Internet", value: "Tenant pays" },
        { label: "Water Service", value: "Public water connected" },
        { label: "Sewer Service", value: "Public sewer connected" },
      ],
      listingInfo: [
        { label: "Listing Type", value: "Apartment For Rent" },
        { label: "Date Available", value: "Upon approved application" },
        { label: "Pets", value: "Ask the listing agent" },
        { label: "Showing", value: "By appointment" },
      ],
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
      propertyType: "Single Family For Rent",
      county: "New Haven",
      neighborhood: "New Haven",
      acres: 0.11,
      yearBuilt: 1926,
      roomsCount: 6,
      propertyInfo: [
        { label: "Style", value: "Colonial" },
        { label: "New Construction", value: "No / Resale" },
        { label: "Year Built / Source", value: "1926 / Public Records" },
        { label: "Rooms", value: "6" },
        { label: "Total SqFt", value: "1,280" },
        { label: "Acres / Source", value: "0.11 / Public Records" },
        { label: "Lease Term", value: "12 months preferred" },
      ],
      schools: [
        { label: "Elementary School", value: "New Haven Public Schools" },
        { label: "Middle School", value: "New Haven" },
        { label: "High School", value: "New Haven" },
        { label: "Walk Score", value: "Very walkable — downtown, Yale, and transit nearby" },
      ],
      rooms: [
        { name: "Living Room", level: "Main", features: "Hardwood floors" },
        { name: "Kitchen", level: "Main", features: "Renovated" },
        { name: "Dining Area", level: "Main" },
        { name: "Bedroom", level: "Upper" },
        { name: "Bedroom", level: "Upper" },
        { name: "Bedroom", level: "Upper" },
        { name: "Full Bath", level: "Upper" },
        { name: "Half Bath", level: "Main" },
      ],
      interior: [
        { label: "Interior Features", value: "Hardwood floors, renovated kitchen" },
        { label: "Appliances Included", value: "Oven/Range, Refrigerator, Dishwasher" },
        { label: "Laundry", value: "Washer/dryer hookups" },
        { label: "# of Fireplaces", value: "0" },
      ],
      exterior: [
        { label: "Parking", value: "Off-street parking" },
        { label: "Parking Total Spaces", value: "2" },
        { label: "Lot Description", value: "Private backyard" },
        { label: "Nearby Amenities", value: "Downtown New Haven, Yale, major highways" },
      ],
      utilities: [
        { label: "Heat Type / Fuel", value: "Hot air / Natural gas" },
        { label: "Cooling", value: "Window units" },
        { label: "Utilities", value: "Tenant pays utilities" },
        { label: "Water Service", value: "Public water connected" },
        { label: "Sewer Service", value: "Public sewer connected" },
      ],
      listingInfo: [
        { label: "Listing Type", value: "Single Family For Rent" },
        { label: "Date Available", value: "Upon approved application" },
        { label: "Pets", value: "Ask the listing agent" },
        { label: "Showing", value: "By appointment" },
      ],
    },
  },
];
