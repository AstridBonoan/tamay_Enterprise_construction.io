import type { Metadata } from "next";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { TamayVideoGallery } from "@/components/reviews/TamayVideoGallery";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  CLIENT_TESTIMONIAL_VIDEOS,
  PROJECT_VIDEO_GALLERY,
} from "@/lib/reviewVideos";

export const metadata: Metadata = {
  title: "Client Reviews & Testimonials",
  description: "Client reviews and testimonial videos from Tamay Enterprises in West Haven, CT.",
};

export default function ReviewsPage() {
  return (
    <>
      <ReviewsSection />

      <section className="py-14 max-w-6xl mx-auto px-4 w-full">
        <SectionHeading title="Project Videos" />
        <TamayVideoGallery
          projects={PROJECT_VIDEO_GALLERY}
          titleFormat="project"
        />
      </section>

      <section className="pb-14 max-w-6xl mx-auto px-4 w-full">
        <SectionHeading title="Client Testimonials" />
        <TamayVideoGallery
          projects={CLIENT_TESTIMONIAL_VIDEOS}
          variant="stacked"
          titleFormat="testimonial"
          includeWithoutVideo
          showDescription={false}
        />
      </section>
    </>
  );
}
