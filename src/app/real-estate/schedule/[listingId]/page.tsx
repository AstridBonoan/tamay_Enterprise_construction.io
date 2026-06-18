import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PropertyScheduleCalendar } from "@/components/real-estate/PropertyScheduleCalendar";
import { sitePath } from "@/lib/paths";
import {
  getAllListingIds,
  getListingById,
  realEstateSectionHref,
} from "@/lib/realEstateScheduling";

type SchedulePageProps = {
  params: Promise<{ listingId: string }>;
};

export function generateStaticParams() {
  return getAllListingIds().map((listingId) => ({ listingId }));
}

export async function generateMetadata({ params }: SchedulePageProps): Promise<Metadata> {
  const { listingId } = await params;
  const result = getListingById(listingId);
  if (!result) return { title: "Schedule a Showing" };

  return {
    title: `${result.listing.scheduleCtaLabel} | ${result.listing.title}`,
    description: `Schedule a showing for ${result.listing.title} at ${result.listing.address}.`,
  };
}

export default async function PropertySchedulePage({ params }: SchedulePageProps) {
  const { listingId } = await params;
  const result = getListingById(listingId);
  if (!result) notFound();

  const { listing, kind } = result;
  const kindLabel = kind === "sale" ? "For Sale" : "For Rent";

  return (
    <section className="py-14 px-4 bg-gray-50 min-h-[70vh]">
      <div className="max-w-3xl mx-auto">
        <p className="text-sm text-gray-500 mb-6 text-center">
          <Link href={sitePath(realEstateSectionHref(kind))} className="text-tamay-primary hover:underline">
            ← Back to {kind === "sale" ? "Houses For Sale" : "Houses For Rent"}
          </Link>
        </p>
        <PropertyScheduleCalendar listing={listing} kindLabel={kindLabel} />
      </div>
    </section>
  );
}
