import { cache } from "react";
import { createClient as createBrowserClient } from "@/lib/supabase/client";

const SITE_TEXT_REVALIDATE_SECONDS = 60;
const MAX_TEXT_CHARS = 8000;

type NextFetchInit = RequestInit & {
  next?: { revalidate?: number; tags?: string[] };
};

function fetchSiteTextApi(input: RequestInfo | URL, init?: RequestInit) {
  const nextInit: NextFetchInit = {
    ...init,
    cache: "force-cache",
    next: { revalidate: SITE_TEXT_REVALIDATE_SECONDS, tags: ["site-text"] },
  };
  return fetch(input, nextInit);
}

export type SiteTextOverride = {
  key: string;
  value: string;
  updated_at: string;
};

function emptyCopy(): Record<string, string> {
  return {};
}

async function fetchCopyWithClient(
  supabase: ReturnType<typeof createBrowserClient>,
): Promise<Record<string, string>> {
  const { data, error } = await supabase.from("site_text_slots").select("key, value, updated_at");
  if (error) {
    console.warn("Could not load site copy:", error.message);
    return emptyCopy();
  }

  const copy: Record<string, string> = {};
  for (const row of data ?? []) {
    if (!row.key || typeof row.value !== "string") continue;
    copy[row.key] = row.value;
  }
  return copy;
}

export const getResolvedSiteCopy = cache(async (): Promise<Record<string, string>> => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return emptyCopy();

  try {
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(url, key, {
      global: { fetch: fetchSiteTextApi },
    });
    return await fetchCopyWithClient(supabase as never);
  } catch (err) {
    console.warn("Site copy lookup failed:", err);
    return emptyCopy();
  }
});

export function listingCopyKey(listingId: string, field: string) {
  return `listings.${listingId}.${field}`;
}

export async function saveSiteText(userId: string, key: string, value: string): Promise<SiteTextOverride> {
  const trimmed = value.trim();
  if (!trimmed) throw new Error("Text cannot be empty.");
  if (trimmed.length > MAX_TEXT_CHARS) {
    throw new Error(`Text must be ${MAX_TEXT_CHARS.toLocaleString()} characters or fewer.`);
  }

  const supabase = createBrowserClient();
  const row = {
    key,
    value: trimmed,
    updated_at: new Date().toISOString(),
    updated_by: userId,
  };
  const { data, error } = await supabase.from("site_text_slots").upsert(row).select("key, value, updated_at").single();
  if (error) throw error;
  return data as SiteTextOverride;
}

export async function restoreSiteTextDefault(key: string): Promise<void> {
  const supabase = createBrowserClient();
  const { error } = await supabase.from("site_text_slots").delete().eq("key", key);
  if (error) throw error;
}
