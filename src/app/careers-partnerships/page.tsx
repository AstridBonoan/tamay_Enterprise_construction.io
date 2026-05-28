import type { Metadata } from "next";
import { HeroBanner } from "@/components/ui/HeroBanner";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { CareerRoleCard } from "@/components/careers/CareerRoleCard";
import { CareersAboutPhoto } from "@/components/careers/CareersAboutPhoto";
import { CAREER_ROLE_GROUPS } from "@/lib/careerRoles";
import { CAREERS_ABOUT_IMAGES, CAREERS_HERO_BANNER } from "@/lib/careerImages";

export const metadata: Metadata = {
  title: "Careers & Partnerships | Tamay Enterprises West Haven CT",
  description:
    "Construction jobs and trade opportunities at Tamay Enterprises in West Haven, CT. Build long-term careers in residential construction.",
};

export default function CareersPage() {
  return (
    <>
      <HeroBanner
        image={CAREERS_HERO_BANNER}
        title="Careers & Partnerships"
        subtitle="Construction Jobs available"
        height="medium"
        imageFit="fill"
        overlayClassName="bg-black/55"
      />

      <section className="py-14 max-w-4xl mx-auto px-4 text-center border-b border-gray-200">
        <SectionHeading
          eyebrow="Careers & Partnerships"
          title="Construction Jobs & Trade Opportunities"
          subtitle="We believe strong companies are built by strong people and strong relationships. We don't just hire for today, we build long-term careers, partnerships, and leadership opportunities for professionals who take pride in craftsmanship, communication, and growth."
        />
        <Button href="/careers-partnerships/apply" variant="accent">
          Join our team
        </Button>
      </section>

      <section className="py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <SectionHeading title="Careers at Tamay Enterprises" />

          <article className="mt-10 border border-gray-200 bg-white shadow-sm overflow-hidden">
            <CareersAboutPhoto
              src={CAREERS_ABOUT_IMAGES.mission.src}
              alt={CAREERS_ABOUT_IMAGES.mission.alt}
              className="aspect-[21/9] max-h-[280px] w-full"
            />
            <div className="p-6 md:p-10">
              <h3 className="font-heading text-tamay-primary font-semibold text-xl mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To transform living spaces through innovative design and technology, creating adaptable homes
                that elevate everyday comfort—while fostering a culture of learning, creativity, and
                leadership where every team member can grow and lead.
              </p>
            </div>
          </article>

          <article className="mt-10 grid md:grid-cols-2 gap-0 border border-gray-200 bg-white shadow-sm overflow-hidden">
            <CareersAboutPhoto
              src={CAREERS_ABOUT_IMAGES.whyWork.src}
              alt={CAREERS_ABOUT_IMAGES.whyWork.alt}
              className="aspect-[4/3] md:aspect-auto md:min-h-full"
            />
            <div className="p-6 md:p-10 flex flex-col justify-center">
              <h3 className="font-heading text-tamay-primary font-semibold text-xl mb-4">
                Why Work With Tamay Enterprises
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                At Tamay Enterprises, we are building more than construction projects—we are building
                systems, people, and long-term opportunities.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our team works on residential construction projects that prioritize quality, functionality,
                accessibility, and long-term value. We invest in professional processes, clear
                communication, and growth paths so our people can focus on doing their best work.
              </p>
              <ul className="space-y-2 text-gray-700 list-disc list-inside text-sm leading-relaxed">
                <li>Purpose-driven residential construction projects</li>
                <li>Opportunities for skill development and leadership</li>
                <li>Professional project management and clear scopes of work</li>
                <li>Long-term growth through careers or partnerships</li>
                <li>A company built to scale—not operate job to job</li>
              </ul>
            </div>
          </article>

          <article className="mt-10 grid md:grid-cols-2 gap-0 border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="p-6 md:p-10 flex flex-col justify-center order-2 md:order-1">
              <h3 className="font-heading text-tamay-primary font-semibold text-xl mb-4">
                Who Thrives With Us
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We work best with individuals and professionals who:
              </p>
              <ul className="space-y-2 text-gray-700 list-disc list-inside text-sm leading-relaxed">
                <li>Take pride in high-quality construction work</li>
                <li>Are reliable, professional, and accountable</li>
                <li>Communicate respectfully with clients and teams</li>
                <li>Want long-term opportunities, not short-term jobs</li>
                <li>Are open to learning, growth, and leadership</li>
              </ul>
            </div>
            <div className="order-1 md:order-2">
              <CareersAboutPhoto
                src={CAREERS_ABOUT_IMAGES.whoThrives.src}
                alt={CAREERS_ABOUT_IMAGES.whoThrives.alt}
                className="aspect-[4/3] md:aspect-auto md:min-h-full h-full"
              />
            </div>
          </article>
        </div>
      </section>

      <section className="py-14 bg-gray-50 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeading title="Career Opportunities & Construction Trade Roles" />
          <div className="mt-10 space-y-6 lg:space-y-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {CAREER_ROLE_GROUPS.slice(0, 3).map((group) => (
                <CareerRoleCard key={group.id} group={group} />
              ))}
            </div>
            <div className="grid sm:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto w-full">
              {CAREER_ROLE_GROUPS.slice(3).map((group) => (
                <CareerRoleCard key={group.id} group={group} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
