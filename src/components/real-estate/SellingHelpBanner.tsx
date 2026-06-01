/** Fixed bottom-right promo on the Real Estate page — text only, no buttons. */
export function SellingHelpBanner() {
  return (
    <aside
      className="fixed bottom-24 right-2 sm:bottom-6 sm:right-4 z-[75] w-[7.25rem] sm:w-32 pointer-events-none"
      aria-label="Selling your home"
    >
      <div className="bg-tamay-primary text-white shadow-lg border-l-4 border-tamay-accent px-2.5 py-6 sm:px-3 sm:py-8 min-h-[11rem] sm:min-h-[12.5rem] flex flex-col justify-center">
        <p className="font-heading text-xs sm:text-[0.8125rem] font-semibold leading-[1.35] text-center">
          Are You Selling A House?
        </p>
        <p className="text-[0.6875rem] sm:text-xs text-gray-100 leading-[1.4] mt-4 text-center">
          We Can Help You Prepare Your House For The Market
        </p>
      </div>
    </aside>
  );
}
