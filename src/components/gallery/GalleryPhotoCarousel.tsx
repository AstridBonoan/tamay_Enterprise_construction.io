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
    <div className="max-w-6xl mx-auto -mt-2">
      <ImageCarousel slides={slides} showThumbnails showCaption framed />
    </div>
  );
}
