import type { Metadata } from "next";
import { HeroBanner } from "@/components/ui/HeroBanner";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/ui/ContactForm";
import { ContactBlock } from "@/components/ui/ContactBlock";
import { Button } from "@/components/ui/Button";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Preventive Home Services in West Haven, CT",
  description: "Seasonal and year-round preventive home maintenance services in West Haven, CT.",
};

const benefits = [
  "Extend equipment lifespan",
  "Prevent costly surprises",
  "Improve energy efficiency",
  "Improve communication clarity with insurance or warranty providers",
  "Reduce seasonal system failures",
  "Support responsible home maintenance",
];

const services = [
  {
    title: "Kitchen Tune-Up Services",
    items: [
      "Cabinet hardware tightening and adjustments",
      "Door and drawer alignment",
      "Minor caulking and seal refresh",
      "Functional review of sinks, fixtures, and connections",
    ],
  },
  {
    title: "Bathroom Rejuvenation Services",
    items: [
      "Caulking and grout refresh",
      "Fixture tightening and leak awareness",
      "Ventilation and moisture check",
      "Safety-focused adjustments",
    ],
  },
  {
    title: "Seasonal HVAC Preparation",
    items: [
      "Pre-winter heating readiness",
      "Pre-summer cooling preparation",
      "Filter replacement",
      "Safety and efficiency checks",
    ],
  },
  {
    title: "Plumbing Preventive Care",
    items: [
      "Leak awareness",
      "Water pressure evaluation",
      "Drain and valve checks",
      "Water heater condition overview",
    ],
  },
  {
    title: "Electrical Safety Review",
    items: [
      "Panel and breaker overview",
      "GFCI and outlet functionality",
      "Load awareness",
      "Basic safety recommendations",
    ],
  },
  {
    title: "Exterior and Roof Awareness",
    items: [
      "General roof condition observations",
      "Seasonal gutter cleaning",
      "Downspout drainage checks",
      "Door and window seal review",
    ],
  },
];

export default function HomePreventiveServicesPage() {
  return (
    <>
      <HeroBanner
        image={IMAGES.heroHome}
        title="Home Preventive Services Program"
        subtitle="Seasonal & year-round services designed to keep every home safe, efficient, and well-maintained."
        cta={{ label: "Find out more", href: "#benefits" }}
        height="medium"
      />

      <section className="py-14 max-w-4xl mx-auto px-4 text-center">
        <SectionHeading
          title="About This Program"
          subtitle="Tamay Enterprises provides preventive home services that help homeowners stay prepared throughout every season. This program is ideal for homeowners, real estate professionals, and organizations seeking reliable, preventive maintenance support."
        />
      </section>

      <section id="benefits" className="py-14 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeading title="Benefits of Preventive Home Services" />
          <ol className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {benefits.map((b, i) => (
              <li key={b} className="flex gap-3 text-gray-700">
                <span className="font-bold text-tamay-primary">{i + 1}.</span>
                {b}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-14 max-w-6xl mx-auto px-4">
        <SectionHeading title="Our Preventive Services" />
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((s) => (
            <div key={s.title} className="border-l-4 border-tamay-accent pl-6">
              <h3 className="font-heading text-lg text-tamay-primary font-semibold mb-3">{s.title}</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                {s.items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="py-14 bg-tamay-primary text-white px-4">
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeading
            light
            title="Additional Homeowner Support"
            subtitle="If we observe a condition that may require attention, we notify the homeowner and provide a technical written summary to help communicate clearly with insurance or warranty providers."
          />
        </div>
      </section>

      <section className="py-14 max-w-4xl mx-auto px-4 text-center">
        <SectionHeading title="Who We Support" subtitle="Homeowners, Real Estate Professionals, and Warranty Providers." />
        <p className="font-heading text-2xl text-tamay-primary font-semibold mt-8">
          Join the Home Preventive Services Program today.
        </p>
      </section>

      <section id="contact" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12">
          <div>
            <SectionHeading align="left" title="Request Membership Information" />
            <ContactForm
              fields={[
                {
                  name: "services",
                  label: "Services of Interest",
                  type: "select",
                  required: true,
                  options: services.map((s) => s.title),
                },
                { name: "name", label: "Name" },
                { name: "email", label: "Email", type: "email", required: true },
                { name: "phone", label: "Phone", type: "tel" },
              ]}
              submitLabel="Send"
            />
          </div>
          <ContactBlock title="Explore Memberships" showAddress={false} />
        </div>
      </section>
    </>
  );
}
