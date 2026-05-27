import { assetUrl } from "./assetUrl";

export type AppointmentService = {
  id: string;
  title: string;
  meta: string;
  description: string;
  image: string;
  imageAlt: string;
  /** CSS object-position for square thumbnails (default: center) */
  imagePosition?: string;
};

/** Matches tamayenterprises.com Online Appointments service list */
export const APPOINTMENT_SERVICES: AppointmentService[] = [
  {
    id: "construction",
    title: "Construction",
    meta: "1 hr | $250",
    description:
      "A one-on-one session to discuss your project vision. (Job estimate fee applies to job total if accepted)",
    image: assetUrl("/appointments/construction.png"),
    imageAlt: "Construction professional reviewing blueprints at a job site",
  },
  {
    id: "real-estate",
    title: "Real Estate",
    meta: "1 hr | Free",
    description: "A one-on-one session to discuss your specific needs and goals.",
    image: assetUrl("/appointments/real-estate.png"),
    imageAlt: "Red for sale sign in front of a suburban home",
  },
  {
    id: "logistics",
    title: "Logistics",
    meta: "1 hr | Free",
    description: "A one-on-one session to discuss your specific needs and goals.",
    image: assetUrl("/appointments/logistics.png"),
    imageAlt: "Tamay Enterprises delivery vans at a loading dock",
  },
  {
    id: "prevention",
    title: "Prevention Services",
    meta: "1 hr | $90",
    description:
      "A one-on-one session to discuss your prevention needs. (fee applies to membership total if accepted)",
    image: assetUrl("/appointments/prevention-services.png"),
    imageAlt: "Home preventive service technician consulting with a homeowner",
  },
  {
    id: "assembly",
    title: "Pro Furniture Assembly & Installation",
    meta: "1 hr | Free",
    description:
      "A one-on-one session to discuss your Assembling or Installation needs. ( fee applies to total assembling price if accepted)",
    image: assetUrl("/appointments/assembly-installation.png"),
    imageAlt: "Technician assembling furniture on a patio",
  },
];
