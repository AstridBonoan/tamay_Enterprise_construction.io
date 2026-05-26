"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { assetUrl } from "@/lib/assetUrl";
import {
  GOOGLE_RATING,
  GOOGLE_REVIEWS_URL,
  REVIEWS,
  type Review,
} from "@/lib/reviews";

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

function StarRating({ rating, light = false }: { rating: number; light?: boolean }) {
  return (
    <div className="flex justify-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`w-4 h-4 ${
            i < rating ? "text-tamay-accent" : light ? "text-white/30" : "text-gray-300"
          }`}
          fill="currentColor"
          aria-hidden
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const initial = review.author.charAt(0).toUpperCase();
  const snippet =
    review.text.length > 90 ? `${review.text.slice(0, 90).trim()}…` : review.text;

  return (
    <article className="flex flex-col bg-white rounded-sm shadow-lg px-5 pt-8 pb-5 min-h-[280px] sm:min-h-[300px] relative">
      <div
        className={`absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md ${
          review.avatarColor ?? "bg-tamay-primary"
        }`}
      >
        {initial}
      </div>

      <StarRating rating={review.rating} />

      <blockquote className="flex-1 mt-4 mb-4 text-center text-sm text-gray-700 leading-relaxed px-1">
        &ldquo;{snippet}&rdquo;
      </blockquote>

      <a
        href={GOOGLE_REVIEWS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-tamay-primary font-semibold text-center hover:underline mb-5 inline-flex items-center justify-center gap-1"
      >
        Read full review
        <span aria-hidden>→</span>
      </a>

      <div className="mt-auto flex items-end justify-between gap-2 pt-3 border-t border-gray-100">
        <GoogleIcon className="w-4 h-4 shrink-0" />
        <p className="text-xs text-gray-500 text-center flex-1">
          {review.author} – {review.date}
        </p>
      </div>
    </article>
  );
}

function getCardsPerPage(width: number) {
  if (width >= 1024) return 3;
  if (width >= 640) return 2;
  return 1;
}

const AUTOPLAY_INTERVAL_MS = 6000;

export function ReviewsSection() {
  const background = assetUrl("/reviews/reviews-background.png");
  const [cardsPerPage, setCardsPerPage] = useState(3);
  const [page, setPage] = useState(0);
  const hoverPausedRef = useRef(false);

  const pageCount = Math.max(1, Math.ceil(REVIEWS.length / cardsPerPage));

  const updateCardsPerPage = useCallback(() => {
    setCardsPerPage(getCardsPerPage(window.innerWidth));
  }, []);

  useEffect(() => {
    updateCardsPerPage();
    window.addEventListener("resize", updateCardsPerPage);
    return () => window.removeEventListener("resize", updateCardsPerPage);
  }, [updateCardsPerPage]);

  useEffect(() => {
    setPage((current) => Math.min(current, pageCount - 1));
  }, [pageCount]);

  const visibleReviews = REVIEWS.slice(
    page * cardsPerPage,
    page * cardsPerPage + cardsPerPage
  );

  const prev = () => setPage((p) => (p === 0 ? pageCount - 1 : p - 1));
  const next = () => setPage((p) => (p === pageCount - 1 ? 0 : p + 1));

  useEffect(() => {
    if (pageCount <= 1) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const id = window.setInterval(() => {
      if (document.hidden || hoverPausedRef.current) return;
      setPage((p) => (p === pageCount - 1 ? 0 : p + 1));
    }, AUTOPLAY_INTERVAL_MS);

    return () => window.clearInterval(id);
  }, [pageCount]);

  return (
    <section
      id="reviews"
      className="relative py-16 sm:py-20 overflow-hidden"
      aria-labelledby="reviews-heading"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${background})` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-tamay-primary/80" aria-hidden />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <h2
          id="reviews-heading"
          className="font-heading text-3xl sm:text-4xl text-white text-center mb-8 sm:mb-10 tracking-wide"
        >
          REVIEWS
        </h2>

        <a
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-12 text-white hover:opacity-95 transition-opacity"
        >
          <GoogleIcon className="w-8 h-8 bg-white rounded-full p-1 shrink-0" />
          <span className="text-3xl sm:text-4xl font-bold">{GOOGLE_RATING.score}</span>
          <div className="text-center sm:text-left">
            <StarRating rating={5} light />
            <p className="font-semibold mt-1">{GOOGLE_RATING.businessName}</p>
            <p className="text-sm text-white/85">{GOOGLE_RATING.count} Reviews</p>
          </div>
        </a>

        <div
          className="relative"
          onMouseEnter={() => {
            hoverPausedRef.current = true;
          }}
          onMouseLeave={() => {
            hoverPausedRef.current = false;
          }}
        >
          <button
            type="button"
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 z-10 w-10 h-10 flex items-center justify-center text-white/90 hover:text-white text-2xl"
            aria-label="Previous reviews"
          >
            ‹
          </button>

          <div
            className={`grid gap-5 sm:gap-6 px-6 sm:px-10 ${
              cardsPerPage === 3
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : cardsPerPage === 2
                  ? "grid-cols-1 sm:grid-cols-2"
                  : "grid-cols-1"
            }`}
          >
            {visibleReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 z-10 w-10 h-10 flex items-center justify-center text-white/90 hover:text-white text-2xl"
            aria-label="Next reviews"
          >
            ›
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setPage(i)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                i === page ? "bg-white" : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to review page ${i + 1}`}
              aria-current={i === page ? "true" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
