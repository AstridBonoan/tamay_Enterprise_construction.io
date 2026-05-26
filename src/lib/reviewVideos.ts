/** YouTube video IDs + descriptions — edit to add more testimonial embeds */
export type ReviewVideoProject = {
  id: string;
  /** One, two, or three+ YouTube IDs per project */
  videos: string[];
  /** Client name heading above the video */
  title?: string;
  /** Project / location caption below the video */
  description?: string;
};

export const REVIEW_VIDEO_PROJECTS: ReviewVideoProject[] = [
  {
    id: "commercial-bridgeport",
    videos: ["JGxUJl-r2Nk"],
    title: "Chris Yoon - testimonial",
    description: "Commercial Convenience Store - Bridgeport.",
  },
  {
    id: "ada-commercial-bathrooms-ny",
    videos: ["af5JYQe6ltY"],
    title: "Chris Yoon - testimonial",
    description: "New York ADA Commercial Bathrooms.",
  },
  {
    id: "coop-department-remodeling",
    videos: ["_eEQVb19zHA"],
    title: "Lucas de valdivia - testimonial",
    description: "Co-op Department Remodeling",
  },
  {
    id: "wilton-bathroom-remodeling",
    videos: ["xhyHDnt_G8g"],
    title: "MARIE-PAUL - testimonial",
    description: "Wilton Bathroom Remodeling",
  },
  {
    id: "west-haven-department-remodeling",
    videos: ["XTKenyMkdks"],
    title: "Rosemary - testimonial",
    description: "West Haven Department Remodeling",
  },
  {
    id: "hamden-lights-installation",
    videos: ["2NTfW0PZAIo"],
    title: "Maryse - testimonial",
    description: "Hamden lights Installation",
  },
  {
    id: "hamden-ceiling-restoration",
    videos: ["NLQKQ6vYPeI"],
    title: "Brian & sarah - testimonial",
    description: "Hamden Ceiling Restoration",
  },
  {
    id: "bridgeport-basement-remodeling",
    videos: ["08Ks5xBkHNY"],
    title: "MIKE ADARKWAH - testimonial",
    description: "Bridgeport Basement Remodeling",
  },
];
