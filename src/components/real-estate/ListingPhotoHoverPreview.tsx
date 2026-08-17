"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ImageCarousel, type ImageCarouselSlide } from "@/components/ui/ImageCarousel";

type ListingPhotoHoverPreviewProps = {
  slides: ImageCarouselSlide[];
  open: boolean;
  onStay: () => void;
  onLeave: () => void;
};

export function ListingPhotoHoverPreview({
  slides,
  open,
  onStay,
  onLeave,
}: ListingPhotoHoverPreviewProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onLeave();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onLeave]);

  if (!mounted || !open || slides.length === 0) return null;

  const viewSlides = slides.map(({ src, alt }) => ({ src, alt }));

  return createPortal(
    <div className="pointer-events-none fixed inset-0 z-[130] flex items-center justify-center p-4 sm:p-8">
      <div className="pointer-events-none absolute inset-0 bg-black/50" />
      <div
        className="pointer-events-auto relative z-10 w-full max-w-4xl origin-center animate-[fadeIn_0.2s_ease-out] overflow-hidden rounded-sm bg-white shadow-2xl"
        onMouseEnter={onStay}
        onMouseLeave={onLeave}
        role="dialog"
        aria-modal="true"
        aria-label="Property photos"
      >
        <ImageCarousel
          slides={viewSlides}
          aspectClassName="aspect-[16/10]"
          showThumbnails={slides.length > 1}
          showCaption={false}
          showNavArrows={slides.length > 1}
          paused
          navButtonClassName="rounded-full bg-white min-w-11 min-h-11 p-2.5 text-tamay-primary shadow-md border border-gray-200 hover:bg-gray-50 shrink-0"
        />
      </div>
    </div>,
    document.body,
  );
}
