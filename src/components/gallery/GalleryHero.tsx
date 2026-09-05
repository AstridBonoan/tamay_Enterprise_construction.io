import Image from "next/image";
import Link from "next/link";
import {
  constructionOutlineLinkClass,
  constructionPrimaryLinkClass,
} from "@/components/construction/constructionCtaStyles";
import { appointmentScheduleHref } from "@/lib/onlineAppointments";

const NAVY = "#141c2b";

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

const VALUES = [
  {
    title: (
      <>
        Beautiful Spaces
        <br />
        Real Results
      </>
    ),
    icon: "home" as const,
  },
  {
    title: (
      <>
        Quality
        <br />
        In Every Detail
      </>
    ),
    icon: "quality" as const,
  },
  {
    title: (
      <>
        A Trusted Partner
        <br />
        From Vision to Reality
      </>
    ),
    icon: "partner" as const,
  },
] as const;

function ValueIcon({ type }: { type: (typeof VALUES)[number]["icon"] }) {
  const className = "h-4 w-4";
  if (type === "home") {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-9.5z"
        />
      </svg>
    );
  }
  if (type === "quality") {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 3l2.1 4.3 4.7.7-3.4 3.3.8 4.7L12 13.8 7.8 16l.8-4.7L5.2 8l4.7-.7L12 3z"
        />
      </svg>
    );
  }
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

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
    <figure className={`relative overflow-hidden rounded-xl sm:rounded-2xl bg-gray-100 ring-1 ring-black/[0.04] ${className}`}>
      <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
      <span
        className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 via-black/15 to-transparent pointer-events-none"
        aria-hidden
      />
      <figcaption className="absolute inset-x-0 bottom-0 p-3 sm:p-3.5">
        <p className="font-heading text-[10px] sm:text-[11px] font-bold tracking-[0.16em] uppercase text-white drop-shadow-sm">
          {label}
        </p>
        <p className="mt-0.5 text-[11px] sm:text-xs text-white/90 tracking-wide drop-shadow-sm">{sublabel}</p>
      </figcaption>
    </figure>
  );
}

/**
 * Gallery page hero — visual-first portfolio introduction.
 */
export function GalleryHero() {
  const kitchen = HERO_IMAGES[0]!;
  const supporting = HERO_IMAGES.slice(1);

  return (
    <section className="relative overflow-hidden bg-[#faf8f5] border-b border-gray-200/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 sm:pt-14 lg:pt-16 pb-12 sm:pb-14 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] gap-8 lg:gap-10 xl:gap-12 lg:items-center">
          {/* Left — copy */}
          <div className="min-w-0 max-w-md lg:max-w-none">
            <p className="font-heading text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase text-tamay-accent">
              Project Gallery
            </p>
            <div className="mt-2.5 h-px w-10 bg-tamay-accent/70" aria-hidden />

            <h1 className="mt-3 font-heading text-[1.85rem] sm:text-3xl lg:text-[2.35rem] font-semibold leading-[1.12] text-balance">
              <span style={{ color: NAVY }}>See the Work.</span>
              <br />
              <span className="text-tamay-accent">Feel the Difference.</span>
            </h1>

            <p className="mt-4 text-sm sm:text-[15px] text-gray-600 leading-relaxed max-w-sm">
              Explore kitchens, bathrooms, additions, interiors, exteriors, and the details that show how Tamay brings
              projects to life.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-2.5 sm:gap-3">
              <a
                href="#featured-projects"
                className={`${constructionPrimaryLinkClass} w-full sm:w-auto inline-flex items-center justify-center gap-2`}
              >
                Explore Projects
                <span aria-hidden>→</span>
              </a>
              <Link
                href={appointmentScheduleHref("construction")}
                className={`${constructionOutlineLinkClass} w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#faf8f5]`}
              >
                Book a Consultation
                <span aria-hidden>→</span>
              </Link>
            </div>

            {/* Trust row — desktop/tablet under CTAs; also shown after images on mobile via order */}
            <div className="mt-8 hidden sm:grid grid-cols-3 gap-3 lg:gap-2">
              {VALUES.map((item, i) => (
                <div
                  key={i}
                  className={`min-w-0 ${i > 0 ? "border-l border-gray-200 pl-3 lg:pl-2.5" : ""}`}
                >
                  <span className="text-tamay-accent">
                    <ValueIcon type={item.icon} />
                  </span>
                  <p
                    className="mt-1.5 font-heading text-[11px] lg:text-[10px] xl:text-[11px] font-semibold uppercase tracking-[0.06em] leading-snug"
                    style={{ color: NAVY }}
                  >
                    {item.title}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-8 hidden sm:block font-heading text-[10px] font-bold tracking-[0.18em] uppercase text-tamay-accent/90">
              More Than Building Spaces — Building Better Lives
            </p>
          </div>

          {/* Right — image composition */}
          <div className="min-w-0">
            {/* Desktop / large: kitchen large + 3 below */}
            <div className="hidden lg:grid gap-3">
              <HeroImageCard
                src={kitchen.src}
                alt={kitchen.alt}
                label={kitchen.label}
                sublabel={kitchen.sublabel}
                className="aspect-[16/9] xl:aspect-[2/1]"
              />
              <div className="grid grid-cols-3 gap-3">
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

            {/* Tablet: kitchen + 2-col then remaining */}
            <div className="hidden sm:grid lg:hidden gap-3">
              <HeroImageCard
                src={kitchen.src}
                alt={kitchen.alt}
                label={kitchen.label}
                sublabel={kitchen.sublabel}
                className="aspect-[16/10]"
              />
              <div className="grid grid-cols-2 gap-3">
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

            {/* Mobile: stacked large images */}
            <div className="sm:hidden space-y-3">
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

        {/* Mobile trust + brand line after images */}
        <div className="mt-8 sm:hidden">
          <div className="grid grid-cols-1 gap-4">
            {VALUES.map((item, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <span className="mt-0.5 text-tamay-accent">
                  <ValueIcon type={item.icon} />
                </span>
                <p className="font-heading text-xs font-semibold uppercase tracking-[0.06em] leading-snug" style={{ color: NAVY }}>
                  {item.title}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 font-heading text-[10px] font-bold tracking-[0.16em] uppercase text-tamay-accent/90">
            More Than Building Spaces — Building Better Lives
          </p>
        </div>
      </div>
    </section>
  );
}
