"use client";

import { usePathname } from "next/navigation";
import { FloatingPromoBanner } from "@/components/ui/FloatingPromoBanner";
import { getContactFloatConfig } from "@/lib/contactFloat";
import { normalizeSitePath } from "@/lib/paths";

/** Sitewide compact contextual CTA for pages without a dedicated promo float. */
export function PageContactFloat() {
  const pathname = normalizeSitePath(usePathname());
  const config = getContactFloatConfig(pathname);

  if (!config) return null;

  return (
    <FloatingPromoBanner
      collapsedLabel={config.collapsedLabel}
      ariaLabel={config.ariaLabel}
      ctaHref={config.ctaHref}
      ctaExternal={config.ctaExternal}
    />
  );
}
