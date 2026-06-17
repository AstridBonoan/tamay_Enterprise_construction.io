type TawkVisitor = {
  name?: string;
  email?: string;
  phone?: string;
};

declare global {
  interface Window {
    Tawk_API?: {
      setAttributes?: (
        attrs: Record<string, string>,
        callback?: (error?: Error) => void,
      ) => void;
      onLoad?: () => void;
    };
  }
}

function applyTawkAttributes(visitor: TawkVisitor) {
  const attrs: Record<string, string> = {};
  if (visitor.name) attrs.name = visitor.name;
  if (visitor.email) attrs.email = visitor.email;
  if (visitor.phone) attrs.phone = visitor.phone;
  if (Object.keys(attrs).length === 0) return;

  window.Tawk_API?.setAttributes?.(attrs, (error) => {
    if (error) console.warn("Tawk setAttributes failed:", error);
  });
}

/** Identify the signed-in visitor in Tawk.to chat. */
export function syncTawkVisitor(visitor: TawkVisitor) {
  if (typeof window === "undefined") return;

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
