import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { SCHEDULING } from "@/lib/schedulingConfig";

type CreateEventBody = {
  listingId?: string;
  appointmentStart?: string;
};

type ClaimedBooking = {
  title: string;
  subtitle: string | null;
  appointment_start: string;
  appointment_end: string;
  appointment_timezone: string;
  booking_type: string;
  service_category: string;
};

function getGoogleConfig() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_CALENDAR_REFRESH_TOKEN;
  const calendarId = process.env.GOOGLE_CALENDAR_ID ?? "primary";

  if (!clientId || !clientSecret || !refreshToken) {
    return null;
  }

  return { clientId, clientSecret, refreshToken, calendarId };
}

function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return null;
  return { url, key };
}

async function getAccessToken(config: NonNullable<ReturnType<typeof getGoogleConfig>>): Promise<string> {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: config.clientId,
      client_secret: config.clientSecret,
      refresh_token: config.refreshToken,
      grant_type: "refresh_token",
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Google token refresh failed: ${text}`);
  }

  const data = (await response.json()) as { access_token?: string };
  if (!data.access_token) {
    throw new Error("Google token refresh returned no access token.");
  }

  return data.access_token;
}

function toGoogleDateTime(
  isoLocal: string,
  timeZone: string,
): { dateTime: string; timeZone: string } {
  return {
    dateTime: isoLocal,
    timeZone,
  };
}

export async function POST(request: Request) {
  const googleConfig = getGoogleConfig();
  if (!googleConfig) {
    return NextResponse.json({ skipped: true, reason: "Google Calendar not configured" }, { status: 200 });
  }

  const supabaseConfig = getSupabaseConfig();
  if (!supabaseConfig) {
    return NextResponse.json({ skipped: true, reason: "Supabase not configured" }, { status: 200 });
  }

  let body: CreateEventBody;
  try {
    body = (await request.json()) as CreateEventBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const listingId = body.listingId?.trim();
  const appointmentStart = body.appointmentStart?.trim();
  if (!listingId || !appointmentStart) {
    return NextResponse.json({ error: "listingId and appointmentStart are required" }, { status: 400 });
  }

  const supabase = createClient(supabaseConfig.url, supabaseConfig.key);
  const { data, error } = await supabase.rpc("claim_booking_for_calendar_sync", {
    p_listing_id: listingId,
    p_appointment_start: appointmentStart,
  });

  if (error) {
    console.error("Calendar booking claim failed:", error.message);
    return NextResponse.json({ error: "Could not verify booking" }, { status: 502 });
  }

  const booking = (Array.isArray(data) ? data[0] : data) as ClaimedBooking | undefined;
  if (!booking?.title || !booking.appointment_start || !booking.appointment_end) {
    return NextResponse.json({ error: "No matching booking to sync" }, { status: 409 });
  }

  const timeZone = booking.appointment_timezone || SCHEDULING.timezone;
  const description = [
    `Service: ${booking.service_category}`,
    `Type: ${booking.booking_type}`,
    "",
    "Booked via Tamay Enterprises website.",
  ].join("\n");

  const eventPayload = {
    summary: booking.title,
    location: booking.subtitle ?? undefined,
    description,
    start: toGoogleDateTime(booking.appointment_start, timeZone),
    end: toGoogleDateTime(booking.appointment_end, timeZone),
  };

  try {
    const accessToken = await getAccessToken(googleConfig);
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(googleConfig.calendarId)}/events`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventPayload),
      },
    );

    if (!response.ok) {
      const text = await response.text();
      console.error("Google Calendar event insert failed:", text);
      return NextResponse.json({ error: "Failed to create calendar event" }, { status: 502 });
    }

    const event = (await response.json()) as { id?: string; htmlLink?: string };
    return NextResponse.json({ ok: true, eventId: event.id, htmlLink: event.htmlLink });
  } catch (err) {
    console.error("Google Calendar sync error:", err);
    return NextResponse.json({ error: "Calendar sync failed" }, { status: 500 });
  }
}
