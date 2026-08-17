"use client";

import { ImageCarousel, type ImageCarouselSlide } from "@/components/ui/ImageCarousel";
import { useResolvedSiteMedia } from "@/components/images/SiteImagesProvider";
import { mediaSrc } from "@/lib/siteImages";

type GalleryPhotoCarouselProps = {
  photos: readonly { title: string; src: string; slotKey?: string }[];
};

export function GalleryPhotoCarousel({ photos }: GalleryPhotoCarouselProps) {
  const media = useResolvedSiteMedia();
  const slides: ImageCarouselSlide[] = photos.map((photo) => ({
    src: photo.slotKey ? mediaSrc(media, photo.slotKey) : photo.src,
    alt: photo.title,
    slotKey: photo.slotKey,
  }));

  return (
    <div className="max-w-6xl mx-auto -mt-2">
      <ImageCarousel slides={slides} showThumbnails={false} showNavArrows={false} showCaption />
    </div>
  );
}
