import type { Session, User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { getAuthLoginUrl } from "@/lib/authUrls";
import { profileDisplayName, type UserProfile } from "@/lib/profile";

/** Default destination after sign-up or sign-in when no ?r= query is present. */
export const AUTH_DEFAULT_REDIRECT = "/";

export type AuthUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  isStaff: boolean;
};

export type SignUpInput = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
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
    isStaff: profile?.is_staff ?? false,
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
    .select("id, first_name, last_name, phone, is_staff")
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


export function isEmailNotConfirmedError(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const message =
    "message" in error && typeof error.message === "string" ? error.message.toLowerCase() : "";
  return message.includes("email not confirmed") || message.includes("not confirmed");
}

export type SignUpResult =
  | { status: "success"; user: AuthUser }
  | { status: "already_exists" };

function isExistingAccountError(error: { message?: string; code?: string }): boolean {
  const message = error.message?.toLowerCase() ?? "";
  return (
    error.code === "user_already_exists" ||
    message.includes("already registered") ||
    message.includes("already been registered") ||
    message.includes("user already exists")
  );
}

function isExistingAccountResponse(user: User): boolean {
  return Array.isArray(user.identities) && user.identities.length === 0;
}

export async function signUpWithEmail(input: SignUpInput): Promise<SignUpResult> {
  const supabase = createClient();
  const email = input.email.trim();
  const firstName = input.firstName.trim();
  const lastName = input.lastName.trim();

  const { data, error } = await supabase.auth.signUp({
    email,
    password: input.password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  });

  if (error) {
    if (isExistingAccountError(error)) {
      return { status: "already_exists" };
    }
    throw error;
  }

  if (!data.user) throw new Error("Account creation failed.");

  if (isExistingAccountResponse(data.user)) {
    return { status: "already_exists" };
  }

  let user = data.user;
  let session = data.session;

  if (!session) {
    const signIn = await supabase.auth.signInWithPassword({
      email,
      password: input.password,
    });
    if (signIn.error) throw signIn.error;
    user = signIn.data.user ?? user;
    session = signIn.data.session;
  }

  if (session) {
    const { error: profileError } = await supabase.from("profiles").upsert({
      id: user.id,
      first_name: firstName,
      last_name: lastName,
    });

    if (profileError) {
      console.warn("Profile save failed:", profileError.message);
    }

    return {
      status: "success",
      user: await resolveAuthUser(user),
    };
  }

  throw new Error("Account created but sign-in failed. Try signing in from the login page.");
}

export async function signOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function resetPassword(email: string) {
  const supabase = createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
    redirectTo: getAuthLoginUrl(),
  });
  if (error) throw error;
}

export function authUserDisplayName(user: AuthUser): string {
  const name = profileDisplayName({ first_name: user.firstName, last_name: user.lastName });
  return name || user.email;
}

export type UpdateProfileInput = {
  firstName: string;
  lastName: string;
  email?: string;
};

export type UpdateProfileResult = {
  user: AuthUser;
  emailChangePending?: boolean;
};

export async function savePhoneToProfile(userId: string, phone: string) {
  const supabase = createClient();
  const trimmed = phone.trim();
  if (!trimmed) return;

  const { error: profileError } = await supabase
    .from("profiles")
    .update({ phone: trimmed, updated_at: new Date().toISOString() })
    .eq("id", userId);

  if (profileError) throw profileError;

  const { error: metaError } = await supabase.auth.updateUser({
    data: { phone: trimmed },
  });
  if (metaError) throw metaError;
}

export async function updateProfile(
  userId: string,
  currentEmail: string,
  input: UpdateProfileInput,
): Promise<UpdateProfileResult> {
  const supabase = createClient();
  const firstName = input.firstName.trim();
  const lastName = input.lastName.trim();
  const nextEmail = input.email?.trim();

  const { error: profileError } = await supabase
    .from("profiles")
    .update({
      first_name: firstName,
      last_name: lastName,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId);

  if (profileError) throw profileError;

  let emailChangePending = false;

  const metadataUpdate = {
    data: {
      first_name: firstName,
      last_name: lastName,
    },
  };

  if (nextEmail && nextEmail !== currentEmail) {
    const { error: emailError } = await supabase.auth.updateUser({
      ...metadataUpdate,
      email: nextEmail,
    });
    if (emailError) throw emailError;
    emailChangePending = true;
  } else {
    const { error: metaError } = await supabase.auth.updateUser(metadataUpdate);
    if (metaError) throw metaError;
  }

  const { data } = await supabase.auth.getUser();
  if (!data.user) throw new Error("Could not refresh account.");

  return {
    user: await resolveAuthUser(data.user),
    emailChangePending,
  };
}
