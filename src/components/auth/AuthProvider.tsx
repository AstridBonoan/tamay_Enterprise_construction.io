"use client";

import type { User } from "@supabase/supabase-js";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  resolveAuthUser,
  signOut as authSignOut,
  type AuthUser,
} from "@/lib/auth";
import { createClient } from "@/lib/supabase/client";
import { syncTawkVisitor, clearTawkVisitorSync } from "@/lib/tawk-identity";

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

async function loadAuthUser(user: User | null): Promise<AuthUser | null> {
  if (!user) return null;
  return resolveAuthUser(user);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const applyUser = useCallback(async (supabaseUser: User | null) => {
    const next = await loadAuthUser(supabaseUser);
    setUser(next);

    if (next) {
      syncTawkVisitor({
        name: [next.firstName, next.lastName].filter(Boolean).join(" ").trim() || undefined,
        email: next.email,
        phone: next.phone ?? undefined,
        userId: next.id,
      });
    } else {
      clearTawkVisitorSync();
    }
  }, []);

  const refreshUser = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    await applyUser(data.user);
  }, [applyUser]);

  useEffect(() => {
    const supabase = createClient();
    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      void applyUser(data.session?.user ?? null).finally(() => {
        if (active) setLoading(false);
      });
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      void applyUser(session?.user ?? null);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [applyUser]);

  const signOut = useCallback(async () => {
    await authSignOut();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, loading, signOut, refreshUser }),
    [user, loading, signOut, refreshUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
