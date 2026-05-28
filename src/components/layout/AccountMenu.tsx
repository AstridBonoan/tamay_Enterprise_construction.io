"use client";

import { useEffect, useRef } from "react";
import { assetUrl } from "@/lib/assetUrl";

function UserIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 12c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm0 2c-2.7 0-8 1.3-8 4v2h16v-2c0-2.7-5.3-4-8-4z" />
    </svg>
  );
}

const iconButtonClass =
  "p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-gray-900 hover:text-tamay-primary rounded-lg hover:bg-gray-100 transition-colors touch-manipulation";

type AccountMenuProps = {
  compact?: boolean;
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
};

export function AccountMenu({ compact = false, open, onToggle, onClose }: AccountMenuProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const iconClass = compact ? "w-6 h-6" : "w-7 h-7";
  const signInHref = `${assetUrl("/m/login/")}?r=%2Fm%2Faccount`;
  const signUpHref = assetUrl("/m/create-account/");
  const bookingsSignInHref = `${assetUrl("/m/login/")}?r=${encodeURIComponent(assetUrl("/m/bookings/"))}`;
  const accountSignInHref = `${assetUrl("/m/login/")}?r=${encodeURIComponent(assetUrl("/m/account/"))}`;

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={onToggle}
        className={iconButtonClass}
        aria-label="Account menu"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <UserIcon className={iconClass} />
      </button>

      {open && (
        <ul
          className="absolute right-0 top-full mt-1 z-[130] min-w-[220px] bg-white border border-gray-200 shadow-lg py-2"
          role="menu"
        >
          <li role="none">
            <a
              href={signInHref}
              role="menuitem"
              onClick={() => {
                onClose();
              }}
              className="w-full text-left block px-5 py-3 text-sm font-semibold uppercase tracking-wide text-gray-900 hover:bg-gray-50 hover:text-tamay-primary transition-colors"
            >
              SIGN IN
            </a>
          </li>
          <li role="none">
            <a
              href={signUpHref}
              role="menuitem"
              onClick={() => {
                onClose();
              }}
              className="w-full text-left block px-5 py-3 text-sm font-semibold uppercase tracking-wide text-gray-900 hover:bg-gray-50 hover:text-tamay-primary transition-colors"
            >
              SIGN UP
            </a>
          </li>
          <li role="separator" className="my-1 border-t border-gray-200" />
          <li role="none">
            <a
              href={bookingsSignInHref}
              role="menuitem"
              onClick={() => onClose()}
              className="w-full text-left block px-5 py-3 text-sm font-semibold uppercase tracking-wide text-gray-900 hover:bg-gray-50 hover:text-tamay-primary transition-colors"
            >
              BOOKINGS
            </a>
          </li>
          <li role="none">
            <a
              href={accountSignInHref}
              role="menuitem"
              onClick={() => onClose()}
              className="w-full text-left block px-5 py-3 text-sm font-semibold uppercase tracking-wide text-gray-900 hover:bg-gray-50 hover:text-tamay-primary transition-colors"
            >
              MY ACCOUNT
            </a>
          </li>
        </ul>
      )}
    </div>
  );
}
