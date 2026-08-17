"use client";

import { SitePhoto } from "@/components/images/SitePhoto";
import { SiteText } from "@/components/copy/SiteText";

const AREAS = [
  {
    title: "Can This Home Grow With You?",
    text: "Think beyond today — future bedrooms, a home office, a finished basement, an addition, or changing family needs.",
  },
  {
    title: "What Will It Need Over Time?",
    text: "Roofing, HVAC, plumbing, electrical, windows, siding, and other major systems all have a lifecycle. We help you think about what ownership may look like beyond closing day.",
  },
  {
    title: "Can Your Renovation Ideas Work Here?",
    text: "Open kitchen? Larger bathroom? Additional bedroom? Finished basement? We help you think realistically about whether the property can support the changes you may want later.",
  },
  {
    title: "What Happens After Closing?",
    text: "Our relationship does not have to end when you get the keys. Tamay can help with construction improvements, repairs, and preventive home services as your property evolves.",
  },
];

export function TamayDifferenceSection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <figure className="relative aspect-[4/3] overflow-hidden bg-gray-100">
            <SitePhoto
              slot="realEstate.approvedDifference"
              alt="A family evaluating a property with visual layers for growth, systems, renovation possibilities, and long-term ownership planning"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </figure>
          <div>
            <SiteText k="realEstate.difference.title" as="h2" className="font-heading text-2xl sm:text-3xl lg:text-4xl text-tamay-primary font-semibold leading-tight">
              We Help You Look Beyond the Listing
            </SiteText>
            <SiteText k="realEstate.difference.body" as="p" className="mt-4 text-gray-600 leading-relaxed" multiline>
              A home is more than its price, finishes, and number of bedrooms. We help you think about how the property fits your life today, what it may require over time, and what opportunities it may offer in the future.
            </SiteText>
            <div className="mt-8 space-y-6">
              {AREAS.map((area, index) => (
                <div key={area.title} className="border-l-4 border-tamay-accent pl-4">
                  <SiteText k={`realEstate.difference.item${index + 1}.title`} as="h3" className="font-heading text-lg text-tamay-primary font-semibold">
                    {area.title}
                  </SiteText>
                  <SiteText k={`realEstate.difference.item${index + 1}.text`} as="p" className="mt-1 text-sm sm:text-base text-gray-600 leading-relaxed" multiline>
                    {area.text}
                  </SiteText>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
