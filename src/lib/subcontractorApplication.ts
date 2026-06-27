export { TRADE_ROLE_OPTIONS } from "./jobApplication";

export const BUSINESS_STRUCTURE_OPTIONS = [
  "Sole Proprietor",
  "LLC",
  "Corporation",
  "Partnership",
  "Other",
] as const;

export const ENGAGEMENT_TYPE_OPTIONS = [
  "Project-based work",
  "Ongoing partnership",
  "Both",
] as const;

export const SUBCONTRACTOR_APPLICATION_STEPS = [
  { id: "contact", label: "Contact", title: "1) Contact & Business Information" },
  { id: "trade", label: "Trade", title: "2) Trade & Capacity" },
  { id: "insurance", label: "Insurance", title: "3) Insurance & Licensing" },
  { id: "documents", label: "Documents", title: "4) Documents" },
  { id: "eligibility", label: "Eligibility", title: "5) Work Eligibility" },
  { id: "confirm", label: "Confirm", title: "6) Confirmation" },
] as const;

export type SubcontractorApplicationFormData = {
  contact_name: string;
  company_name: string;
  phone: string;
  email: string;
  address_line1: string;
  address_line2: string;
  zip: string;
  city: string;
  state: string;
  business_structure: string;
  trade_specialty: string;
  trade_other: string;
  years_in_business: string;
  service_area: string;
  crew_size: string;
  engagement_type: string;
  available_start_date: string;
  availability_details: string;
  general_liability_insurance: string;
  workers_comp_insurance: string;
  licensed_trade: string;
  license_number: string;
  insurance_cert_file: File | null;
  portfolio_file: File | null;
  work_authorized: string;
  agree_background: string;
  confirm_truth: boolean;
  signature_data_url: string;
  signature_date: string;
};

export function emptySubcontractorApplicationForm(stateDefault = "CT"): SubcontractorApplicationFormData {
  return {
    contact_name: "",
    company_name: "",
    phone: "",
    email: "",
    address_line1: "",
    address_line2: "",
    zip: "",
    city: "",
    state: stateDefault,
    business_structure: "",
    trade_specialty: "",
    trade_other: "",
    years_in_business: "",
    service_area: "",
    crew_size: "",
    engagement_type: "",
    available_start_date: "",
    availability_details: "",
    general_liability_insurance: "",
    workers_comp_insurance: "",
    licensed_trade: "",
    license_number: "",
    insurance_cert_file: null,
    portfolio_file: null,
    work_authorized: "",
    agree_background: "",
    confirm_truth: false,
    signature_data_url: "",
    signature_date: new Date().toISOString().slice(0, 10),
  };
}

export function validateSubcontractorApplicationStep(
  step: number,
  data: SubcontractorApplicationFormData,
): string | null {
  switch (step) {
    case 0:
      if (!data.contact_name.trim()) return "Contact name is required.";
      if (!data.phone.trim()) return "Phone is required.";
      if (!data.email.trim()) return "Email is required.";
      if (!data.address_line1.trim()) return "Business address is required.";
      if (!data.zip.trim()) return "Zip code is required.";
      if (!data.city.trim()) return "City is required.";
      if (!data.state.trim()) return "State is required.";
      if (!data.business_structure) return "Business structure is required.";
      return null;
    case 1:
      if (!data.trade_specialty) return "Primary trade / specialty is required.";
      if (data.trade_specialty === "Other" && !data.trade_other.trim()) {
        return "Please specify your trade / specialty.";
      }
      if (!data.years_in_business.trim()) return "Years in business is required.";
      if (!data.service_area.trim()) return "Service area is required.";
      if (!data.crew_size.trim()) return "Typical crew size is required.";
      if (!data.engagement_type) return "Preferred engagement type is required.";
      if (!data.available_start_date) return "Available start date is required.";
      if (!data.availability_details.trim()) return "Availability details are required.";
      return null;
    case 2:
      if (!data.general_liability_insurance) return "General liability insurance status is required.";
      if (!data.workers_comp_insurance) return "Workers' compensation insurance status is required.";
      if (!data.licensed_trade) return "Trade licensing status is required.";
      return null;
    case 3:
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

export function validateSubcontractorApplication(data: SubcontractorApplicationFormData): string | null {
  for (let step = 0; step < SUBCONTRACTOR_APPLICATION_STEPS.length; step += 1) {
    const error = validateSubcontractorApplicationStep(step, data);
    if (error) return error;
  }
  return null;
}
