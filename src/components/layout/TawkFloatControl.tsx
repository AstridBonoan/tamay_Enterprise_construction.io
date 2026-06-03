"use client";

import { useEffect } from "react";
import { CollapsedFloatButton, FloatCloseButton } from "@/components/ui/FloatingFloatControls";
import { useDismissibleFloat } from "@/hooks/useDismissibleFloat";
import { FLOAT_ROW_BOTTOM_CLASS } from "@/lib/floatDock";
import { TAWK } from "@/lib/tawk";

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
        side="left"
        onClick={restore}
        ariaLabel="Show live chat"
      />
    );
  }

  return (
    <div
      className={`fixed left-[calc(3.75rem+env(safe-area-inset-left,0px))] sm:left-[calc(4.25rem+env(safe-area-inset-left,0px))] ${FLOAT_ROW_BOTTOM_CLASS} z-[90]`}
      style={{ transform: "translateY(-0.25rem)" }}
      aria-hidden
    >
      <FloatCloseButton onClick={dismiss} ariaLabel="Close live chat" />
    </div>
  );
}
