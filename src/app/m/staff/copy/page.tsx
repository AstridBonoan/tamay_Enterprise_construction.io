import { getResolvedSiteCopy } from "@/lib/siteCopy";
import StaffCopyPageClient from "@/components/staff/StaffCopyPageClient";

export default async function StaffCopyPage() {
  const copy = await getResolvedSiteCopy();
  return <StaffCopyPageClient initialCopy={copy} />;
}
