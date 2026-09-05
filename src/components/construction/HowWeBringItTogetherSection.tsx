import Image from "next/image";
import Link from "next/link";
import {
  constructionOutlineLinkClass,
  constructionPrimaryLinkClass,
} from "@/components/construction/constructionCtaStyles";
import { appointmentScheduleHref } from "@/lib/onlineAppointments";
import { sitePath } from "@/lib/paths";

const NAVY = "#141c2b";
const GOLD = "#c9a227";

type Stage = {
  num: string;
  title: string;
  description: string;
  bullets: readonly [string, string, string];
  image: string;
  alt: string;
  icon: "plan" | "supply" | "build" | "maintain";
};

const STAGES: readonly Stage[] = [
  {
    num: "01",
    title: "Design & Plan",
    description:
      "We define the scope, priorities, and layout to create a smart, functional plan that fits your home and goals.",
    bullets: ["Personalized guidance", "Practical recommendations", "Clear project direction"],
    image: "/construction/one-team-design-plan.png",
    alt: "Tamay professional reviewing blueprints and finish samples during design and planning",
    icon: "plan",
  },
  {
    num: "02",
    title: "Supply & Prepare",
    description:
      "We coordinate materials, selections, and logistics so everything is ready when the project begins.",
    bullets: ["Quality materials", "On-time delivery", "Jobsite fully prepared"],
    image: "/construction/one-team-supply-prepare.png",
    alt: "Tamay team member inspecting flooring and tile materials beside the Tamay Enterprises van",
    icon: "supply",
  },
  {
    num: "03",
    title: "Build & Coordinate",
    description:
      "Our experienced team and trusted trades manage the work, sequence, and quality throughout construction.",
    bullets: ["Licensed professionals", "Consistent communication", "High-quality workmanship"],
    image: "/construction/one-team-build-coordinate.png",
    alt: "Tamay supervisor coordinating active construction work on site with plans and tablet",
    icon: "build",
  },
  {
    num: "04",
    title: "Maintain & Support",
    description:
      "Our relationship continues after completion with support for future repairs, improvements, and home care.",
    bullets: ["Lasting quality", "Reliable follow-up", "A partner you can count on"],
    image: "/construction/one-team-maintain-support.png",
    alt: "Finished modern kitchen representing completed Tamay construction and ongoing support",
    icon: "maintain",
  },
] as const;

const ADVANTAGES = [
  {
    title: (
      <>
        One team,
        <br />
        from start to finish
      </>
    ),
    icon: "team" as const,
  },
  {
    title: (
      <>
        Efficient
        <br />
        project management
      </>
    ),
    icon: "clock" as const,
  },
  {
    title: (
      <>
        Quality you
        <br />
        can trust
      </>
    ),
    icon: "shield" as const,
  },
  {
    title: (
      <>
        Built for the
        <br />
        way you live
      </>
    ),
    icon: "home" as const,
  },
];

function StageIcon({ type }: { type: Stage["icon"] }) {
  const className = "h-5 w-5";
  if (type === "plan") {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 4h8a2 2 0 012 2v12a2 2 0 01-2 2H9a2 2 0 01-2-2V6a2 2 0 012-2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 8h4M11 12h4M11 16h2" />
      </svg>
    );
  }
  if (type === "supply") {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7h13l3 4v7a1 1 0 01-1 1H4a1 1 0 01-1-1V7z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7v4h5M7.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm9 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
      </svg>
    );
  }
  if (type === "build") {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
      </svg>
    );
  }
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-9.5z" />
    </svg>
  );
}

function AdvantageIcon({ type }: { type: (typeof ADVANTAGES)[number]["icon"] }) {
  const className = "h-5 w-5";
  if (type === "team") {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 11a3 3 0 100-6 3 3 0 000 6zm10 0a3 3 0 100-6 3 3 0 000 6zM3.5 19a3.5 3.5 0 017 0M13.5 19a3.5 3.5 0 017 0" />
      </svg>
    );
  }
  if (type === "clock") {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <circle cx="12" cy="12" r="8" strokeWidth={1.5} />
        <path strokeLinecap="round" strokeWidth={1.5} d="M12 8v4.5l2.5 1.5" />
      </svg>
    );
  }
  if (type === "shield") {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3l8 4v6c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V7l8-4z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4" />
      </svg>
    );
  }
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-9.5z" />
    </svg>
  );
}

