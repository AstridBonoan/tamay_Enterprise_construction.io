"use client";

import { createContext, useContext, type ReactNode } from "react";
import { IMAGES } from "@/lib/images";
import { EXTRA_IMAGE_DEFAULTS, APPOINTMENT_SERVICE_IMAGE_KEYS } from "@/lib/siteImageSlots";
import { mediaSrc, type ResolvedSiteMedia } from "@/lib/siteImages";

const defaultMedia: ResolvedSiteMedia = {
  images: IMAGES,
  extras: { ...EXTRA_IMAGE_DEFAULTS },
  overrides: {},
};

const SiteImagesContext = createContext<ResolvedSiteMedia>(defaultMedia);

export function SiteImagesProvider({
  media,
  children,
}: {
  media: ResolvedSiteMedia;
  children: ReactNode;
}) {
  return <SiteImagesContext.Provider value={media}>{children}</SiteImagesContext.Provider>;
}

export function useResolvedSiteMedia(): ResolvedSiteMedia {
  return useContext(SiteImagesContext);
}

export function useResolvedImages() {
  return useResolvedSiteMedia().images;
}

export function useSiteImageSrc(key: string): string {
  return mediaSrc(useResolvedSiteMedia(), key);
}

export function useAppointmentServiceImage(serviceId: string, fallback: string): string {
  const key = APPOINTMENT_SERVICE_IMAGE_KEYS[serviceId];
  const resolved = useSiteImageSrc(key ?? "logo");
  return key ? resolved : fallback;
}
