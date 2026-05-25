type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-3xl mb-10 ${alignClass}`}>
      {eyebrow && (
        <p
          className={`text-sm font-semibold tracking-widest uppercase mb-2 ${
            light ? "text-tamay-accent" : "text-tamay-primary"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-heading text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 ${
          light ? "text-white" : "text-tamay-primary"
        }`}
      >
        {title}
      </h2>
      <hr className="section-divider mb-4" />
      {subtitle && (
        <p className={`text-base md:text-lg leading-relaxed ${light ? "text-gray-200" : "text-gray-600"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
