import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ScheduleSlotPreview } from "@/components/scheduling/ScheduleSlotPreview";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { PropertyListing } from "@/lib/realEstateListings";
import { sitePath } from "@/lib/paths";
import { schedulePagePath } from "@/lib/realEstateScheduling";

type PropertyListingsSectionProps = {
  id: string;
  title: string;
  intro: string;
  listings: readonly PropertyListing[];
  emptyMessage: string;
  badgeLabel: "For Sale" | "For Rent";
  alternateBackground?: boolean;
};

function PropertyListingCard({
  listing,
  badgeLabel,
}: {
  listing: PropertyListing;
  badgeLabel: "For Sale" | "For Rent";
}) {
  const bookHref = sitePath(`${schedulePagePath(listing.id)}#book`);
  const specs = [
    `${listing.beds} bed`,
    `${listing.baths} bath`,
    listing.sqft ? `${listing.sqft.toLocaleString()} sq ft` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <article className="bg-white border border-gray-200 shadow-sm overflow-hidden">
      <div className="relative aspect-[16/10] sm:aspect-[2/1] bg-gray-100">
        <Image
          src={listing.image}
          alt={listing.imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
          unoptimized
        />
        <span className="absolute top-4 left-4 bg-tamay-accent text-white text-xs font-bold tracking-wide uppercase px-3 py-1.5">
          {badgeLabel}
        </span>
      </div>

      <div className="px-5 sm:px-8 py-6 sm:py-8 space-y-5">
        <div>
          <h3 className="font-heading text-xl sm:text-2xl text-tamay-primary font-semibold leading-snug">
            {listing.title}
          </h3>
          <p className="text-gray-600 mt-2">{listing.address}</p>
          <p className="text-tamay-primary font-bold text-2xl sm:text-3xl mt-4">{listing.price}</p>
          <p className="text-sm text-gray-500 mt-2">{specs}</p>
        </div>

        <div className="border-t border-gray-100 pt-5">
          <h4 className="text-sm font-semibold tracking-widest uppercase text-tamay-primary mb-3">
            {listing.scheduleLabel}
          </h4>
          <ScheduleSlotPreview
            serviceKey={listing.id}
            scheduleLabel={listing.scheduleLabel}
            bookHref={bookHref}
            emptyMessage="Contact our team to schedule a showing for this property."
          />
        </div>

        <div className="pt-2 text-center sm:text-left">
          <Button href={`${schedulePagePath(listing.id)}#book`} variant="primary">
            {listing.scheduleCtaLabel}
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
      <div className="max-w-3xl mx-auto">
        <SectionHeading title={title} subtitle={intro} />
        {listings.length > 0 ? (
          <div className="space-y-12 -mt-2">
            {listings.map((listing) => (
              <PropertyListingCard key={listing.id} listing={listing} badgeLabel={badgeLabel} />
            ))}
          </div>
        ) : (
          <div className="text-center bg-white border border-gray-200 shadow-sm px-6 py-12 -mt-2">
            <p className="text-gray-600 leading-relaxed mb-6">{emptyMessage}</p>
            <Button href="#consultation" variant="primary">
              Contact an agent
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
