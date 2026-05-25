import type { Metadata } from "next";
import { HeroBanner } from "@/components/ui/HeroBanner";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Careers & Partnerships",
  description: "Construction jobs and trade opportunities at Tamay Enterprises in West Haven, CT.",
};

const roles = [
  {
    category: "Leadership & Field Management",
    items: ["Crew Leads / Foremen", "Project Coordinators"],
  },
  {
    category: "Renovation Specialists",
    items: ["Kitchen Renovation Specialists", "Bathroom Renovation Specialists"],
  },
  {
    category: "Sales & Growth Opportunities",
    items: ["Construction Sales Representatives", "Sales-Minded Field Technicians"],
  },
  {
    category: "Licensed & Skilled Trades",
    items: ["Electricians (Licensed or Experienced)", "Plumbers (Licensed or Experienced)", "HVAC Technicians"],
  },
  {
    category: "Field & Trade Positions",
    items: [
      "General Laborers",
      "Painters (Interior & Exterior)",
      "Drywall Installers / Finishers",
      "Flooring Installers",
      "Tile Installers",
      "Finish & Framing Carpenters",
    ],
  },
];

export default function CareersPage() {
  return (
    <>
      <HeroBanner
        image={IMAGES.heroConstruction}
        title="Careers & Partnerships"
        subtitle="Construction Jobs available"
        height="medium"
      />

      <section className="py-14 max-w-4xl mx-auto px-4 text-center">
        <SectionHeading
          eyebrow="Careers & Partnerships"
          title="Construction Jobs & Trade Opportunities"
          subtitle="We believe strong companies are built by strong people and strong relationships. We don't just hire for today, we build long-term careers, partnerships, and leadership opportunities."
        />
        <Button href="#join" variant="accent">
          Join our team
        </Button>
      </section>

      <section className="py-14 bg-gray-50 px-4">
        <div className="max-w-4xl mx-auto">
          <SectionHeading title="Careers at Tamay Enterprises" subtitle="Our Mission: To transform living spaces through innovative design and technology, creating adaptable homes that elevate everyday comfort." />
          <div className="grid md:grid-cols-2 gap-8 text-sm text-gray-700">
            <div>
              <h3 className="font-heading text-tamay-primary font-semibold mb-3">Why Work With Tamay Enterprises</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>Purpose-driven residential construction projects</li>
                <li>Opportunities for skill development and leadership</li>
                <li>Professional project management and clear scopes of work</li>
                <li>Long-term growth through careers or partnerships</li>
              </ul>
            </div>
            <div>
              <h3 className="font-heading text-tamay-primary font-semibold mb-3">Who Thrives With Us</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>Take pride in high-quality construction work</li>
                <li>Reliable, professional, and accountable</li>
                <li>Want long-term opportunities, not short-term jobs</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 max-w-5xl mx-auto px-4">
        <SectionHeading title="Career Opportunities & Construction Trade Roles" />
        <div className="space-y-8">
          {roles.map((r) => (
            <div key={r.category}>
              <h3 className="font-heading text-lg text-tamay-primary font-semibold mb-3">{r.category}</h3>
              <ol className="list-decimal list-inside text-gray-700 space-y-1">
                {r.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      <section id="join" className="py-20 bg-tamay-primary text-white text-center px-4">
        <h2 className="font-heading text-3xl font-semibold mb-6">Join our team</h2>
        <p className="text-gray-200 mb-8 max-w-md mx-auto">
          Email your resume to info@tamayenterprises.com or call 203-220-6678
        </p>
        <Button href="mailto:info@tamayenterprises.com" variant="accent" external>
          Apply Now
        </Button>
      </section>
    </>
  );
}
