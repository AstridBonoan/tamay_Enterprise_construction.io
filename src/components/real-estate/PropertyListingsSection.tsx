import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { PropertyListing } from "@/lib/realEstateListings";

type PropertyListingsSectionProps = {
  id: string;
  title: string;
  intro: string;
  listings: readonly PropertyListing[];
  emptyMessage: string;
  badgeLabel: "For Sale" | "For Rent";
  alternateBackground?: boolean;
};

function PropertyCard({
  listing,
  badgeLabel,
}: {
  listing: PropertyListing;
  badgeLabel: "For Sale" | "For Rent";
}) {
  const details = [
    `${listing.beds} bed`,
    `${listing.baths} bath`,
    listing.sqft ? `${listing.sqft.toLocaleString()} sq ft` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <article className="bg-white border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="relative aspect-[4/3] bg-gray-100">
        <Image
          src={listing.image}
          alt={listing.imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
          unoptimized
        />
        <span className="absolute top-3 left-3 bg-tamay-accent text-white text-xs font-bold tracking-wide uppercase px-2.5 py-1">
          {badgeLabel}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-heading text-lg text-tamay-primary font-semibold leading-snug">{listing.title}</h3>
        <p className="text-sm text-gray-500 mt-1">{listing.address}</p>
        <p className="text-tamay-primary font-bold text-xl mt-3">{listing.price}</p>
        <p className="text-sm text-gray-600 mt-1">{details}</p>
        {listing.description && (
          <p className="text-sm text-gray-600 leading-relaxed mt-3 flex-1">{listing.description}</p>
        )}
        <div className="mt-5">
          <Button href="#contact" variant="primary" className="w-full sm:w-auto">
            Inquire
          </Button>
        </div>
      </div>
    </article>
  );
}

export function PropertyListingsSection({
  id,
  title,
  intro,
  listings,
  emptyMessage,
  badgeLabel,
  alternateBackground = false,
}: PropertyListingsSectionProps) {
  return (
    <section id={id} className={`py-14 px-4 scroll-mt-24 ${alternateBackground ? "bg-gray-50" : "bg-white"}`}>
      <div className="max-w-6xl mx-auto">
        <SectionHeading title={title} subtitle={intro} />
        {listings.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 -mt-2">
            {listings.map((listing) => (
              <PropertyCard key={listing.id} listing={listing} badgeLabel={badgeLabel} />
            ))}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto text-center bg-white border border-gray-200 shadow-sm px-6 py-12 -mt-2">
            <p className="text-gray-600 leading-relaxed mb-6">{emptyMessage}</p>
            <Button href="#contact" variant="primary">
              Contact an agent
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
