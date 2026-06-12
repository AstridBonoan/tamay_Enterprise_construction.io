import { GOOGLE_REVIEWS_URL, GOOGLE_WRITE_REVIEW_URL } from "@/lib/reviews";

export { GOOGLE_WRITE_REVIEW_URL, GOOGLE_REVIEWS_URL };

export type ReviewSubmission = {
  name: string;
  email: string;
  rating: number;
  text: string;
};
