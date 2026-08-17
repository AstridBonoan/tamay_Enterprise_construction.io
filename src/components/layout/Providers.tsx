"use client";

import type { ReactNode } from "react";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { SiteImagesProvider } from "@/components/images/SiteImagesProvider";
import type { ResolvedSiteMedia } from "@/lib/siteImages";

export function Providers({
  children,
  media,
}: {
  children: ReactNode;
  media: ResolvedSiteMedia;
}) {
  return (
    <AuthProvider>
      <SiteImagesProvider media={media}>{children}</SiteImagesProvider>
    </AuthProvider>
  );
}
