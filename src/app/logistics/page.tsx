import type { Metadata } from "next";
import { HeroBanner } from "@/components/ui/HeroBanner";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/ui/ContactForm";
import { ContactBlock } from "@/components/ui/ContactBlock";
import { Button } from "@/components/ui/Button";
import { IMAGES } from "@/lib/images";
import { SERVICE_AREAS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Logistics & Delivery Services in West Haven, CT",
  description: "Professional local and regional logistics and delivery services in West Haven, CT.",
};

const services = [
  "Local and regional delivery services",
  "Business logistics support",
  "Scheduled and coordinated transportation",
  "Time-sensitive deliveries",
  "Project-based logistics coordination",
];

const whyChoose = [
  { title: "Professional appearance", text: "Professional appearance and courteous drivers" },
  { title: "On-time operations", text: "Same-day or next-day transport for urgent materials and equipment." },
  { title: "Problem-solving mindset", text: "Problem-solving mindset for tight windows and tricky sites" },
];

export default function LogisticsPage() {
  return (
    <>
      <HeroBanner
        image={IMAGES.divisions.logistics}
        title="Logistics & Delivery Services"
        subtitle="Logistics & Delivery Services in West Haven, CT"
        height="medium"
      />

      <section className="py-14 max-w-4xl mx-auto px-4">
        <SectionHeading
          eyebrow="ABOUT US"
          title="Logistics Services Built on Reliability"
          subtitle="Reliable logistics is not just about moving items from one location to another — it's about coordination, timing, and accountability. Tamay Enterprises provides professional logistics and delivery services in West Haven, CT and nearby towns."
        />
        <div className="text-center">
          <Button href="#contact" variant="accent">
            Get a Fast Quote
          </Button>
        </div>
      </section>

      <section className="py-14 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeading title="Our Logistics & Delivery Services" />
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-8">
            {services.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <div className="text-center">
            <Button href="#contact" variant="primary">
              Request a Quote
            </Button>
          </div>
        </div>
      </section>

      <section className="py-14 max-w-6xl mx-auto px-4">
        <SectionHeading eyebrow="WHY CHOOSE TAMAY LOGISTICS" title="Why Choose Tamay Logistics" />
        <div className="grid md:grid-cols-3 gap-8">
          {whyChoose.map((w) => (
            <div key={w.title} className="text-center p-6 border border-gray-200">
              <h3 className="font-heading text-tamay-primary font-semibold mb-3">{w.title}</h3>
              <p className="text-sm text-gray-600">{w.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-14 bg-tamay-primary text-white px-4">
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeading
            light
            title="Supporting Businesses & Individuals"
            subtitle="Our logistics services support local businesses, contractors coordinating materials, and individuals needing organized transportation support."
          />
        </div>
      </section>

      <section className="py-14 max-w-4xl mx-auto px-4 text-center">
        <SectionHeading
          title="Serving West Haven & Nearby Communities"
          subtitle={`Areas we serve: ${SERVICE_AREAS.join(", ")}, and surrounding areas.`}
        />
        <p className="text-gray-600 mt-4">
          Logistics works best when systems are in place. Our team prioritizes clear scheduling, defined responsibilities, and consistent communication.
        </p>
      </section>

      <section id="contact" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12">
          <div>
            <SectionHeading align="left" title="What Can We Help You Move Today?" />
            <ContactForm
              fields={[
                { name: "name", label: "Name" },
                { name: "email", label: "Email", type: "email", required: true },
              ]}
            />
          </div>
          <ContactBlock
            title="Need Reliable Logistics Support?"
            description="Contact Tamay Enterprises to discuss your logistics or delivery needs."
            hours="Open today 08:00 am – 05:00 pm"
          />
        </div>
      </section>
    </>
  );
}
