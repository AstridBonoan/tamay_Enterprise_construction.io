import type { Metadata } from "next";
import { TamayVideoGallery } from "@/components/reviews/TamayVideoGallery";
import { HeroBanner } from "@/components/ui/HeroBanner";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GALLERY_PROMOTION_VIDEO, GALLERY_VIDEO_PROJECTS } from "@/lib/galleryVideos";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "GALLERY",
  description:
    "Project video gallery of construction and renovation work by Tamay Enterprises across Connecticut.",
};

export default function GalleryPage() {
  return (
    <>
      <HeroBanner
        image={IMAGES.heroHome}
        title="Our Work Across Connecticut"
        subtitle="Every home has a story, and every project we complete becomes part of it."
        cta={{ label: "Find out more", href: "#gallery" }}
        height="medium"
      />

      <section className="py-14 bg-gray-50 px-4">
        <div className="max-w-3xl mx-auto tamay-gallery-promo">
          <TamayVideoGallery
            projects={[GALLERY_PROMOTION_VIDEO]}
            instanceId="gallery-promo"
            showTitle
          />
        </div>
      </section>

      <section id="gallery" className="py-14 max-w-6xl mx-auto px-4">
        <SectionHeading title="Video Gallery" />
        <div className="-mt-2">
          <TamayVideoGallery
            projects={GALLERY_VIDEO_PROJECTS}
            instanceId="gallery"
            showTitle
            grouped
          />
        </div>
      </section>
    </>
  );
}
