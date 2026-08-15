"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { IMAGES } from "@/lib/images";
import { markTawkApiReady, TAWK } from "@/lib/tawk";
import { TawkChatPlaceholder } from "@/components/layout/TawkChatPlaceholder";

const propertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID ?? TAWK.propertyId;
const widgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID ?? TAWK.widgetId;
const TAWK_SCRIPT_ID = "tawk-widget";

function loadTawkScript(onReady: () => void) {
  if (!propertyId) return;

  window.Tawk_API = window.Tawk_API || {};
  window.Tawk_API.customStyle = {
    zIndex: "9997",
    visibility: {
      desktop: { position: "bl", xOffset: 16, yOffset: 24 },
      mobile: { position: "bl", xOffset: 12, yOffset: 12 },
    },
  };

  const previousOnLoad = window.Tawk_API.onLoad;
  window.Tawk_API.onLoad = () => {
    previousOnLoad?.();
    window.Tawk_API?.hideWidget?.();
    onReady();
  };

  if (document.getElementById(TAWK_SCRIPT_ID)) {
    if (window.Tawk_API.hideWidget) {
      window.Tawk_API.hideWidget();
      onReady();
    }
    return;
  }

  window.Tawk_LoadStart = new Date();

  const script = document.createElement("script");
  script.id = TAWK_SCRIPT_ID;
  script.async = true;
  script.charset = "UTF-8";
  script.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;

  const firstScript = document.getElementsByTagName("script")[0];
  if (firstScript?.parentNode) {
    firstScript.parentNode.insertBefore(script, firstScript);
  } else {
    document.body.appendChild(script);
  }
}

/** Tawk.to live chat — Tamay logo launcher on mobile and desktop. */
export function TawkWidget() {
  const [ready, setReady] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    if (!propertyId) return;

    const onLoad = () => {
      loadTawkScript(() => {
        markTawkApiReady();
        setReady(true);
      });
    };

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }

    return () => window.removeEventListener("load", onLoad);
  }, []);

  useEffect(() => {
    if (!ready || !window.Tawk_API) return;

    window.Tawk_API.onChatMaximized = () => setChatOpen(true);
    window.Tawk_API.onChatMinimized = () => {
      setChatOpen(false);
      window.Tawk_API?.hideWidget?.();
    };
  }, [ready]);

  if (!propertyId) {
    return <TawkChatPlaceholder />;
  }

  const openChat = () => {
    const api = window.Tawk_API;
    if (!api) return;
    api.showWidget?.();
    api.maximize?.();
    setChatOpen(true);
  };

  return (
    <button
      type="button"
      onClick={openChat}
      className={`fixed left-3 z-[85] flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-white shadow-lg border-2 border-tamay-accent hover:scale-105 transition-transform bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px)+var(--cookie-banner-offset,0px))] sm:left-4 sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] ${
        chatOpen ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-label="Open live chat"
    >
      <Image
        src={IMAGES.logoSmall}
        alt="Tamay Enterprises"
        width={48}
        height={48}
        className="h-10 w-10 object-contain"
        unoptimized
      />
    </button>
  );
}
