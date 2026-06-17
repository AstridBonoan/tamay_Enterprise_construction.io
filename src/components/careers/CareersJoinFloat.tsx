"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CareersJoinModal } from "@/components/careers/CareersJoinModal";
import { CollapsedFloatButton, FloatCloseButton } from "@/components/ui/FloatingFloatControls";
import { useDismissibleFloat } from "@/hooks/useDismissibleFloat";
import { FLOAT_ROW_BOTTOM_CLASS } from "@/lib/floatDock";
import { POSITION_OPTIONS, positionToApplyParam } from "@/lib/jobApplication";

const AUTO_CLOSE_MS = 5_000;

type PositionOption = (typeof POSITION_OPTIONS)[number];

/** Fixed bottom-right join prompt on the Careers & Partnerships page. */
export function CareersJoinFloat() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const { dismissed, dismiss, ready } = useDismissibleFloat("careers-join");

  useEffect(() => {
    if (!ready || dismissed || modalOpen) return;

    const timer = window.setTimeout(dismiss, AUTO_CLOSE_MS);
    return () => window.clearTimeout(timer);
  }, [ready, dismissed, dismiss, modalOpen]);

  const openModal = () => {
    setModalOpen(true);
  };

  const choosePosition = (position: PositionOption) => {
    setModalOpen(false);
    router.push(`/careers-partnerships/apply?position=${positionToApplyParam(position)}`);
  };

  if (!ready) return null;

  return (
    <>
      {dismissed && !modalOpen ? (
        <CollapsedFloatButton
          label="Join In"
          side="right"
          onClick={openModal}
          ariaLabel="Join Tamay Enterprises"
        />
      ) : !modalOpen ? (
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
                Employee or subcontractor — pick your path and we will open the application with
                your choice ready to go.
              </p>
              <div className="mt-3">
                <button
                  type="button"
                  onClick={openModal}
                  className="block w-full bg-white text-gray-900 hover:bg-gray-100 px-3 py-2.5 text-xs font-bold tracking-widest uppercase transition-colors text-center"
                >
                  Join In
                </button>
              </div>
            </div>
          </div>
        </aside>
      ) : null}

      <CareersJoinModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onChoose={choosePosition}
      />
    </>
  );
}
