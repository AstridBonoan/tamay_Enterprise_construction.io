import { ASSEMBLY_SERVICE_IMAGES, ASSEMBLY_BUILT_FOR_SCALE_IMAGE, ASSEMBLY_HERO_BANNER, ASSEMBLY_PROFESSIONAL_STANDARDS_IMAGE } from "./assemblyImages";
import { assetUrl } from "./assetUrl";
import { CAREERS_ABOUT_IMAGES, CAREERS_HERO_BANNER } from "./careerImages";
import { ESTIMATOR_PROMO } from "./estimatorPromo";
import { IMAGES } from "./images";
import { RENT_LISTINGS, SALE_LISTINGS } from "./realEstateListings";

export type SiteImageSlot = {
  key: string;
  label: string;
  group: string;
  fallback: string;
};

const GROUP_FROM_PREFIX: Record<string, string> = {
  logo: "Brand",
  logoSmall: "Brand",
  og: "Brand",
  heroHome: "Homepage",
  reviewsBackground: "Reviews",
  heroConstruction: "Construction",
  estimateModalPhoto: "Homepage",
  estimatePromoPhoto: "Homepage",
  financeHero: "Finance",
  financingBadge: "Brand",
  homepage: "Homepage",
  construction: "Construction",
  divisions: "Homepage",
  realEstate: "Real Estate",
  preventiveServices: "Preventive Services",
  logistics: "Logistics",
  careers: "Careers",
  assembly: "Assembly",
  estimator: "Homepage",
  gallery: "Gallery",
  listings: "Properties",
};

const KEY_LABELS: Record<string, string> = {
  logo: "Header logo",
  logoSmall: "Small logo (chat)",
  og: "Social preview fallback",
  heroHome: "Gallery page hero",
  reviewsBackground: "Reviews background",
  heroConstruction: "Construction hero",
  estimateModalPhoto: "Estimate modal photo",
  estimatePromoPhoto: "Estimate promo photo",
  financeHero: "Finance hero",
  financingBadge: "Financing badge",
  "homepage.image1": "Homepage photo 1",
  "homepage.image2": "Homepage carousel 2",
  "homepage.image3": "Homepage carousel 3",
  "homepage.image4": "Homepage carousel 4",
  "homepage.image5": "Homepage carousel 5",
  "homepage.image6": "Homepage carousel 6",
  "homepage.image7": "Homepage carousel 7",
  "homepage.image8": "Homepage carousel 8",
  "homepage.image9": "Homepage carousel 9",
  "homepage.image10": "Homepage carousel 10",
  "homepage.image11": "Homepage carousel 11",
  "divisions.construction": "Homepage — Construction",
  "divisions.realEstate": "Homepage — Real Estate",
  "divisions.logistics": "Homepage — Logistics",
  "construction.renovation": "Renovations",
  "construction.addition": "Additions",
  "construction.kitchenBath": "Kitchen & bath",
  "construction.estimateBanner": "Estimate banner",
  "construction.estimateFloatBanner": "Estimate float banner",
  "construction.approvedHero": "Construction redesign hero",
  "construction.approvedPlanning": "What are you planning",
  "construction.approvedKitchen": "Kitchen renovations",
  "construction.approvedBathroom": "Bathroom renovations",
  "construction.approvedAdditions": "Home additions",
  "construction.approvedMoreWays": "More ways we improve homes",
  "construction.approvedEstimator": "Project cost estimator assemblies",
  "construction.approvedCoordinatedTeam": "One project one team",
  "construction.approvedWarranty": "Warranty and trust",
  "construction.approvedProcess": "Construction process",
  "realEstate.hero": "Real estate coastal hero",
  "realEstate.agent": "Planning / agent photo",
  "realEstate.longTermValue": "Long-term value",
  "realEstate.approvedHero": "Real estate hero",
  "realEstate.approvedDifference": "The Tamay difference",
  "realEstate.approvedBuildersEyes": "Builder's eyes",
  "realEstate.approvedPlanTomorrow": "Plan for tomorrow",
  "preventiveServices.hero": "Preventive hero",
  "preventiveServices.aboutConsultation": "About consultation",
  "preventiveServices.homeownerSupport": "Homeowner support",
  "preventiveServices.serviceBathroom": "Bathroom service",
  "preventiveServices.serviceHvac": "HVAC service",
  "preventiveServices.servicePlumbing": "Plumbing service",
  "preventiveServices.serviceExterior": "Exterior service",
  "logistics.hero": "Logistics hero",
  "logistics.warehouseFleet": "Warehouse fleet",
  "logistics.routeMap": "Route map",
  "logistics.whyChoose.professional": "Why choose — professional",
  "logistics.whyChoose.delivery": "Why choose — delivery",
  "logistics.whyChoose.problemSolving": "Why choose — problem solving",
  "careers.hero": "Careers hero",
  "careers.mission": "Our mission",
  "careers.whyWork": "Why work here",
  "careers.whoThrives": "Who thrives here",
  "assembly.hero": "Assembly hero",
  "assembly.builtForScale": "Built for scale",
  "assembly.professionalStandards": "Professional standards",
  "assembly.furnitureAssembly": "Furniture assembly",
  "assembly.storageWarehouse": "Storage assembly",
  "assembly.officeAssembly": "Office assembly",
  "assembly.wallMountInstall": "Wall-mount install",
  "assembly.flatPackAssembly": "Flat-pack assembly",
  "assembly.precisionAssembly": "Precision assembly",
  "assembly.whiteGloveVanity": "White-glove vanity",
  "assembly.cabinetInstall": "Cabinet install",
  "estimator.photo": "Estimator promo photo",
};

