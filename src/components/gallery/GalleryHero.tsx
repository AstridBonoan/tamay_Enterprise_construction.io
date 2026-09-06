import Image from "next/image";
import Link from "next/link";
import { appointmentScheduleHref } from "@/lib/onlineAppointments";

const HERO_IMAGES = [
  {
    key: "kitchen",
    src: "/gallery/gallery-hero-kitchen.png",
    alt: "Premium renovated kitchen with navy island, white cabinetry, and gold accents",
    label: "Kitchens",
    sublabel: "Where Life Happens",
    featured: true,
  },
  {
    key: "bathroom",
    src: "/gallery/gallery-hero-bathroom.png",
    alt: "Premium bathroom renovation with wood vanity, gold fixtures, glass shower, and freestanding tub",
    label: "Bathrooms",
    sublabel: "A Higher Standard",
    featured: false,
  },
  {
    key: "interior",
    src: "/gallery/gallery-hero-interior.png",
    alt: "Finished open-concept living and interior renovation with kitchen and dining beyond",
    label: "Interiors",
    sublabel: "Spaces That Inspire",
    featured: false,
  },
  {
    key: "exterior",
    src: "/gallery/gallery-hero-exterior.png",
    alt: "Exterior home improvement and modern addition at sunset with illuminated patio",
    label: "Exteriors",
    sublabel: "Lasting Impressions",
    featured: false,
  },
] as const;

/** Approved desktop image card — do not alter styling (desktop lock). */
function HeroImageCard({
  src,
  alt,
  label,
  sublabel,
  className = "",
}: {
  src: string;
  alt: string;
  label: string;
  sublabel: string;
  className?: string;
}) {
  return (
    <figure
      className={`relative overflow-hidden rounded-xl sm:rounded-2xl bg-[#0f1520] ring-1 ring-white/10 shadow-[0_12px_32px_rgba(0,0,0,0.35)] ${className}`}
    >
      <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
      <span
        className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black/65 via-black/20 to-transparent pointer-events-none"
        aria-hidden
      />
      <figcaption className="absolute inset-x-0 bottom-0 p-3 sm:p-3.5">
        <p className="font-heading text-[10px] sm:text-[11px] font-bold tracking-[0.16em] uppercase text-white drop-shadow-sm">
          {label}
        </p>
        <p className="mt-0.5 text-[11px] sm:text-xs text-white/88 tracking-wide drop-shadow-sm">{sublabel}</p>
      </figcaption>
    </figure>
  );
}

/** Mobile/tablet-only collage tile — category label only, no subtitles/cards feel. */
function MobileCollageTile({
  src,
  alt,
  label,
  className = "",
}: {
  src: string;
  alt: string;
  label: string;
  className?: string;
}) {
  return (
    <figure
      className={`relative overflow-hidden rounded-lg bg-[#0f1520] ring-1 ring-white/10 ${className}`}
    >
      <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
      <span
        className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black/60 via-black/15 to-transparent pointer-events-none"
        aria-hidden
      />
      <figcaption className="absolute inset-x-0 bottom-0 p-2.5 flex items-center gap-2">
        <span className="h-px w-3 shrink-0 bg-tamay-accent/80" aria-hidden />
        <p className="font-heading text-[9px] sm:text-[10px] font-bold tracking-[0.16em] uppercase text-white drop-shadow-sm">
          {label}
        </p>
      </figcaption>
    </figure>
  );
}

/**
 * Gallery page hero — darker premium showcase (Hero only).
 * Desktop (lg+) remains the approved composition; mobile/tablet use an editorial collage.
 */
