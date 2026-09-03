/**
 * Short premium transition that marks the start of Tamay Construction services.
 * Placed after “What Are You Planning?” and before Kitchen Renovations.
 */
export function ConstructionServicesIntro() {
  return (
    <section className="bg-[#faf8f5] border-b border-gray-200/60" aria-labelledby="construction-services-intro-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12 md:py-14">
        <div className="max-w-3xl mx-auto text-center sm:text-left sm:mx-0">
          <p className="text-tamay-accent font-heading font-bold tracking-[0.16em] uppercase text-[11px] sm:text-xs">
            Our Construction Services
          </p>
          <div className="mt-2 h-px w-10 bg-tamay-accent/70 mx-auto sm:mx-0" aria-hidden />
          <h2
            id="construction-services-intro-heading"
            className="mt-4 font-heading text-2xl sm:text-3xl lg:text-[2.15rem] text-tamay-primary font-semibold leading-[1.15] text-balance"
          >
            Built Around the Way You Want to Improve Your Home.
          </h2>
          <p className="mt-4 text-gray-600 text-sm sm:text-[15px] leading-relaxed max-w-2xl">
            From kitchens and bathrooms to additions, structural improvements, and everyday home upgrades, our services
            are coordinated around your property and your goals.
          </p>
        </div>
      </div>
    </section>
  );
}
