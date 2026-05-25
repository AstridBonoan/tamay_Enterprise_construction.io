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
  // Add YouTube IDs to `videos` for each testimonial (e.g. videos: ["VIDEO_ID"]):
  // { id: "chris-yoon", videos: [], title: "Chris Yoon", description: "Chris Yoon — client testimonial." },
];
