import type { Metadata } from "next";
import Link from "next/link";
import { SubcontractorApplicationForm } from "@/components/careers/SubcontractorApplicationForm";

export const metadata: Metadata = {
  title: "Subcontractor Application | Tamay Enterprises Inc.",
  description:
    "Apply to partner with Tamay Enterprises as a licensed trade subcontractor in Connecticut.",
  robots: { index: false, follow: false },
};

export default function SubcontractorApplyPage() {
  return (
    <div className="py-10 md:py-14 px-4">
      <div className="max-w-[960px] mx-auto">
        <Link
          href="/careers-partnerships"
          className="text-sm text-tamay-primary font-semibold hover:underline mb-6 inline-block"
        >
          ← Back to Careers & Partnerships
        </Link>

        <SubcontractorApplicationForm />
      </div>
    </div>
  );
}
