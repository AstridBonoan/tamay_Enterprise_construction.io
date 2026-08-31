"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useCarouselAutoplay } from "@/hooks/useCarouselAutoplay";
import { constructionPrimaryLinkClass } from "@/components/construction/constructionCtaStyles";
import { REVIEWS, type Review } from "@/lib/reviews";
import { sitePath } from "@/lib/paths";

/** Real reviews already used on the public site — do not invent quotes. */
const CONSTRUCTION_PAGE_REVIEWS = REVIEWS.slice(0, 9);

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="h-full bg-white border border-gray-100 px-5 py-6 flex flex-col">
      <div className="flex gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            viewBox="0 0 20 20"
            className={`w-4 h-4 ${i < review.rating ? "text-tamay-accent" : "text-gray-300"}`}
            fill="currentColor"
            aria-hidden
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <blockquote className="mt-4 flex-1 text-sm text-gray-700 leading-relaxed">
        &ldquo;{review.text}&rdquo;
      </blockquote>
      <p className="mt-5 text-xs text-gray-500">
        {review.author} – {review.date}
      </p>
    </article>
  );
}

function getCardsPerPage(width: number) {
  if (width >= 1024) return 3;
  return 1;
}

export function ConstructionReviewsSection() {
  const [cardsPerPage, setCardsPerPage] = useState(3);
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const update = () => setCardsPerPage(getCardsPerPage(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const pages = useMemo(() => {
    const chunks: Review[][] = [];
    for (let i = 0; i < CONSTRUCTION_PAGE_REVIEWS.length; i += cardsPerPage) {
      chunks.push(CONSTRUCTION_PAGE_REVIEWS.slice(i, i + cardsPerPage));
    }
    return chunks.length ? chunks : [[]];
  }, [cardsPerPage]);

  useEffect(() => {
    setPage(0);
  }, [cardsPerPage]);

  const next = useCallback(() => {
    setPage((current) => (current + 1) % pages.length);
  }, [pages.length]);

  useCarouselAutoplay({
    itemCount: pages.length,
    onAdvance: next,
    intervalMs: 5500,
    paused,
  });

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl">
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-tamay-primary font-semibold leading-tight">
            Trusted by Homeowners. Proven by the Work.
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Real experiences from homeowners who trusted Tamay Enterprises with their homes, renovations, and
            improvements.
          </p>
        </div>

        <div
          className="mt-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className={`grid gap-5 ${cardsPerPage === 3 ? "lg:grid-cols-3" : "grid-cols-1"}`}>
            {pages[page]?.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              type="button"
              className="min-h-11 min-w-11 rounded-full border border-gray-200 bg-white text-tamay-primary"
              aria-label="Previous reviews"
              onClick={() => setPage((current) => (current - 1 + pages.length) % pages.length)}
            >
              ‹
            </button>
            <p className="text-sm text-gray-500">
              {page + 1} / {pages.length}
            </p>
            <button
              type="button"
              className="min-h-11 min-w-11 rounded-full border border-gray-200 bg-white text-tamay-primary"
              aria-label="Next reviews"
              onClick={next}
            >
              ›
            </button>
          </div>
        </div>

        <div className="mt-8">
          <Link href={sitePath("/reviews")} className={constructionPrimaryLinkClass}>
            Read More Reviews
          </Link>
        </div>
      </div>
    </section>
  );
}
