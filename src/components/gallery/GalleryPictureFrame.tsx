import Image from "next/image";
import "./gallery-picture-frame.css";

type GalleryPictureFrameProps = {
  src: string;
  alt: string;
  frameSrc: string;
  priority?: boolean;
  sizes?: string;
  compact?: boolean;
  active?: boolean;
  className?: string;
};

export function GalleryPictureFrame({
  src,
  alt,
  frameSrc,
  priority = false,
  sizes = "100vw",
  compact = false,
  active = false,
  className = "",
}: GalleryPictureFrameProps) {
  return (
    <div
      className={`gallery-picture-frame ${compact ? "gallery-picture-frame--compact" : ""} ${
        active ? "gallery-picture-frame--active" : ""
      } ${className}`.trim()}
    >
      <div className="gallery-picture-frame__stage">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={frameSrc} alt="" aria-hidden className="gallery-picture-frame__border" />
        <div className="gallery-picture-frame__opening">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes={sizes}
            unoptimized
            priority={priority}
          />
        </div>
      </div>
    </div>
  );
}
