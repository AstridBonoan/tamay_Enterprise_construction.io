"use client";

import { useEffect } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { navigateToSitePath } from "@/lib/paths";

export function useRequireAuth(redirectPath: string) {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigateToSitePath(`/m/login?r=${encodeURIComponent(redirectPath)}`);
    }
  }, [loading, user, redirectPath]);

  return { user, loading };
}
