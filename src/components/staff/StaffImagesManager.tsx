"use client";

import { useCallback, useMemo, useState } from "react";
import {
  restoreSiteImageDefault,
  replaceSiteImage,
  type SiteImageOverride,
} from "@/lib/siteImages";
import { SITE_IMAGE_SLOT_GROUPS, SITE_IMAGE_SLOTS } from "@/lib/siteImageSlots";

type StaffImagesManagerProps = {
  userId: string;
  initialOverrides: Record<string, SiteImageOverride>;
};

export function StaffImagesManager({ userId, initialOverrides }: StaffImagesManagerProps) {
  const [overrides, setOverrides] = useState(initialOverrides);
  const [busyKey, setBusyKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [groupFilter, setGroupFilter] = useState(SITE_IMAGE_SLOT_GROUPS[0] ?? "Homepage");

  const slots = useMemo(
    () => SITE_IMAGE_SLOTS.filter((slot) => slot.group === groupFilter),
    [groupFilter],
  );

  const handleReplace = useCallback(
    async (key: string, file: File | undefined) => {
      if (!file) return;
      setBusyKey(key);
      setError(null);
      setSuccess(null);
      try {
        const saved = await replaceSiteImage(userId, key, file, overrides[key]?.storage_path);
        setOverrides((prev) => ({ ...prev, [key]: saved }));
        setSuccess("Photo updated. Refresh the public page if you still see the old image.");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not upload photo.");
      } finally {
        setBusyKey(null);
      }
    },
    [overrides, userId],
  );

  const handleRestore = useCallback(
    async (key: string) => {
      setBusyKey(key);
      setError(null);
      setSuccess(null);
      try {
        await restoreSiteImageDefault(key, overrides[key]?.storage_path);
        setOverrides((prev) => {
          const next = { ...prev };
          delete next[key];
          return next;
        });
        setSuccess("Restored the original photo.");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not restore the original photo.");
      } finally {
        setBusyKey(null);
      }
    },
    [overrides],
  );

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="photo-group" className="block text-sm font-semibold text-gray-700 mb-2">
          Section
        </label>
        <select
          id="photo-group"
          className="w-full sm:w-72 border border-gray-300 rounded-md px-4 py-3 text-base text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-tamay-primary/40 focus:border-tamay-primary"
          value={groupFilter}
          onChange={(event) => setGroupFilter(event.target.value)}
        >
          {SITE_IMAGE_SLOT_GROUPS.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      {success && <p className="text-sm text-green-700">{success}</p>}

      <ul className="grid gap-5 sm:grid-cols-2">
        {slots.map((slot) => {
          const override = overrides[slot.key];
          const src = override?.public_url ?? slot.fallback;
          const busy = busyKey === slot.key;

          return (
            <li key={slot.key} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
              <div className="relative aspect-[16/10] bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover" />
                {override && (
                  <span className="absolute left-2 top-2 rounded bg-tamay-primary px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white">
                    Custom
                  </span>
                )}
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <p className="font-semibold text-gray-900">{slot.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{slot.key}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <label className="inline-flex items-center justify-center rounded-md bg-tamay-primary px-4 py-2 text-sm font-semibold text-white hover:bg-tamay-primary-dark cursor-pointer disabled:opacity-60">
                    {busy ? "Saving..." : "Replace"}
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      className="sr-only"
                      disabled={busy}
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        event.target.value = "";
                        void handleReplace(slot.key, file);
                      }}
                    />
                  </label>
                  {override && (
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50 disabled:opacity-60"
                      disabled={busy}
                      onClick={() => void handleRestore(slot.key)}
                    >
                      Restore original
                    </button>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
