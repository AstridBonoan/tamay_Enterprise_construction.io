"use client";

import Image from "next/image";
import { useState } from "react";
import { IMAGES } from "@/lib/images";

const slides = [
  IMAGES.homepage.image2,
  IMAGES.homepage.image3,
  IMAGES.homepage.image4,
  IMAGES.homepage.image5,
  IMAGES.homepage.image6,
  IMAGES.homepage.image7,
  IMAGES.homepage.image8,
  IMAGES.homepage.image9,
  IMAGES.homepage.image10,
  IMAGES.homepage.image11,
];

export function HomeImageShowcase() {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i === 0 ? slides.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === slides.length - 1 ? 0 : i + 1));

  return (
    <section className="bg-white py-6 sm:py-8">
      <div className="relative mx-auto max-w-6xl px-0 sm:px-4">
        <div className="relative aspect-[16/10] sm:aspect-[21/9] overflow-hidden bg-gray-100">
          <Image
            src={slides[index]}
            alt={`Tamay Enterprises project ${index + 1}`}
            fill
            className="object-cover transition-opacity duration-500"
            sizes="100vw"
            unoptimized
            priority={index === 0}
          />
          <div className="absolute inset-x-0 bottom-0 flex justify-between items-center p-3 sm:p-4 bg-gradient-to-t from-black/60 to-transparent">
            <button
              type="button"
              onClick={prev}
              className="rounded-full bg-white/90 p-2 text-tamay-primary shadow hover:bg-white"
              aria-label="Previous image"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-white text-sm font-semibold">
              {index + 1} / {slides.length}
            </span>
            <button
              type="button"
              onClick={next}
              className="rounded-full bg-white/90 p-2 text-tamay-primary shadow hover:bg-white"
              aria-label="Next image"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto px-4 py-3 sm:justify-center scrollbar-hide">
          {slides.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setIndex(i)}
              className={`relative h-14 w-20 shrink-0 overflow-hidden border-2 transition-colors ${
                i === index ? "border-tamay-accent" : "border-transparent opacity-70"
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <Image src={src} alt="" fill className="object-cover" sizes="80px" unoptimized />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
