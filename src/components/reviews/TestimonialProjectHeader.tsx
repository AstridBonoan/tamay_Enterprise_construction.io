type TestimonialProjectHeaderProps = {
  title: string;
};

export function TestimonialProjectHeader({ title }: TestimonialProjectHeaderProps) {
  return (
    <header className="tamay-project-heading mb-6">
      <h2 className="font-heading text-xl md:text-2xl font-semibold text-tamay-primary text-center tracking-wide uppercase">
        {title.trim()}
      </h2>
      <hr className="section-divider mx-auto w-24 mt-3 mb-0" aria-hidden="true" />
    </header>
  );
}
