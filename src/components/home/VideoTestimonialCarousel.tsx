"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useCarouselAutoplay } from "@/hooks/useCarouselAutoplay";
import { initTamayGallery } from "@/components/reviews/initTamayGallery";
import { TestimonialProjectHeader } from "@/components/reviews/TestimonialProjectHeader";
import type { ReviewVideoProject } from "@/lib/reviewVideos";
import "@/components/reviews/tamay-video-gallery.css";
import "./video-testimonial-carousel.css";

const AUTOPLAY_INTERVAL_MS = 5000;
const SLIDE_GAP_PX = 16;

function getSlideWidthPercent(width: number) {
  if (width >= 1024) return 34;
  if (width >= 640) return 52;
  return 78;
}

type VideoTestimonialCarouselProps = {
  projects: ReviewVideoProject[];
};

export function VideoTestimonialCarousel({ projects }: VideoTestimonialCarouselProps) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLDivElement>(null);

  const activeProjects = useMemo(
    () => projects.filter((project) => project.videos.length > 0),
    [projects],
  );

  const [centerIndex, setCenterIndex] = useState(0);
  const [slideWidthPercent, setSlideWidthPercent] = useState(34);
  const [trackOffset, setTrackOffset] = useState(0);
  const [paused, setPaused] = useState(false);
  const centerIndexRef = useRef(centerIndex);

  const count = activeProjects.length;

  useEffect(() => {
    centerIndexRef.current = centerIndex;
  }, [centerIndex]);

  const updateLayout = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const width = window.innerWidth;
    setSlideWidthPercent(getSlideWidthPercent(width));

    const slides = viewport.querySelectorAll<HTMLElement>(".video-testimonial-slide");
    const activeSlide = slides[centerIndexRef.current];
    if (!activeSlide) return;

    const viewportWidth = viewport.offsetWidth;
    const slideWidth = activeSlide.offsetWidth;
    const index = centerIndexRef.current;
    const offset = viewportWidth / 2 - (index * (slideWidth + SLIDE_GAP_PX) + slideWidth / 2);
    setTrackOffset(offset);
  }, []);

  useEffect(() => {
    updateLayout();
    const viewport = viewportRef.current;
    if (!viewport) return;

    const observer = new ResizeObserver(() => updateLayout());
    observer.observe(viewport);
    window.addEventListener("resize", updateLayout);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateLayout);
    };
  }, [updateLayout, activeProjects.length]);

  useEffect(() => {
    updateLayout();
  }, [centerIndex, slideWidthPercent, updateLayout]);

  useEffect(() => {
    const gallery = galleryRef.current;
    const modal = modalRef.current;
    const player = playerRef.current;
    const closeBtn = closeRef.current;
    if (!gallery || !modal || !player || !closeBtn || activeProjects.length === 0) return;

    const cleanup = initTamayGallery(gallery, modal, player, closeBtn);
    const frame = window.requestAnimationFrame(() => updateLayout());

    return () => {
      window.cancelAnimationFrame(frame);
      cleanup();
    };
  }, [activeProjects, updateLayout]);

  const prev = useCallback(
    () => setCenterIndex((current) => (current === 0 ? count - 1 : current - 1)),
    [count],
  );
  const next = useCallback(
    () => setCenterIndex((current) => (current === count - 1 ? 0 : current + 1)),
    [count],
  );

  useCarouselAutoplay({
    itemCount: count,
    onAdvance: next,
    intervalMs: AUTOPLAY_INTERVAL_MS,
    paused,
  });

  if (count === 0) return null;

  return (
    <div className="mt-12 sm:mt-14">
      <h3 className="font-heading text-xl sm:text-2xl text-white text-center mb-8 tracking-wide">
        VIDEO TESTIMONIALS
      </h3>

      <div
        className="relative px-6 sm:px-10"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {count > 1 && (
          <button
            type="button"
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center text-white/90 hover:text-white text-2xl"
            aria-label="Previous video testimonial"
          >
            ‹
          </button>
        )}

        <div ref={viewportRef} className="video-testimonial-viewport">
          <div
            ref={galleryRef}
            id="home-video-carousel-gallery"
            className="video-testimonial-track"
            style={{ transform: `translateX(${trackOffset}px)` }}
          >
            {activeProjects.map((project, index) => (
              <div
                key={project.id}
                className={`video-testimonial-slide ${
                  index === centerIndex ? "is-center" : ""
                }`}
                style={{ width: `${slideWidthPercent}%` }}
              >
                <div className="bg-white rounded-sm shadow-lg px-3 py-4 sm:px-5 sm:py-5 h-full">
                  <div
                    className="tamay-project"
                    data-videos={project.videos.join(",")}
                  >
                    {project.title && index === centerIndex ? (
                      <TestimonialProjectHeader title={project.title} />
                    ) : project.title ? (
                      <header className="tamay-project-heading mb-4">
                        <h2 className="font-heading font-semibold text-tamay-primary text-center tracking-wide uppercase line-clamp-2">
                          {project.title.trim()}
                        </h2>
                      </header>
                    ) : null}
                    <div className="tamay-project-mount" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {count > 1 && (
          <button
            type="button"
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center text-white/90 hover:text-white text-2xl"
            aria-label="Next video testimonial"
          >
            ›
          </button>
        )}
      </div>

      {count > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {activeProjects.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setCenterIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                index === centerIndex ? "bg-white" : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to video testimonial ${index + 1}`}
              aria-current={index === centerIndex ? "true" : undefined}
            />
          ))}
        </div>
      )}

      <div
        className="tamay-modal"
        id="home-video-carousel-modal"
        ref={modalRef}
        aria-hidden="true"
      >
        <div
          className="tamay-modal-video"
          id="home-video-carousel-player"
          ref={playerRef}
        />
      </div>
      <div
        className="tamay-close"
        id="home-video-carousel-close"
        ref={closeRef}
        role="button"
        tabIndex={0}
      >
        ✕
      </div>
    </div>
  );
}
