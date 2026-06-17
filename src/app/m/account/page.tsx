"use client";

import { useAuth } from "@/components/auth/AuthProvider";
import { useRequireAuth } from "@/components/auth/useRequireAuth";
import { AccountHubCard } from "@/components/account/AccountHub";

function ShieldIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2 4 5v6.1c0 5.1 3.4 9.8 8 11 4.6-1.2 8-5.9 8-11V5l-8-3zm0 2.2 6 2.25V11c0 4.1-2.7 7.9-6 9-3.3-1.1-6-4.9-6-9V6.45l6-2.25zM11 8v5.4l3.6 2.1-.9 1.5L9 14.2V8h2z" />
    </svg>
  );
}

function AddressIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 3 4 9v12h6v-7h4v7h6V9l-8-6zm0 2.8L16 10v9h-2v-7h-4v7H8v-9l4-4.2z" />
    </svg>
  );
}

function CardIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 4v2h16V8H4zm0 4v6h16v-6H4z" />
    </svg>
  );
}

function OrderIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 4h13v2H8V4zm0 7h13v2H8v-2zm0 7h13v2H8v-2zM3 5h2v2H3V5zm0 7h2v2H3v-2zm0 7h2v2H3v-2z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M7 2a1 1 0 0 1 1 1v1h8V3a1 1 0 1 1 2 0v1h1a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1V3a1 1 0 0 1 1-1zm12 8H5v10h14V10z" />
    </svg>
  );
}

export default function AccountPage() {
  const { signOut } = useAuth();
  const { user, loading } = useRequireAuth("/m/account");

  if (loading || !user) return null;

  return (
    <section className="bg-gray-50 min-h-[60vh] py-8 md:py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-heading text-2xl md:text-3xl font-semibold text-gray-900 mb-6">Your Account</h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AccountHubCard
            href="/m/account/settings"
            title="Login & security"
            description="Edit login, name, and email."
            icon={<ShieldIcon />}
          />
          <AccountHubCard
            href="/m/account/addresses"
            title="Your Addresses"
            description="View addresses saved from job applications or checkout billing."
            icon={<AddressIcon />}
          />
          <AccountHubCard
            href="/m/account/payments"
            title="Your Payments"
            description="View saved cards and manage payment methods from checkout."
            icon={<CardIcon />}
          />
          <AccountHubCard
            href="/m/account/orders"
            title="Your Orders"
            description="Track purchases, view order details, and see your purchase history."
            icon={<OrderIcon />}
          />
          <AccountHubCard
            href="/m/bookings"
            title="Bookings"
            description="View and manage your service appointments."
            icon={<CalendarIcon />}
          />
        </div>

        <p className="mt-8 text-center text-sm text-gray-500">
          <button
            type="button"
            onClick={() => void signOut()}
            className="text-tamay-primary font-semibold hover:underline"
          >
            Sign Out
          </button>
        </p>
      </div>
    </section>
  );
}
