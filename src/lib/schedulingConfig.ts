/**
 * Appointment scheduling — staff-managed slots in Supabase (schedule_slots table).
 * Customers see times as a list/dropdown on the site. On booking, events sync to Google Calendar.
 */
export const SCHEDULING = {
  /** IANA timezone for calendar invites (Connecticut). */
  timezone: process.env.NEXT_PUBLIC_SCHEDULING_TIMEZONE ?? "America/New_York",

  /** Shown on .ics downloads (optional). */
  organizerEmail: process.env.NEXT_PUBLIC_SCHEDULING_ORGANIZER_EMAIL ?? "",
} as const;
