import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegacyConsultationScheduleRedirect } from "@/components/appointments/LegacyConsultationScheduleRedirect";
import {
  getAllAppointmentServiceIds,
  getAppointmentServiceById,
} from "@/lib/onlineAppointments";
import { buildSocialMetadata } from "@/lib/socialMetadata";

type LegacyAppointmentSchedulePageProps = {
  params: Promise<{ serviceId: string }>;
};

export function generateStaticParams() {
  return getAllAppointmentServiceIds().map((serviceId) => ({ serviceId }));
}

export async function generateMetadata({ params }: LegacyAppointmentSchedulePageProps): Promise<Metadata> {
  const { serviceId } = await params;
  const service = getAppointmentServiceById(serviceId);
  if (!service) {
    return buildSocialMetadata("appointments", {
      path: "/online-appointments/schedule/",
      title: "Book a Consultation | Tamay Enterprises",
      absoluteTitle: true,
    });
  }

  return buildSocialMetadata("appointments", {
    path: `/online-appointments/schedule/${serviceId}/`,
    title: `${service.scheduleCtaLabel} | Tamay Enterprises`,
    description: `Schedule a free ${service.title.toLowerCase()} consultation with Tamay Enterprises in West Haven, CT.`,
    absoluteTitle: true,
  });
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
