"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  ESTIMATOR_ACCUM_KEY,
  ESTIMATOR_DISMISS_DAYS,
  ESTIMATOR_ENGAGE_DAYS,
  ESTIMATOR_STORAGE_KEY,
  ESTIMATOR_THRESHOLD_MS,
  isEstimatorEligiblePath,
  type EstimatorPromoRecord,
} from "@/lib/estimatorPromo";
import {
  ESTIMATOR_AFTER_CTA_DELAY_MS,
  getRightFloatOccupant,
  setRightFloatOccupant,
  subscribeRightFloat,
} from "@/lib/rightFloatOccupancy";

function daysFromNow(days: number) {
  return Date.now() + days * 24 * 60 * 60 * 1000;
}

function readSuppressed(): boolean {
  try {
    const session = window.sessionStorage.getItem(ESTIMATOR_STORAGE_KEY);
    if (session === "dismissed" || session === "engaged") return true;

    const raw = window.localStorage.getItem(ESTIMATOR_STORAGE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw) as EstimatorPromoRecord;
    if (parsed?.until && Date.now() < parsed.until) return true;
    window.localStorage.removeItem(ESTIMATOR_STORAGE_KEY);
  } catch {
    /* ignore storage errors */
  }
  return false;
}

function persist(status: EstimatorPromoRecord["status"], days: number) {
  const record: EstimatorPromoRecord = { status, until: daysFromNow(days) };
  window.sessionStorage.setItem(ESTIMATOR_STORAGE_KEY, status);
  window.localStorage.setItem(ESTIMATOR_STORAGE_KEY, JSON.stringify(record));
}

export function useEstimatorPromo() {
  const pathname = usePathname();
  const eligible = isEstimatorEligiblePath(pathname);
  const [thresholdMet, setThresholdMet] = useState(false);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const [occupant, setOccupant] = useState(getRightFloatOccupant());
  const blockedByCtaRef = useRef(false);

  useEffect(() => subscribeRightFloat(setOccupant), []);

  useEffect(() => {
    if (!eligible) {
      setThresholdMet(false);
      setVisible(false);
      setReady(true);
      return;
    }

    if (readSuppressed()) {
      setThresholdMet(false);
      setVisible(false);
      setReady(true);
      return;
    }

    setReady(true);
    const started = Date.now();
    const prior = Number(window.sessionStorage.getItem(ESTIMATOR_ACCUM_KEY) || "0") || 0;

    const tick = () => {
      if (readSuppressed()) {
        setThresholdMet(false);
        setVisible(false);
        return;
      }
      const elapsed = prior + (Date.now() - started);
      window.sessionStorage.setItem(ESTIMATOR_ACCUM_KEY, String(elapsed));
      if (elapsed >= ESTIMATOR_THRESHOLD_MS) {
        setThresholdMet(true);
      }
    };

    tick();
    const interval = window.setInterval(tick, 1000);
    return () => {
      window.clearInterval(interval);
      const elapsed = prior + (Date.now() - started);
      window.sessionStorage.setItem(ESTIMATOR_ACCUM_KEY, String(elapsed));
    };
  }, [eligible, pathname]);

  useEffect(() => {
    if (!eligible || !thresholdMet || readSuppressed()) {
      if (getRightFloatOccupant() === "estimator") {
        setRightFloatOccupant(null);
      }
      setVisible(false);
      return;
    }

    if (occupant === "cta") {
      blockedByCtaRef.current = true;
      setVisible(false);
      if (getRightFloatOccupant() === "estimator") {
        setRightFloatOccupant(null);
      }
      return;
    }

    const delay = blockedByCtaRef.current ? ESTIMATOR_AFTER_CTA_DELAY_MS : 0;
    const timer = window.setTimeout(() => {
      if (readSuppressed()) return;
      if (getRightFloatOccupant() === "cta") return;
      blockedByCtaRef.current = false;
      setRightFloatOccupant("estimator");
      setVisible(true);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [eligible, thresholdMet, occupant]);

  const dismiss = useCallback(() => {
    persist("dismissed", ESTIMATOR_DISMISS_DAYS);
    if (getRightFloatOccupant() === "estimator") {
      setRightFloatOccupant(null);
    }
    setVisible(false);
    setThresholdMet(false);
  }, []);

  const engage = useCallback(() => {
    persist("engaged", ESTIMATOR_ENGAGE_DAYS);
    if (getRightFloatOccupant() === "estimator") {
      setRightFloatOccupant(null);
    }
    setVisible(false);
    setThresholdMet(false);
  }, []);

  return { ready, visible: ready && eligible && visible, dismiss, engage };
}
