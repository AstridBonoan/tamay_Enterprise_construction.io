import type { Metadata } from "next";
import Link from "next/link";
import { HeroBanner } from "@/components/ui/HeroBanner";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GalleryCarousel } from "@/components/gallery/GalleryCarousel";
import { IMAGES } from "@/lib/images";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "GALLERY",
  description:
    "Photo gallery of construction and renovation projects by Tamay Enterprises across Connecticut.",
};

const galleryProjects = [...IMAGES.gallery];
const featuredSlides = galleryProjects.slice(0, 6);

const socialLinks = [
  { href: SITE.social.facebook, label: "Facebook" },
  { href: SITE.social.instagram, label: "Instagram" },
  { href: SITE.social.tiktok, label: "TikTok" },
  { href: SITE.social.youtube, label: "YouTube" },
];

export default function GalleryPage() {
  return (
    <>
      <HeroBanner
        image={IMAGES.heroHome}
        title="Our Work Across Connecticut"
        subtitle="Every home has a story, and every project we complete becomes part of it."
        cta={{ label: "Find out more", href: "#gallery" }}
        height="medium"
      />

      <section className="py-10 bg-tamay-accent text-white text-center">
        <h2 className="font-heading text-2xl md:text-3xl font-bold px-4">
          2026 🎉New year promotion 🎉
        </h2>
      </section>

      <section id="gallery" className="py-14 max-w-6xl mx-auto px-4">
        <SectionHeading title="Photo Gallery" />
        <div className="mb-14 -mt-2">
          <GalleryCarousel slides={featuredSlides} />
        </div>

        <div className="max-w-3xl mx-auto">
          {galleryProjects.map((item, index) => (
            <div key={item.title}>
              {index > 0 && <hr className="border-gray-200 my-8" />}
              <h2 className="font-heading text-lg md:text-xl text-tamay-primary font-semibold text-center py-2">
                {item.title}
              </h2>
            </div>
          ))}
        </div>
      </section>

      <section className="py-14 text-center bg-gray-50 px-4">
        <SectionHeading title="Instagram" />
        <p className="text-gray-600 -mt-2 mb-8">Follow us for more project photos and updates.</p>
        <div className="flex flex-wrap justify-center gap-4">
          {socialLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center min-w-[140px] px-6 py-3 bg-tamay-primary text-white text-sm font-semibold tracking-wide hover:bg-tamay-primary/90 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <a
          href={SITE.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-6 text-tamay-primary font-semibold hover:underline"
        >
          @tamay.enterprises on Instagram
        </a>
      </section>
    </>
  );
}
