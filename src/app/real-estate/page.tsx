import type { Metadata } from "next";
import Image from "next/image";
import { HeroBanner } from "@/components/ui/HeroBanner";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/ui/ContactForm";
import { ContactBlock } from "@/components/ui/ContactBlock";
import { Button } from "@/components/ui/Button";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Real Estate Services in West Haven, CT",
  description:
    "Real estate services backed by construction expertise for buyers, sellers, and investors in West Haven, CT.",
};

const audiences = [
  {
    title: "Homebuyers",
    text: "We help homebuyers who may not find everything they want in today's market understand how a property can be improved. Instead of showing dozens of homes that don't quite fit, we guide clients toward opportunities where thoughtful renovation can turn the right purchase into the right home.",
  },
  {
    title: "Real Estate Investors",
    text: (
      <>
        For investors, understanding renovation potential is critical. We support investment-focused clients by
        evaluating properties through both a <strong>real estate and construction lens</strong>, helping identify
        opportunities where value can be added strategically and efficiently.
      </>
    ),
  },
  {
    title: "Property Managers & Portfolio Owners",
    text: (
      <>
        Property managers and portfolio owners benefit from working with a team that understands both{" "}
        <strong>asset acquisition and property improvement</strong>. Our approach supports smarter purchasing
        decisions, long-term planning, and coordinated execution across real estate and construction needs.
      </>
    ),
  },
];

const guidanceItems = [
  "Purchase residential or investment properties",
  "Sell properties with an understanding of value positioning",
  "Evaluate renovation potential before buying",
  "Align real estate decisions with future construction plans",
];

export default function RealEstatePage() {
  return (
    <>
      <HeroBanner
        image={IMAGES.realEstate.hero}
        title="Real Estate Services"
        height="medium"
      />

      <section className="py-14 max-w-4xl mx-auto px-4">
        <SectionHeading title="Real Estate Services in West Haven, CT" />
        <div className="space-y-4 text-gray-600 text-center leading-relaxed -mt-4">
          <p>
            Dream homes, functional spaces, and long-term value are rarely found exactly as-is — they are built.
            At Tamay Enterprises, our real estate services go beyond simply helping clients buy or sell property.
            We are a group of licensed contractors and real estate professionals who help clients identify what a
            property can become, not just what currently is.
          </p>
          <p>
            Based in West Haven, CT, we support homebuyers, sellers, real estate investors, and property managers
            by combining real estate guidance with construction insight. This approach allows our clients to see
            opportunity where others see limitations — whether that means purchasing a property at a lower price
            point and improving it, or understanding the true potential and costs before making a decision.
          </p>
        </div>

        <figure className="mt-10 relative aspect-[2/1] max-w-3xl mx-auto overflow-hidden rounded-sm">
          <Image
            src={IMAGES.realEstate.agent}
            alt="Real Estate Agent"
            fill
            className="object-cover"
            sizes="768px"
            unoptimized
          />
        </figure>
      </section>

      <section className="py-14 bg-gray-50 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeading title="Real Estate Services Backed by Construction Expertise" />
          <p className="text-gray-600 leading-relaxed -mt-4">
            Unlike traditional real estate agents who focus solely on listings, Tamay Enterprises approaches real
            estate with a builder&apos;s mindset. Our background in construction allows us to help clients evaluate
            properties based on layout potential, renovation feasibility, and long-term value — not just
            appearance.
          </p>
        </div>
      </section>

      <section className="py-14 max-w-4xl mx-auto px-4">
        <figure className="relative aspect-[2/1] max-w-3xl mx-auto overflow-hidden rounded-sm mb-10">
          <Image
            src={IMAGES.realEstate.longTermValue}
            alt=""
            fill
            className="object-cover"
            sizes="768px"
            unoptimized
          />
        </figure>
        <SectionHeading title="Beyond the Closing: We help building Long-Term Property Value" />
        <p className="text-gray-600 text-center leading-relaxed -mt-4">
          Real estate decisions don&apos;t end at closing — they shape what a property can become.
        </p>
      </section>

      <section className="py-14 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeading title="Who We Serve" />
          <div className="grid md:grid-cols-3 gap-8">
            {audiences.map((a) => (
              <div key={a.title} className="bg-white p-6 border-t-4 border-tamay-primary shadow-sm">
                <h3 className="font-heading text-xl text-tamay-primary font-semibold mb-3">{a.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 max-w-4xl mx-auto px-4">
        <SectionHeading title="Buying, Selling & Strategic Property Guidance" />
        <p className="text-gray-600 text-center mb-6 -mt-4">
          Tamay Enterprises provides real estate services for clients looking to:
        </p>
        <ul className="text-gray-700 space-y-2 max-w-xl mx-auto mb-8 list-disc pl-5">
          {guidanceItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="text-center">
          <Button href="#contact" variant="primary">
            Find out more
          </Button>
        </div>
      </section>

      <section className="py-14 bg-tamay-primary text-white px-4">
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeading
            light
            eyebrow="Serving West Haven & Nearby Connecticut Communities"
            title="Local Real Estate Services You Can Trust"
          />
          <p className="text-gray-200 leading-relaxed -mt-4">
            Based in West Haven, CT, Tamay Enterprises proudly serves clients throughout Orange, Milford, New
            Haven, Woodbridge, Bethany, Fairfield, Trumbull, and surrounding Connecticut communities. Our local
            presence and regional experience allow us to guide clients through market conditions with practical,
            real-world insight.
          </p>
        </div>
      </section>

      <section className="py-14 max-w-4xl mx-auto px-4 text-center">
        <SectionHeading
          title="A Different Way to Think About Real Estate"
          subtitle="Helping clients see beyond what a property is — and recognize what it can become."
        />
        <p className="text-gray-600 leading-relaxed -mt-4">
          Not every dream home is found — many are created. At Tamay Enterprises, we believe the right property
          combined with the right vision and execution can unlock opportunities others overlook. Our role is not
          just to facilitate transactions, but to help clients understand what is possible.
        </p>
      </section>

      <section id="contact" className="py-16 bg-gray-50">
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
            description="Whether you're buying, selling, or investing, Tamay Enterprises offers real estate services supported by real construction insight. Contact our team to discuss your goals and explore opportunities with a group that understands both property and potential."
            hours="Open today 09:00 am – 05:00 pm"
          />
        </div>
      </section>
    </>
  );
}
