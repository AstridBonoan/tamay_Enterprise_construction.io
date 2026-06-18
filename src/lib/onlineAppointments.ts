import { ASSEMBLY_SERVICE_IMAGES } from "./assemblyImages";
import { IMAGES } from "./images";

export type AppointmentSlot = {
  date: string;
  time: string;
  start: string;
  end: string;
};

export type OnlineAppointmentService = {
  id: string;
  title: string;
  serviceCategory: string;
  durationLabel: string;
  priceLabel: string;
  description: string;
  image: string;
  imageAlt: string;
  scheduleLabel: string;
  scheduleCtaLabel: string;
  scheduleSlots: readonly AppointmentSlot[];
};

const CONSULTATION_SLOTS: readonly AppointmentSlot[] = [
  {
    date: "Monday, June 23, 2026",
    time: "10:00 AM – 11:00 AM",
    start: "2026-06-23T10:00:00",
    end: "2026-06-23T11:00:00",
  },
  {
    date: "Tuesday, June 24, 2026",
    time: "2:00 PM – 3:00 PM",
    start: "2026-06-24T14:00:00",
    end: "2026-06-24T15:00:00",
  },
  {
    date: "Wednesday, June 25, 2026",
    time: "11:00 AM – 12:00 PM",
    start: "2026-06-25T11:00:00",
    end: "2026-06-25T12:00:00",
  },
  {
    date: "Thursday, June 26, 2026",
    time: "3:00 PM – 4:00 PM",
    start: "2026-06-26T15:00:00",
    end: "2026-06-26T16:00:00",
  },
  {
    date: "Friday, June 27, 2026",
    time: "9:00 AM – 10:00 AM",
    start: "2026-06-27T09:00:00",
    end: "2026-06-27T10:00:00",
  },
];

export const ONLINE_APPOINTMENT_SERVICES: readonly OnlineAppointmentService[] = [
  {
    id: "construction",
    title: "Construction",
    serviceCategory: "Construction",
    durationLabel: "1 hr",
    priceLabel: "Free",
    description: "A one-on-one session to discuss your project vision.",
    image: IMAGES.construction.renovation,
    imageAlt: "Construction professional reviewing blueprints at a job site",
    scheduleLabel: "Available consultation times",
    scheduleCtaLabel: "Book a construction consultation",
    scheduleSlots: CONSULTATION_SLOTS,
  },
  {
    id: "real-estate",
    title: "Real Estate",
    serviceCategory: "Real Estate",
    durationLabel: "1 hr",
    priceLabel: "Free",
    description: "A one-on-one session to discuss your specific needs and goals.",
    image: IMAGES.realEstate.agent,
    imageAlt: "Happy couple holding house keys after a real estate closing",
    scheduleLabel: "Available consultation times",
    scheduleCtaLabel: "Book a real estate consultation",
    scheduleSlots: CONSULTATION_SLOTS,
  },
  {
    id: "logistics",
    title: "Logistics",
    serviceCategory: "Logistics",
    durationLabel: "1 hr",
    priceLabel: "Free",
    description: "A one-on-one session to discuss your specific needs and goals.",
    image: IMAGES.logistics.warehouseFleet,
    imageAlt: "Tamay Enterprises delivery fleet at a warehouse loading dock",
    scheduleLabel: "Available consultation times",
    scheduleCtaLabel: "Book a logistics consultation",
    scheduleSlots: CONSULTATION_SLOTS,
  },
  {
    id: "prevention-services",
    title: "Prevention Services",
    serviceCategory: "Prevention Services",
    durationLabel: "1 hr",
    priceLabel: "Free",
    description: "A one-on-one session to discuss your prevention needs.",
    image: IMAGES.preventiveServices.aboutConsultation,
    imageAlt: "Tamay team member consulting with a homeowner about preventive services",
    scheduleLabel: "Available consultation times",
    scheduleCtaLabel: "Book a prevention services consultation",
    scheduleSlots: CONSULTATION_SLOTS,
  },
  {
    id: "assembly-installation",
    title: "Pro Furniture Assembly & Installation",
    serviceCategory: "Pro Furniture Assembly & Installation",
    durationLabel: "1 hr",
    priceLabel: "Free",
    description: "A one-on-one session to discuss your assembling or installation needs.",
    image: ASSEMBLY_SERVICE_IMAGES.furnitureAssembly,
    imageAlt: "Professional assembling furniture for a client",
    scheduleLabel: "Available consultation times",
    scheduleCtaLabel: "Book an assembly consultation",
    scheduleSlots: CONSULTATION_SLOTS,
  },
];

export function getAllAppointmentServiceIds(): string[] {
  return ONLINE_APPOINTMENT_SERVICES.map((service) => service.id);
}

export function getAppointmentServiceById(
  serviceId: string,
): OnlineAppointmentService | undefined {
  return ONLINE_APPOINTMENT_SERVICES.find((service) => service.id === serviceId);
}

export function appointmentSchedulePath(serviceId: string): string {
  return `/online-appointments/schedule/${serviceId}`;
}
