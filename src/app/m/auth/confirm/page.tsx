"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { navigateToSitePath } from "@/lib/paths";
import { createClient } from "@/lib/supabase/client";

function AuthConfirmContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const supabase = createClient();

    async function finishAuth() {
      const errorDescription = searchParams.get("error_description");
      if (errorDescription) {
        setStatus("error");
        setMessage(decodeURIComponent(errorDescription.replace(/\+/g, " ")));
        return;
      }

      const code = searchParams.get("code");
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          setStatus("error");
          setMessage(error.message);
          return;
        }
      }

      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData.session) {
        setStatus("success");
        setMessage("You're signed in. Taking you to the homepage…");
        window.setTimeout(() => navigateToSitePath("/"), 1500);
        return;
      }

      setStatus("error");
      setMessage("This link is invalid or has expired.");
    }

    void finishAuth();
  }, [searchParams]);

  return (
    <section className="bg-tamay-primary text-white py-10 md:py-12 px-4 min-h-[50vh]">
      <div className="max-w-xl mx-auto text-center">
        <h1 className="font-heading text-3xl md:text-4xl font-semibold tracking-wide uppercase">
          Account
        </h1>
        <div className="w-16 h-px bg-white/25 mx-auto mt-4 mb-6" />

        {status === "loading" && <p className="text-white/95">Signing you in…</p>}

        {status === "success" && (
          <p className="text-green-200" role="status">
            {message}
          </p>
        )}

        {status === "error" && (
          <div className="space-y-5">
            <p className="text-red-200" role="alert">
              {message}
            </p>
            <p className="text-sm text-white/80">
              <Link href="/m/login/" className="font-semibold underline">
                Sign in
              </Link>
              {" · "}
              <Link href="/m/create-account/" className="font-semibold underline">
                Create account
              </Link>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default function AuthConfirmPage() {
  return (
    <Suspense
      fallback={
        <section className="bg-tamay-primary text-white py-10 px-4 min-h-[50vh] flex items-center justify-center">
          <p>Signing you in…</p>
        </section>
      }
    >
      <AuthConfirmContent />
    </Suspense>
  );
}
