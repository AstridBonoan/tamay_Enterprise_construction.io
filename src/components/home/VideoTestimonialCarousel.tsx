"use client";

import { useCallback, useMemo, useState } from "react";
import { useCarouselAutoplay } from "@/hooks/useCarouselAutoplay";
import { TamayVideoGallery } from "@/components/reviews/TamayVideoGallery";
import type { ReviewVideoProject } from "@/lib/reviewVideos";

const AUTOPLAY_INTERVAL_MS = 6000;

type VideoTestimonialCarouselProps = {
  projects: ReviewVideoProject[];
};

export function VideoTestimonialCarousel({ projects }: VideoTestimonialCarouselProps) {
  const activeProjects = useMemo(
    () => projects.filter((project) => project.videos.length > 0),
    [projects],
  );
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const count = activeProjects.length;
  const prev = useCallback(
    () => setIndex((current) => (current === 0 ? count - 1 : current - 1)),
    [count],
  );
  const next = useCallback(
    () => setIndex((current) => (current === count - 1 ? 0 : current + 1)),
    [count],
  );

  useCarouselAutoplay({
    itemCount: count,
    onAdvance: next,
    intervalMs: AUTOPLAY_INTERVAL_MS,
    paused,
  });

  if (count === 0) return null;

  const project = activeProjects[index];

  return (
    <div className="mt-12 sm:mt-14">
      <h3 className="font-heading text-xl sm:text-2xl text-white text-center mb-8 tracking-wide">
        VIDEO TESTIMONIALS
      </h3>

      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {count > 1 && (
          <button
            type="button"
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 z-10 w-10 h-10 flex items-center justify-center text-white/90 hover:text-white text-2xl"
            aria-label="Previous video testimonial"
          >
            ‹
          </button>
        )}

        <div className="bg-white rounded-sm shadow-lg px-4 py-5 sm:px-6 sm:py-6 max-w-3xl mx-auto">
          <TamayVideoGallery
            key={project.id}
            projects={[project]}
            instanceId={`home-video-${project.id}`}
          />
        </div>

        {count > 1 && (
          <button
            type="button"
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 z-10 w-10 h-10 flex items-center justify-center text-white/90 hover:text-white text-2xl"
            aria-label="Next video testimonial"
          >
            ›
          </button>
        )}
      </div>

      {count > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {activeProjects.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                i === index ? "bg-white" : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to video testimonial ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}
