import type { Metadata } from "next";
import { ConstructionHero } from "@/components/construction/ConstructionHero";
import { ConstructionPlanningSection } from "@/components/construction/ConstructionPlanningSection";
import { KitchenRenovationSection } from "@/components/construction/KitchenRenovationSection";
import { ConstructionWarrantyBanner } from "@/components/construction/ConstructionWarrantyBanner";
import { BathroomRenovationSection } from "@/components/construction/BathroomRenovationSection";
import { ConstructionCoreServices } from "@/components/construction/ConstructionCoreServices";
import { CoordinatedTeamSection } from "@/components/construction/CoordinatedTeamSection";
import { DesignSupplyBuildMaintainSection } from "@/components/construction/DesignSupplyBuildMaintainSection";
import { ConstructionProjectsSection } from "@/components/construction/ConstructionProjectsSection";
import { WarrantyTrustSection } from "@/components/construction/WarrantyTrustSection";
import { ConstructionProcessSection } from "@/components/construction/ConstructionProcessSection";
import { ConstructionReviewsSection } from "@/components/construction/ConstructionReviewsSection";
import { ConstructionFinancingSection } from "@/components/construction/ConstructionFinancingSection";
import { ConstructionServiceAreaSection } from "@/components/construction/ConstructionServiceAreaSection";
import { ConstructionFinalCTA } from "@/components/construction/ConstructionFinalCTA";
import { buildSocialMetadata } from "@/lib/socialMetadata";

export const metadata: Metadata = buildSocialMetadata("construction");

export default function ConstructionPage() {
  return (
    <>
      <ConstructionHero />
      <ConstructionPlanningSection />
      <KitchenRenovationSection />
      <ConstructionWarrantyBanner />
      <BathroomRenovationSection />
      <ConstructionCoreServices />
      <CoordinatedTeamSection />
      <DesignSupplyBuildMaintainSection />
      <ConstructionProjectsSection />
      <WarrantyTrustSection />
      <ConstructionProcessSection />
      <ConstructionReviewsSection />
      <ConstructionFinancingSection />
      <ConstructionServiceAreaSection />
      <ConstructionFinalCTA />
    </>
  );
}
