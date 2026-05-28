"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";

export default function AuthOptionsPage() {
  const router = useRouter();

  const goToProtected = (target: string) => {
    if (isAuthenticated()) {
      router.push(target);
      return;
    }
    router.push(`/m/login?r=${encodeURIComponent(target)}`);
  };

  return (
    <section className="bg-tamay-primary text-white py-16 md:py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="font-heading text-4xl md:text-5xl font-semibold tracking-wide uppercase">Account</h1>
        <div className="w-20 h-px bg-white/25 mx-auto mt-5 mb-8" />
        <p className="text-lg text-white/95 mb-10">
          Choose an option below to sign in, create an account, or continue to your protected pages.
        </p>

        <div className="grid gap-4 max-w-xl mx-auto">
          <Link
            href="/m/login?r=%2Fm%2Faccount"
            className="inline-flex items-center justify-center bg-white text-gray-900 font-bold tracking-wide rounded-full px-8 py-3 hover:bg-gray-100 transition-colors"
          >
            SIGN IN
          </Link>
          <Link
            href="/m/create-account"
            className="inline-flex items-center justify-center bg-white text-gray-900 font-bold tracking-wide rounded-full px-8 py-3 hover:bg-gray-100 transition-colors"
          >
            SIGN UP
          </Link>
          <button
            type="button"
            onClick={() => goToProtected("/m/bookings")}
            className="inline-flex items-center justify-center bg-white text-gray-900 font-bold tracking-wide rounded-full px-8 py-3 hover:bg-gray-100 transition-colors"
          >
            BOOKINGS
          </button>
          <button
            type="button"
            onClick={() => goToProtected("/m/account")}
            className="inline-flex items-center justify-center bg-white text-gray-900 font-bold tracking-wide rounded-full px-8 py-3 hover:bg-gray-100 transition-colors"
          >
            MY ACCOUNT
          </button>
        </div>
      </div>
    </section>
  );
}
