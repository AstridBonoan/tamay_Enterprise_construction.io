"use client";

import Image from "next/image";
import { useState } from "react";
import { IMAGES } from "@/lib/images";

/** Visible stand-in until NEXT_PUBLIC_TAWK_PROPERTY_ID is configured. */
export function TawkChatPlaceholder() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed left-3 z-[85] flex flex-col items-start gap-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))] sm:left-4 sm:bottom-4">
      {open && (
        <div
          className="w-[min(18rem,calc(100vw-2rem))] rounded-lg bg-white border border-gray-200 shadow-xl overflow-hidden animate-[fadeIn_0.2s_ease-out]"
          role="dialog"
          aria-label="Live chat preview"
        >
          <div className="bg-tamay-primary text-white px-4 py-3 flex items-center justify-between gap-2">
            <div>
              <p className="font-heading font-semibold text-sm tracking-wide">Live Chat</p>
              <p className="text-xs text-white/85 mt-0.5">Tamay Enterprises</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-white/90 hover:text-white text-xl leading-none p-1"
              aria-label="Close chat preview"
            >
              ×
            </button>
          </div>
          <div className="px-4 py-4 text-sm text-gray-600 leading-relaxed">
            <p>
              This is where your <strong className="text-gray-800">Tawk.to</strong> chat widget will appear.
              Add your widget ID to enable live messaging with visitors.
            </p>
            <p className="mt-3 text-xs text-gray-500">Preview only — not connected yet.</p>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-white shadow-lg border-2 border-tamay-accent hover:scale-105 transition-transform"
        aria-label={open ? "Close live chat preview" : "Open live chat preview"}
        aria-expanded={open}
      >
        <Image
          src={IMAGES.logoSmall}
          alt="Tamay Enterprises"
          width={48}
          height={48}
          className="h-10 w-10 object-contain"
          unoptimized
        />
      </button>
    </div>
  );
}
