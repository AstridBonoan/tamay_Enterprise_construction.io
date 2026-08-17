"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { assetUrl } from "@/lib/assetUrl";
import { HERO_VIDEO, SITE } from "@/lib/site";

type HeroVideoBannerProps = {
  /** Video hero with headline + message overlay (homepage) */
  withMessage?: boolean;
  tagline?: string;
  title?: string;
  titleLine2?: string;
  subtitle?: string;
  cta?: { label: string; href: string };
};

function tryPlay(video: HTMLVideoElement) {
  video.muted = true;
  video.defaultMuted = true;
  video.setAttribute("muted", "");
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");
  return video.play().catch(() => {
    // Autoplay may be blocked until user interaction; keep retrying below.
  });
}

export function HeroVideoBanner({
  withMessage = false,
  tagline,
  title,
  titleLine2,
  subtitle,
  cta,
}: HeroVideoBannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSrc = assetUrl("/homepage/HomePageVideo.mp4");

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const play = () => {
      void tryPlay(video);
    };

    play();

    const onReady = () => play();
    video.addEventListener("loadeddata", onReady);
    video.addEventListener("canplay", onReady);
    video.addEventListener("loadedmetadata", onReady);

    const onVisibility = () => {
      if (document.visibilityState === "visible") play();
    };
    document.addEventListener("visibilitychange", onVisibility);

    // iOS / mobile browsers often require a user gesture; retry once on first interaction.
    const onFirstGesture = () => play();
    window.addEventListener("touchstart", onFirstGesture, { once: true, passive: true });
    window.addEventListener("click", onFirstGesture, { once: true });
    window.addEventListener("scroll", onFirstGesture, { once: true, passive: true });

    const retryTimers = [250, 750, 1500].map((ms) => window.setTimeout(play, ms));

    return () => {
      video.removeEventListener("loadeddata", onReady);
      video.removeEventListener("canplay", onReady);
      video.removeEventListener("loadedmetadata", onReady);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("touchstart", onFirstGesture);
      window.removeEventListener("click", onFirstGesture);
      window.removeEventListener("scroll", onFirstGesture);
      retryTimers.forEach((id) => window.clearTimeout(id));
    };
  }, [videoSrc]);

  return (
    <section
      className={`relative w-full min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] flex justify-center overflow-hidden ${
        withMessage ? "items-start pt-14 sm:items-center sm:pt-0" : "items-center"
      }`}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      <div
        className={`absolute inset-0 ${
          withMessage
            ? "bg-gradient-to-t from-black/70 via-black/45 to-black/35"
            : "bg-gradient-to-t from-black/75 via-black/40 to-black/30"
        }`}
      />

      {withMessage ? (
        <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 pt-2 sm:pt-0 text-center text-white">
          <h1 className="font-heading text-3xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-bold leading-tight mb-6 sm:mb-8 text-balance drop-shadow-md">
            {HERO_VIDEO.headline}
          </h1>
          <p>
            <span className="block text-sm sm:text-sm font-semibold tracking-[0.15em] uppercase mb-3 text-tamay-accent drop-shadow-sm">
              {HERO_VIDEO.eyebrow}
            </span>
            <a
              href={SITE.phoneTel}
              aria-label={`Call Tamay Enterprises at ${SITE.phone}`}
              className="inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-white/40 bg-white/10 px-6 py-3.5 text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-wide drop-shadow-md transition-colors hover:bg-white/20 hover:border-white/60 active:bg-white/25 min-h-[52px] min-w-[220px]"
            >
              <svg className="w-6 h-6 sm:w-7 sm:h-7 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              {SITE.phone}
            </a>
            <span className="block mt-3 text-sm sm:text-sm text-white/75 tracking-[0.12em] uppercase">
              {tagline ?? SITE.tagline}
            </span>
          </p>
        </div>
      ) : (
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16 lg:pb-20 pt-32 text-center text-white">
          {tagline && (
            <p className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase mb-4 text-tamay-accent">
              {tagline}
            </p>
          )}
          {title && (
            <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-tight mb-1 text-balance">
              {title}
            </h1>
          )}
          {titleLine2 && (
            <p className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-tight mb-5 text-balance">
              {titleLine2}
            </p>
          )}
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
      )}
    </section>
  );
}
