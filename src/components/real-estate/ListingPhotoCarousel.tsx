"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ImageCarousel } from "@/components/ui/ImageCarousel";
import { useResolvedSiteMedia } from "@/components/images/SiteImagesProvider";
import { StaffPhotoEditor, StaffImagePickerButton } from "@/components/images/StaffPhotoEditor";
import { revalidateSiteImages } from "@/app/actions/revalidateSiteImages";
import { useAuth } from "@/components/auth/AuthProvider";
import { useSiteImageEditor } from "@/components/images/SiteImagesProvider";
import {
  LISTING_PHOTO_COUNT,
  listingImageSlotKey,
} from "@/lib/siteImageSlots";
import { mediaSrc, replaceSiteImage } from "@/lib/siteImages";
import type { PropertyListing } from "@/lib/realEstateListings";

const PHONE_MEDIA = "(max-width: 767px)";
const CARD_AUTOPLAY_MS = 4000;

function useIsPhone() {
  const [isPhone, setIsPhone] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(PHONE_MEDIA);
    const sync = () => setIsPhone(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return isPhone;
}

type ListingPhotoCarouselProps = {
  listing: PropertyListing;
  aspectClassName?: string;
  showThumbnails?: boolean;
  showNavArrows?: boolean;
  /** Fade to the second photo on hover (property cards). */
  hoverPreview?: boolean;
};

export function ListingPhotoCarousel({
  listing,
  aspectClassName = "aspect-[16/10]",
  showThumbnails,
  showNavArrows,
  hoverPreview = false,
}: ListingPhotoCarouselProps) {
  const media = useResolvedSiteMedia();
  const { user } = useAuth();
  const { overrides, applyOverride } = useSiteImageEditor();
  const isPhone = useIsPhone();
  const [addBusy, setAddBusy] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

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
  const hoverSlide = hoverPreview && slides.length > 1 ? slides[1] : null;
  const mainSlide = slides[0];

  const carousel = (
    <ImageCarousel
      slides={slides}
      aspectClassName={aspectClassName}
      showThumbnails={hoverPreview ? false : (showThumbnails ?? slides.length > 1)}
      showCaption={false}
      showNavArrows={showNavArrows ?? slides.length > 1}
      autoplayIntervalMs={hoverPreview ? CARD_AUTOPLAY_MS : undefined}
      paused={hoverPreview ? !isPhone : false}
      navButtonClassName="rounded-full bg-white min-w-11 min-h-11 p-2.5 text-tamay-primary shadow-md border border-gray-200 hover:bg-gray-50 shrink-0"
    />
  );

  return (
    <div className="relative">
      {hoverPreview && mainSlide ? (
        <>
          <div className="hidden md:block">
            <div className={`group relative overflow-hidden bg-gray-100 ${aspectClassName}`}>
              <div className="absolute inset-0">
                <StaffPhotoEditor slot={mainSlide.slotKey}>
                  <Image
                    src={mainSlide.src}
                    alt={mainSlide.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized
                  />
                </StaffPhotoEditor>
              </div>
              {hoverSlide ? (
                <div className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100">
                  <Image
                    src={hoverSlide.src}
                    alt={hoverSlide.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized
                  />
                </div>
              ) : null}
            </div>
          </div>
          <div className="md:hidden">{carousel}</div>
        </>
      ) : (
        carousel
      )}
      {canAddExtra ? (
        <div className="absolute top-2 left-2 z-30 flex flex-col items-start gap-1">
          <StaffImagePickerButton
            label="Add photo"
            busy={addBusy}
            className="inline-flex min-h-10 cursor-pointer items-center rounded-md bg-white/95 px-3 text-xs font-semibold text-tamay-primary shadow-md hover:bg-white disabled:opacity-70"
            onFile={(file) => {
              if (!user) return;
              const slot = listingImageSlotKey(listing.id, nextEmptyIndex);
              setAddBusy(true);
              setAddError(null);
              void replaceSiteImage(user.id, slot, file, overrides[slot]?.storage_path)
                .then(async (saved) => {
                  applyOverride(saved);
                  try {
                    await revalidateSiteImages();
                  } catch (revalidateError) {
                    console.warn("Photo saved, but page cache was not refreshed:", revalidateError);
                  }
                })
                .catch((err) => {
                  setAddError(err instanceof Error ? err.message : "Could not add listing photo.");
                })
                .finally(() => {
                  setAddBusy(false);
                });
            }}
          />
          {addError ? (
            <p className="max-w-[14rem] rounded bg-white/95 px-2 py-1 text-[11px] text-red-600 shadow" role="alert">
              {addError}
            </p>
          ) : null}
        </div>
      ) : null}
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