function flattenStringLeaves(value: unknown, prefix: string, out: Record<string, string>) {
  if (typeof value === "string") {
    if (prefix) out[prefix] = value;
    return;
  }
  if (Array.isArray(value) || !value || typeof value !== "object") return;
  for (const [childKey, childValue] of Object.entries(value)) {
    flattenStringLeaves(childValue, prefix ? `${prefix}.${childKey}` : childKey, out);
  }
}

function humanize(key: string): string {
  const leaf = key.split(".").at(-1) ?? key;
  return leaf
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function groupFor(key: string): string {
  const prefix = key.split(".")[0] ?? key;
  return GROUP_FROM_PREFIX[prefix] ?? humanize(prefix);
}

const IMAGE_DEFAULTS: Record<string, string> = {};
flattenStringLeaves(IMAGES, "", IMAGE_DEFAULTS);

export const LISTING_PHOTO_COUNT = 4;

export function listingImageSlotKey(listingId: string, photoIndex = 1) {
  return photoIndex <= 1 ? `listings.${listingId}` : `listings.${listingId}.${photoIndex}`;
}

const LISTING_IMAGE_DEFAULTS: Record<string, string> = {};
for (const listing of [...SALE_LISTINGS, ...RENT_LISTINGS]) {
  const kind = SALE_LISTINGS.some((item) => item.id === listing.id) ? "For sale" : "For rent";
  for (let index = 1; index <= LISTING_PHOTO_COUNT; index += 1) {
    const key = listingImageSlotKey(listing.id, index);
    LISTING_IMAGE_DEFAULTS[key] = index === 1 ? listing.image : "";
    KEY_LABELS[key] =
      index === 1 ? `${listing.title} (${kind})` : `${listing.title} — extra photo ${index}`;
  }
}

export const EXTRA_IMAGE_DEFAULTS: Record<string, string> = {
  "careers.hero": CAREERS_HERO_BANNER,
  "careers.mission": CAREERS_ABOUT_IMAGES.mission.src,
  "careers.whyWork": CAREERS_ABOUT_IMAGES.whyWork.src,
  "careers.whoThrives": CAREERS_ABOUT_IMAGES.whoThrives.src,
  "assembly.hero": ASSEMBLY_HERO_BANNER,
  "assembly.builtForScale": ASSEMBLY_BUILT_FOR_SCALE_IMAGE,
  "assembly.professionalStandards": ASSEMBLY_PROFESSIONAL_STANDARDS_IMAGE,
  "assembly.furnitureAssembly": ASSEMBLY_SERVICE_IMAGES.furnitureAssembly,
  "assembly.storageWarehouse": ASSEMBLY_SERVICE_IMAGES.storageWarehouse,
  "assembly.officeAssembly": ASSEMBLY_SERVICE_IMAGES.officeAssembly,
  "assembly.wallMountInstall": ASSEMBLY_SERVICE_IMAGES.wallMountInstall,
  "assembly.flatPackAssembly": ASSEMBLY_SERVICE_IMAGES.flatPackAssembly,
  "assembly.precisionAssembly": ASSEMBLY_SERVICE_IMAGES.precisionAssembly,
  "assembly.whiteGloveVanity": ASSEMBLY_SERVICE_IMAGES.whiteGloveVanity,
  "assembly.cabinetInstall": ASSEMBLY_SERVICE_IMAGES.cabinetInstall,
  "estimator.photo": ESTIMATOR_PROMO.photo,
  "gallery.photo1": assetUrl("/gallery/photos/photo-1.png"),
  "gallery.photo2": assetUrl("/gallery/photos/photo-2.png"),
  "gallery.photo3": assetUrl("/gallery/photos/photo-3.png"),
  "gallery.photo4": assetUrl("/gallery/photos/photo-4.png"),
  "gallery.photo5": assetUrl("/gallery/photos/photo-5.png"),
  "gallery.photo6": assetUrl("/gallery/photos/photo-6.png"),
  "gallery.photo7": assetUrl("/gallery/photos/photo-7.png"),
  "gallery.photo8": assetUrl("/gallery/photos/photo-8.png"),
  "gallery.photo9": assetUrl("/gallery/photos/photo-9.png"),
  "gallery.photo10": assetUrl("/gallery/photos/photo-10.png"),
  "gallery.photo11": assetUrl("/gallery/photos/photo-11.png"),
  "gallery.photo12": assetUrl("/gallery/photos/photo-12.png"),
  ...LISTING_IMAGE_DEFAULTS,
};

const GALLERY_PHOTO_TITLES = [
  "Modern Kitchen Renovation",
  "Luxury Bathroom Vanity Installation",
  "Contemporary Bathroom Remodel",
  "Custom Kitchen Island Build",
  "Tamay Logistics Fleet",
  "New Home Exterior Project",
  "Furniture Assembly On-Site",
  "Upholstery Repair & Assembly",
  "Precision Wall Installation",
  "Commercial Furniture Setup",
  "Bedroom Frame Assembly",
  "Vanity Installation Service",
] as const;

GALLERY_PHOTO_TITLES.forEach((title, index) => {
  KEY_LABELS[`gallery.photo${index + 1}`] = title;
});

export const SITE_IMAGE_DEFAULTS: Record<string, string> = {
  ...IMAGE_DEFAULTS,
  ...EXTRA_IMAGE_DEFAULTS,
};

export const SITE_IMAGE_SLOTS: SiteImageSlot[] = Object.entries(SITE_IMAGE_DEFAULTS).map(
  ([key, fallback]) => ({
    key,
    label: KEY_LABELS[key] ?? humanize(key),
    group: groupFor(key),
    fallback,
  }),
);

const GROUP_ORDER = [
  "Properties",
  "Homepage",
  "Real Estate",
  "Gallery",
  "Construction",
  "Preventive Services",
  "Logistics",
  "Assembly",
  "Careers",
  "Finance",
  "Reviews",
  "Brand",
];

const discoveredGroups = [...new Set(SITE_IMAGE_SLOTS.map((slot) => slot.group))];
export const SITE_IMAGE_SLOT_GROUPS = [
  ...GROUP_ORDER.filter((group) => discoveredGroups.includes(group)),
  ...discoveredGroups.filter((group) => !GROUP_ORDER.includes(group)),
];

export const IMAGE_PATH_KEYS = new Set(Object.keys(IMAGE_DEFAULTS));

export const GALLERY_PHOTO_SLOTS = GALLERY_PHOTO_TITLES.map((title, index) => ({
  key: `gallery.photo${index + 1}`,
  title,
}));

export const APPOINTMENT_SERVICE_IMAGE_KEYS: Record<string, string> = {
  construction: "construction.renovation",
  "real-estate": "realEstate.agent",
  logistics: "logistics.warehouseFleet",
  "prevention-services": "preventiveServices.aboutConsultation",
  "assembly-installation": "assembly.furnitureAssembly",
};

export function isImagePathKey(key: string): boolean {
  return IMAGE_PATH_KEYS.has(key);
}
