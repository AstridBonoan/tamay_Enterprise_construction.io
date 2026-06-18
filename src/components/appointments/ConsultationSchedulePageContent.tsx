"use client";

import { useSearchParams } from "next/navigation";
import { ConsultationScheduleCalendar } from "@/components/appointments/ConsultationScheduleCalendar";
import {
  getAppointmentServiceById,
  ONLINE_APPOINTMENT_SERVICES,
  resolveAppointmentServiceId,
} from "@/lib/onlineAppointments";

export function ConsultationSchedulePageContent() {
  const searchParams = useSearchParams();
  const serviceId = resolveAppointmentServiceId(searchParams.get("service"));

  return <ConsultationScheduleCalendar initialServiceId={serviceId} />;
}

/** Used by legacy /schedule/[serviceId] routes. */
export function ConsultationSchedulePageContentWithService({
  serviceId,
}: {
  serviceId: string;
}) {
  const resolved = getAppointmentServiceById(serviceId)?.id ?? ONLINE_APPOINTMENT_SERVICES[0].id;
  return <ConsultationScheduleCalendar initialServiceId={resolved} />;
}
