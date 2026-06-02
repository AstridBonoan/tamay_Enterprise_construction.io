import Script from "next/script";
import { TAWK } from "@/lib/tawk";
import { TawkChatPlaceholder } from "@/components/layout/TawkChatPlaceholder";

const propertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID ?? TAWK.propertyId;
const widgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID ?? TAWK.widgetId;

/** Tawk.to live chat — bottom-left on all pages. */
export function TawkWidget() {
  if (!propertyId) {
    return <TawkChatPlaceholder />;
  }

  return (
    <>
      <Script id="tawk-config" strategy="beforeInteractive">
        {`
          window.Tawk_API = window.Tawk_API || {};
          window.Tawk_LoadStart = new Date();
          window.Tawk_API.customStyle = {
            visibility: {
              desktop: { position: "bl", xOffset: 16, yOffset: 16 },
              mobile: { position: "bl", xOffset: 12, yOffset: 88 }
            }
          };
        `}
      </Script>
      <Script
        id="tawk-widget"
        strategy="lazyOnload"
        src={`https://embed.tawk.to/${propertyId}/${widgetId}`}
        crossOrigin="anonymous"
      />
    </>
  );
}
