import type { ReactNode } from "react";
import { SiteText } from "@/components/copy/SiteText";
import type { MlsFact, MlsRoom } from "@/lib/mlsListing";
import type { PublicPropertyListing } from "@/lib/realEstateScheduling";

function MlsFactGrid({ facts }: { facts: MlsFact[] }) {
  if (facts.length === 0) return null;
  return (
    <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
      {facts.map((fact) => (
        <div key={`${fact.label}-${fact.value}`}>
          <dt className="font-semibold text-tamay-primary">{fact.label}</dt>
          <dd className="text-gray-600 mt-1 leading-relaxed">{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function MlsSection({
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

function RoomsTable({ rooms }: { rooms: MlsRoom[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="border-b border-gray-200 text-tamay-primary">
            <th className="py-2 pr-4 font-semibold">Room</th>
            <th className="py-2 pr-4 font-semibold">Level</th>
            <th className="py-2 font-semibold">Features</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room, index) => (
            <tr key={`${room.name}-${room.level}-${index}`} className="border-b border-gray-100 last:border-0">
              <td className="py-2.5 pr-4 text-gray-800">{room.name}</td>
              <td className="py-2.5 pr-4 text-gray-600">{room.level}</td>
              <td className="py-2.5 text-gray-600">{room.features ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function MlsListingSections({ listing }: { listing: PublicPropertyListing }) {
  const mls = listing.mls;
  if (!mls) return null;

  return (
    <>
      <MlsSection headingKey="realEstate.mls.propertyInfo" heading="Property Information">
        <MlsFactGrid facts={mls.propertyInfo} />
      </MlsSection>

      {mls.schools.length > 0 ? (
        <MlsSection headingKey="realEstate.mls.schools" heading="Schools & Neighborhood">
          <MlsFactGrid facts={mls.schools} />
        </MlsSection>
      ) : null}

      {mls.rooms.length > 0 ? (
        <MlsSection headingKey="realEstate.mls.rooms" heading="Rooms">
          <RoomsTable rooms={mls.rooms} />
        </MlsSection>
      ) : null}

      <MlsSection headingKey="realEstate.mls.interior" heading="Interior Features">
        <MlsFactGrid facts={mls.interior} />
      </MlsSection>

      <MlsSection headingKey="realEstate.mls.exterior" heading="Exterior, Lot & Parking">
        <MlsFactGrid facts={mls.exterior} />
      </MlsSection>

      <MlsSection headingKey="realEstate.mls.utilities" heading="Utility Information">
        <MlsFactGrid facts={mls.utilities} />
      </MlsSection>

      <MlsSection headingKey="realEstate.mls.listingInfo" heading="Listing Information">
        <MlsFactGrid facts={mls.listingInfo} />
        <SiteText
          k="realEstate.mls.disclaimer"
          as="p"
          className="mt-6 text-xs text-gray-500 leading-relaxed"
          multiline
        >
          Listing information has been compiled from various sources and may not be completely accurate. Details that influence a decision to buy, rent, or lease should be independently verified.
        </SiteText>
      </MlsSection>
    </>
  );
}
