import type { Metadata } from "next";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { TamayVideoGallery } from "@/components/reviews/TamayVideoGallery";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { REVIEW_VIDEO_PROJECTS } from "@/lib/reviewVideos";

export const metadata: Metadata = {
  title: "Client Reviews & Testimonials",
  description: "Client reviews and testimonial videos from Tamay Enterprises in West Haven, CT.",
};

export default function ReviewsPage() {
  return (
    <>
      <ReviewsSection />

      <section className="py-14 max-w-6xl mx-auto px-4 w-full">
        <SectionHeading title="Video Testimonials" />
        <TamayVideoGallery projects={REVIEW_VIDEO_PROJECTS} />
      </section>
    </>
  );
}
