"use client";

import { useSearchParams } from "next/navigation";
import { ConsultationScheduleCalendar } from "@/components/appointments/ConsultationScheduleCalendar";
import { getAppointmentServiceById } from "@/lib/onlineAppointments";

export function ConsultationSchedulePageContent() {
  const searchParams = useSearchParams();
  const requestedService = searchParams.get("service");
  const matched = requestedService ? getAppointmentServiceById(requestedService) : undefined;

  return (
    <ConsultationScheduleCalendar
      initialServiceId={matched?.id ?? null}
      serviceLocked={Boolean(matched)}
    />
  );
}

/** Used by legacy /schedule/[serviceId] routes. */
export function ConsultationSchedulePageContentWithService({
  serviceId,
}: {
  serviceId: string;
}) {
  const matched = getAppointmentServiceById(serviceId);
  return (
    <ConsultationScheduleCalendar
      initialServiceId={matched?.id ?? null}
      serviceLocked={Boolean(matched)}
    />
  );
}
