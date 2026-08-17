"use client";

import { useEffect } from "react";
import { ConsultationSchedulePageContentWithService } from "@/components/appointments/ConsultationSchedulePageContent";
import { appointmentScheduleHref } from "@/lib/onlineAppointments";

/** Redirects old /schedule/[serviceId] URLs to the unified ?service= schedule page. */
export function LegacyConsultationScheduleRedirect({ serviceId }: { serviceId: string }) {
  useEffect(() => {
    window.location.replace(appointmentScheduleHref(serviceId));
  }, [serviceId]);

  return (
    <p className="text-sm text-gray-600 text-center">Loading consultation schedule...</p>
  );
}
