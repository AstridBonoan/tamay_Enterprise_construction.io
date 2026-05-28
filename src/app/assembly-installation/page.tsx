import type { Metadata } from "next";
import Image from "next/image";
import { HeroBanner } from "@/components/ui/HeroBanner";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/ui/ContactForm";
import { ContactBlock } from "@/components/ui/ContactBlock";
import { Button } from "@/components/ui/Button";
import { ASSEMBLY_HERO_BANNER } from "@/lib/assemblyImages";
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

export const metadata: Metadata = {
  title: "Professional Furniture Assembly and Installation Services | Tamay Enterprises",
  description:
    "Scalable furniture assembly and installation for retailers, platforms, property managers, and multi-unit properties in West Haven, CT.",
};

type ServiceCardProps = {
  title: string;
  image: string;
  imageAlt: string;
  items: readonly string[];
};

function ServiceCard({ title, image, imageAlt, items }: ServiceCardProps) {
  return (
    <article className="border border-gray-200 bg-white overflow-hidden h-full flex flex-col">
      <figure className="relative aspect-[16/10] w-full bg-gray-100">
        <Image src={image} alt={imageAlt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" unoptimized />
      </figure>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="font-heading text-lg text-tamay-primary font-semibold mb-4">{title}</h3>
        <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5 flex-1">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function AssemblyInstallationPage() {
  return (
    <>
      <HeroBanner
        image={ASSEMBLY_HERO_BANNER}
        title="Professional Furniture Assembly & Installation"
        subtitle={ASSEMBLY_INTRO.tagline}
        height="medium"
        imageFit="fill"
        overlayClassName="bg-black/50"
      />

      <section className="py-14 max-w-4xl mx-auto px-4">
        <h2 className="font-heading text-2xl md:text-3xl text-tamay-primary font-bold text-center mb-6">
          {ASSEMBLY_INTRO.heading}
        </h2>
        <div className="space-y-4 text-gray-600 text-center leading-relaxed">
          {ASSEMBLY_INTRO.paragraphs.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button href="#contact" variant="accent">
            Partner With Our Team
          </Button>
        </div>
      </section>

      <section className="py-14 bg-gray-50 px-4 border-y border-gray-200">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            eyebrow={ASSEMBLY_WHO_WE_SUPPORT.eyebrow}
            title={ASSEMBLY_WHO_WE_SUPPORT.title}
          />
          <p className="text-gray-600 text-center leading-relaxed -mt-2 mb-6">
            {ASSEMBLY_WHO_WE_SUPPORT.intro}
          </p>
          <p className="text-sm font-semibold text-tamay-primary text-center mb-3">We commonly support:</p>
          <ul className="max-w-xl mx-auto text-gray-600 space-y-2 list-disc pl-5">
            {ASSEMBLY_WHO_WE_SUPPORT.audiences.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="text-gray-600 text-center leading-relaxed mt-6">{ASSEMBLY_WHO_WE_SUPPORT.closing}</p>
        </div>
      </section>

      <section className="py-14 max-w-6xl mx-auto px-4">
        <SectionHeading
          eyebrow="ASSEMBLY & INSTALLATION SERVICES"
          title="Types of Assembly and Installation Projects We Handle"
          subtitle="Our team performs a wide range of furniture assembly and installation services commonly requested by large furniture retailers, logistics providers, and service platforms. Each project is completed with attention to detail, proper alignment, and client-ready results."
        />
        <figure className="relative aspect-[21/9] max-w-5xl mx-auto mt-10 mb-8 overflow-hidden rounded-sm">
          <Image
            src={ASSEMBLY_CABINET_FEATURE.image}
            alt={ASSEMBLY_CABINET_FEATURE.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
            unoptimized
          />
        </figure>
        <p className="text-center text-sm text-gray-600 max-w-2xl mx-auto mb-10">{ASSEMBLY_CABINET_FEATURE.caption}</p>
        <div className="grid md:grid-cols-2 gap-6">
          {ASSEMBLY_SERVICE_GROUPS.map((group) => (
            <ServiceCard
              key={group.title}
              title={group.title}
              image={group.image}
              imageAlt={group.imageAlt}
              items={group.items}
            />
          ))}
        </div>
      </section>

      <section className="py-12 px-4 bg-tamay-primary/5 border-y border-tamay-primary/20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-2xl md:text-3xl font-bold tracking-widest uppercase text-tamay-primary mb-4">
            Important
          </p>
          <p className="text-gray-700 leading-relaxed">{ASSEMBLY_IMPORTANT_NOTE}</p>
          <Button href="/online-appointments" variant="primary" className="mt-8">
            Request Assembly Support
          </Button>
        </div>
      </section>

      <section className="bg-tamay-primary text-white">
        <figure className="relative w-full h-[220px] sm:h-[300px] md:h-[380px]">
          <Image
            src={ASSEMBLY_SCALE.image}
            alt={ASSEMBLY_SCALE.imageAlt}
            fill
            className="object-cover object-[center_15%] sm:object-[center_12%]"
            sizes="100vw"
            unoptimized
          />
          <div className="absolute inset-0 bg-tamay-primary/35" aria-hidden />
        </figure>
        <div className="py-14 px-4 max-w-3xl mx-auto">
          <p className="text-sm font-semibold tracking-widest uppercase text-tamay-accent text-center mb-2">
            {ASSEMBLY_SCALE.eyebrow}
          </p>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-6">{ASSEMBLY_SCALE.title}</h2>
          <p className="text-gray-100 text-center leading-relaxed mb-6">{ASSEMBLY_SCALE.intro}</p>
          <p className="text-gray-100 text-center font-semibold mb-4">{ASSEMBLY_SCALE.subheading}</p>
          <ol className="max-w-xl mx-auto space-y-3 text-gray-100 list-decimal pl-6">
            {ASSEMBLY_SCALE.requirements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
          <p className="text-gray-100 text-center leading-relaxed mt-8">{ASSEMBLY_SCALE.closing}</p>
        </div>
      </section>

      <section className="py-14 max-w-5xl mx-auto px-4">
        <figure className="relative aspect-[16/9] w-full mb-10 overflow-hidden rounded-sm">
          <Image
            src={ASSEMBLY_STANDARDS.image}
            alt={ASSEMBLY_STANDARDS.imageAlt}
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 1024px"
            unoptimized
          />
        </figure>
        <SectionHeading
          eyebrow={ASSEMBLY_STANDARDS.eyebrow}
          title={ASSEMBLY_STANDARDS.title}
          subtitle={ASSEMBLY_STANDARDS.intro}
        />
        <ul className="max-w-xl mx-auto text-gray-600 space-y-2 list-disc pl-5 -mt-2">
          {ASSEMBLY_STANDARDS.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="text-center mt-8">
          <Button href="#contact" variant="outline">
            Partner With Us
          </Button>
        </div>
      </section>

      <section className="py-14 bg-gray-50 px-4 border-t border-gray-200">
        <div className="max-w-3xl mx-auto">
          <SectionHeading
            eyebrow={ASSEMBLY_WHY_PARTNERS.eyebrow}
            title={ASSEMBLY_WHY_PARTNERS.title}
          />
          <p className="text-gray-700 text-center font-semibold -mt-2 mb-4">{ASSEMBLY_WHY_PARTNERS.lead}</p>
          <ul className="max-w-xl mx-auto text-gray-600 space-y-2 list-disc pl-5">
            {ASSEMBLY_WHY_PARTNERS.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section id="contact" className="py-16 px-4 border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title="Ready to Work With a Professional Assembly Partner?"
            subtitle="Let's Connect and Put Our Team to Work"
          />
          <p className="text-gray-600 text-center max-w-2xl mx-auto -mt-4 mb-10 leading-relaxed">
            We collaborate with service platforms, logistics partners, and project coordinators looking for
            professional assembly and installation support at scale.
          </p>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h3 className="font-heading text-lg text-tamay-primary font-semibold mb-4">Contact us</h3>
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
        </div>
      </section>
    </>
  );
}
