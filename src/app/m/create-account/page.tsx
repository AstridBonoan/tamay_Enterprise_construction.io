"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";
import { formatAuthError } from "@/lib/accountActivation";
import { AUTH_DEFAULT_REDIRECT, signUpWithEmail } from "@/lib/auth";
import { navigateToSitePath } from "@/lib/paths";

function CreateAccountForm() {
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get("r") ?? AUTH_DEFAULT_REDIRECT;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password) return;

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await signUpWithEmail({
        email: email.trim(),
        password,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      });

      if (result.status === "already_exists") {
        setError("An account with this email already exists. Please sign in instead.");
        return;
      }

      navigateToSitePath(redirectTarget);
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
          Create Account
        </h1>
        <div className="w-16 h-px bg-white/25 mx-auto mt-4 mb-5" />
        <p className="text-center text-sm md:text-base text-white/95 mb-5">
          Create an account to sign in right away — no email confirmation required.
        </p>

        <form onSubmit={onSubmit} className="space-y-3.5 max-w-[620px] mx-auto">
          <input
            type="text"
            required
            autoComplete="given-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First name"
            className="w-full bg-transparent border border-white/55 rounded-md px-4 py-3 text-base placeholder:text-white/90 focus:outline-none focus:ring-2 focus:ring-white/60"
          />
          <input
            type="text"
            required
            autoComplete="family-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last name"
            className="w-full bg-transparent border border-white/55 rounded-md px-4 py-3 text-base placeholder:text-white/90 focus:outline-none focus:ring-2 focus:ring-white/60"
          />
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
            minLength={8}
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password (min. 8 characters)"
            className="w-full bg-transparent border border-white/55 rounded-md px-4 py-3 text-base placeholder:text-white/90 focus:outline-none focus:ring-2 focus:ring-white/60"
          />
          <input
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
            className="w-full bg-transparent border border-white/55 rounded-md px-4 py-3 text-base placeholder:text-white/90 focus:outline-none focus:ring-2 focus:ring-white/60"
          />

          {error && (
            <p className="text-sm text-red-200 text-center" role="alert">
              {error}{" "}
              {error.includes("already exists") && (
                <Link
                  className="font-semibold underline"
                  href={`/m/login?r=${encodeURIComponent(redirectTarget)}`}
                >
                  Sign in
                </Link>
              )}
            </p>
          )}

          <div className="text-center pt-2">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center bg-white text-gray-900 font-bold text-sm tracking-wide rounded-full px-9 py-2.5 hover:bg-gray-100 transition-colors disabled:opacity-60"
            >
              {loading ? "CREATING..." : "CREATE ACCOUNT"}
            </button>
          </div>
        </form>

        <div className="text-center mt-5 space-y-3">
          <p className="text-base">
            Already have an account?{" "}
            <Link className="font-semibold hover:underline" href={`/m/login?r=${encodeURIComponent(redirectTarget)}`}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default function CreateAccountPage() {
  return (
    <Suspense fallback={<section className="bg-tamay-primary text-white py-10 px-4 min-h-[40vh]" />}>
      <CreateAccountForm />
    </Suspense>
  );
}
