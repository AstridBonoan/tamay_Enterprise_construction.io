import Link from "next/link";
import { SitePhoto } from "@/components/images/SitePhoto";
import { appointmentScheduleHref } from "@/lib/onlineAppointments";
import { sitePath } from "@/lib/paths";

const SERVICE_FEATURES = [
  { label: "Room Additions", icon: RoomIcon },
  { label: "Expanded Living Areas", icon: ExpandedIcon },
  { label: "New Bedrooms", icon: BedroomIcon },
  { label: "Home Offices", icon: OfficeIcon },
  { label: "Structural Modifications", icon: StructuralIcon },
] as const;

const VALUE_POINTS = [
  {
    title: "Built to Belong",
    body: "Seamless design that blends beautifully with your existing home.",
    icon: BelongIcon,
  },
  {
    title: "Built to Last",
    body: "Quality craftsmanship and structural integrity for long-term peace of mind.",
    icon: LastIcon,
  },
  {
    title: "Built for Your Future",
    body: "Smart, functional spaces created around the way your family lives.",
    icon: FutureIcon,
  },
] as const;

const primaryCtaClass =
  "inline-flex items-center justify-center min-h-11 font-bold text-sm tracking-wide px-6 py-3 transition-colors text-center bg-tamay-accent hover:bg-tamay-accent-hover text-white";

const secondaryCtaClass =
  "inline-flex items-center justify-center min-h-11 font-bold text-sm tracking-wide px-6 py-3 transition-colors text-center border border-white/70 text-white hover:bg-white/10";

function RoomIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={`text-tamay-accent shrink-0 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 20V8l8-4 8 4v12M4 20h16M10 20v-6h4v6" />
    </svg>
  );
}

function ExpandedIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={`text-tamay-accent shrink-0 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 9V5h4M20 9V5h-4M4 15v4h4M20 15v4h-4M9 12h6" />
    </svg>
  );
}

function BedroomIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={`text-tamay-accent shrink-0 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 18V10a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8M4 14h16M7 8V6a1 1 0 0 1 1-1h3" />
    </svg>
  );
}

function OfficeIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={`text-tamay-accent shrink-0 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 19V7a1 1 0 0 1 1-1h6v13M11 6h8a1 1 0 0 1 1 1v12H11M7 10h1M7 13h1" />
    </svg>
  );
}

function StructuralIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={`text-tamay-accent shrink-0 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 20h18M6 20V10l6-5 6 5v10M10 20v-5h4v5" />
    </svg>
  );
}

function BelongIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={`text-tamay-accent shrink-0 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 19V9l8-5 8 5v10M9 19v-5h6v5" />
    </svg>
  );
}

function LastIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={`text-tamay-accent shrink-0 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
    </svg>
  );
}

function FutureIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={`text-tamay-accent shrink-0 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 12h12m0 0-4-4m4 4-4 4M16 6h4v12h-4" />
    </svg>
  );
}

function AdditionsImage({ className = "" }: { className?: string }) {
  return (
    <figure className={`relative w-full h-full min-h-0 ${className}`}>
      <div className="relative w-full h-full overflow-hidden bg-[#1a2233]">
        <div className="relative aspect-[16/11] sm:aspect-[16/10] lg:aspect-auto lg:absolute lg:inset-0 w-full min-h-[280px] lg:min-h-full">
          <SitePhoto
            slot="construction.approvedAdditions"
            alt="Premium home addition with glass gable, stone pillars, and expanded living space that blends with the existing home"
            className="object-cover object-[50%_45%]"
            sizes="(max-width: 1024px) 100vw, 62vw"
          />
        </div>
      </div>
    </figure>
  );
}

function ServiceList() {
  return (
    <ul className="divide-y divide-white/15 border-y border-white/15">
      {SERVICE_FEATURES.map((feature) => {
        const Icon = feature.icon;
        return (
          <li key={feature.label} className="flex items-center gap-3 py-2.5 text-sm text-white/90">
            <Icon />
            <span>{feature.label}</span>
          </li>
        );
      })}
    </ul>
  );
}

