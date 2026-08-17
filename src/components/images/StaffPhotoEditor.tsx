"use client";

import { useCallback, useState, type ChangeEvent, type ReactNode } from "react";
import { revalidateSiteImages } from "@/app/actions/revalidateSiteImages";
import { useAuth } from "@/components/auth/AuthProvider";
import { useSiteImageEditor } from "@/components/images/SiteImagesProvider";
import { replaceSiteImage, restoreSiteImageDefault } from "@/lib/siteImages";

type StaffPhotoEditorProps = {
  slot: string;
  children: ReactNode;
  compact?: boolean;
};

export function StaffPhotoEditor({ slot, children, compact = false }: StaffPhotoEditorProps) {
  const { user } = useAuth();
  const { overrides, applyOverride, clearOverride } = useSiteImageEditor();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasOverride = Boolean(overrides[slot]);

  const handleReplace = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      event.target.value = "";
      if (!file || !user?.isStaff) return;
      setBusy(true);
      setError(null);
      try {
        const saved = await replaceSiteImage(user.id, slot, file, overrides[slot]?.storage_path);
        applyOverride(saved);
        await revalidateSiteImages();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not upload photo.");
      } finally {
        setBusy(false);
      }
    },
    [applyOverride, overrides, slot, user],
  );

  const handleRestore = useCallback(async () => {
    if (!user?.isStaff) return;
    setBusy(true);
    setError(null);
    try {
      await restoreSiteImageDefault(slot, overrides[slot]?.storage_path);
      clearOverride(slot);
      await revalidateSiteImages();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not restore the original photo.");
    } finally {
      setBusy(false);
    }
  }, [clearOverride, overrides, slot, user]);

  if (!user?.isStaff) return children;

  return (
    <>
      {children}
      <div className="pointer-events-none absolute top-2 right-2 z-40 flex flex-col items-end gap-1">
        <label
          className={`pointer-events-auto inline-flex cursor-pointer items-center justify-center rounded-md bg-tamay-primary font-semibold text-white shadow-md hover:bg-tamay-primary-dark z-30 ${
            compact ? "min-h-9 px-2.5 text-[11px]" : "min-h-10 px-3 text-xs"
          } ${busy ? "opacity-70" : ""}`}
        >
          {busy ? "Saving..." : "Replace photo"}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="sr-only"
            disabled={busy}
            onChange={(event) => void handleReplace(event)}
          />
        </label>
        {hasOverride ? (
          <button
            type="button"
            className={`pointer-events-auto rounded-md border border-gray-200 bg-white font-semibold text-gray-800 shadow-sm hover:bg-gray-50 ${
              compact ? "min-h-8 px-2.5 text-[11px]" : "min-h-9 px-3 text-xs"
            }`}
            disabled={busy}
            onClick={() => void handleRestore()}
          >
            Original
          </button>
        ) : null}
        {error ? (
          <p className="pointer-events-auto max-w-[12rem] rounded bg-white/95 px-2 py-1 text-[11px] text-red-600 shadow">
            {error}
          </p>
        ) : null}
      </div>
    </>
  );
}
