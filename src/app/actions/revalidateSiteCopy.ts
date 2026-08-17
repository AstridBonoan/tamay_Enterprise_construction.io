"use server";

import { revalidateTag } from "next/cache";

export async function revalidateSiteCopy() {
  revalidateTag("site-text", { expire: 0 });
}
