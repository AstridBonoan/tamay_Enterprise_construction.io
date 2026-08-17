import { AppointmentServiceCard } from "@/components/appointments/AppointmentServiceCard";
import type { OnlineAppointmentService } from "@/lib/onlineAppointments";

type AppointmentServiceRowProps = {
  service: OnlineAppointmentService;
  availabilityOpen?: boolean;
  onToggleAvailability?: () => void;
};

export function AppointmentServiceRow({
  service,
  availabilityOpen = false,
  onToggleAvailability,
}: AppointmentServiceRowProps) {
  return (
    <article className="py-10 border-b border-gray-200 last:border-b-0">
      <AppointmentServiceCard
        service={service}
        showScheduleLabel
        collapseAvailability
        availabilityOpen={availabilityOpen}
        onToggleAvailability={onToggleAvailability}
      />
    </article>
  );
}
