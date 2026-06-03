/** Shared bottom row — matches Tawk chat bubble; lifts when cookie banner is visible. */
export const FLOAT_ROW_BOTTOM_CLASS = "float-row-bottom";

export function isChatFloatDismissed() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem("tamay_float_dismissed_tawk-chat") === "1";
}
