"use client";

import Link from "next/link";
import { useScheduleSlots } from "@/hooks/useScheduleSlots";
import { sitePath } from "@/lib/paths";

type ScheduleSlotPreviewProps = {
  serviceKey: string;
  scheduleLabel: string;
  bookHref: string;
  showLabel?: boolean;
  emptyMessage?: string;
};

export function ScheduleSlotPreview({
  serviceKey,
  scheduleLabel,
  bookHref,
  showLabel = false,
  emptyMessage = "Contact our team to schedule an appointment.",
}: ScheduleSlotPreviewProps) {
  const { slots, loading } = useScheduleSlots(serviceKey);

  if (loading) {
    return <p className="text-sm text-gray-500">Loading available times...</p>;
  }

  if (slots.length === 0) {
    return <p className="text-gray-600 leading-relaxed">{emptyMessage}</p>;
  }

  return (
    <div>
      {showLabel && (
        <h4 className="text-sm font-semibold tracking-widest uppercase text-tamay-primary mb-3">
          {scheduleLabel}
        </h4>
      )}
      <ul className="space-y-3">
        {slots.map((slot) => (
          <li key={slot.start}>
            <a
              href={bookHref}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 py-3 px-4 bg-gray-50 border border-gray-100 hover:border-tamay-primary hover:bg-tamay-primary/5 transition-colors"
            >
              <span className="font-medium text-gray-800">{slot.date}</span>
              <span className="text-gray-600 text-sm sm:text-base">{slot.time}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ScheduleSlotPreviewInline({
  serviceKey,
  scheduleLabel,
}: {
  serviceKey: string;
  scheduleLabel: string;
}) {
  const { slots, loading } = useScheduleSlots(serviceKey);

  if (loading) {
    return <p className="text-sm text-gray-500">Loading available times...</p>;
  }

  if (slots.length === 0) {
    return null;
  }

  return (
  <>
      <h4 className="text-sm font-semibold tracking-widest uppercase text-tamay-primary mb-3">
        {scheduleLabel}
      </h4>
      <ul className="space-y-3">
        {slots.map((slot) => (
          <li
            key={slot.start}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 py-3 px-4 bg-gray-50 border border-gray-100"
          >
            <span className="font-medium text-gray-800">{slot.date}</span>
            <span className="text-gray-600 text-sm sm:text-base">{slot.time}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

export function ScheduleSlotBookLink({ serviceKey, bookHref }: { serviceKey: string; bookHref: string }) {
  const { slots, loading } = useScheduleSlots(serviceKey);

  if (loading || slots.length === 0) {
    return null;
  }

  return (
    <p className="text-sm text-gray-500 mt-4">
      <Link href={sitePath(bookHref)} className="text-tamay-primary font-semibold hover:underline">
        Book one of these times
      </Link>
    </p>
  );
}
