"use client";

import { Button } from "@/components/ui/Button";
import { CollapsedFloatButton, FloatCloseButton } from "@/components/ui/FloatingFloatControls";
import { useDismissibleFloat } from "@/hooks/useDismissibleFloat";
import { FLOAT_ROW_BOTTOM_CLASS } from "@/lib/floatDock";

type FloatingPromoBannerProps = {
  floatId: string;
  collapsedLabel: string;
  headline: string;
  body: string;
  ariaLabel: string;
  ctaLabel?: string;
  ctaHref?: string;
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
}: FloatingPromoBannerProps) {
  const { dismissed, dismiss, restore, ready } = useDismissibleFloat(floatId);
  const hasCta = Boolean(ctaLabel && ctaHref);

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
      className={`fixed right-3 sm:right-5 ${FLOAT_ROW_BOTTOM_CLASS} z-[75] max-w-[min(16rem,calc(100vw-2rem))] sm:max-w-[17rem]`}
      aria-label={ariaLabel}
    >
      <div className="relative bg-tamay-primary text-white shadow-xl border-l-4 border-tamay-accent px-3.5 py-4 sm:px-4 sm:py-4">
        <FloatCloseButton onClick={dismiss} ariaLabel={`Close ${ariaLabel}`} />
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
    </aside>
  );
}
