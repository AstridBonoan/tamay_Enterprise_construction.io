/** YouTube video IDs + descriptions — edit to add more testimonial embeds */
export type ReviewVideoProject = {
  id: string;
  /** One, two, or three+ YouTube IDs per project */
  videos: string[];
  /** Heading above the video (e.g. "Chris Yoon - Testimonial") */
  title?: string;
  /** Caption below the video */
  description?: string;
};

export function formatTestimonialTitle(name: string): string {
  const trimmed = name.trim();
  if (/testimonial/i.test(trimmed)) return trimmed.toUpperCase();
  return `${trimmed} - Testimonial`.toUpperCase();
}

/** Construction / project showcase videos */
export const PROJECT_VIDEO_GALLERY: ReviewVideoProject[] = [
  {
    id: "commercial-bridgeport",
    videos: ["JGxUJl-r2Nk"],
    title: "Commercial Convenience Store - Bridgeport",
    description: "Commercial Convenience Store - Bridgeport.",
  },
  {
    id: "ada-commercial-bathrooms-ny",
    videos: ["af5JYQe6ltY"],
    title: "New York ADA Commercial Bathrooms",
    description: "New York ADA Commercial Bathrooms.",
  },
  {
    id: "coop-department-remodeling",
    videos: ["_eEQVb19zHA"],
    title: "Co-op Department Remodeling",
    description: "Co-op Department Remodeling",
  },
  {
    id: "wilton-bathroom-remodeling",
    videos: ["xhyHDnt_G8g"],
    title: "Wilton Bathroom Remodeling",
    description: "Wilton Bathroom Remodeling",
  },
  {
    id: "west-haven-department-remodeling",
    videos: ["XTKenyMkdks"],
    title: "West Haven Department Remodeling",
    description: "West Haven Department Remodeling",
  },
  {
    id: "hamden-lights-installation",
    videos: ["2NTfW0PZAIo"],
    title: "Hamden lights Installation",
    description: "Hamden lights Installation",
  },
  {
    id: "hamden-ceiling-restoration",
    videos: ["NLQKQ6vYPeI"],
    title: "Hamden Ceiling Restoration",
    description: "Hamden Ceiling Restoration",
  },
  {
    id: "bridgeport-basement-remodeling",
    videos: ["08Ks5xBkHNY"],
    title: "Bridgeport Basement Remodeling",
    description: "Bridgeport Basement Remodeling",
  },
];

/** Client testimonial videos — add YouTube IDs to `videos` when available */
export const CLIENT_TESTIMONIAL_VIDEOS: ReviewVideoProject[] = [
  { id: "chris-yoon", videos: ["JGxUJl-r2Nk", "af5JYQe6ltY"], title: "Chris Yoon" },
  { id: "lucas-de-valdivia", videos: ["_eEQVb19zHA"], title: "Lucas de valdivia" },
  { id: "marie-paul", videos: ["xhyHDnt_G8g"], title: "MARIE-PAUL" },
  { id: "rosemary", videos: ["XTKenyMkdks"], title: "Rosemary" },
  { id: "maryse", videos: ["2NTfW0PZAIo"], title: "Maryse" },
  { id: "brian-sarah", videos: ["NLQKQ6vYPeI"], title: "Brian & sarah" },
  { id: "mike-adarkwah", videos: ["08Ks5xBkHNY"], title: "MIKE ADARKWAH" },
];

/** @deprecated Use PROJECT_VIDEO_GALLERY */
export const REVIEW_VIDEO_PROJECTS = PROJECT_VIDEO_GALLERY;
