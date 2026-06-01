import { Button } from "@/components/ui/Button";

type FloatingPromoBannerProps = {
  headline: string;
  body: string;
  ariaLabel: string;
  ctaLabel?: string;
  ctaHref?: string;
};

/** Fixed bottom-right promo banner — optional CTA for external links. */
export function FloatingPromoBanner({
  headline,
  body,
  ariaLabel,
  ctaLabel,
  ctaHref,
}: FloatingPromoBannerProps) {
  const hasCta = Boolean(ctaLabel && ctaHref);

  return (
    <aside
      className={`fixed bottom-24 right-3 sm:bottom-6 sm:right-5 z-[75] max-w-[min(16rem,calc(100vw-2rem))] sm:max-w-[17rem] ${
        hasCta ? "" : "pointer-events-none"
      }`}
      aria-label={ariaLabel}
    >
      <div className="bg-tamay-primary text-white shadow-xl border-l-4 border-tamay-accent px-3.5 py-4 sm:px-4 sm:py-4">
        <p className="font-heading text-[0.9375rem] sm:text-base font-semibold leading-snug">{headline}</p>
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
