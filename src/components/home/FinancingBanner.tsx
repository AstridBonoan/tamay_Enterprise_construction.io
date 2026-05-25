import { SITE } from "@/lib/site";

function FinancingBadge() {
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

export function FinancingBanner() {
  return (
    <section className="bg-tamay-primary py-12 md:py-14">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2 md:gap-6 md:px-10 lg:px-14">
        <div className="flex justify-center md:justify-center">
          <FinancingBadge />
        </div>

        <div className="flex flex-col items-center text-center">
          <p className="mb-6 max-w-md text-base font-semibold leading-snug text-white sm:text-[17px]">
            <span className="block">
              Build now. Pay over time. Financing available across all
            </span>
            <span className="block">projects</span>
          </p>
          <a
            href={SITE.financingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-white px-10 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-tamay-primary transition-colors hover:bg-gray-100 sm:px-12 sm:text-[13px]"
          >
            Check Financing Options
          </a>
        </div>
      </div>
    </section>
  );
}
