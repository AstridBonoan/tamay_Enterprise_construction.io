import { CAREER_ROLE_GROUPS } from "./careerRoles";

export const FORMSPREE_JOB_APPLICATION = "https://formspree.io/f/mqedjwda";

export const PRIMARY_INTEREST_OPTIONS = ["Construction", "Both (Construction + Driving)"] as const;

export const POSITION_OPTIONS = [
  "General Construction Worker",
  "Helper / General Labor",
  "Carpenter",
  "Painter",
  "Drywall",
  "Tile Installer",
  "Flooring Installer",
  "Plumber",
  "Electrician",
  "HVAC Technician",
  "Handyman",
  "Crew Lead",
  "Foreman",
  "Project Coordinator",
  "Kitchen Renovation Specialist",
  "Bathroom Renovation Specialist",
  "Construction Sales Representative",
  "Sales-Minded Field Technician",
  "Other",
] as const;

const ITEM_TO_POSITION: Record<string, string> = {
  "Crew Leads / Foremen": "Crew Lead",
  "Project Coordinators": "Project Coordinator",
  "Kitchen Renovation Specialists": "Kitchen Renovation Specialist",
  "Bathroom Renovation Specialists": "Bathroom Renovation Specialist",
  "Construction Sales Representatives": "Construction Sales Representative",
  "Sales-Minded Field Technicians": "Sales-Minded Field Technician",
  "Electricians (Licensed or Experienced)": "Electrician",
  "Plumbers (Licensed or Experienced)": "Plumber",
  "HVAC Technicians": "HVAC Technician",
  "General Laborers": "Helper / General Labor",
  "Painters (Interior & Exterior)": "Painter",
  "Drywall Installers / Finishers": "Drywall",
  "Flooring Installers (Hardwood, LVP, Tile, Laminate)": "Flooring Installer",
  "Tile Installers": "Tile Installer",
  "Finish & Framing Carpenters": "Carpenter",
};

export function defaultPositionFromRoleId(roleId: string | null): string {
  if (!roleId) return "";
  const group = CAREER_ROLE_GROUPS.find((g) => g.id === roleId);
  if (!group || group.items.length === 0) return "";
  const mapped = ITEM_TO_POSITION[group.items[0]];
  return mapped ?? "";
}

export const JOB_APPLICATION_STEPS = [
  { id: "personal", label: "Personal", title: "1) Personal Information" },
  { id: "position", label: "Position", title: "2) Position & Availability" },
  { id: "resume", label: "Resume", title: "3) Resume Upload" },
  { id: "driving", label: "Driving", title: "4) Driving" },
  { id: "eligibility", label: "Eligibility", title: "5) Work Eligibility" },
  { id: "confirm", label: "Confirm", title: "6) Confirmation" },
] as const;

export type JobApplicationFormData = {
  full_name: string;
  phone: string;
  email: string;
  address_line1: string;
  address_line2: string;
  zip: string;
  city: string;
  state: string;
  primary_interest: string;
  position: string;
  position_other: string;
  start_date: string;
  employment_type: string;
  availability_details: string;
  resume_file: File | null;
  drivers_license: string;
  driving_issues: string;
  driving_issues_notes: string;
  work_authorized: string;
  agree_background: string;
  confirm_truth: boolean;
  signature: string;
  signature_date: string;
};

export function emptyJobApplicationForm(stateDefault = "CT"): JobApplicationFormData {
  return {
    full_name: "",
    phone: "",
    email: "",
    address_line1: "",
    address_line2: "",
    zip: "",
    city: "",
    state: stateDefault,
    primary_interest: "",
    position: "",
    position_other: "",
    start_date: "",
    employment_type: "",
    availability_details: "",
    resume_file: null,
    drivers_license: "",
    driving_issues: "",
    driving_issues_notes: "",
    work_authorized: "",
    agree_background: "",
    confirm_truth: false,
    signature: "",
    signature_date: new Date().toISOString().slice(0, 10),
  };
}
