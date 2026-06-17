/** Public Tawk.to embed IDs (also overridable via NEXT_PUBLIC_TAWK_* env vars). */
export const TAWK = {
  propertyId: "6a1e27f8dffdf41c2838a061",
  widgetId: "1jq2so8p7",
} as const;

declare global {
  interface Window {
    Tawk_API?: {
      customStyle?: {
        visibility?: {
          desktop?: { position?: string; xOffset?: number; yOffset?: number };
          mobile?: { position?: string; xOffset?: number; yOffset?: number };
        };
      };
    };
    Tawk_LoadStart?: Date;
  }
}
