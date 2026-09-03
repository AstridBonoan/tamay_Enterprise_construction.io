import Link from "next/link";
import { SitePhoto } from "@/components/images/SitePhoto";
import { appointmentScheduleHref } from "@/lib/onlineAppointments";
import { sitePath } from "@/lib/paths";

const SERVICE_FEATURES = [
  { label: "Tile & Waterproofing", icon: TileIcon },
  { label: "Vanities & Storage", icon: VanityIcon },
  { label: "Plumbing & Fixtures", icon: PlumbingIcon },
  { label: "Lighting & Electrical", icon: LightingIcon },
  { label: "Flooring & Finishes", icon: FlooringIcon },
] as const;

const compactPrimaryCtaClass =
  "inline-flex items-center justify-center min-h-10 font-semibold text-xs sm:text-sm tracking-wide px-5 py-2.5 transition-colors text-center bg-tamay-accent hover:bg-tamay-accent-hover text-white";

const compactOutlineCtaClass =
  "inline-flex items-center justify-center min-h-10 font-semibold text-xs sm:text-sm tracking-wide px-5 py-2.5 transition-colors text-center border-2 border-tamay-primary text-tamay-primary hover:bg-tamay-primary hover:text-white";

function TileIcon({ className = "h-[18px] w-[18px]" }: { className?: string }) {
  return (
    <svg className={`text-tamay-accent shrink-0 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4h8v8H4V4zm12 0h4v4h-4V4zM4 16h4v4H4v-4zm8 0h8v8h-8v-8z" />
    </svg>
  );
}

function VanityIcon({ className = "h-[18px] w-[18px]" }: { className?: string }) {
  return (
    <svg className={`text-tamay-accent shrink-0 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 19h16M6 15h12M8 11h8M10 7h4" />
    </svg>
  );
}

function PlumbingIcon({ className = "h-[18px] w-[18px]" }: { className?: string }) {
  return (
    <svg className={`text-tamay-accent shrink-0 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v3m0 12v3M6 9h12M8 9a4 4 0 0 0 8 0" />
    </svg>
  );
}

function LightingIcon({ className = "h-[18px] w-[18px]" }: { className?: string }) {
  return (
    <svg className={`text-tamay-accent shrink-0 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 18h6M10 22h4M12 3a5 5 0 0 0-2 9.5V15h4v-2.5A5 5 0 0 0 12 3z" />
    </svg>
  );
}

function FlooringIcon({ className = "h-[18px] w-[18px]" }: { className?: string }) {
  return (
    <svg className={`text-tamay-accent shrink-0 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 19h16M6 15h2v4H6v-4zm5 0h2v4h-2v-4zm5 0h2v4h-2v-4zM4 11h16M6 7h2v4H6V7zm5 0h2v4h-2V7zm5 0h2v4h-2V7z" />
    </svg>
  );
}

function BathroomImage({
  className = "",
  layout = "stacked",
}: {
  className?: string;
  layout?: "stacked" | "column";
}) {
  const fillsColumn = layout === "column";

  return (
    <figure className={`relative w-full ${fillsColumn ? "h-full min-h-0" : ""} ${className}`}>
      <div
        className={`relative w-full overflow-hidden rounded-xl sm:rounded-2xl shadow-sm ring-1 ring-black/5 ${
          fillsColumn ? "h-full min-h-[380px]" : "aspect-[16/10]"
        }`}
      >
        <SitePhoto
          slot="construction.approvedBathroom"
          alt="Premium renovated bathroom with coordinated tile, vanity, fixtures, lighting, and finishes"
          className="object-cover object-[50%_42%]"
          sizes={fillsColumn ? "(max-width: 1024px) 100vw, 62vw" : "(max-width: 1024px) 100vw, 50vw"}
        />
      </div>
    </figure>
  );
}

export function BathroomRenovationSection() {
  return (
    <section className="py-12 md:py-14 lg:py-16 bg-[#faf8f5] border-b border-gray-200/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="lg:grid lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] lg:gap-8 xl:gap-10 lg:items-stretch">
          <div className="min-w-0 lg:flex lg:flex-col lg:h-full lg:justify-between lg:gap-6">
            <div className="min-w-0">
              <p className="text-tamay-accent font-heading font-bold tracking-[0.16em] uppercase text-[11px] sm:text-xs">
                Bathroom Renovations
              </p>
              <div className="mt-2 h-px w-10 bg-tamay-accent/70" aria-hidden />
              <h2 className="mt-3 font-heading text-[1.65rem] sm:text-[1.85rem] lg:text-[1.9rem] xl:text-[2.05rem] text-tamay-primary font-semibold leading-[1.12] text-balance">
                Built for Comfort. Finished to Last.
              </h2>
              <p className="mt-3 text-gray-600 text-sm leading-snug max-w-md">
                Thoughtfully coordinated bathrooms with tile, waterproofing, plumbing, lighting, fixtures, and finishes —
                built for comfort, durability, and long-term value.
              </p>

              <BathroomImage className="mt-5 lg:hidden" />
            </div>

            <ul className="mt-5 lg:mt-0 divide-y divide-gray-200/80 border-y border-gray-200/80">
              {SERVICE_FEATURES.map((feature) => {
                const Icon = feature.icon;
                return (
                  <li key={feature.label} className="flex items-center gap-2.5 py-2 lg:py-2.5 text-[13px] sm:text-sm text-gray-700">
                    <Icon />
                    <span>{feature.label}</span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-5 lg:mt-0 flex flex-col sm:flex-row gap-2 sm:gap-2.5">
              <Link href={sitePath("/gallery")} className={`${compactPrimaryCtaClass} w-full sm:w-auto`}>
                Explore Bathroom Projects
              </Link>
              <Link href={appointmentScheduleHref("construction")} className={`${compactOutlineCtaClass} w-full sm:w-auto`}>
                Book a Construction Consultation
              </Link>
            </div>
          </div>

          <BathroomImage layout="column" className="hidden lg:block self-stretch min-h-0" />
        </div>
      </div>
    </section>
  );
}
