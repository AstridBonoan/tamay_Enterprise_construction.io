"use client";

import Link from "next/link";
import { ImageCarousel } from "@/components/ui/ImageCarousel";
import { ScheduleSlotPreview } from "@/components/scheduling/ScheduleSlotPreview";
import {
  realEstateOutlineLinkClass,
  realEstatePrimaryLinkClass,
} from "@/components/real-estate/realEstateCtaStyles";
import { sitePath } from "@/lib/paths";
import {
  listingPreviewSlides,
  propertyPagePath,
  schedulePagePath,
  type PublicPropertyListing,
} from "@/lib/realEstateScheduling";

type PropertyPreviewCardProps = {
  listing: PublicPropertyListing;
  expanded: boolean;
  onToggle: () => void;
};

export function PropertyPreviewCard({ listing, expanded, onToggle }: PropertyPreviewCardProps) {
  const slides = listingPreviewSlides(listing);
  const specs = [
    `${listing.beds} bed`,
    `${listing.baths} bath`,
    listing.sqft ? `${listing.sqft.toLocaleString()} sq ft` : null,
  ]
    .filter(Boolean)
    .join(" · ");
  const bookHref = sitePath(`${schedulePagePath(listing.id)}#book`);
  const detailsHref = propertyPagePath(listing.id);
  const panelId = `property-details-${listing.id}`;

  return (
    <article className="bg-white border border-gray-200 overflow-hidden">
      <ImageCarousel
        slides={slides}
        aspectClassName="aspect-[16/10]"
        showThumbnails={false}
        showCaption={false}
        showNavArrows={slides.length > 1}
        navButtonClassName="rounded-full bg-white min-w-11 min-h-11 p-2.5 text-tamay-primary shadow-md border border-gray-200 hover:bg-gray-50 shrink-0"
      />

      <div className="px-4 sm:px-5 py-4 space-y-3">
        <div className="flex flex-wrap gap-2">
          <span className="bg-tamay-accent text-white text-[11px] font-bold tracking-wide uppercase px-2.5 py-1">
            {listing.kindLabel}
          </span>
          <span className="bg-tamay-primary text-white text-[11px] font-bold tracking-wide uppercase px-2.5 py-1">
            {listing.statusLabel}
          </span>
        </div>
        <p className="text-tamay-primary font-bold text-xl">{listing.price}</p>
        <h3 className="font-heading text-lg text-tamay-primary font-semibold leading-snug">{listing.title}</h3>
        <p className="text-sm text-gray-600">{listing.address}</p>
        <p className="text-sm text-gray-500">{specs}</p>

        <button
          type="button"
          className="inline-flex items-center min-h-11 text-sm font-bold text-tamay-primary hover:underline"
          aria-expanded={expanded}
          aria-controls={panelId}
          onClick={onToggle}
        >
          View More Details {expanded ? "▴" : "▾"}
        </button>
      </div>

      {expanded ? (
        <div id={panelId} className="px-4 sm:px-5 pb-5 space-y-4 border-t border-gray-100 pt-4">
          <p className="text-sm text-gray-600 leading-relaxed">{listing.details}</p>
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-tamay-primary mb-2">
              {listing.scheduleLabel}
            </h4>
            <ScheduleSlotPreview
              serviceKey={listing.id}
              scheduleLabel={listing.scheduleLabel}
              bookHref={bookHref}
              emptyMessage="Contact our team to schedule a showing for this property."
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href={sitePath(detailsHref)} className={realEstatePrimaryLinkClass}>
              View Full Property
            </Link>
            <Link href={bookHref} className={realEstateOutlineLinkClass}>
              {listing.scheduleCtaLabel}
            </Link>
          </div>
        </div>
      ) : null}
    </article>
  );
}
