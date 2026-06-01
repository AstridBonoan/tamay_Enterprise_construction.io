/** Fixed bottom-right promo on the Real Estate page — text only, no buttons. */
export function SellingHelpBanner() {
  return (
    <aside
      className="fixed bottom-24 right-3 sm:bottom-6 sm:right-5 z-[75] max-w-[min(16rem,calc(100vw-2rem))] sm:max-w-[17rem] pointer-events-none"
      aria-label="Selling your home"
    >
      <div className="bg-tamay-primary text-white shadow-xl border-l-4 border-tamay-accent px-3.5 py-4 sm:px-4 sm:py-4">
        <p className="font-heading text-[0.9375rem] sm:text-base font-semibold leading-snug">
          Are You Selling A House?
        </p>
        <p className="text-xs sm:text-sm text-gray-100 leading-relaxed mt-2">
          We Can Help You Prepare Your House For The Market
        </p>
      </div>
    </aside>
  );
}
