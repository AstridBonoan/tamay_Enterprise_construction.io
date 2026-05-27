import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CareerApplicationForm } from "@/components/careers/CareerApplicationForm";

export const metadata: Metadata = {
  title: "Join Our Team | Careers & Partnerships | Tamay Enterprises",
  description:
    "Apply for construction jobs and trade opportunities at Tamay Enterprises in West Haven, CT.",
  robots: { index: false, follow: false },
};

export default function CareerApplyPage() {
  return (
    <div className="py-12 md:py-16 px-4 max-w-2xl mx-auto">
      <Link
        href="/careers-partnerships"
        className="text-sm text-tamay-primary font-semibold hover:underline mb-8 inline-block"
      >
        ← Back to Careers & Partnerships
      </Link>

      <SectionHeading
        align="left"
        title="Join Our Team"
        subtitle="Tell us about yourself and the role you are interested in. Our team will review your application and follow up."
      />

      <Suspense fallback={<p className="text-gray-600 text-sm">Loading application form…</p>}>
        <CareerApplicationForm />
      </Suspense>
    </div>
  );
}
