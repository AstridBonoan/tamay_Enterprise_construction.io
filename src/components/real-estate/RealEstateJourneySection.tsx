import Link from "next/link";
import { OpenLiveChatButton } from "@/components/layout/OpenLiveChatButton";
import {
  realEstateChatButtonClass,
  realEstateOnDarkLinkClass,
} from "@/components/real-estate/realEstateCtaStyles";
import { sitePath } from "@/lib/paths";

const STAGES = [
  {
    key: "FIND",
    title: "FIND IT",
    subtitle: "Real Estate Guidance",
    copy: "We help you search for a property that fits your needs today and has the potential to support your plans for tomorrow.",
    cta: {
      label: "Explore Properties",
      href: "#available-properties",
      chat: false,
    },
  },
  {
    key: "UNDERSTAND",
    title: "UNDERSTAND IT",
    subtitle: "Construction-Informed Perspective",
    copy: "We help you look beyond finishes and photos to think about layout, major systems, renovation possibilities, future maintenance, and long-term ownership.",
    cta: {
      label: "Talk to a Real Estate Advisor",
      href: "",
      chat: true,
    },
  },
  {
    key: "IMPROVE",
    title: "IMPROVE IT",
    subtitle: "Construction & Renovation",
    copy: "After closing, Tamay can help transform the property — kitchens, bathrooms, basements, flooring, electrical, plumbing, exterior improvements, and more.",
    cta: {
      label: "Explore Construction Services",
      href: "/construction",
      chat: false,
    },
  },
  {
    key: "MAINTAIN",
    title: "MAINTAIN IT",
    subtitle: "Home Preventive Services",
    copy: "Owning the home is the beginning of another journey. Preventive maintenance helps protect the property, identify small issues early, and plan for future needs.",
    cta: {
      label: "Explore Home Preventive Services",
      href: "/home-preventive-services",
      chat: false,
    },
  },
] as const;

function StageIcon({ stage }: { stage: string }) {
  const className = "h-7 w-7 text-tamay-accent";
  if (stage === "FIND") {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
      </svg>
    );
  }
  if (stage === "UNDERSTAND") {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="3" strokeWidth={1.6} />
      </svg>
    );
  }
  if (stage === "IMPROVE") {
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

export function RealEstateJourneySection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-tamay-primary font-semibold leading-tight max-w-3xl">
          Find It. Understand It. Improve It. Maintain It.
        </h2>
        <p className="mt-4 text-gray-600 leading-relaxed max-w-3xl">
          Real estate is only the beginning. Tamay brings together property guidance, construction knowledge,
          improvement services, and long-term home care so you can make better decisions before and after closing.
        </p>

        <div className="mt-12 flex flex-col lg:flex-row lg:items-stretch">
          {STAGES.map((stage, index) => (
            <div key={stage.key} className="flex-1 flex flex-col lg:flex-row">
              <article className="flex-1 bg-tamay-primary text-white p-6 sm:p-7">
                <StageIcon stage={stage.key} />
                <p className="mt-4 text-tamay-accent text-xs font-bold tracking-[0.18em]">{stage.title}</p>
                <h3 className="font-heading text-xl font-semibold mt-1">{stage.subtitle}</h3>
                <p className="mt-3 text-sm text-white/85 leading-relaxed">{stage.copy}</p>
                <div className="mt-6">
                  {stage.cta.chat ? (
                    <OpenLiveChatButton className={realEstateChatButtonClass}>
                      {stage.cta.label}
                    </OpenLiveChatButton>
                  ) : (
                    <Link
                      href={stage.cta.href.startsWith("#") ? stage.cta.href : sitePath(stage.cta.href)}
                      className={stage.key === "FIND" ? realEstateChatButtonClass : realEstateOnDarkLinkClass}
                    >
                      {stage.cta.label}
                    </Link>
                  )}
                </div>
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
