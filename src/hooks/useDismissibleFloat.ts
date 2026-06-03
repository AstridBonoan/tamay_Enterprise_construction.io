"use client";

import { useCallback, useEffect, useState } from "react";

function storageKey(id: string) {
  return `tamay_float_dismissed_${id}`;
}

/** Dismiss state lasts for the browser session only — floats open on each new visit. */
export function useDismissibleFloat(id: string) {
  const [dismissed, setDismissed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    window.localStorage.removeItem(storageKey(id));
    setDismissed(window.sessionStorage.getItem(storageKey(id)) === "1");
    setReady(true);
  }, [id]);

  const dismiss = useCallback(() => {
    window.sessionStorage.setItem(storageKey(id), "1");
    setDismissed(true);
    window.dispatchEvent(new Event("tamay-float-dismiss"));
  }, [id]);

  const restore = useCallback(() => {
    window.sessionStorage.removeItem(storageKey(id));
    setDismissed(false);
    window.dispatchEvent(new Event("tamay-float-dismiss"));
  }, [id]);

  return { dismissed, dismiss, restore, ready };
}
