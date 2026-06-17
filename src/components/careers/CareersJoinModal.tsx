"use client";

import { useEffect } from "react";
import { POSITION_OPTIONS } from "@/lib/jobApplication";

type CareersJoinModalProps = {
  open: boolean;
  onClose: () => void;
  onChoose: (position: (typeof POSITION_OPTIONS)[number]) => void;
};

export function CareersJoinModal({ open, onClose, onChoose }: CareersJoinModalProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/55 backdrop-blur-[1px]"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="careers-join-title"
        className="relative w-full max-w-md bg-white shadow-2xl border border-gray-200"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700 text-lg leading-none hover:bg-gray-200 transition-colors"
          aria-label="Close join options"
        >
          ×
        </button>

        <div className="border-l-4 border-tamay-accent px-6 py-7 sm:px-8 sm:py-8">
          <h2
            id="careers-join-title"
            className="font-heading text-xl sm:text-2xl text-tamay-primary font-semibold pr-8"
          >
            How Would You Like to Join?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
            Choose the path that fits you best. We will take you straight to the application with
            your selection already filled in.
          </p>

          <div className="mt-6 flex flex-col gap-3">
            {POSITION_OPTIONS.map((position) => (
              <button
                key={position}
                type="button"
                onClick={() => onChoose(position)}
                className="w-full bg-tamay-primary text-white font-bold text-sm tracking-wide uppercase px-5 py-3.5 hover:bg-tamay-primary-dark transition-colors"
              >
                {position}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
