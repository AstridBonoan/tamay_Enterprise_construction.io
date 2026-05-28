"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { signIn } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [redirectTarget, setRedirectTarget] = useState("/m/account");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("r");
    if (value) setRedirectTarget(value);
  }, []);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    signIn(email.trim());
    router.push(redirectTarget);
  };

  return (
    <section className="bg-tamay-primary text-white py-16 md:py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-heading text-4xl md:text-5xl font-semibold text-center tracking-wide uppercase">
          Account Sign In
        </h1>
        <div className="w-20 h-px bg-white/25 mx-auto mt-5 mb-8" />
        <p className="text-center text-lg text-white/95 mb-8">
          Sign in to your account to access your profile, history, and any private pages you&apos;ve been granted
          access to.
        </p>

        <form onSubmit={onSubmit} className="space-y-6 max-w-[900px] mx-auto">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full bg-transparent border border-white/55 rounded-md px-5 py-4 text-xl placeholder:text-white/90 focus:outline-none focus:ring-2 focus:ring-white/60"
          />
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full bg-transparent border border-white/55 rounded-md px-5 py-4 text-xl placeholder:text-white/90 focus:outline-none focus:ring-2 focus:ring-white/60"
          />

          <div className="text-center pt-1">
            <button
              type="submit"
              className="inline-flex items-center justify-center bg-white text-gray-900 font-bold text-xl tracking-wide rounded-full px-12 py-3 hover:bg-gray-100 transition-colors"
            >
              SIGN IN
            </button>
          </div>
        </form>

        <div className="text-center mt-8 space-y-3">
          <button type="button" className="text-white text-2xl font-medium hover:underline">
            Reset password
          </button>
          <p className="text-2xl">
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

