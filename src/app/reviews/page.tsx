import type { Metadata } from "next";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { TamayVideoGallery } from "@/components/reviews/TamayVideoGallery";
import { WriteReviewSection } from "@/components/reviews/WriteReviewSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SiteContactSection } from "@/components/ui/SiteContactSection";
import { REVIEW_VIDEO_PROJECTS } from "@/lib/reviewVideos";
import { buildSocialMetadata } from "@/lib/socialMetadata";

export const metadata: Metadata = buildSocialMetadata("reviews");

export default function ReviewsPage() {
  return (
    <>
      <ReviewsSection />

      <WriteReviewSection />

      <section className="py-14 max-w-6xl mx-auto px-4 w-full">
        <SectionHeading title="Video Testimonials" />
        <TamayVideoGallery projects={REVIEW_VIDEO_PROJECTS} />
      </section>

      <SiteContactSection />
    </>
  );
}
