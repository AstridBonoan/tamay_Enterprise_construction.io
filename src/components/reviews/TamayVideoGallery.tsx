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
};

export function TamayVideoGallery({
  projects,
  showTitle = true,
  instanceId = "tamay",
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

  if (activeProjects.length === 0) {
    return null;
  }

  return (
    <>
      <div className="tamay-gallery" id={`${instanceId}-gallery`} ref={galleryRef}>
        {activeProjects.map((project) => (
            <div
              key={project.id}
              className="tamay-project"
              data-videos={project.videos.join(",")}
              data-desc={project.description ?? ""}
            >
              {showTitle && project.title ? (
                <TestimonialProjectHeader title={project.title} />
              ) : null}
              <div className="tamay-project-mount" />
            </div>
        ))}
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
