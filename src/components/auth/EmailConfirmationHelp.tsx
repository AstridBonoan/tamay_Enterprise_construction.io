import { SITE } from "@/lib/site";

type EmailConfirmationHelpProps = {
  email: string;
  onResend: () => void;
  resendLoading: boolean;
  onRequestActivation: () => void;
  activationLoading: boolean;
  activationSent: boolean;
};

export function EmailConfirmationHelp({
  email,
  onResend,
  resendLoading,
  onRequestActivation,
  activationLoading,
  activationSent,
}: EmailConfirmationHelpProps) {
  const mailtoSubject = encodeURIComponent("Activate my Tamay account");
  const mailtoBody = encodeURIComponent(
    `Hi,\n\nI created an account but did not receive the confirmation email.\n\nEmail used: ${email || "(your email)"}\n\nPlease activate my account.\n\nThank you.`,
  );

  return (
    <div className="rounded-md border border-white/30 bg-white/10 px-4 py-4 text-left text-sm text-white/95 space-y-3">
      <p className="font-semibold text-white">Didn&apos;t get the confirmation email?</p>
      <ul className="list-disc pl-5 space-y-1 text-white/90">
        <li>Check spam and promotions folders (sender may be Supabase).</li>
        <li>Wait a few minutes, then try Resend below.</li>
        <li>Gmail and Yahoo often block Supabase&apos;s default mail — use Request activation and we&apos;ll enable your account manually.</li>
      </ul>

      <div className="flex flex-col gap-2 pt-1">
        <button
          type="button"
          onClick={onResend}
          disabled={resendLoading || !email.trim()}
          className="text-sm font-semibold text-white underline disabled:opacity-60 text-left"
        >
          {resendLoading ? "Sending confirmation email…" : "Resend confirmation email"}
        </button>

        <button
          type="button"
          onClick={onRequestActivation}
          disabled={activationLoading || !email.trim() || activationSent}
          className="inline-flex items-center justify-center bg-white/15 hover:bg-white/25 border border-white/40 text-white font-semibold text-sm rounded-full px-4 py-2 transition-colors disabled:opacity-60"
        >
          {activationSent
            ? "Activation request sent — we will email you shortly"
            : activationLoading
              ? "Sending request…"
              : "Request manual account activation"}
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
    </div>
  );
}
