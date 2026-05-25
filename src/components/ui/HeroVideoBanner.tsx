"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { assetUrl } from "@/lib/assetUrl";

type HeroVideoBannerProps = {
  tagline?: string;
  title: string;
  titleLine2?: string;
  subtitle?: string;
  cta?: { label: string; href: string };
  posterImage?: string;
};

export function HeroVideoBanner({
  tagline,
  title,
  titleLine2,
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
    <section className="relative w-full min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] flex items-end overflow-hidden">
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

      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/30" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16 lg:pb-20 pt-32 text-center text-white">
        {tagline && (
          <p className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase mb-4 text-tamay-accent">
            {tagline}
          </p>
        )}
        <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-tight mb-1 text-balance">
          {title}
        </h1>
        {titleLine2 && (
          <p className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-tight mb-5 text-balance">
            {titleLine2}
          </p>
        )}
        {!titleLine2 && <div className="mb-5" />}
        {subtitle && (
          <p className="text-sm sm:text-base md:text-lg text-gray-100 max-w-2xl mx-auto mb-8 leading-relaxed">
            {subtitle}
          </p>
        )}
        {cta && (
          <Link
            href={cta.href}
            className="inline-block bg-tamay-primary hover:bg-tamay-primary-dark text-white font-bold px-8 py-3.5 text-sm tracking-wide transition-colors shadow-lg"
          >
            {cta.label}
          </Link>
        )}
      </div>
    </section>
  );
}
