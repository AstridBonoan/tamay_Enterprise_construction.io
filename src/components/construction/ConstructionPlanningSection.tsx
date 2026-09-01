import Link from "next/link";
import { constructionOutlineLinkClass } from "@/components/construction/constructionCtaStyles";
import { appointmentScheduleHref } from "@/lib/onlineAppointments";

const SERVICE_GROUPS = [
  {
    title: "Renovate a Space",
    items: ["Kitchens", "Bathrooms", "Basements", "Interior Remodeling"],
    icon: RenovateIcon,
  },
  {
    title: "Add or Build",
    items: ["Home Additions", "New Rooms", "Structural Improvements", "Decks / Outdoor Living"],
    icon: AddBuildIcon,
  },
  {
    title: "Repair or Upgrade",
    items: ["Drywall", "Flooring", "Doors & Windows", "Painting / Repairs"],
    icon: RepairIcon,
  },
  {
    title: "Improve Home Systems",
    items: ["Electrical", "Plumbing", "HVAC-related Work", "Installations"],
    icon: SystemsIcon,
  },
] as const;

function RenovateIcon() {
  return (
    <svg className="h-6 w-6 text-tamay-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.6}
        d="M4 19V9l4-4h8l4 4v10M9 19v-6h6v6M12 9v3"
      />
    </svg>
  );
}

function AddBuildIcon() {
  return (
    <svg className="h-6 w-6 text-tamay-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.6}
        d="M5 19V9l7-5 7 5v10M9 19v-4h6v4M12 7v6m-3-3h6"
      />
    </svg>
  );
}

function RepairIcon() {
  return (
    <svg className="h-6 w-6 text-tamay-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.6}
        d="M14.7 6.3a4 4 0 0 0-5.4 5.4l-5.7 5.7 2.1 2.1 5.7-5.7a4 4 0 0 0 5.4-5.4l-2.2 2.2-2.1-2.1 2.2-2.2z"
      />
    </svg>
  );
}

function SystemsIcon() {
  return (
    <svg className="h-6 w-6 text-tamay-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.6}
        d="M12 3v2m0 14v2M3 12h2m14 0h2M5.6 5.6l1.4 1.4m10 10 1.4 1.4M18.4 5.6l-1.4 1.4M6.8 17.2l-1.4 1.4M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"
      />
    </svg>
  );
}

/**
 * Service-discovery section — live HTML/CSS only (no planning graphic).
 */
export function ConstructionPlanningSection() {
  return (
    <section className="py-12 md:py-16 bg-[#faf8f5] border-b border-gray-200/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="font-heading text-2xl sm:text-3xl text-tamay-primary font-semibold leading-tight">
            What Are You Planning For Your Home?
          </h2>
          <p className="mt-3 text-gray-600 text-sm sm:text-base leading-relaxed">
            Start with what you want to change. We&apos;ll help you understand the right next step.
          </p>
        </div>

        <div className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 lg:gap-0">
          {SERVICE_GROUPS.map((group, index) => {
            const Icon = group.icon;
            return (
              <article
                key={group.title}
                className={`min-w-0 ${index > 0 ? "lg:pl-8 lg:border-l lg:border-gray-200/70" : "lg:pr-8"}`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon />
                  <h3 className="font-heading text-base sm:text-lg text-tamay-primary font-semibold leading-snug">
                    {group.title}
                  </h3>
                </div>
                <ul className="mt-3 space-y-1.5">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-600 leading-snug">
                      <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-tamay-accent/80" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <div className="mt-10 md:mt-12 pt-8 border-t border-gray-200/70 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm text-gray-600 leading-relaxed">
            Not sure where your project fits? Talk to our team.
          </p>
          <Link
            href={appointmentScheduleHref("construction")}
            className={`${constructionOutlineLinkClass} w-full sm:w-auto shrink-0`}
          >
            Book a Construction Consultation
          </Link>
        </div>
      </div>
    </section>
  );
}
