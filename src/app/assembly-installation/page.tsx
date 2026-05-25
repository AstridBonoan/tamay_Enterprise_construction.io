import type { Metadata } from "next";
import { HeroBanner } from "@/components/ui/HeroBanner";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/ui/ContactForm";
import { ContactBlock } from "@/components/ui/ContactBlock";
import { Button } from "@/components/ui/Button";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Professional Furniture Assembly and Installation Services",
  description: "Scalable furniture assembly and installation for retailers, platforms, and property managers.",
};

const serviceGroups = [
  {
    title: "Furniture Assembly Services",
    items: ["Bed frames", "Sofas & sectionals", "Dining tables & chairs", "Dressers & wardrobes", "TV stands & media consoles"],
  },
  {
    title: "Storage & Organization Assembly",
    items: ["Shelving units", "Bookcases", "Closet storage systems", "Garage storage cabinets"],
  },
  {
    title: "Office & Commercial Furniture Assembly",
    items: ["Desks & office chairs", "Conference tables", "Modular office furniture", "Reception furniture"],
  },
  {
    title: "Wall-Mounted & Anchored Installations",
    items: ["Wall-mounted TV stands", "Floating shelves", "Furniture anchoring for safety"],
  },
];

export default function AssemblyInstallationPage() {
  return (
    <>
      <HeroBanner
        image={IMAGES.divisions.logistics}
        title="Professional Furniture Assembly & Installation"
        subtitle="Scalable. Reliable. Platform-Ready Assembly Solutions."
        cta={{ label: "Partner With Our Team", href: "#contact" }}
        height="medium"
      />

      <section className="py-14 max-w-4xl mx-auto px-4 text-center">
        <SectionHeading
          title="Professional assembly & installation support for scalable projects"
          subtitle="We operate as a registered, insured company, not as individual installers, allowing us to support higher volumes, multiple locations, and coordinated scheduling."
        />
      </section>

      <section className="py-14 bg-gray-50 px-4">
        <div className="max-w-4xl mx-auto">
          <SectionHeading title="Who We Support" subtitle="Furniture retailers, marketplace platforms, property managers, short-term rentals, and real estate staging." />
        </div>
      </section>

      <section className="py-14 max-w-6xl mx-auto px-4">
        <SectionHeading title="Assembly & Installation Services" />
        <div className="grid md:grid-cols-2 gap-8">
          {serviceGroups.map((g) => (
            <div key={g.title} className="border border-gray-200 p-6">
              <h3 className="font-heading text-tamay-primary font-semibold mb-4">{g.title}</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                {g.items.map((i) => (
                  <li key={i}>• {i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Button href="#contact" variant="primary">
            Request Assembly Support
          </Button>
        </div>
      </section>

      <section className="py-14 bg-tamay-primary text-white px-4">
        <div className="max-w-3xl mx-auto">
          <SectionHeading
            light
            title="Built for High-Volume and Multi-Job Platforms"
            subtitle="Multiple technicians, parallel job execution, structured scheduling, consistent quality standards, and clear documentation."
          />
        </div>
      </section>

      <section className="py-14 max-w-4xl mx-auto px-4 text-center">
        <SectionHeading
          title="Professional Standards, Safety, and Accountability"
          subtitle="Registered and insured company with experienced technicians, professional conduct, and photo documentation available when required."
        />
        <Button href="#contact" variant="outline" className="!border-white !text-white hover:!bg-white hover:!text-tamay-primary mt-4">
          Partner With Us
        </Button>
      </section>

      <section id="contact" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12">
          <div>
            <SectionHeading align="left" title="Let's Connect and Put Our Team to Work" />
            <ContactForm
              fields={[
                { name: "name", label: "Name" },
                { name: "phone", label: "Phone Number", type: "tel" },
                { name: "email", label: "Email", type: "email", required: true },
              ]}
            />
          </div>
          <ContactBlock hours="Open today 09:00 am – 08:00 pm" />
        </div>
      </section>
    </>
  );
}
