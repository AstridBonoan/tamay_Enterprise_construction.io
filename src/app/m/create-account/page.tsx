"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { signIn } from "@/lib/auth";

export default function CreateAccountPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !email.trim()) return;
    signIn(email.trim());
    router.push("/m/account");
  };

  return (
    <section className="bg-tamay-primary text-white py-16 md:py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-heading text-4xl md:text-5xl font-semibold text-center tracking-wide uppercase">
          Create Account
        </h1>
        <div className="w-20 h-px bg-white/25 mx-auto mt-5 mb-8" />
        <p className="text-center text-lg text-white/95 mb-8">
          By creating an account, you may receive newsletters or promotions.
        </p>

        <form onSubmit={onSubmit} className="space-y-5 max-w-[980px] mx-auto">
          <input
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First name"
            className="w-full bg-transparent border border-white/55 rounded-md px-5 py-4 text-xl placeholder:text-white/90 focus:outline-none focus:ring-2 focus:ring-white/60"
          />
          <input
            type="text"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last name"
            className="w-full bg-transparent border border-white/55 rounded-md px-5 py-4 text-xl placeholder:text-white/90 focus:outline-none focus:ring-2 focus:ring-white/60"
          />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full bg-transparent border border-white/55 rounded-md px-5 py-4 text-xl placeholder:text-white/90 focus:outline-none focus:ring-2 focus:ring-white/60"
          />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone (optional)"
            className="w-full bg-transparent border border-white/55 rounded-md px-5 py-4 text-xl placeholder:text-white/90 focus:outline-none focus:ring-2 focus:ring-white/60"
          />

          <div className="text-center pt-3">
            <button
              type="submit"
              className="inline-flex items-center justify-center bg-white text-gray-900 font-bold text-xl tracking-wide rounded-full px-12 py-3 hover:bg-gray-100 transition-colors"
            >
              CREATE ACCOUNT
            </button>
          </div>
        </form>

        <div className="text-center mt-8 space-y-5">
          <p className="text-2xl">
            Already have an account?{" "}
            <Link className="font-semibold hover:underline" href="/m/login?r=%2Fm%2Faccount">
              Sign in
            </Link>
          </p>
          <p className="text-xl text-white/95">
            This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
          </p>
        </div>
      </div>
    </section>
  );
}

