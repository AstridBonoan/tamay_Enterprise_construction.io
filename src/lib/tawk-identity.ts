import { onTawkReady } from "@/lib/tawk-ready";

type TawkVisitor = {
  firstName?: string;
  lastName?: string;
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
      onChatMaximized?: () => void;
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
let pendingVisitor: TawkVisitor | null = null;

/** Tawk requires E.164 for the reserved `phone` attribute. */
function e164Phone(phone: string): string | null {
  const trimmed = phone.trim();
  if (/^\+[1-9]\d{1,14}$/.test(trimmed)) return trimmed;
  return null;
}

function buildAttributes(visitor: TawkVisitor): Record<string, string> {
  const attrs: Record<string, string> = {};

  // Use custom keys only — reserved name/email need Secure Mode + hash per Tawk docs.
  if (visitor.userId) attrs.userid = visitor.userId;
  if (visitor.firstName) attrs.firstname = visitor.firstName;
  if (visitor.lastName) attrs.lastname = visitor.lastName;
  if (visitor.email) attrs.useremail = visitor.email;

  const phone = visitor.phone ? e164Phone(visitor.phone) : null;
  if (phone) attrs.phone = phone;

  return attrs;
}

function applyTawkAttributes(visitor: TawkVisitor) {
  const attrs = buildAttributes(visitor);
  if (Object.keys(attrs).length === 0) return;
  if (!window.Tawk_API?.setAttributes) return;

  const syncKey = JSON.stringify(attrs);
  if (syncKey === lastSyncedKey) return;
  lastSyncedKey = syncKey;

  window.Tawk_API.setAttributes(attrs, (error) => {
    if (error) lastSyncedKey = "";
  });
}

function registerChatOpenSync() {
  if (!pendingVisitor) return;

  window.Tawk_API = window.Tawk_API ?? {};
  const previous = window.Tawk_API.onChatMaximized;
  window.Tawk_API.onChatMaximized = function onChatMaximized() {
    previous?.();
    if (pendingVisitor) applyTawkAttributes(pendingVisitor);
  };
}

/**
 * Queue visitor details for Tawk. Sync runs when the visitor opens chat,
 * avoiding setAttributes errors during passive page views.
 */
export function syncTawkVisitor(visitor: TawkVisitor) {
  if (typeof window === "undefined") return;

  pendingVisitor = visitor;
  onTawkReady(registerChatOpenSync);
}

export function clearTawkVisitorSync() {
  pendingVisitor = null;
  lastSyncedKey = "";
}