export function GalleryHero() {
  const kitchen = HERO_IMAGES[0]!;
  const bathroom = HERO_IMAGES[1]!;
  const interior = HERO_IMAGES[2]!;
  const exterior = HERO_IMAGES[3]!;
  const supporting = HERO_IMAGES.slice(1);

  return (
    <section className="relative overflow-hidden isolate">
      {/* Sophisticated dark architectural field — not cream, not flat black */}
      <div
        className="absolute inset-0 -z-20"
        aria-hidden
        style={{
          background:
            "radial-gradient(120% 90% at 78% 18%, rgba(53,85,143,0.28) 0%, transparent 52%), linear-gradient(145deg, #101722 0%, #141c2b 42%, #1a2436 72%, #121820 100%)",
        }}
      />
      <div
        className="absolute inset-0 -z-10 opacity-[0.07] pointer-events-none"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.45) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at 30% 40%, black 0%, transparent 70%)",
        }}
      />

      {/*
        Spacing: compact under lg; lg:/xl: values match the approved desktop Hero exactly.
      */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-10 lg:pt-16 pb-9 sm:pb-11 lg:pb-18">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] gap-5 sm:gap-6 lg:gap-10 xl:gap-12 lg:items-center">
          {/* Left — concise conversion copy */}
          <div className="min-w-0 max-w-lg lg:max-w-none">
            <p className="font-heading text-[10px] sm:text-[11px] lg:text-xs font-bold tracking-[0.2em] uppercase text-tamay-accent">
              Project Gallery
            </p>
            <div className="mt-2 lg:mt-2.5 h-px w-10 bg-tamay-accent/75" aria-hidden />

            <h1 className="mt-3 lg:mt-4 font-heading text-[1.65rem] leading-[1.15] sm:text-[1.85rem] lg:text-[2.4rem] lg:leading-[1.12] font-semibold text-balance">
              <span className="text-white">See the Work.</span>
              <br />
              <span className="text-tamay-accent">Feel the Standard.</span>
            </h1>

            <p className="mt-3 lg:mt-4 text-[13px] leading-snug sm:text-sm lg:text-[15px] lg:leading-relaxed text-white/75 max-w-md">
              Explore kitchens, bathrooms, additions, and transformations completed with the care, coordination, and
              craftsmanship that define Tamay Enterprises.
            </p>

            <div className="mt-5 lg:mt-8 flex flex-col sm:flex-row gap-2 sm:gap-2.5 lg:gap-3">
              <a
                href="#featured-projects"
                className="inline-flex items-center justify-center gap-2 min-h-10 lg:min-h-11 font-bold text-sm tracking-wide px-5 lg:px-6 py-2.5 lg:py-3 transition-colors text-center bg-tamay-accent hover:bg-tamay-accent-hover text-[#141c2b] w-full sm:w-auto"
              >
                Explore Projects
                <span aria-hidden>→</span>
              </a>
              <Link
                href={appointmentScheduleHref("construction")}
                className="inline-flex items-center justify-center gap-2 min-h-10 lg:min-h-11 font-bold text-sm tracking-wide px-5 lg:px-6 py-2.5 lg:py-3 transition-colors text-center border-2 border-white/80 text-white hover:bg-white/10 w-full sm:w-auto"
              >
                Book a Consultation
                <span aria-hidden>→</span>
              </Link>
            </div>

            {/* Desktop brand line only — keeps collage higher on mobile/tablet */}
            <p className="mt-8 hidden lg:block font-heading text-[10px] font-bold tracking-[0.18em] uppercase text-tamay-accent/85">
              More Than Building Spaces — Building Better Lives
            </p>
          </div>

          {/* Right — curated image showcase */}
          <div className="min-w-0">
            {/* DESKTOP LOCKED — approved kitchen + 3 supporting (unchanged) */}
            <div className="hidden lg:grid gap-3.5">
              <HeroImageCard
                src={kitchen.src}
                alt={kitchen.alt}
                label={kitchen.label}
                sublabel={kitchen.sublabel}
                className="aspect-[16/9] xl:aspect-[2/1]"
              />
              <div className="grid grid-cols-3 gap-3.5">
                {supporting.map((img) => (
                  <HeroImageCard
                    key={img.key}
                    src={img.src}
                    alt={img.alt}
                    label={img.label}
                    sublabel={img.sublabel}
                    className="aspect-[4/3]"
                  />
                ))}
              </div>
            </div>

            {/* MOBILE + TABLET — one integrated editorial collage */}
            <div className="lg:hidden grid gap-1.5 sm:gap-2" aria-label="Project gallery showcase">
              <MobileCollageTile
                src={kitchen.src}
                alt={kitchen.alt}
                label={kitchen.label}
                className="aspect-[2/1] sm:aspect-[16/7]"
              />
              <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                <MobileCollageTile
                  src={bathroom.src}
                  alt={bathroom.alt}
                  label={bathroom.label}
                  className="aspect-[5/4] sm:aspect-[4/3]"
                />
                <MobileCollageTile
                  src={interior.src}
                  alt={interior.alt}
                  label={interior.label}
                  className="aspect-[5/4] sm:aspect-[4/3]"
                />
              </div>
              <MobileCollageTile
                src={exterior.src}
                alt={exterior.alt}
                label={exterior.label}
                className="aspect-[2/1] sm:aspect-[16/7]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
