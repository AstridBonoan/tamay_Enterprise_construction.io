import type { Metadata } from "next";
import { Suspense } from "react";
import { ConsultationSchedulePageContent } from "@/components/appointments/ConsultationSchedulePageContent";
import { sitePath } from "@/lib/paths";

export const metadata: Metadata = {
  title: "Book a Consultation",
  description:
    "Schedule a free consultation with Tamay Enterprises for construction, real estate, logistics, prevention services, or assembly.",
};

export default function ConsultationSchedulePage() {
  return (
    <section className="py-14 px-4 bg-gray-50 min-h-[70vh]">
      <div className="max-w-3xl mx-auto">
        <p className="text-sm text-gray-500 mb-6 text-center">
          <a href={sitePath("/online-appointments")} className="text-tamay-primary hover:underline">
            ← Back to Online Appointments
          </a>
        </p>
        <Suspense
          fallback={
            <p className="text-sm text-gray-600 text-center">Loading consultation schedule...</p>
          }
        >
          <ConsultationSchedulePageContent />
        </Suspense>
      </div>
    </section>
  );
}
