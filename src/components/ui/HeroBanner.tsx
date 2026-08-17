import Image from "next/image";
import Link from "next/link";
import { SitePhoto } from "@/components/images/SitePhoto";
import { SiteText } from "@/components/copy/SiteText";

type HeroBannerProps = {
  image: string;
  slotKey?: string;
  title: string;
  subtitle?: string;
  tagline?: string;
  cta?: { label: string; href: string };
  overlay?: boolean;
  /** e.g. bg-black/60 — darker overlay when the image includes baked-in text */
  overlayClassName?: string;
  height?: "tall" | "medium";
  /** Above 1 zooms out; below 1 zooms in. Only applies when imageFit is cover. */
  imageZoom?: number;
  /** object-position for the background image */
  imagePosition?: string;
  /** contain = full photo (letterbox); fill = stretch to banner; cover = fill frame (may crop) */
  imageFit?: "cover" | "contain" | "fill";
  /** Use when titles and copy are part of the image file */
  imageOnly?: boolean;
  copyKey?: string;
  /** Full-width banner height from image proportions (e.g. 1920 / 633). Overrides height min-heights. */
  aspectRatio?: number;
};

export function HeroBanner({
  image,
  slotKey,
  title,
  subtitle,
  tagline,
  cta,
  overlay = true,
  overlayClassName = "bg-black/40",
  height = "tall",
  imageZoom = 1,
  imagePosition = "center center",
  imageFit = "cover",
  imageOnly = false,
  aspectRatio,
  copyKey,
}: HeroBannerProps) {
  const heightClass = aspectRatio
    ? ""
    : imageOnly
      ? "min-h-[200px] md:min-h-[280px] lg:min-h-[320px]"
      : height === "tall"
        ? "min-h-[420px] md:min-h-[520px]"
        : "min-h-[280px] md:min-h-[360px]";
  const effectiveFit = imageOnly ? "contain" : imageFit;
  const effectiveOverlay = imageOnly ? false : overlay;
  const zoomOutFactor = effectiveFit === "cover" && imageZoom > 1 ? imageZoom : 1;
  const zoomInScale = effectiveFit === "cover" && imageZoom > 0 && imageZoom < 1 ? 1 / imageZoom : 1;
  const fitClass =
    effectiveFit === "contain"
      ? "object-contain"
      : effectiveFit === "fill"
        ? "object-fill"
        : "object-cover";

  return (
    <section
      className={`relative w-full ${heightClass} flex items-center justify-center overflow-hidden ${effectiveFit === "contain" ? "bg-[#0a0a0a]" : ""}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      <div
        className="absolute"
        style={
          effectiveFit === "contain"
            ? { inset: 0 }
            : zoomOutFactor > 1
              ? {
                  width: `${zoomOutFactor * 100}%`,
                  height: `${zoomOutFactor * 100}%`,
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }
              : zoomInScale > 1
                ? {
                    inset: 0,
                    transform: `scale(${zoomInScale})`,
                    transformOrigin: imagePosition,
                  }
                : { inset: 0 }
        }
      >
        {slotKey ? (
          <SitePhoto
            slot={slotKey}
            alt=""
            className={fitClass}
            style={{ objectPosition: imagePosition }}
            sizes="100vw"
            priority
          />
        ) : (
          <Image
            src={image}
            alt=""
            fill
            className={fitClass}
            style={{ objectPosition: imagePosition }}
            priority
            sizes="100vw"
            unoptimized
          />
        )}
        {effectiveOverlay && <div className={`pointer-events-none absolute inset-0 z-[1] ${overlayClassName}`} />}
      </div>
      {imageOnly ? (
        <h1 className="sr-only">{title}</h1>
      ) : (
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white py-16">
        {tagline ? (
          copyKey ? (
            <SiteText k={`${copyKey}.tagline`} as="p" className="text-sm md:text-base font-semibold tracking-widest uppercase mb-3 text-tamay-accent">
              {tagline}
            </SiteText>
          ) : (
            <p className="text-sm md:text-base font-semibold tracking-widest uppercase mb-3 text-tamay-accent">
              {tagline}
            </p>
          )
        ) : null}
        {copyKey ? (
          <SiteText k={`${copyKey}.title`} as="h1" className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
            {title}
          </SiteText>
        ) : (
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
            {title}
          </h1>
        )}
        {subtitle ? (
          copyKey ? (
            <SiteText k={`${copyKey}.subtitle`} as="p" className="text-base md:text-lg text-gray-100 max-w-2xl mx-auto mb-8 leading-relaxed" multiline>
              {subtitle}
            </SiteText>
          ) : (
            <p className="text-base md:text-lg text-gray-100 max-w-2xl mx-auto mb-8 leading-relaxed">
              {subtitle}
            </p>
          )
        ) : null}
        {cta && (
          <Link
            href={cta.href}
            className="inline-block bg-tamay-accent hover:bg-tamay-accent-hover text-white font-bold px-8 py-3 text-sm tracking-wide transition-colors"
          >
            {copyKey ? <SiteText k={`${copyKey}.cta`}>{cta.label}</SiteText> : cta.label}
          </Link>
        )}
      </div>
      )}
    </section>
  );
}
