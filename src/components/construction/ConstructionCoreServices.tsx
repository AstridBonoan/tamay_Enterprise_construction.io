import Link from "next/link";
import { ConstructionApprovedImage } from "@/components/construction/ConstructionApprovedImage";
import { constructionOutlineLinkClass } from "@/components/construction/constructionCtaStyles";
import { sitePath } from "@/lib/paths";

/**
 * Remaining core-service blocks after Kitchen / Bathroom / Home Additions
 * were extracted into dedicated section components.
 * Currently hosts More Ways We Improve Homes.
 */
export function ConstructionCoreServices() {
  return (
    <section id="construction-services" className="py-16 md:py-20 bg-gray-50 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl">
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-tamay-primary font-semibold leading-tight">
            Construction Services Built Around Your Property
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            From complete renovations to new additions and high-impact kitchen and bathroom projects, Tamay
            coordinates the work from planning through completion.
          </p>
        </div>

        <div className="mt-10 space-y-12 md:space-y-14">
          <article>
            <h3 className="sr-only">More Ways We Improve Homes</h3>
            <ConstructionApprovedImage
              slot="construction.approvedMoreWays"
              alt="More ways Tamay improves homes — flooring, painting, drywall, doors, windows, and general upgrades"
              width={1672}
              height={941}
            />
            <div className="mt-6">
              <Link href={sitePath("/gallery")} className={constructionOutlineLinkClass}>
                Explore More Projects
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
