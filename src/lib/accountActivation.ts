import { FORMSPREE_CONTACT } from "@/lib/formspree";

type AccountActivationRequest = {
  email: string;
  firstName?: string;
  lastName?: string;
  source: "signup" | "login";
};

/** Notify Tamay when a user cannot receive Supabase confirmation emails. */
export async function requestAccountActivation(input: AccountActivationRequest): Promise<void> {
  const name = [input.firstName, input.lastName].filter(Boolean).join(" ").trim() || "Not provided";
  const body = new FormData();
  body.append("form_name", "Tamay - Account Activation Request");
  body.append("_subject", `Activate Tamay account: ${input.email}`);
  body.append("email", input.email);
  body.append("name", name);
  body.append(
    "message",
    [
      "A customer could not complete email confirmation for their Tamay website account.",
      "",
      `Email: ${input.email}`,
      `Name: ${name}`,
      `Requested from: ${input.source === "signup" ? "Create account page" : "Sign in page"}`,
      "",
      "Action: Supabase Dashboard → Authentication → Users → select this user → Confirm user.",
      "Or run auth-email-setup.sql manual confirm steps.",
    ].join("\n"),
  );

  const response = await fetch(FORMSPREE_CONTACT, {
    method: "POST",
    body,
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error("Could not send activation request. Please call or email us directly.");
  }
}

export function formatAuthError(error: unknown): string {
  if (!(error instanceof Error)) return "Something went wrong. Please try again.";

  const message = error.message.toLowerCase();
  if (message.includes("rate limit") || message.includes("too many requests")) {
    return "Too many email attempts. Wait a few minutes, then try Resend again.";
  }
  if (message.includes("email not confirmed") || message.includes("not confirmed")) {
    return "Unable to sign in with this account. Please contact Tamay Enterprises for help.";
  }

  return error.message;
}
