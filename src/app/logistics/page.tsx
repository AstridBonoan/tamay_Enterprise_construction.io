import type { Metadata } from "next";
import Image from "next/image";
import { HeroBanner } from "@/components/ui/HeroBanner";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/ui/ContactForm";
import { ContactBlock } from "@/components/ui/ContactBlock";
import { Button } from "@/components/ui/Button";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Logistics & Delivery Services in West Haven, CT",
  description: "Professional local and regional logistics and delivery services in West Haven, CT.",
};

const deliveryServices = [
  "Local and regional delivery services",
  "Business logistics support",
  "Scheduled and coordinated transportation",
  "Time-sensitive deliveries",
  "Project-based logistics coordination",
];

const whyChoose = [
  {
    title: "Professional appearance",
    text: "Professional appearance and courteous drivers",
  },
  {
    title: "On-time, communication-first operations",
    text: "Same-day or next-day transport for urgent materials and equipment.",
  },
  {
    title: "Problem-solving mindset",
    text: "Problem-solving mindset for tight windows and tricky sites",
  },
];

const supportAudience = [
  "Local businesses requiring dependable delivery solutions",
  "Contractors and service providers coordinating materials or equipment",
  "Individuals needing organized transportation support",
];

function LogisticsPhoto({
  src,
  alt,
  className = "aspect-[2/1]",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <figure className={`relative ${className} max-w-5xl mx-auto overflow-hidden rounded-sm`}>
      <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 1024px" unoptimized />
    </figure>
  );
}

export default function LogisticsPage() {
  return (
    <>
      <HeroBanner
        image={IMAGES.logistics.hero}
        title="Logistics & Delivery Services"
        height="medium"
        imageZoom={0.92}
        imagePosition="55% 58%"
      />

      <section className="py-14 max-w-4xl mx-auto px-4">
        <SectionHeading title="Logistics & Delivery Services in West Haven, CT" />
        <div className="space-y-4 text-gray-600 text-center leading-relaxed -mt-4">
          <p className="text-sm font-semibold tracking-widest uppercase text-tamay-primary">About Us</p>
          <p>
            Reliable logistics is not just about moving items from one location to another — it&apos;s about
            coordination, timing, and accountability. Tamay Enterprises provides professional logistics and
            delivery services in West Haven, CT and nearby towns, supporting businesses and individuals with
            dependable local and regional transportation solutions. Our logistics team operates with structure,
            clear communication, and a focus on efficiency to ensure every delivery is handled with care.
          </p>
        </div>
        <div className="text-center mt-8">
          <Button href="#contact" variant="accent">
            Get a Fast Quote
          </Button>
        </div>
      </section>

      <section className="py-14 bg-gray-50 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <LogisticsPhoto
            src={IMAGES.logistics.warehouseFleet}
            alt="Tamay Enterprises delivery vans at a warehouse loading dock"
            className="aspect-[16/10] mb-10"
          />
          <SectionHeading title="Logistics Services Built on Reliability" />
          <div className="space-y-4 text-gray-600 leading-relaxed -mt-4 text-left md:text-center">
            <p>
              At Tamay Enterprises, our logistics services are designed to support real-world needs where timing
              and execution matter. Whether coordinating scheduled deliveries or managing time-sensitive
              transportation, our team focuses on organized planning, route efficiency, and clear expectations from
              pickup to final delivery.
            </p>
            <p>
              We approach logistics the same way we approach our other divisions — with professionalism,
              preparation, and responsibility.
            </p>
          </div>
          <Button href="#contact" variant="outline" className="mt-8">
            Contact us
          </Button>
        </div>
      </section>

      <section className="py-14 max-w-4xl mx-auto px-4">
        <SectionHeading title="Our Logistics & Delivery Services" />
        <p className="text-gray-600 text-center mb-4 -mt-4">
          Tamay Enterprises provides logistics and delivery services including:
        </p>
        <ul className="list-disc pl-5 text-gray-700 space-y-2 max-w-xl mx-auto mb-8">
          {deliveryServices.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <div className="bg-gray-50 rounded-sm p-6 max-w-xl mx-auto text-center">
          <h3 className="font-heading text-lg text-tamay-primary font-semibold mb-3">Request a Quote</h3>
          <p className="text-sm text-gray-600 leading-relaxed mb-6">
            Each service is managed with attention to detail and operational consistency to support smooth
            execution and dependable outcomes.
          </p>
          <Button href="#contact" variant="primary">
            Request a Quote
          </Button>
        </div>
      </section>

      <section className="py-14 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeading title="Why Choose Tamay Logistics" />
          <div className="grid md:grid-cols-3 gap-8">
            {whyChoose.map((w) => (
              <div key={w.title} className="bg-white p-6 border-t-4 border-tamay-primary shadow-sm text-center">
                <h3 className="font-heading text-tamay-primary font-semibold mb-3">{w.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 max-w-4xl mx-auto px-4">
        <SectionHeading title="Supporting Businesses & Individuals" />
        <p className="text-gray-600 text-center mb-4 -mt-4">Our logistics services support:</p>
        <ul className="list-disc pl-5 text-gray-700 space-y-2 max-w-xl mx-auto mb-6">
          {supportAudience.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="text-gray-600 text-center leading-relaxed">
          By combining planning with execution, we help reduce delays, miscommunication, and operational friction.
        </p>
      </section>

      <section className="px-4 pb-10 max-w-5xl mx-auto">
        <LogisticsPhoto src={IMAGES.logistics.routeMap} alt="Regional logistics route map" />
      </section>

      <section className="py-14 bg-tamay-primary text-white px-4">
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeading light title="Serving West Haven & Nearby Communities" subtitle="Areas we serve:" />
          <p className="text-gray-200 leading-relaxed -mt-4">
            Based in West Haven, CT, Tamay Enterprises proudly provides logistics and delivery services throughout
            Orange, Milford, New Haven, Woodbridge, Bethany, Fairfield, Trumbull, and surrounding areas. Our local
            presence allows us to respond efficiently while maintaining strong familiarity with regional routes and
            service expectations.
          </p>
        </div>
      </section>

      <section className="py-14 max-w-4xl mx-auto px-4 text-center">
        <SectionHeading title="A Structured Approach to Logistics" />
        <p className="text-gray-600 leading-relaxed -mt-4">
          Logistics works best when systems are in place. Our team prioritizes clear scheduling, defined
          responsibilities, and consistent communication to ensure each delivery is completed as planned. This
          structured approach allows us to support both recurring logistics needs and one-time transportation
          requests with the same level of care and professionalism.
        </p>
      </section>

      <section id="contact" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12">
          <div>
            <SectionHeading align="left" eyebrow="Contact us" title="What Can We Help You Move Today?" />
            <ContactForm
              fields={[
                { name: "name", label: "Name" },
                { name: "email", label: "Email", type: "email", required: true },
              ]}
            />
          </div>
          <ContactBlock
            title="Need Reliable Logistics Support?"
            description="Contact Tamay Enterprises to discuss your logistics or delivery needs. Our team is ready to coordinate dependable transportation services designed to support your schedule and operational goals."
            hours="Open today 08:00 am – 05:00 pm"
          />
        </div>
      </section>
    </>
  );
}
