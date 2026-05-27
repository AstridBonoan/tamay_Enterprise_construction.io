import { SITE } from "@/lib/site";
import { ContactForm } from "@/components/ui/ContactForm";
import { Button } from "@/components/ui/Button";

const services = [
  "Construction consultations & site visits",
  "Real estate showings and property walkthroughs",
  "Logistics coordination",
  "Home preventive maintenance and small projects",
];

const serviceOptions = [
  "Construction",
  "Real estate",
  "Logistics",
  "Home preventive services",
  "Assembly & installation",
  "Other",
];

export function BookingEmbed() {
  return (
    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-start">
      <div>
        <h3 className="font-heading text-lg text-tamay-primary font-semibold mb-4">
          Request an appointment
        </h3>
        <p className="text-gray-600 text-sm mb-6 leading-relaxed">
          Tell us what you need and your preferred times. Our team will confirm your appointment by
          phone or email.
        </p>
        <ContactForm
          submitLabel="Request appointment"
          showRecaptchaNote={false}
          fields={[
            { name: "name", label: "Name", required: true },
            { name: "email", label: "Email", type: "email", required: true },
            { name: "phone", label: "Phone", type: "tel", required: true },
            {
              name: "service",
              label: "Service",
              type: "select",
              required: true,
              options: serviceOptions,
            },
            { name: "preferred", label: "Preferred date & time", required: true },
            { name: "message", label: "Additional details", type: "textarea" },
          ]}
        />
      </div>

      <div>
        <h3 className="font-heading text-lg text-tamay-primary font-semibold mb-4">
          What we schedule
        </h3>
        <ul className="text-sm text-gray-700 space-y-2 mb-8">
          {services.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-tamay-accent shrink-0" aria-hidden>
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
          Prefer to schedule by phone? We are happy to help.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button href={SITE.phoneTel} variant="primary">
            Call {SITE.phone}
          </Button>
          <Button href={SITE.whatsapp} variant="outline" external>
            WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
}
