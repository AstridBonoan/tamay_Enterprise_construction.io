"use client";

import { useCallback, useEffect, useId, useState } from "react";
import Link from "next/link";
import { constructionPrimaryLinkClass } from "@/components/construction/constructionCtaStyles";
import { REVIEWS, type Review } from "@/lib/reviews";
import { REVIEW_VIDEO_PROJECTS } from "@/lib/reviewVideos";
import { sitePath } from "@/lib/paths";
import "@/components/reviews/tamay-video-gallery.css";

/** Existing Joe testimonial from REVIEW_VIDEO_PROJECTS — do not substitute. */
const JOE_PROJECT = REVIEW_VIDEO_PROJECTS.find((p) => p.id === "joe-testimonial");
const JOE_VIDEO_ID = JOE_PROJECT?.videos[0] ?? "";
const JOE_TITLE = JOE_PROJECT?.title ?? "Joe Testimonial";
const JOE_NAME = JOE_TITLE.replace(/\s*[-–]?\s*testimonial\s*$/i, "").trim() || "Joe";

/**
 * Three real Google reviews from REVIEWS (construction / home improvement fit).
 * Do not invent quotes, names, or ratings.
 */
const FEATURED_REVIEW_IDS = ["bria-h", "maria-p", "david-t"] as const;
const FEATURED_REVIEWS: Review[] = FEATURED_REVIEW_IDS.map(
  (id) => REVIEWS.find((r) => r.id === id)!
).filter(Boolean);

function GoogleIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function thumbCandidates(id: string) {
  return [
    `https://i.ytimg.com/vi/${id}/hq720.jpg`,
    `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
    `https://i.ytimg.com/vi/${id}/sddefault.jpg`,
    `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    `https://i.ytimg.com/vi/${id}/mqdefault.jpg`,
  ];
}

function VideoThumb({ youtubeId }: { youtubeId: string }) {
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

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`w-3.5 h-3.5 ${i < rating ? "text-tamay-accent" : "text-gray-300"}`}
          fill="currentColor"
          aria-hidden
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function GoogleReviewCard({ review }: { review: Review }) {
  return (
    <article className="rounded-xl bg-white px-4 py-4 shadow-[0_6px_18px_rgba(20,28,43,0.06)] ring-1 ring-black/[0.04] flex flex-col min-h-0">
      <div className="flex items-center justify-between gap-2">
        <StarRating rating={review.rating} />
        <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-gray-500">
          <GoogleIcon className="w-3.5 h-3.5" />
          Google Review
        </span>
      </div>
      <blockquote className="mt-2.5 text-[13px] text-gray-700 leading-relaxed line-clamp-4">
        &ldquo;{review.text}&rdquo;
      </blockquote>
      <p className="mt-3 text-xs text-gray-500">
        {review.author}
        {review.date ? <span className="text-gray-400"> · {review.date}</span> : null}
      </p>
    </article>
  );
}

/**
 * Trusted by Homeowners — Joe featured testimonial + three real Google reviews.
 */
export function ConstructionReviewsSection() {
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
    <section className="py-14 md:py-16 lg:py-20 bg-[#faf8f5] border-b border-gray-200/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="font-heading text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase text-tamay-accent">
            Trusted by Homeowners
          </p>
          <div className="mt-2.5 h-px w-10 bg-tamay-accent/70" aria-hidden />
          <h2 className="mt-3 font-heading text-2xl sm:text-3xl lg:text-[2.15rem] text-[#141c2b] font-semibold leading-[1.12] text-balance">
            Real Experiences. Real Confidence.
          </h2>
          <p className="mt-3 text-sm sm:text-[15px] text-gray-600 leading-relaxed">
            Hear directly from clients who trusted Tamay Enterprises with their homes, renovations, and
            improvements.
          </p>
        </div>

        <div className="mt-10 md:mt-12 grid grid-cols-1 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] gap-8 lg:gap-10 lg:items-start">
          {/* Left — Joe featured video */}
          <div>
            {JOE_VIDEO_ID ? (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="group relative w-full aspect-video overflow-hidden rounded-xl sm:rounded-2xl bg-black text-left shadow-[0_10px_28px_rgba(20,28,43,0.1)] ring-1 ring-black/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-tamay-accent"
                aria-label={`Play ${JOE_TITLE}`}
              >
                <VideoThumb youtubeId={JOE_VIDEO_ID} />
                <span
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
                  aria-hidden
                />
                <span className="absolute left-3 top-3 inline-flex rounded-full border border-white/25 bg-black/35 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
                  Client Testimonial
                </span>
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="inline-flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-white shadow-md" aria-hidden>
                    <span className="ml-0.5 border-y-[7px] border-y-transparent border-l-[12px] border-l-[#141c2b]" />
                  </span>
                </span>
                <span className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4">
                  <span className="block font-heading text-lg sm:text-xl text-white font-semibold leading-snug">
                    {JOE_NAME}
                  </span>
                  <span className="mt-0.5 block text-sm text-white/80">{JOE_TITLE}</span>
                </span>
              </button>
            ) : null}

            <div className="mt-4">
              <Link
                href={sitePath("/reviews")}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-tamay-primary hover:text-tamay-primary-dark transition-colors"
              >
                Watch More Testimonials
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>

          {/* Right — Google reviews */}
          <div>
            <h3 className="font-heading text-lg sm:text-xl text-[#141c2b] font-semibold">
              What Our Clients Say
            </h3>
            <div className="mt-4 flex flex-col gap-3.5">
              {FEATURED_REVIEWS.map((review) => (
                <GoogleReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom trust / CTA strip — qualitative only, no invented metrics */}
        <div className="mt-10 md:mt-12 rounded-xl bg-white px-5 sm:px-6 py-5 sm:py-6 shadow-[0_6px_18px_rgba(20,28,43,0.05)] ring-1 ring-black/[0.04]">
          <div className="flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-6">
            <div className="lg:min-w-[11rem]">
              <p className="font-heading text-base sm:text-lg text-[#141c2b] font-semibold leading-snug">
                Real Clients.
                <br className="hidden sm:block" /> Real Experiences.
              </p>
            </div>

            <div className="hidden lg:block h-10 w-px bg-[#c9a227]/35" aria-hidden />

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <GoogleIcon className="w-5 h-5 shrink-0" />
              <div>
                <p className="font-heading text-sm font-semibold text-[#141c2b]">Google Reviews</p>
                <p className="text-[13px] text-gray-500">Client Testimonials</p>
              </div>
            </div>

            <div className="hidden lg:block h-10 w-px bg-[#c9a227]/35" aria-hidden />

            <div className="lg:ml-auto flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <p className="text-sm text-gray-600 sm:max-w-[14rem]">
                See more stories from real Tamay clients.
              </p>
              <Link href={sitePath("/reviews")} className={`${constructionPrimaryLinkClass} w-full sm:w-auto text-center`}>
                Read More Reviews
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Same YouTube-nocookie modal pattern as TamayVideoGallery / See Our Work */}
      <div
        className={`tamay-modal${playing ? " active" : ""}`}
        id={`${reactId}-modal`}
        aria-hidden={playing ? "false" : "true"}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="tamay-modal-video" id={`${reactId}-player`}>
          {playing && JOE_VIDEO_ID ? (
            <iframe
              title={JOE_TITLE}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(JOE_VIDEO_ID)}?autoplay=1&mute=1&playsinline=1&rel=0&vq=hd1080&modestbranding=1`}
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
