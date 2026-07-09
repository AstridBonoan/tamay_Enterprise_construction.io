import { NextResponse } from "next/server";
import type { CalendarEventInput } from "@/lib/googleCalendar";
import { SCHEDULING } from "@/lib/schedulingConfig";

type CreateEventBody = CalendarEventInput & {
  customerName?: string;
  customerEmail?: string;
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

function toGoogleDateTime(isoLocal: string): { dateTime: string; timeZone: string } {
  return {
    dateTime: isoLocal,
    timeZone: SCHEDULING.timezone,
  };
}

export async function POST(request: Request) {
  const config = getGoogleConfig();
  if (!config) {
    return NextResponse.json({ skipped: true, reason: "Google Calendar not configured" }, { status: 200 });
  }

  let body: CreateEventBody;
  try {
    body = (await request.json()) as CreateEventBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.title || !body.startIso || !body.endIso) {
    return NextResponse.json({ error: "title, startIso, and endIso are required" }, { status: 400 });
  }

  const descriptionParts = [body.description?.trim(), ""];
  if (body.customerName || body.customerEmail) {
    descriptionParts.push(
      "Customer:",
      body.customerName ? `Name: ${body.customerName}` : "",
      body.customerEmail ? `Email: ${body.customerEmail}` : "",
    );
  }

  const eventPayload = {
    summary: body.title,
    location: body.location ?? undefined,
    description: descriptionParts.filter(Boolean).join("\n"),
    start: toGoogleDateTime(body.startIso),
    end: toGoogleDateTime(body.endIso),
  };

  try {
    const accessToken = await getAccessToken(config);
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(config.calendarId)}/events`,
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
