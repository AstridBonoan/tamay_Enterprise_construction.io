type FloatingPromoBannerProps = {
  headline: string;
  body: string;
  ariaLabel: string;
};

/** Fixed bottom-right text banner — matches Real Estate seller promo styling. */
export function FloatingPromoBanner({ headline, body, ariaLabel }: FloatingPromoBannerProps) {
  return (
    <aside
      className="fixed bottom-24 right-3 sm:bottom-6 sm:right-5 z-[75] max-w-[min(16rem,calc(100vw-2rem))] sm:max-w-[17rem] pointer-events-none"
      aria-label={ariaLabel}
    >
      <div className="bg-tamay-primary text-white shadow-xl border-l-4 border-tamay-accent px-3.5 py-4 sm:px-4 sm:py-4">
        <p className="font-heading text-[0.9375rem] sm:text-base font-semibold leading-snug">{headline}</p>
        <p className="text-xs sm:text-sm text-gray-100 leading-relaxed mt-2">{body}</p>
      </div>
    </aside>
  );
}
