import Image from "next/image";
import { OpenLiveChatButton } from "@/components/layout/OpenLiveChatButton";
import { realEstateChatButtonClass } from "@/components/real-estate/realEstateCtaStyles";
import { IMAGES } from "@/lib/images";

const AREAS = [
  {
    title: "Layout & Expansion Potential",
    question: "Could the layout work better for your future needs?",
    text: "We consider possibilities such as additional bedrooms, home offices, finished basements, additions, or more functional living space.",
  },
  {
    title: "Kitchen & Bathroom Potential",
    question: "What could be improved later?",
    text: "We help you look beyond dated finishes and think about whether kitchens, bathrooms, and living areas could realistically be transformed.",
  },
  {
    title: "Major Home Systems",
    question: "What may require attention over time?",
    text: "Roofing, HVAC, plumbing, electrical systems, windows, siding, and other major components all have a lifecycle.",
  },
  {
    title: "Basement & Unused Space",
    question: "Is there value hiding in space you’re not using yet?",
    text: "A basement, attic, garage, or underused room may offer possibilities for future living space, storage, recreation, or workspace.",
  },
  {
    title: "Exterior & Property Potential",
    question: "The opportunity may extend beyond the walls.",
    text: "Decks, patios, driveways, entrances, exterior improvements, and outdoor living can also influence how the property works for you long term.",
  },
  {
    title: "Future Cost Awareness",
    question: "The purchase price is only part of homeownership.",
    text: "We help clients think about future improvements, maintenance, and potential renovation priorities before those decisions become urgent.",
  },
];

export function BuildersEyesSection() {
  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl">
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-tamay-primary font-semibold leading-tight">
            See the Property Through a Builder’s Eyes
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            When we look at a property, we don’t only see finishes, square footage, and curb appeal. We also think
            about how the home is built, how its major systems may age, what can realistically be changed, and where
            future opportunities may exist.
          </p>
        </div>

        <figure className="relative mt-10 aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-gray-100">
          <Image
            src={IMAGES.realEstate.approvedBuildersEyes}
            alt="Builder-informed view of a property with callouts for layout, kitchen and bath, systems, basement, exterior, and future costs"
            fill
            className="object-cover"
            sizes="100vw"
            unoptimized
          />
        </figure>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {AREAS.map((area, index) => (
            <article key={area.title} className="bg-white p-5 sm:p-6 border-t-4 border-tamay-primary">
              <p className="text-tamay-accent text-xs font-bold tracking-widest uppercase mb-2">{index + 1}</p>
              <h3 className="font-heading text-lg text-tamay-primary font-semibold">{area.title}</h3>
              <p className="mt-2 text-sm font-semibold text-gray-800">{area.question}</p>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{area.text}</p>
            </article>
          ))}
        </div>

        <p className="mt-8 text-xs sm:text-sm text-gray-500 leading-relaxed max-w-3xl">
          Construction insight is not a substitute for a licensed home inspection. We encourage clients to obtain all
          appropriate professional inspections and evaluations before purchasing a property.
        </p>

        <div className="mt-6">
          <OpenLiveChatButton className={realEstateChatButtonClass}>Talk to a Real Estate Advisor</OpenLiveChatButton>
        </div>
      </div>
    </section>
  );
}
