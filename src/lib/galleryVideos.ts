import type { ReviewVideoProject } from "./reviewVideos";

/** New year promotion video — edit video ID in videos[] */
export const GALLERY_PROMOTION_VIDEO: ReviewVideoProject = {
  id: "new-year-promotion-2026",
  title: "Promotions",
  videos: ["l26oQaGBskk"],
};

/**
 * YouTube project embeds for the gallery page — edit videos[] per project.
 * Testimonial-only clips stay on the Reviews page and are omitted here.
 */
export const GALLERY_VIDEO_PROJECTS: ReviewVideoProject[] = [
  {
    id: "home-exterior-upgrade-fairfield",
    title: "Complete Home Exterior Upgrade : Fairfield, Connecticut",
    videos: ["VGCl00gR_pY"],
  },
  {
    id: "full-bathroom-renovation",
    title: "Full Bathroom Renovation",
    videos: ["VpU0K7fnrAY"],
  },
  {
    id: "coop-apartment-renovation",
    title: "Co-op apartment Renovation",
    // Skip _eEQVb19zHA (Lucas testimonial — Reviews page)
    videos: ["TO9giHibYL4"],
  },
  {
    id: "custom-closet-monroe",
    title: "Custom Closet : Monroe, Connecticut",
    videos: ["cftN8lzsoeQ"],
  },
  {
    id: "retaining-wall",
    title: "Retaining wall",
    videos: ["9KakXUv9-kE"],
  },
  {
    id: "bathroom-renovation-wilton",
    title: "Bathroom Renovation",
    // Skip xhyHDnt_G8g (Marie-Paul testimonial — Reviews page)
    videos: ["vpFlLodGcWI"],
  },
  {
    id: "full-basement-transformation",
    title: "Full basement transformation",
    // Skip 08Ks5xBkHNY (Mike testimonial — Reviews page)
    videos: ["uDI5DCx2Fl4", "X4SXVcduADY"],
  },
  {
    id: "apartment-relayout-new-haven",
    title: "Apartment Re-Layout & Renovation",
    videos: ["ksDoozeoqh4"],
  },
  {
    id: "full-home-lighting",
    title: "Full Home Lighting Installation",
    // Skip 2NTfW0PZAIo (Maryse testimonial — Reviews page)
    videos: ["1XRrNeVIdZU"],
  },
  {
    id: "vinyl-fences-west-haven",
    title: "Vinyl Fences Installation",
    videos: ["XXwx92Zxows"],
  },
  {
    id: "bathroom-remodel",
    title: "Bathroom Remodel",
    // Skip XTKenyMkdks (Rosemary testimonial — Reviews page)
    videos: ["Sshs4ik5Bik"],
  },
  {
    id: "complete-basement-renovation",
    title: "Complete basement Renovation",
    videos: ["8rvPhBm1mo8", "d90U6tv0JtU", "OLpVtJWZDdg"],
  },
  {
    id: "ada-bathroom-construction",
    title: "ADA BATHROOM CONSTRUCTION",
    // Skip af5JYQe6ltY (Chris Yoon testimonial — Reviews page)
    videos: ["EXIut76IUDU", "hg34-f2Qfok"],
  },
];
