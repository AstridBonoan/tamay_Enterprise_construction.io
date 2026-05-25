import type { Metadata } from "next";
import { HeroBanner } from "@/components/ui/HeroBanner";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/ui/ContactForm";
import { ContactBlock } from "@/components/ui/ContactBlock";
import { IMAGES } from "@/lib/images";
import { SERVICE_AREAS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Real Estate Services in West Haven, CT",
  description:
    "Real estate services backed by construction expertise for buyers, sellers, and investors in West Haven, CT.",
};

const audiences = [
  {
    title: "Homebuyers",
    text: "We help homebuyers understand how a property can be improved. Instead of showing dozens of homes that don't quite fit, we guide clients toward opportunities where thoughtful renovation can turn the right purchase into the right home.",
  },
  {
    title: "Real Estate Investors",
    text: "We support investment-focused clients by evaluating properties through both a real estate and construction lens, helping identify opportunities where value can be added strategically and efficiently.",
  },
  {
    title: "Property Managers & Portfolio Owners",
    text: "Property managers benefit from working with a team that understands both asset acquisition and property improvement for smarter purchasing decisions and coordinated execution.",
  },
];

export default function RealEstatePage() {
  return (
    <>
      <HeroBanner
        image={IMAGES.divisions.realEstate}
        title="Real Estate Services"
        subtitle="Dream homes, functional spaces, and long-term value are rarely found exactly as-is — they are built."
        height="medium"
      />

      <section className="py-14 max-w-4xl mx-auto px-4 text-center">
        <SectionHeading
          title="Real Estate Services in West Haven, CT"
          subtitle="At Tamay Enterprises, our real estate services go beyond simply helping clients buy or sell property. We are a group of licensed contractors and real estate professionals who help clients identify what a property can become, not just what currently is."
        />
        <p className="text-gray-600 leading-relaxed">
          Based in West Haven, CT, we support homebuyers, sellers, real estate investors, and property managers by combining real estate guidance with construction insight.
        </p>
      </section>

      <section className="py-14 bg-gray-50 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeading
            title="Real Estate Services Backed by Construction Expertise"
            subtitle="Unlike traditional real estate agents who focus solely on listings, Tamay Enterprises approaches real estate with a builder's mindset."
          />
        </div>
      </section>

      <section className="py-14 max-w-6xl mx-auto px-4">
        <SectionHeading eyebrow="Who We Serve" title="Who We Serve" />
        <div className="grid md:grid-cols-3 gap-8">
          {audiences.map((a) => (
            <div key={a.title} className="border-t-4 border-tamay-primary pt-6">
              <h3 className="font-heading text-xl text-tamay-primary font-semibold mb-3">{a.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{a.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-14 bg-tamay-primary text-white px-4">
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeading
            light
            title="Buying, Selling & Strategic Property Guidance"
            subtitle="Tamay Enterprises provides real estate services for clients looking to purchase, sell, evaluate renovation potential, or align real estate decisions with future construction plans."
          />
        </div>
      </section>

      <section className="py-14 max-w-4xl mx-auto px-4 text-center">
        <SectionHeading
          title="Serving West Haven & Nearby Connecticut Communities"
          subtitle={`Based in West Haven, CT, Tamay Enterprises proudly serves clients throughout ${SERVICE_AREAS.join(", ")}, and surrounding Connecticut communities.`}
        />
      </section>

      <section className="py-14 bg-gray-50 px-4 text-center">
        <SectionHeading
          title="A Different Way to Think About Real Estate"
          subtitle="Helping clients see beyond what a property is — and recognize what it can become. Not every dream home is found — many are created."
        />
      </section>

      <section id="contact" className="py-16">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12">
          <div>
            <SectionHeading align="left" eyebrow="Find Your Home" title="Talk to an Agent" />
            <ContactForm
              fields={[
                { name: "name", label: "Name", required: true },
                { name: "email", label: "Email", type: "email", required: true },
                { name: "phone", label: "Phone", type: "tel", required: true },
              ]}
            />
          </div>
          <ContactBlock
            title="Ready to Explore What a Property Can Become?"
            description="Whether you're buying, selling, or investing, Tamay Enterprises offers real estate services supported by real construction insight."
            hours="Open today 09:00 am – 05:00 pm"
          />
        </div>
      </section>
    </>
  );
}
