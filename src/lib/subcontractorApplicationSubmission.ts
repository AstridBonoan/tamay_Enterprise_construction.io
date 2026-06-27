import { createClient } from "@/lib/supabase/client";
import type { SubcontractorApplicationFormData } from "./subcontractorApplication";

const SIGNATURE_BUCKET = "job-application-signatures";

function dataUrlToBlob(dataUrl: string): Blob {
  const [header, base64] = dataUrl.split(",");
  const mime = header.match(/:(.*?);/)?.[1] ?? "image/png";
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new Blob([bytes], { type: mime });
}

export async function uploadSubcontractorApplicationSignature(dataUrl: string): Promise<string> {
  const supabase = createClient();
  const fileName = `${crypto.randomUUID()}.png`;
  const path = `subcontractor-signatures/${fileName}`;
  const blob = dataUrlToBlob(dataUrl);

  const { error } = await supabase.storage.from(SIGNATURE_BUCKET).upload(path, blob, {
    contentType: "image/png",
    upsert: false,
  });

  if (error) throw error;
  return path;
}

export async function saveSubcontractorApplication(
  data: SubcontractorApplicationFormData,
  signaturePath: string,
  userId?: string | null,
): Promise<string> {
  const supabase = createClient();
  const applicationId = crypto.randomUUID();

  const { error } = await supabase.from("subcontractor_applications").insert({
    id: applicationId,
    user_id: userId ?? null,
    contact_name: data.contact_name.trim(),
    company_name: data.company_name.trim() || null,
    phone: data.phone.trim(),
    email: data.email.trim(),
    address_line1: data.address_line1.trim(),
    address_line2: data.address_line2.trim() || null,
    zip: data.zip.trim(),
    city: data.city.trim(),
    state: data.state.trim(),
    business_structure: data.business_structure,
    trade_specialty: data.trade_specialty,
    trade_other: data.trade_other.trim() || null,
    years_in_business: data.years_in_business.trim(),
    service_area: data.service_area.trim(),
    crew_size: data.crew_size.trim(),
    engagement_type: data.engagement_type,
    available_start_date: data.available_start_date,
    availability_details: data.availability_details.trim(),
    general_liability_insurance: data.general_liability_insurance,
    workers_comp_insurance: data.workers_comp_insurance,
    licensed_trade: data.licensed_trade,
    license_number: data.license_number.trim() || null,
    work_authorized: data.work_authorized,
    agree_background: data.agree_background,
    signature_storage_path: signaturePath,
    signature_date: data.signature_date,
    status: "pending",
  });

  if (error) throw error;
  return applicationId;
}

export function subcontractorApplicationSignatureReference(path: string): string {
  return `supabase://${SIGNATURE_BUCKET}/${path}`;
}
