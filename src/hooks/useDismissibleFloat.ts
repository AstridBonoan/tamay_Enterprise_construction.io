"use client";

import { useCallback, useEffect, useState } from "react";

function storageKey(id: string) {
  return `tamay_float_dismissed_${id}`;
}

export function useDismissibleFloat(id: string) {
  const [dismissed, setDismissed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setDismissed(window.localStorage.getItem(storageKey(id)) === "1");
    setReady(true);
  }, [id]);

  const dismiss = useCallback(() => {
    window.localStorage.setItem(storageKey(id), "1");
    setDismissed(true);
  }, [id]);

  const restore = useCallback(() => {
    window.localStorage.removeItem(storageKey(id));
    setDismissed(false);
  }, [id]);

  return { dismissed, dismiss, restore, ready };
}
