import { ContactBlock } from "@/components/ui/ContactBlock";
import { ContactForm } from "@/components/ui/ContactForm";
import { HeroBanner } from "@/components/ui/HeroBanner";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SITE } from "@/lib/site";

type ContactField = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "select" | "hidden";
  required?: boolean;
  options?: string[];
  optionLabels?: string[];
};

type ThemedContactSectionProps = {
  bannerImage: string;
  bannerTitle: string;
  bannerSubtitle: string;
  bannerCtaLabel: string;
  formName: string;
  formEyebrow?: string;
  formTitle: string;
  fields: ContactField[];
  submitLabel?: string;
  contactTitle?: string;
  contactDescription: string;
  showSmsDisclaimer?: boolean;
};

/** Page-specific contact block: hero-style banner plus form and contact details. */
export function ThemedContactSection({
  bannerImage,
  bannerTitle,
  bannerSubtitle,
  bannerCtaLabel,
  formName,
  formEyebrow = "Contact Us",
  formTitle,
  fields,
  submitLabel = "Send",
  contactTitle,
  contactDescription,
  showSmsDisclaimer = false,
}: ThemedContactSectionProps) {
  return (
    <section id="contact">
      <HeroBanner
        image={bannerImage}
        title={bannerTitle}
        subtitle={bannerSubtitle}
        cta={{ label: bannerCtaLabel, href: "#contact-form" }}
        height="medium"
      />

      <div id="contact-form" className="py-16 bg-gray-50 scroll-mt-4">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12">
          <div>
            <SectionHeading align="left" eyebrow={formEyebrow} title={formTitle} />
            <ContactForm formName={formName} fields={fields} submitLabel={submitLabel} />
            {showSmsDisclaimer && (
              <p className="text-xs text-gray-500 mt-4 max-w-md">
                By submitting this form, you agree to receive text messages and calls from{" "}
                <strong>{SITE.legalName}</strong> related to your inquiry. Reply <strong>STOP</strong> to cancel.
                Reply <strong>HELP</strong> for help.
              </p>
            )}
          </div>
          <ContactBlock title={contactTitle} description={contactDescription} />
        </div>
      </div>
    </section>
  );
}
