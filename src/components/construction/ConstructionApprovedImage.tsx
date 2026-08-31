import { SitePhoto } from "@/components/images/SitePhoto";

type ConstructionApprovedImageProps = {
  slot: string;
  alt: string;
  priority?: boolean;
  className?: string;
  /** Intrinsic pixel size — keeps layout stable without cropping */
  width?: number;
  height?: number;
};

/**
 * Full-width approved conceptual visuals via site image slots.
 * Matching aspect-ratio + object-contain avoids cropping baked-in text.
 */
export function ConstructionApprovedImage({
  slot,
  alt,
  priority = false,
  className = "",
  width = 1672,
  height = 941,
}: ConstructionApprovedImageProps) {
  return (
    <figure
      className={`relative w-full bg-white ${className}`}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <SitePhoto
        slot={slot}
        alt={alt}
        priority={priority}
        className="object-contain"
        sizes="(max-width: 1152px) 100vw, 1152px"
      />
    </figure>
  );
}
