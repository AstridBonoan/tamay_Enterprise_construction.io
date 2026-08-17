"use client";

import type { ReactNode } from "react";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { SiteCopyProvider } from "@/components/copy/SiteCopyProvider";
import { SiteImagesProvider } from "@/components/images/SiteImagesProvider";
import type { ResolvedSiteMedia } from "@/lib/siteImages";

export function Providers({
  children,
  media,
  copy,
}: {
  children: ReactNode;
  media: ResolvedSiteMedia;
  copy: Record<string, string>;
}) {
  return (
    <AuthProvider>
      <SiteCopyProvider copy={copy}>
        <SiteImagesProvider media={media}>{children}</SiteImagesProvider>
      </SiteCopyProvider>
    </AuthProvider>
  );
}
