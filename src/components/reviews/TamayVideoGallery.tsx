"use client";

import { useEffect, useMemo, useRef } from "react";
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

  const activeProjects = useMemo(
    () => projects.filter((p) => p.videos.length > 0),
    [projects]
  );

  useEffect(() => {
    const gallery = galleryRef.current;
    const modal = modalRef.current;
    const player = playerRef.current;
    const closeBtn = closeRef.current;
    if (!gallery || !modal || !player || !closeBtn || activeProjects.length === 0) return;

    return initTamayGallery(gallery, modal, player, closeBtn);
  }, [activeProjects]);

  const singleVideoProjects = useMemo(
    () => activeProjects.filter((p) => p.videos.length === 1),
    [activeProjects]
  );
  const multiVideoProjects = useMemo(
    () => activeProjects.filter((p) => p.videos.length > 1),
    [activeProjects]
  );

  if (activeProjects.length === 0) {
    return null;
  }

  const renderProject = (project: ReviewVideoProject) => (
    <div
      key={project.id}
      className="tamay-project"
      data-videos={project.videos.join(",")}
      data-desc={project.description ?? ""}
    >
      {showTitle && project.title ? <TestimonialProjectHeader title={project.title} /> : null}
      <div className="tamay-project-mount" />
    </div>
  );

  return (
    <>
      <div
        className={grouped ? "tamay-gallery-root" : "tamay-gallery"}
        id={`${instanceId}-gallery`}
        ref={galleryRef}
      >
        {grouped ? (
          <>
            {singleVideoProjects.length > 0 && (
              <div className="tamay-gallery-row tamay-gallery-row--singles">
                {singleVideoProjects.map(renderProject)}
              </div>
            )}
            {multiVideoProjects.length > 0 && (
              <div className="tamay-gallery-row tamay-gallery-row--multi">
                {multiVideoProjects.map(renderProject)}
              </div>
            )}
          </>
        ) : (
          activeProjects.map(renderProject)
        )}
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
