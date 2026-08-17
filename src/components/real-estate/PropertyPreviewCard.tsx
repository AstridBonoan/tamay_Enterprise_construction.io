"use client";

import Link from "next/link";
import { ListingPhotoCarousel } from "@/components/real-estate/ListingPhotoCarousel";
import { ScheduleSlotPreview } from "@/components/scheduling/ScheduleSlotPreview";
import {
  realEstateOutlineLinkClass,
  realEstatePrimaryLinkClass,
} from "@/components/real-estate/realEstateCtaStyles";
import { sitePath } from "@/lib/paths";
import { propertyPagePath, schedulePagePath, type PublicPropertyListing } from "@/lib/realEstateScheduling";
import { SiteText } from "@/components/copy/SiteText";
import { listingCopyKey } from "@/lib/siteCopy";

type PropertyPreviewCardProps = {
  listing: PublicPropertyListing;
  expanded: boolean;
  onToggle: () => void;
};

export function PropertyPreviewCard({ listing, expanded, onToggle }: PropertyPreviewCardProps) {
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
      <ListingPhotoCarousel listing={listing} aspectClassName="aspect-[16/10]" />

      <div className="px-4 sm:px-5 py-4 space-y-3">
        <div className="flex flex-wrap gap-2">
          <span className="bg-tamay-accent text-white text-[11px] font-bold tracking-wide uppercase px-2.5 py-1">
            {listing.kindLabel}
          </span>
          <span className="bg-tamay-primary text-white text-[11px] font-bold tracking-wide uppercase px-2.5 py-1">
            {listing.statusLabel}
          </span>
        </div>
        <SiteText k={listingCopyKey(listing.id, "price")} as="p" className="text-tamay-primary font-bold text-xl">
          {listing.price}
        </SiteText>
        <SiteText k={listingCopyKey(listing.id, "title")} as="h3" className="font-heading text-lg text-tamay-primary font-semibold leading-snug">
          {listing.title}
        </SiteText>
        <SiteText k={listingCopyKey(listing.id, "address")} as="p" className="text-sm text-gray-600">
          {listing.address}
        </SiteText>
        <p className="text-sm text-gray-500">{specs}</p>

        <button
          type="button"
          className="inline-flex items-center min-h-11 text-sm font-bold text-tamay-primary hover:underline"
          aria-expanded={expanded}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <SiteText k="realEstate.properties.viewMore">View More Details</SiteText> {expanded ? "▴" : "▾"}
        </button>
      </div>

      {expanded ? (
        <div id={panelId} className="px-4 sm:px-5 pb-5 space-y-4 border-t border-gray-100 pt-4">
          <SiteText k={listingCopyKey(listing.id, "details")} as="p" className="text-sm text-gray-600 leading-relaxed" multiline>
            {listing.details}
          </SiteText>
          <div>
            <SiteText k={listingCopyKey(listing.id, "scheduleLabel")} as="h4" className="text-xs font-semibold tracking-widest uppercase text-tamay-primary mb-2">
              {listing.scheduleLabel}
            </SiteText>
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
              <SiteText k={listingCopyKey(listing.id, "scheduleCta")}>{listing.scheduleCtaLabel}</SiteText>
            </Link>
          </div>
        </div>
      ) : null}
    </article>
  );
}
