import Image from "next/image";
import Link from "next/link";

type HeroBannerProps = {
  image: string;
  title: string;
  subtitle?: string;
  tagline?: string;
  cta?: { label: string; href: string };
  overlay?: boolean;
  height?: "tall" | "medium";
  /** Values above 1 zoom out (e.g. 1.2 shows ~20% more of the photo). */
  imageZoom?: number;
  /** object-position for the background image */
  imagePosition?: string;
};

export function HeroBanner({
  image,
  title,
  subtitle,
  tagline,
  cta,
  overlay = true,
  height = "tall",
  imageZoom = 1,
  imagePosition = "center center",
}: HeroBannerProps) {
  const heightClass = height === "tall" ? "min-h-[420px] md:min-h-[520px]" : "min-h-[280px] md:min-h-[360px]";
  const zoomOut = imageZoom > 1 ? (imageZoom - 1) * 50 : 0;

  return (
    <section className={`relative ${heightClass} flex items-center justify-center overflow-hidden`}>
      <div
        className="absolute"
        style={
          zoomOut > 0
            ? {
                top: `-${zoomOut}%`,
                left: `-${zoomOut}%`,
                right: `-${zoomOut}%`,
                bottom: `-${zoomOut}%`,
              }
            : { inset: 0 }
        }
      >
        <Image
          src={image}
          alt=""
          fill
          className="object-cover"
          style={{ objectPosition: imagePosition }}
          priority
          sizes="100vw"
          unoptimized
        />
      </div>
      {overlay && <div className="absolute inset-0 bg-black/40" />}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white py-16">
        {tagline && (
          <p className="text-sm md:text-base font-semibold tracking-widest uppercase mb-3 text-tamay-accent">
            {tagline}
          </p>
        )}
        <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-base md:text-lg text-gray-100 max-w-2xl mx-auto mb-8 leading-relaxed">
            {subtitle}
          </p>
        )}
        {cta && (
          <Link
            href={cta.href}
            className="inline-block bg-tamay-accent hover:bg-tamay-accent-hover text-white font-bold px-8 py-3 text-sm tracking-wide transition-colors"
          >
            {cta.label}
          </Link>
        )}
      </div>
    </section>
  );
}
