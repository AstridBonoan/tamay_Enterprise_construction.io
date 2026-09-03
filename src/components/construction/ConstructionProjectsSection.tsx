"use client";

import { useCallback, useEffect, useId, useState } from "react";
import Link from "next/link";
import {
  constructionOutlineLinkClass,
  constructionPrimaryLinkClass,
} from "@/components/construction/constructionCtaStyles";
import { appointmentScheduleHref } from "@/lib/onlineAppointments";
import {
  ADA_RESTROOM_PROJECT_VIDEOS,
  CONSTRUCTION_PROJECT_VIDEOS,
} from "@/lib/constructionVideos";
import { sitePath } from "@/lib/paths";
import "@/components/reviews/tamay-video-gallery.css";

type WorkVideo = {
  youtubeId: string;
  title: string;
  category: "Residential" | "Commercial";
};

/** Preserve exact Residential YouTube IDs from CONSTRUCTION_PROJECT_VIDEOS */
const RESIDENTIAL_IDS = CONSTRUCTION_PROJECT_VIDEOS[0]?.videos ?? [];
/** Preserve exact Commercial YouTube IDs from ADA_RESTROOM_PROJECT_VIDEOS */
const COMMERCIAL_IDS = ADA_RESTROOM_PROJECT_VIDEOS[0]?.videos ?? [];

const RESIDENTIAL_VIDEOS: WorkVideo[] = [
  { youtubeId: RESIDENTIAL_IDS[0]!, title: "Basement Walkthrough", category: "Residential" },
  { youtubeId: RESIDENTIAL_IDS[1]!, title: "Interior View", category: "Residential" },
  { youtubeId: RESIDENTIAL_IDS[2]!, title: "Finished Space", category: "Residential" },
];

const COMMERCIAL_VIDEOS: WorkVideo[] = [
  { youtubeId: COMMERCIAL_IDS[0]!, title: "ADA Walkthrough", category: "Commercial" },
  { youtubeId: COMMERCIAL_IDS[1]!, title: "Commercial Interior", category: "Commercial" },
  { youtubeId: COMMERCIAL_IDS[2]!, title: "Finished Work", category: "Commercial" },
];

/** Same fallback chain as TamayVideoGallery — some videos lack hq720/maxres. */
function thumbCandidates(id: string) {
  return [
    `https://i.ytimg.com/vi/${id}/hq720.jpg`,
    `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
    `https://i.ytimg.com/vi/${id}/sddefault.jpg`,
    `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    `https://i.ytimg.com/vi/${id}/mqdefault.jpg`,
    `https://i.ytimg.com/vi/${id}/default.jpg`,
  ];
}

function PlayIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full bg-white shadow-md ${className}`}
      aria-hidden
    >
      <span className="ml-0.5 border-y-[6px] border-y-transparent border-l-[10px] border-l-[#141c2b]" />
    </span>
  );
}

function VideoThumb({ youtubeId }: { youtubeId: string }) {
  const [index, setIndex] = useState(0);
  const candidates = thumbCandidates(youtubeId);
  const src = candidates[Math.min(index, candidates.length - 1)]!;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => {
        setIndex((i) => (i + 1 < candidates.length ? i + 1 : i));
      }}
      onLoad={(e) => {
        const img = e.currentTarget;
        // YouTube placeholder frames are tiny (~120px); advance like initTamayGallery
        if (img.naturalWidth > 0 && img.naturalWidth <= 140 && index + 1 < candidates.length) {
          setIndex((i) => i + 1);
        }
      }}
    />
  );
}

function VideoTile({
  video,
  featured = false,
  onPlay,
}: {
  video: WorkVideo;
  featured?: boolean;
  onPlay: (id: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onPlay(video.youtubeId)}
      className={`group relative w-full overflow-hidden rounded-xl sm:rounded-2xl bg-black text-left shadow-sm ring-1 ring-black/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-tamay-accent ${
        featured ? "aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[320px]" : "aspect-video"
      }`}
      aria-label={`Play ${video.title}`}
    >
      <VideoThumb youtubeId={video.youtubeId} />
      <span className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" aria-hidden />
      <span className="absolute left-3 top-3 inline-flex rounded-full border border-white/25 bg-black/35 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
        {video.category}
      </span>
      <span className="absolute inset-0 flex items-center justify-center">
        <PlayIcon className={featured ? "h-14 w-14 sm:h-16 sm:w-16" : "h-11 w-11 sm:h-12 sm:w-12"} />
      </span>
      <span className="absolute inset-x-0 bottom-0 p-3 sm:p-3.5">
        <span className={`block font-heading font-semibold text-white leading-snug ${featured ? "text-base sm:text-lg" : "text-sm"}`}>
          {video.title}
        </span>
      </span>
    </button>
  );
}

function ShowcaseBlock({
  label,
  support,
  videos,
  reverse = false,
  onPlay,
}: {
  label: string;
  support: string;
  videos: WorkVideo[];
  reverse?: boolean;
  onPlay: (id: string) => void;
}) {
  const [featured, supportingA, supportingB] = videos;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-5 md:mb-6">
        <div>
          <h3 className="font-heading text-xl sm:text-2xl text-tamay-primary font-semibold">{label}</h3>
          <p className="mt-1 text-sm text-gray-600 leading-snug max-w-xl">{support}</p>
        </div>
      </div>

      {/* Desktop editorial layout */}
      <div
        className={`hidden lg:grid lg:gap-4 xl:gap-5 lg:items-stretch ${
          reverse
            ? "lg:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)]"
            : "lg:grid-cols-[minmax(0,0.62fr)_minmax(0,0.38fr)]"
        }`}
      >
        {reverse ? (
          <>
            <div className="flex flex-col gap-4 xl:gap-5 min-h-0">
              <VideoTile video={supportingA!} onPlay={onPlay} />
              <VideoTile video={supportingB!} onPlay={onPlay} />
            </div>
            <VideoTile video={featured!} featured onPlay={onPlay} />
          </>
        ) : (
          <>
            <VideoTile video={featured!} featured onPlay={onPlay} />
            <div className="flex flex-col gap-4 xl:gap-5 min-h-0">
              <VideoTile video={supportingA!} onPlay={onPlay} />
              <VideoTile video={supportingB!} onPlay={onPlay} />
            </div>
          </>
        )}
      </div>

      {/* Mobile / tablet: featured first, then supporting */}
      <div className="lg:hidden space-y-3 sm:space-y-4">
        <VideoTile video={featured!} featured onPlay={onPlay} />
        <VideoTile video={supportingA!} onPlay={onPlay} />
        <VideoTile video={supportingB!} onPlay={onPlay} />
      </div>
    </div>
  );
}

/**
 * Premium “See Our Work” showcase — Residential (featured left) + Commercial (featured right).
 * Reuses exact YouTube IDs from constructionVideos.ts.
 */
export function ConstructionProjectsSection() {
  const reactId = useId();
  const [activeId, setActiveId] = useState<string | null>(null);

  const close = useCallback(() => setActiveId(null), []);

  useEffect(() => {
    if (!activeId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.classList.add("tamay-lock");
    document.body.classList.add("tamay-lock");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("tamay-lock");
      document.body.classList.remove("tamay-lock");
    };
  }, [activeId, close]);

  return (
    <section className="py-14 md:py-16 lg:py-20 bg-[#faf8f5] border-b border-gray-200/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-tamay-accent font-heading font-bold tracking-[0.16em] uppercase text-[11px] sm:text-xs">
            See Our Work
          </p>
          <div className="mt-2 h-px w-10 bg-tamay-accent/70" aria-hidden />
          <h2 className="mt-3 font-heading text-2xl sm:text-3xl lg:text-[2.15rem] text-tamay-primary font-semibold leading-[1.12] text-balance">
            Real Projects. Real Results.
          </h2>
          <p className="mt-3 text-gray-600 text-sm sm:text-[15px] leading-snug">
            Explore real residential and commercial work completed by Tamay Enterprises.
          </p>
        </div>

        <div className="mt-10 md:mt-12 space-y-12 md:space-y-14">
          <ShowcaseBlock
            label="Residential"
            support="Real home improvement and renovation work completed by Tamay Enterprises."
            videos={RESIDENTIAL_VIDEOS}
            onPlay={setActiveId}
          />

          <div className="h-px w-full bg-gray-200/80" aria-hidden />

          <ShowcaseBlock
            label="Commercial"
            support="Real commercial improvement and construction work completed by Tamay Enterprises."
            videos={COMMERCIAL_VIDEOS}
            reverse
            onPlay={setActiveId}
          />
        </div>

        <div className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-2.5 sm:gap-3 sm:justify-center">
          <Link href={sitePath("/gallery")} className={`${constructionPrimaryLinkClass} w-full sm:w-auto text-center`}>
            See More Projects
          </Link>
          <Link
            href={appointmentScheduleHref("construction")}
            className={`${constructionOutlineLinkClass} w-full sm:w-auto text-center`}
          >
            Book a Construction Consultation
          </Link>
        </div>
      </div>

      {/* Shared modal player — same YouTube-nocookie embed pattern as TamayVideoGallery */}
      <div
        className={`tamay-modal${activeId ? " active" : ""}`}
        id={`${reactId}-modal`}
        aria-hidden={activeId ? "false" : "true"}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="tamay-modal-video" id={`${reactId}-player`}>
          {activeId ? (
            <iframe
              title="Project video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(activeId)}?autoplay=1&mute=1&playsinline=1&rel=0&vq=hd1080&modestbranding=1`}
            />
          ) : null}
        </div>
      </div>
      <div
        className={`tamay-close${activeId ? " show" : ""}`}
        role="button"
        tabIndex={0}
        aria-label="Close video"
        onClick={close}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") close();
        }}
      >
        ✕
      </div>
    </section>
  );
}
