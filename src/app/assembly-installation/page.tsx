import type { Metadata } from "next";
import { HeroBanner } from "@/components/ui/HeroBanner";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SiteContactSection } from "@/components/ui/SiteContactSection";
import { Button } from "@/components/ui/Button";
import { ServiceAppointmentSection } from "@/components/appointments/ServiceAppointmentSection";
import { SitePhoto } from "@/components/images/SitePhoto";
import {
  ASSEMBLY_CABINET_FEATURE,
  ASSEMBLY_IMPORTANT_NOTE,
  ASSEMBLY_INTRO,
  ASSEMBLY_SCALE,
  ASSEMBLY_SERVICE_GROUPS,
  ASSEMBLY_STANDARDS,
  ASSEMBLY_WHO_WE_SUPPORT,
  ASSEMBLY_WHY_PARTNERS,
} from "@/lib/assemblyInstallation";
import { appointmentScheduleHref } from "@/lib/onlineAppointments";
import { getResolvedSiteMedia, mediaSrc } from "@/lib/siteImages";
import { buildSocialMetadata } from "@/lib/socialMetadata";
import { SiteText } from "@/components/copy/SiteText";

export const metadata: Metadata = buildSocialMetadata("assembly");

type ServiceCardProps = {
  title: string;
  slot: string;
  imageAlt: string;
  items: readonly string[];
  copyPrefix: string;
};

function ServiceCard({ title, slot, imageAlt, items, copyPrefix }: ServiceCardProps) {
  return (
    <article className="border border-gray-200 bg-white overflow-hidden h-full flex flex-col">
      <figure className="relative aspect-[16/10] w-full bg-gray-100">
        <SitePhoto slot={slot} alt={imageAlt} sizes="(max-width: 768px) 100vw, 50vw" />
      </figure>
      <div className="p-6 flex-1 flex flex-col">
        <SiteText k={`${copyPrefix}.title`} as="h3" className="font-heading text-lg text-tamay-primary font-semibold mb-4">
          {title}
        </SiteText>
        <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5 flex-1">
          {items.map((item, index) => (
            <SiteText k={`${copyPrefix}.item${index + 1}`} as="li" key={`${copyPrefix}.item${index + 1}`}>
              {item}
            </SiteText>
          ))}
        </ul>
        <div className="mt-6 pt-4 border-t border-gray-100">
          <Button href={appointmentScheduleHref("assembly-installation")} variant="accent" className="w-full">
            <SiteText k={`${copyPrefix}.cta`}>Book Now</SiteText>
          </Button>
        </div>
      </div>
    </article>
  );
}

const ASSEMBLY_GROUP_IMAGE_KEYS = [
  "assembly.furnitureAssembly",
  "assembly.storageWarehouse",
  "assembly.officeAssembly",
  "assembly.wallMountInstall",
  "assembly.flatPackAssembly",
  "assembly.precisionAssembly",
  "assembly.whiteGloveVanity",
] as const;

