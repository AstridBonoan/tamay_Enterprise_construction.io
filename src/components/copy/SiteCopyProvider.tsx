"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

type SiteCopyContextValue = {
  copy: Record<string, string>;
  applyCopy: (key: string, value: string) => void;
  clearCopy: (key: string) => void;
};

const SiteCopyContext = createContext<SiteCopyContextValue>({
  copy: {},
  applyCopy: () => undefined,
  clearCopy: () => undefined,
});

export function SiteCopyProvider({
  copy: initialCopy,
  children,
}: {
  copy: Record<string, string>;
  children: ReactNode;
}) {
  const [copy, setCopy] = useState(initialCopy);

  const applyCopy = useCallback((key: string, value: string) => {
    setCopy((prev) => ({ ...prev, [key]: value }));
  }, []);

  const clearCopy = useCallback((key: string) => {
    setCopy((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const value = useMemo(() => ({ copy, applyCopy, clearCopy }), [applyCopy, clearCopy, copy]);

  return <SiteCopyContext.Provider value={value}>{children}</SiteCopyContext.Provider>;
}

export function useSiteCopyMap() {
  return useContext(SiteCopyContext);
}

export function useSiteCopy(key: string, fallback: string): string {
  const { copy } = useContext(SiteCopyContext);
  const value = copy[key];
  return value?.trim() ? value : fallback;
}
