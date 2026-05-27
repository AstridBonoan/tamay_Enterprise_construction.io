"use client";

import { useMemo, useState } from "react";
import { SITE } from "@/lib/site";

const SERVICES = [
  { id: "construction", name: "Construction consultation", duration: "60 min" },
  { id: "real-estate", name: "Real estate showing", duration: "45 min" },
  { id: "logistics", name: "Logistics consultation", duration: "30 min" },
  { id: "preventive", name: "Home preventive service", duration: "60 min" },
  { id: "assembly", name: "Assembly & installation", duration: "60 min" },
  { id: "general", name: "General inquiry", duration: "30 min" },
] as const;

const TIME_SLOTS = [
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

type Step = "service" | "datetime" | "details" | "done";

function formatDayLabel(date: Date) {
  return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

function formatDayKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function OnlineAppointmentsSection() {
  const [step, setStep] = useState<Step>("service");
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const days = useMemo(() => {
    const list: Date[] = [];
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    for (let i = 0; i < 14; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      if (d.getDay() !== 0) list.push(d);
    }
    return list;
  }, []);

  const service = SERVICES.find((s) => s.id === serviceId);

  function reset() {
    setStep("service");
    setServiceId(null);
    setSelectedDay(null);
    setSelectedTime(null);
    setName("");
    setEmail("");
    setPhone("");
    setNotes("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStep("done");
  }

  return (
    <section
      aria-label="Online appointments"
      className="min-h-[min(100vh,900px)] bg-gray-50 border border-gray-200 rounded-sm shadow-sm overflow-hidden"
    >
      <div className="bg-tamay-primary text-white px-4 py-5 md:px-8 md:py-6">
        <h2 className="font-heading text-xl md:text-2xl font-semibold">Schedule an appointment</h2>
        <p className="text-sm text-white/90 mt-1">
          Select a service, choose a time, and confirm your details.
        </p>
        <ol className="flex flex-wrap gap-2 mt-4 text-xs font-semibold uppercase tracking-wide">
          {(
            [
              ["service", "1. Service"],
              ["datetime", "2. Date & time"],
              ["details", "3. Your details"],
              ["done", "4. Confirm"],
            ] as const
          ).map(([id, label]) => (
            <li
              key={id}
              className={`px-3 py-1 rounded-sm ${
                step === id ? "bg-white text-tamay-primary" : "bg-white/15 text-white"
              }`}
            >
              {label}
            </li>
          ))}
        </ol>
      </div>

      <div className="p-4 md:p-8">
        {step === "service" && (
          <div>
            <p className="text-gray-600 text-sm mb-6">What would you like to schedule?</p>
            <ul className="grid sm:grid-cols-2 gap-3">
              {SERVICES.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setServiceId(item.id);
                      setStep("datetime");
                    }}
                    className={`w-full text-left border px-4 py-4 transition-colors hover:border-tamay-primary hover:bg-white ${
                      serviceId === item.id
                        ? "border-tamay-primary bg-white ring-2 ring-tamay-primary/20"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <span className="block font-semibold text-tamay-primary">{item.name}</span>
                    <span className="block text-sm text-gray-500 mt-1">{item.duration}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {step === "datetime" && service && (
          <div>
            <p className="text-sm text-gray-600 mb-4">
              <span className="font-semibold text-tamay-primary">{service.name}</span>
              <button
                type="button"
                onClick={() => setStep("service")}
                className="ml-3 text-tamay-primary underline text-xs font-semibold"
              >
                Change service
              </button>
            </p>
            <p className="text-gray-600 text-sm mb-3">Select a date</p>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-6">
              {days.map((day) => {
                const key = formatDayKey(day);
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setSelectedDay(key);
                      setSelectedTime(null);
                    }}
                    className={`shrink-0 min-w-[5.5rem] border px-3 py-3 text-sm transition-colors ${
                      selectedDay === key
                        ? "border-tamay-primary bg-tamay-primary text-white"
                        : "border-gray-200 bg-white hover:border-tamay-primary"
                    }`}
                  >
                    {formatDayLabel(day)}
                  </button>
                );
              })}
            </div>
            {selectedDay && (
              <>
                <p className="text-gray-600 text-sm mb-3">Select a time</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-6">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTime(slot)}
                      className={`border py-2 text-sm font-medium transition-colors ${
                        selectedTime === slot
                          ? "border-tamay-primary bg-tamay-primary text-white"
                          : "border-gray-200 bg-white hover:border-tamay-primary"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </>
            )}
            <button
              type="button"
              disabled={!selectedDay || !selectedTime}
              onClick={() => setStep("details")}
              className="bg-tamay-accent hover:bg-tamay-accent-hover disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-6 py-3 text-sm tracking-wide"
            >
              Continue
            </button>
          </div>
        )}

        {step === "details" && service && selectedDay && selectedTime && (
          <form onSubmit={handleSubmit} className="max-w-lg">
            <p className="text-sm text-gray-600 mb-6">
              <span className="font-semibold text-tamay-primary">{service.name}</span>
              <br />
              {selectedDay} at {selectedTime}
            </p>
            <div className="space-y-4">
              <div>
                <label htmlFor="appt-name" className="block text-sm font-semibold text-gray-700 mb-1">
                  Name<span className="text-red-600">*</span>
                </label>
                <input
                  id="appt-name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-tamay-primary"
                />
              </div>
              <div>
                <label htmlFor="appt-email" className="block text-sm font-semibold text-gray-700 mb-1">
                  Email<span className="text-red-600">*</span>
                </label>
                <input
                  id="appt-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-tamay-primary"
                />
              </div>
              <div>
                <label htmlFor="appt-phone" className="block text-sm font-semibold text-gray-700 mb-1">
                  Phone<span className="text-red-600">*</span>
                </label>
                <input
                  id="appt-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-tamay-primary"
                />
              </div>
              <div>
                <label htmlFor="appt-notes" className="block text-sm font-semibold text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  id="appt-notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-tamay-primary"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mt-6">
              <button
                type="button"
                onClick={() => setStep("datetime")}
                className="border-2 border-tamay-primary text-tamay-primary font-bold px-6 py-3 text-sm"
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-tamay-primary hover:bg-tamay-primary-dark text-white font-bold px-6 py-3 text-sm tracking-wide"
              >
                Request appointment
              </button>
            </div>
          </form>
        )}

        {step === "done" && (
          <div className="max-w-lg text-center mx-auto py-8">
            <p className="font-heading text-xl text-tamay-primary font-semibold mb-3">
              Appointment request received
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Thank you. Our team will confirm your appointment by phone or email. This form is not yet
              connected to a live calendar — for immediate scheduling, call or message us.
            </p>
            <button
              type="button"
              onClick={reset}
              className="bg-tamay-accent hover:bg-tamay-accent-hover text-white font-bold px-6 py-3 text-sm tracking-wide"
            >
              Schedule another
            </button>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 bg-white px-4 py-4 md:px-8 text-center text-sm text-gray-600">
        Prefer to book by phone?{" "}
        <a href={SITE.phoneTel} className="text-tamay-primary font-semibold hover:underline">
          {SITE.phone}
        </a>{" "}
        ·{" "}
        <a
          href={SITE.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="text-tamay-primary font-semibold hover:underline"
        >
          WhatsApp
        </a>{" "}
        ·{" "}
        <a href={`mailto:${SITE.email}`} className="text-tamay-primary font-semibold hover:underline">
          {SITE.email}
        </a>
      </div>
    </section>
  );
}
