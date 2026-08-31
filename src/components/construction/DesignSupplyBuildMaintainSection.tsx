const STAGES = [
  {
    key: "DESIGN",
    title: "DESIGN",
    copy: "We help define the scope, priorities, layout, selections, and practical direction of the project.",
  },
  {
    key: "SUPPLY",
    title: "SUPPLY",
    copy: "We coordinate the raw materials and approved selections needed to keep the project moving.",
  },
  {
    key: "BUILD",
    title: "BUILD",
    copy: "Our team coordinates the trades, scheduling, execution, and quality control from start to completion.",
  },
  {
    key: "MAINTAIN",
    title: "MAINTAIN",
    copy: "After the project is complete, Tamay can continue supporting the property through repairs, preventive services, and long-term care.",
  },
] as const;

function StageIcon({ stage }: { stage: string }) {
  const className = "h-7 w-7 text-tamay-accent";
  if (stage === "DESIGN") {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M4 19l5-14h2l5 14M7.5 12h5" />
      </svg>
    );
  }
  if (stage === "SUPPLY") {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M3 7h18v4H3V7zm2 4v8h14v-8M8 11v8m8-8v8" />
      </svg>
    );
  }
  if (stage === "BUILD") {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M3 21h18M5 21V10l7-5 7 5v11M9 21v-6h6v6" />
      </svg>
    );
  }
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M12 3l8 4v6c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V7l8-4z" />
    </svg>
  );
}

export function DesignSupplyBuildMaintainSection() {
  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-tamay-primary font-semibold leading-tight max-w-3xl">
          One Company. One Process. From Vision to Long-Term Care.
        </h2>

        <div className="mt-12 flex flex-col lg:flex-row lg:items-stretch">
          {STAGES.map((stage, index) => (
            <div key={stage.key} className="flex-1 flex flex-col lg:flex-row">
              <article className="flex-1 bg-tamay-primary text-white p-6 sm:p-7">
                <StageIcon stage={stage.key} />
                <p className="mt-4 text-tamay-accent text-xs font-bold tracking-[0.18em]">{stage.title}</p>
                <p className="mt-3 text-sm text-white/85 leading-relaxed">{stage.copy}</p>
              </article>
              {index < STAGES.length - 1 ? (
                <div
                  className="h-8 w-px lg:h-auto lg:w-8 bg-tamay-accent self-center lg:self-stretch mx-auto"
                  aria-hidden
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
