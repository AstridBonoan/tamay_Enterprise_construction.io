const NAVY = "#141c2b";
const GOLD = "#c9a227";

const STEPS = [
  {
    num: "01",
    title: "Consultation",
    copy: "We start by understanding your project, priorities, and goals.",
    icon: "consult" as const,
  },
  {
    num: "02",
    title: "Planning & Proposal",
    copy: "We organize scope, details, responsibilities, and pricing.",
    icon: "plan" as const,
  },
  {
    num: "03",
    title: "Build & Coordinate",
    copy: "We manage the work, trades, materials, and communication.",
    icon: "build" as const,
  },
  {
    num: "04",
    title: "Quality Checks",
    copy: "We review details throughout the project before final completion.",
    icon: "quality" as const,
  },
  {
    num: "05",
    title: "Final Walkthrough & Support",
    copy: "We review the finished work and next steps with you.",
    icon: "home" as const,
  },
] as const;

const SUPPORT_ITEMS = [
  {
    title: "Clear Communication",
    copy: "Proactive updates and responsive service.",
    icon: "message" as const,
  },
  {
    title: "Reliable Scheduling",
    copy: "Realistic timelines and proactive scheduling.",
    icon: "calendar" as const,
  },
  {
    title: "Quality Commitment",
    copy: "High standards in every detail.",
    icon: "medal" as const,
  },
  {
    title: "Ongoing Support",
    copy: "We’re here beyond project completion.",
    icon: "support" as const,
  },
] as const;

