export type RightFloatOccupant = "cta" | "estimator" | null;

const EVENT = "tamay-right-float";

let occupant: RightFloatOccupant = null;

export function getRightFloatOccupant(): RightFloatOccupant {
  return occupant;
}

export function setRightFloatOccupant(next: RightFloatOccupant) {
  occupant = next;
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(EVENT, { detail: next }));
  }
}

export function subscribeRightFloat(listener: (next: RightFloatOccupant) => void) {
  const handler = (event: Event) => {
    listener((event as CustomEvent<RightFloatOccupant>).detail);
  };
  window.addEventListener(EVENT, handler);
  return () => window.removeEventListener(EVENT, handler);
}

/** Pause after the contextual CTA leaves before showing the estimator. */
export const ESTIMATOR_AFTER_CTA_DELAY_MS = 3_000;
