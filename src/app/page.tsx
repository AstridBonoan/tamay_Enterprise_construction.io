import { HeroVideoBanner } from "@/components/ui/HeroVideoBanner";
import { HomeImageShowcase } from "@/components/home/HomeImageShowcase";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { OurServicesSection } from "@/components/home/OurServicesSection";
import { ContactForm } from "@/components/ui/ContactForm";
import { ContactBlock } from "@/components/ui/ContactBlock";
import { Button } from "@/components/ui/Button";
import { SITE, SERVICE_AREAS } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <HeroVideoBanner
        tagline={SITE.tagline}
        title="CONSTRUCTION, REAL ESTATE & LOGISTICS"
        titleLine2="Services in West Haven, CT"
        subtitle="Tamay Enterprises is a West Haven, CT–based multi-service company providing construction and home renovation services, real estate solutions, and local logistics support."
        cta={{ label: "Explore Our Services", href: "#our-services" }}
      />

      <OurServicesSection />

      <section className="py-16 bg-tamay-primary text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <SectionHeading
            eyebrow="WHY CHOOSE US?"
            title="One Enterprise. Multiple Solutions."
            subtitle="Tamay Enterprises was built to simplify services for our clients. Instead of coordinating multiple vendors, our customers benefit from one organized team with experience across construction, real estate, and logistics."
            light
          />
          <h3 className="font-heading text-xl font-semibold mb-4">WHY TAMAY ENTERPRISES</h3>
          <p className="text-gray-200 leading-relaxed max-w-2xl mx-auto">
            This integrated approach helps projects move more efficiently while maintaining accountability, quality, and clear communication.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <SectionHeading
            title="Proudly Serving West Haven & Nearby Connecticut Communities"
            subtitle={`Based in West Haven, CT, Tamay Enterprises proudly serves clients in ${SERVICE_AREAS.slice(0, 8).join(", ")}, and surrounding Connecticut communities. Our local presence allows us to provide responsive service while supporting projects throughout the region.`}
          />
        </div>
      </section>

      <HomeImageShowcase />

      <section className="py-12 bg-gray-50 text-center">
        <p className="font-heading text-xl text-tamay-primary mb-2">Build now. Pay over time.</p>
        <p className="text-gray-600 mb-6">Financing available across all projects</p>
        <Button href={SITE.financingUrl} variant="accent" external>
          Check Financing Options
        </Button>
      </section>

      <section id="contact" className="py-16">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12">
          <div>
            <SectionHeading align="left" eyebrow="CONTACT US" title="Explore our Services" />
            <ContactForm
              fields={[
                {
                  name: "category",
                  label: "Category of Service",
                  type: "select",
                  required: true,
                  options: [
                    "Construction",
                    "Real Estate",
                    "Logistics",
                    "Home Preventive Services",
                    "Assembly & Installation",
                    "Other",
                  ],
                },
                { name: "name", label: "Name", required: true },
                { name: "email", label: "Email", type: "email", required: true },
                { name: "phone", label: "Phone", type: "tel", required: true },
              ]}
              submitLabel="Send"
            />
            <p className="text-xs text-gray-500 mt-4 max-w-md">
              By submitting this form, you agree to receive text messages and calls from{" "}
              <strong>{SITE.legalName}</strong> related to your inquiry. Reply <strong>STOP</strong> to cancel. Reply{" "}
              <strong>HELP</strong> for help.
            </p>
          </div>
          <ContactBlock
            description="Whether you're planning a construction project, need real estate support, or require dependable logistics services, Tamay Enterprises is ready to help."
          />
        </div>
      </section>
    </>
  );
}
