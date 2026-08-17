/**
 * Tamay Property Perspective is shown only when Tamay has supplied approved content.
 * Do not infer construction opinions from MLS copy or listing descriptions.
 */
import { SiteText } from "@/components/copy/SiteText";

export type TamayPropertyPerspectiveContent = {
  layoutExpansion?: string;
  kitchenBathroom?: string;
  basementUnusedSpace?: string;
  exterior?: string;
  renovation?: string;
  majorSystems?: string;
  longTermMaintenance?: string;
  investorValueAdd?: string;
};

const LABELS: { key: keyof TamayPropertyPerspectiveContent; label: string }[] = [
  { key: "layoutExpansion", label: "Layout & Expansion Potential" },
  { key: "kitchenBathroom", label: "Kitchen / Bathroom Potential" },
  { key: "basementUnusedSpace", label: "Basement / Unused Space" },
  { key: "exterior", label: "Exterior Potential" },
  { key: "renovation", label: "Renovation Opportunity" },
  { key: "majorSystems", label: "Major System Considerations" },
  { key: "longTermMaintenance", label: "Long-Term Maintenance" },
  { key: "investorValueAdd", label: "Investor / Value-Add Potential" },
];

export function TamayPropertyPerspective({
  content,
}: {
  content?: TamayPropertyPerspectiveContent;
}) {
  const items = LABELS.filter((item) => content?.[item.key]);
  if (items.length === 0) return null;

  return (
    <section className="mt-6 bg-white p-6 sm:p-8">
      <SiteText k="realEstate.perspective.title" as="h2" className="font-heading text-xl text-tamay-primary font-semibold">
        Tamay Property Perspective
      </SiteText>
      <div className="mt-4 space-y-4">
        {items.map((item) => (
          <div key={item.key}>
            <SiteText k={`realEstate.perspective.${item.key}.label`} as="h3" className="font-semibold text-tamay-primary">
              {item.label}
            </SiteText>
            <SiteText k={`realEstate.perspective.${item.key}.text`} as="p" className="mt-1 text-sm text-gray-600 leading-relaxed" multiline>
              {content?.[item.key] ?? ""}
            </SiteText>
          </div>
        ))}
      </div>
    </section>
  );
}
