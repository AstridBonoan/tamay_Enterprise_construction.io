import Link from "next/link";
import { assetUrl } from "@/lib/assetUrl";

type HeroVideoBannerProps = {
  tagline?: string;
  title: string;
  subtitle?: string;
  cta?: { label: string; href: string };
  posterImage?: string;
};

export function HeroVideoBanner({
  tagline,
  title,
  subtitle,
  cta,
  posterImage,
}: HeroVideoBannerProps) {
  const videoSrc = assetUrl("/homepage/HomePageVideo.mp4");
  const poster = posterImage ? assetUrl(posterImage) : assetUrl("/homepage/HomePageImage1.webp");

  return (
    <section className="relative min-h-[min(100svh,720px)] flex items-center justify-center overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-20 sm:py-24 text-center text-white">
        {tagline && (
          <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-3 text-tamay-accent">
            {tagline}
          </p>
        )}
        <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 text-balance">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm sm:text-base md:text-lg text-gray-100 max-w-2xl mx-auto mb-8 leading-relaxed">
            {subtitle}
          </p>
        )}
        {cta && (
          <Link
            href={cta.href}
            className="inline-block bg-tamay-accent hover:bg-tamay-accent-hover text-white font-bold px-6 sm:px-8 py-3 text-sm tracking-wide transition-colors"
          >
            {cta.label}
          </Link>
        )}
      </div>
    </section>
  );
}
