import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { JobApplicationForm } from "@/components/careers/JobApplicationForm";

export const metadata: Metadata = {
  title: "Job Application | Tamay Enterprises Inc.",
  description:
    "Apply for construction jobs and trade opportunities at Tamay Enterprises in West Haven, CT.",
  robots: { index: false, follow: false },
};

export default function CareerApplyPage() {
  return (
    <div className="py-10 md:py-14 px-4">
      <div className="max-w-[960px] mx-auto">
        <Link
          href="/careers-partnerships"
          className="text-sm text-tamay-primary font-semibold hover:underline mb-6 inline-block"
        >
          ← Back to Careers & Partnerships
        </Link>

        <Suspense fallback={<p className="text-gray-600 text-sm">Loading application form…</p>}>
          <JobApplicationForm />
        </Suspense>
      </div>
    </div>
  );
}
