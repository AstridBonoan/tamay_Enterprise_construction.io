"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { CAREERS_INTRO_SLIDES } from "@/lib/careerImages";

/** Full-width intro gallery placed directly under the page hero (live site layout). */
export function CareersIntroGallery() {
  const [index, setIndex] = useState(0);
  const total = CAREERS_INTRO_SLIDES.length;

  const go = useCallback(
    (next: number) => {
      setIndex((i) => (i + next + total) % total);
    },
    [total]
  );

  const slide = CAREERS_INTRO_SLIDES[index];

  return (
    <section aria-label="Careers highlights" className="bg-gray-900">
      <div className="relative w-full aspect-[21/9] min-h-[220px] max-h-[480px]">
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          className="object-cover opacity-95"
          sizes="100vw"
          priority={index === 0}
        />
        <div className="absolute inset-0 bg-tamay-primary/20" aria-hidden />
        <button
          type="button"
          onClick={() => go(-1)}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-black/45 hover:bg-black/60 text-white text-2xl leading-none z-10"
          aria-label="Previous slide"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-black/45 hover:bg-black/60 text-white text-2xl leading-none z-10"
          aria-label="Next slide"
        >
          ›
        </button>
        <p
          className="absolute bottom-4 right-4 bg-black/50 text-white text-sm px-3 py-1 z-10"
          aria-live="polite"
        >
          {index + 1}/{total}
        </p>
      </div>
    </section>
  );
}
