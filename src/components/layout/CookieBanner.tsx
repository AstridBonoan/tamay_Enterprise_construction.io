"use client";

import { useEffect, useRef, useState } from "react";

const COOKIE_STORAGE_KEY = "tamay_cookies_accepted";

function readCookieAccepted() {
  if (typeof window === "undefined") return true;
  return window.localStorage.getItem(COOKIE_STORAGE_KEY) === "1";
}

export function CookieBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);
  const [accepted, setAccepted] = useState<boolean | null>(null);

  useEffect(() => {
    setAccepted(readCookieAccepted());
  }, []);

  useEffect(() => {
    if (accepted !== false) {
      document.body.classList.remove("cookie-banner-visible");
      document.documentElement.style.setProperty("--cookie-banner-offset", "0px");
      return;
    }

    document.body.classList.add("cookie-banner-visible");
    const banner = bannerRef.current;
    if (!banner) return;

    const syncOffset = () => {
      const height = banner.getBoundingClientRect().height;
      const isMobile = window.matchMedia("(max-width: 639px)").matches;
      document.documentElement.style.setProperty(
        "--cookie-banner-offset",
        isMobile ? `${height}px` : "0px",
      );
    };

    syncOffset();
    const observer = new ResizeObserver(syncOffset);
    observer.observe(banner);
    window.addEventListener("resize", syncOffset);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncOffset);
      document.body.classList.remove("cookie-banner-visible");
      document.documentElement.style.setProperty("--cookie-banner-offset", "0px");
    };
  }, [accepted]);

  if (accepted !== false) return null;

  const accept = () => {
    window.localStorage.setItem(COOKIE_STORAGE_KEY, "1");
    setAccepted(true);
  };

  return (
    <div
      ref={bannerRef}
      role="dialog"
      aria-labelledby="cookie-banner-title"
      className="fixed bottom-0 left-0 right-0 z-[9999999] bg-white border-t border-gray-300 shadow-lg p-4 pb-[calc(1rem+env(safe-area-inset-bottom,0px))] md:p-6 md:max-w-lg md:left-1/2 md:-translate-x-1/2 md:right-auto md:bottom-4 md:rounded md:border md:pb-6"
    >
      <h4 id="cookie-banner-title" className="font-heading font-semibold text-tamay-primary mb-2">
        This website uses cookies.
      </h4>
      <p className="text-sm text-gray-600 mb-4">
        We use cookies to analyze website traffic and optimize your website experience. By accepting our use of cookies, your data will be aggregated with all other user data.
      </p>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={accept}
          className="bg-tamay-primary hover:bg-tamay-primary-dark text-white font-semibold px-6 py-2 text-sm transition-colors"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
