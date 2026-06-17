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
    };
  }
}

let lastSyncedKey = "";

/**
 * Identify a signed-in visitor in Tawk.to using custom attributes.
 * Avoid reserved `name` / `email` keys unless Secure Mode + hash are configured.
 */
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
    if (error) {
      // Tawk may pass `true` or a string error code (e.g. UNAUTHORIZED_API_CALL).
      console.warn("Tawk visitor sync skipped:", error);
      lastSyncedKey = "";
    }
  });
}

function runWhenTawkReady(visitor: TawkVisitor) {
  if (window.Tawk_API?.setAttributes) {
    applyTawkAttributes(visitor);
    return;
  }

  window.Tawk_API = window.Tawk_API ?? {};
  const previousOnLoad = window.Tawk_API.onLoad;
  window.Tawk_API.onLoad = function onLoad() {
    previousOnLoad?.();
    applyTawkAttributes(visitor);
  };
}

/** Identify the signed-in visitor in Tawk.to chat. */
export function syncTawkVisitor(visitor: TawkVisitor) {
  if (typeof window === "undefined") return;
  runWhenTawkReady(visitor);
}

export function clearTawkVisitorSync() {
  lastSyncedKey = "";
}
