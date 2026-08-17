"use client";

import { AccountPageShell, AccountPanel } from "@/components/account/AccountHub";
import { StaffImagesManager } from "@/components/staff/StaffImagesManager";
import { useRequireStaff } from "@/hooks/useRequireStaff";
import type { SiteImageOverride } from "@/lib/siteImages";

export default function StaffImagesPage({
  initialOverrides,
}: {
  initialOverrides: Record<string, SiteImageOverride>;
}) {
  const { user, loading } = useRequireStaff("/m/staff/images");

  if (loading || !user?.isStaff) {
    return (
      <AccountPageShell title="Manage photos">
        <AccountPanel>
          <p className="text-sm text-gray-600">Loading...</p>
        </AccountPanel>
      </AccountPageShell>
    );
  }

  return (
    <AccountPageShell
      title="Manage photos"
      description="Replace website photos without a code change. JPG, PNG, WEBP, or GIF up to 5 MB."
    >
      <AccountPanel>
        <p className="text-sm text-gray-600 leading-relaxed mb-6">
          Choose a section, then replace a photo. You can also open any public page while signed in as staff
          and click <strong>Replace photo</strong> on the image itself — including property listings. Extra
          listing photos can be added from the property card or this page.
        </p>
        <StaffImagesManager userId={user.id} initialOverrides={initialOverrides} />
      </AccountPanel>
    </AccountPageShell>
  );
}
