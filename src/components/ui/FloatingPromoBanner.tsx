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
      <div
        className={`relative overflow-hidden shadow-xl border-l-4 border-tamay-accent ${
          bannerImage ? "min-h-[17rem] sm:min-h-[18rem]" : "bg-tamay-primary text-white"
        }`}
      >
        {bannerImage && (
          <>
            <img
              src={bannerImage.src}
              alt={bannerImage.alt}
              className="absolute inset-0 h-full w-full object-cover object-center"
              loading="lazy"
              decoding="async"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/75 to-black/50"
              aria-hidden
            />
          </>
        )}
        <div
          className={`relative z-10 px-3.5 py-4 sm:px-4 sm:py-4 ${
            bannerImage ? "flex min-h-[17rem] sm:min-h-[18rem] flex-col justify-end text-white" : ""
          }`}
        >
          <FloatCloseButton onClick={dismiss} ariaLabel={`Close ${ariaLabel}`} />
          <p className="font-heading text-[0.9375rem] sm:text-base font-semibold leading-snug pr-5 drop-shadow-md">
            {headline}
          </p>
          <p className="text-xs sm:text-sm text-gray-100 leading-relaxed mt-2 drop-shadow-sm">{body}</p>
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
