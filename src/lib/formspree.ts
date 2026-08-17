/** Formspree endpoints — override per form via NEXT_PUBLIC_FORMSPREE_* env vars if needed. */
export const FORMSPREE_ENDPOINT = "https://formspree.io/f/mqedjwda";

export const FORMSPREE_CONTACT =
  process.env.NEXT_PUBLIC_FORMSPREE_CONTACT ?? FORMSPREE_ENDPOINT;

export const FORMSPREE_JOB_APPLICATION =
  process.env.NEXT_PUBLIC_FORMSPREE_JOB_APPLICATION ?? FORMSPREE_ENDPOINT;
