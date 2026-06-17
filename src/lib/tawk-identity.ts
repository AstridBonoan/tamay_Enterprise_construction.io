import { onTawkReady } from "@/lib/tawk-ready";

type TawkVisitor = {
  name?: string;
  email?: string;
  phone?: string;
  userId?: string;
};

declare global {
  interface Window {
    Tawk_API?: {
      setAttributes?: (
        attrs: Record<string, string>,
        callback?: (error?: unknown) => void,
      ) => void;
      onLoad?: () => void;
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

let lastSyncedKey = "";

function applyTawkAttributes(visitor: TawkVisitor) {
  const attrs: Record<string, string> = {};

  if (visitor.name) attrs.name = visitor.name;
  if (visitor.email) attrs.email = visitor.email;
  if (visitor.phone) attrs.phone = visitor.phone;
  if (visitor.userId) attrs.userid = visitor.userId;

  if (Object.keys(attrs).length === 0) return;
  if (!window.Tawk_API?.setAttributes) return;

  const syncKey = JSON.stringify(attrs);
  if (syncKey === lastSyncedKey) return;
  lastSyncedKey = syncKey;

  window.Tawk_API.setAttributes(attrs, (error) => {
    if (error) lastSyncedKey = "";
  });
}

/** Identify a signed-in visitor in Tawk.to after the widget is fully loaded. */
export function syncTawkVisitor(visitor: TawkVisitor) {
  if (typeof window === "undefined") return;
  onTawkReady(() => applyTawkAttributes(visitor));
}

export function clearTawkVisitorSync() {
  lastSyncedKey = "";
}
