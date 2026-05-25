"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const videoSrc = assetUrl("/homepage/HomePageVideo.mp4");
  const poster = posterImage
    ? assetUrl(posterImage)
    : assetUrl("/homepage/HomePageImage1.webp");

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const play = async () => {
      try {
        video.muted = true;
        await video.play();
        setVideoReady(true);
      } catch {
        setVideoReady(false);
      }
    };

    play();
  }, [videoSrc]);

  return (
    <section className="relative min-h-[min(85vh,800px)] sm:min-h-[min(92vh,900px)] flex items-center justify-center overflow-hidden -mt-[7.25rem] lg:-mt-[8.75rem]">
      {/* Poster / fallback — always visible until video plays */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${poster})` }}
        aria-hidden
      />

      <video
        ref={videoRef}
        src={videoSrc}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          videoReady ? "opacity-100" : "opacity-0"
        }`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={poster}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/65" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 pt-24 pb-16 sm:pt-28 sm:pb-20 text-center text-white">
        {tagline && (
          <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-3 text-tamay-accent">
            {tagline}
          </p>
        )}
        <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 text-balance drop-shadow-sm">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm sm:text-base md:text-lg text-gray-100 max-w-2xl mx-auto mb-8 leading-relaxed drop-shadow-sm">
            {subtitle}
          </p>
        )}
        {cta && (
          <Link
            href={cta.href}
            className="inline-block bg-tamay-primary hover:bg-tamay-primary-dark text-white font-bold px-6 sm:px-8 py-3 text-sm tracking-wide transition-colors shadow-lg"
          >
            {cta.label}
          </Link>
        )}
      </div>
    </section>
  );
}
