"use client";

import { useCallback, useEffect, useState } from "react";
import { getRightFloatOccupant, setRightFloatOccupant } from "@/lib/rightFloatOccupancy";

const EXPAND_AFTER_MS = 14_000;
const COLLAPSE_AFTER_MS = 8_000;

function noAutoKey(id: string) {
  return `tamay_float_no_auto_${id}`;
}

/**
 * Contextual CTA starts collapsed, auto-expands once after a delay, then
 * collapses again. Dismiss or CTA click suppress auto-expand for the session.
 * Never auto-expands while the estimator promo occupies the right side.
 */
export function useContextualFloat(id: string) {
  const [ready, setReady] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [suppressAuto, setSuppressAuto] = useState(false);

  useEffect(() => {
    const blocked = window.sessionStorage.getItem(noAutoKey(id)) === "1";
    setSuppressAuto(blocked);
    setReady(true);
  }, [id]);

  useEffect(() => {
    if (expanded) {
      setRightFloatOccupant("cta");
      return;
    }
    if (getRightFloatOccupant() === "cta") {
      setRightFloatOccupant(null);
    }
  }, [expanded]);

  useEffect(() => {
    if (!ready || suppressAuto) return;

    const expandTimer = window.setTimeout(() => {
      if (window.sessionStorage.getItem(noAutoKey(id)) === "1") return;
      if (getRightFloatOccupant() === "estimator") return;
      setExpanded(true);
    }, EXPAND_AFTER_MS);

    return () => window.clearTimeout(expandTimer);
  }, [ready, suppressAuto, id]);

  useEffect(() => {
    if (!expanded || suppressAuto) return;

    const collapseTimer = window.setTimeout(() => {
      setExpanded(false);
    }, COLLAPSE_AFTER_MS);

    return () => window.clearTimeout(collapseTimer);
  }, [expanded, suppressAuto]);

  const blockAutoExpand = useCallback(() => {
    window.sessionStorage.setItem(noAutoKey(id), "1");
    setSuppressAuto(true);
    setExpanded(false);
    window.dispatchEvent(new Event("tamay-float-dismiss"));
  }, [id]);

  const collapse = useCallback(() => {
    blockAutoExpand();
  }, [blockAutoExpand]);

  const expandManually = useCallback(() => {
    setExpanded(true);
  }, []);

  return { ready, expanded, collapse, expandManually, blockAutoExpand };
}
