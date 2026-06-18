/**
 * Real estate showing / viewing scheduling configuration.
 *
 * Today (no Google Appointment Schedule yet):
 * - Visitors pick a slot; the site builds Google Calendar + .ics links from the slot datetimes.
 * - Formspree emails include ISO start/end for your team.
 *
 * Later (Google Calendar Appointment Schedule):
 * - Set NEXT_PUBLIC_GOOGLE_CALENDAR_SCHEDULING_URL to your embed URL from
 *   Google Calendar → Create → Appointment schedule → Share → Website embed.
 * - The embed replaces the request form and books directly into your Google Calendar.
 * - Per-listing overrides: add schedulingUrl on a PropertyListing in realEstateListings.ts.
 */
export const SCHEDULING = {
  /** IANA timezone for all property showing slots (Connecticut). */
  timezone: process.env.NEXT_PUBLIC_SCHEDULING_TIMEZONE ?? "America/New_York",

  /**
   * Google Calendar Appointment Schedule embed URL (optional until you create one).
   * Example: https://calendar.google.com/calendar/appointments/schedules/AcZssZ...?gv=true
   */
  googleAppointmentEmbedUrl: process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_SCHEDULING_URL ?? "",

  /** Shown on calendar invites (optional). */
  organizerEmail: process.env.NEXT_PUBLIC_SCHEDULING_ORGANIZER_EMAIL ?? "",
} as const;

export function isGoogleAppointmentScheduleConfigured(): boolean {
  return SCHEDULING.googleAppointmentEmbedUrl.trim().length > 0;
}
