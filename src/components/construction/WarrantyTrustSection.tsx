import { ConstructionApprovedImage } from "@/components/construction/ConstructionApprovedImage";

/**
 * Approved warranty graphic already presents the primary warranty/trust message.
 * Keep a short accessible heading for screen readers / SEO.
 */
export function WarrantyTrustSection() {
  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="sr-only">7-Year Workmanship Warranty — New Kitchens & New Bathrooms</h2>
        <ConstructionApprovedImage
          slot="construction.approvedWarranty"
          alt="Warranty and Trust — 7-Year Workmanship for New Kitchens and Baths, fully insured professional team"
          width={1672}
          height={941}
        />
      </div>
    </section>
  );
}
