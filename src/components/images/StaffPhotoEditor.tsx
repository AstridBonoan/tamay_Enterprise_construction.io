"use client";

import { useCallback, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { revalidateSiteImages } from "@/app/actions/revalidateSiteImages";
import { useAuth } from "@/components/auth/AuthProvider";
import { useSiteImageEditor } from "@/components/images/SiteImagesProvider";
import { replaceSiteImage, restoreSiteImageDefault } from "@/lib/siteImages";

const IMAGE_FILE_ACCEPT = "image/jpeg,image/png,image/webp,image/gif,.jpg,.jpeg,.jfif,.png,.webp,.gif,image/*";

function isolateControl(event: MouseEvent) {
  event.preventDefault();
  event.stopPropagation();
}

type StaffImagePickerButtonProps = {
  label: string;
  busyLabel?: string;
  busy?: boolean;
  disabled?: boolean;
  className: string;
  onFile: (file: File) => void;
};

export function StaffImagePickerButton({
  label,
  busyLabel = "Saving...",
  busy,
  disabled,
  className,
  onFile,
}: StaffImagePickerButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <button
        type="button"
        className={className}
        disabled={busy || disabled}
        onClick={(event) => {
          isolateControl(event);
          inputRef.current?.click();
        }}
        onPointerDown={(event) => event.stopPropagation()}
      >
        {busy ? busyLabel : label}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={IMAGE_FILE_ACCEPT}
        className="sr-only"
        tabIndex={-1}
        disabled={busy || disabled}
        onClick={(event) => event.stopPropagation()}
        onChange={(event) => {
          const file = event.target.files?.[0];
          event.target.value = "";
          if (file) onFile(file);
        }}
      />
    </>
  );
}

type StaffPhotoEditorProps = {
  slot: string;
  children: ReactNode;
  compact?: boolean;
  onControlHover?: (hovered: boolean) => void;
};

export function StaffPhotoEditor({
  slot,
  children,
  compact = false,
  onControlHover,
}: StaffPhotoEditorProps) {
  const { user } = useAuth();
  const { overrides, applyOverride, clearOverride } = useSiteImageEditor();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasOverride = Boolean(overrides[slot]);

  const handleReplace = useCallback(
    async (file: File) => {
      if (!user?.isStaff) return;
      setBusy(true);
      setError(null);
      try {
        const saved = await replaceSiteImage(user.id, slot, file, overrides[slot]?.storage_path);
        applyOverride(saved);
        try {
          await revalidateSiteImages();
        } catch (revalidateError) {
          console.warn("Photo saved, but page cache was not refreshed:", revalidateError);
        }
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
      try {
        await revalidateSiteImages();
      } catch (revalidateError) {
        console.warn("Original photo restored, but page cache was not refreshed:", revalidateError);
      }
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
      <div
        className="absolute top-2 right-2 z-40 flex flex-col items-end gap-1"
        onClick={(event) => event.stopPropagation()}
        onPointerDown={(event) => event.stopPropagation()}
        onMouseEnter={(event) => {
          event.stopPropagation();
          onControlHover?.(true);
        }}
        onMouseLeave={() => onControlHover?.(false)}
      >
        <StaffImagePickerButton
          label="Replace photo"
          busy={busy}
          className={`inline-flex cursor-pointer items-center justify-center rounded-md bg-tamay-primary font-semibold text-white shadow-md hover:bg-tamay-primary-dark ${
            compact ? "min-h-9 px-2.5 text-[11px]" : "min-h-10 px-3 text-xs"
          } ${busy ? "opacity-70" : ""}`}
          onFile={(file) => void handleReplace(file)}
        />
        {hasOverride ? (
          <button
            type="button"
            className={`rounded-md border border-gray-200 bg-white font-semibold text-gray-800 shadow-sm hover:bg-gray-50 ${
              compact ? "min-h-8 px-2.5 text-[11px]" : "min-h-9 px-3 text-xs"
            }`}
            disabled={busy}
            onClick={(event) => {
              isolateControl(event);
              void handleRestore();
            }}
            onPointerDown={(event) => event.stopPropagation()}
          >
            Original
          </button>
        ) : null}
        {error ? (
          <p className="max-w-[14rem] rounded bg-white/95 px-2 py-1 text-[11px] text-red-600 shadow" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    </>
  );
}
