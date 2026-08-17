import type { ReactNode } from "react";
import { SiteText } from "@/components/copy/SiteText";
import { listingSnapshot, type MlsListingDetails } from "@/lib/mlsListing";
import type { PublicPropertyListing } from "@/lib/realEstateScheduling";

function Section({
  headingKey,
  heading,
  children,
}: {
  headingKey: string;
  heading: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-6 bg-white p-6 sm:p-8">
      <SiteText k={headingKey} as="h2" className="font-heading text-xl text-tamay-primary font-semibold">
        {heading}
      </SiteText>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function ChipList({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item} className="rounded-full bg-gray-50 border border-gray-200 px-3 py-1.5 text-sm text-gray-700">
          {item}
        </li>
      ))}
    </ul>
  );
}

function FactList({ facts }: { facts: { label: string; value: string }[] }) {
  if (facts.length === 0) return null;
  return (
    <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
      {facts.map((fact) => (
        <div key={fact.label}>
          <dt className="text-gray-500">{fact.label}</dt>
          <dd className="mt-1 font-semibold text-tamay-primary">{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function schoolFacts(mls: MlsListingDetails) {
  return [
    mls.schools.elementary ? { label: "Elementary", value: mls.schools.elementary } : null,
    mls.schools.middle ? { label: "Middle", value: mls.schools.middle } : null,
    mls.schools.high ? { label: "High", value: mls.schools.high } : null,
  ].filter((item): item is { label: string; value: string } => Boolean(item));
}

export function MlsListingSections({ listing }: { listing: PublicPropertyListing }) {
  const mls = listing.mls;
  if (!mls) return null;

  const homeFacts = [
    mls.style ? { label: "Home type", value: [mls.propertyType, mls.style].filter(Boolean).join(" · ") } : { label: "Home type", value: mls.propertyType },
    mls.yearBuilt ? { label: "Year built", value: String(mls.yearBuilt) } : null,
    listing.sqft ? { label: "Living area", value: `${listing.sqft.toLocaleString()} sq ft` } : null,
    mls.acres != null ? { label: "Lot size", value: `${mls.acres} acres` } : null,
    mls.parking ? { label: "Parking", value: mls.parking } : null,
    mls.taxes ? { label: "Property taxes", value: mls.taxes } : null,
    mls.leaseTerm ? { label: "Lease", value: mls.leaseTerm } : null,
    mls.basement ? { label: "Basement", value: mls.basement } : null,
    mls.laundry ? { label: "Laundry", value: mls.laundry } : null,
  ].filter((item): item is { label: string; value: string } => Boolean(item));

  const utilityFacts = [
    mls.heat ? { label: "Heating", value: mls.heat } : null,
    mls.cooling ? { label: "Cooling", value: mls.cooling } : null,
    mls.water ? { label: "Water", value: mls.water } : null,
    mls.sewer ? { label: "Sewer", value: mls.sewer } : null,
  ].filter((item): item is { label: string; value: string } => Boolean(item));

  return (
    <>
      <Section headingKey="realEstate.property.facts" heading="Home facts">
        <FactList facts={homeFacts} />
      </Section>

      {mls.interior.length > 0 || mls.appliances.length > 0 ? (
        <Section headingKey="realEstate.property.interior" heading="Interior">
          {mls.interior.length > 0 ? <ChipList items={mls.interior} /> : null}
          {mls.appliances.length > 0 ? (
            <div className={mls.interior.length > 0 ? "mt-6" : ""}>
              <SiteText k="realEstate.property.appliances" as="p" className="text-sm font-semibold text-tamay-primary mb-3">
                Appliances
              </SiteText>
              <ChipList items={mls.appliances} />
            </div>
          ) : null}
        </Section>
      ) : null}

      {mls.exterior.length > 0 ? (
        <Section headingKey="realEstate.property.exterior" heading="Exterior & lot">
          <ChipList items={mls.exterior} />
        </Section>
      ) : null}

      {utilityFacts.length > 0 || (mls.utilitiesNotes && mls.utilitiesNotes.length > 0) ? (
        <Section headingKey="realEstate.property.utilities" heading="Heating, cooling & utilities">
          <FactList facts={utilityFacts} />
          {mls.utilitiesNotes && mls.utilitiesNotes.length > 0 ? (
            <ul className="mt-4 space-y-1 text-sm text-gray-600">
              {mls.utilitiesNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          ) : null}
        </Section>
      ) : null}

      {schoolFacts(mls).length > 0 ? (
        <Section headingKey="realEstate.property.schools" heading="Schools">
          <FactList facts={schoolFacts(mls)} />
        </Section>
      ) : null}

      {mls.nearby.length > 0 ? (
        <Section headingKey="realEstate.property.nearby" heading="Nearby">
          <ChipList items={mls.nearby} />
        </Section>
      ) : null}
    </>
  );
}

export function PropertySnapshot({ listing }: { listing: PublicPropertyListing }) {
  const stats = listingSnapshot(listing);
  if (stats.length === 0) return null;

  return (
    <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white border border-gray-200 px-4 py-3">
          <p className="text-lg sm:text-xl font-semibold text-tamay-primary leading-tight">{stat.value}</p>
          <p className="mt-1 text-xs uppercase tracking-wide text-gray-500">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
