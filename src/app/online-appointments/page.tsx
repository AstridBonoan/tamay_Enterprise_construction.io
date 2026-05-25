import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Schedule an Appointment",
  description: "Schedule an appointment with Tamay Enterprises in West Haven, CT.",
};

export default function OnlineAppointmentsPage() {
  return (
    <div className="py-20 max-w-3xl mx-auto px-4 text-center">
      <SectionHeading
        title="Online Appointments"
        subtitle="Book a consultation with our construction, real estate, or logistics teams. Connect your GoDaddy Bookings or preferred scheduling widget here."
      />
      <div className="min-h-[400px] border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-4 p-8 bg-gray-50">
        <p className="text-gray-600 text-sm max-w-md">
          The live site uses GoDaddy Online Appointments. Paste your booking embed code in this section, or link to your scheduling provider.
        </p>
        <Button href="tel:2032206678" variant="primary">
          Call 203-220-6678 to Schedule
        </Button>
      </div>
    </div>
  );
}
