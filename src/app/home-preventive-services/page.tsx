import type { Metadata } from "next";
import Image from "next/image";
import { HeroBanner } from "@/components/ui/HeroBanner";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/ui/ContactForm";
import { ContactBlock } from "@/components/ui/ContactBlock";
import { Button } from "@/components/ui/Button";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Preventive Home Services in West Haven, CT",
  description:
    "Seasonal and year-round preventive home maintenance services in West Haven, CT. Kitchen tune-ups, HVAC prep, plumbing care, and more.",
};

const benefits = [
  "Extend equipment lifespan",
  "Prevent costly surprises",
  "Improve energy efficiency",
  "Improve communication clarity with insurance or warranty providers",
  "Reduce seasonal system failures",
  "Support responsible home maintenance",
];

type PreventiveService = {
  title: string;
  items: string[];
  notes?: string[];
  areasCovered?: { heading: string; lines: string[] };
  moreInfo?: boolean;
};

const preventiveServices: PreventiveService[] = [
  {
    title: "Kitchen Tune-Up Services",
    items: [
      "Cabinet hardware tightening and adjustments",
      "Door and drawer alignment",
      "Minor caulking and seal refresh",
      "Functional review of sinks, fixtures, and connections",
      "General wear awareness and maintenance recommendations.",
    ],
    notes: [
      "Observe gas shut-off accessibility",
      "Identify early signs of wear around high-use areas",
      "Provide care guidance to extend finishes and fixtures",
    ],
  },
  {
    title: "Bathroom Rejuvenation Services",
    items: [
      "Caulking and grout refresh",
      "Fixture tightening and leak awareness",
      "Ventilation and moisture check",
      "Check exhaust fan noise and airflow awareness",
      "Safety-focused adjustments (loose fixtures, handles, etc.)",
      "Preventive recommendations to reduce moisture-related issues",
      "Provide guidance on reducing long-term moisture damage",
    ],
  },
  {
    title: "Seasonal HVAC Preparation",
    items: [
      "Pre-winter heating readiness",
      "Pre-summer cooling preparation",
      "Filter replacement",
      "Safety and efficiency checks",
    ],
    notes: [
      "Verify thermostat operation and settings",
      "Observe unusual noises or vibrations",
      "Review airflow consistency in main living areas",
      "Provide homeowner guidance for seasonal system use",
      "Share early indicators that may require future attention",
    ],
  },
  {
    title: "Plumbing Preventive Care",
    items: [
      "Leak awareness",
      "Water pressure evaluation",
      "Drain and valve checks",
      "Water heater condition overview",
    ],
    notes: [
      "Observe under-sink cabinet areas for moisture signs",
      "Review toilet stability and visible supply connections",
      "Identify slow-drain indicators (without invasive testing)",
      "Observe exterior hose bibs and exposed lines",
      "Provide recommendations to reduce freeze or clog risks",
      "Share water-use best practices based on season",
    ],
    areasCovered: {
      heading: "Plumbing – Preventive Care (Areas Covered)",
      lines: [
        "Kitchen, Bathroom, Laundry Area, Refrigerator, Dishwasher",
        "General & Exterior Plumbing (Accessible Areas)",
      ],
    },
  },
  {
    title: "Electrical Safety Review",
    items: [
      "Panel and breaker overview",
      "GFCI and outlet functionality",
      "Load awareness",
      "Basic safety recommendations",
    ],
    notes: [
      "Observe panel labeling clarity and accessibility",
      "Check for loose or warm-to-touch outlet covers",
      "Review extension cord and power strip usage",
      "Identify visible signs of electrical wear or aging",
      "Provide load-awareness guidance for seasonal usage",
      "Share safety reminders during high-demand seasons",
    ],
  },
  {
    title: "Exterior and Roof Awareness",
    items: [
      "General roof condition observations",
      "Seasonal gutter cleaning",
      "Downspout drainage checks",
      "Door and window seal review",
    ],
    notes: [
      "Review gutter attachment stability",
      "Observe flashing areas around vents and chimneys",
      "Check visible fascia and soffit condition",
      "Observe grading near foundation areas",
      "Identify debris accumulation points",
    ],
  },
  {
    title: "Appliance Replacement & Installation Support",
    items: [
      "Replacement and installation of household appliances",
      "Laundry appliance installation (washers and dryers)",
      "Refrigerator installation and replacement",
      "Dishwasher installation",
      "Garbage disposal replacement and installation",
      "Range / stove installation and replacement (gas or electric)",
      "Microwave installation and replacement (countertop or over-the-range)",
      "Basic connection review (water, drain, electrical, gas – when applicable)",
      "Initial operational check after installation",
      "Preventive recommendations for proper use and longevity",
    ],
    moreInfo: true,
  },
];

const whoWeSupport = [
  {
    title: "Homeowners",
    text: "Seasonal readiness and preventive care.",
  },
  {
    title: "Real Estate Professionals",
    text: "Move-in and move-out property readiness.",
  },
  {
    title: "Warranty Providers",
    text: "Preventive evaluations that support long-term system performance.",
  },
];

function PreventivePhoto({
  src,
  alt,
  className = "aspect-[16/10]",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <figure className={`relative ${className} overflow-hidden rounded-sm`}>
      <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 600px" unoptimized />
    </figure>
  );
}

