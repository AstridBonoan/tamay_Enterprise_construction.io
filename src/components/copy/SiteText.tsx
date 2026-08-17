"use client";

import { useCallback, useState, type ElementType, type KeyboardEvent } from "react";
import { revalidateSiteCopy } from "@/app/actions/revalidateSiteCopy";
import { useAuth } from "@/components/auth/AuthProvider";
import { useSiteCopy, useSiteCopyMap } from "@/components/copy/SiteCopyProvider";
import { restoreSiteTextDefault, saveSiteText } from "@/lib/siteCopy";

type SiteTextTag = "span" | "p" | "h1" | "h2" | "h3" | "h4" | "li" | "div" | "strong" | "em";

type SiteTextProps = {
  k: string;
  as?: SiteTextTag;
  className?: string;
  children: string;
  multiline?: boolean;
};

export function SiteText({ k, as: Tag = "span", className, children, multiline }: SiteTextProps) {
  const { user } = useAuth();
  const resolved = useSiteCopy(k, children);
  const { copy, applyCopy, clearCopy } = useSiteCopyMap();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(resolved);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isStaff = Boolean(user?.isStaff);
  const hasOverride = Object.prototype.hasOwnProperty.call(copy, k);
  const useMultiline = Boolean(multiline || children.length > 90 || resolved.includes("\n"));

  const startEdit = useCallback(() => {
    if (!isStaff) return;
    setDraft(resolved);
    setError(null);
    setEditing(true);
  }, [isStaff, resolved]);

  const cancel = useCallback(() => {
    setEditing(false);
    setDraft(resolved);
    setError(null);
  }, [resolved]);

  const save = useCallback(async () => {
    if (!user?.isStaff) return;
    setBusy(true);
    setError(null);
    try {
      const saved = await saveSiteText(user.id, k, draft);
      applyCopy(saved.key, saved.value);
      await revalidateSiteCopy();
      setEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save text.");
    } finally {
      setBusy(false);
    }
  }, [applyCopy, draft, k, user]);

  const restore = useCallback(async () => {
    if (!user?.isStaff) return;
    setBusy(true);
    setError(null);
    try {
      await restoreSiteTextDefault(k);
      clearCopy(k);
      await revalidateSiteCopy();
      setEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not restore the original text.");
    } finally {
      setBusy(false);
    }
  }, [clearCopy, k, user]);

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      if (event.key === "Escape") {
        event.preventDefault();
        cancel();
      }
      if (!useMultiline && event.key === "Enter") {
        event.preventDefault();
        void save();
      }
      if (useMultiline && event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        void save();
      }
    },
    [cancel, save, useMultiline],
  );

  if (!isStaff) {
    const TextTag = Tag as ElementType;
    return <TextTag className={className}>{resolved}</TextTag>;
  }

  if (editing) {
    return (
      <span className="relative block">
        {useMultiline ? (
          <textarea
            className="w-full min-h-[7rem] rounded-md border border-tamay-primary bg-white px-3 py-2 text-base text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-tamay-primary/40"
            value={draft}
            disabled={busy}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={onKeyDown}
            autoFocus
          />
        ) : (
          <input
            className="w-full rounded-md border border-tamay-primary bg-white px-3 py-2 text-base text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-tamay-primary/40"
            value={draft}
            disabled={busy}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={onKeyDown}
            autoFocus
          />
        )}
        <span className="mt-2 flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="rounded-md bg-tamay-primary px-3 py-1.5 text-xs font-semibold text-white hover:bg-tamay-primary-dark disabled:opacity-60"
            disabled={busy}
            onClick={() => void save()}
          >
            {busy ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-800 hover:bg-gray-50"
            disabled={busy}
            onClick={cancel}
          >
            Cancel
          </button>
          {hasOverride ? (
            <button
              type="button"
              className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-800 hover:bg-gray-50"
              disabled={busy}
              onClick={() => void restore()}
            >
              Original
            </button>
          ) : null}
        </span>
        {error ? (
          <span className="mt-1 block text-xs text-red-600" role="alert">
            {error}
          </span>
        ) : null}
      </span>
    );
  }

  const TextTag = Tag as ElementType;
  return (
    <TextTag
      className={`${className ?? ""} cursor-pointer rounded-sm outline outline-1 outline-dashed outline-tamay-accent/40 hover:outline-tamay-accent`.trim()}
      onClick={(event: { stopPropagation: () => void; preventDefault: () => void }) => {
        event.stopPropagation();
        event.preventDefault();
        startEdit();
      }}
      title="Click to edit this text"
    >
      {resolved}
    </TextTag>
  );
}
