import { ConstructionApprovedImage } from "@/components/construction/ConstructionApprovedImage";

export function CoordinatedTeamSection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl">
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-tamay-primary font-semibold leading-tight">
            One Project. One Coordinated Team.
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            A renovation may involve planning, materials, framing, electrical, plumbing, drywall, flooring,
            painting, scheduling, and final completion.
          </p>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Tamay coordinates the project so the client does not have to manage multiple trades and companies
            independently.
          </p>
        </div>
        <div className="mt-10">
          <ConstructionApprovedImage
            slot="construction.approvedCoordinatedTeam"
            alt="Tamay team coordinating materials, measurements, and project progress on a residential jobsite"
            width={1672}
            height={941}
          />
        </div>
      </div>
    </section>
  );
}
