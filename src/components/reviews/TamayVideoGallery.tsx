"use client";

import { useEffect, useMemo, useRef, type ReactNode } from "react";
import type { ReviewVideoProject } from "@/lib/reviewVideos";
import { initTamayGallery } from "./initTamayGallery";
import { TestimonialProjectHeader } from "./TestimonialProjectHeader";
import "./tamay-video-gallery.css";

type TamayVideoGalleryProps = {
  projects: ReviewVideoProject[];
  /** Show client/project name heading above each video block */
  showTitle?: boolean;
  /** Unique prefix for element ids when multiple galleries share a page */
  instanceId?: string;
  /** Single-video projects in a 2-column row; multi-video projects full-width below */
  grouped?: boolean;
};

export function TamayVideoGallery({
  projects,
  showTitle = true,
  instanceId = "tamay",
  grouped = false,
}: TamayVideoGalleryProps) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLDivElement>(null);

  // Keep title-only sections when showTitle is on; otherwise only projects with videos.
  const displayProjects = useMemo(
    () =>
      showTitle
        ? projects.filter((p) => Boolean(p.title) || p.videos.length > 0)
        : projects.filter((p) => p.videos.length > 0),
    [projects, showTitle],
  );

  const projectsWithVideos = useMemo(
    () => displayProjects.filter((p) => p.videos.length > 0),
    [displayProjects],
  );

  useEffect(() => {
    const gallery = galleryRef.current;
    const modal = modalRef.current;
    const player = playerRef.current;
    const closeBtn = closeRef.current;
    if (!gallery || !modal || !player || !closeBtn || projectsWithVideos.length === 0) return;

    return initTamayGallery(gallery, modal, player, closeBtn);
  }, [projectsWithVideos]);

  if (displayProjects.length === 0) {
    return null;
  }

  const renderProject = (project: ReviewVideoProject) => (
    <div
      key={project.id}
      className={`tamay-project${project.videos.length === 0 ? " tamay-project--title-only" : ""}`}
      data-videos={project.videos.join(",")}
    >
      {showTitle && project.title ? <TestimonialProjectHeader title={project.title} /> : null}
      {project.videos.length > 0 ? <div className="tamay-project-mount" /> : null}
    </div>
  );

  // Keep document order: title-only + singles share the singles grid; multi stay full-width.
  const renderGrouped = () => {
    const segments: ReactNode[] = [];
    let singlesBatch: ReviewVideoProject[] = [];

    const flushSingles = () => {
      if (singlesBatch.length === 0) return;
      segments.push(
        <div key={`singles-${segments.length}`} className="tamay-gallery-row tamay-gallery-row--singles">
          {singlesBatch.map(renderProject)}
        </div>,
      );
      singlesBatch = [];
    };

    for (const project of displayProjects) {
      if (project.videos.length > 1) {
        flushSingles();
        segments.push(
          <div key={project.id} className="tamay-gallery-row tamay-gallery-row--multi">
            {renderProject(project)}
          </div>,
        );
      } else {
        singlesBatch.push(project);
      }
    }
    flushSingles();
    return segments;
  };

  return (
    <>
      <div
        className={grouped ? "tamay-gallery-root" : "tamay-gallery"}
        id={`${instanceId}-gallery`}
        ref={galleryRef}
      >
        {grouped ? renderGrouped() : displayProjects.map(renderProject)}
      </div>

      <div
        className="tamay-modal"
        id={`${instanceId}-modal`}
        ref={modalRef}
        aria-hidden="true"
      >
        <div className="tamay-modal-video" id={`${instanceId}-player`} ref={playerRef} />
      </div>
      <div
        className="tamay-close"
        id={`${instanceId}-close`}
        ref={closeRef}
        role="button"
        tabIndex={0}
      >
        ✕
      </div>
    </>
  );
}
