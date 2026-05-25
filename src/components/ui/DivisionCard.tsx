import Image from "next/image";
import Link from "next/link";
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
}: DivisionCardProps) {
  return (
    <section className="py-14 md:py-20 border-b border-gray-100">
      <div
        className={`max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center ${
          reverse ? "md:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div className="relative aspect-[4/3] overflow-hidden shadow-lg">
          <Image src={image} alt={title} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" unoptimized />
        </div>
        <div>
          <p className="text-sm font-semibold tracking-widest uppercase text-tamay-primary mb-1">
            {eyebrow}
          </p>
          <h2 className="font-heading text-2xl md:text-3xl text-tamay-primary font-semibold mb-2">
            {title}
          </h2>
          <hr className="section-divider mb-4 !mx-0" />
          <p className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-4">{tagline}</p>
          <p className="text-gray-600 leading-relaxed mb-6">{description}</p>
          <ul className="space-y-1 text-gray-700 mb-6">
            {bullets.map((b) => (
              <li key={b} className="text-sm">
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
    </section>
  );
}
