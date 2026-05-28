"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { NAV_MORE, NAV_PRIMARY, SITE } from "@/lib/site";
import { IMAGES } from "@/lib/images";
import { AccountMenu } from "./AccountMenu";
import { CartDrawer } from "./CartDrawer";
import { MobileSidebar } from "./MobileSidebar";

const iconLinkClass =
  "p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-gray-900 hover:text-tamay-primary rounded-lg hover:bg-gray-100 transition-colors touch-manipulation";

function CartIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M7 20c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM7.2 16h9.7c.8 0 1.5-.5 1.8-1.2l2.8-6.5A1 1 0 0 0 20.6 7H6.3L5.8 4H2V2h4l1 12.2c0 .4.3.8.7.8h.5z" />
    </svg>
  );
}

function HeaderToolbar({
  compact = false,
  onOpenCart,
  accountOpen,
  onToggleAccount,
  onCloseAccount,
}: {
  compact?: boolean;
  onOpenCart: () => void;
  accountOpen: boolean;
  onToggleAccount: () => void;
  onCloseAccount: () => void;
}) {
  const iconClass = compact ? "w-6 h-6" : "w-7 h-7";
  return (
    <div className="flex items-center gap-1 sm:gap-2 shrink-0">
      <button type="button" onClick={onOpenCart} className={iconLinkClass} aria-label="Open cart">
        <CartIcon className={iconClass} />
      </button>
      <AccountMenu
        compact={compact}
        open={accountOpen}
        onToggle={onToggleAccount}
        onClose={onCloseAccount}
      />
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  const openSidebar = useCallback(() => setSidebarOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);
  const openCart = useCallback(() => {
    setAccountOpen(false);
    setMoreOpen(false);
    setCartOpen(true);
  }, []);
  const closeAccount = useCallback(() => setAccountOpen(false), []);
  const toggleAccount = useCallback(() => {
    setCartOpen(false);
    setMoreOpen(false);
    setAccountOpen((v) => !v);
  }, []);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <>
      <MobileSidebar open={sidebarOpen} onClose={closeSidebar} />
      <CartDrawer open={cartOpen} onClose={closeCart} />

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

          <HeaderToolbar
            compact
            onOpenCart={openCart}
            accountOpen={accountOpen}
            onToggleAccount={toggleAccount}
            onCloseAccount={closeAccount}
          />
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
              {NAV_PRIMARY.map((link) => (
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
                      {NAV_MORE.map((link) => (
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

            <HeaderToolbar
              onOpenCart={openCart}
              accountOpen={accountOpen}
              onToggleAccount={toggleAccount}
              onCloseAccount={closeAccount}
            />
          </div>
        </div>
      </header>
    </>
  );
}
