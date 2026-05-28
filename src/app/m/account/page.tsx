"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { isAuthenticated } from "@/lib/auth";

export default function AccountPage() {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace(`/m/login?r=${encodeURIComponent("/m/account")}`);
    }
  }, [router]);

  if (!isAuthenticated()) return null;

  return (
    <section className="bg-tamay-primary text-white py-16 md:py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="font-heading text-4xl md:text-5xl font-semibold tracking-wide uppercase">My Account</h1>
        <div className="w-20 h-px bg-white/25 mx-auto mt-5 mb-8" />
        <p className="text-lg text-white/95">
          Your account dashboard will be added here. You are now successfully routed as an authenticated user.
        </p>
        <Link
          href="/m/bookings"
          className="inline-flex mt-8 items-center justify-center bg-white text-gray-900 font-bold tracking-wide rounded-full px-8 py-3 hover:bg-gray-100 transition-colors"
        >
          Go to Bookings
        </Link>
      </div>
    </section>
  );
}
