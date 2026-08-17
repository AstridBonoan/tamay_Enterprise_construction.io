import type { Metadata } from "next";
import { HeroBanner } from "@/components/ui/HeroBanner";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JoinTeamButton } from "@/components/careers/JoinTeamChoice";
import { SiteContactSection } from "@/components/ui/SiteContactSection";
import { CareerRoleCard } from "@/components/careers/CareerRoleCard";
import { CareersJoinFloat } from "@/components/careers/CareersJoinFloat";
import { CareersAboutPhoto } from "@/components/careers/CareersAboutPhoto";
import { CAREER_ROLE_GROUPS } from "@/lib/careerRoles";
import { CAREERS_ABOUT_IMAGES } from "@/lib/careerImages";
import { getResolvedSiteMedia, mediaSrc } from "@/lib/siteImages";
import { buildSocialMetadata } from "@/lib/socialMetadata";
import { SiteText } from "@/components/copy/SiteText";

export const metadata: Metadata = buildSocialMetadata("careers");

export default async function CareersPage() {
  const media = await getResolvedSiteMedia();
  return (
    <>
      <HeroBanner
        image={mediaSrc(media, "careers.hero")}
        slotKey="careers.hero"
        copyKey="careers.hero"
        title="Careers & Partnerships"
        subtitle="Construction Jobs available"
        height="medium"
        imageFit="fill"
        overlayClassName="bg-black/55"
      />

      <section className="py-14 max-w-4xl mx-auto px-4 text-center border-b border-gray-200">
        <SectionHeading
          copyKey="careers.intro"
          eyebrow="Careers & Partnerships"
          title="Construction Jobs & Trade Opportunities"
          subtitle="We believe strong companies are built by strong people and strong relationships. We don't just hire for today, we build long-term careers, partnerships, and leadership opportunities for professionals who take pride in craftsmanship, communication, and growth."
        />
        <div className="mt-8 flex justify-center">
          <JoinTeamButton variant="accent">
            <SiteText k="careers.intro.cta">Join our team</SiteText>
          </JoinTeamButton>
        </div>
      </section>

      <section className="py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <SectionHeading copyKey="careers.about" title="Careers at Tamay Enterprises" />

          <article className="mt-10 border border-gray-200 bg-white shadow-sm overflow-hidden">
            <CareersAboutPhoto
              src={mediaSrc(media, "careers.mission")}
              slotKey="careers.mission"
              alt={CAREERS_ABOUT_IMAGES.mission.alt}
              className="aspect-[21/9] max-h-[280px] w-full"
            />
            <div className="p-6 md:p-10">
              <SiteText k="careers.mission.title" as="h3" className="font-heading text-tamay-primary font-semibold text-xl mb-4">
                Our Mission
              </SiteText>
              <SiteText k="careers.mission.body" as="p" className="text-gray-700 leading-relaxed" multiline>
                To transform living spaces through innovative design and technology, creating adaptable homes that elevate everyday comfort—while fostering a culture of learning, creativity, and leadership where every team member can grow and lead.
              </SiteText>
            </div>
          </article>

          <article className="mt-10 grid md:grid-cols-2 gap-0 border border-gray-200 bg-white shadow-sm overflow-hidden">
            <CareersAboutPhoto
              src={mediaSrc(media, "careers.whyWork")}
              slotKey="careers.whyWork"
              alt={CAREERS_ABOUT_IMAGES.whyWork.alt}
              className="aspect-[4/3] md:aspect-auto md:min-h-full"
            />
            <div className="p-6 md:p-10 flex flex-col justify-center">
              <SiteText k="careers.why.title" as="h3" className="font-heading text-tamay-primary font-semibold text-xl mb-4">
                Why Work With Tamay Enterprises
              </SiteText>
              <SiteText k="careers.why.body1" as="p" className="text-gray-700 leading-relaxed mb-4" multiline>
                At Tamay Enterprises, we are building more than construction projects—we are building systems, people, and long-term opportunities.
              </SiteText>
              <SiteText k="careers.why.body2" as="p" className="text-gray-700 leading-relaxed mb-4" multiline>
                Our team works on residential construction projects that prioritize quality, functionality, accessibility, and long-term value. We invest in professional processes, clear communication, and growth paths so our people can focus on doing their best work.
              </SiteText>
              <ul className="space-y-2 text-gray-700 list-disc list-inside text-sm leading-relaxed">
                <SiteText k="careers.why.item1" as="li">Purpose-driven residential construction projects</SiteText>
                <SiteText k="careers.why.item2" as="li">Opportunities for skill development and leadership</SiteText>
                <SiteText k="careers.why.item3" as="li">Professional project management and clear scopes of work</SiteText>
                <SiteText k="careers.why.item4" as="li">Long-term growth through careers or partnerships</SiteText>
                <SiteText k="careers.why.item5" as="li">A company built to scale—not operate job to job</SiteText>
              </ul>
            </div>
          </article>

          <article className="mt-10 grid md:grid-cols-2 gap-0 border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="p-6 md:p-10 flex flex-col justify-center order-2 md:order-1">
              <SiteText k="careers.thrive.title" as="h3" className="font-heading text-tamay-primary font-semibold text-xl mb-4">
                Who Thrives With Us
              </SiteText>
              <SiteText k="careers.thrive.intro" as="p" className="text-gray-700 leading-relaxed mb-4">
                We work best with individuals and professionals who:
              </SiteText>
              <ul className="space-y-2 text-gray-700 list-disc list-inside text-sm leading-relaxed">
                <SiteText k="careers.thrive.item1" as="li">Take pride in high-quality construction work</SiteText>
                <SiteText k="careers.thrive.item2" as="li">Are reliable, professional, and accountable</SiteText>
                <SiteText k="careers.thrive.item3" as="li">Communicate respectfully with clients and teams</SiteText>
                <SiteText k="careers.thrive.item4" as="li">Want long-term opportunities, not short-term jobs</SiteText>
                <SiteText k="careers.thrive.item5" as="li">Are open to learning, growth, and leadership</SiteText>
              </ul>
            </div>
            <div className="order-1 md:order-2">
              <CareersAboutPhoto
                src={mediaSrc(media, "careers.whoThrives")}
                slotKey="careers.whoThrives"
                alt={CAREERS_ABOUT_IMAGES.whoThrives.alt}
                className="aspect-[4/3] md:aspect-auto md:min-h-full h-full"
              />
            </div>
          </article>
        </div>
      </section>

      <section className="py-14 bg-gray-50 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeading copyKey="careers.roles" title="Careers & Partnerships Opportunities" />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {CAREER_ROLE_GROUPS.map((group) => (
              <CareerRoleCard key={group.id} group={group} />
            ))}
          </div>
        </div>
      </section>

      <SiteContactSection />

      <CareersJoinFloat />
    </>
  );
}
