"use client";

import { Button } from "@/components/ui/Button";
import { FloatCloseButton } from "@/components/ui/FloatingFloatControls";
import { useEstimatorPromo } from "@/hooks/useEstimatorPromo";
import { ESTIMATOR_PROMO } from "@/lib/estimatorPromo";
import { SitePhoto } from "@/components/images/SitePhoto";

/** Small-project estimator promo — HTML card with approved photo header. */
export function EstimatorPromoFloat() {
  const { visible, dismiss, engage } = useEstimatorPromo();

  if (!visible) return null;

  return (
    <aside
      className="fixed right-3 sm:right-5 z-[76] w-[min(21rem,calc(100vw-1.5rem))] max-h-[40vh] sm:max-h-[min(32rem,70vh)] overflow-y-auto bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px)+var(--cookie-banner-offset,0px))] sm:bottom-[calc(5.25rem+var(--cookie-banner-offset,0px))]"
      aria-label="Small project estimator"
      role="dialog"
      aria-modal="false"
    >
      <div className="relative overflow-hidden rounded-xl bg-[#FAF8F5] text-gray-800 shadow-[0_12px_32px_rgba(26,43,69,0.18)] border border-[#e8e2d8]">
        <div className="relative h-24 sm:h-32 w-full overflow-hidden">
          <SitePhoto
            slot="estimator.photo"
            alt={ESTIMATOR_PROMO.photoAlt}
            className="object-cover object-left"
            sizes="336px"
            compact
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] to-transparent opacity-40 sm:opacity-20" />
          <FloatCloseButton onClick={dismiss} ariaLabel="Dismiss small project estimator" />
        </div>

        <div className="px-4 pb-4 pt-2 sm:px-5 sm:pb-5">
          <p className="font-heading text-[0.95rem] sm:text-lg font-semibold text-tamay-primary leading-snug">
            {ESTIMATOR_PROMO.headline}
          </p>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-2">{ESTIMATOR_PROMO.body}</p>
          <p className="text-[11px] italic text-gray-500 mt-1">{ESTIMATOR_PROMO.note}</p>

          <div className="mt-3 hidden sm:flex flex-wrap gap-1.5">
            {ESTIMATOR_PROMO.examples.map((example) => (
              <span
                key={example}
                className="rounded-full bg-white border border-[#e4dccb] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-tamay-primary"
              >
                {example}
              </span>
            ))}
          </div>

          <div className="mt-3.5 flex flex-col gap-1.5">
            <Button
              href={ESTIMATOR_PROMO.href}
              external
              onClick={engage}
              className="w-full !px-3 !py-2.5 !text-xs !tracking-widest !uppercase !border-2 !border-tamay-accent"
            >
              {ESTIMATOR_PROMO.ctaLabel}
            </Button>
            <button
              type="button"
              onClick={dismiss}
              className="w-full min-h-10 text-xs font-semibold text-tamay-primary underline underline-offset-2 hover:text-tamay-primary-dark transition-colors"
            >
              {ESTIMATOR_PROMO.dismissLabel}
            </button>
            <p className="text-center text-[10px] text-[#8a7a5c] mt-0.5">{ESTIMATOR_PROMO.reassurance}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
