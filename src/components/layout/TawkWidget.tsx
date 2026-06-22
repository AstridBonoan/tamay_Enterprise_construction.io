"use client";

import { useEffect } from "react";
import { TAWK } from "@/lib/tawk";
import { TawkChatPlaceholder } from "@/components/layout/TawkChatPlaceholder";

const propertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID ?? TAWK.propertyId;
const widgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID ?? TAWK.widgetId;

function loadTawkScript() {
  if (!propertyId || document.getElementById("tawk-widget")) return;

  window.Tawk_API = window.Tawk_API || {};
  window.Tawk_LoadStart = new Date();
  window.Tawk_API.customStyle = {
    visibility: {
      desktop: { position: "bl", xOffset: 16, yOffset: 24 },
      mobile: { position: "bl", xOffset: 12, yOffset: 12 },
    },
  };

  const script = document.createElement("script");
  script.id = "tawk-widget";
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

/** Tawk.to live chat — bottom-left on all pages. */
export function TawkWidget() {
  useEffect(() => {
    if (!propertyId) return;

    const onLoad = () => {
      loadTawkScript();
    };

    if (document.readyState === "complete") {
      onLoad();
      return;
    }

    window.addEventListener("load", onLoad, { once: true });
    return () => window.removeEventListener("load", onLoad);
  }, []);

  if (!propertyId) {
    return <TawkChatPlaceholder />;
  }

  return null;
}
