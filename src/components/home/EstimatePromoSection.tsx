import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IMAGES } from "@/lib/images";
import { ESTIMATE, SITE } from "@/lib/site";

export function EstimatePromoSection() {
  return (
    <section id="project-estimate" className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-center bg-white shadow-md overflow-hidden rounded-sm">
          <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[280px] bg-gray-200">
            <Image
              src={IMAGES.estimateModalPhoto}
              alt="Tamay Enterprises home project services"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized
            />
          </div>

          <div className="px-6 py-8 md:px-8 md:py-10 text-center md:text-left">
            <SectionHeading
              align="left"
              eyebrow="PROJECT ESTIMATOR"
              title={ESTIMATE.title}
              subtitle={ESTIMATE.description}
            />
            <div className="mt-2">
            <Button href={SITE.estimateUrl} variant="primary" external className="w-full md:w-auto">
              {ESTIMATE.ctaLabel}
            </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
