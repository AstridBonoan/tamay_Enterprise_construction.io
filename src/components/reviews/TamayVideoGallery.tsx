"use client";

import { useEffect, useMemo, useRef } from "react";
import type { ReviewVideoProject } from "@/lib/reviewVideos";
import { initTamayGallery } from "./initTamayGallery";
import { TestimonialProjectHeader } from "./TestimonialProjectHeader";
import "./tamay-video-gallery.css";

type TamayVideoGalleryProps = {
  projects: ReviewVideoProject[];
  /** Grid for project highlights; stacked for one video per row */
  variant?: "grid" | "stacked";
  /** Show entries that have a title but no YouTube ID yet */
  includeWithoutVideo?: boolean;
  titleFormat?: "testimonial" | "project";
  showDescription?: boolean;
};

function descriptionMatchesTitle(description: string, title: string) {
  const normalize = (s: string) =>
    s
      .replace(/\.\s*$/, "")
      .trim()
      .toLowerCase();
  return normalize(description) === normalize(title);
}

export function TamayVideoGallery({
  projects,
  variant = "grid",
  includeWithoutVideo = false,
  titleFormat = "testimonial",
  showDescription = true,
}: TamayVideoGalleryProps) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLDivElement>(null);

  const projectsWithVideo = useMemo(
    () => projects.filter((p) => p.videos.length > 0),
    [projects]
  );

  const projectsToRender = useMemo(
    () =>
      includeWithoutVideo
        ? projects.filter((p) => p.title || p.videos.length > 0)
        : projectsWithVideo,
    [includeWithoutVideo, projects, projectsWithVideo]
  );

  useEffect(() => {
    const gallery = galleryRef.current;
    const modal = modalRef.current;
    const player = playerRef.current;
    const closeBtn = closeRef.current;
    if (!gallery || !modal || !player || !closeBtn || projectsWithVideo.length === 0) return;

    return initTamayGallery(gallery, modal, player, closeBtn);
  }, [projectsWithVideo]);

  if (projectsToRender.length === 0) {
    return null;
  }

  const galleryClass =
    variant === "stacked" ? "tamay-gallery tamay-gallery--stacked" : "tamay-gallery";

  return (
    <>
      <div className={galleryClass} id="tamay-gallery" ref={galleryRef}>
        {projectsToRender.map((project) => {
          const desc =
            showDescription &&
            project.description &&
            !(project.title && descriptionMatchesTitle(project.description, project.title))
              ? project.description
              : undefined;

          return (
            <div
              key={project.id}
              className="tamay-project"
              data-videos={project.videos.join(",")}
              data-desc={desc ?? ""}
            >
              {project.title ? (
                <TestimonialProjectHeader title={project.title} format={titleFormat} />
              ) : null}

              {project.videos.length > 0 ? (
                <div className="tamay-project-mount" />
              ) : (
                <p className="tamay-project-placeholder text-center text-sm text-gray-500 py-10 border border-dashed border-gray-200 rounded-xl">
                  Video coming soon — add a YouTube ID in{" "}
                  <code className="text-xs">src/lib/reviewVideos.ts</code>
                </p>
              )}
            </div>
          );
        })}
      </div>

      {projectsWithVideo.length > 0 ? (
        <>
          <div className="tamay-modal" id="tamay-modal" ref={modalRef} aria-hidden="true">
            <div className="tamay-modal-video" id="tamay-player" ref={playerRef} />
          </div>
          <div className="tamay-close" id="tamay-close" ref={closeRef} role="button" tabIndex={0}>
            ✕
          </div>
        </>
      ) : null}
    </>
  );
}
