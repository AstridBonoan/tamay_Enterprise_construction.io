import type { Metadata } from "next";
import Image from "next/image";
import { HeroBanner } from "@/components/ui/HeroBanner";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photo gallery of construction and renovation projects by Tamay Enterprises across Connecticut.",
};

export default function GalleryPage() {
  return (
    <>
      <HeroBanner
        image={IMAGES.heroHome}
        title="Our Work Across Connecticut"
        subtitle="Every home has a story, and every project we complete becomes part of it."
        height="medium"
      />

      <section className="py-10 bg-tamay-accent text-white text-center">
        <h2 className="font-heading text-2xl font-bold">2026 🎉 New year promotion 🎉</h2>
      </section>

      <section className="py-14 max-w-6xl mx-auto px-4">
        <SectionHeading title="Photo Gallery" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {IMAGES.gallery.map((item, index) => (
            <article key={item.title} className="group overflow-hidden shadow-md bg-white">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width:768px) 100vw, 33vw"
                  unoptimized
                />
                {index === 0 && (
                  <span className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1">
                    1/{IMAGES.gallery.length}
                  </span>
                )}
              </div>
              <h3 className="font-heading text-center text-tamay-primary font-semibold py-4 px-2 text-sm md:text-base">
                {item.title}
              </h3>
            </article>
          ))}
        </div>
      </section>

      <section className="py-14 text-center bg-gray-50">
        <SectionHeading title="Instagram" subtitle="Follow @tamay.enterprises for more project photos." />
        <a
          href="https://www.instagram.com/tamay.enterprises/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-tamay-primary font-semibold hover:underline"
        >
          View on Instagram
        </a>
      </section>
    </>
  );
}
