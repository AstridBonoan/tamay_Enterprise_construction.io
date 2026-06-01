/** Fixed bottom-right promo on the Real Estate page — text only, no buttons. */
export function SellingHelpBanner() {
  return (
    <aside
      className="fixed bottom-24 right-4 sm:bottom-6 sm:right-6 z-[75] max-w-[min(18rem,calc(100vw-2rem))] sm:max-w-xs pointer-events-none"
      aria-label="Selling your home"
    >
      <div className="bg-tamay-primary text-white shadow-xl border-l-4 border-tamay-accent px-4 py-4 sm:px-5 sm:py-5">
        <p className="font-heading text-base sm:text-lg font-semibold leading-snug">
          Are You Selling A House?
        </p>
        <p className="text-sm sm:text-base text-gray-100 leading-relaxed mt-2">
          We Can Help You Prepare Your House For The Market
        </p>
      </div>
    </aside>
  );
}
