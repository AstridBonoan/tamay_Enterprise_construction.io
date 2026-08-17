/** Public Tawk.to embed IDs (also overridable via NEXT_PUBLIC_TAWK_* env vars). */
export const TAWK = {
  propertyId: "6a1e27f8dffdf41c2838a061",
  widgetId: "1jq2so8p7",
} as const;

type TawkVisibilityPosition = {
  position?: string;
  xOffset?: number;
  yOffset?: number;
};

declare global {
  interface Window {
    Tawk_API?: {
      customStyle?: {
        zIndex?: number | string;
        visibility?: {
          desktop?: TawkVisibilityPosition;
          mobile?: TawkVisibilityPosition;
          bubble?: { rotate?: string; xOffset?: number; yOffset?: number };
        };
      };
      onLoad?: () => void;
      onChatMaximized?: () => void;
      onChatMinimized?: () => void;
      maximize?: () => void;
      minimize?: () => void;
      showWidget?: () => void;
      hideWidget?: () => void;
      isChatMaximized?: () => boolean;
    };
    Tawk_LoadStart?: Date;
  }
}

const pendingTawkOpen: Array<() => void> = [];

function maximizeExistingTawk(): boolean {
  if (typeof window === "undefined") return false;
  const api = window.Tawk_API;
  if (!api?.maximize) return false;
  api.showWidget?.();
  api.maximize();
  return true;
}

/** Called after the existing Tawk widget is ready. Does not create a new instance. */
export function markTawkApiReady(): void {
  pendingTawkOpen.splice(0).forEach((open) => open());
}

/** Opens the already-loaded Tawk widget using showWidget + maximize. */
export function openExistingTawkChat(): void {
  if (maximizeExistingTawk()) return;
  pendingTawkOpen.push(() => {
    maximizeExistingTawk();
  });
}
