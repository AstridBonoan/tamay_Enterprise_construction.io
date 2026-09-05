import Image from "next/image";
import Link from "next/link";
import {
  constructionOutlineLinkClass,
  constructionPrimaryLinkClass,
} from "@/components/construction/constructionCtaStyles";
import { appointmentScheduleHref } from "@/lib/onlineAppointments";
import { SITE } from "@/lib/site";

const NAVY = "#141c2b";
const GOLD = "#c9a227";

const BENEFITS = [
  {
    title: "Explore Options Without Impacting Your Credit Score",
    copy: "Check available financing options through the initial prequalification process without affecting your credit score.",
    icon: "gauge" as const,
  },
  {
    title: "Compare Offers From Multiple Lending Partners",
    copy: "Review available offers, rates, terms, and payment options from participating lenders.",
    icon: "offers" as const,
  },
  {
    title: "Flexible Monthly Payment Options",
    copy: "Explore available payment structures that may help make larger home improvement projects more manageable.",
    icon: "payments" as const,
  },
  {
    title: "Options for a Range of Qualifying Credit Profiles",
    copy: "Participating lenders may provide options across a range of qualifying credit profiles.",
    icon: "profiles" as const,
  },
] as const;

const PROJECT_POSSIBILITIES = [
  "Kitchen Remodel",
  "Bathroom Upgrade",
  "Home Addition",
  "Outdoor Living",
  "And More",
] as const;

const VALUE_STRIP = [
  { label: "A More Beautiful Home Today", icon: "home" as const },
  { label: "Flexible Ways to Make It Happen", icon: "coins" as const },
  { label: "A Trusted Team for What’s Ahead", icon: "shield" as const },
  { label: "More Possibilities for Your Project", icon: "spark" as const },
] as const;

function BenefitIcon({ type }: { type: (typeof BENEFITS)[number]["icon"] }) {
  const className = "h-5 w-5";
  if (type === "gauge") {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14a2 2 0 100-4 2 2 0 000 4z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3a9 9 0 00-9 9h3a6 6 0 0112 0h3a9 9 0 00-9-9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.5 9.5L17 7" />
      </svg>
    );
  }
  if (type === "offers") {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
        />
      </svg>
    );
  }
  if (type === "payments") {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M8 7V3m8 4V3M4 11h16M6 5h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2z"
        />
      </svg>
    );
  }
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

function ValueIcon({ type }: { type: (typeof VALUE_STRIP)[number]["icon"] }) {
  const className = "h-5 w-5";
  if (type === "home") {
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
  if (type === "coins") {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    );
  }
  if (type === "shield") {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 3l8 4v6c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V7l8-4z"
        />
      </svg>
    );
  }
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
      />
    </svg>
  );
}

/**
 * Financing through Tamay’s lending partners — Build Now. Pay Over Time.
 * Acorn is partner network only; Tamay remains the primary brand.
 */
