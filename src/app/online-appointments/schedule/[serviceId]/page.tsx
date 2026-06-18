import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ServiceAppointmentCalendar } from "@/components/appointments/ServiceAppointmentCalendar";
import {
  getAllAppointmentServiceIds,
  getAppointmentServiceById,
} from "@/lib/onlineAppointments";
import { sitePath } from "@/lib/paths";

type AppointmentSchedulePageProps = {
  params: Promise<{ serviceId: string }>;
};

export function generateStaticParams() {
  return getAllAppointmentServiceIds().map((serviceId) => ({ serviceId }));
}

export async function generateMetadata({ params }: AppointmentSchedulePageProps): Promise<Metadata> {
  const { serviceId } = await params;
  const service = getAppointmentServiceById(serviceId);
  if (!service) return { title: "Book a Consultation" };

  return {
    title: service.scheduleCtaLabel,
    description: `Schedule a free ${service.title.toLowerCase()} consultation with Tamay Enterprises in West Haven, CT.`,
  };
}

export default async function AppointmentSchedulePage({ params }: AppointmentSchedulePageProps) {
  const { serviceId } = await params;
  const service = getAppointmentServiceById(serviceId);
  if (!service) notFound();

  return (
    <section className="py-14 px-4 bg-gray-50 min-h-[70vh]">
      <div className="max-w-3xl mx-auto">
        <p className="text-sm text-gray-500 mb-6 text-center">
          <Link href={sitePath("/online-appointments")} className="text-tamay-primary hover:underline">
            ← Back to Online Appointments
          </Link>
        </p>
        <ServiceAppointmentCalendar service={service} />
      </div>
    </section>
  );
}
