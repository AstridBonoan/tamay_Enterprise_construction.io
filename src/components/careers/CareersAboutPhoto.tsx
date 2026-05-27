import Image from "next/image";

type CareersAboutPhotoProps = {
  src: string;
  alt: string;
  className?: string;
};

export function CareersAboutPhoto({ src, alt, className = "aspect-[4/3]" }: CareersAboutPhotoProps) {
  return (
    <figure className={`relative overflow-hidden bg-gray-200 ${className}`}>
      <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 480px" />
    </figure>
  );
}
