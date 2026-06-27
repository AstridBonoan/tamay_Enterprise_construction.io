"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CollapsedFloatButton, FloatCloseButton } from "@/components/ui/FloatingFloatControls";
import { useDismissibleFloat } from "@/hooks/useDismissibleFloat";
import { FLOAT_ROW_BOTTOM_CLASS } from "@/lib/floatDock";

const AUTO_CLOSE_MS = 5_000;

/** Fixed bottom-right join prompt on the Careers & Partnerships page. */
export function CareersJoinFloat() {
  const router = useRouter();
  const { dismissed, dismiss, ready } = useDismissibleFloat("careers-join");

  useEffect(() => {
    if (!ready || dismissed) return;

    const timer = window.setTimeout(dismiss, AUTO_CLOSE_MS);
    return () => window.clearTimeout(timer);
  }, [ready, dismissed, dismiss]);

  if (!ready) return null;

  if (dismissed) {
    return (
      <CollapsedFloatButton
        label="Join In"
        side="right"
        onClick={() => router.push("/careers-partnerships/apply")}
        ariaLabel="Join Tamay Enterprises"
      />
    );
  }

  return (
    <aside
      className={`fixed right-3 sm:right-5 ${FLOAT_ROW_BOTTOM_CLASS} z-[75] max-w-[min(18rem,calc(100vw-2rem))] sm:max-w-[19rem]`}
      aria-label="Join Tamay Enterprises"
    >
      <div className="relative overflow-hidden bg-tamay-primary text-white shadow-xl">
        <div className="relative border-l-4 border-tamay-accent px-3.5 py-4 sm:px-4 sm:py-4">
          <FloatCloseButton onClick={dismiss} ariaLabel="Close join prompt" />
          <p className="font-heading text-[0.9375rem] sm:text-base font-semibold leading-snug pr-5">
            Ready to Join the Team?
          </p>
          <p className="text-xs sm:text-sm text-gray-100 leading-relaxed mt-2">
            Start your application today and tell us about the role you are interested in.
          </p>
          <div className="mt-3">
            <button
              type="button"
              onClick={() => router.push("/careers-partnerships/apply")}
              className="block w-full bg-white text-gray-900 hover:bg-gray-100 px-3 py-2.5 text-xs font-bold tracking-widest uppercase transition-colors text-center"
            >
              Join In
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
