"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  AccountEmptyState,
  AccountPageShell,
  AccountPanel,
  accountButtonSecondaryClass,
} from "@/components/account/AccountHub";
import { useRequireAuth } from "@/components/auth/useRequireAuth";
import {
  bookingCategoryLabel,
  bookingStatusLabel,
  fetchBookings,
  formatBookingWhen,
  isUpcomingBooking,
  sortBookingsUpcomingFirst,
  type Booking,
} from "@/lib/booking-data";
import { sitePath } from "@/lib/paths";

export default function BookingsPage() {
  const { user, loading } = useRequireAuth("/m/bookings");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadBookings = useCallback(async () => {
    if (!user) return;
    setLoadingBookings(true);
    try {
      setBookings(sortBookingsUpcomingFirst(await fetchBookings(user.id)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load bookings.");
    } finally {
      setLoadingBookings(false);
    }
  }, [user]);

  useEffect(() => {
    void loadBookings();
  }, [loadBookings]);

  if (loading || !user) return null;

  const upcoming = bookings.filter(isUpcomingBooking);
  const past = bookings.filter((booking) => !isUpcomingBooking(booking));

  return (
    <AccountPageShell
      title="Your Bookings"
      description="Consultations, service appointments, and property viewings you scheduled with Tamay Enterprises."
    >
      <div className="space-y-4">
        {error && (
          <AccountPanel>
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          </AccountPanel>
        )}

        {loadingBookings ? (
          <AccountPanel>
            <p className="text-sm text-gray-600">Loading bookings...</p>
          </AccountPanel>
        ) : bookings.length === 0 ? (
          <AccountEmptyState
            title="No bookings yet"
            description="When you schedule a consultation, service appointment, or property viewing while signed in, it will appear here."
            action={
              <Link href={sitePath("/#contact")} className={accountButtonSecondaryClass}>
                Explore our services
              </Link>
            }
          />
        ) : (
          <div className="space-y-6">
            {upcoming.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-wide text-gray-500">Upcoming</h2>
                {upcoming.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </div>
            )}

            {past.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-wide text-gray-500">Past</h2>
                {past.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </div>
            )}
          </div>
        )}

        <Link href="/m/account" className={accountButtonSecondaryClass}>
          Back to Your Account
        </Link>
      </div>
    </AccountPageShell>
  );
}

function BookingCard({ booking }: { booking: Booking }) {
  return (
    <AccountPanel>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-tamay-accent">
            {bookingCategoryLabel(booking)}
          </p>
          <h3 className="font-heading text-lg text-tamay-primary font-semibold mt-1">{booking.title}</h3>
          {booking.subtitle && <p className="text-sm text-gray-600 mt-1">{booking.subtitle}</p>}
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Status</p>
          <p className="font-semibold text-tamay-primary">{bookingStatusLabel(booking.status)}</p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-sm text-gray-500">Scheduled for</p>
        <p className="font-medium text-gray-900">{formatBookingWhen(booking)}</p>
        {booking.notes && (
          <p className="text-sm text-gray-600 mt-3">
            <span className="font-medium text-gray-700">Notes: </span>
            {booking.notes}
          </p>
        )}
      </div>
    </AccountPanel>
  );
}
