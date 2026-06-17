"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { updateProfile } from "@/lib/auth";
import { useAuth } from "@/components/auth/AuthProvider";
import { useRequireAuth } from "@/components/auth/useRequireAuth";

const inputClass =
  "w-full bg-transparent border border-white/55 rounded-md px-4 py-3 text-base placeholder:text-white/90 focus:outline-none focus:ring-2 focus:ring-white/60";

export default function AccountSettingsPage() {
  const { refreshUser } = useAuth();
  const { user, loading } = useRequireAuth("/m/account/settings");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setPhone(user.phone ?? "");
  }, [user]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user || !firstName.trim() || !lastName.trim() || !email.trim()) return;

    setSaving(true);
    setError(null);
    setInfo(null);

    try {
      const result = await updateProfile(user.id, user.email, {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
      });

      await refreshUser();

      if (result.emailChangePending) {
        setInfo(
          "Profile saved. Check your email (and spam folder) to confirm your new address.",
        );
      } else {
        setInfo("Your information has been saved.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !user) return null;

  return (
    <section className="bg-tamay-primary text-white py-10 md:py-12 px-4">
      <div className="max-w-xl mx-auto">
        <h1 className="font-heading text-3xl md:text-4xl font-semibold text-center tracking-wide uppercase">
          Account Settings
        </h1>
        <div className="w-16 h-px bg-white/25 mx-auto mt-4 mb-5" />
        <p className="text-center text-sm md:text-base text-white/95 mb-5">
          Update your personal information below.
        </p>

        <form onSubmit={onSubmit} className="space-y-3.5 max-w-[620px] mx-auto">
          <input
            type="text"
            required
            autoComplete="given-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First name"
            className={inputClass}
          />
          <input
            type="text"
            required
            autoComplete="family-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last name"
            className={inputClass}
          />
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className={inputClass}
          />
          <input
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone (optional)"
            className={inputClass}
          />

          {error && (
            <p className="text-sm text-red-200 text-center" role="alert">
              {error}
            </p>
          )}
          {info && (
            <p className="text-sm text-green-200 text-center" role="status">
              {info}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center bg-white text-gray-900 font-bold text-sm tracking-wide rounded-full px-9 py-2.5 hover:bg-gray-100 transition-colors disabled:opacity-60"
            >
              {saving ? "SAVING..." : "SAVE CHANGES"}
            </button>
            <Link
              href="/m/account"
              className="inline-flex items-center justify-center border border-white/60 text-white font-bold text-sm tracking-wide rounded-full px-9 py-2.5 hover:bg-white/10 transition-colors text-center"
            >
              BACK TO ACCOUNT
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
