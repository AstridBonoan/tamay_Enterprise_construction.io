import Link from "next/link";
import { SITE } from "@/lib/site";

export function HiringBanner() {
  return (
    <div className="bg-tamay-primary text-center py-1 text-sm">
      <Link
        href={SITE.hiringUrl}
        className="text-white font-semibold tracking-wide hover:underline uppercase"
      >
        WE ARE HIRING
      </Link>
    </div>
  );
}
