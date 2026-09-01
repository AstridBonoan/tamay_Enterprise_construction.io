import Link from "next/link";
import {
  constructionChatButtonClass,
  constructionOutlineLinkClass,
} from "@/components/construction/constructionCtaStyles";
import { SitePhoto } from "@/components/images/SitePhoto";
import { appointmentScheduleHref } from "@/lib/onlineAppointments";
import { sitePath } from "@/lib/paths";

const SERVICE_FEATURES = [
  { label: "Layout & Cabinetry", icon: LayoutIcon },
  { label: "Countertops & Backsplashes", icon: CountertopIcon },
  { label: "Lighting & Electrical", icon: LightingIcon },
  { label: "Plumbing & Fixtures", icon: PlumbingIcon },
  { label: "Flooring & Finishes", icon: FlooringIcon },
] as const;

const WARRANTY_POINTS = [
  { label: "7 Years of Workmanship Coverage", icon: ShieldIcon },
  { label: "Family-Owned. Integrity Driven.", icon: FamilyIcon },
  { label: "Quality Work You Can Count On", icon: MedalIcon },
  { label: "Built Right. Built to Last.", icon: HouseIcon },
] as const;

function LayoutIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={`text-tamay-accent shrink-0 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 19V9l4-4h8l4 4v10M9 19v-6h6v6" />
    </svg>
  );
}

function CountertopIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={`text-tamay-accent shrink-0 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7h18v4H3V7zm2 4v8h14v-8" />
    </svg>
  );
}

function LightingIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={`text-tamay-accent shrink-0 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 18h6M10 22h4M12 3a5 5 0 0 0-2 9.5V15h4v-2.5A5 5 0 0 0 12 3z" />
    </svg>
  );
}

function PlumbingIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={`text-tamay-accent shrink-0 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v3m0 12v3M6 9h12M8 9a4 4 0 0 0 8 0" />
    </svg>
  );
}

function FlooringIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={`text-tamay-accent shrink-0 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 19h16M6 15h2v4H6v-4zm5 0h2v4h-2v-4zm5 0h2v4h-2v-4zM4 11h16M6 7h2v4H6V7zm5 0h2v4h-2V7zm5 0h2v4h-2V7z" />
    </svg>
  );
}

function ShieldIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={`text-tamay-accent shrink-0 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
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

function MedalIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={`text-tamay-accent shrink-0 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="9" r="4" strokeWidth={1.5} />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.5 13.5 7 21l5-2.5L17 21l-1.5-7.5" />
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
          <linearGradient id="kitchenWarrantyShieldFill" x1="36" y1="4" x2="36" y2="76" gradientUnits="userSpaceOnUse">
            <stop stopColor="#c9a227" stopOpacity="0.2" />
            <stop offset="1" stopColor="#c9a227" stopOpacity="0.04" />
          </linearGradient>
        </defs>
        <path
          d="M36 3.5 66.5 15v24.8c0 16.8-12.2 31.6-30.5 36.7C17.7 70.4 5.5 55.6 5.5 39.8V15L36 3.5Z"
          fill="url(#kitchenWarrantyShieldFill)"
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

function KitchenImage({ className = "" }: { className?: string }) {
  return (
    <figure className={`relative w-full ${className}`}>
      <div className="relative w-full overflow-hidden rounded-xl sm:rounded-2xl bg-[#f0ebe3] shadow-sm ring-1 ring-black/5">
        <div className="relative aspect-[16/11] sm:aspect-[16/10] lg:aspect-[4/3] w-full">
          <SitePhoto
            slot="construction.approvedKitchen"
            alt="Premium renovated kitchen with coordinated cabinetry, countertops, lighting, and finishes"
            className="object-contain object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </figure>
  );
}

export function KitchenRenovationSection() {
  return (
    <section className="py-14 md:py-16 lg:py-20 bg-[#faf8f5] border-b border-gray-200/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10 xl:gap-14 lg:items-center">
          <div className="min-w-0 lg:py-2">
            <p className="text-tamay-accent font-heading font-bold tracking-[0.16em] uppercase text-[11px] sm:text-xs">
              Kitchen Renovations
            </p>
            <div className="mt-2 h-px w-10 bg-tamay-accent/70" aria-hidden />
            <h2 className="mt-4 font-heading text-2xl sm:text-3xl lg:text-[2.15rem] xl:text-[2.35rem] text-tamay-primary font-semibold leading-[1.15] text-balance">
              Designed to Perform. Built to Last.
            </h2>
            <p className="mt-4 text-gray-600 text-sm sm:text-[15px] leading-relaxed max-w-md">
              Thoughtfully planned kitchens with coordinated cabinetry, countertops, lighting, plumbing, flooring,
              and finishes — backed by our 7-Year Workmanship Warranty on New Kitchens.
            </p>

            <KitchenImage className="mt-7 lg:hidden" />

            <ul className="mt-7 lg:mt-8 divide-y divide-gray-200/80 border-y border-gray-200/80">
              {SERVICE_FEATURES.map((feature) => {
                const Icon = feature.icon;
                return (
                  <li key={feature.label} className="flex items-center gap-3 py-3 text-sm text-gray-700">
                    <Icon />
                    <span>{feature.label}</span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-7 flex flex-col sm:flex-row gap-2.5 sm:gap-3">
              <Link href={sitePath("/gallery")} className={`${constructionChatButtonClass} w-full sm:w-auto text-xs sm:text-sm`}>
                Explore Kitchen Projects
              </Link>
              <Link
                href={appointmentScheduleHref("construction")}
                className={`${constructionOutlineLinkClass} w-full sm:w-auto text-xs sm:text-sm`}
              >
                Book a Construction Consultation
              </Link>
            </div>
          </div>

          <KitchenImage className="hidden lg:block" />
        </div>

        {/* Premium warranty band — deep navy per approved mockup */}
        <div className="mt-10 md:mt-12 bg-[#141c2b] text-white overflow-hidden">
          <div className="px-5 sm:px-8 py-7 sm:py-9">
            <div className="flex flex-col lg:flex-row lg:items-stretch gap-8 lg:gap-0">
              <div className="flex items-start gap-5 sm:gap-6 lg:pr-8 lg:border-r lg:border-white/15 min-w-0 flex-1">
                <WarrantyShieldBadge className="h-[4.5rem] w-[4.5rem] sm:h-20 sm:w-20" />
                <div className="min-w-0 pt-1">
                  <p className="font-heading text-tamay-accent text-sm sm:text-base font-semibold tracking-[0.12em] uppercase leading-tight">
                    7-Year Workmanship Warranty
                  </p>
                  <p className="mt-1.5 font-heading text-tamay-accent/90 text-sm sm:text-base italic">
                    On New Kitchens
                  </p>
                  <p className="mt-3 text-white/85 text-sm leading-relaxed max-w-sm">
                    We stand behind our workmanship so you can enjoy your new kitchen with confidence for years to
                    come.
                  </p>
                </div>
              </div>

              <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-0 lg:flex-1 lg:pl-8">
                {WARRANTY_POINTS.map((point, index) => {
                  const Icon = point.icon;
                  return (
                    <li
                      key={point.label}
                      className={`flex flex-col items-center text-center gap-2.5 px-2 sm:px-3 ${
                        index > 0 ? "lg:border-l lg:border-white/15" : ""
                      }`}
                    >
                      <Icon className="h-7 w-7 sm:h-8 sm:w-8" />
                      <span className="text-[11px] sm:text-xs text-white/85 leading-snug max-w-[9rem]">
                        {point.label}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
