import { ConstructionApprovedImage } from "@/components/construction/ConstructionApprovedImage";

/**
 * Approved process graphic already includes the five stages and supporting messaging.
 * Show full composition; keep an accessible heading for screen readers / SEO.
 */
export function ConstructionProcessSection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="sr-only">A Clear Process. A Better Experience.</h2>
        <ConstructionApprovedImage
          slot="construction.approvedProcess"
          alt="Our Construction Process — Consultation, Planning and Proposal, Build and Coordinate, Quality Checks, Final Walkthrough and Support"
          width={1536}
          height={1024}
        />
      </div>
    </section>
  );
}
