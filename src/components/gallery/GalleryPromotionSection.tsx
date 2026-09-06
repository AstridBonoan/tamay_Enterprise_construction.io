"use client";

import { useCallback, useEffect, useId, useState } from "react";
import Link from "next/link";
import {
  constructionOutlineLinkClass,
  constructionPrimaryLinkClass,
} from "@/components/construction/constructionCtaStyles";
import { GALLERY_PROMOTION_VIDEO } from "@/lib/galleryVideos";
import { appointmentScheduleHref } from "@/lib/onlineAppointments";
import { sitePath } from "@/lib/paths";
import "@/components/reviews/tamay-video-gallery.css";

const NAVY = "#141c2b";
const PROMO_VIDEO_ID = GALLERY_PROMOTION_VIDEO.videos[0] ?? "";

function thumbCandidates(id: string) {
  return [
    `https://i.ytimg.com/vi/${id}/hq720.jpg`,
    `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
    `https://i.ytimg.com/vi/${id}/sddefault.jpg`,
    `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
  ];
}

function PromoVideoThumb({ youtubeId }: { youtubeId: string }) {
  const [index, setIndex] = useState(0);
  const candidates = thumbCandidates(youtubeId);
  const src = candidates[Math.min(index, candidates.length - 1)]!;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setIndex((i) => (i + 1 < candidates.length ? i + 1 : i))}
      onLoad={(e) => {
        const img = e.currentTarget;
        if (img.naturalWidth > 0 && img.naturalWidth <= 140 && index + 1 < candidates.length) {
          setIndex((i) => i + 1);
        }
      }}
    />
  );
}

function WarrantyShield({ className = "h-14 w-14" }: { className?: string }) {
  return (
    <div className={`relative shrink-0 ${className}`} aria-hidden>
      <svg viewBox="0 0 72 80" fill="none" className="h-full w-full">
        <defs>
          <linearGradient id="galleryPromoShieldFill" x1="36" y1="4" x2="36" y2="76" gradientUnits="userSpaceOnUse">
            <stop stopColor="#c9a227" stopOpacity="0.22" />
            <stop offset="1" stopColor="#c9a227" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <path
          d="M36 3.5 66.5 15v24.8c0 16.8-12.2 31.6-30.5 36.7C17.7 70.4 5.5 55.6 5.5 39.8V15L36 3.5Z"
          fill="url(#galleryPromoShieldFill)"
          stroke="#c9a227"
          strokeWidth="1.35"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center pt-[14%] font-heading text-xl font-semibold leading-none text-tamay-accent">
        7
      </span>
    </div>
  );
}

/**
 * Gallery promotional feature — warranty + Kitchen Tune-Up + Bathroom Rejuvenize.
 * Uses existing GALLERY_PROMOTION_VIDEO (YouTube l26oQaGBskk).
 */
export function GalleryPromotionSection() {
  const reactId = useId();
  const [playing, setPlaying] = useState(false);
  const close = useCallback(() => setPlaying(false), []);

  useEffect(() => {
    if (!playing) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.classList.add("tamay-lock");
    document.body.classList.add("tamay-lock");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("tamay-lock");
      document.body.classList.remove("tamay-lock");
    };
  }, [playing, close]);

  return (
    <section className="relative bg-[#faf8f5] border-b border-gray-200/70" aria-labelledby="gallery-promo-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-8 lg:gap-10 xl:gap-12 lg:items-start">
          {/* Left — featured promo video */}
          <div className="order-1 min-w-0">
            <p className="lg:hidden font-heading text-[10px] font-bold tracking-[0.18em] uppercase text-tamay-accent mb-3">
              Current Promotion
            </p>

            {PROMO_VIDEO_ID ? (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="group relative w-full aspect-video overflow-hidden rounded-xl sm:rounded-2xl bg-[#141c2b] text-left shadow-[0_12px_32px_rgba(20,28,43,0.1)] ring-1 ring-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-tamay-accent"
                aria-label="Play Tamay Care promotion video"
              >
                <PromoVideoThumb youtubeId={PROMO_VIDEO_ID} />
                <span
                  className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent"
                  aria-hidden
                />
                <span className="absolute left-3 top-3 inline-flex rounded-full border border-white/25 bg-black/35 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
                  Current Promotion
                </span>
                <span className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="inline-flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-white shadow-md"
                    aria-hidden
                  >
                    <span className="ml-0.5 border-y-[7px] border-y-transparent border-l-[12px] border-l-[#141c2b]" />
                  </span>
                </span>
              </button>
            ) : null}

            <p className="mt-3 text-[13px] sm:text-sm text-gray-600 leading-snug max-w-lg">
              See how our warranty and future-care benefits help protect the spaces we build.
            </p>
          </div>

          {/* Right — promo copy + cards */}
          <div className="order-2 min-w-0">
            <p className="font-heading text-[10px] sm:text-[11px] font-bold tracking-[0.18em] uppercase text-tamay-accent">
              The Tamay Care Promotion
            </p>
            <div className="mt-2 h-px w-10 bg-tamay-accent/70" aria-hidden />

            <h2
              id="gallery-promo-heading"
              className="mt-3 font-heading text-2xl sm:text-[1.75rem] lg:text-[2rem] font-semibold leading-[1.15] text-balance"
              style={{ color: NAVY }}
            >
              More Than a Remodel.
              <br />
              More Included.
            </h2>

            <p className="mt-3.5 text-sm text-gray-600 leading-relaxed max-w-xl">
              For qualifying new kitchens and bathrooms, Tamay includes long-term workmanship coverage plus future-care
              benefits designed to help protect the quality, comfort, and appearance of your investment.
            </p>

            {/* Warranty card */}
            <article
              id="tamay-care-included"
              className="mt-6 rounded-xl bg-white px-4 py-4 sm:px-5 sm:py-5 shadow-[0_8px_24px_rgba(20,28,43,0.06)] ring-1 ring-[#c9a227]/35 scroll-mt-24"
            >
              <div className="flex items-start gap-3.5">
                <WarrantyShield className="h-12 w-12 sm:h-14 sm:w-14" />
                <div className="min-w-0 pt-0.5">
                  <h3 className="font-heading text-base sm:text-lg font-semibold leading-snug text-tamay-accent">
                    7-Year Workmanship Warranty
                  </h3>
                  <p className="mt-1 font-heading text-[11px] font-bold tracking-[0.14em] uppercase text-[#141c2b]/80">
                    On New Kitchens &amp; Bathrooms
                  </p>
                  <p className="mt-2 text-[13px] text-gray-600 leading-relaxed">
                    Long-term workmanship coverage designed to give you added confidence in the spaces we build.
                  </p>
                </div>
              </div>
            </article>

            {/* Benefit cards */}
            <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <article className="rounded-xl bg-white px-4 py-4 shadow-[0_6px_18px_rgba(20,28,43,0.05)] ring-1 ring-black/[0.04]">
                <div className="flex items-center gap-2">
                  <span className="text-tamay-accent" aria-hidden>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 19h16M7 15V9m5 6V9m5 6V9M6 9h12l1-4H5l1 4z"
                      />
                    </svg>
                  </span>
                  <h3 className="font-heading text-sm font-semibold" style={{ color: NAVY }}>
                    Kitchen Tune-Up
                  </h3>
                </div>
                <p className="mt-2 text-[13px] text-gray-600 leading-relaxed">
                  Future care for new kitchens, focused on adjustments, details, and keeping the space performing the
                  way it should.
                </p>
              </article>

              <article className="rounded-xl bg-white px-4 py-4 shadow-[0_6px_18px_rgba(20,28,43,0.05)] ring-1 ring-black/[0.04]">
                <div className="flex items-center gap-2">
                  <span className="text-tamay-accent" aria-hidden>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8 4h8v3H8V4zm-1 5h10v11H7V9zm3 3h4"
                      />
                    </svg>
                  </span>
                  <h3 className="font-heading text-sm font-semibold" style={{ color: NAVY }}>
                    Bathroom Rejuvenize
                  </h3>
                </div>
                <p className="mt-2 text-[13px] text-gray-600 leading-relaxed">
                  A future refresh for new bathrooms, focused on key finish details and helping the space continue to
                  look its best.
                </p>
              </article>
            </div>
          </div>
        </div>

        {/* Closing promo row */}
        <div className="mt-10 md:mt-12 pt-8 border-t border-[#c9a227]/25">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
            <div>
              <p className="font-heading text-[10px] font-bold tracking-[0.18em] uppercase text-tamay-accent">
                More Than a Remodel
              </p>
              <p className="mt-2 font-heading text-xl sm:text-2xl font-semibold leading-snug" style={{ color: NAVY }}>
                More value after completion.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 w-full sm:w-auto">
              <Link
                href={sitePath("/construction")}
                className={`${constructionPrimaryLinkClass} w-full sm:w-auto text-center`}
              >
                See What’s Included
              </Link>
              <Link
                href={appointmentScheduleHref("construction")}
                className={`${constructionOutlineLinkClass} w-full sm:w-auto text-center bg-[#faf8f5]`}
              >
                Talk About My Project
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`tamay-modal${playing ? " active" : ""}`}
        id={`${reactId}-modal`}
        aria-hidden={playing ? "false" : "true"}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="tamay-modal-video" id={`${reactId}-player`}>
          {playing && PROMO_VIDEO_ID ? (
            <iframe
              title="Tamay Care promotion video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(PROMO_VIDEO_ID)}?autoplay=1&mute=1&playsinline=1&rel=0&vq=hd1080&modestbranding=1`}
            />
          ) : null}
        </div>
      </div>
      <div
        className={`tamay-close${playing ? " show" : ""}`}
        role="button"
        tabIndex={0}
        aria-label="Close video"
        onClick={close}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") close();
        }}
      >
        ✕
      </div>
    </section>
  );
}
