import Image from "next/image";
import Link from "next/link";
import { OpenLiveChatButton } from "@/components/layout/OpenLiveChatButton";
import { appointmentScheduleHref } from "@/lib/onlineAppointments";
import { SITE } from "@/lib/site";

const TRUST_ITEMS = [
  {
    title: "Licensed & Fully Insured",
    support: "Your project is protected.",
    icon: "shield" as const,
  },
  {
    title: "Family Owned",
    support: "Built on trust, driven by relationships.",
    icon: "family" as const,
  },
  {
    title: "Serving West Haven & Nearby Connecticut Communities",
    support: "Local people. Lasting results.",
    icon: "pin" as const,
  },
  {
    title: "7-Year Workmanship Warranty on New Kitchens & Bathrooms",
    support: "Quality you can count on.",
    icon: "home" as const,
  },
] as const;

function TrustIcon({ type }: { type: (typeof TRUST_ITEMS)[number]["icon"] }) {
  const className = "h-5 w-5";
  if (type === "shield") {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 3l8 4v6c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V7l8-4z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4" />
      </svg>
    );
  }
  if (type === "family") {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    );
  }
  if (type === "pin") {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    );
  }
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-9.5z"
      />
    </svg>
  );
}

const primaryCtaClass =
  "inline-flex items-center justify-center gap-2 min-h-11 font-bold text-sm tracking-wide px-6 py-3 transition-colors text-center bg-tamay-accent hover:bg-tamay-accent-hover text-[#141c2b] w-full sm:w-auto";

const secondaryCtaClass =
  "inline-flex items-center justify-center min-h-11 font-bold text-sm tracking-wide px-6 py-3 transition-colors text-center border-2 border-white/85 text-white hover:bg-white/10 w-full sm:w-auto";

/**
 * Final Construction conversion CTA — cinematic blue-hour home background.
 */
export function ConstructionFinalCTA() {
  return (
    <section className="relative isolate overflow-hidden min-h-[640px] lg:min-h-[720px] flex flex-col justify-center">
      {/* Background image */}
      <div className="absolute inset-0 -z-20" aria-hidden>
        <Image
          src="/construction/final-cta-home.png"
          alt=""
          fill
          className="object-cover object-[72%_center] sm:object-[68%_center] lg:object-right"
          sizes="100vw"
          priority={false}
        />
      </div>

      {/* Navy gradient: readable left, house visible right */}
      <div
        className="absolute inset-0 -z-10"
        aria-hidden
        style={{
          background:
            "linear-gradient(90deg, rgba(20,28,43,0.94) 0%, rgba(20,28,43,0.88) 28%, rgba(20,28,43,0.62) 48%, rgba(20,28,43,0.28) 68%, rgba(20,28,43,0.12) 100%)",
        }}
      />
      <div
        className="absolute inset-0 -z-10 lg:hidden"
        aria-hidden
        style={{
          background:
            "linear-gradient(180deg, rgba(20,28,43,0.72) 0%, rgba(20,28,43,0.82) 45%, rgba(20,28,43,0.9) 100%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-14 md:py-16 lg:py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-8 lg:gap-10 xl:gap-12 lg:items-center">
          {/* Left — conversion copy */}
          <div className="max-w-xl">
            <div className="flex items-center gap-3">
              <p className="font-heading text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-[#c9a227]">
                Ready When You Are
              </p>
              <span className="hidden sm:block h-px w-10 bg-[#c9a227]/70" aria-hidden />
            </div>

            <h2 className="mt-4 font-heading text-[1.85rem] sm:text-3xl lg:text-[2.45rem] text-white font-semibold leading-[1.12] text-balance">
              Ready to Talk About
              <br className="hidden sm:block" /> Your Project?
            </h2>

            <p className="mt-4 text-sm sm:text-[15px] text-white/82 leading-relaxed max-w-md">
              Tell us what you’re planning. We’ll help you understand the next step, what may be involved, and how
              Tamay can help bring the project together.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-2.5 sm:gap-3">
              <Link href={appointmentScheduleHref("construction")} className={primaryCtaClass}>
                Book a Construction Consultation
                <span aria-hidden>→</span>
              </Link>
              <OpenLiveChatButton className={secondaryCtaClass}>Chat With Our Team</OpenLiveChatButton>
            </div>

            <div className="mt-4">
              <a
                href={SITE.estimateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white transition-colors underline underline-offset-4 decoration-white/35 hover:decoration-white/70"
              >
                Estimate a Small Project
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>

          {/* Right — glass trust panel */}
          <aside className="lg:justify-self-end w-full max-w-md lg:max-w-sm">
            <div
              className="rounded-2xl border border-white/15 bg-[rgba(20,28,43,0.55)] backdrop-blur-md shadow-[0_16px_40px_rgba(0,0,0,0.28)] px-5 py-5 sm:px-6 sm:py-6"
              style={{ backgroundColor: "rgba(20,28,43,0.58)" }}
            >
              <ul className="list-none m-0 p-0 divide-y divide-white/12">
                {TRUST_ITEMS.map((item) => (
                  <li key={item.title} className="flex gap-3 py-3.5 first:pt-0 last:pb-0">
                    <span className="mt-0.5 shrink-0 text-[#c9a227]">
                      <TrustIcon type={item.icon} />
                    </span>
                    <div className="min-w-0">
                      <p className="font-heading text-sm font-semibold text-white leading-snug">{item.title}</p>
                      <p className="mt-1 text-[13px] text-white/70 leading-snug">{item.support}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {/* Bottom brand line */}
        <div className="mt-10 md:mt-12 lg:mt-14 flex items-center justify-center gap-4">
          <span className="hidden sm:block h-px w-12 md:w-16 bg-[#c9a227]/55" aria-hidden />
          <p className="font-heading text-base sm:text-lg text-white/95 text-center leading-snug">
            From Our <span className="italic text-[#c9a227]">Family</span> to Yours.
          </p>
          <span className="hidden sm:block h-px w-12 md:w-16 bg-[#c9a227]/55" aria-hidden />
        </div>
      </div>
    </section>
  );
}
