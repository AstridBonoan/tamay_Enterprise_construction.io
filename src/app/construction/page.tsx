import type { Metadata } from "next";
import Image from "next/image";
import { HeroBanner } from "@/components/ui/HeroBanner";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/ui/ContactForm";
import { ContactBlock } from "@/components/ui/ContactBlock";
import { Button } from "@/components/ui/Button";
import { IMAGES } from "@/lib/images";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "General Contractor in West Haven, CT",
  description:
    "Tamay Enterprises delivers construction and home renovation services in West Haven, CT including full renovations, additions, and kitchen & bathroom remodeling.",
};

const processSteps = [
  {
    step: "1",
    title: "Consultation & Vision",
    text: "Every project begins with a detailed consultation where we take the time to understand your goals, budget, and timeline.",
  },
  {
    step: "2",
    title: "Design & Scope Development",
    text: "Our team collaborates with designers and specialists to create a clear project scope, material selections, and layout direction.",
  },
  {
    step: "3",
    title: "Proposal & Scheduling",
    text: "You receive a transparent proposal outlining the scope of work, pricing, and projected timeline.",
  },
  {
    step: "4",
    title: "Build Phase",
    text: "During construction, we maintain an organized job site with consistent quality control and clear communication.",
  },
  {
    step: "5",
    title: "Final Walkthrough & Completion",
    text: "Upon completion, we conduct a final walkthrough to review all details and ensure the space is clean and ready for use.",
  },
  {
    step: "6",
    title: "Warranty & Ongoing Support",
    text: "Qualifying projects are backed by warranty support, and our team remains available to stand behind the work.",
  },
];

export default function ConstructionPage() {
  return (
    <>
      <HeroBanner
        image={IMAGES.heroConstruction}
        title="Construction & Home Renovation Services"
        subtitle="Your dream space starts here."
        height="medium"
      />

      <div className="bg-tamay-accent text-white text-center py-3 text-sm font-semibold tracking-wide">
        7-Year Warranty + Complimentary Kitchen or Bathroom Tune-Up on new Renovations
      </div>

      <section className="py-14 max-w-4xl mx-auto px-4">
        <SectionHeading
          title="Construction & Home Renovation Services in West Haven, CT"
          subtitle="With over ten years of proven experience, Tamay Enterprises is a fully insured construction company delivering complete residential and commercial construction solutions through its Tamay Construction Department."
        />
        <p className="text-gray-600 text-center leading-relaxed">
          In addition to our renovation and construction work, we also offer preventive home services designed to help clients protect and maintain their investment over time.{" "}
          <Button href="/home-preventive-services" variant="outline" className="!inline !py-1 !px-3 !text-xs mt-2">
            more information →
          </Button>
        </p>
      </section>

      <section className="py-14 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeading eyebrow="OUR CORE SERVICES" title="Our Core Services" />
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Full Home Renovations & Remodeling",
                text: "From interior updates to whole-home transformations, each project is managed with structured planning, professional coordination, and quality-driven execution.",
                img: IMAGES.construction.renovation,
              },
              {
                title: "Home Additions & Expansions",
                text: "Room additions, bump-outs, and layout expansions delivered with attention to structural integrity, visual continuity, and long-term durability.",
                img: IMAGES.construction.addition,
              },
              {
                title: "Kitchen & Bathroom Remodeling",
                text: "Remodeling work balances aesthetics, durability, and everyday usability for owner-occupied and managed properties.",
                img: IMAGES.construction.kitchenBath,
              },
            ].map((s) => (
              <article key={s.title} className="bg-white shadow-md overflow-hidden">
                <div className="relative h-48">
                  <Image src={s.img} alt={s.title} fill className="object-cover" sizes="400px" unoptimized />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-lg text-tamay-primary font-semibold mb-3">{s.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{s.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 max-w-3xl mx-auto px-4 text-center">
        <SectionHeading title="7-Year Warranty & Complimentary Tune-Ups" subtitle="Renovate Once. Enjoy It Longer." />
        <ol className="text-left text-gray-700 space-y-2 max-w-md mx-auto mb-8">
          <li>1. 7-year workmanship warranty on eligible renovations</li>
          <li>2. Bathroom rejuvenation tune-ups (only on full/new renovations)</li>
          <li>3. Kitchen tune-ups (only on full/new renovations)</li>
          <li>4. Transferable (1 year if unused)</li>
        </ol>
        <Button href={SITE.financingUrl} variant="accent" external>
          Check Eligibility
        </Button>
      </section>

      <section className="py-14 bg-tamay-primary text-white text-center px-4">
        <SectionHeading
          light
          title="Licensed & Established"
          subtitle={`Connecticut License ${SITE.license} — Tamay Enterprises operates as a licensed Connecticut contractor, meeting state requirements for professional construction and renovation services.`}
        />
      </section>

      <section className="py-14 max-w-6xl mx-auto px-4">
        <SectionHeading title="Residential & Commercial Projects" />
        <div className="grid sm:grid-cols-2 gap-6">
          {["Masonry work", "ADA-COMPLIANT COMMERCIAL RESTROOM BUILD-OUT"].map((title) => (
            <div key={title} className="relative aspect-video bg-gray-200 flex items-end p-4">
              <Image src={IMAGES.heroConstruction} alt={title} fill className="object-cover opacity-90" sizes="500px" unoptimized />
              <h3 className="relative z-10 font-heading text-white text-xl font-semibold drop-shadow">{title}</h3>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button href="/gallery" variant="primary">
            More projects
          </Button>
        </div>
      </section>

      <section className="py-14 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <SectionHeading title="Our Construction Process — From Vision to Long-Term Support" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((p) => (
              <div key={p.step} className="bg-white p-6 border-t-4 border-tamay-accent shadow-sm">
                <span className="text-tamay-accent font-bold text-2xl">{p.step}</span>
                <h4 className="font-heading text-tamay-primary font-semibold mt-2 mb-2">{p.title}</h4>
                <p className="text-sm text-gray-600">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 max-w-4xl mx-auto px-4 text-center">
        <SectionHeading title="Client Testimonials" subtitle="This testimonial reflects the experience our clients can expect when working with Tamay Enterprise — from clear communication and organized project execution to quality results that stand the test of time." />
        <div className="aspect-video bg-gray-900 max-w-2xl mx-auto flex items-center justify-center text-gray-400 mb-6">
          <p className="text-sm px-4">Replace with your testimonial video embed</p>
        </div>
        <Button href="/reviews" variant="outline">
          More reviews
        </Button>
      </section>

      <section className="py-14 px-4 max-w-4xl mx-auto text-center">
        <SectionHeading
          title="Serving West Haven & Nearby Connecticut Communities"
          subtitle="Based in West Haven, Connecticut, Tamay Enterprises proudly serves homeowners, investors, and real estate professionals throughout nearby communities, including New Haven, Milford, Orange, Hamden, East Haven, Branford, Shelton, and Stratford."
        />
      </section>

      <section id="contact" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12">
          <div>
            <SectionHeading align="left" title="Start Your Project the Right Way" />
            <ContactForm
              fields={[
                {
                  name: "projectType",
                  label: "Project Type",
                  type: "select",
                  options: ["Full Renovation", "Addition", "Kitchen", "Bathroom", "Commercial", "Other"],
                },
                { name: "name", label: "Name", required: true },
                { name: "email", label: "Email", type: "email", required: true },
                { name: "phone", label: "Phone", type: "tel", required: true },
                { name: "city", label: "City" },
              ]}
              submitLabel="Request My Consultation"
            />
          </div>
          <ContactBlock showAddress={false} />
        </div>
      </section>
    </>
  );
}
