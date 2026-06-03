"use client";

import { useSyncExternalStore } from "react";
import { Button } from "@/components/ui/Button";
import { CollapsedFloatButton, FloatCloseButton } from "@/components/ui/FloatingFloatControls";
import { useDismissibleFloat } from "@/hooks/useDismissibleFloat";
import { FLOAT_DOCK_LEFT_CLASS, isChatFloatDismissed, openPromoBottom } from "@/lib/floatDock";

function subscribeChatDismiss(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("tamay-float-dismiss", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("tamay-float-dismiss", callback);
  };
}

function getChatDismissSnapshot() {
  return isChatFloatDismissed();
}

type FloatingPromoBannerProps = {
  floatId: string;
  collapsedLabel: string;
  headline: string;
  body: string;
  ariaLabel: string;
  ctaLabel?: string;
  ctaHref?: string;
};

/** Fixed bottom-left promo banner — aligned above the chat dock. */
export function FloatingPromoBanner({
  floatId,
  collapsedLabel,
  headline,
  body,
  ariaLabel,
  ctaLabel,
  ctaHref,
}: FloatingPromoBannerProps) {
  const { dismissed, dismiss, restore, ready } = useDismissibleFloat(floatId);
  const chatDismissed = useSyncExternalStore(subscribeChatDismiss, getChatDismissSnapshot, () => false);
  const hasCta = Boolean(ctaLabel && ctaHref);

  if (!ready) return null;

  if (dismissed) {
    return (
      <CollapsedFloatButton
        label={collapsedLabel}
        stackIndex={chatDismissed ? 1 : 0}
        aboveChat={!chatDismissed}
        onClick={restore}
        ariaLabel={`Show ${ariaLabel}`}
      />
    );
  }

  return (
    <aside
      className={`fixed ${FLOAT_DOCK_LEFT_CLASS} z-[75] max-w-[min(16rem,calc(100vw-2rem))] sm:max-w-[17rem]`}
      style={{ bottom: openPromoBottom(chatDismissed) }}
      aria-label={ariaLabel}
    >
      <div className="relative bg-tamay-primary text-white shadow-xl border-l-4 border-tamay-accent px-3.5 py-4 sm:px-4 sm:py-4">
        <FloatCloseButton onClick={dismiss} ariaLabel={`Close ${ariaLabel}`} />
        <p className="font-heading text-[0.9375rem] sm:text-base font-semibold leading-snug pr-5">{headline}</p>
        <p className="text-xs sm:text-sm text-gray-100 leading-relaxed mt-2">{body}</p>
        {hasCta && (
          <div className="mt-3">
            <Button
              href={ctaHref!}
              external
              className="w-full !bg-white !text-gray-900 hover:!bg-gray-100 !px-3 !py-2.5 !text-xs !tracking-widest !uppercase"
            >
              {ctaLabel}
            </Button>
          </div>
        )}
      </div>
    </aside>
  );
}
