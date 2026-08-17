import { SITE } from "@/lib/site";

type LegacyAccountHelpProps = {
  email: string;
  onRequestActivation: () => void;
  activationLoading: boolean;
  activationSent: boolean;
};

/** For accounts created before email confirmation was disabled in Supabase. */
export function LegacyAccountHelp({
  email,
  onRequestActivation,
  activationLoading,
  activationSent,
}: LegacyAccountHelpProps) {
  const mailtoSubject = encodeURIComponent("Unlock my Tamay account");
  const mailtoBody = encodeURIComponent(
    `Hi,\n\nI cannot sign in to my Tamay account.\n\nEmail: ${email || "(your email)"}\n\nPlease unlock my account.\n\nThank you.`,
  );

  return (
    <div className="rounded-md border border-white/30 bg-white/10 px-4 py-4 text-left text-sm text-white/95 space-y-3">
      <p className="font-semibold text-white">Account needs a one-time unlock</p>
      <p className="text-white/90">
        This account was created before we turned off email confirmation. Our team can unlock it in
        Supabase, or you can create a new account with a different email.
      </p>

      <button
        type="button"
        onClick={onRequestActivation}
        disabled={activationLoading || !email.trim() || activationSent}
        className="inline-flex items-center justify-center bg-white/15 hover:bg-white/25 border border-white/40 text-white font-semibold text-sm rounded-full px-4 py-2 transition-colors disabled:opacity-60"
      >
        {activationSent
          ? "Unlock request sent — we will email you when ready"
          : activationLoading
            ? "Sending request…"
            : "Request account unlock"}
      </button>

      <p className="text-xs text-white/80">
        Or email{" "}
        <a href={`mailto:${SITE.email}?subject=${mailtoSubject}&body=${mailtoBody}`} className="underline font-semibold">
          {SITE.email}
        </a>{" "}
        or call{" "}
        <a href={SITE.phoneTel} className="underline font-semibold">
          {SITE.phone}
        </a>
        .
      </p>
    </div>
  );
}
