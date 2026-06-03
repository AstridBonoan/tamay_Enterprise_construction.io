/** Shared bottom-left dock for chat + promo floats. */
export const FLOAT_DOCK_LEFT_CLASS = "left-3 sm:left-4";

/** Height reserved for the Tawk chat bubble (rem). */
export const CHAT_BUBBLE_SLOT_REM = 3.75;

export function collapsedFloatBottom(stackIndex: number, aboveChat = false) {
  const base = aboveChat ? 0.75 + CHAT_BUBBLE_SLOT_REM + 0.35 : 0.75;
  return `calc(${base + stackIndex * 2.85}rem + env(safe-area-inset-bottom, 0px))`;
}

export function openPromoBottom(chatDismissed: boolean) {
  if (!chatDismissed) {
    return `calc(${0.75 + CHAT_BUBBLE_SLOT_REM + 0.5}rem + env(safe-area-inset-bottom, 0px))`;
  }
  return `calc(${0.75 + 2.85 + 0.5}rem + env(safe-area-inset-bottom, 0px))`;
}

export function isChatFloatDismissed() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem("tamay_float_dismissed_tawk-chat") === "1";
}
