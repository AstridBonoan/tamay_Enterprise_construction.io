"use client";

import { ImageCarousel, type ImageCarouselSlide } from "@/components/ui/ImageCarousel";

type GalleryPhotoCarouselProps = {
  photos: readonly { title: string; src: string }[];
};

export function GalleryPhotoCarousel({ photos }: GalleryPhotoCarouselProps) {
  const slides: ImageCarouselSlide[] = photos.map((photo) => ({
    src: photo.src,
    alt: photo.title,
  }));

  return (
    <div className="max-w-4xl mx-auto -mt-2">
      <ImageCarousel
        slides={slides}
        aspectClassName="aspect-[4/3] sm:aspect-[16/10]"
        showThumbnails
        showCaption
      />
    </div>
  );
}
