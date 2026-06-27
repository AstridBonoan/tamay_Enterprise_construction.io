export type CareerRoleGroup = {
  id: string;
  category: string;
  items: string[];
  applyHref?: string;
  applyLabel?: string;
};

export const CAREER_ROLE_GROUPS: CareerRoleGroup[] = [
  {
    id: "career-opportunities",
    category: "Career Opportunities",
    items: [
      "Entry-level and experienced construction roles",
      "Office, sales, and project coordination openings",
      "Long-term employment with growth paths",
    ],
  },
  {
    id: "subcontractor-partnerships",
    category: "Subcontractor Partnerships",
    items: [
      "Licensed trade contractors and specialty crews",
      "Project-based or ongoing partnership opportunities",
      "Professionals with insurance and proper documentation",
    ],
    applyHref: "/careers-partnerships/subcontractor-apply",
    applyLabel: "Apply as Subcontractor",
  },
  {
    id: "leadership-field-management",
    category: "Leadership & Field Management",
    items: ["Crew Leads / Foremen", "Project Coordinators"],
  },
  {
    id: "renovation-specialists",
    category: "Renovation Specialists",
    items: ["Kitchen Renovation Specialists", "Bathroom Renovation Specialists"],
  },
  {
    id: "sales-growth",
    category: "Sales & Growth Opportunities",
    items: ["Construction Sales Representatives", "Sales-Minded Field Technicians"],
  },
  {
    id: "licensed-skilled-trades",
    category: "Licensed & Skilled Trades",
    items: [
      "Electricians (Licensed or Experienced)",
      "Plumbers (Licensed or Experienced)",
      "HVAC Technicians",
    ],
  },
  {
    id: "field-trade-positions",
    category: "Field & Trade Positions",
    items: [
      "General Laborers",
      "Painters (Interior & Exterior)",
      "Drywall Installers / Finishers",
      "Flooring Installers (Hardwood, LVP, Tile, Laminate)",
      "Tile Installers",
      "Finish & Framing Carpenters",
    ],
  },
];

export function careerApplyHref(roleId: string): string {
  const group = findCareerRoleGroup(roleId);
  if (group?.applyHref) return group.applyHref;
  return `/careers-partnerships/apply?role=${encodeURIComponent(roleId)}`;
}

export function careerApplyLabel(group: CareerRoleGroup): string {
  return group.applyLabel ?? "Join Our Team";
}

export function findCareerRoleGroup(roleId: string | null | undefined): CareerRoleGroup | undefined {
  if (!roleId) return undefined;
  return CAREER_ROLE_GROUPS.find((g) => g.id === roleId);
}
