"use client";

import { OpenLiveChatButton } from "@/components/layout/OpenLiveChatButton";
import { realEstateChatButtonClass } from "@/components/real-estate/realEstateCtaStyles";
import { SitePhoto } from "@/components/images/SitePhoto";
import { SiteText } from "@/components/copy/SiteText";

const SCENARIOS = [
  {
    title: "First-Time Buyers",
    message: "Buying your first home is also planning for what comes next.",
    today: ["2 bedrooms", "a simple kitchen", "enough space for two"],
    tomorrow: [
      "another bedroom",
      "nursery",
      "home office",
      "more storage",
      "larger kitchen",
      "outdoor space",
    ],
    support:
      "We help you ask whether the property can grow with you — not just whether it fits today.",
  },
  {
    title: "Growing Families",
    message: "Your home should be able to evolve with your family.",
    consider: [
      "future bedrooms",
      "finished basement potential",
      "play space",
      "home office",
      "larger gathering areas",
      "storage",
      "safer or more functional layouts",
    ],
    support:
      "Sometimes the right property is not the one with everything finished today, but the one with the right structure and potential for tomorrow.",
  },
  {
    title: "Investors",
    message: "A property should be evaluated for more than appearance.",
    consider: [
      "renovation potential",
      "layout efficiency",
      "future maintenance",
      "value-add opportunities",
      "rental functionality",
      "systems that may require investment",
      "how improvements may affect long-term positioning",
    ],
    support:
      "The goal is to understand not only what the property costs today, but what it may require and what opportunity it may hold.",
  },
];

export function PlanForTomorrowSection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <SiteText k="realEstate.tomorrow.title" as="h2" className="font-heading text-2xl sm:text-3xl lg:text-4xl text-tamay-primary font-semibold leading-tight">
              Buy for Today. Plan for Tomorrow.
            </SiteText>
            <SiteText k="realEstate.tomorrow.body" as="p" className="mt-4 text-gray-600 leading-relaxed" multiline>
              The right home should work for your life today — and still make sense as your needs change. We help you think beyond the immediate purchase and consider how the property may support your plans over the next five, ten, or even fifteen years.
            </SiteText>
          </div>
          <figure className="relative aspect-[4/3] overflow-hidden bg-gray-100">
            <SitePhoto
              slot="realEstate.approvedPlanTomorrow"
              alt="Today to tomorrow storytelling for first-time buyers, growing families, and investors"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </figure>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {SCENARIOS.map((scenario, index) => (
            <article key={scenario.title} className="bg-gray-50 p-6 border-t-4 border-tamay-accent">
              <p className="text-xs font-bold tracking-widest uppercase text-tamay-accent">
                <SiteText k={`realEstate.tomorrow.item${index + 1}.ribbon`}>Today → Tomorrow</SiteText>
              </p>
              <SiteText k={`realEstate.tomorrow.item${index + 1}.title`} as="h3" className="font-heading text-xl text-tamay-primary font-semibold mt-2">
                {scenario.title}
              </SiteText>
              <SiteText k={`realEstate.tomorrow.item${index + 1}.message`} as="p" className="mt-2 text-sm font-semibold text-gray-800">
                {scenario.message}
              </SiteText>
              {"today" in scenario && scenario.today ? (
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <SiteText k={`realEstate.tomorrow.item${index + 1}.todayLabel`} as="p" className="font-bold text-tamay-primary mb-2">
                      Today
                    </SiteText>
                    <ul className="space-y-1 text-gray-600">
                      {scenario.today.map((item, itemIndex) => (
                        <SiteText k={`realEstate.tomorrow.item${index + 1}.today${itemIndex + 1}`} as="li" key={`${index}-today-${itemIndex}`}>
                          {item}
                        </SiteText>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <SiteText k={`realEstate.tomorrow.item${index + 1}.tomorrowLabel`} as="p" className="font-bold text-tamay-primary mb-2">
                      Tomorrow
                    </SiteText>
                    <ul className="space-y-1 text-gray-600">
                      {scenario.tomorrow?.map((item, itemIndex) => (
                        <SiteText k={`realEstate.tomorrow.item${index + 1}.tomorrow${itemIndex + 1}`} as="li" key={`${index}-tomorrow-${itemIndex}`}>
                          {item}
                        </SiteText>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <ul className="mt-4 space-y-1 text-sm text-gray-600">
                  {scenario.consider?.map((item, itemIndex) => (
                    <SiteText k={`realEstate.tomorrow.item${index + 1}.consider${itemIndex + 1}`} as="li" key={`${index}-consider-${itemIndex}`}>
                      {item}
                    </SiteText>
                  ))}
                </ul>
              )}
              <SiteText k={`realEstate.tomorrow.item${index + 1}.support`} as="p" className="mt-4 text-sm text-gray-600 leading-relaxed" multiline>
                {scenario.support}
              </SiteText>
            </article>
          ))}
        </div>

        <div className="mt-10">
          <OpenLiveChatButton className={realEstateChatButtonClass}>
            <SiteText k="realEstate.tomorrow.chat">Tell Us What You’re Planning For</SiteText>
          </OpenLiveChatButton>
        </div>
      </div>
    </section>
  );
}
