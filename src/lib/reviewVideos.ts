/** YouTube video IDs + descriptions — edit to add more testimonial embeds */
export type ReviewVideoProject = {
  id: string;
  /** Comma-separated in HTML: one, two, or three+ videos per project */
  videos: string[];
  description: string;
  /** Optional heading above the gallery tile */
  title?: string;
};

export const REVIEW_VIDEO_PROJECTS: ReviewVideoProject[] = [
  {
    id: "commercial-bridgeport",
    videos: ["JGxUJl-r2Nk"],
    description: "Commercial Convenience Store - Bridgeport.",
  },
  {
    id: "ada-commercial-bathrooms-ny",
    videos: ["af5JYQe6ltY"],
    description: "New York ADA Commercial Bathrooms.",
  },
  {
    id: "coop-department-remodeling",
    videos: ["_eEQVb19zHA"],
    description: "Co-op Department Remodeling",
  },
  {
    id: "wilton-bathroom-remodeling",
    videos: ["xhyHDnt_G8g"],
    description: "Wilton Bathroom Remodeling",
  },
  {
    id: "west-haven-department-remodeling",
    videos: ["XTKenyMkdks"],
    description: "West Haven Department Remodeling",
  },
  {
    id: "hamden-lights-installation",
    videos: ["2NTfW0PZAIo"],
    description: "Hamden lights Installation",
  },
  {
    id: "hamden-ceiling-restoration",
    videos: ["NLQKQ6vYPeI"],
    description: "Hamden Ceiling Restoration",
  },
  {
    id: "bridgeport-basement-remodeling",
    videos: ["08Ks5xBkHNY"],
    description: "Bridgeport Basement Remodeling",
  },
];
