"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { NAV_LINKS, SITE } from "@/lib/site";
import { IMAGES } from "@/lib/images";

type MobileSidebarProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileSidebar({ open, onClose }: MobileSidebarProps) {
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
    <div className="lg:hidden">
      <div
        role="presentation"
        className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <aside
        id="mobile-nav-drawer"
        className="fixed top-0 left-0 z-[210] h-dvh w-[min(88vw,320px)] max-w-full bg-white shadow-2xl flex flex-col translate-x-0"
        style={{
          animation: "slideInLeft 0.3s cubic-bezier(0.32, 0.72, 0, 1) forwards",
        }}
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4 bg-tamay-primary shrink-0">
          <Link href="/" onClick={onClose} className="shrink-0">
            <Image
              src={IMAGES.logo}
              alt="Tamay Enterprises"
              width={200}
              height={70}
              className="h-12 w-auto object-contain brightness-0 invert"
              unoptimized
            />
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-white hover:bg-white/10 rounded transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto overscroll-contain py-2">
          <ul>
            {NAV_LINKS.map((link) => {
              const active =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={`block px-5 py-3.5 text-sm font-semibold tracking-wide border-l-4 transition-colors ${
                      active
                        ? "border-tamay-accent bg-tamay-primary/5 text-tamay-primary"
                        : "border-transparent text-gray-700 hover:bg-gray-50 hover:text-tamay-primary"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-gray-100 p-5 space-y-3 bg-gray-50 shrink-0 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
          <a
            href={SITE.phoneTel}
            className="flex items-center gap-2 text-tamay-primary font-bold text-lg"
          >
            <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.36 11.36 0 003.54.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.54 1 1 0 01-.25 1.01l-2.2 2.2z" />
            </svg>
            {SITE.phone}
          </a>
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-tamay-primary hover:bg-tamay-primary-dark text-white font-bold py-3 text-sm transition-colors"
          >
            WhatsApp
          </a>
          <Link
            href={SITE.hiringUrl}
            onClick={onClose}
            className="block w-full text-center border-2 border-tamay-primary text-tamay-primary font-bold py-2.5 text-sm"
          >
            WE ARE HIRING
          </Link>
        </div>
      </aside>
    </div>
  );

  return createPortal(panel, document.body);
}
