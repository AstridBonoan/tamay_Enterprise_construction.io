export { FORMSPREE_JOB_APPLICATION } from "./formspree";

export const PRIMARY_INTEREST_OPTIONS = ["Construction", "Driving", "Both"] as const;

export const POSITION_OPTIONS = ["Employee", "Sub Contractor"] as const;

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
  role_applying_for: string;
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
    role_applying_for: "",
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