export function ConstructionFinancingSection() {
  return (
    <section className="bg-[#faf8f5] border-b border-gray-200/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-14 md:pt-16 lg:pt-20 pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-8 lg:gap-10 xl:gap-12 lg:items-center">
          {/* Left — copy + benefits + CTAs */}
          <div className="order-1 lg:order-1 min-w-0">
            <p className="font-heading text-[11px] sm:text-xs font-bold tracking-[0.16em] uppercase text-[#c9a227]">
              Financing Through Our Lending Partners
            </p>
            <div className="mt-2.5 h-px w-10 bg-[#c9a227]/70" aria-hidden />

            <h2 className="mt-3 font-heading text-[1.85rem] sm:text-3xl lg:text-[2.35rem] font-semibold leading-[1.12] text-balance">
              <span style={{ color: NAVY }}>Build Now.</span>
              <br />
              <span style={{ color: GOLD }}>Pay Over Time.</span>
            </h2>

            <p className="mt-4 text-sm sm:text-[15px] text-gray-600 leading-relaxed max-w-lg">
              Through Tamay Enterprises’ trusted financing partners, qualified homeowners can explore flexible
              financing options designed to help move projects forward without waiting to cover the full cost
              upfront.
            </p>

            {/* Mobile image */}
            <div className="mt-6 lg:hidden relative aspect-[4/3] overflow-hidden rounded-xl ring-1 ring-black/5 shadow-[0_10px_28px_rgba(20,28,43,0.08)]">
              <Image
                src="/construction/financing-homeowners.png"
                alt="Homeowners enjoying a finished modern kitchen after a home improvement project"
                fill
                className="object-cover object-[40%_center]"
                sizes="100vw"
              />
            </div>

            <ul className="mt-7 space-y-4 list-none p-0 m-0">
              {BENEFITS.map((item) => (
                <li key={item.title} className="flex gap-3">
                  <span className="mt-0.5 shrink-0 text-[#c9a227]">
                    <BenefitIcon type={item.icon} />
                  </span>
                  <div className="min-w-0">
                    <p className="font-heading text-sm sm:text-[15px] font-semibold leading-snug" style={{ color: NAVY }}>
                      {item.title}
                    </p>
                    <p className="mt-1 text-[13px] text-gray-600 leading-relaxed">{item.copy}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col sm:flex-row gap-2.5 sm:gap-3">
              <a
                href={SITE.financingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${constructionPrimaryLinkClass} w-full sm:w-auto text-center`}
              >
                Check My Financing Options
              </a>
              <Link
                href={appointmentScheduleHref("construction")}
                className={`${constructionOutlineLinkClass} w-full sm:w-auto text-center`}
              >
                Book a Consultation
              </Link>
            </div>

            <p className="mt-3 text-[12px] text-gray-500 leading-snug max-w-md">
              Explore available financing offers through Tamay Enterprises’ trusted lending partner network.
            </p>

            <p className="mt-5 text-[11px] text-gray-500 leading-relaxed max-w-lg">
              Financing options are provided through Tamay Enterprises’ third-party financing partner network
              powered by Acorn Finance. Offers, eligibility, rates, terms, and approvals are determined by
              participating lenders.
            </p>
          </div>

          {/* Right — homeowner image + project possibilities */}
          <div className="order-2 hidden lg:block relative min-w-0">
            <div className="relative aspect-[5/4] xl:aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_14px_36px_rgba(20,28,43,0.12)] ring-1 ring-black/5">
              <Image
                src="/construction/financing-homeowners.png"
                alt="Homeowners enjoying a finished modern kitchen after a home improvement project"
                fill
                className="object-cover object-[38%_center]"
                sizes="(max-width: 1280px) 50vw, 560px"
                priority={false}
              />
            </div>

            <div className="absolute bottom-5 left-5 right-5 sm:right-auto sm:max-w-[15.5rem] rounded-xl bg-white/95 backdrop-blur-sm px-4 py-3.5 shadow-md ring-1 ring-black/5">
              <p className="font-heading text-xs font-semibold tracking-[0.08em] uppercase text-[#c9a227]">
                Your Project Possibilities
              </p>
              <ul className="mt-2 space-y-1.5">
                {PROJECT_POSSIBILITIES.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[13px] text-[#141c2b]">
                    <span className="h-1 w-1 rounded-full bg-[#c9a227] shrink-0" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Navy value strip */}
      <div className="mt-12 md:mt-14" style={{ backgroundColor: NAVY }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-4">
            {VALUE_STRIP.map((item, i) => (
              <div
                key={item.label}
                className={`flex items-start gap-3 ${
                  i > 0 ? "lg:border-l lg:border-white/15 lg:pl-5" : ""
                } ${i % 2 === 1 ? "sm:border-l sm:border-white/15 sm:pl-5 lg:pl-5" : ""} ${
                  i >= 2 ? "sm:border-t sm:border-white/10 sm:pt-5 lg:border-t-0 lg:pt-0" : ""
                }`}
              >
                <span className="mt-0.5 shrink-0 text-[#c9a227]">
                  <ValueIcon type={item.icon} />
                </span>
                <p className="font-heading text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.06em] text-white/90 leading-snug">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
