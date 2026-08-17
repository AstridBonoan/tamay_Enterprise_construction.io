import { getResolvedSiteMedia } from "@/lib/siteImages";
import StaffImagesPageClient from "@/components/staff/StaffImagesPageClient";

export default async function StaffImagesPage() {
  const media = await getResolvedSiteMedia();
  return <StaffImagesPageClient initialOverrides={media.overrides} />;
}
