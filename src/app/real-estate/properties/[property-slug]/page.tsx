import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PropertyDetailExperience } from "@/components/real-estate/PropertyDetailExperience";
import { getAllListingIds, getPublicListingById } from "@/lib/realEstateScheduling";

type PropertyPageProps = {
  params: Promise<{ "property-slug": string }>;
};

export function generateStaticParams() {
  return getAllListingIds().map((listingId) => ({ "property-slug": listingId }));
}

export async function generateMetadata({ params }: PropertyPageProps): Promise<Metadata> {
  const { "property-slug": slug } = await params;
  const listing = getPublicListingById(slug);
  if (!listing) return { title: "Property" };

  return {
    title: listing.title,
    description: `${listing.kindLabel} at ${listing.address}. ${listing.price}.`,
  };
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { "property-slug": slug } = await params;
  const listing = getPublicListingById(slug);
  if (!listing) notFound();

  return <PropertyDetailExperience listing={listing} />;
}
