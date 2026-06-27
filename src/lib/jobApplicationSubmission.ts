import { createClient } from "@/lib/supabase/client";
import type { JobApplicationFormData } from "./jobApplication";

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

export async function uploadJobApplicationSignature(dataUrl: string): Promise<string> {
  const supabase = createClient();
  const fileName = `${crypto.randomUUID()}.png`;
  const path = `signatures/${fileName}`;
  const blob = dataUrlToBlob(dataUrl);

  const { error } = await supabase.storage.from(SIGNATURE_BUCKET).upload(path, blob, {
    contentType: "image/png",
    upsert: false,
  });

  if (error) throw error;
  return path;
}

export async function saveJobApplication(
  data: JobApplicationFormData,
  signaturePath: string,
  userId?: string | null,
): Promise<string> {
  const supabase = createClient();

  const { data: row, error } = await supabase
    .from("job_applications")
    .insert({
      user_id: userId ?? null,
      full_name: data.full_name.trim(),
      phone: data.phone.trim(),
      email: data.email.trim(),
      address_line1: data.address_line1.trim(),
      address_line2: data.address_line2.trim() || null,
      zip: data.zip.trim(),
      city: data.city.trim(),
      state: data.state.trim(),
      primary_interest: data.primary_interest,
      position: data.position,
      position_other: data.position_other.trim() || null,
      start_date: data.start_date,
      employment_type: data.employment_type,
      availability_details: data.availability_details.trim(),
      drivers_license: data.drivers_license,
      driving_issues: data.driving_issues,
      driving_issues_notes: data.driving_issues_notes.trim() || null,
      work_authorized: data.work_authorized,
      agree_background: data.agree_background,
      signature_storage_path: signaturePath,
      signature_date: data.signature_date,
      status: "pending",
    })
    .select("id")
    .single();

  if (error) throw error;
  return row.id as string;
}

export function jobApplicationSignatureReference(path: string): string {
  return `supabase://${SIGNATURE_BUCKET}/${path}`;
}
