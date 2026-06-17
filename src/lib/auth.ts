import type { Session, User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { profileDisplayName, type UserProfile } from "@/lib/profile";

export type AuthUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
};

export type SignUpInput = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
};

function mapProfileToAuthUser(user: User, profile: UserProfile | null): AuthUser {
  const meta = user.user_metadata ?? {};
  const firstName = profile?.first_name ?? (meta.first_name as string | undefined) ?? "";
  const lastName = profile?.last_name ?? (meta.last_name as string | undefined) ?? "";
  const phone = profile?.phone ?? (meta.phone as string | undefined) ?? null;

  return {
    id: user.id,
    email: user.email ?? "",
    firstName,
    lastName,
    phone,
  };
}

export async function getSession(): Promise<Session | null> {
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export async function fetchProfile(userId: string): Promise<UserProfile | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("id, first_name, last_name, phone")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    console.warn("Failed to load profile:", error.message);
    return null;
  }

  return data;
}

export async function resolveAuthUser(user: User): Promise<AuthUser> {
  const profile = await fetchProfile(user.id);
  return mapProfileToAuthUser(user, profile);
}

export async function signInWithEmail(email: string, password: string) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  if (!data.user) throw new Error("Sign in failed.");
  return resolveAuthUser(data.user);
}

function getSiteUrl(): string {
  if (typeof window === "undefined") return "";
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${window.location.origin}${base}`;
}

export async function signUpWithEmail(input: SignUpInput) {
  const supabase = createClient();
  const phone = input.phone?.trim() || null;
  const siteUrl = getSiteUrl();

  const { data, error } = await supabase.auth.signUp({
    email: input.email.trim(),
    password: input.password,
    options: {
      data: {
        first_name: input.firstName.trim(),
        last_name: input.lastName.trim(),
        phone,
      },
      emailRedirectTo: siteUrl ? `${siteUrl}/m/login/` : undefined,
    },
  });

  if (error) throw error;
  if (!data.user) throw new Error("Account creation failed.");

  // Only write profile when we have a session — otherwise RLS blocks the insert.
  // With email confirmation on, the DB trigger creates the profile instead.
  if (data.session) {
    const { error: profileError } = await supabase.from("profiles").upsert({
      id: data.user.id,
      first_name: input.firstName.trim(),
      last_name: input.lastName.trim(),
      phone,
    });

    if (profileError) {
      console.warn("Profile save failed:", profileError.message);
    }
  }

  return {
    user: data.session
      ? await resolveAuthUser(data.user)
      : mapProfileToAuthUser(data.user, null),
    needsEmailConfirmation: !data.session,
  };
}

export async function signOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function resetPassword(email: string) {
  const supabase = createClient();
  const redirectTo =
    typeof window !== "undefined"
      ? `${window.location.origin}${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/m/login/`
      : undefined;

  const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
    redirectTo,
  });
  if (error) throw error;
}

export function authUserDisplayName(user: AuthUser): string {
  const name = profileDisplayName({ first_name: user.firstName, last_name: user.lastName });
  return name || user.email;
}
