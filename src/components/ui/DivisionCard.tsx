import Image from "next/image";
import { Button } from "./Button";

type DivisionCardProps = {
  image: string;
  eyebrow: string;
  title: string;
  tagline: string;
  description: string;
  bullets: string[];
  discoverHref: string;
  ctaLabel: string;
  ctaHref: string;
  reverse?: boolean;
  /** Each service block fills one viewport height */
  fullScreen?: boolean;
  /** Extra top spacing when directly under the Our Services title */
  alignTop?: boolean;
};

export function DivisionCard({
  image,
  eyebrow,
  title,
  tagline,
  description,
  bullets,
  discoverHref,
  ctaLabel,
  ctaHref,
  reverse,
  fullScreen = false,
  alignTop = false,
}: DivisionCardProps) {
  const fullScreenLayout = fullScreen
    ? `min-h-svh flex flex-col justify-start ${
        alignTop ? "pt-6 sm:pt-8 lg:pt-10" : "pt-8 sm:pt-10 lg:pt-12"
      } pb-10 sm:pb-12 lg:pb-14`
    : "py-14 md:py-20";

  return (
    <section className={`border-b border-gray-100 bg-gray-50 ${fullScreenLayout}`}>
      <div
        className={`max-w-6xl mx-auto px-4 sm:px-6 w-full flex-1 flex flex-col justify-center ${
          fullScreen ? "min-h-0" : ""
        }`}
      >
        <div
          className={`grid md:grid-cols-2 w-full ${
            fullScreen ? "items-start gap-8 lg:gap-12" : "items-center gap-10"
          } ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}
        >
          <div
            className={`relative overflow-hidden shadow-lg w-full ${
              fullScreen
                ? "min-h-[34svh] sm:min-h-[38svh] md:min-h-[58svh] md:max-h-[68svh] md:h-[62svh]"
                : "aspect-[4/3]"
            }`}
          >
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover object-center"
              sizes="(max-width:768px) 100vw, 50vw"
              unoptimized
            />
          </div>
          <div className={fullScreen ? "md:pt-0" : undefined}>
            <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-tamay-primary mb-2">
              {eyebrow}
            </p>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-tamay-primary font-semibold mb-3 leading-tight">
              {title}
            </h2>
            <hr className="section-divider mb-4 !mx-0" />
            <p className="text-sm sm:text-base font-bold text-gray-800 uppercase tracking-wide mb-4">
              {tagline}
            </p>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6 max-w-xl">
              {description}
            </p>
            <ul className="space-y-1.5 text-gray-700 mb-8">
              {bullets.map((b) => (
                <li key={b} className="text-sm sm:text-base">
                  {b}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <Button href={discoverHref} variant="outline">
                Discover More
              </Button>
              <Button href={ctaHref} variant="primary">
                {ctaLabel}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
