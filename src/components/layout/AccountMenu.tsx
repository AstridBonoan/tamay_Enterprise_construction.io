"use client";

import Link from "next/link";
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
  const iconClass = compact ? "w-6 h-6" : "w-7 h-7";
  const signInHref = `${assetUrl("/m/login/")}?r=%2Fm%2Faccount`;
  const signUpHref = assetUrl("/m/create-account/");
  const bookingsSignInHref = `${assetUrl("/m/login/")}?r=${encodeURIComponent(assetUrl("/m/bookings/"))}`;
  const accountSignInHref = `${assetUrl("/m/login/")}?r=${encodeURIComponent(assetUrl("/m/account/"))}`;

  return (
    <div className="relative">
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
        <>
          <button
            type="button"
            className="fixed inset-0 z-[120] cursor-default"
            aria-label="Close account menu"
            onClick={onClose}
          />
          <ul
            className="absolute right-0 top-full mt-1 z-[130] min-w-[220px] bg-white border border-gray-200 shadow-lg py-2"
            role="menu"
          >
            <li role="none">
              <Link
                href={signInHref}
                role="menuitem"
                onClick={onClose}
                className="w-full text-left block px-5 py-3 text-sm font-semibold uppercase tracking-wide text-gray-900 hover:bg-gray-50 hover:text-tamay-primary transition-colors"
              >
                SIGN IN
              </Link>
            </li>
            <li role="none">
              <Link
                href={signUpHref}
                role="menuitem"
                onClick={onClose}
                className="w-full text-left block px-5 py-3 text-sm font-semibold uppercase tracking-wide text-gray-900 hover:bg-gray-50 hover:text-tamay-primary transition-colors"
              >
                SIGN UP
              </Link>
            </li>
            <li role="separator" className="my-1 border-t border-gray-200" />
            <li role="none">
              <Link
                href={bookingsSignInHref}
                role="menuitem"
                onClick={onClose}
                className="w-full text-left block px-5 py-3 text-sm font-semibold uppercase tracking-wide text-gray-900 hover:bg-gray-50 hover:text-tamay-primary transition-colors"
              >
                BOOKINGS
              </Link>
            </li>
            <li role="none">
              <Link
                href={accountSignInHref}
                role="menuitem"
                onClick={onClose}
                className="w-full text-left block px-5 py-3 text-sm font-semibold uppercase tracking-wide text-gray-900 hover:bg-gray-50 hover:text-tamay-primary transition-colors"
              >
                MY ACCOUNT
              </Link>
            </li>
          </ul>
        </>
      )}
    </div>
  );
}
