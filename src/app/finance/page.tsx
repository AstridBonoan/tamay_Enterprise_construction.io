import type { Metadata } from "next";
import { HeroBanner } from "@/components/ui/HeroBanner";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { FinancingPromoCard } from "@/components/finance/FinancingPromoCard";
import { IMAGES } from "@/lib/images";
import { FINANCE, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Financing Options | Tamay Enterprises West Haven CT",
  description:
    "Flexible financing for construction and home renovation projects in West Haven, CT. Build now and pay over time with Tamay Enterprises.",
};

export default function FinancePage() {
  return (
    <>
      <HeroBanner
        image={IMAGES.financeHero}
        title={FINANCE.title}
        subtitle="Build now. Pay over time."
        height="medium"
      />

      <section className="py-14 max-w-4xl mx-auto px-4 text-center">
        <SectionHeading title={FINANCE.headline} subtitle={FINANCE.intro} />
        <ul className="mt-8 text-left text-gray-600 space-y-3 max-w-2xl mx-auto leading-relaxed">
          {FINANCE.highlights.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="text-tamay-accent font-bold shrink-0" aria-hidden>
                •
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-gray-50 px-4 py-12 sm:py-14">
        <div className="max-w-5xl mx-auto">
          <FinancingPromoCard />
        </div>
      </section>

      <section className="py-14 max-w-3xl mx-auto px-4 text-center">
        <SectionHeading
          title="Ready to Check Your Options?"
          subtitle="Apply through our secure financing partner to see what plans may be available for your project."
        />
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2">
          <Button href={SITE.financingUrl} variant="primary" external>
            Check Financing Options
          </Button>
          <Button href="/#contact" variant="outline">
            Contact Us
          </Button>
        </div>
      </section>
    </>
  );
}
