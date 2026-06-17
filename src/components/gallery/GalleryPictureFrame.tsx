import Image from "next/image";
import "./gallery-picture-frame.css";

type GalleryPictureFrameProps = {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  compact?: boolean;
  active?: boolean;
  className?: string;
};

export function GalleryPictureFrame({
  src,
  alt,
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
      <div className="gallery-picture-frame__mount">
        <div className="gallery-picture-frame__outer-rail">
          <div className="gallery-picture-frame__inner-rail">
            <div className="gallery-picture-frame__mat">
              <div className="gallery-picture-frame__recess">
                <div className="gallery-picture-frame__photo">
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
          </div>
        </div>
        <span className="gallery-picture-frame__corner gallery-picture-frame__corner--tl" aria-hidden />
        <span className="gallery-picture-frame__corner gallery-picture-frame__corner--tr" aria-hidden />
        <span className="gallery-picture-frame__corner gallery-picture-frame__corner--bl" aria-hidden />
        <span className="gallery-picture-frame__corner gallery-picture-frame__corner--br" aria-hidden />
      </div>
    </div>
  );
}
