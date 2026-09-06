import type { Metadata } from "next";
import { GalleryHero } from "@/components/gallery/GalleryHero";
import { GalleryPromotionSection } from "@/components/gallery/GalleryPromotionSection";
import { GalleryPhotoCarousel } from "@/components/gallery/GalleryPhotoCarousel";
import { TamayVideoGallery } from "@/components/reviews/TamayVideoGallery";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SiteContactSection } from "@/components/ui/SiteContactSection";
import { GALLERY_VIDEO_PROJECTS } from "@/lib/galleryVideos";
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
      <GalleryHero />

      <GalleryPromotionSection />

      <section
        id="featured-projects"
        className="py-14 max-w-6xl mx-auto px-4 border-t border-gray-200 scroll-mt-24"
      >
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
