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

/**
 * Gallery page hero — darker premium showcase (Hero only).
 * Global header logo remains the official brand mark on the white sticky header above.
 */
export function GalleryHero() {
  const kitchen = HERO_IMAGES[0]!;
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

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-12 sm:pt-14 lg:pt-16 pb-12 sm:pb-14 lg:pb-18">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] gap-9 lg:gap-10 xl:gap-12 lg:items-center">
          {/* Left — concise conversion copy */}
          <div className="min-w-0 max-w-lg lg:max-w-none">
            <p className="font-heading text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-tamay-accent">
              Project Gallery
            </p>
            <div className="mt-2.5 h-px w-10 bg-tamay-accent/75" aria-hidden />

            <h1 className="mt-4 font-heading text-[1.9rem] sm:text-3xl lg:text-[2.4rem] font-semibold leading-[1.12] text-balance">
              <span className="text-white">See the Work.</span>
              <br />
              <span className="text-tamay-accent">Feel the Standard.</span>
            </h1>

            <p className="mt-4 text-sm sm:text-[15px] text-white/75 leading-relaxed max-w-md">
              Explore kitchens, bathrooms, additions, and transformations completed with the care, coordination, and
              craftsmanship that define Tamay Enterprises.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-2.5 sm:gap-3">
              <a
                href="#featured-projects"
                className="inline-flex items-center justify-center gap-2 min-h-11 font-bold text-sm tracking-wide px-6 py-3 transition-colors text-center bg-tamay-accent hover:bg-tamay-accent-hover text-[#141c2b] w-full sm:w-auto"
              >
                Explore Projects
                <span aria-hidden>→</span>
              </a>
              <Link
                href={appointmentScheduleHref("construction")}
                className="inline-flex items-center justify-center gap-2 min-h-11 font-bold text-sm tracking-wide px-6 py-3 transition-colors text-center border-2 border-white/80 text-white hover:bg-white/10 w-full sm:w-auto"
              >
                Book a Consultation
                <span aria-hidden>→</span>
              </Link>
            </div>

            <p className="mt-8 hidden sm:block font-heading text-[10px] font-bold tracking-[0.18em] uppercase text-tamay-accent/85">
              More Than Building Spaces — Building Better Lives
            </p>
          </div>

          {/* Right — curated image showcase */}
          <div className="min-w-0">
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

            <div className="hidden sm:grid lg:hidden gap-3.5">
              <HeroImageCard
                src={kitchen.src}
                alt={kitchen.alt}
                label={kitchen.label}
                sublabel={kitchen.sublabel}
                className="aspect-[16/10]"
              />
              <div className="grid grid-cols-2 gap-3.5">
                {supporting.slice(0, 2).map((img) => (
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
              <HeroImageCard
                src={supporting[2]!.src}
                alt={supporting[2]!.alt}
                label={supporting[2]!.label}
                sublabel={supporting[2]!.sublabel}
                className="aspect-[16/9]"
              />
            </div>

            <div className="sm:hidden space-y-3.5">
              {HERO_IMAGES.map((img) => (
                <HeroImageCard
                  key={img.key}
                  src={img.src}
                  alt={img.alt}
                  label={img.label}
                  sublabel={img.sublabel}
                  className={img.featured ? "aspect-[16/10]" : "aspect-[16/11]"}
                />
              ))}
            </div>
          </div>
        </div>

        <p className="mt-9 sm:hidden font-heading text-[10px] font-bold tracking-[0.16em] uppercase text-tamay-accent/85 text-center">
          More Than Building Spaces — Building Better Lives
        </p>
      </div>
    </section>
  );
}
