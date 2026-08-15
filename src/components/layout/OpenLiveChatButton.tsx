"use client";

import { openExistingTawkChat } from "@/lib/tawk";

type OpenLiveChatButtonProps = {
  children: React.ReactNode;
  className?: string;
};

export function OpenLiveChatButton({ children, className = "" }: OpenLiveChatButtonProps) {
  return (
    <button type="button" className={className} onClick={() => openExistingTawkChat()}>
      {children}
    </button>
  );
}
