"use client";

import { useState } from "react";

export function CookieBanner() {
  const [accepted, setAccepted] = useState(false);

  if (accepted) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[80] bg-white border-t border-gray-300 shadow-lg p-4 md:p-6 md:max-w-lg md:left-4 md:bottom-4 md:rounded md:border">
      <h4 className="font-heading font-semibold text-tamay-primary mb-2">
        This website uses cookies.
      </h4>
      <p className="text-sm text-gray-600 mb-4">
        We use cookies to analyze website traffic and optimize your website experience. By accepting our use of cookies, your data will be aggregated with all other user data.
      </p>
      <button
        type="button"
        onClick={() => setAccepted(true)}
        className="bg-tamay-primary hover:bg-tamay-primary-dark text-white font-semibold px-6 py-2 text-sm transition-colors"
      >
        Accept
      </button>
    </div>
  );
}
