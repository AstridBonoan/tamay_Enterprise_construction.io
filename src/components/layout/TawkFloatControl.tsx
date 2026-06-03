"use client";

import { useEffect } from "react";
import { CollapsedFloatButton, FloatCloseButton } from "@/components/ui/FloatingFloatControls";
import { useDismissibleFloat } from "@/hooks/useDismissibleFloat";
import { TAWK } from "@/lib/tawk";
import { CHAT_BUBBLE_SLOT_REM } from "@/lib/floatDock";

type TawkApi = {
  hideWidget?: () => void;
  showWidget?: () => void;
  onLoad?: () => void;
};

declare global {
  interface Window {
    Tawk_API?: TawkApi;
  }
}

const FLOAT_ID = "tawk-chat";

/** Close control + collapsed restore pill for the Tawk.to widget. */
export function TawkFloatControl() {
  const propertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID ?? TAWK.propertyId;
  const { dismissed, dismiss, restore, ready } = useDismissibleFloat(FLOAT_ID);

  useEffect(() => {
    if (!propertyId || !ready) return;

    const syncWidget = () => {
      if (dismissed) {
        window.Tawk_API?.hideWidget?.();
        document.body.classList.add("tawk-dismissed");
      } else {
        document.body.classList.remove("tawk-dismissed");
        window.Tawk_API?.showWidget?.();
      }
    };

    window.Tawk_API = window.Tawk_API || {};
    const previousOnLoad = window.Tawk_API.onLoad;
    window.Tawk_API.onLoad = () => {
      previousOnLoad?.();
      syncWidget();
    };
    syncWidget();

    return () => {
      document.body.classList.remove("tawk-dismissed");
    };
  }, [dismissed, ready, propertyId]);

  if (!propertyId || !ready) return null;

  if (dismissed) {
    return (
      <CollapsedFloatButton
        label="Chat"
        stackIndex={0}
        onClick={restore}
        ariaLabel="Show live chat"
      />
    );
  }

  return (
    <div
      className="fixed z-[90] left-[calc(0.75rem+2.75rem+env(safe-area-inset-left,0px))] sm:left-[calc(1rem+2.75rem+env(safe-area-inset-left,0px))]"
      style={{ bottom: `calc(0.75rem + ${CHAT_BUBBLE_SLOT_REM - 0.5}rem + env(safe-area-inset-bottom, 0px))` }}
      aria-hidden
    >
      <FloatCloseButton onClick={dismiss} ariaLabel="Close live chat" />
    </div>
  );
}
