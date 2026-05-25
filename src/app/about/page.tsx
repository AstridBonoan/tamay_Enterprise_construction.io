import type { Metadata } from "next";
import { HeroVideoBanner } from "@/components/ui/HeroVideoBanner";
import { AboutUsSection } from "@/components/about/AboutUsSection";
import { ContactBlock } from "@/components/ui/ContactBlock";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Tamay Enterprises — construction, real estate, and logistics services in West Haven, CT.",
};

export default function AboutPage() {
  return (
    <>
      <HeroVideoBanner minimal />
      <AboutUsSection />
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <ContactBlock
            title="Ready to Work With Us?"
            description="Contact Tamay Enterprises to discuss construction, real estate, or logistics needs across West Haven and nearby Connecticut communities."
          />
        </div>
      </section>
    </>
  );
}
