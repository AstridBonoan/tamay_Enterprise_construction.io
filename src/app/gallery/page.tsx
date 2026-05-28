import type { Metadata } from "next";
import Image from "next/image";
import { TamayVideoGallery } from "@/components/reviews/TamayVideoGallery";
import { HeroBanner } from "@/components/ui/HeroBanner";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { assetUrl } from "@/lib/assetUrl";
import { GALLERY_PROMOTION_VIDEO, GALLERY_VIDEO_PROJECTS } from "@/lib/galleryVideos";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "GALLERY",
  description:
    "Project video gallery of construction and renovation work by Tamay Enterprises across Connecticut.",
};

const PHOTO_GALLERY_ITEMS = [
  { title: "Modern Kitchen Renovation", src: assetUrl("/gallery/photos/photo-1.png") },
  { title: "Luxury Bathroom Vanity Installation", src: assetUrl("/gallery/photos/photo-2.png") },
  { title: "Contemporary Bathroom Remodel", src: assetUrl("/gallery/photos/photo-3.png") },
  { title: "Custom Kitchen Island Build", src: assetUrl("/gallery/photos/photo-4.png") },
  { title: "Tamay Logistics Fleet", src: assetUrl("/gallery/photos/photo-5.png") },
  { title: "New Home Exterior Project", src: assetUrl("/gallery/photos/photo-6.png") },
  { title: "Furniture Assembly On-Site", src: assetUrl("/gallery/photos/photo-7.png") },
  { title: "Upholstery Repair & Assembly", src: assetUrl("/gallery/photos/photo-8.png") },
  { title: "Precision Wall Installation", src: assetUrl("/gallery/photos/photo-9.png") },
  { title: "Commercial Furniture Setup", src: assetUrl("/gallery/photos/photo-10.png") },
  { title: "Bedroom Frame Assembly", src: assetUrl("/gallery/photos/photo-11.png") },
  { title: "Vanity Installation Service", src: assetUrl("/gallery/photos/photo-12.png") },
] as const;

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

      <section className="py-14 max-w-6xl mx-auto px-4 border-t border-gray-200">
        <SectionHeading
          title="Photo Gallery"
          subtitle="Completed projects across renovation, remodeling, and installation work."
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 -mt-2">
          {PHOTO_GALLERY_ITEMS.map((photo) => (
            <figure
              key={photo.title}
              className="flex flex-col border border-gray-200 bg-white rounded-sm overflow-hidden h-full"
            >
              <div className="relative aspect-[4/3] w-full bg-gray-100">
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  className="object-contain p-1"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  unoptimized
                />
              </div>
              <figcaption className="px-2 py-2.5 text-xs sm:text-sm text-center text-tamay-primary font-semibold leading-snug border-t border-gray-100 min-h-[3.25rem] flex items-center justify-center">
                {photo.title}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="gallery" className="py-14 max-w-6xl mx-auto px-4 border-t border-gray-200">
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
