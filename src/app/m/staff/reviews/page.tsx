"use client";

import { AccountPageShell, AccountPanel } from "@/components/account/AccountHub";
import { StaffReviewsManager } from "@/components/staff/StaffReviewsManager";
import { useRequireStaff } from "@/hooks/useRequireStaff";

export default function StaffReviewsPage() {
  const { user, loading } = useRequireStaff("/m/staff/reviews");

  if (loading || !user?.isStaff) {
    return (
      <AccountPageShell title="Manage reviews">
        <AccountPanel>
          <p className="text-sm text-gray-600">Loading...</p>
        </AccountPanel>
      </AccountPageShell>
    );
  }

  return (
    <AccountPageShell title="Manage reviews">
      <AccountPanel>
        <p className="text-sm text-gray-600 leading-relaxed mb-6">
          Approve website reviews before they appear in the review carousel. Set status to{" "}
          <span className="font-medium text-gray-800">Published</span> to show a review,{" "}
          <span className="font-medium text-gray-800">Rejected</span> to hide it, or leave it{" "}
          <span className="font-medium text-gray-800">Pending</span> until you decide.
        </p>
        <StaffReviewsManager />
      </AccountPanel>
    </AccountPageShell>
  );
}
