import { FORMSPREE_JOB_APPLICATION } from "@/lib/jobApplication";
import { GOOGLE_REVIEWS_URL, GOOGLE_WRITE_REVIEW_URL } from "@/lib/reviews";

/** Formspree inbox — uses the same endpoint as job applications with a distinct form_name. */
export const FORMSPREE_REVIEW =
  process.env.NEXT_PUBLIC_FORMSPREE_REVIEW ?? FORMSPREE_JOB_APPLICATION;

export { GOOGLE_WRITE_REVIEW_URL, GOOGLE_REVIEWS_URL };

export type ReviewSubmission = {
  name: string;
  email: string;
  rating: number;
  text: string;
};
