"use client";

import { Button } from "@/components/ui/Button";
import { CollapsedFloatButton, FloatCloseButton } from "@/components/ui/FloatingFloatControls";
import { useContextualFloat } from "@/hooks/useContextualFloat";
import { FLOAT_ROW_BOTTOM_CLASS } from "@/lib/floatDock";

type FloatingPromoBannerProps = {
  floatId: string;
  collapsedLabel: string;
  headline: string;
  body: string;
  ariaLabel: string;
  ctaLabel?: string;
  ctaHref?: string;
  ctaExternal?: boolean;
};

/** Right-side contextual CTA — starts collapsed, expands once after a delay. */
export function FloatingPromoBanner({
  floatId,
  collapsedLabel,
  headline,
  body,
  ariaLabel,
  ctaLabel,
  ctaHref,
  ctaExternal = false,
}: FloatingPromoBannerProps) {
  const { ready, expanded, collapse, expandManually, blockAutoExpand } = useContextualFloat(floatId);
  const hasCta = Boolean(ctaLabel && ctaHref);

  if (!ready) return null;

  if (!expanded) {
    return (
      <CollapsedFloatButton
        label={collapsedLabel}
        side="right"
        onClick={expandManually}
        ariaLabel={`Show ${ariaLabel}`}
      />
    );
  }

  return (
    <aside
      className={`fixed right-3 sm:right-5 ${FLOAT_ROW_BOTTOM_CLASS} z-[75] w-[min(18rem,calc(100vw-5.5rem))] sm:max-w-[19rem] max-h-[min(40vh,22rem)] overflow-y-auto`}
      aria-label={ariaLabel}
      role="dialog"
      aria-modal="false"
    >
      <div className="relative overflow-hidden bg-tamay-primary text-white shadow-xl">
        <div className="relative border-l-4 border-tamay-accent px-3.5 py-3.5 sm:px-4 sm:py-4">
          <FloatCloseButton onClick={collapse} ariaLabel={`Close ${ariaLabel}`} />
          <p className="font-heading text-sm sm:text-base font-semibold leading-snug pr-8">{headline}</p>
          <p className="text-xs sm:text-sm text-gray-100 leading-relaxed mt-2">{body}</p>
          {hasCta && (
            <div className="mt-3">
              <Button
                href={ctaHref!}
                external={ctaExternal}
                onClick={blockAutoExpand}
                className="w-full !bg-white !text-gray-900 hover:!bg-gray-100 !px-3 !py-2.5 !text-xs !tracking-widest !uppercase min-h-11"
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
