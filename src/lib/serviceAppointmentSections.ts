export type ServiceAppointmentSectionCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

export const SERVICE_APPOINTMENT_SECTION_COPY: Record<string, ServiceAppointmentSectionCopy> = {
  construction: {
    eyebrow: "Free consultation",
    title: "Ready to Build Your Vision?",
    subtitle:
      "Every great project starts with a conversation. Book a free one-hour consultation and talk through your goals, timeline, and budget with our construction team.",
  },
  "real-estate": {
    eyebrow: "Free consultation",
    title: "Explore What Your Next Property Can Become",
    subtitle:
      "Whether you're buying, selling, or investing, schedule a free consultation to discuss your goals with a team that understands both real estate and construction.",
  },
  logistics: {
    eyebrow: "Free consultation",
    title: "Let's Plan Your Logistics Together",
    subtitle:
      "From local deliveries to coordinated transportation, book a free consultation to discuss your schedule, routes, and operational needs.",
  },
  "prevention-services": {
    eyebrow: "Free consultation",
    title: "Protect Your Home Before Problems Start",
    subtitle:
      "Book a free preventive services consultation to review your home's maintenance needs and learn how our membership program can help.",
  },
  "assembly-installation": {
    eyebrow: "Free consultation",
    title: "Professional Assembly, Planned Around You",
    subtitle:
      "Need furniture assembly or installation support? Schedule a free consultation to discuss your project scope, timeline, and setup requirements.",
  },
};

export function getServiceAppointmentSectionCopy(
  serviceId: string,
): ServiceAppointmentSectionCopy | undefined {
  return SERVICE_APPOINTMENT_SECTION_COPY[serviceId];
}
