"use client";

import { useEffect, useMemo, useState } from "react";
import { PropertyPreviewCard } from "@/components/real-estate/PropertyPreviewCard";
import { getPublicPropertyListings, type ListingKind } from "@/lib/realEstateScheduling";
import { SiteText } from "@/components/copy/SiteText";

type FilterValue = "all" | ListingKind;

const FILTERS: { id: FilterValue; label: string }[] = [
  { id: "all", label: "All" },
  { id: "sale", label: "For Sale" },
  { id: "rent", label: "For Rent" },
];

export function AvailablePropertiesSection() {
  const listings = useMemo(() => getPublicPropertyListings(), []);
  const [filter, setFilter] = useState<FilterValue>("all");
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash === "houses-for-sale") setFilter("sale");
      if (hash === "houses-for-rent") setFilter("rent");
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  const visible = listings.filter((listing) => filter === "all" || listing.kind === filter);

  return (
    <section id="available-properties" className="py-16 md:py-20 bg-gray-50 scroll-mt-24">
      <span id="houses-for-sale" className="sr-only">
        Houses for sale
      </span>
      <span id="houses-for-rent" className="sr-only">
        Houses for rent
      </span>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SiteText k="realEstate.properties.title" as="h2" className="font-heading text-2xl sm:text-3xl lg:text-4xl text-tamay-primary font-semibold leading-tight">
          Explore Available Properties
        </SiteText>
        <SiteText k="realEstate.properties.intro" as="p" className="mt-3 text-gray-600 leading-relaxed max-w-2xl" multiline>
          Look beyond the listing and discover the potential behind each property.
        </SiteText>

        <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Property filters">
          {FILTERS.map((item) => {
            const active = filter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                className={`min-h-11 px-5 py-2 text-sm font-bold tracking-wide ${
                  active
                    ? "bg-tamay-primary text-white"
                    : "bg-white text-tamay-primary border border-gray-200 hover:border-tamay-primary"
                }`}
                onClick={() => setFilter(item.id)}
              >
                <SiteText k={`realEstate.properties.filter.${item.id}`}>{item.label}</SiteText>
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {visible.map((listing) => (
            <PropertyPreviewCard
              key={listing.id}
              listing={listing}
              expanded={openId === listing.id}
              onToggle={() => setOpenId((current) => (current === listing.id ? null : listing.id))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
