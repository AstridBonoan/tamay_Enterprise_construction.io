import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/ui/ContactForm";
import { ContactBlock } from "@/components/ui/ContactBlock";
import { HOME_CONTACT_SERVICE_CATEGORIES, SITE } from "@/lib/site";

export function SiteContactSection() {
  return (
    <section id="contact" className="py-16">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12">
        <div>
          <SectionHeading align="left" eyebrow="CONTACT US" title="Explore our Services" />
          <ContactForm
            formName="Tamay - Homepage Contact"
            fields={[
              {
                name: "category",
                label: "Category of Service",
                type: "select",
                required: true,
                options: [...HOME_CONTACT_SERVICE_CATEGORIES],
              },
              { name: "name", label: "Name", required: true },
              { name: "email", label: "Email", type: "email", required: true },
              { name: "phone", label: "Phone", type: "tel", required: true },
            ]}
            submitLabel="Send"
          />
          <p className="text-xs text-gray-500 mt-4 max-w-md">
            By submitting this form, you agree to receive text messages and calls from{" "}
            <strong>{SITE.legalName}</strong> related to your inquiry. Reply <strong>STOP</strong> to cancel.
            Reply <strong>HELP</strong> for help.
          </p>
        </div>
        <ContactBlock description="Whether you're planning a construction project, need real estate support, or require dependable logistics services, Tamay Enterprises is ready to help." />
      </div>
    </section>
  );
}
