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
  /** Tighter layout so block fits in one viewport with section title */
  compact?: boolean;
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
  compact = false,
}: DivisionCardProps) {
  return (
    <section
      className={`border-b border-gray-100 ${
        compact ? "py-4 sm:py-5 md:py-6" : "py-14 md:py-20"
      }`}
    >
      <div
        className={`max-w-6xl mx-auto px-4 grid md:grid-cols-2 items-center ${
          compact ? "gap-5 md:gap-8" : "gap-10"
        } ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}
      >
        <div
          className={`relative overflow-hidden shadow-md ${
            compact
              ? "aspect-[16/10] md:aspect-auto md:max-h-[min(42vh,300px)] md:min-h-[220px]"
              : "aspect-[4/3]"
          }`}
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 50vw"
            unoptimized
          />
        </div>
        <div className={compact ? "py-1" : undefined}>
          <p
            className={`font-semibold tracking-widest uppercase text-tamay-primary mb-1 ${
              compact ? "text-[10px] sm:text-xs" : "text-sm"
            }`}
          >
            {eyebrow}
          </p>
          <h2
            className={`font-heading text-tamay-primary font-semibold mb-1.5 ${
              compact ? "text-lg sm:text-xl md:text-2xl leading-snug" : "text-2xl md:text-3xl mb-2"
            }`}
          >
            {title}
          </h2>
          <hr className={`section-divider !mx-0 ${compact ? "mb-2 max-w-[80px]" : "mb-4"}`} />
          <p
            className={`font-bold text-gray-800 uppercase tracking-wide ${
              compact ? "text-[11px] sm:text-xs mb-2" : "text-sm mb-4"
            }`}
          >
            {tagline}
          </p>
          <p
            className={`text-gray-600 leading-relaxed ${
              compact ? "text-xs sm:text-sm mb-3 line-clamp-3 md:line-clamp-4" : "mb-6"
            }`}
          >
            {description}
          </p>
          <ul className={`text-gray-700 ${compact ? "space-y-0.5 mb-3" : "space-y-1 mb-6"}`}>
            {bullets.map((b) => (
              <li key={b} className={compact ? "text-[11px] sm:text-xs" : "text-sm"}>
                {b}
              </li>
            ))}
          </ul>
          <div className={`flex flex-wrap ${compact ? "gap-2" : "gap-3"}`}>
            <Button
              href={discoverHref}
              variant="outline"
              className={compact ? "!px-4 !py-2 !text-xs" : ""}
            >
              Discover More
            </Button>
            <Button
              href={ctaHref}
              variant="primary"
              className={compact ? "!px-4 !py-2 !text-xs" : ""}
            >
              {ctaLabel}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
