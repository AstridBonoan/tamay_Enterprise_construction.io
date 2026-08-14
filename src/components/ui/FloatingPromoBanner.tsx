"use client";

import { CollapsedFloatButton } from "@/components/ui/FloatingFloatControls";

type FloatingPromoBannerProps = {
  collapsedLabel: string;
  ariaLabel: string;
  ctaHref: string;
  ctaExternal?: boolean;
};

/** Compact right-side contextual CTA — one click goes to the page destination. */
export function FloatingPromoBanner({
  collapsedLabel,
  ariaLabel,
  ctaHref,
  ctaExternal = false,
}: FloatingPromoBannerProps) {
  return (
    <CollapsedFloatButton
      label={collapsedLabel}
      side="right"
      href={ctaHref}
      external={ctaExternal}
      ariaLabel={ariaLabel}
    />
  );
}
