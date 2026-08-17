"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { StaffPhotoEditor } from "@/components/images/StaffPhotoEditor";
import { useSiteImageSrc } from "@/components/images/SiteImagesProvider";

type SitePhotoProps = {
  slot: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  style?: CSSProperties;
  compact?: boolean;
};

export function SitePhoto({
  slot,
  alt,
  className = "object-cover",
  sizes = "100vw",
  priority,
  style,
  compact,
}: SitePhotoProps) {
  const src = useSiteImageSrc(slot);

  return (
    <StaffPhotoEditor slot={slot} compact={compact}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          className={className}
          sizes={sizes}
          priority={priority}
          style={style}
          unoptimized
        />
      ) : (
        <div className="absolute inset-0 bg-gray-100" aria-hidden />
      )}
    </StaffPhotoEditor>
  );
}
