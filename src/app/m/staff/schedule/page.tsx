"use client";

import { AccountPageShell, AccountPanel } from "@/components/account/AccountHub";
import { useRequireStaff } from "@/hooks/useRequireStaff";
import { StaffScheduleManager } from "@/components/staff/StaffScheduleManager";

export default function StaffSchedulePage() {
  const { user, loading } = useRequireStaff("/m/staff/schedule");

  if (loading || !user?.isStaff) {
    return (
      <AccountPageShell title="Manage schedule">
        <AccountPanel>
          <p className="text-sm text-gray-600">Loading...</p>
        </AccountPanel>
      </AccountPageShell>
    );
  }

  return (
    <AccountPageShell title="Manage schedule">
      <AccountPanel>
        <p className="text-sm text-gray-600 leading-relaxed mb-6">
          Add or remove appointment times for consultations and property showings. Customers see these
          times on the website. When someone books, the appointment is added to the team Google Calendar
          automatically.
        </p>
        <StaffScheduleManager userId={user.id} />
      </AccountPanel>
    </AccountPageShell>
  );
}