function ServiceList({ items, notes }: { items: string[]; notes?: string[] }) {
  return (
    <div className="space-y-8">
      <ul className="text-base text-gray-700 space-y-3 leading-relaxed">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="text-tamay-accent font-bold shrink-0">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {notes && notes.length > 0 && (
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-tamay-primary mb-4">
            Additional observations
          </p>
          <ul className="text-sm text-gray-600 space-y-2.5 leading-relaxed pl-1">
            {notes.map((note) => (
              <li key={note} className="flex gap-3">
                <span className="text-gray-400 shrink-0">*</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function HomePreventiveServicesPage() {
  return (
    <>
      <HeroBanner
        image={IMAGES.preventiveServices.hero}
        tagline="Seasonal & year-round services"
        title="Home Preventive Services Program"
        subtitle="Designed to keep every home safe, efficient, and well-maintained."
        cta={{ label: "Find out more", href: "#about" }}
        height="medium"
      />

      <section id="about" className="py-14 max-w-6xl mx-auto px-4">
        <SectionHeading title="About This Program" />
        <div className="grid md:grid-cols-2 gap-10 items-center -mt-2">
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              Tamay Enterprises provides preventive home services that help homeowners stay prepared throughout
              every season. Our focus is on reducing unexpected issues, identifying early concerns, and supporting
              the long-term health of essential home systems.
            </p>
            <p>
              This program is ideal for homeowners, real estate professionals, and organizations seeking reliable,
              preventive maintenance support.
            </p>
          </div>
          <PreventivePhoto
            src={IMAGES.preventiveServices.aboutConsultation}
            alt="Tamay technician reviewing preventive maintenance with a homeowner in the kitchen"
            className="aspect-[4/3]"
          />
        </div>
      </section>

      <section id="benefits" className="py-14 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeading title="Benefits of Preventive Home Services" />
          <ol className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto -mt-2">
            {benefits.map((b, i) => (
              <li key={b} className="flex gap-3 text-gray-700 text-sm leading-relaxed">
                <span className="font-bold text-tamay-primary shrink-0">{i + 1}.</span>
                {b}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 bg-gray-50 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeading title="Our Preventive Services" />
          <p className="text-gray-600 text-center leading-relaxed mb-12 -mt-2 max-w-3xl mx-auto">
            Each service is delivered with clear communication, careful observation, and practical guidance for
            long-term home care.
          </p>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-10 items-start">
            {preventiveServices.map((service) => (
              <article
                key={service.title}
                className="bg-white p-6 md:p-8 shadow-sm border border-gray-100 border-t-4 border-t-tamay-accent h-full"
              >
                <h3 className="font-heading text-lg md:text-xl text-tamay-primary font-semibold mb-6 pb-4 border-b border-gray-100">
                  {service.title}
                </h3>
                <ServiceList items={service.items} notes={service.notes} />
                {service.areasCovered && (
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <p className="text-sm font-semibold tracking-wide uppercase text-tamay-primary mb-3">
                      {service.areasCovered.heading}
                    </p>
                    {service.areasCovered.lines.map((line) => (
                      <p key={line} className="text-base text-gray-600 leading-relaxed">
                        {line}
                      </p>
                    ))}
                  </div>
                )}
                {service.moreInfo && (
                  <Button href="#contact" variant="outline" className="mt-8">
                    More info
                  </Button>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-tamay-primary text-white px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <SectionHeading light title="Additional Homeowner Support" />
            <div className="space-y-4 text-gray-200 leading-relaxed -mt-4">
              <h3 className="font-heading text-lg font-semibold text-white">Technical Written Summary</h3>
              <p>
                If, during our preventive services, we observe a condition that may require attention—such as roof
                wear, plumbing concerns, or early equipment deterioration—we notify the homeowner and provide a{" "}
                <strong className="text-white">technical written summary</strong> describing what was found.
              </p>
              <p>
                This summary is meant to help the homeowner communicate clearly with their insurance or warranty
                provider. We do not call or contact providers on behalf of the homeowner. Instead, we offer the
                correct terminology, explanation, and context so the homeowner can send an accurate and professional
                message on their own.
              </p>
              <p>
                Our goal is simply to help the homeowner express why timely attention is important and how delaying
                repairs could increase future costs or risks.
              </p>
            </div>
          </div>
          <PreventivePhoto
            src={IMAGES.preventiveServices.homeownerSupport}
            alt="Professional reviewing a technical summary document with a client"
            className="aspect-[4/3]"
          />
        </div>
      </section>

      <section className="py-14 max-w-6xl mx-auto px-4">
        <SectionHeading title="Who We Support" />
        <div className="grid md:grid-cols-3 gap-8 -mt-2">
          {whoWeSupport.map((group) => (
            <div key={group.title} className="bg-gray-50 p-6 text-center border-t-4 border-tamay-primary">
              <h3 className="font-heading text-tamay-primary font-semibold text-lg mb-3">{group.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{group.text}</p>
            </div>
          ))}
        </div>
        <p className="font-heading text-2xl text-tamay-primary font-semibold text-center mt-12">
          Join the Home Preventive Services Program today.
        </p>
      </section>

      <section id="contact" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeading title="Contact Us" />
          <div className="grid md:grid-cols-2 gap-12 mt-8">
            <div>
              <h3 className="font-heading text-xl text-tamay-primary font-semibold mb-6">
                Request Membership Information
              </h3>
              <ContactForm
                fields={[
                  {
                    name: "services",
                    label: "Services of Interested",
                    type: "select",
                    required: true,
                    options: preventiveServices.map((s) => s.title),
                  },
                  { name: "name", label: "Name" },
                  { name: "email", label: "Email", type: "email", required: true },
                  { name: "phone", label: "Phone", type: "tel" },
                ]}
                submitLabel="Send"
              />
            </div>
            <ContactBlock title="Explore Memberships" showAddress={false} />
          </div>
        </div>
      </section>
    </>
  );
}
