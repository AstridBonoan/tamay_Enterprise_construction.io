import Link from "next/link";
import { OpenLiveChatButton } from "@/components/layout/OpenLiveChatButton";
import { PropertyInformationRequest } from "@/components/real-estate/PropertyInformationRequest";
import { TamayPropertyPerspective } from "@/components/real-estate/TamayPropertyPerspective";
import {
  realEstateChatButtonClass,
  realEstateOutlineLinkClass,
  realEstatePrimaryLinkClass,
} from "@/components/real-estate/realEstateCtaStyles";
import { ImageCarousel } from "@/components/ui/ImageCarousel";
import { ScheduleSlotPreview } from "@/components/scheduling/ScheduleSlotPreview";
import { sitePath } from "@/lib/paths";
import {
  listingPreviewSlides,
  schedulePagePath,
  type PublicPropertyListing,
} from "@/lib/realEstateScheduling";
import { SITE } from "@/lib/site";

type PropertyDetailPageProps = {
  listing: PublicPropertyListing;
};

export function PropertyDetailExperience({ listing }: PropertyDetailPageProps) {
  const slides = listingPreviewSlides(listing);
  const specs = [
    `${listing.beds} bed`,
    `${listing.baths} bath`,
    listing.sqft ? `${listing.sqft.toLocaleString()} sq ft` : null,
  ]
    .filter(Boolean)
    .join(" · ");
  const bookHref = sitePath(`${schedulePagePath(listing.id)}#book`);

  return (
    <article className="bg-gray-50 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <p className="text-sm text-gray-500 mb-6">
          <Link href={sitePath("/real-estate/#available-properties")} className="text-tamay-primary hover:underline">
            ← Back to Available Properties
          </Link>
        </p>

        <ImageCarousel
          slides={slides}
          aspectClassName="aspect-[16/10] sm:aspect-[21/9]"
          showThumbnails={slides.length > 1}
          showNavArrows={slides.length > 1}
          navButtonClassName="rounded-full bg-white min-w-11 min-h-11 p-2.5 text-tamay-primary shadow-md border border-gray-200 hover:bg-gray-50 shrink-0"
        />

        <div className="mt-6 flex flex-wrap gap-2">
          <span className="bg-tamay-accent text-white text-[11px] font-bold tracking-wide uppercase px-2.5 py-1">
            {listing.kindLabel}
          </span>
          <span className="bg-tamay-primary text-white text-[11px] font-bold tracking-wide uppercase px-2.5 py-1">
            {listing.statusLabel}
          </span>
        </div>

        <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-tamay-primary font-semibold mt-4 leading-tight">
          {listing.title}
        </h1>
        <p className="mt-2 text-gray-600">{listing.address}</p>
        <p className="mt-3 text-tamay-primary font-bold text-3xl">{listing.price}</p>
        <p className="mt-2 text-gray-500">{specs}</p>

        <div className="mt-8 grid sm:grid-cols-2 gap-3">
          <a href={SITE.phoneTel} className={realEstatePrimaryLinkClass}>
            Speak With Our Real Estate Team
          </a>
          <OpenLiveChatButton className={realEstateChatButtonClass}>Chat With Us</OpenLiveChatButton>
          <Link href={bookHref} className={`${realEstateOutlineLinkClass} sm:col-span-2`}>
            Schedule a Showing
          </Link>
        </div>

        <section className="mt-10 bg-white p-6 sm:p-8">
          <h2 className="font-heading text-xl text-tamay-primary font-semibold">Property Details</h2>
          <p className="mt-3 text-gray-600 leading-relaxed">{listing.details}</p>
          <dl className="mt-6 grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="font-semibold text-tamay-primary">Address</dt>
              <dd className="text-gray-600 mt-1">{listing.address}</dd>
            </div>
            <div>
              <dt className="font-semibold text-tamay-primary">Price</dt>
              <dd className="text-gray-600 mt-1">{listing.price}</dd>
            </div>
            <div>
              <dt className="font-semibold text-tamay-primary">Beds / Baths</dt>
              <dd className="text-gray-600 mt-1">
                {listing.beds} bed · {listing.baths} bath
              </dd>
            </div>
            {listing.sqft ? (
              <div>
                <dt className="font-semibold text-tamay-primary">Square Feet</dt>
                <dd className="text-gray-600 mt-1">{listing.sqft.toLocaleString()} sq ft</dd>
              </div>
            ) : null}
          </dl>
        </section>

        <section className="mt-6 bg-white p-6 sm:p-8">
          <h2 className="font-heading text-xl text-tamay-primary font-semibold mb-3">{listing.scheduleLabel}</h2>
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
