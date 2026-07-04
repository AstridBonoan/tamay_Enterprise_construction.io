/**
 * Real estate showing / viewing scheduling (System B — Google Calendar).
 *
 * Set NEXT_PUBLIC_GOOGLE_CALENDAR_SCHEDULING_URL to your embed URL from
 * Google Calendar → Create → Appointment schedule → Share → Website embed.
 *
 * Availability is managed in Google Calendar — the site embeds live bookable times.
 * Per-listing overrides: add schedulingUrl on a PropertyListing in realEstateListings.ts.
 *
 * Legacy fallback (System A): hardcoded scheduleSlots in realEstateListings.ts only apply
 * when no Google URL is configured.
 */
export const SCHEDULING = {
  /** IANA timezone for calendar invites (Connecticut). */
  timezone: process.env.NEXT_PUBLIC_SCHEDULING_TIMEZONE ?? "America/New_York",

  /**
   * Google Calendar Appointment Schedule embed URL (System B).
   * Example: https://calendar.google.com/calendar/appointments/schedules/AcZssZ...?gv=true
   */
  googleAppointmentEmbedUrl: process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_SCHEDULING_URL ?? "",

  /** Shown on .ics downloads (optional). */
  organizerEmail: process.env.NEXT_PUBLIC_SCHEDULING_ORGANIZER_EMAIL ?? "",
} as const;

export function isGoogleAppointmentScheduleConfigured(): boolean {
  return SCHEDULING.googleAppointmentEmbedUrl.trim().length > 0;
}
