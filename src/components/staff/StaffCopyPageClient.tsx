"use client";

import { AccountPageShell, AccountPanel } from "@/components/account/AccountHub";
import { StaffCopyManager } from "@/components/staff/StaffCopyManager";
import { useRequireStaff } from "@/hooks/useRequireStaff";

export default function StaffCopyPageClient({
  initialCopy,
}: {
  initialCopy: Record<string, string>;
}) {
  const { user, loading } = useRequireStaff("/m/staff/copy");

  if (loading || !user?.isStaff) {
    return (
      <AccountPageShell title="Manage text">
        <AccountPanel>
          <p className="text-sm text-gray-600">Loading...</p>
        </AccountPanel>
      </AccountPageShell>
    );
  }

  return (
    <AccountPageShell
      title="Manage text"
      description="Edit website headings and section copy without a code change."
    >
      <AccountPanel>
        <p className="text-sm text-gray-600 leading-relaxed mb-6">
          The fastest way to edit is on the live site: while signed in as staff, click any dashed outline
          around a heading, paragraph, or button label, then Save. Use Original to restore the built-in
          wording. This page lists every custom text change that has already been saved.
        </p>
        <StaffCopyManager userId={user.id} initialCopy={initialCopy} />
      </AccountPanel>
    </AccountPageShell>
  );
}
