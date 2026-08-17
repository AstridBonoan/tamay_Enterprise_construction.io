import { createClient } from "@/lib/supabase/client";
import type { ListingKind } from "@/lib/realEstateScheduling";
import { SCHEDULING } from "@/lib/schedulingConfig";

export type BookingStatus = "pending" | "confirmed" | "cancelled";
export type BookingType = "property_viewing" | "consultation" | "service";

export type Booking = {
  id: string;
  user_id: string;
  booking_type: BookingType;
  service_category: string;
  title: string;
  subtitle: string | null;
  listing_id: string | null;
  listing_kind: ListingKind | null;
  appointment_start: string;
  appointment_end: string;
  appointment_timezone: string;
  preferred_time: string;
  status: BookingStatus;
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

export type CreateServiceBookingInput = {
  bookingType: Extract<BookingType, "consultation" | "service">;
  serviceCategory: string;
  serviceId: string;
  title: string;
  subtitle?: string;
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

function isUnavailableSlotError(error: { code?: string; message?: string }): boolean {
  const message = error.message?.toLowerCase() ?? "";
  return error.code === "23505" || message.includes("not available");
}

export async function fetchBookings(userId: string): Promise<Booking[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("user_id", userId)
    .order("appointment_start", { ascending: true });

  if (error) throw error;
  return (data ?? []) as Booking[];
}

/** @deprecated Use fetchBookings */
export async function fetchPropertyBookings(userId: string): Promise<Booking[]> {
  return fetchBookings(userId);
}

export async function fetchBookedAppointmentStarts(serviceId: string): Promise<string[]> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_booked_appointment_starts", {
    p_service_id: serviceId,
  });

  if (error) {
    console.warn("Could not load booked appointment slots:", error.message);
    return [];
  }

  return (data ?? []).map((row: { appointment_start: string }) => row.appointment_start);
}

/** True when this signed-in user already has an active booking for the slot. */
export async function userHasActiveServiceBooking(
  userId: string,
  serviceId: string,
  appointmentStart: string,
): Promise<boolean> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("bookings")
    .select("id")
    .eq("user_id", userId)
    .eq("listing_id", serviceId)
    .eq("appointment_start", appointmentStart)
    .in("booking_type", ["consultation", "service"])
    .in("status", ["pending", "confirmed"])
    .limit(1);

  if (error) {
    console.warn("Could not check existing booking:", error.message);
    return false;
  }

  return (data?.length ?? 0) > 0;
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
): Promise<Booking> {
  return createBooking(userId, {
    booking_type: "property_viewing",
    service_category: "Real Estate",
    title: input.listingTitle,
    subtitle: input.listingAddress,
    listing_id: input.listingId,
    listing_kind: input.listingKind,
    appointment_start: input.appointmentStart,
    appointment_end: input.appointmentEnd,
    appointment_timezone: input.appointmentTimezone ?? SCHEDULING.timezone,
    preferred_time: input.preferredTime,
    notes: input.notes?.trim() || null,
    status: "pending",
  });
}

export async function createServiceBooking(
  userId: string,
  input: CreateServiceBookingInput,
): Promise<Booking> {
  return createBooking(userId, {
    booking_type: input.bookingType,
    service_category: input.serviceCategory,
    title: input.title,
    subtitle: input.subtitle?.trim() || null,
    listing_id: input.serviceId,
    listing_kind: null,
    appointment_start: input.appointmentStart,
    appointment_end: input.appointmentEnd,
    appointment_timezone: input.appointmentTimezone ?? SCHEDULING.timezone,
    preferred_time: input.preferredTime,
    notes: input.notes?.trim() || null,
    status: "pending",
  });
}

/** Guest bookings (no account). Requires guest-bookings.sql in Supabase. */
export async function createGuestServiceBooking(input: CreateServiceBookingInput): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.rpc("create_guest_service_booking", {
    p_booking_type: input.bookingType,
    p_service_category: input.serviceCategory,
    p_service_id: input.serviceId,
    p_title: input.title,
    p_subtitle: input.subtitle?.trim() || null,
    p_appointment_start: input.appointmentStart,
    p_appointment_end: input.appointmentEnd,
    p_appointment_timezone: input.appointmentTimezone ?? SCHEDULING.timezone,
    p_preferred_time: input.preferredTime,
    p_notes: input.notes?.trim() || null,
  });

  if (error) {
    if (isUnavailableSlotError(error)) {
      throw new SlotAlreadyBookedError();
    }
    throw error;
  }
}

async function createBooking(
  userId: string,
  row: Omit<Booking, "id" | "user_id" | "created_at">,
): Promise<Booking> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("bookings")
    .insert({
      user_id: userId,
      ...row,
    })
    .select("*")
    .single();

  if (error) {
    if (isUnavailableSlotError(error)) {
      throw new SlotAlreadyBookedError();
    }
    throw error;
  }

  return data as Booking;
}

export function bookingCategoryLabel(booking: Booking): string {
  if (booking.booking_type === "property_viewing" && booking.listing_kind) {
    return booking.listing_kind === "sale" ? "For Sale · Viewing" : "For Rent · Viewing";
  }
  if (booking.booking_type === "consultation") {
    return `${booking.service_category} · Consultation`;
  }
  return booking.service_category;
}

export function bookingStatusLabel(status: BookingStatus): string {
  if (status === "confirmed") return "Confirmed";
  if (status === "cancelled") return "Cancelled";
  return "Pending confirmation";
}

export function formatBookingWhen(booking: Booking): string {
  return booking.preferred_time;
}

export function isUpcomingBooking(booking: Booking): boolean {
  if (booking.status === "cancelled") return false;
  const startMs = Date.parse(booking.appointment_start);
  if (Number.isNaN(startMs)) return true;
  return startMs >= Date.now() - 60 * 60 * 1000;
}

export function sortBookingsUpcomingFirst(bookings: Booking[]): Booking[] {
  return [...bookings].sort((a, b) => {
    const aUpcoming = isUpcomingBooking(a);
    const bUpcoming = isUpcomingBooking(b);
    if (aUpcoming !== bUpcoming) return aUpcoming ? -1 : 1;
    return a.appointment_start.localeCompare(b.appointment_start);
  });
}
