"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export type GallerySlide = {
  title: string;
  src: string;
};

type GalleryCarouselProps = {
  slides: GallerySlide[];
  autoAdvanceMs?: number;
};

export function GalleryCarousel({ slides, autoAdvanceMs = 6000 }: GalleryCarouselProps) {
  const [index, setIndex] = useState(0);
  const total = slides.length;

  const prev = useCallback(() => {
    setIndex((i) => (i === 0 ? total - 1 : i - 1));
  }, [total]);

  const next = useCallback(() => {
    setIndex((i) => (i === total - 1 ? 0 : i + 1));
  }, [total]);

  useEffect(() => {
    if (total <= 1 || autoAdvanceMs <= 0) return;
    const timer = window.setInterval(next, autoAdvanceMs);
    return () => window.clearInterval(timer);
  }, [autoAdvanceMs, next, total]);

  if (total === 0) return null;

  const current = slides[index];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 shadow-md">
        <Image
          src={current.src}
          alt={current.title}
          fill
          className="object-cover transition-opacity duration-500"
          sizes="(max-width: 768px) 100vw, 896px"
          unoptimized
          priority={index === 0}
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent px-4 pt-16 pb-4">
          <h3 className="font-heading text-white text-lg md:text-xl font-semibold text-center mb-4">
            {current.title}
          </h3>
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={prev}
              className="rounded-full bg-white/90 p-2 text-tamay-primary shadow hover:bg-white"
              aria-label="Previous project"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-white text-sm font-semibold tabular-nums">
              {index + 1}/{total}
            </span>
            <button
              type="button"
              onClick={next}
              className="rounded-full bg-white/90 p-2 text-tamay-primary shadow hover:bg-white"
              aria-label="Next project"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {slides.map((slide, i) => (
          <button
            key={slide.title}
            type="button"
            onClick={() => setIndex(i)}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${
              i === index ? "bg-tamay-primary" : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`View ${slide.title}`}
            aria-current={i === index ? "true" : undefined}
          />
        ))}
      </div>
    </div>
  );
}
