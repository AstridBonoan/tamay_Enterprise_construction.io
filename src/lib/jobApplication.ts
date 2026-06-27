export { FORMSPREE_JOB_APPLICATION } from "./formspree";

export const PRIMARY_INTEREST_OPTIONS = ["Construction", "Both (Construction + Driving)"] as const;

export const TRADE_ROLE_OPTIONS = [
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

export function validateJobApplication(data: JobApplicationFormData): string | null {
  if (!data.full_name.trim()) return "Full name is required.";
  if (!data.phone.trim()) return "Phone is required.";
  if (!data.email.trim()) return "Email is required.";
  if (!data.address_line1.trim()) return "Address is required.";
  if (!data.zip.trim()) return "Zip code is required.";
  if (!data.city.trim()) return "City is required.";
  if (!data.state.trim()) return "State is required.";
  if (!data.primary_interest) return "Primary interest is required.";
  if (!data.position) return "Trade / role applying for is required.";
  if (data.position === "Other" && !data.position_other.trim()) {
    return "Please specify your trade / role.";
  }
  if (!data.start_date) return "Available start date is required.";
  if (!data.employment_type) return "Employment type is required.";
  if (!data.availability_details.trim()) return "Days / hours available is required.";
  if (!data.drivers_license) return "Driver's license status is required.";
  if (!data.driving_issues) return "Driving history question is required.";
  if (!data.work_authorized) return "Work authorization is required.";
  if (!data.agree_background) return "Background check agreement is required.";
  if (!data.confirm_truth) return "Please confirm your information is accurate.";
  if (!data.signature.trim()) return "Signature is required.";
  if (!data.signature_date) return "Date is required.";
  return null;
}
