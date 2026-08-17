"use client";

import { ImageCarousel } from "@/components/ui/ImageCarousel";
import { useResolvedImages } from "@/components/images/SiteImagesProvider";

export function HomeImageShowcase() {
  const images = useResolvedImages();
  const slides = [
    { src: images.homepage.image2, alt: "Tamay Enterprises project 2", slotKey: "homepage.image2" },
    { src: images.homepage.image3, alt: "Tamay Enterprises project 3", slotKey: "homepage.image3" },
    { src: images.homepage.image4, alt: "Tamay Enterprises project 4", slotKey: "homepage.image4" },
    { src: images.homepage.image5, alt: "Tamay Enterprises project 5", slotKey: "homepage.image5" },
    { src: images.homepage.image6, alt: "Tamay Enterprises project 6", slotKey: "homepage.image6" },
    { src: images.homepage.image7, alt: "Tamay Enterprises project 7", slotKey: "homepage.image7" },
    { src: images.homepage.image8, alt: "Tamay Enterprises project 8", slotKey: "homepage.image8" },
    { src: images.homepage.image9, alt: "Tamay Enterprises van serving Connecticut communities", slotKey: "homepage.image9" },
    { src: images.homepage.image10, alt: "Tamay Enterprises company garage and fleet maintenance", slotKey: "homepage.image10" },
    { src: images.homepage.image11, alt: "Tamay Enterprises fleet at company headquarters", slotKey: "homepage.image11" },
  ];
  return (
    <section className="bg-white py-6 sm:py-8">
      <div className="relative mx-auto max-w-6xl px-0 sm:px-4">
        <ImageCarousel slides={slides} />
      </div>
    </section>
  );
}
