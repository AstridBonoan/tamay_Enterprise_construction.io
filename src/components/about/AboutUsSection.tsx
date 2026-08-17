import Link from "next/link";
import { ABOUT } from "@/lib/site";

export function AboutUsSection() {
  return (
    <section id="about-us" className="bg-tamay-primary text-white py-14 sm:py-16 lg:py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-white/80 mb-4">
          About Us
        </p>
        <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-bold uppercase leading-tight mb-8 sm:mb-10 text-balance">
          {ABOUT.headline}
        </h1>
        <p className="text-base sm:text-lg leading-relaxed text-white/95 mb-10 sm:mb-12 max-w-3xl mx-auto">
          {ABOUT.body}
        </p>
        <Link
          href="#our-services"
          className="inline-block bg-white text-tamay-primary hover:bg-gray-100 font-bold uppercase tracking-widest text-sm px-10 sm:px-12 py-3.5 sm:py-4 rounded-full transition-colors shadow-md"
        >
          Explore Our Services
        </Link>
      </div>
    </section>
  );
}
