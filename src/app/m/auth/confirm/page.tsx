"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { resendSignUpConfirmation } from "@/lib/auth";
import { createClient } from "@/lib/supabase/client";

function AuthConfirmContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");
  const [emailForResend, setEmailForResend] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();

    async function confirmEmail() {
      const errorDescription = searchParams.get("error_description");
      if (errorDescription) {
        setStatus("error");
        setMessage(decodeURIComponent(errorDescription.replace(/\+/g, " ")));
        return;
      }

      const code = searchParams.get("code");
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          setStatus("error");
          setMessage(error.message);
          return;
        }
        setStatus("success");
        setMessage("Your email is confirmed. Taking you to your account…");
        window.setTimeout(() => router.replace("/m/account"), 2000);
        return;
      }

      const { data: initialSession } = await supabase.auth.getSession();
      if (initialSession.session) {
        setStatus("success");
        setMessage("Your email is confirmed. Taking you to your account…");
        window.setTimeout(() => router.replace("/m/account"), 2000);
        return;
      }

      await new Promise((resolve) => window.setTimeout(resolve, 1500));

      const { data: retrySession } = await supabase.auth.getSession();
      if (retrySession.session) {
        setStatus("success");
        setMessage("Your email is confirmed. Taking you to your account…");
        window.setTimeout(() => router.replace("/m/account"), 2000);
        return;
      }

      setStatus("error");
      setMessage("This confirmation link is invalid or has expired. Request a new confirmation email below.");
    }

    void confirmEmail();
  }, [router, searchParams]);

  const onResend = async () => {
    if (!emailForResend.trim()) {
      setResendMessage("Enter the email address you used to sign up.");
      return;
    }

    setResendLoading(true);
    setResendMessage(null);

    try {
      await resendSignUpConfirmation(emailForResend.trim());
      setResendMessage("Confirmation email sent. Check your inbox and spam folder.");
    } catch (err) {
      setResendMessage(err instanceof Error ? err.message : "Could not resend confirmation email.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <section className="bg-tamay-primary text-white py-10 md:py-12 px-4 min-h-[50vh]">
      <div className="max-w-xl mx-auto text-center">
        <h1 className="font-heading text-3xl md:text-4xl font-semibold tracking-wide uppercase">
          Confirm Email
        </h1>
        <div className="w-16 h-px bg-white/25 mx-auto mt-4 mb-6" />

        {status === "loading" && (
          <p className="text-white/95">Confirming your email address…</p>
        )}

        {status === "success" && (
          <p className="text-green-200" role="status">
            {message}
          </p>
        )}

        {status === "error" && (
          <div className="space-y-5">
            <p className="text-red-200" role="alert">
              {message}
            </p>
            <div className="max-w-md mx-auto space-y-3 text-left">
              <label htmlFor="confirm-resend-email" className="block text-sm font-medium text-white/90">
                Resend confirmation email
              </label>
              <input
                id="confirm-resend-email"
                type="email"
                value={emailForResend}
                onChange={(event) => setEmailForResend(event.target.value)}
                placeholder="Email used at sign up"
                className="w-full bg-transparent border border-white/55 rounded-md px-4 py-3 text-base placeholder:text-white/90 focus:outline-none focus:ring-2 focus:ring-white/60"
              />
              <button
                type="button"
                onClick={onResend}
                disabled={resendLoading}
                className="w-full inline-flex items-center justify-center bg-white text-gray-900 font-bold text-sm tracking-wide rounded-full px-9 py-2.5 hover:bg-gray-100 transition-colors disabled:opacity-60"
              >
                {resendLoading ? "SENDING..." : "RESEND CONFIRMATION EMAIL"}
              </button>
              {resendMessage && (
                <p className="text-sm text-center text-green-200" role="status">
                  {resendMessage}
                </p>
              )}
            </div>
            <p className="text-sm text-white/80">
              Already confirmed?{" "}
              <Link href="/m/login" className="font-semibold underline">
                Sign in
              </Link>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default function AuthConfirmPage() {
  return (
    <Suspense
      fallback={
        <section className="bg-tamay-primary text-white py-10 px-4 min-h-[50vh] flex items-center justify-center">
          <p>Confirming your email address…</p>
        </section>
      }
    >
      <AuthConfirmContent />
    </Suspense>
  );
}
