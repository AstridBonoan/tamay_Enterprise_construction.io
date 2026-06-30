"use client";

import Link from "next/link";
import { useAuth } from "@/components/auth/AuthProvider";
import { navigateToSitePath } from "@/lib/paths";

function UserIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 12c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm0 2c-2.7 0-8 1.3-8 4v2h16v-2c0-2.7-5.3-4-8-4z" />
    </svg>
  );
}

const iconButtonClass =
  "p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-gray-900 hover:text-tamay-primary rounded-lg hover:bg-gray-100 transition-colors touch-manipulation";

const menuItemClass =
  "w-full text-left block px-5 py-3 text-sm font-semibold uppercase tracking-wide text-gray-900 hover:bg-gray-50 hover:text-tamay-primary transition-colors";

type AccountMenuProps = {
  compact?: boolean;
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
};

function greetingName(firstName: string, lastName: string): string {
  const name = firstName.trim() || lastName.trim();
  return name || "there";
}

export function AccountMenu({ compact = false, open, onToggle, onClose }: AccountMenuProps) {
  const { user, loading, signOut } = useAuth();
  const iconClass = compact ? "w-6 h-6" : "w-7 h-7";
  const signedIn = !loading && !!user;
  const helloName = user ? greetingName(user.firstName, user.lastName) : "";

  const handleSignOut = async () => {
    onClose();
    await signOut();
    navigateToSitePath("/");
  };

  return (
    <div className="relative flex items-center gap-1 sm:gap-2">
      {signedIn && (
        <span
          className={`font-semibold text-gray-900 truncate ${
            compact ? "hidden sm:inline max-w-[120px] text-xs" : "hidden lg:inline max-w-[160px] text-sm"
          }`}
        >
          Hello, {helloName}
        </span>
      )}

      <button
        type="button"
        onClick={onToggle}
        className={iconButtonClass}
        aria-label={signedIn ? `Account menu for ${helloName}` : "Account menu"}
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
            className="absolute right-0 top-full mt-1 z-[130] min-w-[240px] bg-white border border-gray-200 shadow-lg py-2"
            role="menu"
          >
            {signedIn ? (
              <>
                <li role="none" className="px-5 py-2 border-b border-gray-100 sm:hidden">
                  <p className="text-sm font-semibold text-gray-900">Hello, {helloName}</p>
                </li>
                <li role="none">
                  <Link href="/m/account/" role="menuitem" onClick={onClose} className={menuItemClass}>
                    Your Account
                  </Link>
                </li>
                <li role="none">
                  <Link href="/m/bookings/" role="menuitem" onClick={onClose} className={menuItemClass}>
                    Bookings
                  </Link>
                </li>
                <li role="separator" className="my-1 border-t border-gray-200" />
                <li role="none">
                  <button type="button" role="menuitem" onClick={handleSignOut} className={menuItemClass}>
                    Sign Out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li role="none">
                  <Link href="/m/login/" role="menuitem" onClick={onClose} className={menuItemClass}>
                    Sign In
                  </Link>
                </li>
                <li role="none">
                  <Link href="/m/create-account/" role="menuitem" onClick={onClose} className={menuItemClass}>
                    Sign Up
                  </Link>
                </li>
                <li role="separator" className="my-1 border-t border-gray-200" />
                <li role="none">
                  <Link href="/m/login/?r=%2Fm%2Fbookings%2F" role="menuitem" onClick={onClose} className={menuItemClass}>
                    Bookings
                  </Link>
                </li>
                <li role="none">
                  <Link href="/m/login/" role="menuitem" onClick={onClose} className={menuItemClass}>
                    My Account
                  </Link>
                </li>
              </>
            )}
          </ul>
        </>
      )}
    </div>
  );
}
