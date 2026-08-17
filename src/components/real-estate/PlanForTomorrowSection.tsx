"use client";

import { OpenLiveChatButton } from "@/components/layout/OpenLiveChatButton";
import { realEstateChatButtonClass } from "@/components/real-estate/realEstateCtaStyles";
import { SitePhoto } from "@/components/images/SitePhoto";

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
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-tamay-primary font-semibold leading-tight">
              Buy for Today. Plan for Tomorrow.
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              The right home should work for your life today — and still make sense as your needs change. We help you
              think beyond the immediate purchase and consider how the property may support your plans over the next
              five, ten, or even fifteen years.
            </p>
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
          {SCENARIOS.map((scenario) => (
            <article key={scenario.title} className="bg-gray-50 p-6 border-t-4 border-tamay-accent">
              <p className="text-xs font-bold tracking-widest uppercase text-tamay-accent">Today → Tomorrow</p>
              <h3 className="font-heading text-xl text-tamay-primary font-semibold mt-2">{scenario.title}</h3>
              <p className="mt-2 text-sm font-semibold text-gray-800">{scenario.message}</p>
              {"today" in scenario && scenario.today ? (
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-bold text-tamay-primary mb-2">Today</p>
                    <ul className="space-y-1 text-gray-600">
                      {scenario.today.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-bold text-tamay-primary mb-2">Tomorrow</p>
                    <ul className="space-y-1 text-gray-600">
                      {scenario.tomorrow?.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <ul className="mt-4 space-y-1 text-sm text-gray-600">
                  {scenario.consider?.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              <p className="mt-4 text-sm text-gray-600 leading-relaxed">{scenario.support}</p>
            </article>
          ))}
        </div>

        <div className="mt-10">
          <OpenLiveChatButton className={realEstateChatButtonClass}>
            Tell Us What You’re Planning For
          </OpenLiveChatButton>
        </div>
      </div>
    </section>
  );
}
