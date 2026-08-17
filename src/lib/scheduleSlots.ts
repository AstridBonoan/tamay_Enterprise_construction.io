import { createClient } from "@/lib/supabase/client";
import type { AppointmentSlot } from "@/lib/onlineAppointments";
import { getAllAppointmentServiceIds, ONLINE_APPOINTMENT_SERVICES } from "@/lib/onlineAppointments";
import { RENT_LISTINGS, SALE_LISTINGS } from "@/lib/realEstateListings";
import { SCHEDULING } from "@/lib/schedulingConfig";

export type ScheduleSlotRow = {
  id: string;
  service_key: string;
  date_label: string;
  time_label: string;
  start_at: string;
  end_at: string;
  active?: boolean;
  created_at?: string;
};

export type ScheduleServiceOption = {
  key: string;
  label: string;
  group: "Consultations" | "Real Estate";
};

export function rowToAppointmentSlot(row: ScheduleSlotRow): AppointmentSlot {
  return {
    date: row.date_label,
    time: row.time_label,
    start: row.start_at,
    end: row.end_at,
  };
}

export function getScheduleServiceOptions(): ScheduleServiceOption[] {
  const consultations = ONLINE_APPOINTMENT_SERVICES.map((service) => ({
    key: service.id,
    label: service.title,
    group: "Consultations" as const,
  }));

  const listings = [...SALE_LISTINGS, ...RENT_LISTINGS].map((listing) => ({
    key: listing.id,
    label: listing.title,
    group: "Real Estate" as const,
  }));

  return [...consultations, ...listings];
}

export function getScheduleServiceLabel(serviceKey: string): string {
  return getScheduleServiceOptions().find((option) => option.key === serviceKey)?.label ?? serviceKey;
}

export async function fetchScheduleSlots(serviceKey: string): Promise<AppointmentSlot[]> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_schedule_slots", {
    p_service_key: serviceKey,
  });

  if (error) {
    console.warn("Could not load schedule slots:", error.message);
    return [];
  }

  return ((data ?? []) as ScheduleSlotRow[]).map(rowToAppointmentSlot);
}

export async function fetchStaffScheduleSlots(serviceKey: string): Promise<ScheduleSlotRow[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("schedule_slots")
    .select("id, service_key, date_label, time_label, start_at, end_at, active, created_at")
    .eq("service_key", serviceKey)
    .order("start_at", { ascending: true });

  if (error) throw error;
  return (data ?? []) as ScheduleSlotRow[];
}

export type CreateScheduleSlotInput = {
  serviceKey: string;
  date: string;
  startTime: string;
  endTime: string;
};

function parseLocalDateTime(date: string, time: string): Date {
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  return new Date(year, month - 1, day, hour, minute, 0, 0);
}

function formatDateLabel(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: SCHEDULING.timezone,
  }).format(date);
}

function formatTimeLabel(start: Date, end: Date): string {
  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: SCHEDULING.timezone,
  });

  return `${timeFormatter.format(start)} – ${timeFormatter.format(end)}`;
}

function toLocalIso(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hour}:${minute}:00`;
}

export function buildScheduleSlotFromInput(input: CreateScheduleSlotInput): {
  date_label: string;
  time_label: string;
  start_at: string;
  end_at: string;
} {
  const start = parseLocalDateTime(input.date, input.startTime);
  const end = parseLocalDateTime(input.date, input.endTime);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    throw new Error("Invalid date or time.");
  }

  if (end <= start) {
    throw new Error("End time must be after start time.");
  }

  return {
    date_label: formatDateLabel(start),
    time_label: formatTimeLabel(start, end),
    start_at: toLocalIso(start),
    end_at: toLocalIso(end),
  };
}

export async function createScheduleSlot(
  userId: string,
  input: CreateScheduleSlotInput,
): Promise<ScheduleSlotRow> {
  const supabase = createClient();
  const slot = buildScheduleSlotFromInput(input);

  const { data, error } = await supabase
    .from("schedule_slots")
    .insert({
      service_key: input.serviceKey,
      ...slot,
      created_by: userId,
      active: true,
    })
    .select("id, service_key, date_label, time_label, start_at, end_at, active, created_at")
    .single();

  if (error) throw error;
  return data as ScheduleSlotRow;
}

export async function deactivateScheduleSlot(slotId: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from("schedule_slots").update({ active: false }).eq("id", slotId);
  if (error) throw error;
}

export function getDefaultStaffServiceKey(): string {
  return getAllAppointmentServiceIds()[0] ?? "construction";
}
