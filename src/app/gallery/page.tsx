import type { Metadata } from "next";
import { GalleryPhotoCarousel } from "@/components/gallery/GalleryPhotoCarousel";
import { TamayVideoGallery } from "@/components/reviews/TamayVideoGallery";
import { HeroBanner } from "@/components/ui/HeroBanner";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SiteContactSection } from "@/components/ui/SiteContactSection";
import { GALLERY_PROMOTION_VIDEO, GALLERY_VIDEO_PROJECTS } from "@/lib/galleryVideos";
import { GALLERY_PHOTO_SLOTS } from "@/lib/siteImageSlots";
import { getResolvedSiteMedia, mediaSrc } from "@/lib/siteImages";
import { buildSocialMetadata } from "@/lib/socialMetadata";

export const metadata: Metadata = buildSocialMetadata("gallery");

export default async function GalleryPage() {
  const media = await getResolvedSiteMedia();
  const photos = GALLERY_PHOTO_SLOTS.map((slot) => ({
    title: slot.title,
    src: mediaSrc(media, slot.key),
    slotKey: slot.key,
  }));
  return (
    <>
      <HeroBanner
        image={media.images.heroHome}
        slotKey="heroHome"
        copyKey="gallery.hero"
        title="Our Work Across Connecticut"
        subtitle="Every home has a story, and every project we complete becomes part of it."
        cta={{ label: "Find out more", href: "#contact" }}
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

      <section className="py-14 max-w-6xl mx-auto px-4 border-t border-gray-200">
        <SectionHeading
          copyKey="gallery.photos"
          title="Photo Gallery"
          subtitle="Completed projects across renovation, remodeling, and installation work."
        />
        <GalleryPhotoCarousel photos={photos} />
      </section>

      <section id="gallery" className="py-14 max-w-6xl mx-auto px-4 border-t border-gray-200">
        <SectionHeading copyKey="gallery.videos" title="Video Gallery" />
        <div className="-mt-2">
          <TamayVideoGallery
            projects={GALLERY_VIDEO_PROJECTS}
            instanceId="gallery"
            showTitle
            grouped
          />
        </div>
      </section>

      <SiteContactSection />
    </>
  );
}
