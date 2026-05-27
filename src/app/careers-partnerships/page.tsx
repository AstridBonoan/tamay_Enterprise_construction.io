import type { Metadata } from "next";
import { HeroBanner } from "@/components/ui/HeroBanner";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { CareerRoleCard } from "@/components/careers/CareerRoleCard";
import { CAREER_ROLE_GROUPS } from "@/lib/careerRoles";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Careers & Partnerships | Tamay Enterprises West Haven CT",
  description:
    "Construction jobs and trade opportunities at Tamay Enterprises in West Haven, CT. Build long-term careers in residential construction.",
};

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
          subtitle="We believe strong companies are built by strong people and strong relationships. We don't just hire for today, we build long-term careers, partnerships, and leadership opportunities for professionals who take pride in craftsmanship, communication, and growth."
        />
        <Button href="/careers-partnerships/apply" variant="accent">
          Join our team
        </Button>
      </section>

      <section className="py-14 bg-gray-50 px-4">
        <div className="max-w-4xl mx-auto">
          <SectionHeading title="Careers at Tamay Enterprises" />

          <div className="space-y-10 text-sm text-gray-700 leading-relaxed">
            <div>
              <h3 className="font-heading text-tamay-primary font-semibold text-lg mb-3">
                Our Mission
              </h3>
              <p>
                To transform living spaces through innovative design and technology, creating
                adaptable homes that elevate everyday comfort—while fostering a culture of learning,
                creativity, and leadership where every team member can grow and lead.
              </p>
            </div>

            <div>
              <h3 className="font-heading text-tamay-primary font-semibold text-lg mb-3">
                Why Work With Tamay Enterprises
              </h3>
              <p className="mb-4">
                At Tamay Enterprises, we are building more than construction projects—we are building
                systems, people, and long-term opportunities.
              </p>
              <p className="mb-4">
                Our team works on residential construction projects that prioritize quality,
                functionality, accessibility, and long-term value. We invest in professional
                processes, clear communication, and growth paths so our people can focus on doing
                their best work.
              </p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Purpose-driven residential construction projects</li>
                <li>Opportunities for skill development and leadership</li>
                <li>Professional project management and clear scopes of work</li>
                <li>Long-term growth through careers or partnerships</li>
                <li>A company built to scale—not operate job to job</li>
              </ul>
            </div>

            <div>
              <h3 className="font-heading text-tamay-primary font-semibold text-lg mb-3">
                Who Thrives With Us
              </h3>
              <p className="mb-4">We work best with individuals and professionals who:</p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Take pride in high-quality construction work</li>
                <li>Are reliable, professional, and accountable</li>
                <li>Communicate respectfully with clients and teams</li>
                <li>Want long-term opportunities, not short-term jobs</li>
                <li>Are open to learning, growth, and leadership</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 max-w-6xl mx-auto px-4">
        <SectionHeading title="Career Opportunities & Construction Trade Roles" />
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {CAREER_ROLE_GROUPS.map((group) => (
            <CareerRoleCard key={group.id} group={group} />
          ))}
        </div>
      </section>
    </>
  );
}
