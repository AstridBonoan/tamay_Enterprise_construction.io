import { SITE } from "@/lib/site";

function DirectionsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
    </svg>
  );
}

export function HomeLocationMap() {
  const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    SITE.address,
  )}&z=16&output=embed`;

  return (
    <section id="location" className="w-full">
      <div className="relative w-full h-[380px] sm:h-[420px] md:h-[460px] bg-gray-200">
        <iframe
          title={`Map showing ${SITE.address}`}
          src={mapEmbedSrc}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
        {/* Hide Google top-left place card/controls so only custom CTA appears */}
        <div className="absolute top-0 left-0 z-[20] w-[430px] h-[130px] bg-white pointer-events-none" />

        <a
          href={SITE.maps.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-4 left-4 z-[30] inline-flex items-center gap-2 rounded-full bg-tamay-primary hover:bg-tamay-primary-dark text-white text-xs sm:text-sm font-bold tracking-widest uppercase px-4 py-2.5 shadow-lg transition-colors"
        >
          <DirectionsIcon />
          Get Directions
        </a>
      </div>

      <div className="bg-tamay-primary-dark text-white px-4 py-8 sm:py-10">
        <div className="max-w-3xl mx-auto text-center text-sm leading-relaxed text-white/95">
          <p className="mb-3">
            By submitting this form, you agree to receive text messages and calls from{" "}
            <strong className="font-semibold text-white">{SITE.legalName}</strong> related to your
            inquiry, estimate, or project.
          </p>
          <p className="mb-3 text-white/85">
            Message frequency varies. Message and data rates may apply. Reply <strong>STOP</strong>{" "}
            to cancel and <strong>HELP</strong> for help.
          </p>
          <p>
            <a
              href={SITE.maps.placeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-tamay-accent transition-colors"
            >
              View on Google Maps
            </a>
            <span className="text-white/60 mx-2">·</span>
            <span className="text-white/90">{SITE.address}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
