import { cache } from "react";
import { createClient as createBrowserClient } from "@/lib/supabase/client";
import { IMAGES } from "@/lib/images";
import {
  EXTRA_IMAGE_DEFAULTS,
  IMAGE_PATH_KEYS,
  SITE_IMAGE_DEFAULTS,
  isImagePathKey,
} from "@/lib/siteImageSlots";

const SITE_MEDIA_BUCKET = "site-media";
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export type SiteImageOverride = {
  key: string;
  public_url: string;
  storage_path: string;
  original_file_name: string | null;
  updated_at: string;
};

export type ResolvedSiteMedia = {
  images: typeof IMAGES;
  extras: Record<string, string>;
  overrides: Record<string, SiteImageOverride>;
};

function getByPath(source: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((current, part) => {
    if (!current || typeof current !== "object") return undefined;
    return (current as Record<string, unknown>)[part];
  }, source);
}

function setByPath(target: Record<string, unknown>, path: string, value: string) {
  const parts = path.split(".");
  let current: Record<string, unknown> = target;
  for (let index = 0; index < parts.length - 1; index += 1) {
    const part = parts[index];
    const next = current[part];
    if (!next || typeof next !== "object" || Array.isArray(next)) {
      current[part] = {};
    } else {
      current[part] = { ...(next as Record<string, unknown>) };
    }
    current = current[part] as Record<string, unknown>;
  }
  current[parts[parts.length - 1]] = value;
}

export function applyImageOverrides(
  overrides: Record<string, string>,
): { images: typeof IMAGES; extras: Record<string, string> } {
  const images = structuredClone(IMAGES) as unknown as Record<string, unknown>;
  const extras = { ...EXTRA_IMAGE_DEFAULTS };

  for (const [key, url] of Object.entries(overrides)) {
    if (!url) continue;
    if (IMAGE_PATH_KEYS.has(key)) {
      setByPath(images, key, url);
    } else {
      extras[key] = url;
    }
  }

  return { images: images as typeof IMAGES, extras };
}

function emptyResolvedMedia(): ResolvedSiteMedia {
  return {
    images: IMAGES,
    extras: { ...EXTRA_IMAGE_DEFAULTS },
    overrides: {},
  };
}

async function fetchOverridesWithClient(
  supabase: ReturnType<typeof createBrowserClient>,
): Promise<Record<string, SiteImageOverride>> {
  const { data, error } = await supabase
    .from("site_image_slots")
    .select("key, public_url, storage_path, original_file_name, updated_at");

  if (error) {
    console.warn("Could not load site images:", error.message);
    return {};
  }

  const overrides: Record<string, SiteImageOverride> = {};
  for (const row of data ?? []) {
    if (!row.key || !row.public_url) continue;
    overrides[row.key] = row as SiteImageOverride;
  }
  return overrides;
}

export function resolveMediaFromOverrides(
  overrideRows: Record<string, SiteImageOverride>,
): ResolvedSiteMedia {
  const urls: Record<string, string> = {};
  for (const [key, row] of Object.entries(overrideRows)) {
    urls[key] = row.public_url;
  }
  const { images, extras } = applyImageOverrides(urls);
  return { images, extras, overrides: overrideRows };
}

export const getResolvedSiteMedia = cache(async (): Promise<ResolvedSiteMedia> => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return emptyResolvedMedia();

  try {
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(url, key, {
      global: {
        fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }),
      },
    });
    const overrides = await fetchOverridesWithClient(supabase as never);
    return resolveMediaFromOverrides(overrides);
  } catch (err) {
    console.warn("Site image lookup failed:", err);
    return emptyResolvedMedia();
  }
});

export async function fetchSiteImageOverrides(): Promise<Record<string, SiteImageOverride>> {
  try {
    const supabase = createBrowserClient();
    return await fetchOverridesWithClient(supabase);
  } catch (err) {
    console.warn("Could not load site images:", err);
    return {};
  }
}

export function mediaSrc(media: Pick<ResolvedSiteMedia, "images" | "extras">, key: string): string {
  if (isImagePathKey(key)) {
    const value = getByPath(media.images, key);
    if (typeof value === "string") return value;
  }
  return media.extras[key] ?? SITE_IMAGE_DEFAULTS[key] ?? "";
}

function extensionForFile(file: File): string {
  const fromName = file.name.split(".").pop()?.toLowerCase();
  if (fromName === "jpeg") return "jpg";
  if (fromName && ["jpg", "png", "webp", "gif"].includes(fromName)) return fromName;
  if (file.type === "image/png") return "png";
  if (file.type === "image/webp") return "webp";
  if (file.type === "image/gif") return "gif";
  return "jpg";
}

export async function replaceSiteImage(
  userId: string,
  key: string,
  file: File,
  previousPath?: string | null,
): Promise<SiteImageOverride> {
  if (!ALLOWED_TYPES.has(file.type)) {
    throw new Error("Please upload a JPG, PNG, WEBP, or GIF image.");
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error("Images must be 5 MB or smaller.");
  }

  const supabase = createBrowserClient();
  const path = `${key.replace(/\./g, "/")}/${crypto.randomUUID()}.${extensionForFile(file)}`;

  const { error: uploadError } = await supabase.storage.from(SITE_MEDIA_BUCKET).upload(path, file, {
    contentType: file.type,
    upsert: false,
  });
  if (uploadError) throw uploadError;

  const { data: publicData } = supabase.storage.from(SITE_MEDIA_BUCKET).getPublicUrl(path);
  const publicUrl = `${publicData.publicUrl}?v=${Date.now()}`;

  const row = {
    key,
    public_url: publicUrl,
    storage_path: path,
    original_file_name: file.name,
    updated_at: new Date().toISOString(),
    updated_by: userId,
  };

  const { data, error } = await supabase.from("site_image_slots").upsert(row).select("*").single();
  if (error) throw error;

  if (previousPath && previousPath !== path) {
    await supabase.storage.from(SITE_MEDIA_BUCKET).remove([previousPath]);
  }

  return data as SiteImageOverride;
}

export async function restoreSiteImageDefault(key: string, storagePath?: string | null): Promise<void> {
  const supabase = createBrowserClient();
  const { error } = await supabase.from("site_image_slots").delete().eq("key", key);
  if (error) throw error;
  if (storagePath) {
    await supabase.storage.from(SITE_MEDIA_BUCKET).remove([storagePath]);
  }
}
