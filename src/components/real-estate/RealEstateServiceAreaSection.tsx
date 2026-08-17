import { SiteText } from "@/components/copy/SiteText";

export function RealEstateServiceAreaSection() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <SiteText k="realEstate.area.eyebrow" as="p" className="text-xs font-semibold tracking-widest uppercase text-tamay-accent mb-3">
          Serving West Haven & Nearby Connecticut Communities
        </SiteText>
        <SiteText k="realEstate.area.title" as="h2" className="font-heading text-xl sm:text-2xl text-tamay-primary font-semibold">
          Local Real Estate Services You Can Trust
        </SiteText>
        <SiteText k="realEstate.area.body" as="p" className="mt-3 text-sm text-gray-600 leading-relaxed" multiline>
          Based in West Haven, CT, Tamay Enterprises proudly serves clients throughout Orange, Milford, New Haven, Woodbridge, Bethany, Fairfield, Trumbull, and surrounding Connecticut communities. Our local presence and regional experience allow us to guide clients through market conditions with practical, real-world insight.
        </SiteText>
      </div>
    </section>
  );
}
