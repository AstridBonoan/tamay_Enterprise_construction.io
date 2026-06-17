type TawkVisitor = {
  userId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
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

const visitorSyncEnabled = process.env.NEXT_PUBLIC_TAWK_VISITOR_SYNC === "true";

function applyTawkAttributes(visitor: TawkVisitor) {
  const attrs: Record<string, string> = {};

  if (visitor.userId) attrs.userid = visitor.userId;
  if (visitor.firstName) attrs.firstname = visitor.firstName;
  if (visitor.lastName) attrs.lastname = visitor.lastName;
  if (visitor.email) attrs.useremail = visitor.email;
  if (visitor.phone) attrs.phone = visitor.phone;

  if (Object.keys(attrs).length === 0) return;

  const syncKey = JSON.stringify(attrs);
  if (syncKey === lastSyncedKey) return;
  lastSyncedKey = syncKey;

  window.Tawk_API?.setAttributes?.(attrs, (error) => {
    if (error) lastSyncedKey = "";
  });
}

function runWhenTawkReady(visitor: TawkVisitor) {
  window.Tawk_API = window.Tawk_API ?? {};
  const previousOnLoad = window.Tawk_API.onLoad;

  window.Tawk_API.onLoad = function onLoad() {
    previousOnLoad?.();
    applyTawkAttributes(visitor);
  };
}

/**
 * Identify a signed-in visitor in Tawk.to chat.
 * Off by default — Tawk Secure Mode blocks setAttributes and logs console errors.
 * Enable after turning off Secure Mode in Tawk admin:
 *   NEXT_PUBLIC_TAWK_VISITOR_SYNC=true
 */
export function syncTawkVisitor(visitor: TawkVisitor) {
  if (typeof window === "undefined" || !visitorSyncEnabled) return;
  runWhenTawkReady(visitor);
}

export function clearTawkVisitorSync() {
  lastSyncedKey = "";
}
