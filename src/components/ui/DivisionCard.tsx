import Image from "next/image";
import { Button } from "./Button";

type DivisionCardProps = {
  image: string;
  eyebrow: string;
  title: string;
  tagline: string;
  description: string;
  bullets: readonly string[];
  discoverHref: string;
  ctaLabel: string;
  ctaHref: string;
  reverse?: boolean;
  compact?: boolean;
  /** Fits as a row inside the full-viewport Our Services section */
  viewport?: boolean;
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
  viewport = false,
}: DivisionCardProps) {
  const Wrapper = viewport ? "div" : "section";

  return (
    <Wrapper
      className={
        viewport
          ? "flex-1 min-h-0 flex items-center py-2 sm:py-3 px-3 sm:px-4"
          : `border-b border-gray-100 ${compact ? "py-4 sm:py-5 md:py-6" : "py-14 md:py-20"}`
      }
    >
      <div
        className={`w-full max-w-6xl mx-auto grid items-center ${
          viewport
            ? "grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5 h-full min-h-0"
            : `px-4 md:grid-cols-2 ${compact ? "gap-5 md:gap-8" : "gap-10"}`
        } ${reverse ? "sm:[&>*:first-child]:order-2" : ""}`}
      >
        <div
          className={`relative overflow-hidden shadow-md shrink-0 ${
            viewport
              ? "aspect-[16/9] sm:aspect-auto sm:h-full sm:max-h-none sm:min-h-[120px] max-h-[28vh] sm:max-h-full w-full"
              : compact
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

        <div className={`min-w-0 ${viewport ? "flex flex-col justify-center py-0.5" : compact ? "py-1" : ""}`}>
          <p
            className={`font-semibold tracking-widest uppercase text-tamay-primary mb-0.5 ${
              viewport ? "text-[9px] sm:text-[10px]" : compact ? "text-[10px] sm:text-xs" : "text-sm"
            }`}
          >
            {eyebrow}
          </p>
          <h3
            className={`font-heading text-tamay-primary font-semibold leading-tight ${
              viewport
                ? "text-sm sm:text-base md:text-lg mb-1"
                : compact
                  ? "text-lg sm:text-xl md:text-2xl mb-1.5"
                  : "text-2xl md:text-3xl mb-2"
            }`}
          >
            {title}
          </h3>
          {!viewport && (
            <hr className={`section-divider !mx-0 ${compact ? "mb-2 max-w-[80px]" : "mb-4"}`} />
          )}
          <p
            className={`font-bold text-gray-800 uppercase tracking-wide ${
              viewport ? "text-[10px] sm:text-xs mb-1" : compact ? "text-[11px] sm:text-xs mb-2" : "text-sm mb-4"
            }`}
          >
            {tagline}
          </p>
          <p
            className={`text-gray-600 leading-snug ${
              viewport
                ? "text-[10px] sm:text-xs mb-1.5 line-clamp-2"
                : compact
                  ? "text-xs sm:text-sm mb-3 line-clamp-3 md:line-clamp-4"
                  : "leading-relaxed mb-6"
            }`}
          >
            {description}
          </p>
          <ul
            className={`text-gray-700 ${
              viewport ? "hidden sm:block space-y-0 mb-1.5" : compact ? "space-y-0.5 mb-3" : "space-y-1 mb-6"
            }`}
          >
            {bullets.slice(0, viewport ? 2 : undefined).map((b) => (
              <li
                key={b}
                className={
                  viewport ? "text-[10px] line-clamp-1" : compact ? "text-[11px] sm:text-xs" : "text-sm"
                }
              >
                {b}
              </li>
            ))}
          </ul>
          <div className={`flex flex-wrap ${viewport ? "gap-1.5" : compact ? "gap-2" : "gap-3"}`}>
            <Button
              href={discoverHref}
              variant="outline"
              className={viewport || compact ? "!px-3 !py-1.5 !text-[10px] sm:!text-xs" : ""}
            >
              Discover More
            </Button>
            <Button
              href={ctaHref}
              variant="primary"
              className={viewport || compact ? "!px-3 !py-1.5 !text-[10px] sm:!text-xs" : ""}
            >
              {ctaLabel}
            </Button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
