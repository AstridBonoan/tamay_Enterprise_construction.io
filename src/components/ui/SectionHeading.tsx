import { SiteText } from "@/components/copy/SiteText";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
  copyKey?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
  copyKey,
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  const eyebrowClass = `text-sm font-semibold tracking-widest uppercase mb-2 ${
    light ? "text-tamay-accent" : "text-tamay-primary"
  }`;
  const titleClass = `font-heading text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 ${
    light ? "text-white" : "text-tamay-primary"
  }`;
  const subtitleClass = `text-base md:text-lg leading-relaxed ${light ? "text-gray-200" : "text-gray-600"}`;

  return (
    <div className={`max-w-3xl mb-10 ${alignClass}`}>
      {eyebrow ? (
        copyKey ? (
          <SiteText k={`${copyKey}.eyebrow`} as="p" className={eyebrowClass}>
            {eyebrow}
          </SiteText>
        ) : (
          <p className={eyebrowClass}>{eyebrow}</p>
        )
      ) : null}
      {copyKey ? (
        <SiteText k={`${copyKey}.title`} as="h2" className={titleClass}>
          {title}
        </SiteText>
      ) : (
        <h2 className={titleClass}>{title}</h2>
      )}
      <hr className="section-divider mb-4" />
      {subtitle ? (
        copyKey ? (
          <SiteText k={`${copyKey}.subtitle`} as="p" className={subtitleClass} multiline>
            {subtitle}
          </SiteText>
        ) : (
          <p className={subtitleClass}>{subtitle}</p>
        )
      ) : null}
    </div>
  );
}
