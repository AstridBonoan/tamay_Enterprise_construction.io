"use client";

import { useCallback, useMemo, useState } from "react";
import { revalidateSiteCopy } from "@/app/actions/revalidateSiteCopy";
import { useSiteCopyMap } from "@/components/copy/SiteCopyProvider";
import { restoreSiteTextDefault, saveSiteText } from "@/lib/siteCopy";

type StaffCopyManagerProps = {
  userId: string;
  initialCopy: Record<string, string>;
};

export function StaffCopyManager({ userId, initialCopy }: StaffCopyManagerProps) {
  const { copy, applyCopy, clearCopy } = useSiteCopyMap();
  const [drafts, setDrafts] = useState<Record<string, string>>(initialCopy);
  const [busyKey, setBusyKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const keys = useMemo(() => {
    const unique = new Set([...Object.keys(copy), ...Object.keys(drafts)]);
    const needle = query.trim().toLowerCase();
    return Array.from(unique)
      .filter((key) => {
        if (!needle) return true;
        const value = drafts[key] ?? copy[key] ?? "";
        return key.toLowerCase().includes(needle) || value.toLowerCase().includes(needle);
      })
      .sort((a, b) => a.localeCompare(b));
  }, [copy, drafts, query]);

  const handleSave = useCallback(
    async (key: string) => {
      setBusyKey(key);
      setError(null);
      setSuccess(null);
      try {
        const saved = await saveSiteText(userId, key, drafts[key] ?? "");
        applyCopy(saved.key, saved.value);
        setDrafts((prev) => ({ ...prev, [saved.key]: saved.value }));
        await revalidateSiteCopy();
        setSuccess("Text saved. Public pages will pick up the change shortly.");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not save text.");
      } finally {
        setBusyKey(null);
      }
    },
    [applyCopy, drafts, userId],
  );

  const handleRestore = useCallback(
    async (key: string) => {
      setBusyKey(key);
      setError(null);
      setSuccess(null);
      try {
        await restoreSiteTextDefault(key);
        clearCopy(key);
        setDrafts((prev) => {
          const next = { ...prev };
          delete next[key];
          return next;
        });
        await revalidateSiteCopy();
        setSuccess("Restored the original website text.");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not restore the original text.");
      } finally {
        setBusyKey(null);
      }
    },
    [clearCopy],
  );

  if (keys.length === 0 && !query) {
    return (
      <p className="text-sm text-gray-600 leading-relaxed">
        No custom text has been saved yet. Open any public page while signed in as staff, click the dashed
        outline around a heading or paragraph, then Save.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <label className="block">
        <span className="sr-only">Search saved text</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search saved text by key or wording"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-tamay-primary/40"
        />
      </label>

      {error ? (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
      {success ? <p className="text-sm text-green-700">{success}</p> : null}

      {keys.length === 0 ? (
        <p className="text-sm text-gray-600">No saved text matches that search.</p>
      ) : (
        <ul className="space-y-5">
          {keys.map((key) => {
            const busy = busyKey === key;
            return (
              <li key={key} className="border border-gray-200 rounded-sm p-4 bg-white">
                <p className="text-xs font-semibold tracking-wide uppercase text-tamay-primary mb-2 break-all">
                  {key}
                </p>
                <textarea
                  className="w-full min-h-[5.5rem] rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-tamay-primary/40"
                  value={drafts[key] ?? copy[key] ?? ""}
                  disabled={busy}
                  onChange={(event) => setDrafts((prev) => ({ ...prev, [key]: event.target.value }))}
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="rounded-md bg-tamay-primary px-3 py-1.5 text-xs font-semibold text-white hover:bg-tamay-primary-dark disabled:opacity-60"
                    disabled={busy}
                    onClick={() => void handleSave(key)}
                  >
                    {busy ? "Saving..." : "Save"}
                  </button>
                  <button
                    type="button"
                    className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-800 hover:bg-gray-50 disabled:opacity-60"
                    disabled={busy}
                    onClick={() => void handleRestore(key)}
                  >
                    Original
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
