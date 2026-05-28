import { useEffect, useRef } from "react";

type UseCarouselAutoplayOptions = {
  /** Number of slides/pages; autoplay is disabled when <= 1 */
  itemCount: number;
  /** Called on each tick to advance the carousel */
  onAdvance: () => void;
  /** Interval between advances in milliseconds */
  intervalMs?: number;
  /** When true, autoplay is paused (e.g. while hovering) */
  paused?: boolean;
};

const DEFAULT_INTERVAL_MS = 4000;

/**
 * Advances a carousel on an interval. Respects prefers-reduced-motion and pauses when the tab is hidden.
 */
export function useCarouselAutoplay({
  itemCount,
  onAdvance,
  intervalMs = DEFAULT_INTERVAL_MS,
  paused = false,
}: UseCarouselAutoplayOptions) {
  const onAdvanceRef = useRef(onAdvance);
  onAdvanceRef.current = onAdvance;

  useEffect(() => {
    if (itemCount <= 1 || paused) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const id = window.setInterval(() => {
      if (document.hidden) return;
      onAdvanceRef.current();
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [itemCount, intervalMs, paused]);
}
