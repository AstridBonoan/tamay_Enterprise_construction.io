"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { APPOINTMENT_SERVICES } from "@/lib/appointmentServices";
import { SITE } from "@/lib/site";
import { ContactForm } from "@/components/ui/ContactForm";

export function OnlineAppointmentsSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const active = APPOINTMENT_SERVICES.find((s) => s.id === activeId);

  function handleBook(serviceId: string) {
    setActiveId(serviceId);
    requestAnimationFrame(() => {
      panelRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }

  return (
    <div className="bg-white max-w-4xl mx-auto">
      <ul>
        {APPOINTMENT_SERVICES.map((service) => (
          <li key={service.id} className="py-8 md:py-10 border-b border-gray-200 last:border-b-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="relative shrink-0 w-full sm:w-[140px] h-[140px] bg-gray-100 mx-auto sm:mx-0">
                <Image
                  src={service.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="140px"
                />
              </div>

              <div className="flex-1 min-w-0 text-center sm:text-left">
                <h2 className="text-2xl md:text-[1.75rem] font-bold text-gray-900 leading-tight">
                  {service.title}
                </h2>
                <p className="text-gray-600 mt-2">{service.meta}</p>
                <p className="text-gray-500 mt-2 text-sm leading-relaxed">{service.description}</p>
              </div>

              <div className="shrink-0 flex justify-center sm:justify-end">
                <button
                  type="button"
                  onClick={() => handleBook(service.id)}
                  className="rounded-full bg-tamay-primary hover:bg-tamay-primary-dark text-white font-bold text-sm tracking-[0.2em] px-10 py-3.5 min-w-[120px] transition-colors"
                >
                  BOOK
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {active && (
        <div ref={panelRef} className="mt-10 pt-10 border-t border-gray-200">
          <h3 className="font-heading text-xl text-tamay-primary font-semibold mb-2">
            Book: {active.title}
          </h3>
          <p className="text-sm text-gray-600 mb-6">{active.meta}</p>
          <ContactForm
            submitLabel="Request appointment"
            showRecaptchaNote={false}
            fields={[
              { name: "name", label: "Name", required: true },
              { name: "email", label: "Email", type: "email", required: true },
              { name: "phone", label: "Phone", type: "tel", required: true },
              { name: "preferred", label: "Preferred date & time", required: true },
              { name: "message", label: "Notes", type: "textarea" },
            ]}
          />
        </div>
      )}

      <p className="text-center text-sm text-gray-500 py-8">
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
        </a>
      </p>
    </div>
  );
}
