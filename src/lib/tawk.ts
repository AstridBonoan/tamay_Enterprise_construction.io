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
