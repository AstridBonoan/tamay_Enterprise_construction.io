import type { CalendarEventInput } from "@/lib/googleCalendar";

export type SyncCalendarEventInput = CalendarEventInput & {
  customerName?: string;
  customerEmail?: string;
};

/** Best-effort sync to the manager's Google Calendar after a booking is saved. */
export async function syncBookingToGoogleCalendar(event: SyncCalendarEventInput): Promise<void> {
  try {
    const response = await fetch("/api/calendar/create-event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    });

    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as { error?: string } | null;
      console.warn("Google Calendar sync failed:", body?.error ?? response.statusText);
    }
  } catch (err) {
    console.warn("Google Calendar sync request failed:", err);
  }
}
