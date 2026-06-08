"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { CollapsedFloatButton, FloatCloseButton } from "@/components/ui/FloatingFloatControls";
import { useDismissibleFloat } from "@/hooks/useDismissibleFloat";
import { FLOAT_ROW_BOTTOM_CLASS } from "@/lib/floatDock";

const AUTO_CLOSE_MS = 5_000;

type FloatingPromoBannerProps = {
  floatId: string;
  collapsedLabel: string;
  headline: string;
  body: string;
  ariaLabel: string;
  ctaLabel?: string;
  ctaHref?: string;
  bannerImage?: {
    src: string;
    alt: string;
  };
};

/** Fixed bottom-right promo — bottom-aligned with chat bubble on the left. */
export function FloatingPromoBanner({
  floatId,
  collapsedLabel,
  headline,
  body,
  ariaLabel,
  ctaLabel,
  ctaHref,
  bannerImage,
}: FloatingPromoBannerProps) {
  const { dismissed, dismiss, restore, ready } = useDismissibleFloat(floatId);
  const hasCta = Boolean(ctaLabel && ctaHref);

  useEffect(() => {
    if (!ready || dismissed) return;

    const timer = window.setTimeout(dismiss, AUTO_CLOSE_MS);
    return () => window.clearTimeout(timer);
  }, [ready, dismissed, dismiss]);

  if (!ready) return null;

  if (dismissed) {
    return (
      <CollapsedFloatButton
        label={collapsedLabel}
        side="right"
        onClick={restore}
        ariaLabel={`Show ${ariaLabel}`}
      />
    );
  }

  return (
    <aside
      className={`fixed right-3 sm:right-5 ${FLOAT_ROW_BOTTOM_CLASS} z-[75] max-w-[min(18rem,calc(100vw-2rem))] sm:max-w-[19rem]`}
      aria-label={ariaLabel}
    >
      <div className="relative overflow-hidden bg-tamay-primary text-white shadow-xl">
        {bannerImage && (
          <div className="relative h-24 sm:h-28 w-full overflow-hidden">
            <img
              src={bannerImage.src}
              alt={bannerImage.alt}
              className="absolute inset-0 h-full w-full min-w-full max-w-none object-cover object-[center_22%] scale-110"
              loading="lazy"
              decoding="async"
            />
            <FloatCloseButton onClick={dismiss} ariaLabel={`Close ${ariaLabel}`} />
          </div>
        )}
        <div className="relative border-l-4 border-tamay-accent px-3.5 py-4 sm:px-4 sm:py-4">
          {!bannerImage && <FloatCloseButton onClick={dismiss} ariaLabel={`Close ${ariaLabel}`} />}
          <p className="font-heading text-[0.9375rem] sm:text-base font-semibold leading-snug pr-5">{headline}</p>
          <p className="text-xs sm:text-sm text-gray-100 leading-relaxed mt-2">{body}</p>
          {hasCta && (
            <div className="mt-3">
              <Button
                href={ctaHref!}
                external
                className="w-full !bg-white !text-gray-900 hover:!bg-gray-100 !px-3 !py-2.5 !text-xs !tracking-widest !uppercase"
              >
                {ctaLabel}
              </Button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
