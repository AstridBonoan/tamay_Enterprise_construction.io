import { SITE } from "@/lib/site";
import { Button } from "./Button";

type ContactBlockProps = {
  title?: string;
  description?: string;
  showAddress?: boolean;
  hours?: string;
};

export function ContactBlock({
  title = "Ready to Get Started?",
  description,
  showAddress = true,
  hours,
}: ContactBlockProps) {
  return (
    <div className="bg-tamay-primary text-white p-8 md:p-12">
      <h3 className="font-heading text-2xl font-semibold mb-4">{title}</h3>
      {description && <p className="text-gray-200 mb-6 leading-relaxed">{description}</p>}
      <div className="space-y-2 text-sm mb-6">
        <p className="font-heading text-lg">{SITE.legalName}</p>
        {showAddress && <p>{SITE.address}</p>}
        <a href={SITE.phoneTel} className="block hover:underline font-semibold text-lg">
          {SITE.phone}
        </a>
        <a href={`mailto:${SITE.email}`} className="block hover:underline">
          {SITE.email}
        </a>
        {hours && (
          <p className="pt-2">
            <span className="font-semibold">Hours: </span>
            {hours}
          </p>
        )}
      </div>
      <Button href={SITE.whatsapp} variant="accent" external>
        Message us on WhatsApp
      </Button>
    </div>
  );
}
