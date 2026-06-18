import { createClient } from "@/lib/supabase/client";
import type { ListingKind } from "@/lib/realEstateScheduling";
import { SCHEDULING } from "@/lib/schedulingConfig";

export type PropertyBookingStatus = "pending" | "confirmed" | "cancelled";

export type PropertyBooking = {
  id: string;
  user_id: string;
  listing_id: string;
  listing_kind: ListingKind;
  listing_title: string;
  listing_address: string;
  appointment_start: string;
  appointment_end: string;
  appointment_timezone: string;
  preferred_time: string;
  status: PropertyBookingStatus;
  notes: string | null;
  created_at: string;
};

export type CreatePropertyBookingInput = {
  listingId: string;
  listingKind: ListingKind;
  listingTitle: string;
  listingAddress: string;
  appointmentStart: string;
  appointmentEnd: string;
  preferredTime: string;
  appointmentTimezone?: string;
  notes?: string;
};

export class SlotAlreadyBookedError extends Error {
  constructor() {
    super("This time slot was just booked. Please choose another time.");
    this.name = "SlotAlreadyBookedError";
  }
}

export async function fetchPropertyBookings(userId: string): Promise<PropertyBooking[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("property_bookings")
    .select("*")
    .eq("user_id", userId)
    .order("appointment_start", { ascending: true });

  if (error) throw error;
  return (data ?? []) as PropertyBooking[];
}

export async function fetchBookedSlotStarts(listingId: string): Promise<string[]> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_booked_showing_starts", {
    p_listing_id: listingId,
  });

  if (error) {
    console.warn("Could not load booked slots:", error.message);
    return [];
  }

  return (data ?? []).map((row: { appointment_start: string }) => row.appointment_start);
}

export async function createPropertyBooking(
  userId: string,
  input: CreatePropertyBookingInput,
): Promise<PropertyBooking> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("property_bookings")
    .insert({
      user_id: userId,
      listing_id: input.listingId,
      listing_kind: input.listingKind,
      listing_title: input.listingTitle,
      listing_address: input.listingAddress,
      appointment_start: input.appointmentStart,
      appointment_end: input.appointmentEnd,
      appointment_timezone: input.appointmentTimezone ?? SCHEDULING.timezone,
      preferred_time: input.preferredTime,
      status: "pending",
      notes: input.notes?.trim() || null,
    })
    .select("*")
    .single();

  if (error) {
    if (error.code === "23505") {
      throw new SlotAlreadyBookedError();
    }
    throw error;
  }

  return data as PropertyBooking;
}

export function bookingStatusLabel(status: PropertyBookingStatus): string {
  if (status === "confirmed") return "Confirmed";
  if (status === "cancelled") return "Cancelled";
  return "Pending confirmation";
}

export function formatBookingWhen(booking: PropertyBooking): string {
  return booking.preferred_time;
}

export function isUpcomingBooking(booking: PropertyBooking): boolean {
  if (booking.status === "cancelled") return false;
  const startMs = Date.parse(booking.appointment_start);
  if (Number.isNaN(startMs)) return true;
  return startMs >= Date.now() - 60 * 60 * 1000;
}

export function sortBookingsUpcomingFirst(bookings: PropertyBooking[]): PropertyBooking[] {
  return [...bookings].sort((a, b) => {
    const aUpcoming = isUpcomingBooking(a);
    const bUpcoming = isUpcomingBooking(b);
    if (aUpcoming !== bUpcoming) return aUpcoming ? -1 : 1;
    return a.appointment_start.localeCompare(b.appointment_start);
  });
}
