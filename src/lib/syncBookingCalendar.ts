export type SyncCalendarBookingInput = {
  listingId: string;
  appointmentStart: string;
};

/** Best-effort sync to the manager's Google Calendar after a booking is saved. */
export async function syncBookingToGoogleCalendar(input: SyncCalendarBookingInput): Promise<void> {
  const listingId = input.listingId.trim();
  const appointmentStart = input.appointmentStart.trim();
  if (!listingId || !appointmentStart) return;

  try {
    const response = await fetch("/api/calendar/create-event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ listingId, appointmentStart }),
    });

    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as { error?: string } | null;
      console.warn("Google Calendar sync failed:", body?.error ?? response.statusText);
    }
  } catch (err) {
    console.warn("Google Calendar sync request failed:", err);
  }
}
