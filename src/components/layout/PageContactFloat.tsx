"use client";

import { usePathname } from "next/navigation";
import { FloatingPromoBanner } from "@/components/ui/FloatingPromoBanner";
import { getContactFloatConfig } from "@/lib/contactFloat";
import { normalizeSitePath } from "@/lib/paths";

/** Sitewide contact floater for pages without a dedicated promo float. */
export function PageContactFloat() {
  const pathname = normalizeSitePath(usePathname());
  const config = getContactFloatConfig(pathname);

  if (!config) return null;

  return (
    <FloatingPromoBanner
      floatId={config.floatId}
      collapsedLabel={config.collapsedLabel}
      headline={config.headline}
      body={config.body}
      ariaLabel={config.ariaLabel}
      ctaLabel={config.ctaLabel}
      ctaHref={config.ctaHref}
    />
  );
}
