"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { formatAuthError } from "@/lib/accountActivation";
import { AUTH_DEFAULT_REDIRECT, resetPassword, signInWithEmail } from "@/lib/auth";
import { navigateToSitePath } from "@/lib/paths";

export default function LoginPage() {
  const [redirectTarget, setRedirectTarget] = useState(AUTH_DEFAULT_REDIRECT);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get("r");
    if (redirect) setRedirectTarget(redirect);
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    setLoading(true);
    setError(null);
    setResetMessage(null);

    try {
      await signInWithEmail(email.trim(), password);
      navigateToSitePath(redirectTarget);
    } catch (err) {
      setError(formatAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  const onResetPassword = async () => {
    if (!email.trim()) {
      setError("Enter your email address first, then click Reset password.");
      return;
    }

    setLoading(true);
    setError(null);
    setResetMessage(null);

    try {
      await resetPassword(email.trim());
      setResetMessage("Password reset email sent. Check your inbox and spam folder.");
    } catch (err) {
      setError(formatAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-tamay-primary text-white py-10 md:py-12 px-4">
      <div className="max-w-xl mx-auto">
        <h1 className="font-heading text-3xl md:text-4xl font-semibold text-center tracking-wide uppercase">
          Account Sign In
        </h1>
        <div className="w-16 h-px bg-white/25 mx-auto mt-4 mb-5" />
        <p className="text-center text-sm md:text-base text-white/95 mb-5">
          Sign in with the email and password you used when creating your account.
        </p>

        <form onSubmit={onSubmit} className="space-y-4 max-w-[620px] mx-auto">
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full bg-transparent border border-white/55 rounded-md px-4 py-3 text-base placeholder:text-white/90 focus:outline-none focus:ring-2 focus:ring-white/60"
          />
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full bg-transparent border border-white/55 rounded-md px-4 py-3 text-base placeholder:text-white/90 focus:outline-none focus:ring-2 focus:ring-white/60"
          />

          {error && (
            <p className="text-sm text-red-200 text-center" role="alert">
              {error}
            </p>
          )}
          {resetMessage && (
            <p className="text-sm text-green-200 text-center" role="status">
              {resetMessage}
            </p>
          )}

          <div className="text-center pt-1.5">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center bg-white text-gray-900 font-bold text-sm tracking-wide rounded-full px-9 py-2.5 hover:bg-gray-100 transition-colors disabled:opacity-60"
            >
              {loading ? "SIGNING IN..." : "SIGN IN"}
            </button>
          </div>
        </form>

        <div className="text-center mt-5 space-y-2">
          <button
            type="button"
            onClick={onResetPassword}
            disabled={loading}
            className="text-white text-base font-medium hover:underline disabled:opacity-60"
          >
            Reset password
          </button>
          <p className="text-base">
            Not a member?{" "}
            <Link className="font-semibold hover:underline" href="/m/create-account">
              Create account.
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
