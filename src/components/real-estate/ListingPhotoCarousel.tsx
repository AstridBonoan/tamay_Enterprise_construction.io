"use client";

import { useMemo } from "react";
import { ImageCarousel } from "@/components/ui/ImageCarousel";
import { useResolvedSiteMedia } from "@/components/images/SiteImagesProvider";
import { StaffPhotoEditor } from "@/components/images/StaffPhotoEditor";
import { replaceSiteImage } from "@/lib/siteImages";
import { revalidateSiteImages } from "@/app/actions/revalidateSiteImages";
import { useAuth } from "@/components/auth/AuthProvider";
import { useSiteImageEditor } from "@/components/images/SiteImagesProvider";
import {
  LISTING_PHOTO_COUNT,
  listingImageSlotKey,
} from "@/lib/siteImageSlots";
import { mediaSrc } from "@/lib/siteImages";
import type { PropertyListing } from "@/lib/realEstateListings";

type ListingPhotoCarouselProps = {
  listing: PropertyListing;
  aspectClassName?: string;
  showThumbnails?: boolean;
  showNavArrows?: boolean;
};

export function ListingPhotoCarousel({
  listing,
  aspectClassName = "aspect-[16/10]",
  showThumbnails,
  showNavArrows,
}: ListingPhotoCarouselProps) {
  const media = useResolvedSiteMedia();
  const { user } = useAuth();
  const { overrides, applyOverride } = useSiteImageEditor();

  const slides = useMemo(() => {
    const next = [];
    for (let index = 1; index <= LISTING_PHOTO_COUNT; index += 1) {
      const slotKey = listingImageSlotKey(listing.id, index);
      const src = mediaSrc(media, slotKey);
      if (!src) continue;
      next.push({ src, alt: listing.imageAlt, slotKey });
    }
    return next;
  }, [listing.id, listing.imageAlt, media]);

  const nextEmptyIndex = slides.length + 1;
  const canAddExtra = Boolean(user?.isStaff) && nextEmptyIndex <= LISTING_PHOTO_COUNT;

  return (
    <div className="relative">
      <ImageCarousel
        slides={slides}
        aspectClassName={aspectClassName}
        showThumbnails={showThumbnails ?? slides.length > 1}
        showCaption={false}
        showNavArrows={showNavArrows ?? slides.length > 1}
        navButtonClassName="rounded-full bg-white min-w-11 min-h-11 p-2.5 text-tamay-primary shadow-md border border-gray-200 hover:bg-gray-50 shrink-0"
      />
      {canAddExtra ? (
        <label className="absolute top-2 left-2 z-30 inline-flex min-h-10 cursor-pointer items-center rounded-md bg-white/95 px-3 text-xs font-semibold text-tamay-primary shadow-md hover:bg-white">
          Add photo
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="sr-only"
            onChange={(event) => {
              const file = event.target.files?.[0];
              event.target.value = "";
              if (!file || !user) return;
              const slot = listingImageSlotKey(listing.id, nextEmptyIndex);
              void replaceSiteImage(user.id, slot, file, overrides[slot]?.storage_path)
                .then(async (saved) => {
                  applyOverride(saved);
                  await revalidateSiteImages();
                })
                .catch((err) => {
                  console.warn("Could not add listing photo:", err);
                });
            }}
          />
        </label>
      ) : null}
      {/* Keep editor available if carousel has no slides yet. */}
      {slides.length === 0 ? (
        <div className="relative aspect-[16/10] bg-gray-100">
          <StaffPhotoEditor slot={listingImageSlotKey(listing.id)}>
            <div className="absolute inset-0 bg-gray-100" />
          </StaffPhotoEditor>
        </div>
      ) : null}
    </div>
  );
}
