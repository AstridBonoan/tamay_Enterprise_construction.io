"use client";

import { Button } from "@/components/ui/Button";
import { FloatCloseButton } from "@/components/ui/FloatingFloatControls";
import { useEstimatorPromo } from "@/hooks/useEstimatorPromo";
import { ESTIMATOR_PROMO } from "@/lib/estimatorPromo";

/** Global small-project estimator promo — eligible public pages only. */
export function EstimatorPromoFloat() {
  const { visible, dismiss, engage } = useEstimatorPromo();

  if (!visible) return null;

  return (
    <aside
      className="fixed right-3 sm:right-5 z-[76] w-[min(19rem,calc(100vw-1.5rem))] max-h-[33vh] sm:max-h-none overflow-y-auto bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px)+var(--cookie-banner-offset,0px))] sm:bottom-[calc(5.25rem+var(--cookie-banner-offset,0px))]"
      aria-label="Small project estimator"
      role="dialog"
      aria-modal="false"
    >
      <div className="relative bg-white text-gray-800 shadow-xl border border-gray-200 border-l-4 border-l-tamay-accent">
        <FloatCloseButton onClick={dismiss} ariaLabel="Dismiss small project estimator" />
        <div className="px-3.5 py-3.5 sm:px-4 sm:py-4 pr-10">
          <p className="font-heading text-sm sm:text-base font-semibold text-tamay-primary leading-snug">
            {ESTIMATOR_PROMO.headline}
          </p>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-2">{ESTIMATOR_PROMO.body}</p>
          <div className="mt-3 flex flex-col gap-2">
            <Button
              href={ESTIMATOR_PROMO.href}
              external
              onClick={engage}
              className="w-full !px-3 !py-2.5 !text-xs !tracking-widest !uppercase"
            >
              {ESTIMATOR_PROMO.ctaLabel}
            </Button>
            <button
              type="button"
              onClick={dismiss}
              className="w-full min-h-11 text-xs font-semibold uppercase tracking-wide text-gray-500 hover:text-tamay-primary transition-colors"
            >
              {ESTIMATOR_PROMO.dismissLabel}
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
