import type { Metadata } from "next";
import Image from "next/image";
import { HeroBanner } from "@/components/ui/HeroBanner";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/ui/ContactForm";
import { ContactBlock } from "@/components/ui/ContactBlock";
import { Button } from "@/components/ui/Button";
import { TamayVideoGallery } from "@/components/reviews/TamayVideoGallery";
import { IMAGES } from "@/lib/images";
import {
  ADA_RESTROOM_PROJECT_VIDEOS,
  CONSTRUCTION_CLIENT_TESTIMONIAL_VIDEOS,
  CONSTRUCTION_PROJECT_VIDEOS,
  MASONRY_PROJECT_VIDEOS,
} from "@/lib/constructionVideos";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "General Contractor in West Haven, CT",
  description:
    "Tamay Enterprises delivers construction and home renovation services in West Haven, CT including full renovations, additions, and kitchen & bathroom remodeling.",
};

const coreServices = [
  {
    title: "Full Home Renovations & Remodeling",
    text: "Tamay Enterprises provides full home renovation and remodeling services for homeowners, real estate investors, and property managers in West Haven, CT and nearby Connecticut communities. Our renovation projects focus on improving layout, comfort, and long-term functionality while maintaining high construction standards. From interior updates to whole-home transformations, each project is managed with structured planning, professional coordination, and quality-driven execution.",
    img: IMAGES.construction.renovation,
    alt: "Construction team reviewing renovation plans at a job site",
  },
  {
    title: "Home Additions & Expansions",
    text: "We design and build home additions and expansions for homeowners, real estate investors, and property managers seeking to increase usable space and property value. Our services include room additions, bump-outs, and layout expansions for properties in West Haven and surrounding Connecticut areas, all delivered with attention to structural integrity, visual continuity, and long-term durability.",
    img: IMAGES.construction.addition,
    alt: "Two-story home addition under construction",
  },
  {
    title: "Kitchen & Bathroom Remodeling",
    text: "Tamay Enterprises specializes in kitchen and bathroom remodeling services for homeowners, real estate investors, and property managers throughout West Haven, CT and nearby communities. Our remodeling work balances aesthetics, durability, and everyday usability, delivering kitchens and bathrooms designed to perform reliably in both owner-occupied and managed properties.",
    img: IMAGES.construction.kitchenBath,
    alt: "Modern kitchen and bathroom remodeling",
    caption: "White shaker cabinets & light quartz countertops",
  },
] as const;

