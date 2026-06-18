import Image from "next/image";
import Link from "next/link";
import type { OnlineAppointmentService } from "@/lib/onlineAppointments";
import { appointmentSchedulePath } from "@/lib/onlineAppointments";
import { sitePath } from "@/lib/paths";

type AppointmentServiceRowProps = {
  service: OnlineAppointmentService;
};

export function AppointmentServiceRow({ service }: AppointmentServiceRowProps) {
  return (
    <article className="flex flex-col md:flex-row gap-6 md:gap-8 py-10 border-b border-gray-200 last:border-b-0">
      <figure className="relative w-full md:w-52 lg:w-60 aspect-[3/2] shrink-0 bg-gray-100 overflow-hidden">
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 240px"
          unoptimized
        />
      </figure>

      <div className="flex-1 min-w-0 md:pt-1">
        <h2 className="font-heading text-xl md:text-2xl font-semibold text-tamay-primary">{service.title}</h2>
        <p className="text-gray-600 mt-1">
          {service.durationLabel} | {service.priceLabel}
        </p>
        <p className="text-gray-600 mt-3 text-sm md:text-base leading-relaxed">{service.description}</p>
      </div>

      <div className="flex md:items-start shrink-0">
        <Link
          href={sitePath(appointmentSchedulePath(service.id))}
          className="inline-flex items-center justify-center rounded-full bg-tamay-primary hover:bg-tamay-primary-dark text-white font-bold text-sm tracking-widest px-8 py-3 transition-colors min-w-[120px]"
        >
          BOOK
        </Link>
      </div>
    </article>
  );
}
