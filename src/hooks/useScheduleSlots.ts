"use client";

import { useCallback, useEffect, useState } from "react";
import type { AppointmentSlot } from "@/lib/onlineAppointments";
import { fetchScheduleSlots } from "@/lib/scheduleSlots";

export function useScheduleSlots(serviceKey: string) {
  const [slots, setSlots] = useState<AppointmentSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setSlots(await fetchScheduleSlots(serviceKey));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load available times.");
      setSlots([]);
    } finally {
      setLoading(false);
    }
  }, [serviceKey]);

  useEffect(() => {
    void reload();
  }, [reload]);

  return { slots, loading, error, reload };
}
