import Image from "next/image";
import { IMAGES } from "@/lib/images";
import { SITE } from "@/lib/site";

export function FinancingBanner() {
  return (
    <section className="bg-tamay-primary py-10 sm:py-12 md:py-14">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-10 lg:gap-14">
        <div className="shrink-0 flex justify-center md:justify-end md:flex-1 md:max-w-[320px]">
          <Image
            src={IMAGES.financingBadge}
            alt="Financing available"
            width={300}
            height={130}
            className="w-[min(300px,85vw)] h-auto mix-blend-screen"
            unoptimized
          />
        </div>

        <div className="flex flex-col items-center text-center md:flex-[1.4] md:max-w-md">
          <p className="text-white text-base sm:text-lg font-semibold leading-relaxed mb-5 sm:mb-6">
            Build now. Pay over time. Financing available across all projects
          </p>
          <a
            href={SITE.financingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-white text-gray-900 hover:bg-gray-100 font-bold text-xs sm:text-sm tracking-[0.2em] uppercase px-8 sm:px-10 py-3 sm:py-3.5 transition-colors shadow-sm"
          >
            Check Financing Options
          </a>
        </div>
      </div>
    </section>
  );
}
