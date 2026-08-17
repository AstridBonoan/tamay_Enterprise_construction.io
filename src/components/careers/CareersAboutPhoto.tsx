import Image from "next/image";
import { SitePhoto } from "@/components/images/SitePhoto";

type CareersAboutPhotoProps = {
  src: string;
  alt: string;
  slotKey?: string;
  className?: string;
};

export function CareersAboutPhoto({ src, alt, slotKey, className = "aspect-[4/3]" }: CareersAboutPhotoProps) {
  return (
    <figure className={`relative overflow-hidden bg-gray-200 ${className}`}>
      {slotKey ? (
        <SitePhoto slot={slotKey} alt={alt} sizes="(max-width: 768px) 100vw, 480px" />
      ) : (
        <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 480px" />
      )}
    </figure>
  );
}
