"use client";

import { OpenLiveChatButton } from "@/components/layout/OpenLiveChatButton";
import {
  realEstateChatButtonClass,
  realEstateOnDarkLinkClass,
} from "@/components/real-estate/realEstateCtaStyles";
import { SitePhoto } from "@/components/images/SitePhoto";
import { SiteText } from "@/components/copy/SiteText";

export function RealEstateHero() {
  return (
    <section className="relative min-h-[70svh] md:min-h-[78svh] flex items-end md:items-center overflow-hidden bg-tamay-primary">
      <SitePhoto
        slot="realEstate.approvedHero"
        alt="Residential property with Tamay callouts for kitchen potential, basement opportunity, layout flexibility, exterior improvements, and future expansion"
        className="object-cover object-center"
        sizes="100vw"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-tamay-primary/88 via-tamay-primary/35 to-transparent pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-t from-tamay-primary/70 via-transparent to-black/10 pointer-events-none z-[1]" />
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <SiteText k="realEstate.hero.eyebrow" as="p" className="text-tamay-accent font-heading font-bold tracking-[0.18em] uppercase text-xs mb-3">
          Real Estate
        </SiteText>
        <SiteText k="realEstate.hero.title" as="h1" className="font-heading text-white text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold leading-tight max-w-3xl text-balance">
          See More Than the Listing. See What the Property Can Become.
        </SiteText>
        <SiteText k="realEstate.hero.body" as="p" className="mt-4 text-white/90 text-base sm:text-lg leading-relaxed max-w-2xl" multiline>
          Real estate guidance backed by real construction experience — helping you understand the home you’re buying today, the systems behind it, and the possibilities it may offer tomorrow.
        </SiteText>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <a href="#available-properties" className={realEstateOnDarkLinkClass}>
            <SiteText k="realEstate.hero.explore">Explore Properties</SiteText>
          </a>
          <OpenLiveChatButton className={realEstateChatButtonClass}>
            <SiteText k="realEstate.hero.chat">Talk to a Real Estate Advisor</SiteText>
          </OpenLiveChatButton>
        </div>
      </div>
    </section>
  );
}
