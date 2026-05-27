import type { Metadata } from "next";
import Link from "next/link";
import { TamayVideoGallery } from "@/components/reviews/TamayVideoGallery";
import { HeroBanner } from "@/components/ui/HeroBanner";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GALLERY_VIDEO_PROJECTS } from "@/lib/galleryVideos";
import { IMAGES } from "@/lib/images";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "GALLERY",
  description:
    "Project video gallery of construction and renovation work by Tamay Enterprises across Connecticut.",
};

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
        <div className="-mt-2">
          <TamayVideoGallery
            projects={GALLERY_VIDEO_PROJECTS}
            instanceId="gallery"
            showTitle
            grouped
          />
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
