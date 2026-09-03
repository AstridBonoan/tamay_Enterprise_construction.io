import Link from "next/link";
import {
  constructionChatButtonClass,
  constructionOutlineLinkClass,
} from "@/components/construction/constructionCtaStyles";
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

function TileIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={`text-tamay-accent shrink-0 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4h8v8H4V4zm12 0h4v4h-4V4zM4 16h4v4H4v-4zm8 0h8v8h-8v-8z" />
    </svg>
  );
}

function VanityIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={`text-tamay-accent shrink-0 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 19h16M6 15h12M8 11h8M10 7h4" />
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

function LightingIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={`text-tamay-accent shrink-0 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 18h6M10 22h4M12 3a5 5 0 0 0-2 9.5V15h4v-2.5A5 5 0 0 0 12 3z" />
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
          fillsColumn ? "h-full min-h-[420px]" : "aspect-[16/10] sm:aspect-[16/9]"
        }`}
      >
        <SitePhoto
          slot="construction.approvedBathroom"
          alt="Premium renovated bathroom with coordinated tile, vanity, fixtures, lighting, and finishes"
          className="object-cover object-[50%_42%]"
          sizes={fillsColumn ? "(max-width: 1024px) 100vw, 52vw" : "(max-width: 1024px) 100vw, 50vw"}
        />
      </div>
    </figure>
  );
}

export function BathroomRenovationSection() {
  return (
    <section className="py-14 md:py-16 lg:py-20 bg-[#faf8f5] border-b border-gray-200/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10 xl:gap-14 lg:items-stretch">
          <div className="min-w-0 lg:flex lg:flex-col lg:h-full lg:justify-between lg:gap-8">
            <div className="min-w-0">
              <p className="text-tamay-accent font-heading font-bold tracking-[0.16em] uppercase text-[11px] sm:text-xs">
                Bathroom Renovations
              </p>
              <div className="mt-2 h-px w-10 bg-tamay-accent/70" aria-hidden />
              <h2 className="mt-4 font-heading text-2xl sm:text-3xl lg:text-[2.15rem] xl:text-[2.35rem] text-tamay-primary font-semibold leading-[1.15] text-balance">
                Built for Comfort. Finished to Last.
              </h2>
              <p className="mt-4 text-gray-600 text-sm sm:text-[15px] leading-relaxed max-w-md">
                Thoughtfully coordinated bathrooms with tile, waterproofing, plumbing, lighting, fixtures, and finishes —
                built for comfort, durability, and long-term value.
              </p>

              <BathroomImage className="mt-7 lg:hidden" />
            </div>

            <ul className="mt-7 lg:mt-0 divide-y divide-gray-200/80 border-y border-gray-200/80">
              {SERVICE_FEATURES.map((feature) => {
                const Icon = feature.icon;
                return (
                  <li key={feature.label} className="flex items-center gap-3 py-3 lg:py-3.5 text-sm text-gray-700">
                    <Icon />
                    <span>{feature.label}</span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-7 lg:mt-0 flex flex-col sm:flex-row gap-2.5 sm:gap-3">
              <Link href={sitePath("/gallery")} className={`${constructionChatButtonClass} w-full sm:w-auto text-xs sm:text-sm`}>
                Explore Bathroom Projects
              </Link>
              <Link
                href={appointmentScheduleHref("construction")}
                className={`${constructionOutlineLinkClass} w-full sm:w-auto text-xs sm:text-sm`}
              >
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
