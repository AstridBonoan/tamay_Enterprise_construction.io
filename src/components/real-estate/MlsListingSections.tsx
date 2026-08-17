import type { ReactNode } from "react";
import { SiteText } from "@/components/copy/SiteText";
import { listingCopyKey } from "@/lib/siteCopy";
import { listingSnapshot, type MlsListingDetails } from "@/lib/mlsListing";
import type { PublicPropertyListing } from "@/lib/realEstateScheduling";

type Fact = { id: string; label: string; value: string };

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

function ChipList({
  items,
  listingId,
  field,
}: {
  items: string[];
  listingId: string;
  field: string;
}) {
  if (items.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item, index) => (
        <li
          key={`${field}-${index}`}
          className="rounded-full bg-gray-50 border border-gray-200 px-3 py-1.5 text-sm text-gray-700"
        >
          <SiteText k={listingCopyKey(listingId, `${field}.${index + 1}`)}>{item}</SiteText>
        </li>
      ))}
    </ul>
  );
}

function FactList({ facts, listingId, group }: { facts: Fact[]; listingId: string; group: string }) {
  if (facts.length === 0) return null;
  return (
    <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
      {facts.map((fact) => (
        <div key={fact.id}>
          <dt className="text-gray-500">
            <SiteText k={listingCopyKey(listingId, `${group}.${fact.id}.label`)}>{fact.label}</SiteText>
          </dt>
          <dd className="mt-1 font-semibold text-tamay-primary">
            <SiteText k={listingCopyKey(listingId, `${group}.${fact.id}.value`)}>{fact.value}</SiteText>
          </dd>
        </div>
      ))}
    </dl>
  );
}

function schoolFacts(mls: MlsListingDetails): Fact[] {
  return [
    mls.schools.elementary ? { id: "elementary", label: "Elementary", value: mls.schools.elementary } : null,
    mls.schools.middle ? { id: "middle", label: "Middle", value: mls.schools.middle } : null,
    mls.schools.high ? { id: "high", label: "High", value: mls.schools.high } : null,
  ].filter((item): item is Fact => Boolean(item));
}

export function MlsListingSections({ listing }: { listing: PublicPropertyListing }) {
  const mls = listing.mls;
  if (!mls) return null;

  const homeFacts: Fact[] = [
    {
      id: "homeType",
      label: "Home type",
      value: mls.style ? [mls.propertyType, mls.style].filter(Boolean).join(" · ") : mls.propertyType,
    },
    mls.yearBuilt ? { id: "yearBuilt", label: "Year built", value: String(mls.yearBuilt) } : null,
    listing.sqft ? { id: "livingArea", label: "Living area", value: `${listing.sqft.toLocaleString()} sq ft` } : null,
    mls.acres != null ? { id: "lotSize", label: "Lot size", value: `${mls.acres} acres` } : null,
    mls.parking ? { id: "parking", label: "Parking", value: mls.parking } : null,
    mls.taxes ? { id: "taxes", label: "Property taxes", value: mls.taxes } : null,
    mls.leaseTerm ? { id: "lease", label: "Lease", value: mls.leaseTerm } : null,
    mls.basement ? { id: "basement", label: "Basement", value: mls.basement } : null,
    mls.laundry ? { id: "laundry", label: "Laundry", value: mls.laundry } : null,
  ].filter((item): item is Fact => Boolean(item));

  const utilityFacts: Fact[] = [
    mls.heat ? { id: "heat", label: "Heating", value: mls.heat } : null,
    mls.cooling ? { id: "cooling", label: "Cooling", value: mls.cooling } : null,
    mls.water ? { id: "water", label: "Water", value: mls.water } : null,
    mls.sewer ? { id: "sewer", label: "Sewer", value: mls.sewer } : null,
  ].filter((item): item is Fact => Boolean(item));

  return (
    <>
      <Section headingKey="realEstate.property.facts" heading="Home facts">
        <FactList facts={homeFacts} listingId={listing.id} group="facts" />
      </Section>

      {mls.interior.length > 0 || mls.appliances.length > 0 ? (
        <Section headingKey="realEstate.property.interior" heading="Interior">
          {mls.interior.length > 0 ? <ChipList items={mls.interior} listingId={listing.id} field="interior" /> : null}
          {mls.appliances.length > 0 ? (
            <div className={mls.interior.length > 0 ? "mt-6" : ""}>
              <SiteText k="realEstate.property.appliances" as="p" className="text-sm font-semibold text-tamay-primary mb-3">
                Appliances
              </SiteText>
              <ChipList items={mls.appliances} listingId={listing.id} field="appliances" />
            </div>
          ) : null}
        </Section>
      ) : null}

      {mls.exterior.length > 0 ? (
        <Section headingKey="realEstate.property.exterior" heading="Exterior & lot">
          <ChipList items={mls.exterior} listingId={listing.id} field="exterior" />
        </Section>
      ) : null}

      {utilityFacts.length > 0 || (mls.utilitiesNotes && mls.utilitiesNotes.length > 0) ? (
        <Section headingKey="realEstate.property.utilities" heading="Heating, cooling & utilities">
          <FactList facts={utilityFacts} listingId={listing.id} group="utilities" />
          {mls.utilitiesNotes && mls.utilitiesNotes.length > 0 ? (
            <ul className="mt-4 space-y-1 text-sm text-gray-600">
              {mls.utilitiesNotes.map((note, index) => (
                <SiteText
                  k={listingCopyKey(listing.id, `utilities.note${index + 1}`)}
                  as="li"
                  key={`utilities-note-${index}`}
                >
                  {note}
                </SiteText>
              ))}
            </ul>
          ) : null}
        </Section>
      ) : null}

      {schoolFacts(mls).length > 0 ? (
        <Section headingKey="realEstate.property.schools" heading="Schools">
          <FactList facts={schoolFacts(mls)} listingId={listing.id} group="schools" />
        </Section>
      ) : null}

      {mls.nearby.length > 0 ? (
        <Section headingKey="realEstate.property.nearby" heading="Nearby">
          <ChipList items={mls.nearby} listingId={listing.id} field="nearby" />
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
        <div key={stat.id} className="bg-white border border-gray-200 px-4 py-3">
          <SiteText
            k={listingCopyKey(listing.id, `snapshot.${stat.id}.value`)}
            as="p"
            className="text-lg sm:text-xl font-semibold text-tamay-primary leading-tight"
          >
            {stat.value}
          </SiteText>
          <SiteText
            k={listingCopyKey(listing.id, `snapshot.${stat.id}.label`)}
            as="p"
            className="mt-1 text-xs uppercase tracking-wide text-gray-500"
          >
            {stat.label}
          </SiteText>
        </div>
      ))}
    </div>
  );
}
