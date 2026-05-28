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

type AccountMenuProps = { compact?: boolean };

export function AccountMenu({ compact = false }: AccountMenuProps) {
  const iconClass = compact ? "w-6 h-6" : "w-7 h-7";

  return (
    <Link href={assetUrl("/m/auth/")} className={iconButtonClass} aria-label="Account options">
      <span className="sr-only">Account options</span>
      <span aria-hidden>
        <UserIcon className={iconClass} />
      </span>
    </Link>
  );
}
