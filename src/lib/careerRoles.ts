export type CareerRoleGroup = {
  id: string;
  category: string;
  items: string[];
};

export const CAREER_ROLE_GROUPS: CareerRoleGroup[] = [
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
  return `/careers-partnerships/apply?role=${encodeURIComponent(roleId)}`;
}

export function findCareerRoleGroup(roleId: string | null | undefined): CareerRoleGroup | undefined {
  if (!roleId) return undefined;
  return CAREER_ROLE_GROUPS.find((g) => g.id === roleId);
}

export const CAREER_ROLE_SELECT_OPTIONS = CAREER_ROLE_GROUPS.flatMap((group) =>
  group.items.map((item) => ({
    value: `${group.id}::${item}`,
    label: `${item} (${group.category})`,
  }))
);