const processSteps = [
  {
    step: "1",
    title: "Consultation & Vision",
    text: "Every project begins with a detailed consultation where we take the time to understand your goals, budget, and timeline. This step allows us to align expectations early and ensure your vision is clearly defined before moving forward.",
  },
  {
    step: "2",
    title: "Design & Scope Development",
    text: "Our team collaborates with designers and specialists to create a clear project scope, material selections, and layout direction. This phase establishes a well-defined plan so there are no surprises during construction.",
  },
  {
    step: "3",
    title: "Proposal & Scheduling",
    text: "You receive a transparent proposal outlining the scope of work, pricing, and projected timeline. Once approved, we coordinate scheduling to ensure proper preparation and smooth project execution.",
  },
  {
    step: "4",
    title: "Build Phase",
    text: "During construction, we maintain an organized job site with consistent quality control and clear communication. Clients receive updates as work progresses, ensuring confidence and visibility throughout the build phase.",
  },
  {
    step: "5",
    title: "Final Walkthrough & Completion",
    text: "Upon completion, we conduct a final walkthrough to review all details, address punch-list items, and ensure the space is clean and ready for use. The project is delivered with care, precision, and attention to finish quality.",
  },
  {
    step: "6",
    title: "Warranty & Ongoing Support",
    text: "Our relationship doesn’t end at completion. Qualifying projects are backed by warranty support, and our team remains available to stand behind the work and support long-term performance.",
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
        <SectionHeading title="Construction & Home Renovation Services in West Haven, CT" />
        <div className="space-y-4 text-gray-600 text-center leading-relaxed">
          <p>
            With over ten years of proven experience, Tamay Enterprises is a fully insured construction
            company delivering complete residential and commercial construction solutions through its Tamay
            Construction Department. Based in West Haven, CT, our core services include full home
            renovations, home additions, kitchen and bathroom remodeling, and quality-driven property
            improvements. We offer a streamlined design, supply, and build approach using premium materials
            and expert craftsmanship, supported by a trusted team of licensed professionals committed to
            safety, efficiency, and long-term performance.
          </p>
          <p>
            In addition to our renovation and construction work, we also offer preventive home services
            designed to help clients protect and maintain their investment over time.
          </p>
          <Button href="/home-preventive-services" variant="outline" className="mt-2">
            more information →
          </Button>
        </div>
      </section>

      <section className="py-14 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeading title="OUR CORE SERVICES" />
          <div className="grid md:grid-cols-3 gap-8">
            {coreServices.map((s) => (
              <article key={s.title} className="bg-white shadow-md overflow-hidden">
                <div className="relative h-52 sm:h-56">
                  <Image
                    src={s.img}
                    alt={s.alt}
                    fill
                    className="object-cover"
                    sizes="400px"
                    unoptimized
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-lg text-tamay-primary font-semibold mb-3">{s.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{s.text}</p>
                  {"caption" in s && s.caption ? (
                    <p className="mt-4 text-sm font-semibold text-tamay-primary">{s.caption}</p>
                  ) : null}
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
          <li>2. Bathroom rejuvenation tune-ups (only on full/ new renovations)</li>
          <li>3. Kitchen tune-ups (only on full/new renovations)</li>
          <li>4. Transferable (1 year if unused)</li>
        </ol>
        <Button href={SITE.financingUrl} variant="accent" external>
          Check Eligibility
        </Button>
      </section>

      <section className="py-14 bg-tamay-primary text-white px-4">
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeading
            light
            eyebrow="Licensed & Established"
            title={`Connecticut License ${SITE.license}`}
          />
          <p className="text-gray-200 leading-relaxed -mt-4">
            Tamay Enterprises operates as a licensed Connecticut contractor (License No. {SITE.license}),
            meeting state requirements for professional construction and renovation services. The company
            originally operated as a construction-only business, building its foundation through hands-on
            renovation and remodeling work. That experience continues to guide our standards today, with a
            strong focus on craftsmanship, accountability, and long-term client relationships.
          </p>
        </div>
      </section>

      <section className="py-14 max-w-6xl mx-auto px-4">
        <SectionHeading title="Residential & Commercial Projects" />
        <TamayVideoGallery
          projects={CONSTRUCTION_PROJECT_VIDEOS}
          showTitle={false}
          instanceId="construction-residential"
        />

        <div className="mt-16">
          <SectionHeading title="Masonry work" />
          <TamayVideoGallery
            projects={MASONRY_PROJECT_VIDEOS}
            showTitle={false}
            instanceId="construction-masonry"
          />
        </div>

        <div className="mt-16">
          <SectionHeading title="ADA-COMPLIANT COMMERCIAL RESTROOM BUILD-OUT" />
          <TamayVideoGallery
            projects={ADA_RESTROOM_PROJECT_VIDEOS}
            showTitle={false}
            instanceId="construction-ada"
          />
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
                <p className="text-sm text-gray-600 leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 max-w-6xl mx-auto px-4">
        <SectionHeading title="Client Testimonials" />
        <p className="text-gray-600 leading-relaxed mb-8 -mt-4 text-center max-w-4xl mx-auto">
          This testimonial reflects the experience our clients can expect when working with Tamay Enterprise
          from clear communication and organized project execution to quality results that stand the test of
          time. While this video highlights one completed project, we invite you to explore our additional
          testimonial videos to hear directly from other homeowners, investors, and property managers who
          have trusted our team for their construction and renovation needs.
        </p>
        <TamayVideoGallery
          projects={CONSTRUCTION_CLIENT_TESTIMONIAL_VIDEOS}
          showTitle={false}
          instanceId="construction-testimonial"
        />
        <div className="text-center mt-8">
          <Button href="/reviews" variant="primary">
            More reviews
          </Button>
        </div>
      </section>

      <section className="py-14 px-4 max-w-4xl mx-auto text-center">
        <SectionHeading
          eyebrow="Serving West Haven & Nearby Connecticut Communities"
          title="Local Renovation Services You Can Trust"
        />
        <p className="text-gray-600 leading-relaxed -mt-4">
          Based in West Haven, Connecticut, Tamay Enterprises proudly serves homeowners, investors, and real
          estate professionals throughout nearby communities, including New Haven, Milford, Orange, Hamden,
          East Haven, Branford, Shelton, and Stratford. Our local focus allows us to deliver responsive
          service, clear communication, and renovation solutions tailored to the needs of homes throughout
          the greater West Haven and New Haven County area.
        </p>
      </section>

      <section id="contact" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12">
          <div>
            <SectionHeading align="left" eyebrow="Contact Us" title="Start Your Project the Right Way" />
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
