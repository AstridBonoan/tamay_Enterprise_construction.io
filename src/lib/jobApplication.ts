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
  signature_data_url: string;
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
    signature_data_url: "",
    signature_date: new Date().toISOString().slice(0, 10),
  };
}

export function validateJobApplicationStep(step: number, data: JobApplicationFormData): string | null {
  switch (step) {
    case 0:
      if (!data.full_name.trim()) return "Full name is required.";
      if (!data.phone.trim()) return "Phone is required.";
      if (!data.email.trim()) return "Email is required.";
      if (!data.address_line1.trim()) return "Address is required.";
      if (!data.zip.trim()) return "Zip code is required.";
      if (!data.city.trim()) return "City is required.";
      if (!data.state.trim()) return "State is required.";
      return null;
    case 1:
      if (!data.primary_interest) return "Primary interest is required.";
      if (!data.position) return "Trade / role applying for is required.";
      if (data.position === "Other" && !data.position_other.trim()) {
        return "Please specify your trade / role.";
      }
      if (!data.start_date) return "Available start date is required.";
      if (!data.employment_type) return "Employment type is required.";
      if (!data.availability_details.trim()) return "Days / hours available is required.";
      return null;
    case 2:
      return null;
    case 3:
      if (!data.drivers_license) return "Driver's license status is required.";
      if (!data.driving_issues) return "Driving history question is required.";
      return null;
    case 4:
      if (!data.work_authorized) return "Work authorization is required.";
      if (!data.agree_background) return "Background check agreement is required.";
      return null;
    case 5:
      if (!data.confirm_truth) return "Please confirm your information is accurate.";
      if (!data.signature_data_url) return "Please sign in the signature box.";
      if (!data.signature_date) return "Date is required.";
      return null;
    default:
      return null;
  }
}

export function validateJobApplication(data: JobApplicationFormData): string | null {
  for (let step = 0; step < JOB_APPLICATION_STEPS.length; step += 1) {
    const error = validateJobApplicationStep(step, data);
    if (error) return error;
  }
  return null;
}
