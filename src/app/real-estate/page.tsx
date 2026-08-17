import type { Metadata } from "next";
import { RealEstateHero } from "@/components/real-estate/RealEstateHero";
import { TamayDifferenceSection } from "@/components/real-estate/TamayDifferenceSection";
import { BuildersEyesSection } from "@/components/real-estate/BuildersEyesSection";
import { PlanForTomorrowSection } from "@/components/real-estate/PlanForTomorrowSection";
import { AvailablePropertiesSection } from "@/components/real-estate/AvailablePropertiesSection";
import { RealEstateJourneySection } from "@/components/real-estate/RealEstateJourneySection";
import { RealEstateServiceAreaSection } from "@/components/real-estate/RealEstateServiceAreaSection";
import { RealEstateFinalCTA } from "@/components/real-estate/RealEstateFinalCTA";
import { SellingHelpBanner } from "@/components/real-estate/SellingHelpBanner";
import { buildSocialMetadata } from "@/lib/socialMetadata";

export const metadata: Metadata = buildSocialMetadata("realEstate");

export default function RealEstatePage() {
  return (
    <>
      <RealEstateHero />
      <TamayDifferenceSection />
      <BuildersEyesSection />
      <PlanForTomorrowSection />
      <AvailablePropertiesSection />
      <RealEstateJourneySection />
      <RealEstateServiceAreaSection />
      <RealEstateFinalCTA />
      <SellingHelpBanner />
    </>
  );
}
