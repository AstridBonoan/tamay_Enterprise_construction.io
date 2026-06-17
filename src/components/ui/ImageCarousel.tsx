"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { GalleryPictureFrame } from "@/components/gallery/GalleryPictureFrame";
import { useCarouselAutoplay } from "@/hooks/useCarouselAutoplay";

export type ImageCarouselSlide = {
  src: string;
  alt: string;
};

type ImageCarouselProps = {
  slides: ImageCarouselSlide[];
  /** Tailwind aspect ratio classes for the main viewport */
  aspectClassName?: string;
  /** Show thumbnail strip below main image */
  showThumbnails?: boolean;
  /** Show active slide title below thumbnails */
  showCaption?: boolean;
  autoplayIntervalMs?: number;
  /** Optional ornate frame overlay for gallery-style presentation */
  frameSrc?: string;
};

export function ImageCarousel({
  slides,
  aspectClassName = "aspect-[16/10] sm:aspect-[21/9]",
  showThumbnails = true,
  showCaption = false,
  autoplayIntervalMs,
  frameSrc,
}: ImageCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const prev = useCallback(
    () => setIndex((i) => (i === 0 ? slides.length - 1 : i - 1)),
    [slides.length],
  );
  const next = useCallback(
    () => setIndex((i) => (i === slides.length - 1 ? 0 : i + 1)),
    [slides.length],
  );

  useCarouselAutoplay({
    itemCount: slides.length,
    onAdvance: next,
    intervalMs: autoplayIntervalMs,
    paused,
  });

  const goTo = useCallback((i: number) => {
    setIndex(i);
    thumbRefs.current[i]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, []);

  if (slides.length === 0) return null;

  const mainSlide = slides[index];

  const navButtonClass =
    "rounded-full bg-white p-2 text-tamay-primary shadow-md border border-gray-200 hover:bg-gray-50 shrink-0";

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {frameSrc ? (
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 sm:gap-4 px-1">
            <button type="button" onClick={prev} className={navButtonClass} aria-label="Previous image">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="min-w-0 flex-1">
              <GalleryPictureFrame
                src={mainSlide.src}
                alt={mainSlide.alt}
                frameSrc={frameSrc}
                priority={index === 0}
              />
            </div>
            <button type="button" onClick={next} className={navButtonClass} aria-label="Next image">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <p className="text-center text-sm text-gray-600 font-medium mt-4">
            {index + 1} / {slides.length}
          </p>
        </div>
      ) : (
        <div className={`relative overflow-hidden bg-gray-100 ${aspectClassName}`}>
          <Image
            src={mainSlide.src}
            alt={mainSlide.alt}
            fill
            className="object-cover transition-opacity duration-500"
            sizes="100vw"
            unoptimized
            priority={index === 0}
          />
          <div className="absolute inset-x-0 bottom-0 flex justify-between items-center p-3 sm:p-4 bg-gradient-to-t from-black/60 to-transparent">
            <button type="button" onClick={prev} className={navButtonClass} aria-label="Previous image">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-white text-sm font-semibold">
              {index + 1} / {slides.length}
            </span>
            <button type="button" onClick={next} className={navButtonClass} aria-label="Next image">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {showThumbnails && (
        <div className="flex gap-3 overflow-x-auto px-4 py-4 sm:justify-center scrollbar-hide">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              ref={(el) => {
                thumbRefs.current[i] = el;
              }}
              onClick={() => goTo(i)}
              className={`relative shrink-0 transition-opacity ${
                frameSrc ? "w-24" : "h-14 w-20 overflow-hidden border-2"
              } ${i === index ? (frameSrc ? "opacity-100" : "border-tamay-accent") : frameSrc ? "opacity-65 hover:opacity-90" : "border-transparent opacity-70"}`}
              aria-label={`View image ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
            >
              {frameSrc ? (
                <GalleryPictureFrame
                  src={slide.src}
                  alt=""
                  frameSrc={frameSrc}
                  compact
                  active={i === index}
                  sizes="96px"
                />
              ) : (
                <Image src={slide.src} alt="" fill className="object-cover" sizes="80px" unoptimized />
              )}
            </button>
          ))}
        </div>
      )}

      {showCaption && (
        <p className="text-center text-sm text-tamay-primary font-semibold mt-3 px-4 min-h-[2.5rem]">
          {slides[index]?.alt}
        </p>
      )}
    </div>
  );
}
