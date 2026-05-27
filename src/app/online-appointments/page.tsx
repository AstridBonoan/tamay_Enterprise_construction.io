import type { Metadata } from "next";
import { OnlineAppointmentsSection } from "@/components/appointments/OnlineAppointmentsSection";

export const metadata: Metadata = {
  title: "Schedule an Appointment | Tamay Enterprises West Haven CT",
  description:
    "Schedule an online appointment with Tamay Enterprises in West Haven, CT to discuss construction, real estate, preventive or logistics services with our team.",
};

export default function OnlineAppointmentsPage() {
  return (
    <div className="py-10 md:py-14 px-4">
      <OnlineAppointmentsSection />
    </div>
  );
}
