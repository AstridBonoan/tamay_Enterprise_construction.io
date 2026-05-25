"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { NAV_LINKS, SITE } from "@/lib/site";
import { IMAGES } from "@/lib/images";
import { MobileSidebar } from "./MobileSidebar";

export function SiteHeader() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  const openSidebar = useCallback(() => {
    setSidebarOpen(true);
  }, []);

  const handleMenuClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openSidebar();
  };

  return (
    <>
      <MobileSidebar open={sidebarOpen} onClose={closeSidebar} />

      <header className="sticky top-0 z-[120] bg-white shadow-sm border-b border-gray-100">
        {/* Mobile: 3-column grid — no overlapping touch targets */}
        <div className="grid grid-cols-3 items-center h-16 px-2 sm:px-4 lg:hidden">
          <button
            type="button"
            className="justify-self-start p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center text-tamay-primary rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors touch-manipulation cursor-pointer"
            aria-label="Open menu"
            aria-expanded={sidebarOpen}
            aria-controls="mobile-nav-drawer"
            onClick={handleMenuClick}
          >
            <svg className="w-7 h-7 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <Link href="/" className="justify-self-center flex items-center justify-center min-h-[44px]">
            <Image
              src={IMAGES.logo}
              alt="Tamay Enterprises"
              width={180}
              height={64}
              className="h-10 sm:h-11 w-auto object-contain max-w-[140px] sm:max-w-[180px]"
              priority
              unoptimized
            />
          </Link>

          <a
            href={SITE.phoneTel}
            className="justify-self-end p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center text-tamay-primary rounded-lg hover:bg-gray-100 touch-manipulation"
            aria-label={`Call ${SITE.phone}`}
          >
            <svg className="w-6 h-6 pointer-events-none" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.36 11.36 0 003.54.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.54 1 1 0 01-.25 1.01l-2.2 2.2z" />
            </svg>
          </a>
        </div>

        {/* Desktop header */}
        <div className="hidden lg:block max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-24 gap-4">
            <Link href="/" className="shrink-0">
              <Image
                src={IMAGES.logo}
                alt="Tamay Enterprises"
                width={280}
                height={98}
                className="h-[72px] w-auto object-contain"
                priority
                unoptimized
              />
            </Link>
            <a
              href={SITE.phoneTel}
              className="text-tamay-primary font-semibold text-lg hover:underline whitespace-nowrap"
            >
              {SITE.phone}
            </a>
          </div>
          <nav className="border-t border-gray-100 pb-1">
            <ul className="flex flex-wrap justify-center gap-1 text-sm font-semibold tracking-wide">
              {NAV_LINKS.map((link) => {
                const active = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`block px-3 py-3 transition-colors ${
                        active
                          ? "text-tamay-primary border-b-2 border-tamay-primary"
                          : "text-gray-700 hover:text-tamay-primary"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
