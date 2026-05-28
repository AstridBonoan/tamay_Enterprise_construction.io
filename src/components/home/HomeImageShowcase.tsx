"use client";

import { ImageCarousel } from "@/components/ui/ImageCarousel";
import { IMAGES } from "@/lib/images";

const slides = [
  { src: IMAGES.homepage.image2, alt: "Tamay Enterprises project 2" },
  { src: IMAGES.homepage.image3, alt: "Tamay Enterprises project 3" },
  { src: IMAGES.homepage.image4, alt: "Tamay Enterprises project 4" },
  { src: IMAGES.homepage.image5, alt: "Tamay Enterprises project 5" },
  { src: IMAGES.homepage.image6, alt: "Tamay Enterprises project 6" },
  { src: IMAGES.homepage.image7, alt: "Tamay Enterprises project 7" },
  { src: IMAGES.homepage.image8, alt: "Tamay Enterprises project 8" },
  { src: IMAGES.homepage.image9, alt: "Tamay Enterprises project 9" },
  { src: IMAGES.homepage.image10, alt: "Tamay Enterprises project 10" },
  { src: IMAGES.homepage.image11, alt: "Tamay Enterprises project 11" },
];

export function HomeImageShowcase() {
  return (
    <section className="bg-white py-6 sm:py-8">
      <div className="relative mx-auto max-w-6xl px-0 sm:px-4">
        <ImageCarousel slides={slides} />
      </div>
    </section>
  );
}
