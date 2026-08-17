"use server";

import { revalidateTag } from "next/cache";

export async function revalidateSiteImages() {
  revalidateTag("site-images", { expire: 0 });
}
