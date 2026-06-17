"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/components/auth/AuthProvider";

export function useRequireAuth(redirectPath: string) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace(`/m/login?r=${encodeURIComponent(redirectPath)}`);
    }
  }, [loading, user, router, redirectPath]);

  return { user, loading };
}
