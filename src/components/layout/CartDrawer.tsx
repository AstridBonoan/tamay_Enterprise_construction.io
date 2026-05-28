"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { SITE } from "@/lib/site";

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
  itemCount?: number;
};

function CartIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M7 20c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM7.2 16h9.7c.8 0 1.5-.5 1.8-1.2l2.8-6.5A1 1 0 0 0 20.6 7H6.3L5.8 4H2V2h4l1 12.2c0 .4.3.8.7.8h.5z" />
    </svg>
  );
}

export function CartDrawer({ open, onClose, itemCount = 0 }: CartDrawerProps) {
  const pathname = usePathname();
  const pathnameRef = useRef(pathname);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      pathnameRef.current = pathname;
      return;
    }
    if (pathnameRef.current !== pathname) {
      pathnameRef.current = pathname;
      onClose();
    }
  }, [pathname, onClose, open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!mounted || !open) return null;

  const panel = (
    <>
      <div
        role="presentation"
        className="fixed inset-0 z-[220] bg-black/40 backdrop-blur-[1px]"
        onClick={onClose}
      />

      <aside
        id="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className="fixed top-0 right-0 z-[230] h-dvh w-[min(92vw,380px)] max-w-full bg-[#f3f3f3] shadow-2xl flex flex-col"
        style={{
          animation: "slideInRight 0.32s cubic-bezier(0.32, 0.72, 0, 1) forwards",
        }}
      >
        <div className="flex items-center justify-between bg-tamay-primary px-4 py-3.5 shrink-0">
          <div className="flex items-center gap-2.5 text-white">
            <CartIcon className="w-6 h-6" />
            <span
              className="inline-flex items-center justify-center min-w-[1.35rem] h-[1.35rem] px-1 rounded-full bg-white text-tamay-primary text-xs font-bold leading-none"
              aria-label={`${itemCount} items in cart`}
            >
              {itemCount}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-white hover:bg-white/10 rounded transition-colors"
            aria-label="Close cart"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-800 mb-3">Cart is empty</h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 max-w-[260px]">
            Looks like you just haven&apos;t found the right thing yet.
          </p>
          <Link
            href={SITE.headerCartUrl}
            onClick={onClose}
            className="text-tamay-primary font-semibold text-base underline underline-offset-4 hover:text-tamay-primary-dark transition-colors"
          >
            Browse Services
          </Link>
        </div>
      </aside>
    </>
  );

  return createPortal(panel, document.body);
}