export default async function AssemblyInstallationPage() {
  const media = await getResolvedSiteMedia();
  return (
    <>
      <HeroBanner
        image={mediaSrc(media, "assembly.hero")}
        slotKey="assembly.hero"
        copyKey="assembly.hero"
        title="Professional Furniture Assembly & Installation"
        subtitle={ASSEMBLY_INTRO.tagline}
        height="medium"
        imageFit="fill"
        overlayClassName="bg-black/50"
      />

      <section className="py-14 max-w-4xl mx-auto px-4">
        <SiteText k="assembly.intro.heading" as="h2" className="font-heading text-2xl md:text-3xl text-tamay-primary font-bold text-center mb-6">
          {ASSEMBLY_INTRO.heading}
        </SiteText>
        <div className="space-y-4 text-gray-600 text-center leading-relaxed">
          {ASSEMBLY_INTRO.paragraphs.map((p, index) => (
            <SiteText k={`assembly.intro.body${index + 1}`} as="p" key={`assembly.intro.body${index + 1}`} multiline>
              {p}
            </SiteText>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button href="#contact" variant="accent">
            <SiteText k="assembly.intro.cta">Partner With Our Team</SiteText>
          </Button>
        </div>
      </section>

      <section className="py-14 bg-gray-50 px-4 border-y border-gray-200">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            copyKey="assembly.support"
            eyebrow={ASSEMBLY_WHO_WE_SUPPORT.eyebrow}
            title={ASSEMBLY_WHO_WE_SUPPORT.title}
          />
          <SiteText k="assembly.support.intro" as="p" className="text-gray-600 text-center leading-relaxed -mt-2 mb-6" multiline>
            {ASSEMBLY_WHO_WE_SUPPORT.intro}
          </SiteText>
          <SiteText k="assembly.support.listLabel" as="p" className="text-sm font-semibold text-tamay-primary text-center mb-3">
            We commonly support:
          </SiteText>
          <ul className="max-w-xl mx-auto text-gray-600 space-y-2 list-disc pl-5">
            {ASSEMBLY_WHO_WE_SUPPORT.audiences.map((item, index) => (
              <SiteText k={`assembly.support.item${index + 1}`} as="li" key={`assembly.support.item${index + 1}`}>
                {item}
              </SiteText>
            ))}
          </ul>
          <SiteText k="assembly.support.closing" as="p" className="text-gray-600 text-center leading-relaxed mt-6" multiline>
            {ASSEMBLY_WHO_WE_SUPPORT.closing}
          </SiteText>
        </div>
      </section>

      <section className="py-14 max-w-6xl mx-auto px-4">
        <SectionHeading
          copyKey="assembly.types"
          eyebrow="ASSEMBLY & INSTALLATION SERVICES"
          title="Types of Assembly and Installation Projects We Handle"
          subtitle="Our team performs a wide range of furniture assembly and installation services commonly requested by large furniture retailers, logistics providers, and service platforms. Each project is completed with attention to detail, proper alignment, and client-ready results."
        />
        <figure className="relative aspect-[21/9] max-w-5xl mx-auto mt-10 mb-8 overflow-hidden rounded-sm">
          <SitePhoto
            slot="assembly.cabinetInstall"
            alt={ASSEMBLY_CABINET_FEATURE.imageAlt}
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
        </figure>
        <SiteText k="assembly.cabinet.caption" as="p" className="text-center text-sm text-gray-600 max-w-2xl mx-auto mb-10" multiline>
          {ASSEMBLY_CABINET_FEATURE.caption}
        </SiteText>
        <div className="grid md:grid-cols-2 gap-6">
          {ASSEMBLY_SERVICE_GROUPS.map((group, index) => (
            <ServiceCard
              key={group.title}
              title={group.title}
              slot={ASSEMBLY_GROUP_IMAGE_KEYS[index] ?? "assembly.furnitureAssembly"}
              imageAlt={group.imageAlt}
              items={group.items}
              copyPrefix={`assembly.group${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="py-12 px-4 bg-tamay-primary/5 border-y border-tamay-primary/20">
        <div className="max-w-3xl mx-auto text-center">
          <SiteText k="assembly.important.label" as="p" className="text-2xl md:text-3xl font-bold tracking-widest uppercase text-tamay-primary mb-4">
            Important
          </SiteText>
          <SiteText k="assembly.important.body" as="p" className="text-gray-700 leading-relaxed" multiline>
            {ASSEMBLY_IMPORTANT_NOTE}
          </SiteText>
          <Button href={appointmentScheduleHref("assembly-installation")} variant="accent" className="mt-8">
            <SiteText k="assembly.important.cta">Request Assembly Support</SiteText>
          </Button>
        </div>
      </section>

      <section className="bg-tamay-primary text-white">
        <figure className="relative w-full aspect-[1024/282]">
          <SitePhoto
            slot="assembly.builtForScale"
            alt={ASSEMBLY_SCALE.imageAlt}
            className="object-cover object-top"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-tamay-primary/35" aria-hidden />
        </figure>
        <div className="py-14 px-4 max-w-3xl mx-auto">
          <SiteText k="assembly.scale.eyebrow" as="p" className="text-sm font-semibold tracking-widest uppercase text-tamay-accent text-center mb-2">
            {ASSEMBLY_SCALE.eyebrow}
          </SiteText>
          <SiteText k="assembly.scale.title" as="h2" className="font-heading text-2xl md:text-3xl font-bold text-center mb-6">
            {ASSEMBLY_SCALE.title}
          </SiteText>
          <SiteText k="assembly.scale.intro" as="p" className="text-gray-100 text-center leading-relaxed mb-6" multiline>
            {ASSEMBLY_SCALE.intro}
          </SiteText>
          <SiteText k="assembly.scale.subheading" as="p" className="text-gray-100 text-center font-semibold mb-4">
            {ASSEMBLY_SCALE.subheading}
          </SiteText>
          <ol className="max-w-xl mx-auto space-y-3 text-gray-100 list-decimal pl-6">
            {ASSEMBLY_SCALE.requirements.map((item, index) => (
              <SiteText k={`assembly.scale.item${index + 1}`} as="li" key={`assembly.scale.item${index + 1}`}>
                {item}
              </SiteText>
            ))}
          </ol>
          <SiteText k="assembly.scale.closing" as="p" className="text-gray-100 text-center leading-relaxed mt-8" multiline>
            {ASSEMBLY_SCALE.closing}
          </SiteText>
        </div>
      </section>

      <section className="py-14 max-w-5xl mx-auto px-4">
        <figure className="relative aspect-[16/9] w-full mb-10 overflow-hidden rounded-sm">
          <SitePhoto
            slot="assembly.professionalStandards"
            alt={ASSEMBLY_STANDARDS.imageAlt}
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
        </figure>
        <SectionHeading
          copyKey="assembly.standards"
          eyebrow={ASSEMBLY_STANDARDS.eyebrow}
          title={ASSEMBLY_STANDARDS.title}
          subtitle={ASSEMBLY_STANDARDS.intro}
        />
        <ul className="max-w-xl mx-auto text-gray-600 space-y-2 list-disc pl-5 -mt-2">
          {ASSEMBLY_STANDARDS.items.map((item, index) => (
            <SiteText k={`assembly.standards.item${index + 1}`} as="li" key={`assembly.standards.item${index + 1}`}>
              {item}
            </SiteText>
          ))}
        </ul>
        <div className="text-center mt-8">
          <Button href="#contact" variant="outline">
            <SiteText k="assembly.standards.cta">Partner With Us</SiteText>
          </Button>
        </div>
      </section>

      <section className="py-14 bg-gray-50 px-4 border-t border-gray-200">
        <div className="max-w-3xl mx-auto">
          <SectionHeading
            copyKey="assembly.partners"
            eyebrow={ASSEMBLY_WHY_PARTNERS.eyebrow}
            title={ASSEMBLY_WHY_PARTNERS.title}
          />
          <SiteText k="assembly.partners.lead" as="p" className="text-gray-700 text-center font-semibold -mt-2 mb-4">
            {ASSEMBLY_WHY_PARTNERS.lead}
          </SiteText>
          <ul className="max-w-xl mx-auto text-gray-600 space-y-2 list-disc pl-5">
            {ASSEMBLY_WHY_PARTNERS.items.map((item, index) => (
              <SiteText k={`assembly.partners.item${index + 1}`} as="li" key={`assembly.partners.item${index + 1}`}>
                {item}
              </SiteText>
            ))}
          </ul>
        </div>
      </section>

      <ServiceAppointmentSection serviceId="assembly-installation" />

      <SiteContactSection />
    </>
  );
}
