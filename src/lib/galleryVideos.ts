import type { ReviewVideoProject } from "./reviewVideos";

/** New year promotion video — edit video ID in videos[] */
export const GALLERY_PROMOTION_VIDEO: ReviewVideoProject = {
  id: "new-year-promotion-2026",
  title: "Promotions",
  videos: ["l26oQaGBskk"],
};

/** YouTube project embeds for the gallery page — edit videos[] per project */
export const GALLERY_VIDEO_PROJECTS: ReviewVideoProject[] = [
  {
    id: "full-bathroom-renovation",
    title: "Full Bathroom Renovation",
    videos: [],
  },
  {
    id: "coop-apartment-renovation",
    title: "Co-op apartment Renovation",
    videos: [],
  },
  {
    id: "retaining-wall",
    title: "Retaining wall",
    videos: ["9KakXUv9-kE"],
  },
  {
    id: "full-basement-transformation",
    title: "Full basement transformation",
    videos: [],
  },
  {
    id: "full-home-lighting",
    title: "Full Home Lighting Installation",
    videos: [],
  },
  {
    id: "bathroom-remodel",
    title: "Bathroom Remodel",
    videos: [],
  },
  {
    id: "complete-basement-renovation",
    title: "Complete basement Renovation",
    videos: ["8rvPhBm1mo8", "d90U6tv0JtU", "OLpVtJWZDdg"],
  },
  {
    id: "ada-bathroom-construction",
    title: "ADA BATHROOM CONSTRUCTION",
    // Last video (af5JYQe6ltY) is a testimonial — kept on Reviews page only
    videos: ["EXIut76IUDU", "hg34-f2Qfok"],
  },
];
