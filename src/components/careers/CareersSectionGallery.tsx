"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { CAREERS_SECTION_IMAGES } from "@/lib/careerImages";

export function CareersSectionGallery() {
  const [index, setIndex] = useState(0);
  const total = CAREERS_SECTION_IMAGES.length;

  const go = useCallback(
    (next: number) => {
      setIndex((i) => (i + next + total) % total);
    },
    [total]
  );

  const slide = CAREERS_SECTION_IMAGES[index];

  return (
    <div className="mb-10">
      <div className="relative w-full aspect-[16/9] max-h-[420px] bg-gray-200 overflow-hidden">
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          className="object-cover"
          sizes="(max-width: 896px) 100vw, 896px"
          priority={index === 0}
        />
        <button
          type="button"
          onClick={() => go(-1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/55 text-white text-xl leading-none"
          aria-label="Previous image"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/55 text-white text-xl leading-none"
          aria-label="Next image"
        >
          ›
        </button>
      </div>
      <p className="text-center text-sm text-gray-500 mt-3" aria-live="polite">
        {index + 1}/{total}
      </p>
      <div className="flex justify-center gap-2 mt-2">
        {CAREERS_SECTION_IMAGES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              i === index ? "bg-tamay-primary" : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Show image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
