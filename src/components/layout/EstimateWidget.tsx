"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ESTIMATE, SITE } from "@/lib/site";
import { IMAGES } from "@/lib/images";

/** Opens on each page load/refresh; closing hides it until the next refresh. */
export function EstimateWidget() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = window.setTimeout(() => setVisible(true), 800);
    return () => window.clearTimeout(timer);
  }, []);

  const close = useCallback(() => {
    setVisible(false);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visible]);

  if (!mounted || !visible) return null;

  const modal = (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="estimate-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/60 cursor-default"
        aria-label="Close estimate popup"
        onClick={close}
      />

      <div
        className="relative z-10 w-full max-w-[420px] bg-white rounded-xl shadow-2xl overflow-hidden animate-[fadeIn_0.25s_ease-out]"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        role="document"
      >
        {/* Photo only — no text baked into this image */}
        <div className="relative h-36 sm:h-[168px] bg-gray-200">
          <Image
            src={IMAGES.estimateModalPhoto}
            alt=""
            fill
            className="object-cover object-center"
            sizes="420px"
            unoptimized
            priority
          />
          <button
            type="button"
            onClick={close}
            className="absolute top-3 right-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-600 shadow-md hover:bg-gray-50 text-2xl font-light leading-none transition-colors"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="px-6 py-5 text-center">
          <h3
            id="estimate-modal-title"
            className="font-heading text-[15px] sm:text-base font-semibold text-tamay-primary mb-3 uppercase tracking-wider leading-snug"
          >
            {ESTIMATE.title}
          </h3>
          <p className="text-sm text-gray-600 mb-5 leading-relaxed">
            {ESTIMATE.description}
          </p>
          <Link
            href={SITE.estimateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-tamay-primary hover:bg-tamay-primary-dark text-white font-bold py-3.5 px-4 text-sm tracking-widest uppercase transition-colors rounded-sm"
          >
            {ESTIMATE.ctaLabel}
          </Link>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
