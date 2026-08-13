"use client";

import { useState } from "react";
import { CollapsedFloatButton, FloatCloseButton } from "@/components/ui/FloatingFloatControls";
import { JoinTeamChoiceDialog } from "@/components/careers/JoinTeamChoice";
import { useContextualFloat } from "@/hooks/useContextualFloat";
import { FLOAT_ROW_BOTTOM_CLASS } from "@/lib/floatDock";

/** Fixed bottom-right join prompt on the Careers & Partnerships page. */
export function CareersJoinFloat() {
  const { ready, expanded, collapse, expandManually, blockAutoExpand } = useContextualFloat("careers-join");
  const [choiceOpen, setChoiceOpen] = useState(false);

  if (!ready) return null;

  const openChoice = () => {
    blockAutoExpand();
    setChoiceOpen(true);
  };

  if (!expanded) {
    return (
      <>
        <CollapsedFloatButton
          label="Join In"
          side="right"
          onClick={expandManually}
          ariaLabel="Join Tamay Enterprises"
        />
        <JoinTeamChoiceDialog open={choiceOpen} onClose={() => setChoiceOpen(false)} />
      </>
    );
  }

  return (
    <>
      <aside
        className={`fixed right-3 sm:right-5 ${FLOAT_ROW_BOTTOM_CLASS} z-[75] w-[min(18rem,calc(100vw-5.5rem))] sm:max-w-[19rem] max-h-[min(40vh,22rem)] overflow-y-auto`}
        aria-label="Join Tamay Enterprises"
        role="dialog"
        aria-modal="false"
      >
        <div className="relative overflow-hidden bg-tamay-primary text-white shadow-xl">
          <div className="relative border-l-4 border-tamay-accent px-3.5 py-3.5 sm:px-4 sm:py-4">
            <FloatCloseButton onClick={collapse} ariaLabel="Close join prompt" />
            <p className="font-heading text-sm sm:text-base font-semibold leading-snug pr-8">
              Ready to Join the Team?
            </p>
            <p className="text-xs sm:text-sm text-gray-100 leading-relaxed mt-2">
              Start your application today and tell us about the role you are interested in.
            </p>
            <div className="mt-3">
              <button
                type="button"
                onClick={openChoice}
                className="block w-full min-h-11 bg-white text-gray-900 hover:bg-gray-100 px-3 py-2.5 text-xs font-bold tracking-widest uppercase transition-colors text-center"
              >
                Join In
              </button>
            </div>
          </div>
        </div>
      </aside>
      <JoinTeamChoiceDialog open={choiceOpen} onClose={() => setChoiceOpen(false)} />
    </>
  );
}
