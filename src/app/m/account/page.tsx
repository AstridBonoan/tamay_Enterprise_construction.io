"use client";

import Link from "next/link";
import { authUserDisplayName } from "@/lib/auth";
import { useAuth } from "@/components/auth/AuthProvider";
import { useRequireAuth } from "@/components/auth/useRequireAuth";

export default function AccountPage() {
  const { signOut } = useAuth();
  const { user, loading } = useRequireAuth("/m/account");

  if (loading || !user) return null;

  return (
    <section className="bg-tamay-primary text-white py-16 md:py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="font-heading text-4xl md:text-5xl font-semibold tracking-wide uppercase">My Account</h1>
        <div className="w-20 h-px bg-white/25 mx-auto mt-5 mb-8" />
        <p className="text-lg text-white/95">Signed in as {authUserDisplayName(user)}</p>
        <dl className="mt-6 space-y-2 text-base text-white/90 max-w-md mx-auto">
          <div>
            <dt className="sr-only">Email</dt>
            <dd>{user.email}</dd>
          </div>
          {user.phone && (
            <div>
              <dt className="sr-only">Phone</dt>
              <dd>{user.phone}</dd>
            </div>
          )}
        </dl>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link
            href="/m/bookings"
            className="inline-flex items-center justify-center bg-white text-gray-900 font-bold tracking-wide rounded-full px-8 py-3 hover:bg-gray-100 transition-colors"
          >
            Go to Bookings
          </Link>
          <button
            type="button"
            onClick={() => void signOut()}
            className="inline-flex items-center justify-center border border-white/60 text-white font-bold tracking-wide rounded-full px-8 py-3 hover:bg-white/10 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </section>
  );
}
