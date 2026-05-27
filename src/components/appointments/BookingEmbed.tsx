import { SITE } from "@/lib/site";
import { Button } from "@/components/ui/Button";

const services = [
  "Construction consultations & site visits",
  "Real estate showings and property walkthroughs",
  "Logistics coordination",
  "Home preventive maintenance and small projects",
];

export function BookingEmbed() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-8 md:p-10 text-center">
        <p className="text-gray-600 mb-8 leading-relaxed">
          Appointments are scheduled through our secure online booking system on tamayenterprises.com.
          Choose a service, pick an available time, and receive confirmation by email.
        </p>
        <Button href={SITE.appointmentsUrl} variant="accent" external className="min-w-[220px]">
          Schedule an appointment
        </Button>
        <ul className="mt-10 text-left text-sm text-gray-700 space-y-2 max-w-md mx-auto">
          {services.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-tamay-accent shrink-0" aria-hidden>
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-center text-sm text-gray-500 mt-8">
        Already have an account?{" "}
        <a
          href="https://tamayenterprises.com/m/bookings"
          target="_blank"
          rel="noopener noreferrer"
          className="text-tamay-primary font-semibold hover:underline"
        >
          View your bookings
        </a>{" "}
        or{" "}
        <a
          href="https://tamayenterprises.com/m/account"
          target="_blank"
          rel="noopener noreferrer"
          className="text-tamay-primary font-semibold hover:underline"
        >
          sign in
        </a>
        .
      </p>

      <p className="text-center text-sm text-gray-500 mt-4">
        Prefer to book by phone? Call{" "}
        <a href={SITE.phoneTel} className="text-tamay-primary font-semibold hover:underline">
          {SITE.phone}
        </a>{" "}
        or{" "}
        <a
          href={SITE.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="text-tamay-primary font-semibold hover:underline"
        >
          message us on WhatsApp
        </a>
        .
      </p>
    </div>
  );
}