function JourneyArrow() {
  return (
    <div className="hidden xl:flex absolute top-[38%] -right-3 z-20 items-center justify-center w-6 pointer-events-none" aria-hidden>
      <svg width="22" height="12" viewBox="0 0 22 12" fill="none">
        <path d="M1 6h17M14 1.5L19.5 6 14 10.5" stroke={GOLD} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function StageCard({ stage, showArrow }: { stage: Stage; showArrow: boolean }) {
  return (
    <article className="relative flex flex-col h-full bg-white rounded-xl overflow-visible shadow-[0_10px_28px_rgba(20,28,43,0.08)] ring-1 ring-black/[0.04]">
      {showArrow ? <JourneyArrow /> : null}

      <div className="relative pt-4 px-3 sm:px-3.5">
        <div
          className="absolute left-1/2 top-0 z-10 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-[11px] font-bold tracking-wide text-[#141c2b] shadow-md"
          style={{ backgroundColor: GOLD }}
        >
          {stage.num}
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={stage.image}
            alt={stage.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
          />
        </div>
      </div>

      <div className="mx-3 sm:mx-3.5 mt-0 rounded-b-md px-3.5 py-3 flex items-center gap-2.5" style={{ backgroundColor: NAVY }}>
        <span className="text-[#c9a227] shrink-0">
          <StageIcon type={stage.icon} />
        </span>
        <h3 className="font-heading text-[15px] sm:text-base text-white font-semibold leading-snug">{stage.title}</h3>
      </div>

      <div className="flex-1 px-4 sm:px-4.5 pt-3.5 pb-5">
        <p className="text-[13px] text-gray-600 leading-relaxed">{stage.description}</p>
        <ul className="mt-3.5 space-y-2">
          {stage.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2 text-[13px] text-gray-700 leading-snug">
              <span className="mt-0.5 shrink-0 text-[#c9a227]" aria-hidden>
                <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
                  <path d="M3.5 8.2l3 3 6-6.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

/**
 * Approved “How We Bring It Together” / One Project. One Coordinated Team.
 * Live HTML layout with the five approved production images.
 */
export function HowWeBringItTogetherSection() {
  return (
    <section className="relative overflow-hidden bg-[#f7f4ef]">
      {/* Navy cinematic header */}
      <div className="relative isolate overflow-hidden" style={{ backgroundColor: NAVY }}>
        {/* Blueprint → finished kitchen background — desktop only (looks premium there) */}
        <div
          className="pointer-events-none absolute inset-y-0 right-0 hidden lg:block w-[58%] xl:w-[54%]"
          aria-hidden
        >
          <div className="absolute inset-0">
            <Image
              src="/construction/one-team-blueprint-transition.png"
              alt=""
              fill
              className="object-cover object-right"
              sizes="55vw"
              priority={false}
            />
          </div>
          {/* Fade into navy on the left / soft veil for readability */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, #141c2b 0%, #141c2b 18%, rgba(20,28,43,0.88) 34%, rgba(20,28,43,0.45) 55%, rgba(20,28,43,0.12) 78%, transparent 100%)",
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-24"
            style={{
              background: "linear-gradient(180deg, transparent, #141c2b)",
            }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-14 sm:pt-16 lg:pt-20 pb-28 sm:pb-32 lg:pb-36">
          <div className="max-w-xl lg:max-w-[28rem] xl:max-w-xl">
            <p className="font-heading text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-[#c9a227]">
              How We Bring It Together
            </p>
            <div className="mt-2.5 h-px w-10 bg-[#c9a227]/70" aria-hidden />
            <h2 className="mt-4 font-heading text-[1.75rem] sm:text-3xl lg:text-[2.35rem] text-white font-semibold leading-[1.12] text-balance">
              One Project. One Coordinated Team.
            </h2>
            <p className="mt-4 text-sm sm:text-[15px] text-white/78 leading-relaxed max-w-md">
              From the first conversation to the final details, Tamay coordinates the people, materials,
              scheduling, and work needed to keep your project moving forward.
            </p>
          </div>
        </div>
      </div>

      {/* Journey cards overlapping navy */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 -mt-20 sm:-mt-24 lg:-mt-28">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 sm:gap-6 xl:gap-5">
          {STAGES.map((stage, index) => (
            <StageCard key={stage.num} stage={stage} showArrow={index < STAGES.length - 1} />
          ))}
        </div>

        {/* Tamay Advantage strip */}
        <div className="mt-10 md:mt-12 rounded-xl overflow-hidden ring-1 ring-black/[0.05] shadow-[0_8px_24px_rgba(20,28,43,0.06)] bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,2.05fr)]">
            <div
              className="px-5 sm:px-6 py-6 sm:py-7 flex flex-row items-center gap-4"
              style={{ backgroundColor: NAVY }}
            >
              <div className="relative h-14 w-14 sm:h-16 sm:w-16 shrink-0">
                <Image
                  src="/branding/tamay-symbol-on-navy.png"
                  alt="Tamay Enterprises"
                  fill
                  className="object-contain"
                  sizes="64px"
                />
              </div>
              <div className="min-w-0">
                <p className="font-heading text-lg sm:text-xl text-white font-semibold leading-snug">
                  The Tamay Advantage
                </p>
                <p className="mt-2 text-sm text-white/75 leading-relaxed max-w-xs">
                  More than a contractor — your complete home improvement partner.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 bg-[#faf8f5]">
              {ADVANTAGES.map((item, i) => (
                <div
                  key={i}
                  className={`px-4 sm:px-5 py-5 sm:py-6 flex flex-col items-start gap-2.5 ${
                    i % 2 === 1 ? "border-l border-black/[0.06]" : ""
                  } ${i >= 2 ? "border-t border-black/[0.06] lg:border-t-0" : ""} lg:border-l lg:border-black/[0.06]`}
                >
                  <span className="text-[#c9a227]">
                    <AdvantageIcon type={item.icon} />
                  </span>
                  <p className="font-heading text-[13px] sm:text-sm text-[#141c2b] font-semibold leading-snug">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 md:mt-12 pb-14 md:pb-16 text-center">
          <h3 className="font-heading text-xl sm:text-2xl lg:text-[1.7rem] text-[#141c2b] font-semibold leading-snug">
            Ready to bring your project to life?
          </h3>
          <p className="mt-2 text-sm sm:text-[15px] text-gray-600">
            Let’s plan it, build it and make it happen together.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-2.5 sm:gap-3 sm:justify-center">
            <Link
              href={appointmentScheduleHref("construction")}
              className={`${constructionPrimaryLinkClass} w-full sm:w-auto`}
            >
              Book a Construction Consultation
            </Link>
            <Link href={sitePath("/gallery")} className={`${constructionOutlineLinkClass} w-full sm:w-auto`}>
              Explore More of Our Work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
