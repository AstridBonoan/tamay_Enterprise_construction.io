import type { Metadata } from "next";
import { HeroBanner } from "@/components/ui/HeroBanner";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SiteContactSection } from "@/components/ui/SiteContactSection";
import { Button } from "@/components/ui/Button";
import { VideoTestimonialCarousel } from "@/components/home/VideoTestimonialCarousel";
import { TamayVideoGallery } from "@/components/reviews/TamayVideoGallery";
import { SitePhoto } from "@/components/images/SitePhoto";
import { SiteText } from "@/components/copy/SiteText";
import {
  ADA_RESTROOM_PROJECT_VIDEOS,
  CONSTRUCTION_PROJECT_VIDEOS,
} from "@/lib/constructionVideos";
import { REVIEW_VIDEO_PROJECTS } from "@/lib/reviewVideos";
import { ServiceAppointmentSection } from "@/components/appointments/ServiceAppointmentSection";
import { SITE } from "@/lib/site";
import { getResolvedSiteMedia } from "@/lib/siteImages";
import { buildSocialMetadata } from "@/lib/socialMetadata";

export const metadata: Metadata = buildSocialMetadata("construction");

function coreServicesFor() {
  return [
    {
      title: "Full Home Renovations & Remodeling",
      text: "Tamay Enterprises provides full home renovation and remodeling services for homeowners, real estate investors, and property managers in West Haven, CT and nearby Connecticut communities. Our renovation projects focus on improving layout, comfort, and long-term functionality while maintaining high construction standards. From interior updates to whole-home transformations, each project is managed with structured planning, professional coordination, and quality-driven execution.",
      slot: "construction.renovation",
      alt: "Construction team reviewing renovation plans at a job site",
    },
    {
      title: "Home Additions & Expansions",
      text: "We design and build home additions and expansions for homeowners, real estate investors, and property managers seeking to increase usable space and property value. Our services include room additions, bump-outs, and layout expansions for properties in West Haven and surrounding Connecticut areas, all delivered with attention to structural integrity, visual continuity, and long-term durability.",
      slot: "construction.addition",
      alt: "Two-story home addition under construction",
    },
    {
      title: "Kitchen & Bathroom Remodeling",
      text: "Tamay Enterprises specializes in kitchen and bathroom remodeling services for homeowners, real estate investors, and property managers throughout West Haven, CT and nearby communities. Our remodeling work balances aesthetics, durability, and everyday usability, delivering kitchens and bathrooms designed to perform reliably in both owner-occupied and managed properties.",
      slot: "construction.kitchenBath",
      alt: "Modern kitchen and bathroom remodeling",
    },
  ] as const;
}

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

