import { SITE } from "@/lib/site";

export function FinancingBadge() {
  return (
    <div className="flex items-center select-none" aria-hidden>
      <div className="relative z-10 flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-full border-[3px] border-white bg-[#3cb64a] shadow-sm">
        <svg
          viewBox="0 0 32 32"
          className="h-11 w-11 translate-x-0.5 -translate-y-0.5 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M8 17 L14 23 L26 9" />
        </svg>
      </div>
      <div className="-ml-6 flex min-h-[64px] min-w-[168px] items-center rounded-r-full border-[3px] border-l-0 border-white bg-[#f0a732] py-3.5 pl-10 pr-8">
        <p className="w-full text-center font-extrabold uppercase leading-[1.1] tracking-tight text-black">
          <span className="block text-[15px]">Financing</span>
          <span className="block text-[15px]">Available</span>
        </p>
      </div>
    </div>
  );
}

export function FinancingPromoCard() {
  return (
    <div className="overflow-hidden rounded-sm border border-gray-200 bg-white shadow-md">
      <div className="grid md:grid-cols-2 items-center">
        <div className="flex justify-center border-b border-gray-100 bg-gradient-to-br from-tamay-primary/[0.06] to-tamay-accent/10 px-6 py-10 md:border-b-0 md:border-r md:py-12">
          <FinancingBadge />
        </div>

        <div className="px-6 py-8 md:px-10 md:py-10 text-center md:text-left">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-tamay-accent mb-3">
            Flexible Payment Options
          </p>
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-tamay-primary leading-snug mb-4">
            Financing Available Across All Projects
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6 max-w-md md:mx-0 mx-auto">
            Build now. Pay over time. Get the work done today with payment plans that fit your budget.
          </p>
          <a
            href={SITE.financingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-tamay-primary px-10 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-white transition-colors hover:bg-tamay-primary-dark sm:px-12 sm:text-[13px]"
          >
            Check Financing Options
          </a>
        </div>
      </div>
    </div>
  );
}
