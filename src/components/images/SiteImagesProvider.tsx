"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { IMAGES } from "@/lib/images";
import { EXTRA_IMAGE_DEFAULTS, APPOINTMENT_SERVICE_IMAGE_KEYS } from "@/lib/siteImageSlots";
import { mediaSrc, resolveMediaFromOverrides, type ResolvedSiteMedia, type SiteImageOverride } from "@/lib/siteImages";

const defaultMedia: ResolvedSiteMedia = {
  images: IMAGES,
  extras: { ...EXTRA_IMAGE_DEFAULTS },
  overrides: {},
};

type SiteImagesContextValue = ResolvedSiteMedia & {
  applyOverride: (row: SiteImageOverride) => void;
  clearOverride: (key: string) => void;
};

const SiteImagesContext = createContext<SiteImagesContextValue>({
  ...defaultMedia,
  applyOverride: () => undefined,
  clearOverride: () => undefined,
});

export function SiteImagesProvider({
  media,
  children,
}: {
  media: ResolvedSiteMedia;
  children: ReactNode;
}) {
  const [overrides, setOverrides] = useState(media.overrides);

  const applyOverride = useCallback((row: SiteImageOverride) => {
    setOverrides((prev) => ({ ...prev, [row.key]: row }));
  }, []);

  const clearOverride = useCallback((key: string) => {
    setOverrides((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const resolved = useMemo(() => resolveMediaFromOverrides(overrides), [overrides]);

  const value = useMemo(
    () => ({
      ...resolved,
      applyOverride,
      clearOverride,
    }),
    [applyOverride, clearOverride, resolved],
  );

  return <SiteImagesContext.Provider value={value}>{children}</SiteImagesContext.Provider>;
}

export function useResolvedSiteMedia(): ResolvedSiteMedia {
  return useContext(SiteImagesContext);
}

export function useSiteImageEditor() {
  const { applyOverride, clearOverride, overrides } = useContext(SiteImagesContext);
  return { applyOverride, clearOverride, overrides };
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
