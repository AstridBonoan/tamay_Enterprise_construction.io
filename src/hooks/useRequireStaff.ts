"use client";

import { useEffect } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { navigateToSitePath } from "@/lib/paths";

export function useRequireStaff(redirectPath: string) {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigateToSitePath(`/m/login?r=${encodeURIComponent(redirectPath)}`);
      return;
    }
    if (!user.isStaff) {
      navigateToSitePath("/");
    }
  }, [loading, user, redirectPath]);

  return { user, loading, isStaff: Boolean(user?.isStaff) };
}