export default async function ConstructionPage() {
  const { images } = await getResolvedSiteMedia();
  const coreServices = coreServicesFor();
  return (
    <>
      <HeroBanner
        image={images.heroConstruction}
        slotKey="heroConstruction"
        copyKey="construction.hero"
        title="Construction & Home Renovation Services"
        subtitle="Your dream space starts here."
        height="medium"
        imagePosition="center center"
        imageZoom={1.05}
      />

      <div className="bg-tamay-accent text-white text-center py-3 text-sm font-semibold tracking-wide">
        <SiteText k="construction.warranty.banner">7-Year Warranty + Finance on New Renovations</SiteText>
      </div>

      <section className="py-14 max-w-4xl mx-auto px-4">
        <SectionHeading copyKey="construction.intro" title="Construction & Home Renovation Services in West Haven, CT" />
        <div className="space-y-4 text-gray-600 text-center leading-relaxed">
          <SiteText k="construction.intro.body1" as="p" multiline>
            With over ten years of proven experience, Tamay Enterprises is a fully insured construction company delivering complete residential and commercial construction solutions through its Tamay Construction Department. Based in West Haven, CT, our core services include full home renovations, home additions, kitchen and bathroom remodeling, and quality-driven property improvements. We offer a streamlined design, supply, and build approach using premium materials and expert craftsmanship, supported by a trusted team of licensed professionals committed to safety, efficiency, and long-term performance.
          </SiteText>
          <SiteText k="construction.intro.body2" as="p" multiline>
            In addition to our renovation and construction work, we also offer preventive home services designed to help clients protect and maintain their investment over time.
          </SiteText>
          <Button href="/home-preventive-services" variant="outline" className="mt-2">
            <SiteText k="construction.intro.more">more information →</SiteText>
          </Button>
        </div>
      </section>

      <section className="py-14 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeading copyKey="construction.core" title="OUR CORE SERVICES" />
          <div className="grid md:grid-cols-3 gap-8">
            {coreServices.map((s, index) => (
              <article key={s.slot} className="bg-white shadow-md overflow-hidden">
                <div className="relative h-52 sm:h-56">
                  <SitePhoto slot={s.slot} alt={s.alt} sizes="400px" />
                </div>
                <div className="p-6">
                  <SiteText k={`construction.core.item${index + 1}.title`} as="h3" className="font-heading text-lg text-tamay-primary font-semibold mb-3">
                    {s.title}
                  </SiteText>
                  <SiteText k={`construction.core.item${index + 1}.text`} as="p" className="text-sm text-gray-600 leading-relaxed" multiline>
                    {s.text}
                  </SiteText>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 max-w-3xl mx-auto px-4 text-center">
        <SectionHeading
          copyKey="construction.warranty"
          title="7-Year Warranty & Complimentary Tune-Ups For New Renovations"
          subtitle="Renovate Once. Enjoy It Longer."
        />
        <ol className="text-left text-gray-700 space-y-2 max-w-md mx-auto">
          <SiteText k="construction.warranty.item1" as="li">1. 7-year workmanship warranty on eligible renovations</SiteText>
          <SiteText k="construction.warranty.item2" as="li">2. Bathroom rejuvenation tune-ups (only on full/ new renovations)</SiteText>
          <SiteText k="construction.warranty.item3" as="li">3. Kitchen tune-ups (only on full/new renovations)</SiteText>
          <SiteText k="construction.warranty.item4" as="li">4. Transferable (1 year if unused)</SiteText>
        </ol>
      </section>

      <section className="py-14 bg-tamay-primary text-white px-4">
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeading
            copyKey="construction.license"
            light
            eyebrow="Licensed & Insured"
            title={`Connecticut License ${SITE.license}`}
          />
          <SiteText k="construction.license.body" as="p" className="text-gray-200 leading-relaxed -mt-4" multiline>
            {`Tamay Enterprises operates as a licensed Connecticut contractor (License No. ${SITE.license}), meeting state requirements for professional construction and renovation services. The company originally operated as a construction-only business, building its foundation through hands-on renovation and remodeling work. That experience continues to guide our standards today, with a strong focus on craftsmanship, accountability, and long-term client relationships.`}
          </SiteText>
        </div>
      </section>

      <section className="py-14 max-w-6xl mx-auto px-4">
        <SectionHeading copyKey="construction.residential" title="Residential Projects" />
        <TamayVideoGallery
          projects={CONSTRUCTION_PROJECT_VIDEOS}
          showTitle={false}
          instanceId="construction-residential"
        />

        <div className="mt-16">
          <SectionHeading copyKey="construction.commercial" title="Commercial Projects" />
          <TamayVideoGallery
            projects={ADA_RESTROOM_PROJECT_VIDEOS}
            showTitle={false}
            instanceId="construction-ada"
          />
        </div>

        <div className="text-center mt-8">
          <Button href="/gallery" variant="primary">
            <SiteText k="construction.projects.more">More projects</SiteText>
          </Button>
        </div>
      </section>

      <section className="py-14 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <SectionHeading copyKey="construction.process" title="Our Construction Process — From Vision to Long-Term Support" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((p) => (
              <div key={p.step} className="bg-white p-6 border-t-4 border-tamay-accent shadow-sm">
                <span className="text-tamay-accent font-bold text-2xl">{p.step}</span>
                <SiteText k={`construction.process.step${p.step}.title`} as="h4" className="font-heading text-tamay-primary font-semibold mt-2 mb-2">
                  {p.title}
                </SiteText>
                <SiteText k={`construction.process.step${p.step}.text`} as="p" className="text-sm text-gray-600 leading-relaxed" multiline>
                  {p.text}
                </SiteText>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceAppointmentSection serviceId="construction" />

      <section className="py-14 max-w-6xl mx-auto px-4">
        <SectionHeading copyKey="construction.testimonials" title="Client Testimonials" />
        <VideoTestimonialCarousel
          projects={REVIEW_VIDEO_PROJECTS}
          showHeading={false}
          theme="light"
          instanceId="construction-testimonials"
        />
        <div className="text-center mt-8">
          <Button href="/reviews" variant="primary">
            <SiteText k="construction.testimonials.more">See More Reviews</SiteText>
          </Button>
        </div>
      </section>

      <section className="py-14 px-4 max-w-4xl mx-auto text-center">
        <SectionHeading
          copyKey="construction.area"
          eyebrow="Serving West Haven & Nearby Connecticut Communities"
          title="Local Renovation Services You Can Trust"
        />
        <SiteText k="construction.area.body" as="p" className="text-gray-600 leading-relaxed -mt-4" multiline>
          Based in West Haven, Connecticut, Tamay Enterprises proudly serves homeowners, investors, and real estate professionals throughout nearby communities, including New Haven, Milford, Orange, Hamden, East Haven, Branford, Shelton, and Stratford. Our local focus allows us to deliver responsive service, clear communication, and renovation solutions tailored to the needs of homes throughout the greater West Haven and New Haven County area.
        </SiteText>
      </section>

      <SiteContactSection />
    </>
  );
}
