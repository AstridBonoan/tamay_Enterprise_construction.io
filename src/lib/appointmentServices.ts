import { IMAGES } from "./images";

export type AppointmentService = {
  id: string;
  title: string;
  meta: string;
  description: string;
  image: string;
};

/** Matches tamayenterprises.com Online Appointments service list */
export const APPOINTMENT_SERVICES: AppointmentService[] = [
  {
    id: "construction",
    title: "Construction",
    meta: "1 hr | $250",
    description:
      "A one-on-one session to discuss your project vision. (Job estimate fee applies to job total if accepted)",
    image: IMAGES.construction.renovation,
  },
  {
    id: "real-estate",
    title: "Real Estate",
    meta: "1 hr | Free",
    description: "A one-on-one session to discuss your specific needs and goals.",
    image: IMAGES.realEstate.agent,
  },
  {
    id: "logistics",
    title: "Logistics",
    meta: "1 hr | Free",
    description: "A one-on-one session to discuss your specific needs and goals.",
    image: IMAGES.logistics.warehouseFleet,
  },
  {
    id: "prevention",
    title: "Prevention Services",
    meta: "1 hr | $90",
    description:
      "A one-on-one session to discuss your prevention needs. (fee applies to membership total if accepted)",
    image: IMAGES.preventiveServices.aboutConsultation,
  },
  {
    id: "assembly",
    title: "Pro Furniture Assembly & Installation",
    meta: "1 hr | Free",
    description:
      "A one-on-one session to discuss your Assembling or Installation needs. ( fee applies to total assembling price if accepted)",
    image: IMAGES.homepage.image6,
  },
];
