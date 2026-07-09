"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  createScheduleSlot,
  deactivateScheduleSlot,
  fetchStaffScheduleSlots,
  getDefaultStaffServiceKey,
  getScheduleServiceLabel,
  getScheduleServiceOptions,
  type ScheduleSlotRow,
} from "@/lib/scheduleSlots";

const inputClass =
  "w-full border border-gray-300 rounded-md px-4 py-3 text-base text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-tamay-primary/40 focus:border-tamay-primary";

type StaffScheduleManagerProps = {
  userId: string;
};

export function StaffScheduleManager({ userId }: StaffScheduleManagerProps) {
  const serviceOptions = useMemo(() => getScheduleServiceOptions(), []);
  const [serviceKey, setServiceKey] = useState(getDefaultStaffServiceKey());
  const [slots, setSlots] = useState<ScheduleSlotRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("11:00");

  const loadSlots = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setSlots(await fetchStaffScheduleSlots(serviceKey));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load schedule.");
    } finally {
      setLoading(false);
    }
  }, [serviceKey]);

  useEffect(() => {
    void loadSlots();
  }, [loadSlots]);

  const handleAddSlot = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      await createScheduleSlot(userId, {
        serviceKey,
        date,
        startTime,
        endTime,
      });
      setSuccess("Time added. Customers can book it right away.");
      setDate("");
      await loadSlots();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not add time.");
    } finally {
      setSaving(false);
    }
  };

  const handleRemove = async (slotId: string) => {
    setError(null);
    setSuccess(null);
    try {
      await deactivateScheduleSlot(slotId);
      setSuccess("Time removed from customer booking.");
      await loadSlots();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not remove time.");
    }
  };

  const activeSlots = slots.filter((slot) => slot.active !== false);
  const groupedOptions = useMemo(() => {
    const groups = new Map<string, typeof serviceOptions>();
    for (const option of serviceOptions) {
      const list = groups.get(option.group) ?? [];
      list.push(option);
      groups.set(option.group, list);
    }
    return groups;
  }, [serviceOptions]);

  return (
    <div className="space-y-8">
      <div className="bg-white border border-gray-200 shadow-sm p-6 sm:p-8 space-y-4">
        <div>
          <label htmlFor="staff-service" className="block text-sm font-semibold text-gray-700 mb-2">
            Service or property
          </label>
          <select
            id="staff-service"
            value={serviceKey}
            onChange={(event) => setServiceKey(event.target.value)}
            className={inputClass}
          >
            {[...groupedOptions.entries()].map(([group, options]) => (
              <optgroup key={group} label={group}>
                {options.map((option) => (
                  <option key={option.key} value={option.key}>
                    {option.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <p className="text-sm text-gray-500 mt-2">
            Managing: <span className="font-medium text-gray-700">{getScheduleServiceLabel(serviceKey)}</span>
          </p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 shadow-sm p-6 sm:p-8">
        <h2 className="font-heading text-lg text-tamay-primary font-semibold mb-2">Add available time</h2>
        <p className="text-sm text-gray-600 mb-6">
          Pick a date and time window. Customers will see it on the website and can book it.
        </p>

        <form onSubmit={handleAddSlot} className="grid gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="staff-date" className="block text-sm font-semibold text-gray-700 mb-2">
              Date
            </label>
            <input
              id="staff-date"
              type="date"
              required
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="staff-start" className="block text-sm font-semibold text-gray-700 mb-2">
              Start time
            </label>
            <input
              id="staff-start"
              type="time"
              required
              value={startTime}
              onChange={(event) => setStartTime(event.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="staff-end" className="block text-sm font-semibold text-gray-700 mb-2">
              End time
            </label>
            <input
              id="staff-end"
              type="time"
              required
              value={endTime}
              onChange={(event) => setEndTime(event.target.value)}
              className={inputClass}
            />
          </div>
          <div className="sm:col-span-3">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center rounded-full bg-tamay-primary hover:bg-tamay-primary-dark disabled:opacity-60 text-white font-bold text-sm tracking-widest px-8 py-3 transition-colors"
            >
              {saving ? "Adding..." : "Add time"}
            </button>
          </div>
        </form>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        {success && <p className="mt-4 text-sm text-green-700">{success}</p>}
      </div>

      <div className="bg-white border border-gray-200 shadow-sm p-6 sm:p-8">
        <h2 className="font-heading text-lg text-tamay-primary font-semibold mb-4">Current times</h2>

        {loading ? (
          <p className="text-sm text-gray-600">Loading...</p>
        ) : activeSlots.length === 0 ? (
          <p className="text-sm text-gray-600">No times added yet for this service or property.</p>
        ) : (
          <ul className="space-y-3">
            {activeSlots.map((slot) => (
              <li
                key={slot.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-3 px-4 border border-gray-100 bg-gray-50"
              >
                <div>
                  <p className="font-medium text-gray-800">{slot.date_label}</p>
                  <p className="text-sm text-gray-600">{slot.time_label}</p>
                </div>
                <button
                  type="button"
                  onClick={() => void handleRemove(slot.id)}
                  className="text-sm font-semibold text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
