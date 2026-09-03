import { assetUrl } from "./assetUrl";

const BASE =
  "https://img1.wsimg.com/isteam/ip/03703029-0372-451e-bc5c-93259ec07983";

const home = (file: string) => assetUrl(`/homepage/${file}`);

const logisticsFleetVans = assetUrl("/logistics/tamay-fleet-vans-hd.webp");

/** Local homepage assets + CDN fallbacks for other pages */
export const IMAGES = {
  logo: `${BASE}/blob-cd2cf72.png/:/rs=w:400,h:98,m`,
  logoSmall: `${BASE}/blob-cd2cf72.png/:/rs=w:224,h:80,m`,
  og: home("HomePageImage1.webp"),
  heroHome: home("HomePageImage1.webp"),
  reviewsBackground: assetUrl("/reviews/reviews-background.png"),
  heroConstruction: assetUrl("/construction/hero-banner-crop.webp"),
  /** Interior photo only — no text baked in (avoids duplicate copy in modal) */
  estimateModalPhoto: home("HomePageImage4.webp"),
  estimatePromoPhoto: assetUrl("/images/homepage/estimate-flooring-install.png"),
  financeHero: assetUrl("/images/finance/hero-banner.png"),
  financingBadge: home("financing-available.png"),
  homepage: {
    image1: home("HomePageImage1.webp"),
    image2: home("HomePageImage2.webp"),
    image3: home("HomePageImage3.webp"),
    image4: home("HomePageImage4.webp"),
    image5: home("HomePageImage5.webp"),
    image6: home("HomePageImage6.webp"),
    image7: home("HomePageImage7.webp"),
    image8: home("HomePageImage8.webp"),
    image9: assetUrl("/homepage/community-connecticut-town.webp"),
    image10: assetUrl("/homepage/fleet-garage-maintenance.webp"),
    image11: assetUrl("/homepage/fleet-headquarters-line.webp"),
  },
  construction: {
    renovation: assetUrl("/construction/core-renovation.png"),
    addition: assetUrl("/construction/core-addition.png"),
    kitchenBath: assetUrl("/construction/core-kitchen-bath.png"),
    estimateBanner: assetUrl("/images/construction/estimate-float-banner.png"),
    /** Service collage — used only on the cost estimator float, not the page hero */
    estimateFloatBanner: `${BASE}/blob-8582a7d.png/:/cr=t:19.7%25,l:0%25,w:100%25,h:60.61%25/rs=w:1200,h:600,cg:true`,
    /** Approved Construction redesign visuals — place files at these public paths */
    approvedHero: assetUrl("/construction/construction-hero.png"),
    approvedPlanning: assetUrl("/construction/what-are-you-planning.png"),
    approvedKitchen: assetUrl("/construction/kitchen-renovations.png"),
    approvedBathroom: assetUrl("/construction/bathroom-renovations.png"),
    approvedAdditions: assetUrl("/construction/home-additions.png"),
    approvedMoreWays: assetUrl("/construction/more-ways-improve-homes.png"),
    approvedEstimator: assetUrl("/construction/project-cost-estimator.png"),
    approvedCoordinatedTeam: assetUrl("/construction/one-project-one-team.png"),
    approvedWarranty: assetUrl("/construction/warranty-trust.png"),
    approvedProcess: assetUrl("/construction/construction-process.png"),
  },
  divisions: {
    construction: home("HomePageImage2.webp"),
    realEstate: home("real-estate-division.png"),
    logistics: logisticsFleetVans,
  },
  realEstate: {
    hero: assetUrl("/real-estate/hero-banner-coastal-estate.png"),
    agent: assetUrl("/real-estate/real-estate-planning-board.png"),
    longTermValue:
      "https://img1.wsimg.com/isteam/getty/2170553469/:/cr=t:5.56%25,l:0%25,w:100%25,h:88.88%25/rs=w:1200,h:600,cg:true",
    approvedHero: assetUrl("/real-estate/real-estate-hero.png"),
    approvedDifference: assetUrl("/real-estate/tamay-difference.png"),
    approvedBuildersEyes: assetUrl("/real-estate/builders-eyes.png"),
    approvedPlanTomorrow: assetUrl("/real-estate/buy-today-plan-tomorrow.png"),
  },
  preventiveServices: {
    hero: assetUrl("/home-preventive-services/hero-banner.png"),
    aboutConsultation: assetUrl("/home-preventive-services/about-consultation.png"),
    homeownerSupport: assetUrl("/home-preventive-services/homeowner-support.png"),
    serviceBathroom: assetUrl("/home-preventive-services/service-bathroom.png"),
    serviceHvac: assetUrl("/home-preventive-services/service-hvac.png"),
    servicePlumbing: assetUrl("/home-preventive-services/service-plumbing.png"),
    serviceExterior: assetUrl("/home-preventive-services/service-exterior.png"),
  },
  logistics: {
    hero: assetUrl("/logistics/hero-banner.png"),
    warehouseFleet: logisticsFleetVans,
    routeMap: assetUrl("/logistics/route-map.png"),
    whyChoose: {
      professional: assetUrl("/logistics/why-choose-professional.png"),
      delivery: assetUrl("/logistics/why-choose-delivery.png"),
      problemSolving: assetUrl("/logistics/why-choose-problem-solving.png"),
    },
  },
  gallery: [
    { title: "Complete basement Renovation", src: home("HomePageImage5.webp") },
    { title: "Full Bathroom Renovation", src: home("HomePageImage6.webp") },
    { title: "Co-op apartment Renovation", src: home("HomePageImage7.webp") },
    { title: "Retaining wall", src: home("HomePageImage8.webp") },
    { title: "Bathroom remodeling", src: home("HomePageImage9.webp") },
    { title: "Full basement transformation", src: home("HomePageImage10.webp") },
    { title: "Apartment Re-Layout & Renovation", src: home("HomePageImage1.webp") },
    { title: "ADA BATHROOM CONSTRUCTION", src: home("HomePageImage11.webp") },
    { title: "Full Home Lighting Installation", src: home("HomePageImage4.webp") },
    { title: "Vinyl Fence Installation", src: home("HomePageImage2.webp") },
    { title: "Bathroom Remodel", src: home("HomePageImage3.webp") },
  ],
} as const;
