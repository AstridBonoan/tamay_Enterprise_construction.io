import { assetUrl } from "./assetUrl";

const BASE =
  "https://img1.wsimg.com/isteam/ip/03703029-0372-451e-bc5c-93259ec07983";

const home = (file: string) => assetUrl(`/homepage/${file}`);

/** Local homepage assets + CDN fallbacks for other pages */
export const IMAGES = {
  logo: `${BASE}/blob-cd2cf72.png/:/rs=w:400,h:98,m`,
  logoSmall: `${BASE}/blob-cd2cf72.png/:/rs=w:224,h:80,m`,
  og: home("HomePageImage1.webp"),
  heroHome: home("HomePageImage1.webp"),
  reviewsBackground: assetUrl("/reviews/reviews-background.png"),
  heroConstruction: `${BASE}/blob-8582a7d.png/:/cr=t:19.7%25,l:0%25,w:100%25,h:60.61%25/rs=w:1200,h:600,cg:true`,
  /** Interior photo only — no text baked in (avoids duplicate copy in modal) */
  estimateModalPhoto: home("HomePageImage4.webp"),
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
    image9: home("HomePageImage9.webp"),
    image10: home("HomePageImage10.webp"),
    image11: home("HomePageImage11.webp"),
  },
  construction: {
    renovation: assetUrl("/construction/core-renovation.png"),
    addition: assetUrl("/construction/core-addition.png"),
    kitchenBath: assetUrl("/construction/core-kitchen-bath.png"),
  },
  divisions: {
    construction: home("HomePageImage2.webp"),
    realEstate: home("HomePageImage3.webp"),
    logistics: home("HomePageImage8.webp"),
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
