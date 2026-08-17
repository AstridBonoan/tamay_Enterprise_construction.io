"use client";

import { useState } from "react";
import { AppointmentServiceRow } from "@/components/appointments/AppointmentServiceRow";
import type { OnlineAppointmentService } from "@/lib/onlineAppointments";

type AppointmentServiceListProps = {
  services: readonly OnlineAppointmentService[];
};

export function AppointmentServiceList({ services }: AppointmentServiceListProps) {
  const [openServiceId, setOpenServiceId] = useState<string | null>(null);

  return (
    <div className="mt-8">
      {services.map((service) => (
        <AppointmentServiceRow
          key={service.id}
          service={service}
          availabilityOpen={openServiceId === service.id}
          onToggleAvailability={() =>
            setOpenServiceId((current) => (current === service.id ? null : service.id))
          }
        />
      ))}
    </div>
  );
}
