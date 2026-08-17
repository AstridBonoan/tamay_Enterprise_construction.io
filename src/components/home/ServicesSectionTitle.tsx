import { SiteText } from "@/components/copy/SiteText";

export function ServicesSectionTitle() {
  return (
    <div
      id="our-services"
      className="flex flex-col items-center bg-gray-50 px-4 pt-6 sm:pt-8 lg:pt-10 pb-10 sm:pb-12 lg:pb-14"
    >
      <SiteText k="home.services.title" as="h2" className="font-heading text-2xl sm:text-3xl md:text-4xl text-tamay-primary font-semibold uppercase tracking-[0.08em] text-center">
        Our Services
      </SiteText>
      <hr className="section-divider mt-3 sm:mt-4" />
    </div>
  );
}
