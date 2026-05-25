"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { SITE } from "@/lib/site";
import { IMAGES } from "@/lib/images";

const STORAGE_KEY = "tamay-estimate-dismissed";

export function EstimateWidget() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const dismissed = sessionStorage.getItem(STORAGE_KEY) === "1";
    if (!dismissed) {
      const timer = window.setTimeout(() => setVisible(true), 600);
      return () => window.clearTimeout(timer);
    }
  }, []);

  const close = useCallback(() => {
    setVisible(false);
    sessionStorage.setItem(STORAGE_KEY, "1");
  }, []);

  useEffect(() => {
    if (!visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visible]);

  if (!mounted) return null;

  const reopenButton = !visible && (
    <button
      type="button"
      onClick={() => setVisible(true)}
      className="fixed bottom-4 right-4 z-[85] bg-tamay-primary hover:bg-tamay-primary-dark text-white px-4 py-2.5 rounded-md shadow-lg text-xs font-bold tracking-wide transition-colors"
    >
      ESTIMATE MY PROJECT
    </button>
  );

  if (!visible) {
    return createPortal(reopenButton, document.body);
  }

  const modal = (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="estimate-modal-title"
    >
      {/* Backdrop — click outside to close */}
      <button
        type="button"
        className="absolute inset-0 bg-black/55 backdrop-blur-[2px] cursor-default"
        aria-label="Close estimate popup"
        onClick={close}
      />

      {/* Centered card */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-lg shadow-2xl overflow-hidden animate-[fadeIn_0.25s_ease-out]">
        <div className="relative h-36 sm:h-40 bg-gray-100">
          <Image
            src={IMAGES.estimatePopup}
            onError={(e) => {
              const img = e.currentTarget;
              if (!img.src.includes("HomePageImage4")) {
                img.src = IMAGES.estimatePopupFallback;
              }
            }}
            alt=""
            fill
            className="object-cover object-center"
            sizes="(max-width: 448px) 100vw, 448px"
            unoptimized
            priority
          />
          <button
            type="button"
            onClick={close}
            className="absolute top-3 right-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-500 shadow hover:bg-white hover:text-gray-800 text-xl leading-none transition-colors"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="p-5 sm:p-6 text-center sm:text-left">
          <h3
            id="estimate-modal-title"
            className="font-heading text-base sm:text-lg font-semibold text-tamay-primary mb-3 uppercase tracking-wide leading-snug"
          >
            Need Help with a Small Home Project?
          </h3>
          <p className="text-sm text-gray-600 mb-5 leading-relaxed">
            TV mounting, faucet replacements, vanity installs, painting, drywall patches, lighting,
            and more — get a quick estimate for your project today.
          </p>
          <Link
            href={SITE.estimateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-tamay-primary hover:bg-tamay-primary-dark text-white font-bold py-3 px-4 text-sm tracking-widest uppercase transition-colors rounded-sm"
            onClick={close}
          >
            Estimate My Project
          </Link>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
