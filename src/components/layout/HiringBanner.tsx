"use client";

import { useState } from "react";
import { JoinTeamChoiceDialog } from "@/components/careers/JoinTeamChoice";

export function HiringBanner() {
  const [joinChoiceOpen, setJoinChoiceOpen] = useState(false);

  return (
    <>
      <div className="bg-tamay-primary text-center py-1 text-sm">
        <button
          type="button"
          onClick={() => setJoinChoiceOpen(true)}
          className="text-white font-semibold tracking-wide hover:underline uppercase"
        >
          WE ARE HIRING
        </button>
      </div>
      <JoinTeamChoiceDialog open={joinChoiceOpen} onClose={() => setJoinChoiceOpen(false)} />
    </>
  );
}
