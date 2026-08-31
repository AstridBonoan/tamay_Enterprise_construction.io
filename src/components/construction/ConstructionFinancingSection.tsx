import { constructionOnDarkLinkClass } from "@/components/construction/constructionCtaStyles";
import { SITE } from "@/lib/site";

export function ConstructionFinancingSection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-tamay-primary text-white px-6 py-10 sm:px-10 sm:py-12 md:px-14">
          <div className="max-w-2xl">
            <p className="text-tamay-accent text-xs font-bold tracking-[0.18em] uppercase mb-3">Financing</p>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight">
              Planning a Larger Project?
            </h2>
            <p className="mt-4 text-white/85 leading-relaxed">
              Flexible financing options may help make qualified home improvement projects more manageable. Explore
              available options and see what may fit your project and budget.
            </p>
            <div className="mt-8">
              <a
                href={SITE.financingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={constructionOnDarkLinkClass}
              >
                Explore Financing Options
              </a>
            </div>
            <p className="mt-4 text-xs text-white/60 leading-relaxed">
              Financing is offered through an independent financing partner. Tamay Enterprises is not the lender.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
