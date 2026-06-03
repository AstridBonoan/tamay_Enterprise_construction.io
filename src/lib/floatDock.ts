/** Shared bottom row — matches Tawk chat bubble vertical position. */
export const FLOAT_ROW_BOTTOM_CLASS =
  "bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))] sm:bottom-6";

export function isChatFloatDismissed() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem("tamay_float_dismissed_tawk-chat") === "1";
}
