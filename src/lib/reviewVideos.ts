/** YouTube video IDs — edit to add more testimonial embeds */
export type ReviewVideoProject = {
  id: string;
  /** One, two, or three+ YouTube IDs per project */
  videos: string[];
  /** Client name heading above the video */
  title?: string;
};

export const REVIEW_VIDEO_PROJECTS: ReviewVideoProject[] = [
  {
    id: "commercial-bridgeport",
    videos: ["JGxUJl-r2Nk"],
    title: "Chris Yoon - testimonial",
  },
  {
    id: "ada-commercial-bathrooms-ny",
    videos: ["af5JYQe6ltY"],
    title: "Chris Yoon - testimonial",
  },
  {
    id: "coop-department-remodeling",
    videos: ["_eEQVb19zHA"],
    title: "Lucas de valdivia - testimonial",
  },
  {
    id: "wilton-bathroom-remodeling",
    videos: ["xhyHDnt_G8g"],
    title: "MARIE-PAUL - testimonial",
  },
  {
    id: "west-haven-department-remodeling",
    videos: ["XTKenyMkdks"],
    title: "Rosemary - testimonial",
  },
  {
    id: "hamden-lights-installation",
    videos: ["2NTfW0PZAIo"],
    title: "Maryse - testimonial",
  },
  {
    id: "hamden-ceiling-restoration",
    videos: ["NLQKQ6vYPeI"],
    title: "Brian & sarah - testimonial",
  },
  {
    id: "bridgeport-basement-remodeling",
    videos: ["08Ks5xBkHNY"],
    title: "MIKE ADARKWAH - testimonial",
  },
];
