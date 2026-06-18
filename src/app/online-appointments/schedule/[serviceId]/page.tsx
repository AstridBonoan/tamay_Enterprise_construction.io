import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegacyConsultationScheduleRedirect } from "@/components/appointments/LegacyConsultationScheduleRedirect";
import {
  getAllAppointmentServiceIds,
  getAppointmentServiceById,
} from "@/lib/onlineAppointments";

type LegacyAppointmentSchedulePageProps = {
  params: Promise<{ serviceId: string }>;
};

export function generateStaticParams() {
  return getAllAppointmentServiceIds().map((serviceId) => ({ serviceId }));
}

export async function generateMetadata({ params }: LegacyAppointmentSchedulePageProps): Promise<Metadata> {
  const { serviceId } = await params;
  const service = getAppointmentServiceById(serviceId);
  if (!service) return { title: "Book a Consultation" };

  return {
    title: service.scheduleCtaLabel,
    description: `Schedule a free ${service.title.toLowerCase()} consultation with Tamay Enterprises in West Haven, CT.`,
  };
}

/** Legacy path — redirects to /online-appointments/schedule?service=... */
export default async function LegacyAppointmentSchedulePage({ params }: LegacyAppointmentSchedulePageProps) {
  const { serviceId } = await params;
  if (!getAppointmentServiceById(serviceId)) notFound();

  return (
    <section className="py-14 px-4 bg-gray-50 min-h-[40vh]">
      <div className="max-w-3xl mx-auto">
        <LegacyConsultationScheduleRedirect serviceId={serviceId} />
      </div>
    </section>
  );
}
