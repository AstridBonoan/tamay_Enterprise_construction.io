import { ASSEMBLY_SERVICE_IMAGES } from "./assemblyImages";
import { IMAGES } from "./images";
import { sitePath } from "./paths";

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
};

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
  },
  {
    id: "real-estate",
    title: "Real Estate",
    serviceCategory: "Real Estate",
    durationLabel: "1 hr",
    priceLabel: "Free",
    description: "A one-on-one session to discuss your specific needs and goals.",
    image: IMAGES.realEstate.agent,
    imageAlt: "Real estate and development team reviewing architectural plans in a planning meeting",
    scheduleLabel: "Available consultation times",
    scheduleCtaLabel: "Book a real estate consultation",
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

export function resolveAppointmentServiceId(serviceId: string | null | undefined): string {
  if (serviceId && getAppointmentServiceById(serviceId)) {
    return serviceId;
  }
  return ONLINE_APPOINTMENT_SERVICES[0].id;
}

export function appointmentSchedulePath(serviceId: string): string {
  return `/online-appointments/schedule?service=${encodeURIComponent(serviceId)}`;
}

/** Full href for schedule page (trailing slash + #book). */
export function appointmentScheduleHref(serviceId: string): string {
  return sitePath(`${appointmentSchedulePath(serviceId)}#book`);
}
