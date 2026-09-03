/** Deep corporate navy — matches approved Construction warranty/hero direction */
const CONSTRUCTION_DEEP_NAVY = "#141c2b";

const WARRANTY_POINTS = [
  { label: "New Kitchens & New Bathrooms", icon: KitchenBathIcon },
  { label: "Quality Work You Can Trust", icon: ShieldCheckIcon },
  { label: "Family-Owned. Integrity Driven.", icon: FamilyIcon },
  { label: "Built Right. Built to Last.", icon: HouseIcon },
] as const;

function KitchenBathIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={`text-tamay-accent shrink-0 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 19h16M7 15V9m5 6V9m5 6V9M6 9h12l1-4H5l1 4z" />
    </svg>
  );
}

function ShieldCheckIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={`text-tamay-accent shrink-0 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4" />
    </svg>
  );
}

function FamilyIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={`text-tamay-accent shrink-0 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <circle cx="9" cy="8" r="2.5" strokeWidth={1.5} />
      <circle cx="15.5" cy="9" r="2" strokeWidth={1.5} />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 19c.8-2.5 2.5-4 4.5-4s3.7 1.5 4.5 4M13 19c.6-2 2-3.5 3.5-3.5S19.4 17 20 19" />
    </svg>
  );
}

function HouseIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={`text-tamay-accent shrink-0 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-5H10v5H5a1 1 0 0 1-1-1v-9.5z" />
    </svg>
  );
}

function WarrantyShieldBadge({ className = "h-20 w-20" }: { className?: string }) {
  return (
    <div className={`relative shrink-0 ${className}`} aria-hidden>
      <svg viewBox="0 0 72 80" fill="none" className="h-full w-full drop-shadow-[0_2px_8px_rgba(201,162,39,0.15)]" role="presentation">
        <defs>
          <linearGradient id="constructionWarrantyShieldFill" x1="36" y1="4" x2="36" y2="76" gradientUnits="userSpaceOnUse">
            <stop stopColor="#c9a227" stopOpacity="0.2" />
            <stop offset="1" stopColor="#c9a227" stopOpacity="0.04" />
          </linearGradient>
        </defs>
        <path
          d="M36 3.5 66.5 15v24.8c0 16.8-12.2 31.6-30.5 36.7C17.7 70.4 5.5 55.6 5.5 39.8V15L36 3.5Z"
          fill="url(#constructionWarrantyShieldFill)"
          stroke="currentColor"
          strokeWidth="1.35"
          className="text-tamay-accent"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center pt-[14%] font-heading text-[1.7rem] sm:text-[1.95rem] font-semibold leading-none tracking-tight text-tamay-accent">
        7
      </span>
    </div>
  );
}

/**
 * Shared premium warranty band for New Kitchens & New Bathrooms.
 * Placed between Kitchen and Bathroom renovation sections.
 */
export function ConstructionWarrantyBanner() {
  return (
    <section className="bg-[#141c2b] text-white overflow-hidden" aria-labelledby="construction-warranty-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 sm:py-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-0">
          <div className="flex items-center gap-4 sm:gap-5 lg:pr-8 lg:border-r lg:border-white/15 min-w-0 flex-1">
            <WarrantyShieldBadge className="h-[3.5rem] w-[3.5rem] sm:h-16 sm:w-16" />
            <div className="min-w-0 pt-0.5">
              <p
                id="construction-warranty-heading"
                className="font-heading text-tamay-accent text-sm sm:text-base font-semibold tracking-[0.12em] uppercase leading-tight"
              >
                7-Year Workmanship Warranty
              </p>
              <p className="mt-1 font-heading text-tamay-accent/90 text-sm italic">
                On New Kitchens &amp; New Bathrooms
              </p>
              <p className="mt-2 text-white/85 text-[13px] sm:text-sm leading-snug max-w-md">
                We stand behind our workmanship so you can enjoy beautiful, functional spaces with confidence for years
                to come.
              </p>
            </div>
          </div>

          <ul className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-0 lg:flex-1 lg:pl-8">
            {WARRANTY_POINTS.map((point, index) => {
              const Icon = point.icon;
              return (
                <li
                  key={point.label}
                  className={`flex flex-col items-center text-center gap-2 px-1.5 sm:px-2 ${
                    index > 0 ? "lg:border-l lg:border-white/15" : ""
                  }`}
                >
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  <span className="text-[10px] sm:text-[11px] text-white/85 leading-snug max-w-[9rem]">
                    {point.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
