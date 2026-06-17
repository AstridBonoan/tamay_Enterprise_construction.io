"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { updateProfile } from "@/lib/auth";
import { useAuth } from "@/components/auth/AuthProvider";
import { useRequireAuth } from "@/components/auth/useRequireAuth";
import {
  AccountPageShell,
  AccountPanel,
  accountButtonPrimaryClass,
  accountButtonSecondaryClass,
  accountInputClass,
} from "@/components/account/AccountHub";

export default function AccountSettingsPage() {
  const { refreshUser } = useAuth();
  const { user, loading } = useRequireAuth("/m/account/settings");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
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
      });

      await refreshUser();

      if (result.emailChangePending) {
        setInfo("Profile saved. Check your email to confirm your new address.");
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
    <AccountPageShell
      title="Login & security"
      description="Manage your name and email. Phone and address are saved when you apply for a job or complete checkout."
    >
      <AccountPanel>
        <form onSubmit={onSubmit} className="space-y-4 max-w-xl">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-1">
                First name
              </label>
              <input
                id="first-name"
                type="text"
                required
                autoComplete="given-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={accountInputClass}
              />
            </div>
            <div>
              <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-1">
                Last name
              </label>
              <input
                id="last-name"
                type="text"
                required
                autoComplete="family-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={accountInputClass}
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={accountInputClass}
            />
          </div>

          {user.phone && (
            <p className="text-sm text-gray-600">
              Phone on file: <span className="font-medium text-gray-900">{user.phone}</span>
            </p>
          )}

          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
          {info && (
            <p className="text-sm text-green-700" role="status">
              {info}
            </p>
          )}

          <div className="flex flex-wrap gap-3 pt-2">
            <button type="submit" disabled={saving} className={accountButtonPrimaryClass}>
              {saving ? "Saving..." : "Save changes"}
            </button>
            <Link href="/m/account" className={accountButtonSecondaryClass}>
              Back to Your Account
            </Link>
          </div>
        </form>
      </AccountPanel>
    </AccountPageShell>
  );
}