function CtaRow() {
  return (
    <div className="mt-6 flex flex-col sm:flex-row gap-2.5 sm:gap-3">
      <Link href={sitePath("/gallery")} className={`${primaryCtaClass} w-full sm:w-auto text-xs sm:text-sm`}>
        Explore Addition Projects
      </Link>
      <Link
        href={appointmentScheduleHref("construction")}
        className={`${secondaryCtaClass} w-full sm:w-auto text-xs sm:text-sm`}
      >
        Book a Construction Consultation
      </Link>
    </div>
  );
}

/**
 * Premium architectural Home Additions section.
 * Distinct from Kitchen/Bathroom: dark navy content panel + cinematic home image + value strip.
 * No 7-Year Kitchen/Bath warranty messaging.
 */
export function HomeAdditionsSection() {
  return (
    <section className="bg-[#faf8f5] border-b border-gray-200/60" aria-label="Home Additions">
      {/* Desktop split: navy panel left, large architectural image right */}
      <div className="hidden lg:grid lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.35fr)] min-h-[560px] xl:min-h-[600px]">
        <div className="bg-[#141c2b] px-8 xl:px-12 py-12 xl:py-14 flex">
          <div className="flex flex-col justify-center w-full max-w-md min-w-0">
            <p className="text-tamay-accent font-heading font-bold tracking-[0.16em] uppercase text-[11px] sm:text-xs">
              Home Additions
            </p>
            <div className="mt-2 h-px w-10 bg-tamay-accent/70" aria-hidden />
            <h2 className="mt-4 font-heading text-[2.25rem] xl:text-[2.5rem] text-white font-semibold leading-[1.12] text-balance">
              More Space.
              <br />
              More Possibilities.
            </h2>
            <p className="mt-4 text-white/80 text-[15px] leading-relaxed max-w-md">
              Thoughtfully planned additions and expansions that feel like they’ve always belonged — designed to enhance
              your lifestyle and built to grow with your home.
            </p>
            <div className="mt-7">
              <ServiceList />
            </div>
            <CtaRow />
          </div>
        </div>
        <AdditionsImage />
      </div>

      {/* Mobile / tablet: eyebrow → headline → copy → image → services → CTAs */}
      <div className="lg:hidden">
        <div className="bg-[#141c2b] px-4 sm:px-6 pt-10 sm:pt-12 pb-8">
          <div className="max-w-6xl mx-auto">
            <p className="text-tamay-accent font-heading font-bold tracking-[0.16em] uppercase text-[11px] sm:text-xs">
              Home Additions
            </p>
            <div className="mt-2 h-px w-10 bg-tamay-accent/70" aria-hidden />
            <h2 className="mt-4 font-heading text-2xl sm:text-3xl text-white font-semibold leading-[1.12] text-balance">
              More Space.
              <br />
              More Possibilities.
            </h2>
            <p className="mt-4 text-white/80 text-sm sm:text-[15px] leading-relaxed max-w-md">
              Thoughtfully planned additions and expansions that feel like they’ve always belonged — designed to enhance
              your lifestyle and built to grow with your home.
            </p>
          </div>
        </div>

        <AdditionsImage />

        <div className="bg-[#141c2b] px-4 sm:px-6 py-8">
          <div className="max-w-6xl mx-auto">
            <ServiceList />
            <CtaRow />
          </div>
        </div>
      </div>

      {/* Compact premium value strip — not a warranty banner */}
      <div className="bg-white border-t border-gray-200/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-7">
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-0">
            {VALUE_POINTS.map((point, index) => {
              const Icon = point.icon;
              return (
                <li
                  key={point.title}
                  className={`flex items-start gap-3 sm:px-5 ${index > 0 ? "sm:border-l sm:border-gray-200" : "sm:pl-0"}`}
                >
                  <Icon className="h-6 w-6 mt-0.5" />
                  <div className="min-w-0">
                    <p className="font-heading text-tamay-primary text-sm font-semibold tracking-wide uppercase">
                      {point.title}
                    </p>
                    <p className="mt-1 text-gray-600 text-[13px] leading-snug">{point.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