function StepIcon({ type }: { type: (typeof STEPS)[number]["icon"] }) {
  const className = "h-6 w-6";
  if (type === "consult") {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M8 10h.01M12 10h.01M16 10h.01M7 16h6l4 3v-3h1a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v7a2 2 0 002 2z"
        />
      </svg>
    );
  }
  if (type === "plan") {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
        />
      </svg>
    );
  }
  if (type === "build") {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M11.42 15.17l-5.22 5.22a2.12 2.12 0 01-3-3l5.22-5.22M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-1.16-1.16"
        />
      </svg>
    );
  }
  if (type === "quality") {
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

function SupportIcon({ type }: { type: (typeof SUPPORT_ITEMS)[number]["icon"] }) {
  const className = "h-5 w-5";
  if (type === "message") {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    );
  }
  if (type === "calendar") {
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
  if (type === "medal") {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <circle cx="12" cy="9" r="4.5" strokeWidth={1.5} />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.5 13.2L8 21l4-2.2L16 21l-1.5-7.8"
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
        d="M3 18v-2a4 4 0 014-4h1M15 12h1a4 4 0 014 4v2M8 21h8M12 3a4 4 0 110 8 4 4 0 010-8z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 8v4M21 10h-4" />
    </svg>
  );
}

function NumberBadge({ num }: { num: string }) {
  return (
    <span
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-bold tracking-wide text-[#141c2b] shadow-sm ring-2 ring-white"
      style={{ backgroundColor: GOLD }}
    >
      {num}
    </span>
  );
}

/**
 * “What to Expect” — live HTML timeline (replaces flattened process graphic).
 */
export function ConstructionProcessSection() {
  return (
    <section className="py-14 md:py-16 lg:py-20 bg-[#faf8f5] border-b border-gray-200/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-heading text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase text-[#c9a227]">
            What to Expect
          </p>
          <div className="mx-auto mt-2.5 h-px w-10 bg-[#c9a227]/70" aria-hidden />
          <h2 className="mt-3 font-heading text-2xl sm:text-3xl lg:text-[2.15rem] text-[#141c2b] font-semibold leading-[1.12] text-balance">
            A Clear Process. A Better Experience.
          </h2>
          <p className="mt-3 text-sm sm:text-[15px] text-gray-600 leading-relaxed">
            From the first conversation to the final walkthrough, we keep you informed, prepared, and clear on
            what comes next.
          </p>
        </div>

        {/* Desktop / large tablet: horizontal timeline */}
        <ol className="mt-12 md:mt-14 hidden lg:grid lg:grid-cols-5 lg:gap-0 list-none p-0 m-0">
          {STEPS.map((step, index) => (
            <li key={step.num} className="relative flex flex-col items-center text-center px-2 xl:px-3">
              {/* Horizontal connector */}
              {index < STEPS.length - 1 ? (
                <div
                  className="absolute top-[18px] left-[calc(50%+22px)] right-[-22px] h-px"
                  style={{ backgroundColor: `${GOLD}99` }}
                  aria-hidden
                />
              ) : null}

              <NumberBadge num={step.num} />

              {/* Vertical dotted connector */}
              <div
                className="mt-2 mb-3 w-px h-7 border-l border-dashed"
                style={{ borderColor: `${GOLD}aa` }}
                aria-hidden
              />

              <span className="text-[#c9a227]" style={{ color: GOLD }}>
                <StepIcon type={step.icon} />
              </span>

              <h3 className="mt-3 font-heading text-[15px] xl:text-base font-semibold leading-snug" style={{ color: NAVY }}>
                {step.title}
              </h3>
              <p className="mt-2 text-[13px] text-gray-600 leading-relaxed max-w-[11.5rem] xl:max-w-[13rem]">
                {step.copy}
              </p>
            </li>
          ))}
        </ol>

        {/* Tablet: wrapped 3 + 2 */}
        <ol className="mt-10 hidden md:grid lg:hidden md:grid-cols-3 gap-x-4 gap-y-10 list-none p-0 m-0">
          {STEPS.map((step) => (
            <li key={step.num} className="relative flex flex-col items-center text-center px-2">
              <NumberBadge num={step.num} />
              <div
                className="mt-2 mb-3 w-px h-6 border-l border-dashed"
                style={{ borderColor: `${GOLD}aa` }}
                aria-hidden
              />
              <span style={{ color: GOLD }}>
                <StepIcon type={step.icon} />
              </span>
              <h3 className="mt-3 font-heading text-base font-semibold leading-snug" style={{ color: NAVY }}>
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed max-w-[16rem]">{step.copy}</p>
            </li>
          ))}
        </ol>

        {/* Mobile: vertical timeline */}
        <ol className="mt-10 md:hidden relative list-none p-0 m-0 space-y-0">
          {STEPS.map((step, index) => (
            <li key={step.num} className="relative flex gap-4 pb-8 last:pb-0">
              <div className="relative flex flex-col items-center">
                <NumberBadge num={step.num} />
                {index < STEPS.length - 1 ? (
                  <div
                    className="absolute top-9 bottom-0 w-px border-l border-dashed"
                    style={{ borderColor: `${GOLD}aa` }}
                    aria-hidden
                  />
                ) : null}
              </div>
              <div className="min-w-0 pt-0.5 pb-1">
                <div className="flex items-center gap-2.5">
                  <span style={{ color: GOLD }}>
                    <StepIcon type={step.icon} />
                  </span>
                  <h3 className="font-heading text-base font-semibold leading-snug" style={{ color: NAVY }}>
                    {step.title}
                  </h3>
                </div>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{step.copy}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* Bottom support strip */}
        <div
          className="mt-12 md:mt-14 rounded-xl bg-white px-5 sm:px-6 py-6 sm:py-7"
          style={{ boxShadow: "inset 0 0 0 1px rgba(201,162,39,0.35)" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,2.2fr)] gap-6 lg:gap-8 lg:items-center">
            <div className="lg:pr-4 lg:border-r lg:border-[#c9a227]/25">
              <h3 className="font-heading text-lg sm:text-xl font-semibold leading-snug" style={{ color: NAVY }}>
                You’ll Always Know What Comes Next.
              </h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed max-w-md">
                Clear communication, defined responsibilities, and a documented process from start to finish.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-4">
              {SUPPORT_ITEMS.map((item, i) => (
                <div
                  key={item.title}
                  className={`min-w-0 ${i > 0 ? "sm:border-l sm:border-[#c9a227]/20 sm:pl-4" : ""} ${
                    i > 1 ? "xl:border-l xl:pl-4" : ""
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <span className="mt-0.5 shrink-0" style={{ color: GOLD }}>
                      <SupportIcon type={item.icon} />
                    </span>
                    <div>
                      <p className="font-heading text-sm font-semibold leading-snug" style={{ color: NAVY }}>
                        {item.title}
                      </p>
                      <p className="mt-1 text-[13px] text-gray-600 leading-snug">{item.copy}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
