"use client";

import { SITE } from "@/lib/site";
import { Button } from "./Button";
import { SiteText } from "@/components/copy/SiteText";
import { useSiteCopy } from "@/components/copy/SiteCopyProvider";

type ContactBlockProps = {
  title?: string;
  description?: string;
  showAddress?: boolean;
  hours?: string;
  copyKey?: string;
};

export function ContactBlock({
  title = "Ready to Get Started?",
  description,
  showAddress = true,
  hours,
  copyKey = "contact.block",
}: ContactBlockProps) {
  const phone = useSiteCopy("site.phone", SITE.phone);
  const email = useSiteCopy("site.email", SITE.email);
  const phoneHref = `tel:${phone.replace(/\D/g, "") || "2032206678"}`;

  return (
    <div className="bg-tamay-primary text-white p-8 md:p-12">
      <SiteText k={`${copyKey}.title`} as="h3" className="font-heading text-2xl font-semibold mb-4">
        {title}
      </SiteText>
      {description ? (
        <SiteText k={`${copyKey}.description`} as="p" className="text-gray-200 mb-6 leading-relaxed" multiline>
          {description}
        </SiteText>
      ) : null}
      <div className="space-y-2 text-sm mb-6">
        <SiteText k="site.legalName" as="p" className="font-heading text-lg">
          {SITE.legalName}
        </SiteText>
        {showAddress ? (
          <SiteText k="site.address" as="p">
            {SITE.address}
          </SiteText>
        ) : null}
        <a href={phoneHref} className="block hover:underline font-semibold text-lg">
          <SiteText k="site.phone">{SITE.phone}</SiteText>
        </a>
        <a href={`mailto:${email}`} className="block hover:underline">
          <SiteText k="site.email">{SITE.email}</SiteText>
        </a>
        {hours ? (
          <p className="pt-2">
            <span className="font-semibold">Hours: </span>
            <SiteText k={`${copyKey}.hours`}>{hours}</SiteText>
          </p>
        ) : null}
      </div>
      <Button href={SITE.whatsapp} variant="accent" external>
        <SiteText k={`${copyKey}.whatsapp`}>Message us on WhatsApp</SiteText>
      </Button>
    </div>
  );
}
