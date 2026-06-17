type TawkReadyHandler = () => void;

let tawkReady = false;
const readyQueue: TawkReadyHandler[] = [];

/** Called when the Tawk embed finishes loading. */
export function markTawkReady() {
  if (tawkReady) return;
  tawkReady = true;
  readyQueue.splice(0).forEach((handler) => handler());
}

/** Run once Tawk is ready (immediately if already loaded). */
export function onTawkReady(handler: TawkReadyHandler) {
  if (tawkReady) {
    handler();
    return;
  }
  readyQueue.push(handler);
}

export function isTawkReady() {
  return tawkReady;
}
