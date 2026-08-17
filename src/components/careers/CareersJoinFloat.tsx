"use client";

import { useState } from "react";
import { CollapsedFloatButton } from "@/components/ui/FloatingFloatControls";
import { JoinTeamChoiceDialog } from "@/components/careers/JoinTeamChoice";

/** Compact right-side join action on the Careers & Partnerships page. */
export function CareersJoinFloat() {
  const [choiceOpen, setChoiceOpen] = useState(false);

  return (
    <>
      <CollapsedFloatButton
        label="Join In"
        side="right"
        onClick={() => setChoiceOpen(true)}
        ariaLabel="Join Tamay Enterprises"
      />
      <JoinTeamChoiceDialog open={choiceOpen} onClose={() => setChoiceOpen(false)} />
    </>
  );
}
