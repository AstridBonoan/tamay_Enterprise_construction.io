import Link from "next/link";
import { OpenLiveChatButton } from "@/components/layout/OpenLiveChatButton";
import { PropertyInformationRequest } from "@/components/real-estate/PropertyInformationRequest";
import { TamayPropertyPerspective } from "@/components/real-estate/TamayPropertyPerspective";
import { ListingPhotoCarousel } from "@/components/real-estate/ListingPhotoCarousel";
import {
  realEstateChatButtonClass,
  realEstateOutlineLinkClass,
  realEstatePrimaryLinkClass,
} from "@/components/real-estate/realEstateCtaStyles";
import { ScheduleSlotPreview } from "@/components/scheduling/ScheduleSlotPreview";
import { sitePath } from "@/lib/paths";
import {
  schedulePagePath,
  type PublicPropertyListing,
} from "@/lib/realEstateScheduling";
import { SITE } from "@/lib/site";
import { SiteText } from "@/components/copy/SiteText";
import { listingCopyKey } from "@/lib/siteCopy";
import { listingTypeLine } from "@/lib/mlsListing";
import { MlsListingSections, PropertySnapshot } from "@/components/real-estate/MlsListingSections";

type PropertyDetailPageProps = {
  listing: PublicPropertyListing;
};

export function PropertyDetailExperience({ listing }: PropertyDetailPageProps) {
  const typeLine = listingTypeLine(listing);
  const bookHref = sitePath(`${schedulePagePath(listing.id)}#book`);

  return (
    <article className="bg-gray-50 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <p className="text-sm text-gray-500 mb-6">
          <Link href={sitePath("/real-estate/#available-properties")} className="text-tamay-primary hover:underline">
            ← Back to Available Properties
          </Link>
        </p>

        <ListingPhotoCarousel
          listing={listing}
          aspectClassName="aspect-[16/10] sm:aspect-[21/9]"
        />

        <div className="mt-6 flex flex-wrap gap-2">
          <span className="bg-tamay-accent text-white text-[11px] font-bold tracking-wide uppercase px-2.5 py-1">
            {listing.kindLabel}
          </span>
          <span className="bg-tamay-primary text-white text-[11px] font-bold tracking-wide uppercase px-2.5 py-1">
            {listing.statusLabel}
          </span>
        </div>

        <SiteText k={listingCopyKey(listing.id, "title")} as="h1" className="font-heading text-2xl sm:text-3xl lg:text-4xl text-tamay-primary font-semibold mt-4 leading-tight">
          {listing.title}
        </SiteText>
        <SiteText k={listingCopyKey(listing.id, "address")} as="p" className="mt-2 text-gray-600">
          {listing.address}
        </SiteText>
        <SiteText k={listingCopyKey(listing.id, "price")} as="p" className="mt-3 text-tamay-primary font-bold text-3xl">
          {listing.price}
        </SiteText>
        {typeLine ? (
          <p className="mt-2 text-sm text-gray-500">{typeLine}</p>
        ) : null}
        <PropertySnapshot listing={listing} />

        <div className="mt-8 grid sm:grid-cols-2 gap-3">
          <a href={SITE.phoneTel} className={realEstatePrimaryLinkClass}>
            <SiteText k="realEstate.property.call">Speak With Our Real Estate Team</SiteText>
          </a>
          <OpenLiveChatButton className={realEstateChatButtonClass}>
            <SiteText k="realEstate.property.chat">Chat With Us</SiteText>
          </OpenLiveChatButton>
          <Link href={bookHref} className={`${realEstateOutlineLinkClass} sm:col-span-2`}>
            <SiteText k="realEstate.property.schedule">Schedule a Showing</SiteText>
          </Link>
        </div>

        <section className="mt-10 bg-white p-6 sm:p-8">
          <h2 className="font-heading text-xl text-tamay-primary font-semibold">
            <SiteText k="realEstate.property.about">About this home</SiteText>
          </h2>
          <SiteText k={listingCopyKey(listing.id, "details")} as="p" className="mt-3 text-gray-600 leading-relaxed" multiline>
            {listing.details}
          </SiteText>
        </section>

        <MlsListingSections listing={listing} />

        <section className="mt-6 bg-white p-6 sm:p-8">
          <SiteText k={listingCopyKey(listing.id, "scheduleLabel")} as="h2" className="font-heading text-xl text-tamay-primary font-semibold mb-3">
            {listing.scheduleLabel}
          </SiteText>
          <ScheduleSlotPreview
            serviceKey={listing.id}
            scheduleLabel={listing.scheduleLabel}
            bookHref={bookHref}
            emptyMessage="Contact our team to schedule a showing for this property."
          />
        </section>

        <TamayPropertyPerspective />

        <section className="mt-6 bg-white p-6 sm:p-8">
          <PropertyInformationRequest listing={listing} />
        </section>
      </div>
    </article>
  );
}
