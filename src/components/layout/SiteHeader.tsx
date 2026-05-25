"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { NAV_LINKS, SITE } from "@/lib/site";
import { IMAGES } from "@/lib/images";
import { MobileSidebar } from "./MobileSidebar";

const PRIMARY_LABELS = new Set([
  "HOME",
  "CONSTRUCTION",
  "REAL ESTATE",
  "LOGISTICS",
  "HOME PREVENTIVE SERVICES",
  "GALLERY",
]);

const PRIMARY_NAV = NAV_LINKS.filter((l) => PRIMARY_LABELS.has(l.label));
const MORE_NAV = NAV_LINKS.filter((l) => !PRIMARY_LABELS.has(l.label));

export function SiteHeader() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  const openSidebar = useCallback(() => setSidebarOpen(true), []);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <>
      <MobileSidebar open={sidebarOpen} onClose={closeSidebar} />

      <header className="sticky top-0 z-[120] bg-white shadow-sm border-b border-gray-100">
        {/* Mobile & tablet: hamburger */}
        <div className="flex xl:hidden items-center justify-between h-16 px-3 sm:px-4">
          <button
            type="button"
            className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center text-tamay-primary rounded-lg hover:bg-gray-100 active:bg-gray-200 touch-manipulation"
            aria-label="Open menu"
            aria-expanded={sidebarOpen}
            onClick={openSidebar}
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <Link href="/" className="flex items-center justify-center min-h-[44px]">
            <Image
              src={IMAGES.logo}
              alt="Tamay Enterprises"
              width={180}
              height={64}
              className="h-10 sm:h-11 w-auto object-contain max-w-[160px]"
              priority
              unoptimized
            />
          </Link>

          <a
            href={SITE.phoneTel}
            className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center text-tamay-primary rounded-lg hover:bg-gray-100 touch-manipulation"
            aria-label={`Call ${SITE.phone}`}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.36 11.36 0 003.54.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.54 1 1 0 01-.25 1.01l-2.2 2.2z" />
            </svg>
          </a>
        </div>

        {/* Desktop xl+: logo, compact nav, phone */}
        <div className="hidden xl:block max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between gap-6 py-3">
            <Link href="/" className="shrink-0">
              <Image
                src={IMAGES.logo}
                alt="Tamay Enterprises"
                width={260}
                height={90}
                className="h-14 w-auto object-contain"
                priority
                unoptimized
              />
            </Link>

            <nav className="flex-1 flex items-center justify-center gap-0.5 min-w-0">
              {PRIMARY_NAV.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`whitespace-nowrap px-2.5 py-2 text-[11px] font-bold tracking-wide uppercase transition-colors ${
                    isActive(link.href)
                      ? "text-tamay-primary border-b-2 border-tamay-primary"
                      : "text-gray-700 hover:text-tamay-primary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setMoreOpen((v) => !v)}
                  className={`whitespace-nowrap px-2.5 py-2 text-[11px] font-bold tracking-wide uppercase flex items-center gap-1 ${
                    moreOpen ? "text-tamay-primary" : "text-gray-700 hover:text-tamay-primary"
                  }`}
                  aria-expanded={moreOpen}
                >
                  MORE
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {moreOpen && (
                  <>
                    <button
                      type="button"
                      className="fixed inset-0 z-10 cursor-default"
                      aria-label="Close menu"
                      onClick={() => setMoreOpen(false)}
                    />
                    <ul className="absolute right-0 top-full mt-1 z-20 min-w-[220px] bg-white border border-gray-200 shadow-lg py-1">
                      {MORE_NAV.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            onClick={() => setMoreOpen(false)}
                            className={`block px-4 py-2.5 text-xs font-semibold uppercase tracking-wide hover:bg-gray-50 ${
                              isActive(link.href) ? "text-tamay-primary" : "text-gray-700"
                            }`}
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </nav>

            <a
              href={SITE.phoneTel}
              className="shrink-0 text-tamay-primary font-semibold text-base hover:underline whitespace-nowrap"
            >
              {SITE.phone}
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
